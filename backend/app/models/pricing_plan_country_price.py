from sqlalchemy import Column, String, Boolean, DateTime, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base


class PricingPlanCountryPrice(Base):
    """Pricing plan country price model - stores pricing per country/region for each plan."""
    
    __tablename__ = "pricing_plan_country_prices"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    plan_id = Column(
        UUID(as_uuid=True),
        ForeignKey("pricing_plans.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Foreign key to pricing_plans.id"
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
    
    # Relationship to pricing plan
    plan = relationship("PricingPlan", back_populates="country_prices")
    
    def __repr__(self):
        return f"<PricingPlanCountryPrice(id={self.id}, plan_id={self.plan_id}, country_code={self.country_code}, price={self.price} {self.currency})>"

