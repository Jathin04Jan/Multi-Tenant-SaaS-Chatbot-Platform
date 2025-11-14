"""
Pydantic schemas for InstallationSnippet model.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class InstallationSnippetBase(BaseModel):
    """Base schema for installation snippets."""
    allowed_domains: Optional[List[str]] = Field(None, description="List of allowed domains (null = no restrictions)")
    status: str = Field(default="active", description="Snippet status: 'active' | 'revoked'")


class InstallationSnippetCreate(InstallationSnippetBase):
    """Schema for creating a new installation snippet."""
    bot_id: str = Field(..., description="Bot ID this snippet belongs to")
    allowed_domains: Optional[List[str]] = Field(None, description="List of allowed domains")


class InstallationSnippetUpdate(BaseModel):
    """Schema for updating an installation snippet."""
    allowed_domains: Optional[List[str]] = None
    status: Optional[str] = Field(None, description="Snippet status: 'active' | 'revoked'")


class InstallationSnippetResponse(InstallationSnippetBase):
    """Schema for installation snippet response."""
    id: str = Field(..., description="Snippet ID (UUID)")
    user_id: str = Field(..., description="User/tenant ID (UUID)")
    bot_id: str = Field(..., description="Bot ID (UUID)")
    script_url: Optional[str] = None
    embed_code: Optional[str] = Field(None, description="Generated embed code snippet")
    is_active: bool = Field(..., description="Computed from status (status == 'active')")
    usage_count: int = Field(default=0, description="Number of times snippet has been accessed")
    last_used_at: Optional[str] = Field(None, description="Last used timestamp (ISO format)")
    created_at: str = Field(..., description="Created timestamp (ISO format)")
    updated_at: str = Field(..., description="Updated timestamp (ISO format)")
    expires_at: Optional[str] = Field(None, description="Expiration timestamp (ISO format)")
    
    @classmethod
    def from_orm(cls, obj):
        """Convert ORM object to response, converting UUID and datetime fields to strings."""
        data = {
            "id": str(obj.id),
            "user_id": str(obj.user_id),
            "bot_id": str(obj.bot_id),
            "status": obj.status,
            "script_url": obj.script_url,
            "embed_code": obj.embed_code,
            "usage_count": obj.usage_count,
            "is_active": obj.status == "active",  # Computed from status
        }
        
        # Convert datetime fields to ISO format strings
        data["last_used_at"] = obj.last_used_at.isoformat() if obj.last_used_at else None
        data["created_at"] = obj.created_at.isoformat()  # Should always exist
        data["updated_at"] = obj.updated_at.isoformat()  # Should always exist
        data["expires_at"] = obj.expires_at.isoformat() if obj.expires_at else None
        
        # Handle domain_whitelist -> allowed_domains mapping
        if obj.domain_whitelist is None:
            data["allowed_domains"] = None
        elif isinstance(obj.domain_whitelist, list):
            data["allowed_domains"] = obj.domain_whitelist
        else:
            data["allowed_domains"] = []
        
        return cls(**data)
    
    class Config:
        from_attributes = True


class InstallationSnippetListItem(InstallationSnippetResponse):
    """Schema for listing installation snippets (includes all fields)."""
    pass

