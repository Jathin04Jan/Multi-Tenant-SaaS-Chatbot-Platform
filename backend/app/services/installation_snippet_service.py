"""
Service layer for InstallationSnippet operations.
"""

from typing import Optional, List
from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from app.models.installation_snippet import InstallationSnippet
from app.models.bot import Bot
from app.models.user import User
from app.schemas.installation_snippet import InstallationSnippetCreate, InstallationSnippetUpdate
from app.core.config import settings


class InstallationSnippetService:
    """Service for managing installation snippets."""
    
    @staticmethod
    def create_snippet(
        db: Session,
        user_id: UUID,
        bot_id: UUID,
        allowed_domains: Optional[List[str]] = None,
        name: Optional[str] = None,
        environment: Optional[str] = None
    ) -> InstallationSnippet:
        """
        Create a new installation snippet for a bot.
        
        Args:
            db: Database session
            user_id: User/tenant ID
            bot_id: Bot ID
            allowed_domains: List of allowed domains (None = no restrictions)
            name: Optional snippet name
            environment: Optional environment type
        
        Returns:
            Created InstallationSnippet
        
        Raises:
            HTTPException: If bot doesn't exist or doesn't belong to user
        """
        # Verify bot exists and belongs to user
        bot = db.query(Bot).filter(Bot.id == bot_id).first()
        if not bot:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Bot not found"
            )
        
        if bot.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Bot does not belong to current user"
            )
        
        # Generate embed code (will be updated with actual snippet_id after creation)
        api_base = settings.API_BASE_URL
        embed_code = f'''<!-- Add this before closing </body> tag -->
<script 
  src="{api_base}/static/widget.js"
  data-snippet-id="PLACEHOLDER"  <!-- Will be replaced with snippet_id after creation -->
  async>
</script>'''
        
        # Create snippet
        snippet = InstallationSnippet(
            user_id=user_id,
            bot_id=bot_id,
            name=name or f"Snippet for {bot.name}",
            environment=environment or "production",
            domain_whitelist=allowed_domains if allowed_domains else None,
            status="active",
            is_active=True,
            embed_code=embed_code  # Will be updated with actual snippet_id after creation
        )
        
        try:
            db.add(snippet)
            db.commit()
            db.refresh(snippet)
            
            # Update embed_code with actual snippet_id
            snippet.embed_code = f'''<!-- Add this before closing </body> tag -->
<script 
  src="{api_base}/static/widget.js"
  data-snippet-id="{snippet.id}"
  async>
</script>'''
            db.commit()
            db.refresh(snippet)
            
            return snippet
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to create snippet: {str(e)}"
            )
    
    @staticmethod
    def get_snippet_by_id(db: Session, snippet_id: UUID) -> Optional[InstallationSnippet]:
        """
        Get a snippet by its ID.
        
        Args:
            db: Database session
            snippet_id: Snippet ID (UUID)
        
        Returns:
            InstallationSnippet or None if not found
        """
        return db.query(InstallationSnippet).filter(InstallationSnippet.id == snippet_id).first()
    
    @staticmethod
    def get_snippets_by_bot(db: Session, bot_id: UUID, user_id: UUID) -> List[InstallationSnippet]:
        """
        Get all snippets for a bot (ensuring user owns the bot).
        
        Args:
            db: Database session
            bot_id: Bot ID
            user_id: User ID (for ownership verification)
        
        Returns:
            List of InstallationSnippet
        
        Raises:
            HTTPException: If bot doesn't exist or doesn't belong to user
        """
        # Verify bot exists and belongs to user
        bot = db.query(Bot).filter(Bot.id == bot_id).first()
        if not bot:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Bot not found"
            )
        
        if bot.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Bot does not belong to current user"
            )
        
        return db.query(InstallationSnippet).filter(
            InstallationSnippet.bot_id == bot_id
        ).all()
    
    @staticmethod
    def update_snippet(
        db: Session,
        snippet_id: UUID,
        user_id: UUID,
        update_data: InstallationSnippetUpdate
    ) -> InstallationSnippet:
        """
        Update a snippet.
        
        Args:
            db: Database session
            snippet_id: Snippet ID
            user_id: User ID (for ownership verification)
            update_data: Update data
        
        Returns:
            Updated InstallationSnippet
        
        Raises:
            HTTPException: If snippet doesn't exist or doesn't belong to user
        """
        snippet = db.query(InstallationSnippet).filter(InstallationSnippet.id == snippet_id).first()
        if not snippet:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Snippet not found"
            )
        
        if snippet.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Snippet does not belong to current user"
            )
        
        # Update fields
        if update_data.name is not None:
            snippet.name = update_data.name
        if update_data.environment is not None:
            snippet.environment = update_data.environment
        if update_data.allowed_domains is not None:
            snippet.domain_whitelist = update_data.allowed_domains if update_data.allowed_domains else None
        if update_data.status is not None:
            snippet.status = update_data.status
            snippet.is_active = (update_data.status == "active")
        
        try:
            db.commit()
            db.refresh(snippet)
            return snippet
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to update snippet: {str(e)}"
            )
    
    @staticmethod
    def delete_snippet(db: Session, snippet_id: UUID, user_id: UUID) -> None:
        """
        Delete a snippet.
        
        Args:
            db: Database session
            snippet_id: Snippet ID
            user_id: User ID (for ownership verification)
        
        Raises:
            HTTPException: If snippet doesn't exist or doesn't belong to user
        """
        snippet = db.query(InstallationSnippet).filter(InstallationSnippet.id == snippet_id).first()
        if not snippet:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Snippet not found"
            )
        
        if snippet.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Snippet does not belong to current user"
            )
        
        db.delete(snippet)
        db.commit()

