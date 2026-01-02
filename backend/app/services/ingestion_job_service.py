"""Ingestion job service for managing RAG pipeline jobs."""

from typing import Optional
from uuid import UUID
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models.ingestion_job import (
    IngestionJob,
    IngestionJobType,
    IngestionJobStatus,
    IngestionJobStage,
)


class IngestionJobService:
    """Service for managing ingestion jobs."""

    @staticmethod
    def create_ingestion_job(
        db: Session,
        user_id: UUID,
        bot_id: UUID,
        job_type: IngestionJobType,
        document_id: Optional[UUID] = None,
        status: IngestionJobStatus = IngestionJobStatus.QUEUED,
        stage: Optional[IngestionJobStage] = None,
    ) -> IngestionJob:
        """
        Create a new ingestion job.
        
        Args:
            db: Database session
            user_id: User/tenant ID who owns this job
            bot_id: Bot ID this job is for
            job_type: Type of ingestion job
            document_id: Document ID being processed (optional for bot-level jobs)
            status: Initial job status (default: QUEUED)
            stage: Initial processing stage (default: None)
        
        Returns:
            Created IngestionJob instance
        """
        # Set timestamps explicitly
        now = datetime.now(timezone.utc)
        
        job = IngestionJob(
            user_id=user_id,
            bot_id=bot_id,
            document_id=document_id,
            job_type=job_type,
            status=status,
            stage=stage,
            created_at=now,
            updated_at=now,
        )
        db.add(job)
        db.commit()
        db.refresh(job)
        return job

    @staticmethod
    def get_job(
        db: Session,
        job_id: UUID,
        user_id: UUID,
    ) -> Optional[IngestionJob]:
        """
        Get an ingestion job by ID (with user ownership check).
        
        Args:
            db: Database session
            job_id: Job ID
            user_id: User ID (for ownership verification)
        
        Returns:
            IngestionJob instance or None if not found
        """
        return (
            db.query(IngestionJob)
            .filter(IngestionJob.id == job_id, IngestionJob.user_id == user_id)
            .first()
        )

    @staticmethod
    def update_job(
        db: Session,
        job_id: UUID,
        user_id: UUID,
        status: Optional[IngestionJobStatus] = None,
        stage: Optional[IngestionJobStage] = None,
        **kwargs,
    ) -> Optional[IngestionJob]:
        """
        Update an ingestion job.
        
        Args:
            db: Database session
            job_id: Job ID
            user_id: User ID (for ownership verification)
            status: New status (optional)
            stage: New stage (optional)
            **kwargs: Additional fields to update
        
        Returns:
            Updated IngestionJob instance or None if not found
        """
        job = IngestionJobService.get_job(db, job_id, user_id)
        if not job:
            return None
        
        # Update fields using setattr to avoid type checker warnings
        if status is not None:
            setattr(job, "status", status)
        if stage is not None:
            setattr(job, "stage", stage)
        
        # Update any additional fields
        for key, value in kwargs.items():
            if hasattr(job, key):
                setattr(job, key, value)
        
        # Always update updated_at timestamp
        setattr(job, "updated_at", datetime.now(timezone.utc))
        
        db.commit()
        db.refresh(job)
        return job

    @staticmethod
    def list_jobs_for_bot(
        db: Session,
        bot_id: UUID,
        user_id: UUID,
        status: Optional[IngestionJobStatus] = None,
    ) -> list[IngestionJob]:
        """
        List ingestion jobs for a bot.
        
        Args:
            db: Database session
            bot_id: Bot ID
            user_id: User ID (for ownership verification)
            status: Optional status filter
        
        Returns:
            List of IngestionJob instances
        """
        query = (
            db.query(IngestionJob)
            .filter(IngestionJob.bot_id == bot_id, IngestionJob.user_id == user_id)
        )
        if status:
            query = query.filter(IngestionJob.status == status)
        return query.order_by(IngestionJob.created_at.desc()).all()

    @staticmethod
    def list_jobs_for_document(
        db: Session,
        document_id: UUID,
        user_id: UUID,
    ) -> list[IngestionJob]:
        """
        List ingestion jobs for a document.
        
        Args:
            db: Database session
            document_id: Document ID
            user_id: User ID (for ownership verification)
        
        Returns:
            List of IngestionJob instances
        """
        return (
            db.query(IngestionJob)
            .filter(
                IngestionJob.document_id == document_id,
                IngestionJob.user_id == user_id,
            )
            .order_by(IngestionJob.created_at.desc())
            .all()
        )

