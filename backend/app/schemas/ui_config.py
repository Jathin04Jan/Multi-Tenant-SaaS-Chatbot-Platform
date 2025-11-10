from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID


class UiConfigBase(BaseModel):
    """Base UI config schema with common fields."""
    name: Optional[str] = None
    primary_color: Optional[str] = None
    background_color: Optional[str] = None
    chat_title: Optional[str] = None
    intro_message: Optional[str] = None
    avatar_url: Optional[str] = None
    position: Optional[str] = None
    height: Optional[int] = None
    width: Optional[int] = None


class UiConfigCreate(UiConfigBase):
    """Schema for creating a UI config."""
    pass


class UiConfigUpdate(UiConfigBase):
    """Schema for updating a UI config."""
    pass


class UiConfigResponse(UiConfigBase):
    """Schema for UI config response."""
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

    @classmethod
    def from_orm_model(cls, obj: "UiConfig"):
        """Convert ORM object to response, ensuring UUIDs serialize as strings."""
        return cls.model_validate(obj)


class UiConfigOut(UiConfigResponse):
    """Alias for UI config response (for compatibility)."""
    pass

