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
    slug = Column(String(255), nullable=True, unique=True, index=True, comment="URL-friendly identifier (e.g., 'support-bot')")
    
    # Status & Lifecycle
    status = Column(
        SQLEnum(BotStatus, name="bot_status"),
        nullable=False,
        default=BotStatus.DRAFT,
        index=True,
        comment="Bot status: draft, active, paused, or archived"
    )
    is_active = Column(Boolean, default=True, nullable=False, comment="Quick enable/disable toggle")
    last_deployed_at = Column(DateTime(timezone=True), nullable=True, comment="When bot was last deployed/activated")
    
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
    
    # Branding Configuration (JSONB)
    # Structure: { "logo_url": "...", "primary_color": "#6366f1", "font": "...",
    #              "welcome_message": "Hello! How can I help?", "assistant_name": "Assistant" }
    branding = Column(
        JSONB,
        nullable=True,
        comment="Branding: logo URL, theme color, font, welcome message, assistant name"
    )
    
    # UI Configuration (Optional foreign key to ui_configs table)
    ui_config_id = Column(
        UUID(as_uuid=True),
        ForeignKey("ui_configs.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
        comment="Optional UI configuration reference (FK to ui_configs.id)"
    )
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    user = relationship("User", backref="bots")
    ui_config = relationship("UiConfig", backref="bots")
    
    def __repr__(self):
        return f"<Bot(id={self.id}, name={self.name}, status={self.status}, user_id={self.user_id})>"

