from sqlalchemy import Column, String, Text, Boolean, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base


class PricingPlan(Base):
    """Pricing plan model - stores subscription plans (Free, Pro, Enterprise, etc.)."""
    
    __tablename__ = "pricing_plans"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(Text, nullable=False, comment="Display name (e.g., 'Free', 'Pro', 'Enterprise')")
    description = Column(Text, nullable=True, comment="Short tagline/description")
    is_highlighted = Column(Boolean, nullable=False, default=False, comment="Mark as 'Most Popular' in UI")
    sort_order = Column(JSONB, nullable=True, comment="Ordering configuration for UI display")
    limits = Column(
        JSONB,
        nullable=True,
        comment="Plan limits (e.g., { 'max_bots': 1, 'max_docs': 20, 'max_chats_per_month': 1000 })"
    )
    support_level = Column(
        String(50),
        nullable=True,
        comment="Support level (None, email, call, priority, etc.)"
    )
    features = Column(
        JSONB,
        nullable=True,
        comment="List of features (e.g., ['Unlimited chats', 'Priority support', 'Custom branding'])"
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationship to country prices
    country_prices = relationship(
        "PricingPlanCountryPrice",
        back_populates="plan",
        cascade="all, delete-orphan"
    )
    
    def __repr__(self):
        return f"<PricingPlan(id={self.id}, name={self.name}, is_highlighted={self.is_highlighted})>"

