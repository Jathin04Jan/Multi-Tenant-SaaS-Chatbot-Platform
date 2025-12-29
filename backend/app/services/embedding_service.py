"""Embedding service for generating text embeddings using Ollama."""

import ollama
from typing import List, Optional
from app.core.config import settings
from app.services.qdrant_collection_service import get_embedding_model


class EmbeddingService:
    """Service for generating embeddings using Ollama."""
    
    def __init__(self):
        """Initialize Ollama client."""
        # Parse Ollama host (remove protocol if present)
        ollama_host = settings.OLLAMA_HOST
        if ollama_host.startswith("http://"):
            ollama_host = ollama_host.replace("http://", "")
        elif ollama_host.startswith("https://"):
            ollama_host = ollama_host.replace("https://", "")
        
        self.client = ollama.Client(host=ollama_host)
        self.default_model = settings.OLLAMA_EMBEDDING_MODEL
    
    def generate_embedding(
        self,
        text: str,
        model: Optional[str] = None,
        retrieval_config: Optional[dict] = None
    ) -> List[float]:
        """
        Generate embedding for a single text using Ollama.
        
        Args:
            text: Text to embed
            model: Embedding model name (optional, uses default if not provided)
            retrieval_config: Bot's retrieval_config to determine model (optional)
        
        Returns:
            List[float]: Embedding vector
        """
        # Determine which model to use
        if model:
            embedding_model = model
        elif retrieval_config:
            embedding_model = get_embedding_model(retrieval_config)
        else:
            embedding_model = self.default_model
        
        try:
            # Generate embedding using Ollama
            response = self.client.embeddings(
                model=embedding_model,
                prompt=text
            )
            return response["embedding"]
        except Exception as e:
            raise RuntimeError(f"Failed to generate embedding with Ollama: {e}")
    
    def generate_embeddings_batch(
        self,
        texts: List[str],
        model: Optional[str] = None,
        retrieval_config: Optional[dict] = None
    ) -> List[List[float]]:
        """
        Generate embeddings for multiple texts using Ollama.
        
        Args:
            texts: List of texts to embed
            model: Embedding model name (optional, uses default if not provided)
            retrieval_config: Bot's retrieval_config to determine model (optional)
        
        Returns:
            List[List[float]]: List of embedding vectors
        """
        # Determine which model to use
        if model:
            embedding_model = model
        elif retrieval_config:
            embedding_model = get_embedding_model(retrieval_config)
        else:
            embedding_model = self.default_model
        
        embeddings = []
        for text in texts:
            try:
                embedding = self.generate_embedding(text, model=embedding_model)
                embeddings.append(embedding)
            except Exception as e:
                # Log error but continue with other texts
                print(f"Error generating embedding for text: {e}")
                # Append empty embedding or skip? For now, skip failed ones
                continue
        
        return embeddings


# Global instance
_embedding_service: Optional[EmbeddingService] = None


def get_embedding_service() -> EmbeddingService:
    """
    Get or create the global embedding service instance.
    
    Returns:
        EmbeddingService: Singleton embedding service instance
    """
    global _embedding_service
    if _embedding_service is None:
        _embedding_service = EmbeddingService()
    return _embedding_service

