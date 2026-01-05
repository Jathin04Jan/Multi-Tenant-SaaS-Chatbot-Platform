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
        file_type: str
    ) -> None:
        """
        Normalize document metadata to ensure uniform structure across all file types.
        Ensures all documents have the same metadata fields regardless of source.
        
        Args:
            doc: Document object to normalize
            file_path: Full path to the file
            file_name: Basename of the file
            file_type: "pdf" or "txt"
        """
        # Initialize metadata if None
        doc.metadata = doc.metadata or {}
        
        if file_type == "pdf":
            # For PDFs, preserve existing values and set defaults only if missing
            doc.metadata.setdefault("producer", "")
            doc.metadata.setdefault("creator", "")
            doc.metadata.setdefault("creationdate", "")
            doc.metadata.setdefault("title", "")
            doc.metadata.setdefault("author", "")
            doc.metadata.setdefault("subject", "")
            doc.metadata.setdefault("keywords", "")
            doc.metadata.setdefault("moddate", "")
            doc.metadata.setdefault("source", file_path)
            doc.metadata.setdefault("file_name", file_name)
            doc.metadata.setdefault("file_type", "pdf")
            # total_pages and page should already be set by PDF loader, but ensure they exist
            doc.metadata.setdefault("total_pages", doc.metadata.get("total_pages", 0))
            doc.metadata.setdefault("page", doc.metadata.get("page", 0))
        elif file_type == "txt":
            # For TXT files, get file timestamps and set all fields
            try:
                stat_info = os.stat(file_path)
                creation_time = datetime.fromtimestamp(stat_info.st_ctime).isoformat() + "+00:00"
                mod_time = datetime.fromtimestamp(stat_info.st_mtime).isoformat() + "+00:00"
            except OSError:
                creation_time = ""
                mod_time = ""
            
            # Set all uniform metadata fields (TXT files don't have PDF-specific fields)
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

        
    def render_page_to_png_bytes(self, pdf_path: str, page_index: int, dpi: int = 200) -> bytes:
        pdf = pdfium.PdfDocument(pdf_path)
        page = pdf.get_page(page_index)
        pil_image = page.render(scale=dpi/72).to_pil()  # 72 dpi base
        buf = BytesIO()
        pil_image.save(buf, format="PNG")
        return buf.getvalue()



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
        prompt = f"""
You are a document parser for a RAG system.

For the given page image (page {page_number}), extract content in strict JSON.

Rules:
- Preserve reading order.
- For normal text, return as plain markdown paragraphs.
- For tables, convert each table into a markdown table (with header row if present).
- Do NOT summarise, do NOT drop rows/cells.
- Output ONLY valid JSON with this schema:

{{
  "blocks": [
    {{
      "type": "text" | "table",
      "page": {page_number},
      "block_index": 0,
      "content": "..."
    }}
  ]
}}
        """

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
        content = msg.content.strip()
        
        # Try to extract JSON from markdown code blocks if present
        if "```json" in content:
            # Extract JSON from ```json ... ``` block
            start = content.find("```json") + 7
            end = content.find("```", start)
            if end != -1:
                content = content[start:end].strip()
        elif "```" in content:
            # Extract JSON from ``` ... ``` block
            start = content.find("```") + 3
            end = content.find("```", start)
            if end != -1:
                content = content[start:end].strip()
        
        # Try to find JSON object in the content
        try:
            # First, try direct parsing
            return json.loads(content)
        except json.JSONDecodeError:
            # If that fails, try to find JSON object boundaries
            start_idx = content.find("{")
            end_idx = content.rfind("}")
            if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
                json_str = content[start_idx:end_idx + 1]
                return json.loads(json_str)
            else:
                # If still can't parse, raise with more context
                raise ValueError(f"Could not parse JSON from VLM response. Content: {content[:200]}...")


    def blocks_to_documents(self,blocks: list, base_metadata: dict) -> List[Document]:
        docs = []
        for block in blocks:
            meta = {
                **base_metadata,
                "page": block["page"],
                "block_index": block["block_index"],
                "block_type": block["type"],       # "text" or "table"
                "is_table": block["type"] == "table",
            }
            docs.append(Document(page_content=block["content"], metadata=meta))
        return docs


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
        
        if file_ext == '.pdf':
            loaded_documents = PyPDFium2Loader(file_path).load()
            print(f"PDF Document Loading is Successful. Loaded {len(loaded_documents)} document(s).")
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
            self._normalize_metadata(doc, file_path, file_name, file_ext[1:])  # Remove the dot from extension
        
        return loaded_documents

    def load_complex_pdf_with_vlm(self, file_path: str, tenant_id: str, category: str) -> List[Document]:
        pdf = pdfium.PdfDocument(file_path)
        num_pages = len(pdf)
        file_name = os.path.basename(file_path)

        all_docs: List[Document] = []

        for page_index in range(num_pages):
            image_bytes = self.render_page_to_png_bytes(file_path, page_index)
            parsed = self.analyze_page_with_vlm(image_bytes, page_number=page_index + 1)
            blocks = parsed.get("blocks", [])

        base_meta = {
            "file_name": file_name,
            "file_type": "pdf_image",
            "source": file_path,
            "tenant_id": tenant_id,
            "category": category,
        }

        docs = self.blocks_to_documents(blocks, base_meta)
        all_docs.extend(docs)

        return all_docs

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

            # Normalize page number (PDFs have page numbers, TXT files have None)
            if "page" in meta and meta["page"] is not None:
                meta["page"] = int(meta["page"]) + 1

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
    complex_documents = ingestion_worker.load_complex_pdf_with_vlm("test-3-single-page.pdf", tenant_id="1", category="test")
    
    print("Complex pdf document loaded successfully.")
    print(f"Loaded {len(complex_documents)} documents")
    
    for doc in complex_documents:
        print(doc.page_content)
        print("-"*100)
    
    print(complex_documents)
