from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from uuid import UUID
from app.models.user import UserStatus

__all__ = ["UserSignUp", "UserSignIn", "UserResponse", "UserUpdate", "Token", "TokenData"]


class UserSignUp(BaseModel):
    """Schema for user/tenant registration."""
    email: EmailStr
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters")
    full_name: str = Field(..., min_length=1, description="Full name (required)")
    company_name: str = Field(..., min_length=1, description="Company/Organization name (required)")
    domain: Optional[str] = Field(None, description="Tenant domain (optional)")


class UserSignIn(BaseModel):
    """Schema for user login."""
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """Schema for user/tenant response (without sensitive data)."""
    id: str  # UUID as string for JSON compatibility
    email: str
    full_name: str
    company_name: str  # Organization/Company name
    domain: Optional[str] = None
    status: str  # UserStatus enum as string
    is_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
        
    @classmethod
    def from_orm(cls, obj):
        """Convert ORM object to response, converting UUID to string."""
        # is_verified is computed from status: ACTIVE = verified, PENDING_VERIFICATION = not verified
        status_value = obj.status.value if hasattr(obj.status, 'value') else str(obj.status)
        is_verified = status_value == UserStatus.ACTIVE.value
        
        data = {
            "id": str(obj.id),
            "email": obj.email,
            "full_name": obj.full_name,
            "company_name": obj.company_name,
            "domain": obj.domain,
            "status": status_value,
            "is_verified": is_verified,  # Computed from status
            "created_at": obj.created_at,
        }
        return cls(**data)


class Token(BaseModel):
    """Schema for authentication token response."""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class TokenData(BaseModel):
    """Schema for token data."""
    user_id: Optional[UUID] = None
    email: Optional[str] = None


class UserUpdate(BaseModel):
    """Schema for updating user profile."""
    full_name: Optional[str] = Field(None, min_length=1, description="Full name")
    company_name: Optional[str] = Field(None, min_length=1, description="Company/Organization name")
    domain: Optional[str] = Field(None, description="Tenant domain (optional)")

