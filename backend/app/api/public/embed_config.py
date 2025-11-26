"""
Public endpoint for embed configuration (no authentication required).
Used by widget.js to fetch bot UI configuration and receive JWT token.
"""

from fastapi import APIRouter, HTTPException, status, Query, Depends, Request
from sqlalchemy.orm import Session
from urllib.parse import urlparse
from typing import Optional
from uuid import UUID
import logging

from app.core.database import get_db
from app.core.config import settings
from app.core.embed_tokens import create_embed_token
from app.models.bot import Bot
from app.models.installation_snippet import InstallationSnippet

router = APIRouter(prefix="/public", tags=["public"])
logger = logging.getLogger(__name__)


@router.get("/embed-config")
async def get_embed_config(
    request: Request,
    snippet_id: Optional[str] = Query(None, description="Installation snippet ID (UUID) - preferred method"),
    bot_id: Optional[str] = Query(None, description="Bot ID (UUID) - DEPRECATED: use snippet_id instead"),
    db: Session = Depends(get_db)
):
    """
    Public endpoint to fetch bot UI configuration for embedding.
    No authentication required - this is called by the widget.js on customer websites.
    
    **Production-ready flow (preferred):**
    - Uses snippet_id to identify the embed placement
    - Validates snippet status and domain allow-list
    - Returns short-lived JWT token for chat API authentication
    
    **Legacy flow (deprecated):**
    - Uses bot_id for backward compatibility
    - Will be removed in future versions
    
    Query Parameters:
    - snippet_id: Installation snippet ID (UUID) - preferred
    - bot_id: Bot ID (UUID) - DEPRECATED, use snippet_id instead
    
    Returns:
    - Bot UI configuration including theme, positioning, intro message
    - JWT token for authenticating chat API requests
    """
    
    # Extract origin from request headers
    origin = request.headers.get("origin") or request.headers.get("referer") or ""
    host = None
    if origin:
        try:
            parsed = urlparse(origin)
            host = parsed.hostname
        except Exception:
            pass
    
    # Primary flow: Use snippet_id (production-ready)
    if snippet_id:
        try:
            snippet_uuid = UUID(snippet_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid snippet_id format (must be UUID)"
            )
        
        snippet = db.query(InstallationSnippet).filter(InstallationSnippet.id == snippet_uuid).first()
        if not snippet:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Snippet not found"
            )
        
        # Check snippet status
        if snippet.status != "active":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Snippet is not active"
            )
        
        # Domain allow-list validation
        if snippet.domain_whitelist:
            allowed_domains = snippet.domain_whitelist if isinstance(snippet.domain_whitelist, list) else []
            if allowed_domains and host not in allowed_domains:
                # Also check without www prefix
                host_without_www = host.replace("www.", "") if host else None
                if host_without_www not in allowed_domains:
                    raise HTTPException(
                        status_code=status.HTTP_403_FORBIDDEN,
                        detail=f"Domain '{host}' is not allowed. Allowed domains: {', '.join(allowed_domains)}"
                    )
        
        # Load associated bot
        bot = db.query(Bot).filter(Bot.id == snippet.bot_id).first()
        if not bot:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Bot associated with snippet not found"
            )
        
        # Verify bot is active (is_active is computed from status)
        if bot.status.value != 'active':
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Bot is not active"
            )
        
        # Update snippet usage tracking
        snippet.usage_count += 1
        from datetime import datetime, timezone
        snippet.last_used_at = datetime.now(timezone.utc)
        db.commit()
        
        # Get branding/UI configuration from JSONB
        branding = bot.branding or {}
        
        # Get API base URL
        base_url = f"{request.url.scheme}://{request.url.netloc}"
        base_url = base_url.replace("/public/embed-config", "").rstrip("/")
        
        # Get logo/avatar URL and ensure it's absolute
        logo_url = branding.get("avatar_url") or branding.get("logo_url")
        logger.info(f"Embed config: Original logo_url from branding: {logo_url}")
        logger.info(f"Embed config: Branding keys: {list(branding.keys())}")
        
        if logo_url:
            # If it's already an absolute URL, check if it's pointing to localhost or needs to be updated
            if logo_url.startswith(("http://", "https://")):
                # If it's pointing to localhost or a different domain, reconstruct using current request
                from urllib.parse import urlparse
                parsed = urlparse(logo_url)
                # Reconstruct using the current request's base URL
                if "/uploads/logo/" in logo_url:
                    # Extract the encoded key from the URL
                    encoded_key = logo_url.split("/uploads/logo/")[-1]
                    api_prefix = "/api/v1"  # Standard API prefix
                    logo_url = f"{base_url}{api_prefix}/uploads/logo/{encoded_key}"
                    logger.info(f"Embed config: Reconstructed logo_url: {logo_url}")
                # Otherwise keep the original URL if it's a valid external URL
            else:
                # If relative URL, make it absolute using the API base URL
                logo_url = f"{base_url}{logo_url}" if logo_url.startswith("/") else f"{base_url}/{logo_url}"
                logger.info(f"Embed config: Made logo_url absolute: {logo_url}")
        else:
            logger.warning(f"Embed config: No logo_url found in branding for bot {bot.id}")
        
        # Build theme config from branding JSONB
        theme = {
            "primary_color": branding.get("primary_color", "#6366f1"),
            "background_color": branding.get("background_color", "#ffffff"),
            "chat_title": branding.get("chat_title") or branding.get("assistant_name") or bot.name,
            "avatar_url": logo_url,  # Will be None if no logo
            "logo_zoom": branding.get("logo_zoom", 1.0),
            "position": branding.get("position", "bottom-right"),
            "height": branding.get("height", 600),
            "width": branding.get("width", 400),
        }
        intro_message = branding.get("intro_message") or branding.get("welcome_message", "Hello! How can I help you today?")
        
        # Create short-lived JWT token
        token = create_embed_token(
            tenant_id=str(snippet.user_id),
            bot_id=str(snippet.bot_id),
            snippet_id=str(snippet.id),
            origin=host
        )
        
        return {
            "api_base": base_url,
            "theme": theme,
            "intro_message": intro_message,
            "token": token,
            "bot_id": str(bot.id),
            "bot_name": bot.name,
        }
    
    # Legacy flow: Use bot_id (DEPRECATED - UUID only)
    elif bot_id:
        logger.warning(f"DEPRECATED: Using bot_id parameter. Migrate to snippet_id. bot_id={bot_id}")
        
        try:
            # Parse as UUID only (slug support removed)
            bot_uuid = UUID(bot_id)
            bot = db.query(Bot).filter(Bot.id == bot_uuid).first()
            
            if not bot:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Bot not found"
                )
            
            # PRODUCTION: Only allow ACTIVE bots to be embedded
            if bot.status.value != 'active':
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Bot is not active. Only active bots can be embedded."
                )
            
            # Get branding/UI configuration from JSONB
            branding = bot.branding or {}
            
            # Get API base URL
            base_url = f"{request.url.scheme}://{request.url.netloc}"
            base_url = base_url.replace("/public/embed-config", "").rstrip("/")
            
            # Get logo/avatar URL and ensure it's absolute
            logo_url = branding.get("avatar_url") or branding.get("logo_url")
            logger.info(f"Embed config (legacy): Original logo_url from branding: {logo_url}")
            logger.info(f"Embed config (legacy): Branding keys: {list(branding.keys())}")
            
            if logo_url:
                # If it's already an absolute URL, check if it's pointing to localhost or needs to be updated
                if logo_url.startswith(("http://", "https://")):
                    # If it's pointing to localhost or a different domain, reconstruct using current request
                    from urllib.parse import urlparse
                    parsed = urlparse(logo_url)
                    # Reconstruct using the current request's base URL
                    if "/uploads/logo/" in logo_url:
                        # Extract the encoded key from the URL
                        encoded_key = logo_url.split("/uploads/logo/")[-1]
                        api_prefix = "/api/v1"  # Standard API prefix
                        logo_url = f"{base_url}{api_prefix}/uploads/logo/{encoded_key}"
                        logger.info(f"Embed config (legacy): Reconstructed logo_url: {logo_url}")
                    # Otherwise keep the original URL if it's a valid external URL
                else:
                    # If relative URL, make it absolute using the API base URL
                    logo_url = f"{base_url}{logo_url}" if logo_url.startswith("/") else f"{base_url}/{logo_url}"
                    logger.info(f"Embed config (legacy): Made logo_url absolute: {logo_url}")
            else:
                logger.warning(f"Embed config (legacy): No logo_url found in branding for bot {bot.id}")
            
            # Build response (legacy format - no token for backward compatibility)
            config = {
                "bot_id": str(bot.id),
                "bot_name": bot.name,
                "theme": {
                    "primary_color": branding.get("primary_color", "#6366f1"),
                    "background_color": branding.get("background_color", "#ffffff"),
                    "chat_title": branding.get("chat_title") or branding.get("assistant_name") or bot.name,
                    "avatar_url": logo_url,
                    "logo_zoom": branding.get("logo_zoom", 1.0),
                    "position": branding.get("position", "bottom-right"),
                    "height": branding.get("height", 600),
                    "width": branding.get("width", 400),
                },
                "intro_message": branding.get("intro_message") or branding.get("welcome_message", "Hello! How can I help you today?"),
                "api_base_url": base_url,
            }
            
            return config
        
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An error occurred while fetching embed config: {str(e)}"
            )
    
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Either snippet_id (preferred) or bot_id (deprecated) parameter is required"
        )
