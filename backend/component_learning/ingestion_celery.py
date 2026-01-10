"""
Production-ready document ingestion worker for Qdrant vector database.

This module provides a robust implementation for loading, chunking, embedding,
and storing documents in Qdrant following industry best practices.
"""

import logging
import uuid
import os
import tempfile
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Any, Optional, Tuple
from io import BytesIO

from langchain_community.document_loaders import PyPDFium2Loader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings
from langchain_core.documents import Document
from qdrant_client import QdrantClient
from qdrant_client.http import models

import pdfplumber
from minio import Minio
from minio.error import S3Error
from celery import Celery

# Configure logging
logger = logging.getLogger(__name__)

# Celery app instance for ingestion tasks
# Configure both broker (for task queue) and backend (for result storage)
celery_app = Celery(
    'ingestion-worker',
    broker='redis://localhost:6379/0',  # Task queue (Redis DB 0)
    backend='redis://localhost:6379/0'  # Result backend (Redis DB 0)
)

# Qdrant batch size for optimal performance (recommended: 100-500)
QDRANT_BATCH_SIZE = 100


class IngestionWorker:
    """
    Production-ready ingestion worker for processing documents and storing them in Qdrant.
    
    Features:
    - Proper error handling and logging
    - Batch processing for optimal performance
    - Configurable Qdrant client (gRPC, API keys)
    - Collision-resistant ID generation
    - Input validation
    """
    
    def __init__(
        self, 
        embedding_model_name: str = "embeddinggemma:latest",
        qdrant_host: str = "localhost",
        qdrant_port: int = 6333,
        qdrant_api_key: Optional[str] = None,
        prefer_grpc: bool = True,
        minio_endpoint: Optional[str] = None,
        minio_access_key: Optional[str] = None,
        minio_secret_key: Optional[str] = None,
        minio_bucket_name: Optional[str] = None,
        minio_secure: bool = False,  # Set to True ONLY if MinIO server has HTTPS/TLS configured
    ):
        """
        Initialize the ingestion worker.
        
        Args:
            embedding_model_name: Name of the Ollama embedding model
            qdrant_host: Qdrant server hostname
            qdrant_port: Qdrant REST API port (gRPC port is typically port + 1)
            qdrant_api_key: Optional API key for Qdrant Cloud/authenticated instances
            prefer_grpc: Use gRPC instead of REST API for better performance (default: True)
            minio_endpoint: MinIO endpoint (e.g., "localhost:9000"). If None, MinIO functions are disabled.
            minio_access_key: MinIO access key
            minio_secret_key: MinIO secret key
            minio_bucket_name: MinIO bucket name (default: "yourbot-documents")
            minio_secure: Use HTTPS for MinIO (default: False).
                          ⚠️ IMPORTANT: Only set to True if MinIO server has TLS/SSL certificates configured.
                          - Current docker-compose setup uses HTTP only (port 9000), so keep this False.
                          - For HTTPS to work, MinIO server must:
                            1. Have TLS certificates configured
                            2. Listen on HTTPS port (typically 9443)
                            3. Expose HTTPS port in docker-compose
                          - Setting True without HTTPS setup will cause connection failures.
        """
        # Initialize embeddings
        try:
            self.embeddings = OllamaEmbeddings(model=embedding_model_name)
            logger.info(f"Initialized embedding model: {embedding_model_name}")
        except Exception as e:
            logger.error(f"Failed to initialize embedding model: {e}")
            raise
        
        # Initialize Qdrant client with production-ready configuration
        client_kwargs = {
            "host": qdrant_host,
            "port": qdrant_port,
            "prefer_grpc": prefer_grpc,
        }
        
        # Add API key if provided (for production/cloud Qdrant)
        if qdrant_api_key:
            client_kwargs["api_key"] = qdrant_api_key
            logger.info("Qdrant API key configured")
        
        try:
            self.qdrant_client = QdrantClient(**client_kwargs)
            logger.info(f"Initialized Qdrant client: {qdrant_host}:{qdrant_port} (gRPC: {prefer_grpc})")
        except Exception as e:
            logger.error(f"Failed to initialize Qdrant client: {e}")
            raise
        
        # Initialize MinIO client if credentials provided
        self.minio_client = None
        self.minio_bucket_name = minio_bucket_name or "yourbot-documents"
        
        if minio_endpoint and minio_access_key and minio_secret_key:
            try:
                self.minio_client = Minio(
                    minio_endpoint,
                    access_key=minio_access_key,
                    secret_key=minio_secret_key,
                    secure=minio_secure,
                )
                # Verify bucket exists
                if not self.minio_client.bucket_exists(self.minio_bucket_name):
                    logger.warning(f"MinIO bucket '{self.minio_bucket_name}' does not exist. It will be created on first use.")
                logger.info(f"Initialized MinIO client: {minio_endpoint}, bucket: {self.minio_bucket_name}")
            except Exception as e:
                logger.warning(f"Failed to initialize MinIO client: {e}. MinIO functions will be unavailable.")
                self.minio_client = None

    def _normalize_metadata(
        self, 
        documents: List[Document], 
        *,
        document_id: Optional[str] = None,
    ) -> None:
        """
        Normalize document metadata to ensure uniform structure across all file types.
        
        This function should be called ONCE before chunking to normalize common metadata
        for all documents. Then chunk_index is added separately in to_qdrant_points loop.
        
        Extracts file_name and file_type from document metadata or source path.
        Handles both single and multi-page documents.
        
        Args:
            documents: List of Document objects to normalize
            document_id: Document identifier (UUID or unique ID) - stored in metadata
        """
        if not documents:
            logger.warning("No documents provided for normalization")
            return
        
        for doc in documents:
            # Initialize metadata if None
            doc.metadata = doc.metadata or {}
            
            # Extract file_name and file_type from metadata or source path
            file_name = doc.metadata.get("file_name")
            file_type = doc.metadata.get("file_type")
            
            # If not in metadata, extract from source path (set by PyPDFium2Loader/TextLoader)
            if not file_name or not file_type:
                source_path = doc.metadata.get("source", "")
                if source_path:
                    if not file_name:
                        file_name = os.path.basename(source_path)
                    if not file_type:
                        file_ext = Path(source_path).suffix.lower()
                        file_type = file_ext[1:] if file_ext else "unknown"
                else:
                    file_name = file_name or "unknown"
                    file_type = file_type or "unknown"
            
            
            if file_type == "pdf":
                # For PDFs: preserve ALL existing values, only add missing fields with defaults
                # Don't modify any existing metadata values
                doc.metadata.setdefault("producer", "")
                doc.metadata.setdefault("creator", "")
                doc.metadata.setdefault("creationdate", "")
                doc.metadata.setdefault("title", "")
                doc.metadata.setdefault("author", "")
                doc.metadata.setdefault("subject", "")
                doc.metadata.setdefault("keywords", "")
                doc.metadata.setdefault("moddate", "")
                doc.metadata.setdefault("source", "")
                doc.metadata.setdefault("file_name", file_name)
                doc.metadata.setdefault("file_type", "pdf")
                doc.metadata.setdefault("total_pages", 0)
                doc.metadata.setdefault("page", 0)
                doc.metadata.setdefault("is_table", False) 
                
                # Page normalization happens per chunk (each chunk may have different page)
                # This is handled separately in to_qdrant_points loop
                        
            elif file_type == "txt":
                # For TXT files: preserve existing values (like 'source'), add missing PDF fields with None/empty
                # Use setdefault to avoid overwriting existing values - same fields as PDF for consistency
                doc.metadata.setdefault("producer", "")
                doc.metadata.setdefault("creator", "")
                doc.metadata.setdefault("creationdate", "")  # Will be updated with file stats if available
                doc.metadata.setdefault("title", "")
                doc.metadata.setdefault("author", "")
                doc.metadata.setdefault("subject", "")
                doc.metadata.setdefault("keywords", "")
                doc.metadata.setdefault("moddate", "")  # Will be updated with file stats if available
                doc.metadata.setdefault("source", "")
                doc.metadata.setdefault("file_name", file_name)
                doc.metadata.setdefault("file_type", "txt")
                doc.metadata.setdefault("total_pages", None)
                doc.metadata.setdefault("page", None)
                doc.metadata.setdefault("is_table", False)
                
                # Update timestamps with file stats if available and not already set
                file_path_for_stats = doc.metadata.get("source")
                if file_path_for_stats and os.path.exists(file_path_for_stats) and os.path.isfile(file_path_for_stats):
                    try:
                        stat_info = os.stat(file_path_for_stats)
                        # Only update if still empty (preserve any existing value)
                        if not doc.metadata.get("creationdate"):
                            doc.metadata["creationdate"] = datetime.fromtimestamp(stat_info.st_ctime).isoformat() + "+00:00"
                        if not doc.metadata.get("moddate"):
                            doc.metadata["moddate"] = datetime.fromtimestamp(stat_info.st_mtime).isoformat() + "+00:00"
                    except OSError as e:
                        logger.warning(f"Could not get file stats for {file_path_for_stats}: {e}")
            
            # Add Qdrant-specific metadata if provided
            # Note: chunk_index is added separately in to_qdrant_points loop for efficiency
            if document_id is not None:
                doc.metadata["document_id"] = document_id


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
            FileNotFoundError: If file does not exist
            IOError: If file cannot be read
        """
        # Validate file exists
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")
        
        if not os.path.isfile(file_path):
            raise ValueError(f"Path is not a file: {file_path}")
        
        file_ext = Path(file_path).suffix.lower()
        file_name = os.path.basename(file_path)
        
        try:
            if file_ext == '.pdf':
                loaded_documents = PyPDFium2Loader(file_path).load()
                logger.info(f"PDF document loaded successfully: {len(loaded_documents)} page(s)")
            elif file_ext == '.txt':
                try:
                    # Use LangChain's TextLoader which handles encoding automatically
                    loader = TextLoader(file_path, encoding='utf-8')
                    loaded_documents = loader.load()
                    logger.info(f"TXT document loaded successfully (UTF-8): {len(loaded_documents)} document(s)")
                except UnicodeDecodeError:
                    # Fallback to latin-1 if UTF-8 fails
                    logger.warning("UTF-8 decoding failed, trying latin-1 encoding...")
                    loader = TextLoader(file_path, encoding='latin-1')
                    loaded_documents = loader.load()
                    logger.info(f"TXT document loaded successfully (latin-1): {len(loaded_documents)} document(s)")
            else:
                raise ValueError(f"Unsupported file type: {file_ext}. Supported types: .pdf, .txt")
        except Exception as e:
            logger.error(f"Error loading document {file_path}: {e}")
            raise

        #normalise data before returning
        #self._normalize_metadata(loaded_documents, document_id=document_id)
        
        # PyPDFium2Loader and TextLoader already set 'source' and 'page' metadata
        # All other metadata (file_name, file_type, etc.) will be set during normalization
        # right before converting to Qdrant points in to_qdrant_points()
        
        return loaded_documents

    def load_document_from_minio(
        self, 
        object_key: str, 
        bucket_name: Optional[str] = None
    ) -> List[Document]:
        """
        Load a document from MinIO object storage. Automatically detects file type.
        Supports PDF and TXT files.
        
        Downloads the file from MinIO to a temporary location, loads it using
        the standard load_document method, then cleans up the temporary file.
        
        Args:
            object_key: The object key/path of the file in MinIO (e.g., "documents/file.pdf")
            bucket_name: Optional bucket name. If None, uses the bucket configured in __init__
        
        Returns:
            List of Document objects
        
        Raises:
            RuntimeError: If MinIO client is not initialized
            ValueError: If file type is not supported
            FileNotFoundError: If object does not exist in MinIO
            IOError: If file cannot be read or downloaded
        
        Example:
            >>> worker = IngestionWorker(
            ...     minio_endpoint="localhost:9000",
            ...     minio_access_key="yourbot_minio_admin",
            ...     minio_secret_key="yourbot_minio_password"
            ... )
            >>> documents = worker.load_document_from_minio("documents/file.pdf")
        """
        if not self.minio_client:
            raise RuntimeError(
                "MinIO client not initialized. Provide minio_endpoint, minio_access_key, "
                "and minio_secret_key in IngestionWorker.__init__()"
            )
        
        bucket = bucket_name or self.minio_bucket_name
        
        # Validate bucket exists
        try:
            if not self.minio_client.bucket_exists(bucket):
                raise FileNotFoundError(f"Bucket '{bucket}' does not exist in MinIO")
        except S3Error as e:
            logger.error(f"MinIO error checking bucket existence: {e}")
            raise RuntimeError(f"Failed to verify bucket existence: {e}") from e
        
        # Determine file extension from object_key
        object_path = Path(object_key)
        file_ext = object_path.suffix.lower()
        file_name = object_path.name
        
        if file_ext not in ['.pdf', '.txt']:
            raise ValueError(
                f"Unsupported file type: {file_ext}. Supported types: .pdf, .txt. "
                f"Object key: {object_key}"
            )
        
        # Download file from MinIO to temporary file
        temp_file_path = None
        response = None
        
        try:
            # Download object from MinIO
            logger.info(f"Downloading file from MinIO: bucket={bucket}, object_key={object_key}")
            response = self.minio_client.get_object(bucket, object_key)
            
            try:
                # Read file data
                file_data = response.read()
                logger.info(f"Downloaded {len(file_data)} bytes from MinIO")
                
                # Create temporary file with appropriate extension
                # Use delete=False so we can manually control cleanup
                with tempfile.NamedTemporaryFile(
                    mode='wb',
                    suffix=file_ext,
                    delete=False
                ) as temp_file:
                    temp_file_path = temp_file.name
                    # Write downloaded data to temp file
                    temp_file.write(file_data)
                    temp_file.flush()
                    # File handle is automatically closed when exiting 'with' block
                
                logger.info(f"Temporary file created: {temp_file_path}")
                
                # Load document using existing load_document method
                # The temp file cleanup happens in the outer finally block
                documents = self.load_document(temp_file_path)
                
                # Update source metadata to reflect MinIO object key instead of temp path
                # This ensures metadata correctly references the MinIO location
                for doc in documents:
                    if hasattr(doc, 'metadata') and doc.metadata:
                        # Replace temp file path with MinIO object key
                        doc.metadata['source'] = object_key
                        # Ensure file_name is set from object_key (not temp path)
                        doc.metadata['file_name'] = file_name
                        # Add MinIO-specific metadata
                        doc.metadata['minio_bucket'] = bucket
                        doc.metadata['minio_object_key'] = object_key
                
                logger.info(
                    f"Successfully loaded document from MinIO: "
                    f"object_key={object_key}, pages={len(documents)}"
                )
                
                return documents
                
            finally:
                # Always close the MinIO response
                if response is not None:
                    try:
                        response.close()
                        response.release_conn()
                    except Exception as e:
                        logger.warning(f"Error closing MinIO response: {e}")
                        
        except S3Error as e:
            if e.code == "NoSuchKey":
                raise FileNotFoundError(
                    f"Object '{object_key}' not found in bucket '{bucket}'"
                ) from e
            else:
                logger.error(f"MinIO error downloading object: {e}", exc_info=True)
                raise RuntimeError(f"Failed to download file from MinIO: {e}") from e
                
        except Exception as e:
            logger.error(
                f"Error loading document from MinIO object_key={object_key}, bucket={bucket}: {e}",
                exc_info=True
            )
            raise
            
        finally:
            # Always clean up temporary file if it exists
            # This ensures cleanup happens in all cases:
            # - Success: after load_document completes
            # - Failure: if load_document or any earlier step fails
            if temp_file_path and os.path.exists(temp_file_path):
                try:
                    os.unlink(temp_file_path)
                    logger.debug(f"Cleaned up temporary file: {temp_file_path}")
                except OSError as e:
                    logger.warning(
                        f"Failed to delete temporary file {temp_file_path}: {e}. "
                        f"Manual cleanup may be required."
                    )


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
            chunk_size: Maximum size of each chunk (in characters)
            chunk_overlap: Overlap between chunks (in characters)
        
        Returns:
            List of Document objects (chunks)
        
        Raises:
            ValueError: If chunk_size or chunk_overlap are invalid
        """
        if chunk_size <= 0:
            raise ValueError("chunk_size must be positive")
        if chunk_overlap < 0:
            raise ValueError("chunk_overlap must be non-negative")
        if chunk_overlap >= chunk_size:
            raise ValueError("chunk_overlap must be less than chunk_size")
        
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", ". ", " "],  # paragraph → line → sentence → word-ish
        )

        chunks = text_splitter.split_documents(documents)
        logger.info(f"Chunking complete: {len(chunks)} chunk(s) from {len(documents)} document(s)")
        return chunks

    def _chunk_table_rows(
        self,
        headers: List[str],
        rows: List[List[Any]],
        base_metadata: Dict[str, Any],
        window_size: int = 10,
        overlap: int = 2,
    ) -> List[Document]:
        """
        Chunk a table into row windows while preserving headers.

        Each chunk becomes a Document with:
        - markdown-style table text
        - row_start / row_end metadata
        - is_table = True
        """
        docs: List[Document] = []
        n = len(rows)
        if n == 0:
            return docs

        start = 0
        while start < n:
            end = min(start + window_size, n)
            window_rows = rows[start:end]

            # Build markdown content for this window
            header_line = " | ".join(headers)
            separator_line = " | ".join("---" for _ in headers)
            md_lines = [header_line, separator_line]

            for r in window_rows:
                # Ensure same number of columns as headers
                row_cells = [
                    "" if cell is None else str(cell).strip()
                    for cell in r[: len(headers)]
                ]
                if len(row_cells) < len(headers):
                    row_cells += [""] * (len(headers) - len(row_cells))
                md_lines.append(" | ".join(row_cells))

            content = "\n".join(md_lines)

            meta = {
                **base_metadata,
                "row_start": start,
                "row_end": end - 1,
                "is_table": True,
            }

            docs.append(Document(page_content=content, metadata=meta))

            if end == n:
                break
            start = max(end - overlap, 0)

        return docs


    def extract_tables_as_documents(
        self,
        file_path: str,
    ) -> List[Document]:
        """
        Extract tables from a PDF as structured Documents using pdfplumber.

        Each table is split into row-window chunks via _chunk_table_rows(),
        and tagged with:
            - is_table = True
            - table_index
            - page (0-indexed, normalized later)
            - extraction_mode = "table_parser"
        """
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")
        if not os.path.isfile(file_path):
            raise ValueError(f"Path is not a file: {file_path}")

        file_ext = Path(file_path).suffix.lower()
        if file_ext != ".pdf":
            # Table parser currently only supports PDF
            logger.info(f"Table extraction skipped: not a PDF ({file_path})")
            return []

        file_name = os.path.basename(file_path)
        table_docs: List[Document] = []

        try:
            with pdfplumber.open(file_path) as pdf:
                for page_index, page in enumerate(pdf.pages):
                    try:
                        tables = page.extract_tables()
                    except Exception as e:
                        logger.warning(f"Failed to extract tables on page {page_index}: {e}")
                        continue

                    if not tables:
                        continue

                    for table_index, table in enumerate(tables):
                        if not table or len(table) < 2:
                            # need at least header + 1 data row
                            continue

                        # First row as headers
                        raw_headers = table[0]
                        headers = [
                            "" if h is None else str(h).strip()
                            for h in raw_headers
                        ]

                        # Remaining rows as data
                        raw_rows = table[1:]
                        rows = [
                            ["" if cell is None else str(cell).strip() for cell in row]
                            for row in raw_rows
                        ]

                        base_meta = {
                            "file_name": file_name,
                            "file_type": "pdf",
                            "source": file_path,
                            "page": page_index,  # will be normalized to +1 later
                            "table_index": table_index,
                            "extraction_mode": "table_parser",
                            # is_table + row_start/row_end added in _chunk_table_rows
                        }

                        table_docs.extend(
                            self._chunk_table_rows(
                                headers=headers,
                                rows=rows,
                                base_metadata=base_meta,
                                window_size=10,
                                overlap=2,
                            )
                        )
        except Exception as e:
            logger.error(f"Error during table extraction for {file_path}: {e}", exc_info=True)
            return []

        logger.info(f"Extracted {len(table_docs)} table chunk(s) from {file_path}")
        return table_docs


    def embed_chunks(self, chunks: List[Document]) -> Tuple[List[Document], List[List[float]]]:
        """
        Generate embeddings for each chunk.
        
        Returns chunks and their embeddings as separate parallel lists,
        preserving the original Document structure without mutation.
        
        Args:
            chunks: List of Document objects to embed
        
        Returns:
            Tuple of (chunks, embeddings) where embeddings[i] corresponds to chunks[i]
        
        Raises:
            ValueError: If chunks list is empty
            RuntimeError: If embedding generation fails
        """
        if not chunks:
            raise ValueError("Cannot embed empty chunks list")
        
        # Extract page_content for embedding (embed_documents requires list of strings)
        page_contents = [chunk.page_content for chunk in chunks]

        try:
            # OllamaEmbeddings will batch efficiently under the hood
            embeddings = self.embeddings.embed_documents(page_contents)
            logger.info(f"Generated embeddings for {len(embeddings)} chunk(s)")
        except Exception as e:
            logger.error(f"Error generating embeddings: {e}")
            raise RuntimeError(f"Failed to generate embeddings: {e}") from e
        
        # Validate vector dimensions match
        if len(embeddings) != len(chunks):
            raise RuntimeError(f"Vector count mismatch: {len(embeddings)} vectors for {len(chunks)} chunks")
        
        # Filter out empty embeddings while maintaining parallel structure
        valid_chunks = []
        valid_embeddings = []
        for chunk, embedding in zip(chunks, embeddings):
            if not embedding or len(embedding) == 0:
                logger.warning(f"Empty embedding for chunk, skipping")
                continue
            valid_chunks.append(chunk)
            valid_embeddings.append(embedding)

        logger.info(f"Embedding complete: {len(valid_chunks)} embedded chunk(s)")
        return valid_chunks, valid_embeddings


    def to_qdrant_points(
        self,
        chunks: List[Document],
        embeddings: List[List[float]],
        *,
        document_id: str,
    ) -> List[models.PointStruct]:
        """
        Convert Document chunks and their embeddings to Qdrant PointStruct objects.
        
        This is the ONLY place where we transform to Qdrant's required structure.
        All other methods preserve the original Document structure.
        
        The file path is automatically extracted from the 'source' metadata field
        set by PyPDFium2Loader/TextLoader.
        
        Args:
            chunks: List of Document objects (from embed_chunks)
            embeddings: List of embedding vectors, parallel to chunks
            document_id: Document identifier (UUID or unique ID) - stored in metadata
        
        Returns:
            List of PointStruct objects ready for Qdrant upsert
        
        Raises:
            ValueError: If required parameters are missing or invalid
        """
        if not chunks or not embeddings:
            raise ValueError("chunks and embeddings cannot be empty")
        
        if len(chunks) != len(embeddings):
            raise ValueError(f"chunks and embeddings must have same length: {len(chunks)} vs {len(embeddings)}")
        
        points = []
        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            # Validate chunk structure
            if not hasattr(chunk, 'page_content') or not hasattr(chunk, 'metadata'):
                logger.warning(f"Invalid chunk structure at index {i}, skipping")
                continue
            
            # Metadata is already normalized before chunking, just add chunk-specific fields
            chunk_copy = Document(page_content=chunk.page_content, metadata=chunk.metadata.copy())
            
            # Add chunk_index (only chunk-specific field)
            chunk_copy.metadata["chunk_index"] = i
            
            # Normalize page number for this chunk (PDFs: 0-indexed -> 1-indexed)
            if "page" in chunk_copy.metadata and chunk_copy.metadata["page"] is not None:
                try:
                    page_num = int(chunk_copy.metadata["page"])
                    # Normalize 0-indexed to 1-indexed (0 -> 1, 1 -> 2, etc.)
                    chunk_copy.metadata["page"] = page_num + 1
                except (ValueError, TypeError):
                    logger.warning(f"Invalid page number '{chunk_copy.metadata['page']}', setting to None")
                    chunk_copy.metadata["page"] = None
            
            # Use normalized metadata (this is the JSON metadata dict)
            metadata = chunk_copy.metadata

            # Generate UUID string ID for the point
            point_id = str(uuid.uuid4())

            # Create PointStruct directly (more efficient than converting later)
            # Payload structure: {page_content, file_id, metadata}
            # Vector structure: {"text": embedding} for named vectors
            try:
                points.append(
                    models.PointStruct(
                        id=point_id,
                        vector={"text": embedding},  # Named vector with "text" key
                        payload={
                            "page_content": chunk.page_content,  # Store chunk text
                            "file_id": document_id,  # Document identifier
                            "metadata": metadata,  # Nested JSON metadata dict
                        },
                    )
                )
            except Exception as e:
                logger.error(f"Error creating PointStruct for chunk {i}: {e}")
                continue
        
        logger.info(f"Converted {len(points)} embedded items to Qdrant points")
        return points

    def create_collection(
        self, 
        vector_size: int, 
        distance: str = "Cosine", 
        collection_name: str = "default_testing"
    ) -> bool:
        """
        Create or ensure a Qdrant collection exists with named vectors.
        
        Uses named vector "text" to match the vector structure in points.
        
        Args:
            vector_size: Size of the embedding vectors
            distance: Distance metric ("Cosine", "Euclidean", or "Dot")
            collection_name: Name of the collection
        
        Returns:
            bool: True if collection exists or was created successfully, False otherwise
        """
        if vector_size <= 0:
            logger.error(f"Invalid vector_size: {vector_size}")
            return False
        
        valid_distances = {"Cosine", "Euclidean", "Dot"}
        if distance not in valid_distances:
            logger.error(f"Invalid distance metric: {distance}. Must be one of {valid_distances}")
            return False
        
        try:
            # Check if collection exists and verify vector configuration
            collections = self.qdrant_client.get_collections()
            collection_names = [col.name for col in collections.collections]
            
            if collection_name in collection_names:
                # Check if collection has compatible configuration
                try:
                    collection_info = self.qdrant_client.get_collection(collection_name)
                    vectors_config = collection_info.config.params.vectors
                    
                    # Check if it's a dict (named vectors) with "text" key
                    is_compatible = False
                    if isinstance(vectors_config, dict):
                        # Named vectors - check for "text" vector
                        if "text" in vectors_config:
                            text_vector = vectors_config["text"]
                            # Check if size and distance match
                            if (hasattr(text_vector, 'size') and text_vector.size == vector_size and
                                hasattr(text_vector, 'distance') and text_vector.distance == getattr(models.Distance, distance.upper())):
                                is_compatible = True
                                logger.info(f"Collection '{collection_name}' already exists with compatible named vector 'text' (size: {vector_size}, distance: {distance})")
                                return True
                            else:
                                logger.warning(f"Collection '{collection_name}' has named vector 'text' but incompatible size/distance. Will recreate.")
                        else:
                            logger.warning(f"Collection '{collection_name}' has named vectors but missing 'text' vector. Will recreate.")
                    else:
                        # Unnamed/default vectors - incompatible
                        logger.warning(f"Collection '{collection_name}' uses unnamed vectors (incompatible). Will recreate.")
                    
                    # Collection exists but is incompatible - delete it
                    if not is_compatible:
                        logger.info(f"Deleting incompatible collection '{collection_name}'...")
                        self.qdrant_client.delete_collection(collection_name)
                        logger.info(f"Deleted incompatible collection '{collection_name}'")
                        
                except Exception as e:
                    logger.warning(f"Could not verify collection config for '{collection_name}': {e}. Assuming incompatible and deleting...")
                    try:
                        self.qdrant_client.delete_collection(collection_name)
                        logger.info(f"Deleted collection '{collection_name}' due to verification error")
                    except Exception as delete_error:
                        logger.error(f"Could not delete collection '{collection_name}': {delete_error}")
                        # Continue anyway - create_collection will fail if it still exists
            
            # Create collection with named vectors
            # Vector name "text" matches the vector key used in points
            self.qdrant_client.create_collection(
                collection_name=collection_name,
                vectors_config={
                    "text": models.VectorParams(
                        size=vector_size,
                        distance=getattr(models.Distance, distance.upper()),
                    ),
                },
            )
            logger.info(f"Collection '{collection_name}' created successfully with named vector 'text' (size: {vector_size})")
            return True
        except Exception as e:
            logger.error(f"Unexpected error creating collection '{collection_name}': {e}", exc_info=True)
            return False

    def append_points_to_collection(
        self, 
        points: List[models.PointStruct],
        collection_name: str = "default_testing",
        batch_size: int = QDRANT_BATCH_SIZE
    ) -> bool:
        """
        Append/upsert points to a Qdrant collection with batch processing.
        
        This method processes points in batches for optimal performance and reliability.
        Points are already PointStruct objects, so no conversion needed.
        
        Args:
            points: List of PointStruct objects (created by to_qdrant_points)
            collection_name: Name of the collection
            batch_size: Number of points to upsert per batch (default: 100)
        
        Returns:
            bool: True if all points were successfully upserted, False otherwise
        """
        if not points:
            logger.warning("No points to append")
            return False
        
        if batch_size <= 0:
            logger.error(f"Invalid batch_size: {batch_size}")
            return False
        
        try:
            # Process points in batches for better performance and reliability
            total_points = len(points)
            successful_batches = 0
            failed_batches = 0
            
            for batch_start in range(0, total_points, batch_size):
                batch_end = min(batch_start + batch_size, total_points)
                batch_points = points[batch_start:batch_end]
                
                # Points are already PointStruct objects, ready to upsert
                try:
                    self.qdrant_client.upsert(
                        collection_name=collection_name,
                        points=batch_points,
                    )
                    successful_batches += 1
                    logger.debug(f"Upserted batch {batch_start}-{batch_end}: {len(batch_points)} point(s)")
                except Exception as e:
                    logger.error(f"Unexpected error upserting batch {batch_start}-{batch_end}: {e}", exc_info=True)
                    failed_batches += 1
            
            if failed_batches == 0:
                logger.info(f"Successfully upserted {total_points} point(s) to collection '{collection_name}' in {successful_batches} batch(es)")
                return True
            else:
                logger.warning(
                    f"Partially successful upsert: {successful_batches} successful batch(es), "
                    f"{failed_batches} failed batch(es) to collection '{collection_name}'"
                )
                return False
                
        except Exception as e:
            logger.error(f"Error appending points to collection '{collection_name}': {e}", exc_info=True)
            return False

    
    def extract_tables_from_minio(
        self,
        object_key: str,
        bucket_name: Optional[str] = None
    ) -> List[Document]:
        """
        Extract tables from a PDF stored in MinIO and return them as chunked Documents.
        
        This function handles the complete workflow:
        1. Downloads the file from MinIO to a temporary location
        2. Extracts tables using pdfplumber
        3. Chunks tables into row windows
        4. Updates metadata to reflect MinIO location
        5. Cleans up the temporary file (always executed)
        
        Args:
            object_key: The object key/path of the file in MinIO (e.g., "documents/file.pdf")
            bucket_name: Optional bucket name. If None, uses the bucket configured in __init__
        
        Returns:
            List of Document objects representing table chunks. Returns empty list if:
            - File is not a PDF
            - Table extraction fails
            - File does not exist in MinIO
        
        Note:
            Table extraction is non-critical - failures are logged but do not raise exceptions.
            The temporary file is always cleaned up, even if extraction fails.
        """
        if not self.minio_client:
            logger.warning("MinIO client not initialized. Cannot extract tables from MinIO.")
            return []
        
        bucket = bucket_name or self.minio_bucket_name
        
        # Determine file extension
        object_path = Path(object_key)
        file_ext = object_path.suffix.lower()
        file_name = object_path.name
        
        # Table extraction only supports PDFs
        if file_ext != ".pdf":
            logger.info(f"Table extraction skipped: not a PDF (object_key={object_key})")
            return []
        
        # Validate bucket exists
        try:
            if not self.minio_client.bucket_exists(bucket):
                logger.warning(f"Bucket '{bucket}' does not exist in MinIO. Cannot extract tables.")
                return []
        except S3Error as e:
            logger.warning(f"MinIO error checking bucket existence: {e}. Cannot extract tables.")
            return []
        
        temp_file_path = None
        response = None
        
        try:
            # Download file from MinIO
            logger.info(f"Downloading file from MinIO for table extraction: bucket={bucket}, object_key={object_key}")
            response = self.minio_client.get_object(bucket, object_key)
            
            try:
                # Read file data
                file_data = response.read()
                logger.info(f"Downloaded {len(file_data)} bytes from MinIO for table extraction")
                
                # Create temporary file with .pdf extension
                with tempfile.NamedTemporaryFile(
                    mode='wb',
                    suffix='.pdf',
                    delete=False
                ) as temp_file:
                    temp_file_path = temp_file.name
                    temp_file.write(file_data)
                    temp_file.flush()
                
                logger.info(f"Temporary file created for table extraction: {temp_file_path}")
                
                # Extract tables from the temporary file
                table_docs = self.extract_tables_as_documents(temp_file_path)
                
                # Update metadata to reflect MinIO location instead of temp path
                for doc in table_docs:
                    if hasattr(doc, 'metadata') and doc.metadata:
                        # Replace temp file path with MinIO object key
                        doc.metadata['source'] = object_key
                        doc.metadata['file_name'] = file_name
                        # Add MinIO-specific metadata
                        doc.metadata['minio_bucket'] = bucket
                        doc.metadata['minio_object_key'] = object_key
                
                logger.info(f"Extracted {len(table_docs)} table chunk(s) from MinIO object_key={object_key}")
                return table_docs
                
            finally:
                # Always close the MinIO response
                if response is not None:
                    try:
                        response.close()
                        response.release_conn()
                    except Exception as e:
                        logger.warning(f"Error closing MinIO response: {e}")
                        
        except S3Error as e:
            if e.code == "NoSuchKey":
                logger.warning(f"Object '{object_key}' not found in bucket '{bucket}'. Cannot extract tables.")
            else:
                logger.warning(f"MinIO error downloading object for table extraction: {e}")
            return []
                
        except Exception as e:
            logger.warning(f"Error extracting tables from MinIO object_key={object_key}, bucket={bucket}: {e}. Continuing without tables.")
            return []
            
        finally:
            # Always clean up temporary file
            if temp_file_path and os.path.exists(temp_file_path):
                try:
                    os.unlink(temp_file_path)
                    logger.debug(f"Cleaned up temporary file used for table extraction: {temp_file_path}")
                except OSError as e:
                    logger.warning(f"Failed to delete temporary file {temp_file_path}: {e}. Manual cleanup may be required.")

    def ingestion_pipeline(self, object_key: str, bucket_name: str, file_id: str, collection_name: str = "default_testing-2"):
        """
        Production-ready ingestion pipeline for a file stored in MinIO.
        
        This function orchestrates the complete ingestion process:
        1. Load document from MinIO
        2. Normalize metadata
        3. Chunk documents (text)
        4. Extract and chunk tables (downloads file again temporarily)
        5. Generate embeddings
        6. Convert to Qdrant points
        7. Create/ensure collection exists
        8. Upsert points to collection
        
        Args:
            object_key: The object key/path of the file in MinIO (e.g., "documents/file.pdf")
            bucket_name: The bucket name where the file is stored
            file_id: Unique identifier for the document
            collection_name: Name of the Qdrant collection (default: "default_testing-2")
        
        Returns:
            bool: True if ingestion completed successfully, False otherwise
        
        Raises:
            ValueError: If input parameters are invalid
            RuntimeError: If MinIO client is not initialized or MinIO operations fail
            FileNotFoundError: If object does not exist in MinIO (caught and logged)
        """
        # Input validation
        if not object_key or not isinstance(object_key, str):
            logger.error(f"Invalid object_key provided: {object_key}")
            raise ValueError(f"object_key must be a non-empty string, got: {object_key}")
        
        if not bucket_name or not isinstance(bucket_name, str):
            logger.error(f"Invalid bucket_name provided: {bucket_name}")
            raise ValueError(f"bucket_name must be a non-empty string, got: {bucket_name}")
        
        if not file_id or not isinstance(file_id, str):
            logger.error(f"Invalid file_id provided: {file_id}")
            raise ValueError(f"file_id must be a non-empty string, got: {file_id}")
        
        if not collection_name or not isinstance(collection_name, str):
            logger.error(f"Invalid collection_name provided: {collection_name}")
            raise ValueError(f"collection_name must be a non-empty string, got: {collection_name}")
        
        logger.info(f"Starting ingestion pipeline for file_id={file_id}, object_key={object_key}, bucket={bucket_name}, collection={collection_name}")
        
        # Step 1: Load document from MinIO (handles its own error handling and cleanup)
        documents = self.load_document_from_minio(object_key, bucket_name)
        if not documents:
            logger.error(f"No documents loaded from MinIO object_key={object_key}, file_id={file_id}")
            return False
        
        # Step 2: Normalize metadata for text documents
        self._normalize_metadata(documents, document_id=file_id)
        
        # Step 3: Chunk text documents
        text_chunks = self.chunk_documents(documents)
        if not text_chunks:
            logger.warning(f"No text chunks generated from documents file_id={file_id}")
        
        # Step 4: Extract and chunk tables from MinIO (handles download, extraction, and cleanup)
        documents_with_tables_chunks = self.extract_tables_from_minio(object_key, bucket_name)
        
        # Step 5: Normalize metadata for table documents
        if documents_with_tables_chunks:
            self._normalize_metadata(documents_with_tables_chunks, document_id=file_id)
        
        # Step 6: Combine chunks
        chunks = text_chunks + documents_with_tables_chunks
        if not chunks:
            logger.error(f"No chunks generated (text or table) for file_id={file_id}")
            return False
        
        # Step 7: Generate embeddings (handles its own error handling)
        embedded_chunks, embeddings = self.embed_chunks(chunks)
        if not embedded_chunks or not embeddings:
            logger.error(f"No embeddings generated for file_id={file_id}")
            return False
        
        # Step 8: Convert to Qdrant points (handles its own error handling)
        points = self.to_qdrant_points(embedded_chunks, embeddings, document_id=file_id)
        if not points:
            logger.error(f"No points generated for file_id={file_id}")
            return False
        
        # Step 9: Get vector size from first point
        vector_size = len(points[0].vector["text"])
        if vector_size <= 0:
            logger.error(f"Invalid vector size: {vector_size} for file_id={file_id}")
            return False
        
        # Step 10: Create or ensure collection exists (handles its own error handling)
        if not self.create_collection(vector_size=vector_size, collection_name=collection_name):
            logger.error(f"Failed to create/verify collection '{collection_name}' for file_id={file_id}")
            return False
        
        # Step 11: Upsert points to collection (handles its own error handling)
        if not self.append_points_to_collection(points, collection_name=collection_name):
            logger.error(f"Failed to append points to collection '{collection_name}' for file_id={file_id}")
            return False
        
        logger.info(f"Successfully completed ingestion pipeline for file_id={file_id}, collection={collection_name}, points={len(points)}")
        return True


# ============================================================================
# Celery Task for Ingestion Pipeline
# ============================================================================

@celery_app.task(name='ingestion.ingest_document')
def ingest_document_task(
    object_key: str,
    bucket_name: str,
    file_id: str,
    collection_name: str = "default_testing-2",
    embedding_model_name: str = "embeddinggemma:latest",
    qdrant_host: str = "localhost",
    qdrant_port: int = 6333,
    qdrant_api_key: Optional[str] = None,
    prefer_grpc: bool = True,
    minio_endpoint: str = "localhost:9000",
    minio_access_key: str = "yourbot_minio_admin",
    minio_secret_key: str = "yourbot_minio_password",
    minio_bucket_name: str = "yourbot-documents",
    minio_secure: bool = False,
) -> bool:
    """
    Celery task to ingest a document from MinIO into Qdrant.
    
    This task orchestrates the complete ingestion process:
    1. Initialize IngestionWorker with provided configuration
    2. Load document from MinIO
    3. Normalize metadata
    4. Chunk documents (text)
    5. Extract and chunk tables
    6. Generate embeddings
    7. Convert to Qdrant points
    8. Create/ensure collection exists
    9. Upsert points to collection
    
    Args:
        object_key: The object key/path of the file in MinIO (e.g., "documents/file.pdf")
        bucket_name: The bucket name where the file is stored
        file_id: Unique identifier for the document
        collection_name: Name of the Qdrant collection (default: "default_testing-2")
        embedding_model_name: Name of the Ollama embedding model
        qdrant_host: Qdrant server hostname
        qdrant_port: Qdrant REST API port
        qdrant_api_key: Optional API key for Qdrant Cloud/authenticated instances
        prefer_grpc: Use gRPC instead of REST API for better performance
        minio_endpoint: MinIO endpoint (e.g., "localhost:9000")
        minio_access_key: MinIO access key
        minio_secret_key: MinIO secret key
        minio_bucket_name: MinIO bucket name
        minio_secure: Use HTTPS for MinIO
    
    Returns:
        bool: True if ingestion completed successfully, False otherwise
    
    Example:
        # Trigger task asynchronously
        result = ingest_document_task.delay(
            object_key="documents/file.pdf",
            bucket_name="yourbot-documents",
            file_id="doc-123",
            collection_name="my-collection"
        )
        
        # Check result
        if result.get(timeout=300):
            print("Ingestion successful!")
    """
    try:
        logger.info(
            f"Starting Celery ingestion task for file_id={file_id}, "
            f"object_key={object_key}, bucket={bucket_name}, collection={collection_name}"
        )
        
        # Initialize IngestionWorker with provided configuration
        ingestion_worker = IngestionWorker(
            embedding_model_name=embedding_model_name,
            qdrant_host=qdrant_host,
            qdrant_port=qdrant_port,
            qdrant_api_key=qdrant_api_key,
            prefer_grpc=prefer_grpc,
            minio_endpoint=minio_endpoint,
            minio_access_key=minio_access_key,
            minio_secret_key=minio_secret_key,
            minio_bucket_name=minio_bucket_name,
            minio_secure=minio_secure,
        )
        
        logger.info("IngestionWorker initialized successfully in Celery task")
        
        # Execute the ingestion pipeline
        success = ingestion_worker.ingestion_pipeline(
            object_key=object_key,
            bucket_name=bucket_name,
            file_id=file_id,
            collection_name=collection_name
        )
        
        if success:
            logger.info(
                f"Celery ingestion task completed successfully for file_id={file_id}, "
                f"collection={collection_name}, object_key={object_key}"
            )
        else:
            logger.error(
                f"Celery ingestion task failed for file_id={file_id}, "
                f"object_key={object_key}"
            )
        
        return success
        
    except Exception as e:
        logger.error(
            f"Error in Celery ingestion task for file_id={file_id}, "
            f"object_key={object_key}: {e}",
            exc_info=True
        )
        raise  # Re-raise to mark task as failed in Celery


if __name__ == "__main__":
    # Configure logging for script execution
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    import sys
    
    # Check if running as Celery worker
    if len(sys.argv) > 1 and sys.argv[1] == 'worker':
        # Run as Celery worker
        logger.info("Starting Celery worker for ingestion tasks...")
        celery_app.worker_main(['worker', '--loglevel=info'])
        sys.exit(0)
    
    # MinIO Configuration (from docker-compose.yml)
    MINIO_ENDPOINT = "localhost:9000"
    MINIO_ACCESS_KEY = "yourbot_minio_admin"
    MINIO_SECRET_KEY = "yourbot_minio_password"
    MINIO_BUCKET_NAME = "yourbot-documents"
    
    # Qdrant Configuration
    QDRANT_HOST = "localhost"
    QDRANT_PORT = 6333
    
    # Test file from MinIO
    # Example: "1.+Installing+Kubernetes+using+Kubeadm.txt" or "documents/file.pdf"
    # OBJECT_KEY = "1.+Installing+Kubernetes+using+Kubeadm.txt"  # Change this to your file
    OBJECT_KEY = "tables.pdf"  # Change this to your file
    BUCKET_NAME = MINIO_BUCKET_NAME
    FILE_ID = str(uuid.uuid4())  # Generate unique document ID
    COLLECTION_NAME = "default_testing-2"
    
    logger.info("=" * 80)
    logger.info("Testing Ingestion Pipeline with MinIO")
    logger.info("=" * 80)
    logger.info("Options:")
    logger.info("  1. Run synchronously (default)")
    logger.info("  2. Run as Celery task (set USE_CELERY=True)")
    logger.info("=" * 80)
    logger.info(f"MinIO Endpoint: {MINIO_ENDPOINT}")
    logger.info(f"Bucket: {BUCKET_NAME}")
    logger.info(f"Object Key: {OBJECT_KEY}")
    logger.info(f"File ID: {FILE_ID}")
    logger.info(f"Collection: {COLLECTION_NAME}")
    logger.info("=" * 80)
    
    # Option to test as Celery task (set to True to test async)
    USE_CELERY = False  # Set to True to test as Celery task (requires worker running)
    
    try:
        if USE_CELERY:
            # Test as Celery task (asynchronously)
            logger.info("\n" + "=" * 80)
            logger.info("Testing as Celery task (async)...")
            logger.info("=" * 80)
            logger.info("Make sure Celery worker is running:")
            logger.info("  celery -A ingestion_celery worker --loglevel=info")
            logger.info("=" * 80)
            
            result = ingest_document_task.delay(
                object_key=OBJECT_KEY,
                bucket_name=BUCKET_NAME,
                file_id=FILE_ID,
                collection_name=COLLECTION_NAME,
                embedding_model_name="embeddinggemma:latest",
                qdrant_host=QDRANT_HOST,
                qdrant_port=QDRANT_PORT,
                minio_endpoint=MINIO_ENDPOINT,
                minio_access_key=MINIO_ACCESS_KEY,
                minio_secret_key=MINIO_SECRET_KEY,
                minio_bucket_name=MINIO_BUCKET_NAME,
                minio_secure=False,
            )
            
            logger.info(f"Task submitted to Celery: {result.id}")
            logger.info("Waiting for task to complete...")
            
            # Wait for result (timeout: 5 minutes)
            success = result.get(timeout=300)
            
            if success:
                logger.info("\n" + "=" * 80)
                logger.info("✅ CELERY INGESTION TASK COMPLETED SUCCESSFULLY!")
                logger.info("=" * 80)
                logger.info(f"Task ID: {result.id}")
                logger.info(f"File ID: {FILE_ID}")
                logger.info(f"Collection: {COLLECTION_NAME}")
                logger.info(f"Object Key: {OBJECT_KEY}")
                logger.info("=" * 80)
            else:
                logger.error("\n" + "=" * 80)
                logger.error("❌ CELERY INGESTION TASK FAILED")
                logger.error("=" * 80)
                logger.error("Check the worker logs for error details")
        else:
            # Test synchronously (direct execution)
            logger.info("\n" + "=" * 80)
            logger.info("Testing synchronously (direct execution)...")
            logger.info("=" * 80)
            
            # Initialize IngestionWorker with MinIO and Qdrant configuration
            logger.info("Initializing IngestionWorker...")
            ingestion_worker = IngestionWorker(
                embedding_model_name="embeddinggemma:latest",
                qdrant_host=QDRANT_HOST,
                qdrant_port=QDRANT_PORT,
                minio_endpoint=MINIO_ENDPOINT,
                minio_access_key=MINIO_ACCESS_KEY,
                minio_secret_key=MINIO_SECRET_KEY,
                minio_bucket_name=MINIO_BUCKET_NAME,
                minio_secure=False,
            )
            logger.info("IngestionWorker initialized successfully")
            
            # Test the complete ingestion pipeline
            logger.info("\n" + "=" * 80)
            logger.info("Starting ingestion pipeline...")
            logger.info("=" * 80)
            
            success = ingestion_worker.ingestion_pipeline(
                object_key=OBJECT_KEY,
                bucket_name=BUCKET_NAME,
                file_id=FILE_ID,
                collection_name=COLLECTION_NAME
            )
            
            if success:
                logger.info("\n" + "=" * 80)
                logger.info("✅ INGESTION PIPELINE COMPLETED SUCCESSFULLY!")
                logger.info("=" * 80)
                logger.info(f"File ID: {FILE_ID}")
                logger.info(f"Collection: {COLLECTION_NAME}")
                logger.info(f"Object Key: {OBJECT_KEY}")
                logger.info("=" * 80)
            else:
                logger.error("\n" + "=" * 80)
                logger.error("❌ INGESTION PIPELINE FAILED")
                logger.error("=" * 80)
                logger.error("Check the logs above for error details")
            
    except ValueError as e:
        logger.error(f"Validation error: {e}")
    except RuntimeError as e:
        logger.error(f"Runtime error: {e}")
    except FileNotFoundError as e:
        logger.error(f"File not found error: {e}")
        logger.error("Make sure the file exists in MinIO and the bucket name is correct")
    except Exception as e:
        logger.error(f"Unexpected error: {e}", exc_info=True)
    finally:
        logger.info("\n" + "=" * 80)
        logger.info("Test completed")
        logger.info("=" * 80)
        logger.info("\nTo run as Celery worker:")
        logger.info("  python ingestion_celery.py worker")
        logger.info("Or:")
        logger.info("  celery -A ingestion_celery worker --loglevel=info")
        logger.info("=" * 80)