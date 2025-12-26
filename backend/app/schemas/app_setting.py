from pydantic import BaseModel, Field
from typing import Optional, Any
from datetime import datetime


class AppSettingBase(BaseModel):
    """Base app setting schema."""
    key: str = Field(..., description="Namespaced key (e.g., 'landing.hero_title')")
    value: Any = Field(..., description="Any JSON value")
    description: Optional[str] = Field(None, description="Admin description")
    is_public: bool = Field(default=False, description="If true, can be exposed via public API")


class AppSettingCreate(AppSettingBase):
    """Schema for creating an app setting."""
    pass


class AppSettingUpdate(BaseModel):
    """Schema for updating an app setting."""
    value: Optional[Any] = None
    description: Optional[str] = None
    is_public: Optional[bool] = None


class AppSettingResponse(AppSettingBase):
    """Schema for app setting response."""
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
    
    @classmethod
    def from_orm(cls, obj):
        """Convert ORM object to response."""
        return cls(
            key=obj.key,
            value=obj.value,
            description=obj.description,
            is_public=obj.is_public,
            created_at=obj.created_at,
            updated_at=obj.updated_at,
        )

