from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
from uuid import UUID
from app.models.bot import BotStatus


class BotBase(BaseModel):
    """Base bot schema with common fields."""
    name: str = Field(..., description="Bot name")
    description: Optional[str] = Field(None, description="Bot persona summary/description")
    slug: Optional[str] = Field(None, description="URL-friendly identifier")
    ui_config_id: Optional[str] = Field(None, description="UI configuration ID (FK to ui_configs.id)")


class BotCreate(BotBase):
    """Schema for creating a new bot."""
    pass


class BotUpdate(BaseModel):
    """Schema for updating a bot (all fields optional)."""
    name: Optional[str] = None
    description: Optional[str] = None
    slug: Optional[str] = None
    status: Optional[BotStatus] = None
    is_active: Optional[bool] = None
    ui_config_id: Optional[str] = None
    llm_config: Optional[Dict[str, Any]] = None
    retrieval_config: Optional[Dict[str, Any]] = None
    guardrails: Optional[Dict[str, Any]] = None
    branding: Optional[Dict[str, Any]] = None


class BotResponse(BotBase):
    """Schema for bot response."""
    id: str  # UUID as string for JSON compatibility
    user_id: str  # UUID as string for JSON compatibility
    status: str  # BotStatus enum as string
    is_active: bool
    last_deployed_at: Optional[datetime] = None
    ui_config_id: Optional[str] = None  # UUID as string for JSON compatibility
    llm_config: Optional[Dict[str, Any]] = None
    retrieval_config: Optional[Dict[str, Any]] = None
    guardrails: Optional[Dict[str, Any]] = None
    branding: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
    
    @classmethod
    def from_orm(cls, obj):
        """Convert ORM object to response, converting UUIDs and enums to strings."""
        data = {
            "id": str(obj.id),
            "user_id": str(obj.user_id),
            "name": obj.name,
            "description": obj.description,
            "slug": obj.slug,
            "status": obj.status.value if hasattr(obj.status, 'value') else str(obj.status),
            "is_active": obj.is_active,
            "last_deployed_at": obj.last_deployed_at,
            "ui_config_id": str(obj.ui_config_id) if obj.ui_config_id else None,
            "llm_config": obj.llm_config,
            "retrieval_config": obj.retrieval_config,
            "guardrails": obj.guardrails,
            "branding": obj.branding,
            "created_at": obj.created_at,
            "updated_at": obj.updated_at,
        }
        return cls(**data)


class BotListItem(BotResponse):
    """Schema for bot list item with additional computed fields."""
    conversations_count: int = Field(default=0, description="Number of conversations (computed)")
    
    class Config:
        from_attributes = True

