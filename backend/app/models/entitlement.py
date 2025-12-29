from sqlalchemy import Column, String, Integer, DateTime, Enum as SQLEnum, ForeignKey, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
import enum
from app.core.database import Base


class EntitlementCategory(str, enum.Enum):
    """Entitlement category options."""
    FILE = "file"
    CHAT = "chat"
    OTHER = "other"


class Entitlement(Base):
    """Entitlement model - stores subscription plan entitlements/limits."""
    
    __tablename__ = "entitlements"
    __table_args__ = (
        UniqueConstraint('subscription_id', 'category', 'entitlement', name='uq_entitlements_subscription_category_entitlement'),
    )
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    subscription_id = Column(
        UUID(as_uuid=True),
        ForeignKey("subscriptions.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Foreign key to subscriptions.id"
    )
    category = Column(
        SQLEnum(EntitlementCategory, name="entitlement_category"),
        nullable=False,
        index=True,
        comment="Entitlement category: file, chat, or other"
    )
    entitlement = Column(
        String(100),
        nullable=False,
        comment="Entitlement type (e.g., 'storage', 'file_count', 'tokens', 'api_calls', etc.)"
    )
    unit = Column(
        String(20),
        nullable=False,
        comment="Unit of measurement (e.g., 'MB', 'count', 'GB', 'hours', etc.)"
    )
    quota = Column(
        Integer,
        nullable=False,
        comment="Quota/limit value (e.g., 1000 for 1000 MB, 10000 for 10000 tokens, etc.)"
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationship to subscription
    subscription = relationship("Subscription", backref="entitlements")
    
    def __repr__(self):
        return f"<Entitlement(id={self.id}, subscription_id={self.subscription_id}, category={self.category}, entitlement={self.entitlement}, quota={self.quota} {self.unit})>"

