from sqlalchemy import Column, String, Text, Boolean, DateTime, Enum as SQLEnum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
import enum
from app.core.database import Base


class BotStatus(str, enum.Enum):
    """Bot status options."""
    DRAFT = "draft"  # Being created/configured
    ACTIVE = "active"  # Live and operational
    PAUSED = "paused"  # Temporarily disabled
    ARCHIVED = "archived"  # Deactivated/removed


class Bot(Base):
    """Bot model - stores chatbot configuration and settings."""
    
    __tablename__ = "bots"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Owner/creator of the bot (FK to users.id)"
    )
    
    # Basic Information
    name = Column(String(255), nullable=False, comment="Bot name")
    description = Column(Text, nullable=True, comment="Bot persona summary/description")
    
    # Status & Lifecycle
    status = Column(
        SQLEnum(BotStatus, name="bot_status"),
        nullable=False,
        default=BotStatus.DRAFT,
        index=True,
        comment="Bot status: draft, active, paused, or archived"
    )
    
    # LLM Configuration (JSONB)
    # Structure: { "model": "gpt-4", "temperature": 0.7, "top_p": 0.9, "max_tokens": 1000, 
    #              "communication_style": "friendly", "style_prompt": "..." }
    llm_config = Column(
        JSONB,
        nullable=True,
        comment="LLM configuration: model, temperature, top_p, communication style, style prompt, etc."
    )
    
    # Retrieval Configuration (JSONB)
    # Structure: { "vector_db": {...}, "filters": {...}, "rag_params": {...}, 
    #              "chunk_size": 1000, "chunk_overlap": 200, "embedding_model": "..." }
    retrieval_config = Column(
        JSONB,
        nullable=True,
        comment="RAG/Retrieval configuration: Vector DB details, filters, chunking params, embedding model, etc."
    )
    
    # Guardrails Configuration (JSONB)
    # Structure: { "max_response_length": 500, "blocked_phrases": [...], 
    #              "block_explicit_content": true, "block_political_views": true,
    #              "strictly_stick_to_topic": true, "block_personal_info": true,
    #              "enable_fact_checking": true, "custom_instructions": "..." }
    guardrails = Column(
        JSONB,
        nullable=True,
        comment="Content guardrails: moderation rules, blocked phrases, content filters, custom instructions"
    )
    
    # Branding/UI Configuration (JSONB)
    # Structure: { 
    #   "logo_url": "...", "avatar_url": "...",
    #   "primary_color": "#6366f1", "background_color": "#ffffff",
    #   "welcome_message": "Hello! How can I help?", "intro_message": "...",
    #   "assistant_name": "Assistant", "chat_title": "...",
    #   "position": "bottom-right", "height": 600, "width": 400
    # }
    branding = Column(
        JSONB,
        nullable=True,
        comment="Branding and UI configuration: logo, colors, messages, positioning, widget sizing"
    )
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    user = relationship("User", backref="bots")
    
    @property
    def is_active(self) -> bool:
        """Computed property: bot is active if status is ACTIVE."""
        return self.status.value == BotStatus.ACTIVE.value
    
    def __repr__(self):
        return f"<Bot(id={self.id}, name={self.name}, status={self.status}, user_id={self.user_id})>"

