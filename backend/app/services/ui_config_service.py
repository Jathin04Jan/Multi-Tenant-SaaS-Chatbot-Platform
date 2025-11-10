from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional
from app.models.ui_config import UiConfig
from app.models.user import User
from app.schemas.ui_config import UiConfigCreate, UiConfigUpdate


class UiConfigService:
    """Service for UI configuration-related business logic."""
    
    @staticmethod
    def create_ui_config(
        db: Session,
        user: User,
        ui_config_data: UiConfigCreate
    ) -> UiConfig:
        """
        Create a new UI configuration for a user.
        
        Args:
            db: Database session
            user: User creating the UI config
            ui_config_data: UI config data
        
        Returns:
            Created UiConfig instance
        """
        ui_config = UiConfig(
            user_id=user.id,
            **ui_config_data.model_dump(exclude_unset=True)
        )
        
        db.add(ui_config)
        db.commit()
        db.refresh(ui_config)
        
        return ui_config
    
    @staticmethod
    def get_ui_config(
        db: Session,
        ui_config_id: UUID,
        user_id: UUID
    ) -> Optional[UiConfig]:
        """
        Get a UI configuration by ID, ensuring it belongs to the user.
        
        Args:
            db: Database session
            ui_config_id: UI config ID
            user_id: User ID (for ownership verification)
        
        Returns:
            UiConfig instance or None if not found
        """
        return db.query(UiConfig).filter(
            UiConfig.id == ui_config_id,
            UiConfig.user_id == user_id
        ).first()
    
    @staticmethod
    def get_user_ui_configs(
        db: Session,
        user_id: UUID
    ) -> list[UiConfig]:
        """
        Get all UI configurations for a user.
        
        Args:
            db: Database session
            user_id: User ID
        
        Returns:
            List of UiConfig instances
        """
        return db.query(UiConfig).filter(
            UiConfig.user_id == user_id
        ).order_by(UiConfig.created_at.desc()).all()
    
    @staticmethod
    def update_ui_config(
        db: Session,
        ui_config_id: UUID,
        user_id: UUID,
        ui_config_update: UiConfigUpdate
    ) -> Optional[UiConfig]:
        """
        Update a UI configuration.
        Only the owner can update it.
        
        Args:
            db: Database session
            ui_config_id: UI config ID to update
            user_id: User ID (for ownership verification)
            ui_config_update: UI config update data
        
        Returns:
            Updated UiConfig instance or None if not found
        """
        ui_config = db.query(UiConfig).filter(
            UiConfig.id == ui_config_id,
            UiConfig.user_id == user_id
        ).first()
        
        if not ui_config:
            return None
        
        # Update only provided fields
        update_data = ui_config_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(ui_config, field, value)
        
        db.commit()
        db.refresh(ui_config)
        
        return ui_config
    
    @staticmethod
    def delete_ui_config(
        db: Session,
        ui_config_id: UUID,
        user_id: UUID
    ) -> bool:
        """
        Delete a UI configuration.
        Only the owner can delete it.
        
        Args:
            db: Database session
            ui_config_id: UI config ID to delete
            user_id: User ID (for ownership verification)
        
        Returns:
            True if deleted, False if not found
        """
        ui_config = db.query(UiConfig).filter(
            UiConfig.id == ui_config_id,
            UiConfig.user_id == user_id
        ).first()
        
        if not ui_config:
            return False
        
        db.delete(ui_config)
        db.commit()
        
        return True

