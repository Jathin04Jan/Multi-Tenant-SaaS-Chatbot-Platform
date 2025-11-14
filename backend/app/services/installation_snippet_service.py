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
        
        # Check if a snippet already exists for this bot (only one snippet per bot)
        existing_snippet = db.query(InstallationSnippet).filter(
            InstallationSnippet.bot_id == bot_id,
            InstallationSnippet.user_id == user_id
        ).first()
        
        if existing_snippet:
            # Update existing snippet if new data provided, otherwise return as-is
            if allowed_domains is not None:
                existing_snippet.domain_whitelist = allowed_domains if allowed_domains else None
            if name:
                existing_snippet.name = name
            if environment:
                existing_snippet.environment = environment
            db.commit()
            db.refresh(existing_snippet)
            return existing_snippet
        
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
        
        # Handle allowed_domains: None or empty list means "allow all domains"
        # Non-empty list means restrict to those domains
        # Always update if the field is provided (even if None)
        # Use model_dump to check if field was explicitly set
        update_dict = update_data.model_dump(exclude_unset=True)
        print(f"DEBUG: Update dict keys: {list(update_dict.keys())}")  # Debug log
        print(f"DEBUG: allowed_domains in update_dict: {'allowed_domains' in update_dict}")  # Debug log
        
        if 'allowed_domains' in update_dict:
            allowed_domains_value = update_dict['allowed_domains']
            print(f"DEBUG: allowed_domains_value type: {type(allowed_domains_value)}, value: {allowed_domains_value}")  # Debug log
            
            if allowed_domains_value is None:
                # Explicitly set to None (allow all domains)
                snippet.domain_whitelist = None
                print(f"DEBUG: Set domain_whitelist to None (allow all)")  # Debug log
            elif isinstance(allowed_domains_value, list):
                # If it's an empty list, treat it as None (allow all)
                if len(allowed_domains_value) == 0:
                    snippet.domain_whitelist = None
                    print(f"DEBUG: Set domain_whitelist to None (empty list)")  # Debug log
                else:
                    snippet.domain_whitelist = allowed_domains_value
                    print(f"DEBUG: Set domain_whitelist to list: {allowed_domains_value}")  # Debug log
            else:
                print(f"DEBUG: WARNING - allowed_domains_value is unexpected type: {type(allowed_domains_value)}")  # Debug log
        else:
            print(f"DEBUG: allowed_domains not in update_dict, skipping update")  # Debug log
        
        if update_data.status is not None:
            snippet.status = update_data.status
            snippet.is_active = (update_data.status == "active")
        
        try:
            db.commit()
            db.refresh(snippet)
            print(f"DEBUG: After commit, domain_whitelist is: {snippet.domain_whitelist}")  # Debug log
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

