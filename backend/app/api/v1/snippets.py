"""
API endpoints for installation snippet management.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.services.installation_snippet_service import InstallationSnippetService
from app.schemas.installation_snippet import (
    InstallationSnippetCreate,
    InstallationSnippetUpdate,
    InstallationSnippetResponse,
    InstallationSnippetListItem
)

router = APIRouter(prefix="/snippets", tags=["installation-snippets"])


@router.post("/bots/{bot_id}/snippets", response_model=InstallationSnippetResponse, status_code=status.HTTP_201_CREATED)
def create_snippet_for_bot(
    bot_id: str,
    snippet_data: InstallationSnippetCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new installation snippet for a bot.
    
    This endpoint creates a snippet with a unique snippet_id (UUID) that will be used
    in the embed code. The snippet includes domain allow-list for security.
    """
    try:
        bot_uuid = UUID(bot_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid bot ID format"
        )
    
    snippet = InstallationSnippetService.create_snippet(
        db=db,
        user_id=current_user.id,
        bot_id=bot_uuid,
        allowed_domains=snippet_data.allowed_domains,
        name=snippet_data.name,
        environment=snippet_data.environment
    )
    
    return InstallationSnippetResponse.model_validate(snippet)


@router.get("/bots/{bot_id}/snippets", response_model=List[InstallationSnippetListItem])
def list_snippets_for_bot(
    bot_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List all installation snippets for a bot."""
    try:
        bot_uuid = UUID(bot_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid bot ID format"
        )
    
    snippets = InstallationSnippetService.get_snippets_by_bot(
        db=db,
        bot_id=bot_uuid,
        user_id=current_user.id
    )
    
    return [InstallationSnippetListItem.model_validate(s) for s in snippets]


@router.get("/{snippet_id}", response_model=InstallationSnippetResponse)
def get_snippet(
    snippet_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific installation snippet by ID."""
    try:
        snippet_uuid = UUID(snippet_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid snippet ID format"
        )
    
    snippet = InstallationSnippetService.get_snippet_by_id(db=db, snippet_id=snippet_uuid)
    if not snippet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Snippet not found"
        )
    
    # Verify ownership
    if snippet.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Snippet does not belong to current user"
        )
    
    return InstallationSnippetResponse.model_validate(snippet)


@router.patch("/{snippet_id}", response_model=InstallationSnippetResponse)
def update_snippet(
    snippet_id: str,
    update_data: InstallationSnippetUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update an installation snippet (e.g., update allowed_domains, status)."""
    try:
        snippet_uuid = UUID(snippet_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid snippet ID format"
        )
    
    snippet = InstallationSnippetService.update_snippet(
        db=db,
        snippet_id=snippet_uuid,
        user_id=current_user.id,
        update_data=update_data
    )
    
    return InstallationSnippetResponse.model_validate(snippet)


@router.delete("/{snippet_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_snippet(
    snippet_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete an installation snippet."""
    try:
        snippet_uuid = UUID(snippet_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid snippet ID format"
        )
    
    InstallationSnippetService.delete_snippet(
        db=db,
        snippet_id=snippet_uuid,
        user_id=current_user.id
    )
    
    return None

