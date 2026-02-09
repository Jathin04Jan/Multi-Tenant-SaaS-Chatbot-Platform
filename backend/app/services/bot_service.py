from sqlalchemy.orm import Session
from sqlalchemy import text
from uuid import UUID
from typing import Dict, Any, Optional
from app.models.bot import Bot, BotStatus
from app.models.user import User
from app.schemas.bot import BotCreate, BotUpdate
from app.models.document import Document
from app.services.qdrant_collection_service import (
    create_bot_collection,
    delete_bot_collection,
    get_bot_collection_name
)
from app.core.config import settings
from app.core.minio_client import delete_file


class BotService:
    """Service for bot-related business logic."""
    
    @staticmethod
    def get_user_draft_bot(db: Session, user_id: UUID) -> Optional[Bot]:
        """Return the current draft bot for a user, if any."""
        return (
            db.query(Bot)
            .filter(Bot.user_id == user_id, Bot.status == BotStatus.DRAFT)
            .order_by(Bot.updated_at.desc())
            .first()
        )

    @staticmethod
    def create_draft_bot(
        db: Session,
        user: User,
        bot_data: Optional[Dict[str, Any]] = None,
    ) -> Bot:
        """
        Create a draft bot for a user. Only one draft is allowed per user.
        """
        existing_draft = BotService.get_user_draft_bot(db, user.id)
        if existing_draft:
            raise ValueError("Finish or reset your existing draft before creating a new bot.")

        payload = bot_data or {}
        name = payload.get("name") or "Untitled Bot"

        branding = payload.get("branding") or {}
        branding.setdefault("position", "bottom-right")
        branding.setdefault("height", 600)
        branding.setdefault("width", 400)
        branding.setdefault("background_color", "#ffffff")

        # Set default LLM config if not provided
        llm_config = payload.get("llm_config") or {}
        if "model" not in llm_config:
            llm_config["model"] = settings.OLLAMA_LLM_MODEL
        if "temperature" not in llm_config:
            llm_config["temperature"] = 0.7

        # Set default retrieval config if not provided
        retrieval_config = payload.get("retrieval_config") or {}
        if "embedding_model" not in retrieval_config:
            retrieval_config["embedding_model"] = settings.OLLAMA_EMBEDDING_MODEL
        if "chunk_size" not in retrieval_config:
            retrieval_config["chunk_size"] = 1000
        if "chunk_overlap" not in retrieval_config:
            retrieval_config["chunk_overlap"] = 200

        bot = Bot(
            user_id=user.id,
            name=name,
            description=payload.get("description"),
            status=BotStatus.DRAFT,
            branding=branding,
            llm_config=llm_config if llm_config else None,
            guardrails=payload.get("guardrails"),
            retrieval_config=retrieval_config if retrieval_config else None,
        )

        db.add(bot)
        db.commit()
        db.refresh(bot)
        return bot

    @staticmethod
    def clear_draft_bot(db: Session, user_id: UUID) -> bool:
        """Delete the user's draft bot (if any), including assets."""
        draft = BotService.get_user_draft_bot(db, user_id)
        if not draft:
            return False
        return BotService.delete_bot(db=db, bot_id=draft.id, user_id=user_id)

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
        
        existing_draft = BotService.get_user_draft_bot(db, user.id)
        if existing_draft:
            raise ValueError("Finish or reset your existing draft before creating a new bot.")

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
        
        # Set default LLM config if not provided
        llm_config = bot_data.get("llm_config") or {}
        if "model" not in llm_config:
            llm_config["model"] = settings.OLLAMA_LLM_MODEL
        if "temperature" not in llm_config:
            llm_config["temperature"] = 0.7
        
        # Set default retrieval config if not provided
        retrieval_config = bot_data.get("retrieval_config") or {}
        if "embedding_model" not in retrieval_config:
            retrieval_config["embedding_model"] = settings.OLLAMA_EMBEDDING_MODEL
        if "chunk_size" not in retrieval_config:
            retrieval_config["chunk_size"] = 1000
        if "chunk_overlap" not in retrieval_config:
            retrieval_config["chunk_overlap"] = 200
        
        # Create bot instance
        # Start as DRAFT - user must activate it after configuration is complete
        bot = Bot(
            user_id=user.id,
            name=name,
            description=bot_data.get("description"),
            status=BotStatus.DRAFT,  # Start as draft - must be activated to be embeddable
            # Note: is_active is now computed from status (status == ACTIVE means active)
            branding=branding,
            llm_config=llm_config if llm_config else None,
            guardrails=bot_data.get("guardrails"),
            retrieval_config=retrieval_config if retrieval_config else None,
        )
        
        db.add(bot)
        db.commit()
        db.refresh(bot)
        
        # Create Qdrant collection if bot is created as ACTIVE (unlikely but handle it)
        if bot.status == BotStatus.ACTIVE:
            try:
                create_bot_collection(
                    bot_id=bot.id,
                    retrieval_config=bot.retrieval_config
                )
            except Exception as e:
                print(f"Warning: Failed to create Qdrant collection for bot {bot.id}: {e}")
        
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
        
        # Track if status is changing to ACTIVE (for collection creation)
        old_status = bot.status
        was_active = old_status == BotStatus.ACTIVE
        
        # Update only provided fields
        update_data = bot_update.model_dump(exclude_unset=True)
        print(f"DEBUG: Updating bot {bot_id} with fields: {list(update_data.keys())}")
        if 'name' in update_data:
            print(f"DEBUG: Setting bot name to: '{update_data['name']}'")
        for field, value in update_data.items():
            setattr(bot, field, value)
        
        db.commit()
        db.refresh(bot)
        print(f"DEBUG: Bot name after update: '{bot.name}'")
        
        # Handle Qdrant collection lifecycle
        new_status = bot.status
        is_now_active = new_status == BotStatus.ACTIVE
        
        # Create collection when bot is activated (status changes to ACTIVE)
        if not was_active and is_now_active:
            try:
                create_bot_collection(
                    bot_id=bot.id,
                    retrieval_config=bot.retrieval_config
                )
                print(f"Created Qdrant collection for bot {bot_id}")
            except Exception as e:
                print(f"Warning: Failed to create Qdrant collection for bot {bot_id}: {e}")
                # Don't fail the update if collection creation fails
        
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

        branding = bot.branding or {}
        logo_key = branding.get("logo_object_key")
        if logo_key:
            try:
                delete_file(logo_key)
            except Exception:
                pass

        # Cleanup related MinIO documents before removing DB rows
        documents = db.query(Document).filter(Document.bot_id == bot_id).all()
        for doc in documents:
            if getattr(doc, "source_type", None) == "file":
                source_url = getattr(doc, "source_url", None)
                if source_url:
                    try:
                        delete_file(source_url)
                    except Exception:
                        # Swallow errors so DB deletion still proceeds; logs handled by caller
                        pass
            db.delete(doc)
        db.flush()
        
        # Delete Qdrant collection for this bot
        try:
            delete_bot_collection(bot_id)
        except Exception as e:
            # Log but don't fail bot deletion if collection deletion fails
            print(f"Warning: Failed to delete Qdrant collection for bot {bot_id}: {e}")
        
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

