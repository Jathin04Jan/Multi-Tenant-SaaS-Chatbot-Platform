from sqlalchemy import Column, String, Text, Boolean, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from app.core.database import Base


class AppSetting(Base):
    """App setting model - stores global configuration and landing page content."""
    
    __tablename__ = "app_settings"
    
    key = Column(
        String(255),
        primary_key=True,
        index=True,
        comment="Namespaced key (e.g., 'landing.hero_title', 'brand.app_name', 'support.email')"
    )
    value = Column(
        JSONB,
        nullable=False,
        comment="Any JSON value (string, number, object, array, etc.)"
    )
    description = Column(
        Text,
        nullable=True,
        comment="Admin description of what this setting controls"
    )
    is_public = Column(
        Boolean,
        nullable=False,
        default=False,
        index=True,
        comment="If true, this setting can be exposed via public API (e.g., landing page content)"
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<AppSetting(key={self.key}, is_public={self.is_public})>"

