from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user import User, UserStatus
from app.schemas.auth import UserSignUp, UserResponse
from app.core.security import get_password_hash, verify_password, create_access_token
from datetime import timedelta
from app.core.config import settings


class AuthService:
    """Service for authentication-related business logic."""
    
    @staticmethod
    def create_user(db: Session, user_data: UserSignUp) -> User:
        """Create a new user account."""
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user/tenant
        hashed_password = get_password_hash(user_data.password)
        db_user = User(
            email=user_data.email,
            hashed_password=hashed_password,
            full_name=user_data.full_name,
            company_name=user_data.company_name,  # Organization/Company name
            domain=user_data.domain,
            status=UserStatus.ACTIVE,  # Set to ACTIVE for testing (change to PENDING_VERIFICATION in production)
            # Note: is_verified is now computed from status (status == ACTIVE means verified)
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        return db_user
    
    @staticmethod
    def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
        """Authenticate a user by email and password."""
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            return None
        
        if not verify_password(password, user.hashed_password):
            return None
        
        # Check user status
        if user.status == UserStatus.SUSPENDED:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is suspended"
            )
        
        if user.status == UserStatus.PENDING_VERIFICATION:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account pending verification. Please verify your email."
            )
        
        return user
    
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        """Get user by email address."""
        return db.query(User).filter(User.email == email).first()
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: str) -> Optional[User]:
        """Get user by ID."""
        from uuid import UUID
        try:
            user_uuid = UUID(user_id)
            return db.query(User).filter(User.id == user_uuid).first()
        except ValueError:
            return None
    
    @staticmethod
    def create_user_token(user: User) -> dict:
        """Create an access token for a user."""
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": str(user.id), "email": user.email},
            expires_delta=access_token_expires
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": UserResponse.from_orm(user).model_dump()
        }

