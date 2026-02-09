"""Qdrant collection management service for bot-specific collections."""

from uuid import UUID
from typing import Optional
from qdrant_client import QdrantClient
from qdrant_client.http import models
from app.core.qdrant_client import get_qdrant_client
from app.core.config import settings


# Default embedding dimensions for common models
# These can be overridden per bot via retrieval_config
DEFAULT_EMBEDDING_DIMENSIONS = {
    "qwen3-embedding:4b": 1024,  # Ollama Qwen3 Embedding (default)
    "qwen3-embedding": 1024,  # Ollama Qwen3 Embedding (without tag)
    "text-embedding-ada-002": 1536,  # OpenAI
    "text-embedding-3-small": 1536,  # OpenAI
    "text-embedding-3-large": 3072,  # OpenAI
    "sentence-transformers/all-MiniLM-L6-v2": 384,  # Sentence Transformers
    "sentence-transformers/all-mpnet-base-v2": 768,  # Sentence Transformers
    "default": 1024,  # Default fallback (qwen3-embedding:4b dimension)
}

# Default embedding model (used when not specified in retrieval_config)
DEFAULT_EMBEDDING_MODEL = "qwen3-embedding:4b"


def get_bot_collection_name(bot_id: UUID) -> str:
    """
    Generate Qdrant collection name for a bot.
    
    Args:
        bot_id: Bot UUID
    
    Returns:
        str: Collection name in format 'bot_{bot_id}'
    """
    return f"bot_{str(bot_id).replace('-', '_')}"


def get_embedding_model(retrieval_config: Optional[dict] = None) -> str:
    """
    Get embedding model name from retrieval config or use default.
    
    Args:
        retrieval_config: Bot's retrieval_config JSONB field
    
    Returns:
        str: Embedding model name
    """
    if not retrieval_config:
        return DEFAULT_EMBEDDING_MODEL
    
    # Check if embedding_model is specified
    embedding_model = retrieval_config.get("embedding_model")
    if embedding_model and isinstance(embedding_model, str):
        return embedding_model
    
    # Default fallback
    return DEFAULT_EMBEDDING_MODEL


def get_embedding_dimension(retrieval_config: Optional[dict] = None) -> int:
    """
    Get embedding dimension from retrieval config or use default.
    
    Args:
        retrieval_config: Bot's retrieval_config JSONB field
    
    Returns:
        int: Embedding dimension size
    """
    if not retrieval_config:
        return DEFAULT_EMBEDDING_DIMENSIONS["default"]
    
    # Check if embedding_model is specified
    embedding_model = retrieval_config.get("embedding_model")
    if embedding_model:
        # Try exact match first
        if embedding_model in DEFAULT_EMBEDDING_DIMENSIONS:
            return DEFAULT_EMBEDDING_DIMENSIONS[embedding_model]
        # Try partial match (e.g., "qwen3-embedding" matches "qwen3-embedding:4b")
        for model_name, dimension in DEFAULT_EMBEDDING_DIMENSIONS.items():
            if model_name.startswith(embedding_model) or embedding_model.startswith(model_name.split(":")[0]):
                return dimension
    
    # Check if vector_size is explicitly set
    vector_size = retrieval_config.get("vector_size")
    if vector_size and isinstance(vector_size, int):
        return vector_size
    
    # Default fallback (qwen3-embedding:4b dimension)
    return DEFAULT_EMBEDDING_DIMENSIONS["default"]


def create_bot_collection(
    bot_id: UUID,
    retrieval_config: Optional[dict] = None,
    distance: str = "Cosine"
) -> bool:
    """
    Create a Qdrant collection for a bot.
    
    Args:
        bot_id: Bot UUID
        retrieval_config: Bot's retrieval_config JSONB field (optional)
        distance: Distance metric ("Cosine", "Euclidean", or "Dot")
    
    Returns:
        bool: True if collection was created successfully or already exists
    """
    try:
        client = get_qdrant_client()
        collection_name = get_bot_collection_name(bot_id)
        vector_size = get_embedding_dimension(retrieval_config)
        
        # Check if collection already exists
        collections = client.get_collections()
        collection_names = [col.name for col in collections.collections]
        
        if collection_name in collection_names:
            return True  # Collection already exists
        
        # Create collection
        client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(
                size=vector_size,
                distance=getattr(models.Distance, distance.upper()),
            ),
        )
        return True
    except Exception as e:
        print(f"Error creating bot collection for bot {bot_id}: {e}")
        return False


def delete_bot_collection(bot_id: UUID) -> bool:
    """
    Delete a Qdrant collection for a bot.
    
    Args:
        bot_id: Bot UUID
    
    Returns:
        bool: True if collection was deleted successfully or didn't exist
    """
    try:
        client = get_qdrant_client()
        collection_name = get_bot_collection_name(bot_id)
        
        # Check if collection exists
        collections = client.get_collections()
        collection_names = [col.name for col in collections.collections]
        
        if collection_name not in collection_names:
            return True  # Collection doesn't exist, consider it successful
        
        # Delete collection
        client.delete_collection(collection_name=collection_name)
        return True
    except Exception as e:
        print(f"Error deleting bot collection for bot {bot_id}: {e}")
        return False


def collection_exists(bot_id: UUID) -> bool:
    """
    Check if a Qdrant collection exists for a bot.
    
    Args:
        bot_id: Bot UUID
    
    Returns:
        bool: True if collection exists
    """
    try:
        client = get_qdrant_client()
        collection_name = get_bot_collection_name(bot_id)
        
        collections = client.get_collections()
        collection_names = [col.name for col in collections.collections]
        
        return collection_name in collection_names
    except Exception as e:
        print(f"Error checking collection existence for bot {bot_id}: {e}")
        return False


def get_bot_collection_client(bot_id: UUID) -> Optional[QdrantClient]:
    """
    Get Qdrant client and ensure collection exists for a bot.
    
    Args:
        bot_id: Bot UUID
    
    Returns:
        QdrantClient: Qdrant client instance, or None if collection doesn't exist
    """
    if not collection_exists(bot_id):
        return None
    
    return get_qdrant_client()

