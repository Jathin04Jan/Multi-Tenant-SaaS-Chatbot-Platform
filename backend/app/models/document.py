"""Document model representing tenant-owned knowledge sources stored in MinIO."""

from __future__ import annotations

import uuid

from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base

SourceTypeEnum = Enum("file", "url", "integration", name="document_source_type")
StatusEnum = Enum("pending", "processing", "uploaded_to_database", "error", name="document_status")


class Document(Base):
    """Represents a single document or data source linked to a bot."""

    __tablename__ = "documents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="User/tenant owner reference",
    )
    bot_id = Column(
        UUID(as_uuid=True),
        ForeignKey("bots.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Bot this document is associated with",
    )
    source_type = Column(
        SourceTypeEnum,
        nullable=False,
        default="file",
        index=True,
        comment="Source category: file upload, external URL, or integration",
    )
    source_url = Column(
        String(512),
        nullable=True,
        comment="Storage location or original URL",
    )
    filename = Column(String(255), nullable=True, comment="Original filename (if applicable)")
    content_type = Column(String(128), nullable=True, comment="Mime type")
    size = Column(Integer, nullable=True, comment="File size in bytes")
    status = Column(
        StatusEnum,
        nullable=False,
        default="pending",
        index=True,
        comment="Processing status for ingestion/indexing pipeline",
    )
    metadata_payload = Column(
        "metadata",
        JSONB,
        nullable=True,
        comment="Additional metadata (page count, checksums, etc.)",
    )

    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    updated_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

    # Relationships
    user = relationship("User", backref="documents")
    bot = relationship("Bot", backref="documents")

    def __repr__(self) -> str:
        return (
            f"<Document id={self.id} user_id={self.user_id} "
            f"bot_id={self.bot_id} status={self.status}>"
        )

