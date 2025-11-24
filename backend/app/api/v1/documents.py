from __future__ import annotations

from io import BytesIO
from typing import List, Optional, cast
from uuid import UUID
from pathlib import Path

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
    status,
)
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.core.minio_client import upload_file, download_file, delete_file
from app.models.user import User
from app.schemas import DocumentResponse
from app.services.document_service import DocumentService
from app.utils.object_keys import build_object_key
from pydantic import BaseModel, HttpUrl


router = APIRouter(tags=["documents"])


class CrawlDocumentRequest(BaseModel):
    url: HttpUrl
    name: Optional[str] = None


@router.post(
    "/bots/{bot_id}/documents",
    response_model=DocumentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_document(
    bot_id: UUID,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Upload a document for a bot owned by the current tenant."""

    allowed_mimetypes = {
        "application/pdf",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }
    allowed_extensions = {".pdf", ".txt", ".doc", ".docx"}

    filename = file.filename or "file"
    ext = Path(filename).suffix.lower()
    content_type = file.content_type or ""
    if ext not in allowed_extensions and content_type not in allowed_mimetypes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file type. Allowed types: PDF, DOC, DOCX, TXT.",
        )

    content = await file.read()
    if not content:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty.",
        )

    owner_id = cast(UUID, current_user.id)

    try:
        DocumentService.ensure_bot_owned_by_user(db, bot_id, owner_id)
    except PermissionError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    document = DocumentService.create_document_record(
        db=db,
        tenant_id=owner_id,
        bot_id=bot_id,
        filename=file.filename or "file",
        content_type=file.content_type,
        source_type="file",
        metadata={"original_name": file.filename},
    )

    object_key = build_object_key(
        tenant_id=owner_id,
        bot_id=bot_id,
        document_id=cast(UUID, document.id),
        filename=file.filename or "file",
    )

    try:
        upload_file(
            object_key=object_key,
            data=content,
            content_type=file.content_type or "application/octet-stream",
        )
    except RuntimeError as exc:
        DocumentService.delete_document_record(
            db,
            cast(UUID, document.id),
            owner_id,
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc

    document = DocumentService.update_storage_metadata(
        db=db,
        document_id=cast(UUID, document.id),
        tenant_id=owner_id,
        source_url=object_key,
        size=len(content),
        content_type=file.content_type or "application/octet-stream",
        status="indexed",
    )

    return DocumentResponse.from_orm(document)


@router.post(
    "/bots/{bot_id}/documents/crawl",
    response_model=DocumentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register_crawl_document(
    bot_id: UUID,
    payload: CrawlDocumentRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Register an external (crawled) data source for a bot."""
    owner_id = cast(UUID, current_user.id)

    try:
        DocumentService.ensure_bot_owned_by_user(db, bot_id, owner_id)
    except PermissionError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    document = DocumentService.create_document_record(
        db=db,
        tenant_id=owner_id,
        bot_id=bot_id,
        filename=payload.name or str(payload.url),
        content_type=None,
        source_type="url",
        metadata={"source": "crawl", "url": str(payload.url)},
        status="processing",
        source_url=str(payload.url),
        size=None,
    )

    return DocumentResponse.from_orm(document)


@router.get(
    "/bots/{bot_id}/documents",
    response_model=List[DocumentResponse],
)
async def list_documents(
    bot_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List all documents for a bot owned by the current tenant."""
    owner_id = cast(UUID, current_user.id)

    try:
        DocumentService.ensure_bot_owned_by_user(db, bot_id, owner_id)
    except PermissionError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    docs = DocumentService.list_documents_for_bot(db, bot_id, owner_id)
    return [DocumentResponse.from_orm(doc) for doc in docs]


@router.get("/documents/{document_id}")
async def download_document(
    document_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Download a document if it belongs to the current tenant."""
    owner_id = cast(UUID, current_user.id)
    document = DocumentService.get_document(db, document_id, owner_id)
    if not document:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    doc_type = cast(str, document.source_type)
    if doc_type != "file":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Document is not stored in MinIO. Use source_url directly.",
        )
    source_url = cast(Optional[str], document.source_url)
    if not source_url:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Document storage incomplete",
        )

    try:
        data, content_type = download_file(source_url)
    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)
        ) from exc

    return StreamingResponse(
        BytesIO(data),
        media_type=content_type,
        headers={
            "Content-Disposition": f'attachment; filename="{document.filename}"',
        },
    )


@router.delete("/documents/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(
    document_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete a document and its underlying MinIO object."""
    owner_id = cast(UUID, current_user.id)
    document = DocumentService.get_document(db, document_id, owner_id)
    if not document:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    doc_type = cast(str, document.source_type)
    source_url = cast(Optional[str], document.source_url)
    if doc_type == "file" and source_url:
        try:
            delete_file(source_url)
        except RuntimeError as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)
            ) from exc

    DocumentService.delete_document_record(db, document_id, owner_id)
    return None

