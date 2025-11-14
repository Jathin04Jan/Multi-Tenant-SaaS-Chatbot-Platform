from sqlalchemy import Column, String, Boolean, DateTime, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
import uuid
import enum
from app.core.database import Base


class UserStatus(str, enum.Enum):
    """User/Tenant status options."""
    ACTIVE = "active"
    PENDING_VERIFICATION = "pending_verification"
    SUSPENDED = "suspended"


class User(Base):
    """User/Tenant model - users are tenants in this multi-tenant system."""
    
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False, comment="Full name (required)")
    company_name = Column(String(255), nullable=False, comment="Organization/Company name (required)")
    domain = Column(String(255), nullable=True, comment="Tenant domain (optional)")
    status = Column(
        SQLEnum(UserStatus, name="user_status"),
        nullable=False,
        default=UserStatus.PENDING_VERIFICATION,
        comment="User status: active, pending_verification, or suspended"
    )
    plan = Column(String(50), nullable=True, comment="Subscription plan (free, pro, enterprise)")
    settings = Column(
        JSONB,
        nullable=True,
        comment="Miscellaneous configuration (limits, billing IDs, etc.)"
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    @property
    def is_verified(self) -> bool:
        """Computed property: user is verified if status is ACTIVE."""
        return self.status.value == UserStatus.ACTIVE.value
    
    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, company_name={self.company_name}, status={self.status})>"

