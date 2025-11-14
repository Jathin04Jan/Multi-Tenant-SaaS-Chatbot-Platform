"""
Pydantic schemas for InstallationSnippet model.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class InstallationSnippetBase(BaseModel):
    """Base schema for installation snippets."""
    name: Optional[str] = Field(None, description="Optional name/identifier for the snippet")
    environment: Optional[str] = Field(None, description="Environment type: 'production', 'staging', 'development'")
    allowed_domains: Optional[List[str]] = Field(None, description="List of allowed domains (null = no restrictions)")
    status: str = Field(default="active", description="Snippet status: 'active' | 'revoked'")


class InstallationSnippetCreate(InstallationSnippetBase):
    """Schema for creating a new installation snippet."""
    bot_id: str = Field(..., description="Bot ID this snippet belongs to")
    allowed_domains: Optional[List[str]] = Field(None, description="List of allowed domains")


class InstallationSnippetUpdate(BaseModel):
    """Schema for updating an installation snippet."""
    name: Optional[str] = None
    environment: Optional[str] = None
    allowed_domains: Optional[List[str]] = None
    status: Optional[str] = Field(None, description="Snippet status: 'active' | 'revoked'")


class InstallationSnippetResponse(InstallationSnippetBase):
    """Schema for installation snippet response."""
    id: str = Field(..., description="Snippet ID (UUID)")
    user_id: str = Field(..., description="User/tenant ID (UUID)")
    bot_id: str = Field(..., description="Bot ID (UUID)")
    script_url: Optional[str] = None
    embed_code: Optional[str] = Field(None, description="Generated embed code snippet")
    is_active: bool = Field(..., description="Whether snippet is active (deprecated: use status)")
    usage_count: int = Field(default=0, description="Number of times snippet has been accessed")
    last_used_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    expires_at: Optional[datetime] = None
    
    @classmethod
    def model_validate(cls, obj):
        """Convert UUID fields to strings for JSON compatibility."""
        from uuid import UUID as UUIDType
        
        # Handle SQLAlchemy ORM objects
        if hasattr(obj, '__dict__'):
            data = {}
            # Get all attributes from the object
            for key in ['id', 'user_id', 'bot_id', 'name', 'environment', 'status', 
                       'script_url', 'embed_code', 'is_active', 'usage_count', 
                       'last_used_at', 'created_at', 'updated_at', 'expires_at', 
                       'domain_whitelist']:
                if hasattr(obj, key):
                    value = getattr(obj, key)
                    # Convert UUIDs to strings
                    if isinstance(value, UUIDType):
                        data[key] = str(value)
                    else:
                        data[key] = value
            
            # Handle domain_whitelist -> allowed_domains mapping
            if 'domain_whitelist' in data:
                data['allowed_domains'] = data.pop('domain_whitelist')
                if data['allowed_domains'] is None:
                    data['allowed_domains'] = None
                elif not isinstance(data['allowed_domains'], list):
                    data['allowed_domains'] = []
            
            return cls(**data)
        return super().model_validate(obj)
    
    class Config:
        from_attributes = True


class InstallationSnippetListItem(InstallationSnippetResponse):
    """Schema for listing installation snippets (includes all fields)."""
    pass

