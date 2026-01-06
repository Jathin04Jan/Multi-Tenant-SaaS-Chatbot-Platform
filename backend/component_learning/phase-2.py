from typing import List, Dict, Any, Optional
import hashlib
import os
from pathlib import Path
from datetime import datetime
from langchain_community.document_loaders import PyPDFium2Loader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings
from langchain_core.documents import Document
from qdrant_client import QdrantClient
from qdrant_client.http import models
import pypdfium2 as pdfium

from io import BytesIO
from PIL import Image

from langchain_ollama import ChatOllama
from base64 import b64encode
import json

from timing_decorator import timing_decorator_with_label


class IngestionWorker:
    def __init__(
        self, 
        embedding_model_name: str = "embeddinggemma:latest",
        vlm_model_name: str = "qwen3-vl:8b",
        qdrant_host: str = "localhost",
        qdrant_port: int = 6333,
    ):
        self.embeddings = OllamaEmbeddings(model=embedding_model_name)
        self.vlm_model_name = ChatOllama(model=vlm_model_name)
        self.qdrant_client = QdrantClient(host=qdrant_host, port=qdrant_port)

    def _normalize_metadata(
        self, 
        doc: Document, 
        file_path: str, 
        file_name: str, 
        file_type: str,
        total_pages: Optional[int] = None
    ) -> None:
        """
        Normalize document metadata to ensure uniform structure across all file types.
        Ensures all documents have the same metadata fields regardless of source.
        
        Args:
            doc: Document object to normalize
            file_path: Full path to the file
            file_name: Basename of the file
            file_type: "pdf", "pdf_image", or "txt"
            total_pages: Total number of pages (for PDFs), None for TXT
        """
        # Initialize metadata if None
        doc.metadata = doc.metadata or {}
        
        # Get file timestamps (used for TXT and as fallback for PDFs)
        try:
            stat_info = os.stat(file_path)
            creation_time = datetime.fromtimestamp(stat_info.st_ctime).isoformat() + "+00:00"
            mod_time = datetime.fromtimestamp(stat_info.st_mtime).isoformat() + "+00:00"
        except OSError:
            creation_time = ""
            mod_time = ""
        
        if file_type in ("pdf", "pdf_image"):
            # For PDFs (both simple and complex), preserve existing values and set defaults only if missing
            doc.metadata.setdefault("producer", "")
            doc.metadata.setdefault("creator", "")
            doc.metadata.setdefault("creationdate", creation_time if not doc.metadata.get("creationdate") else doc.metadata.get("creationdate"))
            doc.metadata.setdefault("title", "")
            doc.metadata.setdefault("author", "")
            doc.metadata.setdefault("subject", "")
            doc.metadata.setdefault("keywords", "")
            doc.metadata.setdefault("moddate", mod_time if not doc.metadata.get("moddate") else doc.metadata.get("moddate"))
            doc.metadata.setdefault("source", file_path)
            doc.metadata.setdefault("file_name", file_name)
            doc.metadata.setdefault("file_type", file_type)  # Preserve "pdf" or "pdf_image"
            # total_pages: use provided value, existing value, or 0
            if total_pages is not None:
                doc.metadata["total_pages"] = total_pages
            else:
                doc.metadata.setdefault("total_pages", doc.metadata.get("total_pages", 0))
            
            # Normalize page number to 1-indexed (consistent across all PDF types)
            # Simple PDFs (PyPDFium2Loader) are 0-indexed, VLM PDFs are already 1-indexed
            current_page = doc.metadata.get("page")
            if current_page is not None:
                # If page is 0-indexed (from simple PDF), convert to 1-indexed
                # If page is already 1-indexed (from VLM), keep it as is
                # We can detect: if file_type is "pdf_image", it's already 1-indexed
                if file_type == "pdf_image":
                    # VLM already returns 1-indexed, keep it
                    doc.metadata["page"] = int(current_page)
                else:
                    # Simple PDF is 0-indexed, convert to 1-indexed
                    doc.metadata["page"] = int(current_page) + 1
            else:
                doc.metadata.setdefault("page", 0)
        elif file_type == "txt":
            # For TXT files, set all fields with defaults
            doc.metadata.update({
                "producer": "",
                "creator": "",
                "creationdate": creation_time,
                "title": "",
                "author": "",
                "subject": "",
                "keywords": "",
                "moddate": mod_time,
                "source": file_path,
                "file_name": file_name,
                "file_type": "txt",
                "total_pages": None,  # TXT files don't have pages
                "page": None,  # TXT files don't have pages
            })
        
        # Ensure common fields that might be added by VLM processing exist
        doc.metadata.setdefault("block_index", None)
        doc.metadata.setdefault("block_type", None)
        doc.metadata.setdefault("is_table", False)
        
        # Set extraction_method based on file_type for clarity
        if file_type == "pdf_image":
            doc.metadata.setdefault("extraction_method", "vlm")
        elif file_type == "pdf":
            doc.metadata.setdefault("extraction_method", "text_extraction")
        elif file_type == "txt":
            doc.metadata.setdefault("extraction_method", "direct_load")

        
    @timing_decorator_with_label("Rendering PDF Page to PNG")
    def render_page_to_png_bytes(self, pdf_path: str, page_index: int, dpi: int = 200) -> bytes:
        pdf = pdfium.PdfDocument(pdf_path)
        page = pdf.get_page(page_index)
        pil_image = page.render(scale=dpi/72).to_pil()  # 72 dpi base
        buf = BytesIO()
        pil_image.save(buf, format="PNG")
        return buf.getvalue()



    @timing_decorator_with_label("VLM Page Analysis")
    def analyze_page_with_vlm(self, image_bytes: bytes, page_number: int) -> dict:
        """
        Returns JSON like:
        {
        "blocks": [
            {
            "type": "text" | "table",
            "page": 1,
            "content": "...",         # markdown text or markdown table
            "block_index": 0
            },
            ...
            ]
            }
        }
        """
        b64 = b64encode(image_bytes).decode("utf-8")
        prompt = f"""You are a document parser for a RAG system. Extract ALL content from page {page_number} and return it as valid JSON.

CRITICAL REQUIREMENTS:
1. Output ONLY valid JSON - no markdown, no explanations, no code blocks, no arrays
2. You MUST return an object with a "blocks" key containing an array
3. Extract content in reading order (top to bottom, left to right)
4. Extract EVERY piece of content - do not skip anything
5. Split content into logical blocks (paragraphs, headings, tables, lists)
6. Each block MUST have ALL four fields: type, page, block_index, and content
7. block_index: Sequential number identifying each block's position on the page (0-indexed)
   - First block = 0, second block = 1, third block = 2, etc.
   - Must start at 0 and increment by 1 for each subsequent block
   - This preserves the reading order and allows tracking block sequence
8. page must be exactly {page_number} for ALL blocks
9. content field MUST contain the actual text/table content - never leave it empty
10. If a block has no visible content, skip it - do not include empty blocks

CONTENT EXTRACTION RULES:
- Text blocks: Extract as plain markdown text. Preserve line breaks and formatting.
- Tables: Convert to markdown table format with pipes (|). Include header row if present.
- Do NOT summarize, paraphrase, or modify the content
- Do NOT drop any rows, cells, or text
- Preserve mathematical notation, formulas, and special characters
- Keep tables as separate blocks (type: "table")
- Keep text paragraphs as separate blocks (type: "text")

REQUIRED JSON FORMAT (MUST follow exactly - this is the ONLY acceptable format):
{{
  "blocks": [
    {{
      "type": "text",
      "page": {page_number},
      "block_index": 0,
      "content": "First paragraph or heading text here..."
    }},
    {{
      "type": "table",
      "page": {page_number},
      "block_index": 1,
      "content": "| Header1 | Header2 |\\n|---------|---------|\\n| Cell1   | Cell2   |"
    }},
    {{
      "type": "text",
      "page": {page_number},
      "block_index": 2,
      "content": "Next paragraph text here..."
    }}
  ]
}}

CRITICAL FORMAT RULES:
- Start with {{ (opening brace for object)
- Must have "blocks" key (with quotes)
- "blocks" value must be an array [ ]
- Each block must be a complete object with all 4 fields: type, page, block_index, content
- End with }} (closing brace for object)
- DO NOT return just an array [ ] - it must be wrapped in an object with "blocks" key
- DO NOT return incomplete blocks - every block must have all fields filled
- DO NOT stop mid-response - extract ALL content from the page
- content field MUST contain actual text/table content - never leave it empty

Note: block_index represents the sequential position of each block on the page (0=first, 1=second, 2=third, etc.)

IMPORTANT: Return ONLY the JSON object starting with {{ and ending with }}, nothing else. No markdown code blocks, no explanations, no arrays."""
        
        # DEBUG: Print the prompt being sent to VLM
        print(f"\n{'='*100}")
        print(f"[DEBUG] VLM PROMPT for page {page_number}:")
        print(f"{'='*100}")
        print(prompt)
        print(f"{'='*100}")
        print(f"[DEBUG] System Message: You extract structured content from document images.")
        print(f"[DEBUG] Image size: {len(image_bytes)} bytes (base64 length: {len(b64)} chars)")
        print(f"[DEBUG] Calling VLM model...\n")

        msg = self.vlm_model_name.invoke(
            [
                {"role": "system", "content": "You extract structured content from document images."},
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": f"data:image/png;base64,{b64}"}
                    ]
                },
            ]
        )

        # LangChain returns a Message with .content (string)
        # Extract JSON from response (might be wrapped in markdown code blocks or have extra text)
        raw_content = msg.content.strip()
        
        # DEBUG: Print raw VLM response
        print(f"\n{'='*100}")
        print(f"[DEBUG] VLM RAW RESPONSE for page {page_number}:")
        print(f"{'='*100}")
        print(raw_content)
        print(f"{'='*100}")
        print(f"[DEBUG] Response length: {len(raw_content)} characters")
        print(f"[DEBUG] Response type: {type(msg)}")
        print(f"{'='*100}\n")
        
        content = raw_content
        
        # Try to extract JSON from markdown code blocks if present
        if "```json" in content:
            # Extract JSON from ```json ... ``` block
            start = content.find("```json") + 7
            end = content.find("```", start)
            if end != -1:
                content = content[start:end].strip()
                print(f"[DEBUG] Extracted JSON from markdown code block")
        elif "```" in content:
            # Extract JSON from ``` ... ``` block
            start = content.find("```") + 3
            end = content.find("```", start)
            if end != -1:
                content = content[start:end].strip()
                print(f"[DEBUG] Extracted JSON from generic code block")
        
        # Try to find JSON object in the content
        try:
            # First, try direct parsing
            parsed_json = json.loads(content)
            print(f"[DEBUG] ✓ Successfully parsed JSON directly")
            print(f"[DEBUG] Parsed JSON structure:")
            print(f"  - Type: {type(parsed_json)}")
            if isinstance(parsed_json, dict):
                print(f"  - Keys: {list(parsed_json.keys())}")
                if "blocks" in parsed_json:
                    print(f"  - Number of blocks: {len(parsed_json.get('blocks', []))}")
                    for i, block in enumerate(parsed_json.get('blocks', [])[:3]):  # Show first 3 blocks
                        print(f"    Block {i}: type={block.get('type')}, page={block.get('page')}, block_index={block.get('block_index')}")
            print(f"{'='*100}\n")
            return parsed_json
        except json.JSONDecodeError as e:
            print(f"[DEBUG] ✗ Direct JSON parsing failed: {e}")
            print(f"[DEBUG] Attempting to extract JSON from boundaries...")
            # If that fails, try to find JSON object boundaries
            start_idx = content.find("{")
            end_idx = content.rfind("}")
            if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
                json_str = content[start_idx:end_idx + 1]
                print(f"[DEBUG] Found JSON boundaries: start={start_idx}, end={end_idx}, length={len(json_str)}")
                try:
                    parsed_json = json.loads(json_str)
                    print(f"[DEBUG] ✓ Successfully parsed JSON by extracting boundaries")
                    print(f"[DEBUG] Parsed JSON structure:")
                    print(f"  - Type: {type(parsed_json)}")
                    if isinstance(parsed_json, dict):
                        print(f"  - Keys: {list(parsed_json.keys())}")
                        if "blocks" in parsed_json:
                            print(f"  - Number of blocks: {len(parsed_json.get('blocks', []))}")
                    print(f"{'='*100}\n")
                    return parsed_json
                except json.JSONDecodeError as e2:
                    print(f"[DEBUG] ✗ Boundary extraction also failed: {e2}")
                    print(f"[DEBUG] Extracted JSON string (first 500 chars): {json_str[:500]}")
                    print(f"[DEBUG] Error position: {e2.pos if hasattr(e2, 'pos') else 'unknown'}")
                    print(f"{'='*100}\n")
                    raise ValueError(f"Could not parse JSON from VLM response. First error: {e}, Second error: {e2}. Raw content preview: {raw_content[:500]}...")
            else:
                # If still can't parse, raise with more context
                print(f"[DEBUG] ✗ Could not find JSON boundaries in content")
                print(f"[DEBUG] Content preview (first 500 chars): {content[:500]}")
                print(f"{'='*100}\n")
                raise ValueError(f"Could not parse JSON from VLM response. No JSON object found. Raw content preview: {raw_content[:500]}...")


    def blocks_to_documents(self, blocks: list, base_metadata: dict, page_number: Optional[int] = None) -> List[Document]:
        """
        Convert VLM blocks to Document objects.
        
        Args:
            blocks: List of block dictionaries from VLM
            base_metadata: Base metadata to merge with block metadata
            page_number: Page number to use if not present in blocks (defaults to block["page"] if available)
        """
        docs = []
        valid_blocks = 0
        skipped_blocks = 0
        
        for idx, block in enumerate(blocks):
            # Use .get() with defaults to handle missing fields gracefully
            block_type = block.get("type", "text")
            block_content = block.get("content", "")
            block_page = block.get("page", page_number)  # Use provided page_number if block doesn't have it
            block_index = block.get("block_index", idx)  # Use enumerate index if not provided
            
            # Validate block - skip if content is empty or invalid
            if not block_content or not isinstance(block_content, str) or not block_content.strip():
                skipped_blocks += 1
                print(f"[WARNING] Skipping block {idx} on page {block_page}: empty or missing content (type={block_type}, block_index={block_index})")
                continue
            
            # Validate block_index is sequential
            if block_index != valid_blocks:
                print(f"[WARNING] Block {idx} has block_index={block_index}, expected {valid_blocks}. Correcting...")
                block_index = valid_blocks
            
            meta = {
                **base_metadata,
                "page": block_page,
                "block_index": block_index,
                "block_type": block_type,
                "is_table": block_type == "table",
                "extraction_method": "vlm",  # VLM-processed blocks
            }
            docs.append(Document(page_content=block_content, metadata=meta))
            valid_blocks += 1
        
        if skipped_blocks > 0:
            print(f"[INFO] Processed {valid_blocks} valid blocks, skipped {skipped_blocks} invalid/incomplete blocks")
        
        return docs


    @timing_decorator_with_label("Loading Document")
    def load_document(self, file_path: str) -> List[Document]:
        """
        Load a document from file path. Automatically detects file type.
        Supports PDF and TXT files.
        
        Args:
            file_path: Path to the file (PDF or TXT)
        
        Returns:
            List of Document objects
        
        Raises:
            ValueError: If file type is not supported
        """
        file_ext = Path(file_path).suffix.lower()
        file_name = os.path.basename(file_path)
        total_pages = None  # Will be set for PDFs
        
        if file_ext == '.pdf':
            loaded_documents = PyPDFium2Loader(file_path).load()
            print(f"PDF Document Loading is Successful. Loaded {len(loaded_documents)} document(s).")
            # Get total pages from the first document's metadata if available
            total_pages = loaded_documents[0].metadata.get("total_pages", len(loaded_documents)) if loaded_documents else 0
        elif file_ext == '.txt':
            try:
                # Use LangChain's TextLoader which handles encoding automatically
                loader = TextLoader(file_path, encoding='utf-8')
                loaded_documents = loader.load()
                print(f"TXT Document Loading is Successful. Loaded {len(loaded_documents)} document(s).")
            except UnicodeDecodeError:
                # Fallback to latin-1 if UTF-8 fails
                print("UTF-8 decoding failed, trying latin-1 encoding...")
                loader = TextLoader(file_path, encoding='latin-1')
                loaded_documents = loader.load()
                print(f"TXT Document Loading is Successful (latin-1). Loaded {len(loaded_documents)} document(s).")
        else:
            raise ValueError(f"Unsupported file type: {file_ext}. Supported types: .pdf, .txt")
        
        # Normalize metadata for all documents
        for doc in loaded_documents:
            if file_ext == '.pdf':
                self._normalize_metadata(doc, file_path, file_name, "pdf", total_pages=total_pages)
            else:
                self._normalize_metadata(doc, file_path, file_name, file_ext[1:])  # Remove the dot from extension
        
        return loaded_documents

    @timing_decorator_with_label("Loading Complex PDF with VLM")
    def load_complex_pdf_with_vlm(self, file_path: str, tenant_id: str, category: str) -> List[Document]:
        pdf = pdfium.PdfDocument(file_path)
        num_pages = len(pdf)
        file_name = os.path.basename(file_path)

        all_docs: List[Document] = []

        for page_index in range(num_pages):
            image_bytes = self.render_page_to_png_bytes(file_path, page_index)
            parsed = self.analyze_page_with_vlm(image_bytes, page_number=page_index + 1)
            
            # Handle both formats: dict with "blocks" key or direct list
            if isinstance(parsed, dict):
                blocks = parsed.get("blocks", [])
                if not blocks:
                    print(f"[WARNING] Page {page_index + 1}: Parsed dict but 'blocks' key is empty or missing")
                    print(f"[WARNING] Dict keys: {list(parsed.keys())}")
            elif isinstance(parsed, list):
                print(f"[WARNING] Page {page_index + 1}: VLM returned array instead of object with 'blocks' key")
                print(f"[WARNING] Array length: {len(parsed)}")
                blocks = parsed
            else:
                print(f"[ERROR] Page {page_index + 1}: Unexpected parsed format: {type(parsed)}")
                print(f"[ERROR] Parsed content: {parsed}")
                blocks = []
            
            if not blocks:
                print(f"[WARNING] Page {page_index + 1}: No blocks extracted from VLM response - skipping page")
                continue
            
            print(f"[INFO] Page {page_index + 1}: Extracted {len(blocks)} blocks from VLM response")

            base_meta = {
                "file_name": file_name,
                "file_type": "pdf_image",
                "source": file_path,
                "tenant_id": tenant_id,
                "category": category,
            }

            # Pass page_number to blocks_to_documents in case VLM doesn't include it
            docs = self.blocks_to_documents(blocks, base_meta, page_number=page_index + 1)
            all_docs.extend(docs)
        
        # Normalize metadata for all documents to ensure uniform structure
        for doc in all_docs:
            self._normalize_metadata(doc, file_path, file_name, "pdf_image", total_pages=num_pages)
        
        return all_docs

        return all_docs

    @timing_decorator_with_label("Chunking Documents")
    def chunk_documents(
        self, 
        documents: List[Document], 
        chunk_size: int = 1000, 
        chunk_overlap: int = 200
    ) -> List[Document]:
        """
        Split documents into chunks using recursive character text splitter.
        
        Args:
            documents: List of Document objects to chunk
            chunk_size: Maximum size of each chunk
            chunk_overlap: Overlap between chunks
        
        Returns:
            List of Document objects (chunks)
        """
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", ". ", " "],  # paragraph → line → sentence → word-ish
        )

        chunks = text_splitter.split_documents(documents)
        print(f"Chunking complete. Total chunks: {len(chunks)}")
        return chunks

    @timing_decorator_with_label("Generating Embeddings")
    def embed_chunks(self, chunks: List[Document]) -> List[Dict[str, Any]]:
        """
        Generate embeddings for each chunk.
        Returns a list ready to be sent to Qdrant (or any vector DB):
        {
          "id": "chunk-0",
          "text": "...",
          "embedding": [...],
          "metadata": {...}
        }
        """
        texts = [c.page_content for c in chunks]
        metadatas = [c.metadata for c in chunks]

        # FastEmbed will batch efficiently under the hood
        vectors = self.embeddings.embed_documents(texts)

        payloads = []
        for i, (text, meta, vec) in enumerate(zip(texts, metadatas, vectors)):
            payloads.append(
                {
                    "id": f"chunk-{i}",
                    "text": text,
                    "embedding": vec,
                    "metadata": meta,
                }
            )

        print(f"Embedding complete. Total embedded chunks: {len(payloads)}")
        return payloads

    @timing_decorator_with_label("Converting to Qdrant Points")
    def to_qdrant_points(
        self,
        embedded_items: List[Dict[str, Any]],
        *,
        tenant_id: str,
        category: str,
        file_name: str,
        minio_path: str,
        ):
        """
        Convert embedded items to Qdrant points.
        """
        points = []
        for i, item in enumerate(embedded_items):
            text = item["text"]
            vec = item["embedding"]
            meta = item["metadata"].copy()

            # Page numbers are already normalized to 1-indexed during metadata normalization
            # No need to modify here - just ensure it's an integer if present
            if "page" in meta and meta["page"] is not None:
                meta["page"] = int(meta["page"])

            base_meta = {
                "tenant_id": tenant_id,
                "category": category,
                "file_name": file_name,
                "minio_path": minio_path,
                "chunk_index": i,
            }

            merged_meta = {**meta, **base_meta}

            # Create a unique string identifier for this point
            point_id_str = f"{tenant_id}:{file_name}:chunk-{i}"
            # Convert to integer ID using hash (Qdrant requires integer or UUID)
            # Using MD5 hash to ensure consistent integer IDs
            point_id = int(hashlib.md5(point_id_str.encode()).hexdigest()[:15], 16)

            points.append(
                {
                    "id": point_id,
                    "vector": vec,
                    "payload": {
                        "text": text,
                        "point_id_str": point_id_str,  # Store original string ID in payload for reference
                        **merged_meta,
                    },
                }
            )
        return points

    @timing_decorator_with_label("Creating Qdrant Collection")
    def create_collection(self, vector_size: int, distance: str = "Cosine", collection_name: str = "default_testing") -> bool:
        """
        Create or ensure the 'testing' collection exists in Qdrant.
        
        Args:
            vector_size: Size of the embedding vectors
            distance: Distance metric ("Cosine", "Euclidean", or "Dot")
        
        Returns:
            bool: True if collection exists or was created successfully
        """
        try:
            # Check if collection exists
            collections = self.qdrant_client.get_collections()
            collection_names = [col.name for col in collections.collections]
            
            if collection_name in collection_names:
                print(f"Collection '{collection_name}' already exists")
                return True
            
            # Create collection
            self.qdrant_client.create_collection(
                collection_name=collection_name,
                vectors_config=models.VectorParams(
                    size=vector_size,
                    distance=getattr(models.Distance, distance.upper()),
                ),
            )
            print(f"Collection '{collection_name}' created successfully with vector size {vector_size}")
            return True
        except Exception as e:
            print(f"Error creating collection '{collection_name}': {e}")
            return False

    @timing_decorator_with_label("Appending Points to Qdrant")
    def append_points_to_collection(
        self, 
        points: List[Dict[str, Any]],
        collection_name: str = "default_testing"
    ) -> bool:
        """
        Append/upsert points to the 'testing' collection in Qdrant.
        
        Args:
            points: List of point dictionaries with 'id', 'vector', and 'payload' keys
            collection_name: Name of the collection (default: "testing")
        
        Returns:
            bool: True if points were successfully upserted
        """
        try:
            if not points:
                print("No points to append")
                return False
            
            # Convert points to Qdrant PointStruct format
            qdrant_points = []
            for point in points:
                qdrant_points.append(
                    models.PointStruct(
                        id=point["id"],
                        vector=point["vector"],
                        payload=point["payload"],
                    )
                )
            
            # Upsert points (will insert or update if exists)
            self.qdrant_client.upsert(
                collection_name=collection_name,
                points=qdrant_points,
            )
            
            print(f"Successfully upserted {len(qdrant_points)} points to collection '{collection_name}'")
            return True
        except Exception as e:
            print(f"Error appending points to collection '{collection_name}': {e}")
            return False


if __name__ == "__main__":

    ingestion_worker = IngestionWorker()
    
    print("Loading complex pdf document...")
    complex_documents = ingestion_worker.load_complex_pdf_with_vlm("testing-files/tables-half.pdf", tenant_id="1", category="test")
    
    print("Complex pdf document loaded successfully.")
    print(f"Loaded {len(complex_documents)} documents")
    
    print("-"*100)

    print("Chunking documents...")
    chunks = ingestion_worker.chunk_documents(complex_documents)
    print("Chunks created successfully.")
    print(f"Created {len(chunks)} chunks")
    for chunk in chunks:
        print(chunk.page_content)
        print("-"*100)
    
    embeddings = ingestion_worker.embed_chunks(chunks)
    print("Embeddings created successfully.")
    print(f"Created {len(embeddings)} embeddings")

    print("-"*100)

    print("Converting chunks to Qdrant points...")
    points = ingestion_worker.to_qdrant_points(embeddings, tenant_id="1", category="test", file_name="tables.pdf", minio_path="testing-files/tables.pdf")
    print("Qdrant points created successfully.")
    print(f"Created {len(points)} points")

    print("-"*100)

    embedding_size = len(embeddings[0]["embedding"])
    print(f"Embedding size: {embedding_size}")
    print(f"Creating Qdrant collection of size {embedding_size}...")
    ingestion_worker.create_collection(vector_size=embedding_size)
    print("Qdrant collection created successfully.")
    print("Appending points to Qdrant collection...")
    ingestion_worker.append_points_to_collection(points)
    print("Points appended to Qdrant collection successfully.")