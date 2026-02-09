"""
Production-ready document ingestion worker for Qdrant vector database.

This module provides a robust implementation for loading, chunking, embedding,
and storing documents in Qdrant following industry best practices.
"""

import logging
import uuid
import os
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Any, Optional, Tuple

from langchain_community.document_loaders import PyPDFium2Loader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings
from langchain_core.documents import Document
from qdrant_client import QdrantClient
from qdrant_client.http import models

# Configure logging
logger = logging.getLogger(__name__)

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
    ):
        """
        Initialize the ingestion worker.
        
        Args:
            embedding_model_name: Name of the Ollama embedding model
            qdrant_host: Qdrant server hostname
            qdrant_port: Qdrant REST API port (gRPC port is typically port + 1)
            qdrant_api_key: Optional API key for Qdrant Cloud/authenticated instances
            prefer_grpc: Use gRPC instead of REST API for better performance (default: True)
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
        
        # PyPDFium2Loader and TextLoader already set 'source' and 'page' metadata
        # All other metadata (file_name, file_type, etc.) will be set during normalization
        # right before converting to Qdrant points in to_qdrant_points()
        
        return loaded_documents

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


if __name__ == "__main__":
    # Configure logging for script execution
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    ingestion_worker = IngestionWorker()
    
    # Load document (handles both PDF and TXT)
    documents = ingestion_worker.load_document("testing-files/test.pdf")
    logger.info(f"Loaded {len(documents)} document(s)")
    
    # Normalize metadata once before chunking (more efficient than doing it per chunk)
    logger.info("Normalizing document metadata...")
    ingestion_worker._normalize_metadata(
        documents,
        document_id="123",  # Document UUID or unique ID
    )
    logger.info(f"Normalized metadata for {len(documents)} document(s)")
    
    # Chunk the documents (chunks inherit normalized metadata)
    chunks = ingestion_worker.chunk_documents(documents)
    logger.info(f"Generated {len(chunks)} chunks")
    
    # Generate embeddings (returns chunks and embeddings as parallel lists)
    logger.info("Generating embeddings...")
    embedded_chunks, embeddings = ingestion_worker.embed_chunks(chunks)
    logger.info(f"Generated embeddings for {len(embedded_chunks)} chunks")
    
    if embeddings:
        logger.info(f"First embedding sample (first 10 values): {embeddings[0][:10]}")
    
    # Convert to Qdrant points (only place where we transform structure)
    # Metadata already normalized, only chunk_index is added in the loop
    points = ingestion_worker.to_qdrant_points(
        embedded_chunks,
        embeddings,
        document_id="123"  # Document UUID or unique ID
    )
    logger.info(f"Converted {len(points)} points for Qdrant")
    
    if not points:
        raise ValueError("No points generated; cannot infer vector size")
    
    # Get vector size from first point (PointStruct with named vector structure)
    # PointStruct.vector is a dict with named vectors
    vector_size = len(points[0].vector["text"])
    logger.info(f"Vector size: {vector_size}")
    
    # Create collection
    logger.info("Creating Qdrant collection...")
    if not ingestion_worker.create_collection(vector_size=vector_size, collection_name="default_testing-2"):
        raise RuntimeError("Failed to create collection")
    
    # Append points to collection
    logger.info("Appending points to Qdrant...")
    if not ingestion_worker.append_points_to_collection(points, collection_name="default_testing-2"):
        raise RuntimeError("Failed to append points to collection")
    
    logger.info("Done!")
