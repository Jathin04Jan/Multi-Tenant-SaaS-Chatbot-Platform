"""
Chat API endpoint for embedded widgets.
Uses JWT token authentication from embed tokens.
"""

from fastapi import APIRouter, HTTPException, status, Depends, Header
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel, Field
from jose import JWTError

from app.core.database import get_db
from app.core.embed_tokens import verify_embed_token
from app.models.bot import Bot
from app.models.installation_snippet import InstallationSnippet

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    """Request model for chat messages."""
    message: str = Field(..., description="User's chat message")


class ChatResponse(BaseModel):
    """Response model for chat messages."""
    response: str = Field(..., description="Bot's response")
    bot_id: str = Field(..., description="Bot ID")
    snippet_id: str = Field(..., description="Snippet ID")


def get_embed_claims(authorization: str = Header(..., description="Bearer token from embed config")):
    """
    Dependency to verify embed token from Authorization header.
    
    Expects: Authorization: Bearer <token>
    Returns: Decoded JWT claims (dict with tid, bid, sid, org, etc.)
    """
    try:
        scheme, token = authorization.split(" ", 1)
        if scheme.lower() != "bearer":
            raise ValueError("Invalid auth scheme")
        
        claims = verify_embed_token(token)
        return claims
    except (ValueError, JWTError) as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"}
        )


@router.post("", response_model=ChatResponse)
def chat(
    payload: ChatRequest,
    claims: dict = Depends(get_embed_claims),
    db: Session = Depends(get_db)
):
    """
    Chat endpoint for embedded widgets.
    
    Requires JWT token from /public/embed-config in Authorization header.
    Token contains tenant_id, bot_id, snippet_id, and origin for security.
    
    **Security:**
    - Do NOT trust bot_id/tenant_id from request body
    - Use only claims from verified JWT token
    - Token is short-lived (default 10 minutes)
    """
    # Extract claims from verified token
    tenant_id = claims.get("tid")
    bot_id = claims.get("bid")
    snippet_id = claims.get("sid")
    origin = claims.get("org", "")
    
    if not all([tenant_id, bot_id, snippet_id]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token: missing required claims"
        )
    
    # Verify snippet still exists and is active
    try:
        from uuid import UUID
        snippet_uuid = UUID(snippet_id)
        snippet = db.query(InstallationSnippet).filter(InstallationSnippet.id == snippet_uuid).first()
        
        if not snippet:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Snippet not found"
            )
        
        if snippet.status != "active":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Snippet is not active"
            )
        
        # Verify bot exists and is active
        bot_uuid = UUID(bot_id)
        bot = db.query(Bot).filter(Bot.id == bot_uuid).first()
        
        if not bot:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Bot not found"
            )
        
        if bot.status.value != 'active' or not bot.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Bot is not active"
            )
        
        # Verify tenant_id matches
        if str(snippet.user_id) != tenant_id or str(bot.user_id) != tenant_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Token claims do not match snippet/bot ownership"
            )
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid ID format: {str(e)}"
        )
    
    # Extract bot configuration
    llm_config = bot.llm_config or {}
    guardrails = bot.guardrails or {}
    branding = bot.branding or {}
    
    # Get communication style and temperature from LLM config
    communication_style = llm_config.get("communication_style", "friendly")
    temperature = llm_config.get("temperature", 0.7)
    style_prompt = llm_config.get("style_prompt", "")
    
    # Get guardrails settings
    max_response_length = guardrails.get("max_response_length", 500)
    blocked_phrases = guardrails.get("blocked_phrases", [])
    block_explicit_content = guardrails.get("block_explicit_content", False)
    block_political_views = guardrails.get("block_political_views", False)
    strictly_stick_to_topic = guardrails.get("strictly_stick_to_topic", False)
    block_personal_info = guardrails.get("block_personal_info", False)
    custom_instructions = guardrails.get("custom_instructions", "")
    
    # Get bot name and welcome message
    bot_name = branding.get("assistant_name") or bot.name
    welcome_message = branding.get("welcome_message", "Hello! How can I help you today?")
    
    # TODO: Implement actual LLM/RAG integration here
    # This is a placeholder that demonstrates the structure
    # In production, you would:
    # 1. Check guardrails (blocked phrases, content filters)
    # 2. Use RAG to retrieve relevant context from knowledge base
    # 3. Build prompt with system instructions, context, and user message
    # 4. Call LLM API (OpenAI, Anthropic, etc.) with temperature and style
    # 5. Apply response length limits
    # 6. Return formatted response
    
    # Placeholder response that uses bot configuration
    user_message = payload.message.strip()
    
    # Basic guardrail checks (placeholder)
    if blocked_phrases:
        for phrase in blocked_phrases:
            if phrase.lower() in user_message.lower():
                return ChatResponse(
                    response="I'm sorry, but I cannot respond to that request due to content restrictions.",
                    bot_id=bot_id,
                    snippet_id=snippet_id
                )
    
    # Generate placeholder response based on communication style
    style_responses = {
        "professional": f"Thank you for your message: '{user_message}'. I'm here to assist you professionally and efficiently.",
        "friendly": f"Hi! Thanks for reaching out about '{user_message}'. I'd be happy to help!",
        "casual": f"Hey! Got it - you're asking about '{user_message}'. Let me help you with that!",
        "technical": f"Regarding '{user_message}': I can provide technical assistance on this topic.",
        "supportive": f"I understand you're asking about '{user_message}'. I'm here to support you and help find a solution.",
        "enthusiastic": f"Great question about '{user_message}'! I'm excited to help you with this!"
    }
    
    base_response = style_responses.get(communication_style, style_responses["friendly"])
    
    # Apply max response length
    if len(base_response) > max_response_length:
        base_response = base_response[:max_response_length - 3] + "..."
    
    # Add note about placeholder
    response_text = f"{base_response}\n\n[Note: This is a placeholder response. Implement LLM/RAG integration to generate actual responses using the bot's knowledge base and configuration.]"
    
    return ChatResponse(
        response=response_text,
        bot_id=bot_id,
        snippet_id=snippet_id
    )

