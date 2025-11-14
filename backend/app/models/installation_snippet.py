from sqlalchemy import Column, String, Text, Boolean, DateTime, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base


class InstallationSnippet(Base):
    """Installation snippet model - stores embed codes and script URLs for bot installation."""
    
    __tablename__ = "installation_snippets"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    # Foreign Keys - Both user_id and bot_id for flexibility
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Owner/tenant reference (FK to users.id)"
    )
    bot_id = Column(
        UUID(as_uuid=True),
        ForeignKey("bots.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Bot reference - snippet is specific to this bot (FK to bots.id)"
    )
    
    # Snippet Content
    script_url = Column(
        Text,
        nullable=True,
        comment="CDN-hosted script URL (e.g., https://cdn.example.com/bot-script.js)"
    )
    embed_code = Column(
        Text,
        nullable=False,
        comment="Full JavaScript snippet for installation (the code users embed on their websites)"
    )
    
    # Metadata & Organization
    name = Column(
        String(255),
        nullable=True,
        comment="Optional name/identifier for the snippet (e.g., 'Production', 'Staging', 'v1.0')"
    )
    environment = Column(
        String(50),
        nullable=True,
        comment="Environment type: 'production', 'staging', 'development'"
    )
    is_active = Column(
        Boolean,
        default=True,
        nullable=False,
        comment="Whether this snippet is currently active/enabled (deprecated: use status)"
    )
    
    # Status field for production-ready snippet management
    status = Column(
        String(20),
        default="active",
        nullable=False,
        comment="Snippet status: 'active' | 'revoked'"
    )
    
    # Security & Access Control
    domain_whitelist = Column(
        JSONB,
        nullable=True,
        comment="List of allowed domains where this snippet can be used (null = no restrictions). Stored as JSON array of strings."
    )
    
    # Alias for domain_whitelist (for compatibility with GPT's naming)
    @property
    def allowed_domains(self):
        """Get allowed domains as a list."""
        if self.domain_whitelist is None:
            return None
        if isinstance(self.domain_whitelist, list):
            return self.domain_whitelist
        return []
    
    # Usage Tracking
    usage_count = Column(
        Integer,
        default=0,
        nullable=False,
        comment="Number of times this snippet has been used/accessed"
    )
    last_used_at = Column(
        DateTime(timezone=True),
        nullable=True,
        comment="Timestamp when snippet was last accessed/used"
    )
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    expires_at = Column(
        DateTime(timezone=True),
        nullable=True,
        comment="Optional expiry timestamp (null = never expires)"
    )
    
    # Relationships
    user = relationship("User", backref="installation_snippets")
    bot = relationship("Bot", backref="installation_snippets")
    
    def __repr__(self):
        return f"<InstallationSnippet(id={self.id}, bot_id={self.bot_id}, name={self.name}, is_active={self.is_active})>"

