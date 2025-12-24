from sqlalchemy import Column, String, Boolean, DateTime, Date, Enum as SQLEnum, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
import enum
from app.core.database import Base


class UserSubscriptionStatus(str, enum.Enum):
    """User subscription status options."""
    ACTIVE = "active"
    EXPIRED = "expired"
    CANCELLED = "cancelled"


class UserSubscription(Base):
    """User subscription model - tracks user subscription instances to subscription plans."""
    
    __tablename__ = "user_subscriptions"
    __table_args__ = (
        Index('idx_user_subscriptions_user_status', 'user_id', 'status'),
        Index('idx_user_subscriptions_dates', 'start_date', 'end_date'),
    )
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Foreign key to users.id - the user who has this subscription"
    )
    subscription_id = Column(
        UUID(as_uuid=True),
        ForeignKey("subscriptions.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Foreign key to subscriptions.id - the subscription plan"
    )
    status = Column(
        SQLEnum(UserSubscriptionStatus, name="user_subscription_status"),
        nullable=False,
        default=UserSubscriptionStatus.ACTIVE,
        index=True,
        comment="Subscription status: active, expired, or cancelled"
    )
    start_date = Column(
        Date,
        nullable=False,
        index=True,
        comment="Subscription start date"
    )
    end_date = Column(
        Date,
        nullable=True,
        index=True,
        comment="Subscription end date (null for lifetime subscriptions)"
    )
    auto_renew = Column(
        Boolean,
        nullable=False,
        default=True,
        comment="Whether subscription auto-renews at end_date"
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    user = relationship("User", backref="user_subscriptions")
    subscription = relationship("Subscription", backref="user_subscriptions")
    
    @property
    def is_active(self) -> bool:
        """Computed property: subscription is active if status is ACTIVE."""
        return self.status.value == UserSubscriptionStatus.ACTIVE.value
    
    @property
    def is_expired(self) -> bool:
        """Computed property: check if subscription has expired based on end_date."""
        if self.end_date is None:
            return False  # Lifetime subscription
        from datetime import date
        from typing import cast
        # When loaded from DB, end_date is a Python date object
        # Type cast needed for type checker
        end_date_value = cast(date, self.end_date) if self.end_date is not None else None
        if end_date_value is None:
            return False
        return end_date_value < date.today()
    
    def __repr__(self):
        return f"<UserSubscription(id={self.id}, user_id={self.user_id}, subscription_id={self.subscription_id}, status={self.status})>"

