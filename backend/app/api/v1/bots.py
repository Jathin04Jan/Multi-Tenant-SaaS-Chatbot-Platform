from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from uuid import UUID
from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.schemas.bot import BotResponse, BotListItem, BotCreate, BotUpdate
from app.models.bot import Bot
from app.models.user import User
from app.services.bot_service import BotService

router = APIRouter(prefix="/bots", tags=["bots"])



@router.post("", response_model=BotResponse, status_code=status.HTTP_201_CREATED)
async def create_bot(
    bot_data: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new bot for the current authenticated user.
    
    Expected bot_data structure:
    - name: Bot name (required)
    - description: Bot description (optional)
    - branding: Branding and UI configuration (JSONB: colors, messages, positioning, widget sizing)
    - llm_config: LLM configuration (JSONB)
    - guardrails: Guardrails configuration (JSONB)
    - retrieval_config: Retrieval/RAG configuration (JSONB)
    """
    try:
        user_uuid = UUID(str(current_user.id))
        existing_draft = BotService.get_user_draft_bot(db, user_uuid)
        if existing_draft:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Finish or reset your existing draft before creating a new bot."
            )
        bot = BotService.create_bot(db, current_user, bot_data)
        return BotResponse.from_orm(bot)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while creating bot: {str(e)}"
        )


@router.get("", response_model=List[BotListItem])
async def get_user_bots(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all bots for the current authenticated user.
    Returns a list of bots with basic information.
    """
    try:
        # Fetch all bots for the current user
        bots = db.query(Bot).filter(Bot.user_id == current_user.id).order_by(Bot.updated_at.desc()).all()
        
        # Convert to response format with conversations_count (default to 0 for now)
        bot_list = []
        for bot in bots:
            bot_dict = BotResponse.from_orm(bot).model_dump()
            bot_dict["conversations_count"] = 0  # TODO: Calculate from conversations table when implemented
            bot_list.append(BotListItem(**bot_dict))
        
        return bot_list
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while fetching bots: {str(e)}"
        )


@router.get("/draft", response_model=BotResponse)
async def get_draft_bot(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Return the current draft bot for the authenticated user."""
    user_uuid = UUID(str(current_user.id))
    draft = BotService.get_user_draft_bot(db, user_uuid)
    if not draft:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No draft bot found."
        )
    return BotResponse.from_orm(draft)


@router.post("/draft", response_model=BotResponse, status_code=status.HTTP_201_CREATED)
async def create_draft_bot(
    bot_data: Optional[Dict[str, Any]] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a draft bot (one per user)."""
    try:
        draft = BotService.create_draft_bot(db, current_user, bot_data)
        return BotResponse.from_orm(draft)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc)
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create draft bot: {exc}"
        )


@router.delete("/draft", status_code=status.HTTP_204_NO_CONTENT)
async def delete_draft_bot(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Reset and delete the user's current draft bot (including assets)."""
    user_uuid = UUID(str(current_user.id))
    deleted = BotService.clear_draft_bot(db, user_uuid)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No draft bot found."
        )
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/{bot_id}", response_model=BotResponse)
async def get_bot(
    bot_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get a specific bot by ID.
    Only returns bot if it belongs to the current user.
    """
    try:
        bot = db.query(Bot).filter(
            Bot.id == bot_id,
            Bot.user_id == current_user.id
        ).first()
        
        if not bot:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Bot not found"
            )
        
        return BotResponse.from_orm(bot)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while fetching bot: {str(e)}"
        )


@router.patch("/{bot_id}", response_model=BotResponse)
async def update_bot(
    bot_id: UUID,
    bot_update: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update a bot's configuration.
    Only the bot owner can update it.
    
    Expected bot_update structure (all fields optional):
    - name: Bot name
    - description: Bot description
    - status: Bot status (draft, active, paused, archived)
    - branding: Branding configuration (JSONB)
    - llm_config: LLM configuration (JSONB)
    - guardrails: Guardrails configuration (JSONB)
    - retrieval_config: Retrieval/RAG configuration (JSONB)
    """
    try:
        user_uuid = UUID(str(current_user.id))
        bot = BotService.update_bot(
            db=db,
            bot_id=bot_id,
            user_id=user_uuid,
            bot_update=BotUpdate(**bot_update)
        )
        
        if not bot:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Bot not found"
            )
        
        return BotResponse.from_orm(bot)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while updating bot: {str(e)}"
        )


@router.delete("/{bot_id}")
async def delete_bot(
    bot_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a bot owned by the current user."""
    try:
        user_uuid = UUID(str(current_user.id))
        deleted = BotService.delete_bot(
            db=db,
            bot_id=bot_id,
            user_id=user_uuid
        )

        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Bot not found"
            )

        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while deleting bot: {str(e)}"
        )


