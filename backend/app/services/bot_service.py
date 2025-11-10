from sqlalchemy.orm import Session
from uuid import UUID
from typing import Dict, Any, Optional
import re
from app.models.bot import Bot, BotStatus
from app.models.user import User
from app.models.ui_config import UiConfig
from app.schemas.bot import BotCreate, BotUpdate


class BotService:
    """Service for bot-related business logic."""
    
    @staticmethod
    def create_bot(
        db: Session,
        user: User,
        bot_data: Dict[str, Any]
    ) -> Bot:
        """
        Create a new bot for a user.
        
        Args:
            db: Database session
            user: User creating the bot
            bot_data: Dictionary containing bot configuration:
                - name: Bot name (required)
                - description: Bot description (optional)
                - slug: URL-friendly identifier (optional)
                - branding: Branding config (JSONB)
                - llm_config: LLM config (JSONB)
                - guardrails: Guardrails config (JSONB)
                - retrieval_config: Retrieval config (JSONB)
        
        Returns:
            Created Bot instance
        """
        # Extract basic fields
        name = bot_data.get("name")
        if not name:
            raise ValueError("Bot name is required")
        
        # Generate slug if not provided
        slug = bot_data.get("slug")
        if not slug:
            # Generate slug from name: lowercase, replace spaces with hyphens, remove special chars
            slug_base = re.sub(r'[^a-z0-9]+', '-', name.lower().strip())
            slug_base = re.sub(r'^-+|-+$', '', slug_base)  # Remove leading/trailing hyphens
            slug = slug_base
            
            # Ensure uniqueness by appending number if needed
            counter = 1
            original_slug = slug
            while db.query(Bot).filter(Bot.slug == slug).first():
                slug = f"{original_slug}-{counter}"
                counter += 1
        
        # Validate ui_config_id if provided
        ui_config_id = bot_data.get("ui_config_id")
        if ui_config_id:
            try:
                ui_config_uuid = UUID(ui_config_id)
                ui_config = db.query(UiConfig).filter(
                    UiConfig.id == ui_config_uuid,
                    UiConfig.user_id == user.id
                ).first()
                if not ui_config:
                    raise ValueError(f"UI config with ID {ui_config_id} not found or does not belong to user")
            except ValueError as e:
                if "not found" in str(e):
                    raise e
                raise ValueError(f"Invalid UI config ID: {ui_config_id}")
        
        # Enhance branding with UI positioning defaults if not provided (fallback if no ui_config_id)
        branding = bot_data.get("branding") or {}
        if not ui_config_id:  # Only set defaults if no ui_config_id is provided
            if "position" not in branding:
                branding["position"] = "bottom-right"
            if "height" not in branding:
                branding["height"] = 600
            if "width" not in branding:
                branding["width"] = 400
            if "background_color" not in branding:
                branding["background_color"] = "#ffffff"
        
        # Create bot instance
        # Start as DRAFT - user must activate it after configuration is complete
        bot = Bot(
            user_id=user.id,
            name=name,
            description=bot_data.get("description"),
            slug=slug,
            status=BotStatus.DRAFT,  # Start as draft - must be activated to be embeddable
            is_active=True,  # is_active=True, but status must be 'active' for embedding
            ui_config_id=UUID(ui_config_id) if ui_config_id else None,
            branding=branding,
            llm_config=bot_data.get("llm_config"),
            guardrails=bot_data.get("guardrails"),
            retrieval_config=bot_data.get("retrieval_config"),
        )
        
        db.add(bot)
        db.commit()
        db.refresh(bot)
        
        return bot
    
    @staticmethod
    def update_bot(
        db: Session,
        bot_id: UUID,
        user_id: UUID,
        bot_update: BotUpdate
    ) -> Optional[Bot]:
        """
        Update an existing bot.
        Only the bot owner can update it.
        
        Args:
            db: Database session
            bot_id: Bot ID to update
            user_id: User ID (for ownership verification)
            bot_update: BotUpdate schema with fields to update
        
        Returns:
            Updated Bot instance or None if not found
        """
        bot = db.query(Bot).filter(
            Bot.id == bot_id,
            Bot.user_id == user_id
        ).first()
        
        if not bot:
            return None
        
        # Validate ui_config_id if provided
        update_data = bot_update.model_dump(exclude_unset=True)
        ui_config_id = update_data.get("ui_config_id")
        if ui_config_id:
            try:
                ui_config_uuid = UUID(ui_config_id)
                ui_config = db.query(UiConfig).filter(
                    UiConfig.id == ui_config_uuid,
                    UiConfig.user_id == user_id
                ).first()
                if not ui_config:
                    raise ValueError(f"UI config with ID {ui_config_id} not found or does not belong to user")
                update_data["ui_config_id"] = ui_config_uuid
            except ValueError as e:
                if "not found" in str(e):
                    raise e
                raise ValueError(f"Invalid UI config ID: {ui_config_id}")
        
        # Update only provided fields
        for field, value in update_data.items():
            setattr(bot, field, value)
        
        db.commit()
        db.refresh(bot)
        
        return bot
    
    @staticmethod
    def delete_bot(
        db: Session,
        bot_id: UUID,
        user_id: UUID
    ) -> bool:
        """
        Delete a bot.
        Only the bot owner can delete it.
        
        Args:
            db: Database session
            bot_id: Bot ID to delete
            user_id: User ID (for ownership verification)
        
        Returns:
            True if deleted, False if not found
        """
        bot = db.query(Bot).filter(
            Bot.id == bot_id,
            Bot.user_id == user_id
        ).first()
        
        if not bot:
            return False
        
        db.delete(bot)
        db.commit()
        
        return True

