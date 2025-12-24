from sqlalchemy import Column, String, Integer, DateTime, Enum as SQLEnum, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base
from app.models.entitlement import EntitlementCategory


class UserSubscriptionEntitlement(Base):
    """User subscription entitlement model - tracks per-user entitlement usage and consumption."""
    
    __tablename__ = "user_subscription_entitlements"
    __table_args__ = (
        Index('idx_user_subscription_entitlements_user_subscription', 'user_id', 'subscription_id'),
        Index('idx_user_subscription_entitlements_category', 'category'),
        Index('idx_user_subscription_entitlements_user_category', 'user_id', 'category'),
    )
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Foreign key to users.id - the user who has this entitlement"
    )
    subscription_id = Column(
        UUID(as_uuid=True),
        ForeignKey("subscriptions.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Foreign key to subscriptions.id - the subscription plan"
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
        default=0,
        comment="Quota/limit value (e.g., 1000 for 1000 MB, 10000 for 10000 tokens, etc.)"
    )
    consumption = Column(
        Integer,
        nullable=False,
        default=0,
        comment="Current consumption/usage value (e.g., 500 for 500 MB used, 5000 for 5000 tokens used, etc.)"
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    user = relationship("User", backref="user_subscription_entitlements")
    subscription = relationship("Subscription", backref="user_subscription_entitlements")
    
    @property
    def balance(self) -> int:
        """Computed property: remaining balance = quota - consumption."""
        from typing import cast
        quota_value = cast(int, self.quota)
        consumption_value = cast(int, self.consumption)
        return quota_value - consumption_value
    
    @property
    def is_exceeded(self) -> bool:
        """Computed property: check if consumption has exceeded quota."""
        from typing import cast
        quota_value = cast(int, self.quota)
        consumption_value = cast(int, self.consumption)
        return consumption_value > quota_value
    
    @property
    def usage_percentage(self) -> float:
        """Computed property: percentage of quota used (0-100)."""
        from typing import cast
        quota_value = cast(int, self.quota)
        consumption_value = cast(int, self.consumption)
        if quota_value == 0:
            return 0.0
        return min(100.0, (consumption_value / quota_value) * 100.0)
    
    def __repr__(self):
        return f"<UserSubscriptionEntitlement(id={self.id}, user_id={self.user_id}, subscription_id={self.subscription_id}, entitlement={self.entitlement}, quota={self.quota}, consumption={self.consumption}, balance={self.balance})>"

