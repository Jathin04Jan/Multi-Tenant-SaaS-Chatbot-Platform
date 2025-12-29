"""Qdrant vector database client initialization and utilities."""

from qdrant_client import QdrantClient
from qdrant_client.http import models
from typing import Optional
from app.core.config import settings


def get_qdrant_client() -> QdrantClient:
    """
    Get a Qdrant client instance.
    
    Returns:
        QdrantClient: Configured Qdrant client instance
    """
    client_kwargs = {
        "host": settings.QDRANT_HOST,
        "port": settings.QDRANT_PORT,
        "prefer_grpc": settings.QDRANT_PREFER_GRPC,
    }
    
    # Add API key if provided (for production/cloud Qdrant)
    if settings.QDRANT_API_KEY:
        client_kwargs["api_key"] = settings.QDRANT_API_KEY
    
    return QdrantClient(**client_kwargs)


def ensure_collection_exists(
    client: QdrantClient,
    collection_name: str,
    vector_size: int,
    distance: str = "Cosine"
) -> bool:
    """
    Ensure a Qdrant collection exists, creating it if necessary.
    
    Args:
        client: Qdrant client instance
        collection_name: Name of the collection
        vector_size: Size of the vectors (embedding dimension)
        distance: Distance metric ("Cosine", "Euclidean", or "Dot")
    
    Returns:
        bool: True if collection exists or was created successfully
    """
    try:
        # Check if collection exists
        collections = client.get_collections()
        collection_names = [col.name for col in collections.collections]
        
        if collection_name in collection_names:
            return True
        
        # Create collection if it doesn't exist
        client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(
                size=vector_size,
                distance=getattr(models.Distance, distance.upper()),
            ),
        )
        return True
    except Exception as e:
        print(f"Error ensuring collection exists: {e}")
        return False

