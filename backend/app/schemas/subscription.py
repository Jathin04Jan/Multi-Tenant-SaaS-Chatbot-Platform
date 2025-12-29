from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from datetime import datetime
from uuid import UUID


class SubscriptionBase(BaseModel):
    """Base subscription schema."""
    name: str = Field(..., description="Subscription plan name")
    description: Optional[str] = Field(None, description="Plan description")
    is_highlighted: bool = Field(default=False, description="Mark as 'Most Popular' in UI")
    limits: Optional[Dict[str, Any]] = Field(None, description="Plan limits (JSONB)")
    support_level: Optional[str] = Field(None, description="Support level")
    features: Optional[List[str]] = Field(None, description="List of features")


class SubscriptionCreate(SubscriptionBase):
    """Schema for creating a subscription plan."""
    pass


class SubscriptionUpdate(BaseModel):
    """Schema for updating a subscription plan."""
    name: Optional[str] = None
    description: Optional[str] = None
    is_highlighted: Optional[bool] = None
    limits: Optional[Dict[str, Any]] = None
    support_level: Optional[str] = None
    features: Optional[List[str]] = None
    sort_order: Optional[Dict[str, Any]] = None


class SubscriptionResponse(SubscriptionBase):
    """Schema for subscription response."""
    id: str  # UUID as string
    sort_order: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
    
    @classmethod
    def from_orm(cls, obj):
        """Convert ORM object to response."""
        return cls(
            id=str(obj.id),
            name=obj.name,
            description=obj.description,
            is_highlighted=obj.is_highlighted,
            limits=obj.limits,
            support_level=obj.support_level,
            features=obj.features,
            sort_order=obj.sort_order,
            created_at=obj.created_at,
            updated_at=obj.updated_at,
        )

