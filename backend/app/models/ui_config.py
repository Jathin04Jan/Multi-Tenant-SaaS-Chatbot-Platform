from sqlalchemy import Column, String, Text, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base


class UiConfig(Base):
    """UI Configuration model - stores chatbot UI customization settings."""
    
    __tablename__ = "ui_configs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Owner/tenant reference (FK to users.id)"
    )
    
    # UI Configuration
    name = Column(String(100), nullable=True, comment="Optional name for this UI config")
    primary_color = Column(String(20), nullable=True, comment="Primary theme color (e.g., '#6366f1')")
    background_color = Column(String(20), nullable=True, comment="Background color (e.g., '#ffffff')")
    chat_title = Column(String(150), nullable=True, comment="Chat widget title")
    intro_message = Column(Text, nullable=True, comment="Welcome/intro message shown to users")
    avatar_url = Column(Text, nullable=True, comment="Avatar/logo URL for the chatbot")
    position = Column(String(50), nullable=True, comment="Widget position (e.g., 'bottom-right', 'bottom-left')")
    height = Column(Integer, nullable=True, comment="Chat window height in pixels")
    width = Column(Integer, nullable=True, comment="Chat window width in pixels")
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    user = relationship("User", backref="ui_configs")
    
    def __repr__(self):
        return f"<UiConfig(id={self.id}, name={self.name}, user_id={self.user_id})>"

