from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.schemas.ui_config import UiConfigCreate, UiConfigUpdate, UiConfigResponse
from app.models.user import User
from app.services.ui_config_service import UiConfigService

router = APIRouter(prefix="/ui-configs", tags=["ui-configs"])


@router.post("", response_model=UiConfigResponse, status_code=status.HTTP_201_CREATED)
async def create_ui_config(
    ui_config_data: UiConfigCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new UI configuration for the current authenticated user.
    """
    try:
        ui_config = UiConfigService.create_ui_config(db, current_user, ui_config_data)
        return UiConfigResponse.from_orm_model(ui_config)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while creating UI config: {str(e)}"
        )


@router.get("", response_model=List[UiConfigResponse])
async def get_user_ui_configs(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all UI configurations for the current authenticated user.
    """
    try:
        ui_configs = UiConfigService.get_user_ui_configs(db, current_user.id)
        return [UiConfigResponse.from_orm_model(ui_config) for ui_config in ui_configs]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while fetching UI configs: {str(e)}"
        )


@router.get("/{ui_config_id}", response_model=UiConfigResponse)
async def get_ui_config(
    ui_config_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get a specific UI configuration by ID.
    Only returns UI config if it belongs to the current user.
    """
    try:
        ui_config = UiConfigService.get_ui_config(db, ui_config_id, current_user.id)
        
        if not ui_config:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="UI config not found"
            )
        
        return UiConfigResponse.from_orm_model(ui_config)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while fetching UI config: {str(e)}"
        )


@router.patch("/{ui_config_id}", response_model=UiConfigResponse)
async def update_ui_config(
    ui_config_id: UUID,
    ui_config_update: UiConfigUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update a UI configuration.
    Only the owner can update it.
    """
    try:
        ui_config = UiConfigService.update_ui_config(
            db, ui_config_id, current_user.id, ui_config_update
        )
        
        if not ui_config:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="UI config not found"
            )
        
        return UiConfigResponse.from_orm_model(ui_config)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while updating UI config: {str(e)}"
        )


@router.delete("/{ui_config_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_ui_config(
    ui_config_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a UI configuration.
    Only the owner can delete it.
    """
    try:
        deleted = UiConfigService.delete_ui_config(db, ui_config_id, current_user.id)
        
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="UI config not found"
            )
        
        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while deleting UI config: {str(e)}"
        )

