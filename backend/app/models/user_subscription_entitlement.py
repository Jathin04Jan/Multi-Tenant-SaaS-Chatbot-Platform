from sqlalchemy import Column, String, Integer, DateTime, Enum as SQLEnum, ForeignKey, Index, UniqueConstraint, CheckConstraint, DDL, event
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base
from app.models.entitlement import EntitlementCategory


class UserSubscriptionEntitlement(Base):
    """User subscription entitlement model - tracks per-user entitlement usage and consumption.
    
    Note: This table enforces non-negative consumption and quota values via check constraints.
    Also enforces that user_id matches the user_id of the referenced user_subscription via a trigger.
    """
    
    __tablename__ = "user_subscription_entitlements"
    __table_args__ = (
        Index('idx_user_subscription_entitlements_user_subscription', 'user_id', 'user_subscription_id'),
        Index('idx_user_subscription_entitlements_category', 'category'),
        Index('idx_user_subscription_entitlements_user_category', 'user_id', 'category'),
        UniqueConstraint('user_subscription_id', 'category', 'entitlement', name='uq_use_sub_ent_user_sub_cat_ent'),
        CheckConstraint('consumption >= 0', name='chk_user_subscription_entitlements_consumption_non_negative'),
        CheckConstraint('quota >= 0', name='chk_user_subscription_entitlements_quota_non_negative'),
    )
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Foreign key to users.id - the user who has this entitlement"
    )
    user_subscription_id = Column(
        UUID(as_uuid=True),
        ForeignKey("user_subscriptions.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Foreign key to user_subscriptions.id - the user's subscription instance"
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
    user_subscription = relationship("UserSubscription", backref="user_subscription_entitlements")
    
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
        return f"<UserSubscriptionEntitlement(id={self.id}, user_id={self.user_id}, user_subscription_id={self.user_subscription_id}, entitlement={self.entitlement}, quota={self.quota}, consumption={self.consumption}, balance={self.balance})>"


# Create trigger function and trigger after table creation
# This ensures user_id matches the user_id of the referenced user_subscription
@event.listens_for(UserSubscriptionEntitlement.__table__, "after_create")
def create_user_id_validation_trigger(target, connection, **kw):
    """Create trigger to validate that user_id matches user_subscriptions.user_id."""
    
    # Create trigger function
    # Note: %% is used to escape % characters so SQLAlchemy doesn't interpret them as format specifiers
    connection.execute(DDL("""
        CREATE OR REPLACE FUNCTION validate_user_subscription_entitlement_user_id()
        RETURNS TRIGGER AS $$
        BEGIN
            -- Check if the user_id matches the user_id of the referenced user_subscription
            IF NOT EXISTS (
                SELECT 1 
                FROM user_subscriptions 
                WHERE id = NEW.user_subscription_id 
                AND user_id = NEW.user_id
            ) THEN
                RAISE EXCEPTION 'user_id mismatch: user_id (%%) does not match user_subscriptions.user_id for user_subscription_id (%%)',
                    NEW.user_id, NEW.user_subscription_id;
            END IF;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    """))
    
    # Create trigger that fires before INSERT or UPDATE
    connection.execute(DDL("""
        CREATE TRIGGER trg_validate_user_subscription_entitlement_user_id
        BEFORE INSERT OR UPDATE OF user_id, user_subscription_id
        ON user_subscription_entitlements
        FOR EACH ROW
        EXECUTE FUNCTION validate_user_subscription_entitlement_user_id();
    """))

