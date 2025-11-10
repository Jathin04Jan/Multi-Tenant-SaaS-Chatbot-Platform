from fastapi import APIRouter, HTTPException, status, Query, Depends, Request
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.config import settings
from app.models.bot import Bot
from app.models.ui_config import UiConfig
from typing import Optional
from uuid import UUID

router = APIRouter(prefix="/public", tags=["public"])


@router.get("/embed-config")
async def get_embed_config(
    request: Request,
    bot_id: Optional[str] = Query(None, description="Bot ID or slug"),
    db: Session = Depends(get_db)
):
    """
    Public endpoint to fetch bot UI configuration for embedding.
    No authentication required - this is called by the widget.js on customer websites.
    
    Query Parameters:
    - bot_id: Bot ID (UUID) or slug (string) to identify the bot
    
    Returns:
    - Bot UI configuration including theme, positioning, and intro message
    """
    if not bot_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="bot_id parameter is required"
        )
    
    try:
        # Try to parse as UUID first, then try as slug
        try:
            bot_uuid = UUID(bot_id)
            bot = db.query(Bot).filter(Bot.id == bot_uuid).first()
        except ValueError:
            # Not a UUID, try as slug
            bot = db.query(Bot).filter(Bot.slug == bot_id).first()
        
        if not bot:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Bot not found"
            )
        
        # PRODUCTION: Only allow ACTIVE bots to be embedded
        # Bots must have status='active' AND is_active=True to be embeddable
        if bot.status.value != 'active' or not bot.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Bot is not active. Only active bots can be embedded."
            )
        
        # Get UI configuration - prefer ui_config if available, fallback to branding
        ui_config = None
        if bot.ui_config_id:
            ui_config = db.query(UiConfig).filter(UiConfig.id == bot.ui_config_id).first()
        
        branding = bot.branding or {}
        
        # Get API base URL from request (scheme + host)
        base_url = f"{request.url.scheme}://{request.url.netloc}"
        # Remove /public/embed-config from the end if present
        base_url = base_url.replace("/public/embed-config", "").rstrip("/")
        
        # Build response with UI configuration
        # Prefer ui_config values, fallback to branding, then defaults
        if ui_config:
            # Use UI config table values
            config = {
                "bot_id": str(bot.id),
                "bot_name": bot.name,
                "theme": {
                    "primary_color": ui_config.primary_color or branding.get("primary_color", "#6366f1"),
                    "background_color": ui_config.background_color or branding.get("background_color", "#ffffff"),
                    "chat_title": ui_config.chat_title or branding.get("chat_title") or branding.get("assistant_name") or bot.name,
                    "avatar_url": ui_config.avatar_url or branding.get("avatar_url") or branding.get("logo_url"),
                    "position": ui_config.position or branding.get("position", "bottom-right"),
                    "height": ui_config.height or branding.get("height", 600),
                    "width": ui_config.width or branding.get("width", 400),
                },
                "intro_message": ui_config.intro_message or branding.get("welcome_message", "Hello! How can I help you today?"),
                "api_base_url": base_url,
            }
        else:
            # Fallback to branding JSONB
            config = {
                "bot_id": str(bot.id),
                "bot_name": bot.name,
                "theme": {
                    "primary_color": branding.get("primary_color", "#6366f1"),
                    "background_color": branding.get("background_color", "#ffffff"),
                    "chat_title": branding.get("chat_title") or branding.get("assistant_name") or bot.name,
                    "avatar_url": branding.get("avatar_url") or branding.get("logo_url"),
                    "position": branding.get("position", "bottom-right"),
                    "height": branding.get("height", 600),
                    "width": branding.get("width", 400),
                },
                "intro_message": branding.get("welcome_message", "Hello! How can I help you today?"),
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

