from sqlalchemy.orm import Session
from sqlalchemy import text
from uuid import UUID
from typing import Dict, Any, Optional
from app.models.bot import Bot, BotStatus
from app.models.user import User
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
        
        # Enhance branding with UI positioning defaults if not provided
        branding = bot_data.get("branding") or {}
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
            status=BotStatus.DRAFT,  # Start as draft - must be activated to be embeddable
            # Note: is_active is now computed from status (status == ACTIVE means active)
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
        
        # Update only provided fields
        update_data = bot_update.model_dump(exclude_unset=True)
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
        
        Note: This will automatically delete all associated installation_snippets
        due to the CASCADE delete constraint in the database.
        
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
        
        # Use raw SQL to delete the bot, bypassing SQLAlchemy's relationship management
        # This ensures database CASCADE handles snippet deletion without SQLAlchemy
        # trying to nullify the foreign key first
        # Pass UUID directly - psycopg2 will handle type conversion
        result = db.execute(
            text("DELETE FROM bots WHERE id = :bot_id"),
            {"bot_id": bot_id}
        )
        db.commit()
        
        # Check if any rows were deleted
        return result.rowcount > 0

