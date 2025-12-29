from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID


class PricingPlanCountryPriceBase(BaseModel):
    """Base pricing plan country price schema."""
    plan_id: str = Field(..., description="Subscription plan ID")
    country_code: str = Field(..., description="Country/region code")
    currency: str = Field(..., description="Currency code")
    billing_interval: str = Field(..., description="Billing interval: 'monthly' or 'yearly'")
    price: int = Field(..., description="Price in smallest currency unit")
    is_active: bool = Field(default=True, description="Enable/disable this price")


class PricingPlanCountryPriceCreate(PricingPlanCountryPriceBase):
    """Schema for creating a country price."""
    pass


class PricingPlanCountryPriceUpdate(BaseModel):
    """Schema for updating a country price."""
    country_code: Optional[str] = None
    currency: Optional[str] = None
    billing_interval: Optional[str] = None
    price: Optional[int] = None
    is_active: Optional[bool] = None


class PricingPlanCountryPriceResponse(PricingPlanCountryPriceBase):
    """Schema for country price response."""
    id: str  # UUID as string
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
    
    @classmethod
    def from_orm(cls, obj):
        """Convert ORM object to response."""
        return cls(
            id=str(obj.id),
            plan_id=str(obj.plan_id),
            country_code=obj.country_code,
            currency=obj.currency,
            billing_interval=obj.billing_interval,
            price=obj.price,
            is_active=obj.is_active,
            created_at=obj.created_at,
            updated_at=obj.updated_at,
        )

