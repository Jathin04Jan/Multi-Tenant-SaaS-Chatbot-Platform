from sqlalchemy import Column, String, Boolean, DateTime, Integer, ForeignKey, UniqueConstraint, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base


class PricingPlanCountryPrice(Base):
    """Pricing plan country price model - stores pricing per country/region for each plan.
    
    Note: This table has a unique constraint on (subscription_id, country_code, billing_interval)
    to prevent duplicate prices for the same subscription plan, country, and billing interval.
    Also enforces positive prices via check constraint.
    """
    
    __tablename__ = "pricing_plan_country_prices"
    __table_args__ = (
        UniqueConstraint('subscription_id', 'country_code', 'billing_interval', name='uq_pricing_plan_country_prices_subscription_country_interval'),
        CheckConstraint('price > 0', name='chk_pricing_plan_country_prices_price_positive'),
    )
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    subscription_id = Column(
        UUID(as_uuid=True),
        ForeignKey("subscriptions.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Foreign key to subscriptions.id"
    )
    country_code = Column(
        String(10),
        nullable=False,
        index=True,
        comment="Country/region code (e.g., 'IN-SOUTH', 'US-CENTRAL', 'EU-WEST')"
    )
    currency = Column(
        String(10),
        nullable=False,
        comment="Currency code (e.g., 'USD', 'INR', 'EUR')"
    )
    billing_interval = Column(
        String(20),
        nullable=False,
        comment="Billing interval: 'monthly' or 'yearly'"
    )
    price = Column(
        Integer,
        nullable=False,
        comment="Price in smallest currency unit (e.g., cents for USD, paise for INR)"
    )
    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
        comment="Enable/disable this price"
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationship to subscription plan
    plan = relationship("Subscription", back_populates="country_prices")
    
    def __repr__(self):
        return f"<PricingPlanCountryPrice(id={self.id}, subscription_id={self.subscription_id}, country_code={self.country_code}, price={self.price} {self.currency})>"

