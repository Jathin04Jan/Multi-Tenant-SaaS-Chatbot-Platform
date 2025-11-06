from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.schemas.auth import UserSignIn, UserSignUp, Token, UserResponse, UserUpdate
from app.services.auth_service import AuthService
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/signup", response_model=Token, status_code=status.HTTP_201_CREATED)
async def signup(
    user_data: UserSignUp,
    db: Session = Depends(get_db)
):
    """
    Register a new user/tenant account.
    
    - **email**: User email address (must be unique)
    - **password**: User password (min 8 characters)
    - **full_name**: User's full name (required)
    - **company_name**: Company/Organization name (required)
    - **domain**: Tenant domain (optional)
    """
    try:
        user = AuthService.create_user(db, user_data)
        token_data = AuthService.create_user_token(user)
        return token_data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during registration: {str(e)}"
        )


@router.post("/signin", response_model=Token)
async def signin(
    credentials: UserSignIn,
    db: Session = Depends(get_db)
):
    """
    Authenticate user and return access token.
    
    - **email**: User email address
    - **password**: User password
    """
    try:
        user = AuthService.authenticate_user(db, credentials.email, credentials.password)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        token_data = AuthService.create_user_token(user)
        return token_data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during sign in: {str(e)}"
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    """
    Get current authenticated user information.
    Requires valid access token.
    """
    return UserResponse.from_orm(current_user)


@router.patch("/me", response_model=UserResponse)
async def update_current_user(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update current user profile information.
    Requires valid access token.
    
    - **full_name**: Update full name (optional)
    - **company_name**: Update company/organization name (optional)
    - **domain**: Update tenant domain (optional)
    """
    try:
        # Get only the fields that were actually provided (not None defaults)
        update_data = user_update.model_dump(exclude_unset=True)
        
        # Update only provided fields
        if 'full_name' in update_data:
            current_user.full_name = update_data['full_name']
        if 'company_name' in update_data:
            current_user.company_name = update_data['company_name']
        if 'domain' in update_data:
            # Convert empty string to None, otherwise use the provided value
            domain_value = update_data['domain']
            current_user.domain = domain_value.strip() if domain_value and domain_value.strip() else None
        
        db.commit()
        db.refresh(current_user)
        
        return UserResponse.from_orm(current_user)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while updating profile: {str(e)}"
        )

