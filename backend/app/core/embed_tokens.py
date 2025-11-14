"""
Embed token management for production-ready widget authentication.

This module handles JWT token creation and verification for embedded chatbot widgets.
Tokens are short-lived and contain tenant_id, bot_id, snippet_id, and origin for security.
"""

from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import jwt, JWTError
from app.core.config import settings

ALGO = "HS256"
DEFAULT_TTL_MINUTES = 10


def get_embed_token_secret() -> str:
    """Get the secret key for embed tokens from settings."""
    # Use a separate secret for embed tokens if available, otherwise fall back to SECRET_KEY
    return getattr(settings, "EMBED_TOKEN_SECRET", settings.SECRET_KEY)


def get_embed_token_ttl() -> int:
    """Get the TTL for embed tokens in minutes."""
    return getattr(settings, "EMBED_TOKEN_TTL_MINUTES", DEFAULT_TTL_MINUTES)


def create_embed_token(
    *,
    tenant_id: str,
    bot_id: str,
    snippet_id: str,
    origin: Optional[str] = None,
    ttl_minutes: Optional[int] = None
) -> str:
    """
    Create a short-lived JWT token for embedded widget authentication.
    
    Args:
        tenant_id: Tenant/user ID (UUID as string)
        bot_id: Bot ID (UUID as string)
        snippet_id: Installation snippet ID (UUID as string)
        origin: Origin domain where widget is embedded (optional)
        ttl_minutes: Token TTL in minutes (defaults to EMBED_TOKEN_TTL_MINUTES)
    
    Returns:
        JWT token string
    """
    now = datetime.now(timezone.utc)
    ttl = ttl_minutes if ttl_minutes is not None else get_embed_token_ttl()
    
    payload = {
        "sub": f"embed:{snippet_id}",  # Subject: embed token for this snippet
        "tid": tenant_id,  # Tenant ID
        "bid": bot_id,  # Bot ID
        "sid": snippet_id,  # Snippet ID
        "org": origin or "",  # Origin domain
        "iat": int(now.timestamp()),  # Issued at
        "exp": int((now + timedelta(minutes=ttl)).timestamp()),  # Expiration
    }
    
    secret = get_embed_token_secret()
    return jwt.encode(payload, secret, algorithm=ALGO)


def verify_embed_token(token: str) -> dict:
    """
    Verify and decode an embed token.
    
    Args:
        token: JWT token string
    
    Returns:
        Decoded token payload (dict with tid, bid, sid, org, etc.)
    
    Raises:
        JWTError: If token is invalid, expired, or malformed
    """
    secret = get_embed_token_secret()
    try:
        payload = jwt.decode(token, secret, algorithms=[ALGO])
        return payload
    except JWTError as e:
        # Re-raise with more context
        raise JWTError(f"Invalid or expired embed token: {str(e)}") from e

