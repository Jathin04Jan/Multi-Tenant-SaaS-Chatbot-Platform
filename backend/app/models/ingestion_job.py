from sqlalchemy import Column, String, Integer, DateTime, Text, Enum as SQLEnum, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
import enum
from app.core.database import Base


class IngestionJobType(str, enum.Enum):
    """Ingestion job type options."""
    INGEST_UPLOAD = "ingest_upload"
    INGEST_URL = "ingest_url"
    REINDEX_DOCUMENT = "reindex_document"
    DELETE_DOCUMENT_VECTORS_REINDEX_BOT = "delete_document_vectors_reindex_bot"


class IngestionJobStatus(str, enum.Enum):
    """Ingestion job status options."""
    QUEUED = "queued"
    PROCESSING = "processing"
    SUCCEEDED = "succeeded"
    FAILED = "failed"
    CANCELLED = "cancelled"


class IngestionJobStage(str, enum.Enum):
    """Ingestion job stage options."""
    DOWNLOAD = "download"
    PARSE = "parse"
    CHUNK = "chunk"
    EMBED = "embed"
    INDEX = "index"


class IngestionJob(Base):
    """Ingestion job model - tracks RAG pipeline jobs for document processing."""
    
    __tablename__ = "ingestion_jobs"
    __table_args__ = (
        Index('idx_ingestion_jobs_user_bot', 'user_id', 'bot_id'),
        Index('idx_ingestion_jobs_user_bot_status', 'user_id', 'bot_id', 'status'),
        Index('idx_ingestion_jobs_status', 'status'),
        Index('idx_ingestion_jobs_stage', 'stage'),
        Index('idx_ingestion_jobs_document', 'document_id'),
        Index('idx_ingestion_jobs_created', 'created_at'),
    )
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Foreign key to users.id - the user/tenant who owns this job"
    )
    bot_id = Column(
        UUID(as_uuid=True),
        ForeignKey("bots.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Foreign key to bots.id - the bot this job is for"
    )
    document_id = Column(
        UUID(as_uuid=True),
        ForeignKey("documents.id", ondelete="CASCADE"),
        nullable=True,
        index=True,
        comment="Foreign key to documents.id - the document being processed (nullable for bot-level jobs)"
    )
    job_type = Column(
        SQLEnum(IngestionJobType, name="ingestion_job_type"),
        nullable=False,
        index=True,
        comment="Job type: ingest_upload, ingest_url, reindex_document, delete_document_vectors_reindex_bot"
    )
    status = Column(
        SQLEnum(IngestionJobStatus, name="ingestion_job_status"),
        nullable=False,
        default=IngestionJobStatus.QUEUED,
        index=True,
        comment="Job status: queued, processing, succeeded, failed, cancelled"
    )
    stage = Column(
        SQLEnum(IngestionJobStage, name="ingestion_job_stage"),
        nullable=True,
        index=True,
        comment="Current processing stage: download, parse, chunk, embed, index"
    )
    attempts = Column(
        Integer,
        nullable=False,
        default=0,
        comment="Number of processing attempts made"
    )
    max_attempts = Column(
        Integer,
        nullable=False,
        default=5,
        comment="Maximum number of retry attempts allowed"
    )
    logs = Column(
        JSONB,
        nullable=True,
        comment="Job execution logs and error details (stored as JSON array of log entries)"
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    started_at = Column(
        DateTime(timezone=True),
        nullable=True,
        comment="Timestamp when job processing started"
    )
    finished_at = Column(
        DateTime(timezone=True),
        nullable=True,
        comment="Timestamp when job processing finished (succeeded or failed)"
    )
    
    # Relationships
    user = relationship("User", backref="ingestion_jobs")
    bot = relationship("Bot", backref="ingestion_jobs")
    document = relationship("Document", backref="ingestion_jobs")
    
    @property
    def is_completed(self) -> bool:
        """Computed property: check if job is completed (succeeded or failed)."""
        from typing import cast
        status_value = cast(str, self.status.value if hasattr(self.status, 'value') else self.status)
        return status_value in [IngestionJobStatus.SUCCEEDED.value, IngestionJobStatus.FAILED.value, IngestionJobStatus.CANCELLED.value]
    
    @property
    def is_active(self) -> bool:
        """Computed property: check if job is currently active (queued or processing)."""
        from typing import cast
        status_value = cast(str, self.status.value if hasattr(self.status, 'value') else self.status)
        return status_value in [IngestionJobStatus.QUEUED.value, IngestionJobStatus.PROCESSING.value]
    
    @property
    def can_retry(self) -> bool:
        """Computed property: check if job can be retried (failed and attempts < max_attempts)."""
        from typing import cast
        status_value = cast(str, self.status.value if hasattr(self.status, 'value') else self.status)
        attempts_value = cast(int, self.attempts)
        max_attempts_value = cast(int, self.max_attempts)
        return status_value == IngestionJobStatus.FAILED.value and attempts_value < max_attempts_value
    
    @property
    def duration_seconds(self) -> float:
        """Computed property: calculate job duration in seconds (if finished)."""
        from typing import cast
        from datetime import datetime
        if self.finished_at is not None and self.started_at is not None:
            finished = cast(datetime, self.finished_at)
            started = cast(datetime, self.started_at)
            return (finished - started).total_seconds()
        return 0.0
    
    def __repr__(self):
        return f"<IngestionJob(id={self.id}, bot_id={self.bot_id}, job_type={self.job_type}, status={self.status}, stage={self.stage})>"

