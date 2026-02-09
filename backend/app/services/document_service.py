from __future__ import annotations

from typing import List, Optional
from uuid import UUID

from sqlalchemy.orm import Session

from app.models.bot import Bot
from app.models.document import Document


class DocumentService:
    """Encapsulates document related database operations."""

    @staticmethod
    def ensure_bot_owned_by_user(
        db: Session,
        bot_id: UUID,
        user_id: UUID,
    ) -> Bot:
        bot = (
            db.query(Bot)
            .filter(Bot.id == bot_id, Bot.user_id == user_id)
            .first()
        )
        if not bot:
            raise PermissionError("Bot not found or access denied")
        return bot

    @staticmethod
    def create_document_record(
        db: Session,
        user_id: UUID,
        bot_id: UUID,
        filename: Optional[str],
        content_type: Optional[str],
        source_type: str = "file",
        metadata: Optional[dict] = None,
        status: str = "pending",
        source_url: Optional[str] = None,
        size: Optional[int] = None,
    ) -> Document:
        doc = Document(
            user_id=user_id,
            bot_id=bot_id,
            filename=filename,
            content_type=content_type,
            source_type=source_type,
            source_url=source_url,
            size=size,
            status=status,
            metadata_payload=metadata,
        )
        db.add(doc)
        db.commit()
        db.refresh(doc)
        return doc

    @staticmethod
    def update_storage_metadata(
        db: Session,
        document_id: UUID,
        user_id: UUID,
        source_url: str,
        size: Optional[int],
        content_type: Optional[str],
        status: str = "uploaded_to_database",
    ) -> Document:
        doc = (
            db.query(Document)
            .filter(Document.id == document_id, Document.user_id == user_id)
            .first()
        )
        if not doc:
            raise ValueError("Document not found")
        setattr(doc, "source_url", source_url)
        setattr(doc, "size", size)
        setattr(doc, "content_type", content_type)
        setattr(doc, "status", status)
        db.commit()
        db.refresh(doc)
        return doc

    @staticmethod
    def get_document(
        db: Session,
        document_id: UUID,
        user_id: UUID,
    ) -> Optional[Document]:
        return (
            db.query(Document)
            .filter(Document.id == document_id, Document.user_id == user_id)
            .first()
        )

    @staticmethod
    def delete_document_record(
        db: Session,
        document_id: UUID,
        user_id: UUID,
    ) -> None:
        doc = DocumentService.get_document(db, document_id, user_id)
        if not doc:
            raise ValueError("Document not found")
        db.delete(doc)
        db.commit()

    @staticmethod
    def list_documents_for_bot(
        db: Session,
        bot_id: UUID,
        user_id: UUID,
    ) -> List[Document]:
        return (
            db.query(Document)
            .filter(Document.bot_id == bot_id, Document.user_id == user_id)
            .order_by(Document.created_at.desc())
            .all()
        )


