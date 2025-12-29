from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID
from app.models.entitlement import EntitlementCategory


class EntitlementBase(BaseModel):
    """Base entitlement schema."""
    subscription_id: str = Field(..., description="Subscription plan ID")
    category: EntitlementCategory = Field(..., description="Entitlement category")
    entitlement: str = Field(..., description="Entitlement type (e.g., 'storage', 'tokens')")
    unit: str = Field(..., description="Unit of measurement (e.g., 'MB', 'count')")
    quota: int = Field(..., description="Quota/limit value")


class EntitlementCreate(EntitlementBase):
    """Schema for creating an entitlement."""
    pass


class EntitlementUpdate(BaseModel):
    """Schema for updating an entitlement."""
    category: Optional[EntitlementCategory] = None
    entitlement: Optional[str] = None
    unit: Optional[str] = None
    quota: Optional[int] = None


class EntitlementResponse(EntitlementBase):
    """Schema for entitlement response."""
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
            subscription_id=str(obj.subscription_id),
            category=obj.category,
            entitlement=obj.entitlement,
            unit=obj.unit,
            quota=obj.quota,
            created_at=obj.created_at,
            updated_at=obj.updated_at,
        )

