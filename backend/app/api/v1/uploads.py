"""Upload endpoints for assets such as branding logos."""

from __future__ import annotations

from datetime import datetime
from io import BytesIO
from pathlib import Path
from typing import Any, Dict, Optional, cast
from urllib.parse import quote, unquote
from uuid import UUID

from fastapi import APIRouter, Depends, File, HTTPException, Request, UploadFile, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.config import settings
from app.core.database import get_db
from app.core.minio_client import delete_file, download_file, upload_file
from app.models.bot import Bot
from app.models.user import User
from app.utils.object_keys import build_brand_logo_key


router = APIRouter(prefix="/uploads", tags=["uploads"])


@router.options("/logo/{encoded_key:path}")
async def options_logo(encoded_key: str):
    """Handle CORS preflight requests for logo endpoint."""
    from fastapi.responses import Response
    return Response(
        status_code=200,
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Max-Age": "3600",
        },
    )


@router.post("/logo")
async def upload_logo(
    file: UploadFile = File(...),
    bot_id: Optional[UUID] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Upload a branding logo (PNG/JPG/SVG up to 10 MB) to MinIO."""
    allowed_exts = {".png", ".jpg", ".jpeg", ".svg"}
    allowed_types = {"image/png", "image/jpeg", "image/svg+xml"}

    filename = file.filename or "logo.png"
    ext = Path(filename).suffix.lower()
    content_type = file.content_type or ""

    if ext not in allowed_exts or content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Logo must be a PNG, JPG, or SVG image.",
        )

    content = await file.read()
    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Logo too large. Max size is 10 MB.",
        )

    user_id = UUID(str(current_user.id))
    object_key = build_brand_logo_key(user_id, filename)
    try:
        upload_file(object_key=object_key, data=content, content_type=content_type)
    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload logo: {exc}",
        ) from exc

    encoded_key = quote(object_key, safe="")
    base_url = settings.API_BASE_URL.rstrip("/")
    api_prefix = settings.API_V1_PREFIX.strip("/")
    logo_url = f"{base_url}/{api_prefix}/uploads/logo/{encoded_key}"
    logo_metadata = {
        "url": logo_url,
        "object_key": object_key,
        "filename": Path(filename).name,
        "content_type": content_type,
        "size": len(content),
        "uploaded_at": datetime.utcnow().isoformat() + "Z",
    }

    if bot_id is not None:
        bot = (
            db.query(Bot)
            .filter(Bot.id == bot_id, Bot.user_id == current_user.id)
            .with_for_update()
            .first()
        )
        if not bot:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bot not found")

        branding_source = cast(Dict[str, Any], bot.branding or {})
        branding_data = dict(branding_source)
        previous_key = branding_data.get("logo_object_key")
        branding_data.update(
            {
                "logo_url": logo_metadata["url"],
                "logo_object_key": logo_metadata["object_key"],
                "logo_filename": logo_metadata["filename"],
                "logo_content_type": logo_metadata["content_type"],
                "logo_size": logo_metadata["size"],
                "logo_uploaded_at": logo_metadata["uploaded_at"],
            }
        )
        bot.branding = branding_data  # type: ignore[assignment]
        db.add(bot)
        db.commit()
        if isinstance(previous_key, str) and previous_key != object_key:
            try:
                delete_file(previous_key)
            except Exception:
                # best-effort cleanup; ignore failures so user flow continues
                pass

    # Return metadata so the frontend can persist details in branding
    return {"logo_url": logo_url, "logo": logo_metadata}


@router.get("/logo/{encoded_key:path}")
async def get_logo(encoded_key: str, request: Request):
    """Stream a previously uploaded logo from MinIO. Public endpoint for widget embedding."""
    object_key = unquote(encoded_key)
    if not object_key.startswith("brand-logos/"):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Logo not found")

    try:
        data, content_type = download_file(object_key)
    except RuntimeError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Logo not found")

    # Get origin from request for CORS
    origin = request.headers.get("origin", "*")
    
    # Explicitly set CORS headers for image loading from any origin (widget embedding)
    headers = {
        "Cache-Control": "max-age=3600",
        "Access-Control-Allow-Origin": "*",  # Allow all origins for public logo access
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Expose-Headers": "*",
    }

    return StreamingResponse(
        BytesIO(data),
        media_type=content_type or "application/octet-stream",
        headers=headers,
    )

