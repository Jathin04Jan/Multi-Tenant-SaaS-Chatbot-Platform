"""Async worker service for processing ingestion jobs."""

import time
import logging
from typing import Optional, Dict, Any, Tuple
from uuid import UUID
from datetime import datetime, timezone
from io import BytesIO

from sqlalchemy import text, func, bindparam
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified

from app.core.database import get_db
from app.core.minio_client import download_file, upload_file
from app.models.ingestion_job import (
    IngestionJob,
    IngestionJobStatus,
    IngestionJobStage,
    IngestionJobType,
)
from app.models.document import Document
from app.services.document_parser import DocumentParser
from app.services.document_service import DocumentService
from app.utils.object_keys import build_object_key

logger = logging.getLogger(__name__)


class IngestionWorker:
    """Worker service for processing ingestion jobs from the queue."""
    
    def __init__(self, poll_interval: float = 2.0):
        """
        Initialize the ingestion worker.
        
        Args:
            poll_interval: Seconds to wait between polling for new jobs (default: 2.0)
        """
        self.poll_interval = poll_interval
        self.running = False
    
    def claim_job(self, db: Session) -> Optional[IngestionJob]:
        """
        Claim a queued job using FOR UPDATE SKIP LOCKED.
        
        This ensures that multiple workers won't pick the same job.
        
        Args:
            db: Database session
        
        Returns:
            IngestionJob instance if a job was claimed, None otherwise
        """
        try:
            # Use SQLAlchemy query API with FOR UPDATE SKIP LOCKED
            # Only claim jobs for file uploads (not URLs or integrations)
            # This handles enum types automatically
            job = (
                db.query(IngestionJob)
                .join(Document, (IngestionJob.document_id == Document.id) & (Document.source_type == "file"))
                .filter(IngestionJob.status == IngestionJobStatus.QUEUED)
                .order_by(IngestionJob.created_at.asc())
                .with_for_update(skip_locked=True)
                .first()
            )
            
            if not job:
                return None
            
            # Update the job status and fields
            setattr(job, "status", IngestionJobStatus.PROCESSING)
            setattr(job, "started_at", datetime.now(timezone.utc))
            setattr(job, "stage", IngestionJobStage.DOWNLOAD)
            current_attempts = job.attempts if job.attempts is not None else 0
            setattr(job, "attempts", current_attempts + 1)
            setattr(job, "updated_at", datetime.now(timezone.utc))
            
            db.commit()
            db.refresh(job)
            
            return job
            
        except Exception as e:
            db.rollback()
            logger.error(f"Error claiming job: {e}")
            return None
    
    def process_job(self, db: Session, job: IngestionJob) -> bool:
        """
        Process a single ingestion job through all stages.
        
        Args:
            db: Database session
            job: IngestionJob to process
        
        Returns:
            True if job completed successfully, False otherwise
        """
        try:
            logger.info(f"Processing job {job.id} (type: {job.job_type}, document: {job.document_id})")
            
            # Only process document-level jobs for now
            document_id = job.document_id
            if document_id is None:
                logger.warning(f"Job {job.id} has no document_id, skipping")
                self._mark_job_failed(db, job, "Job has no associated document", stage=None)
                return False
            
            # Get the document
            document = db.query(Document).filter(Document.id == document_id).first()
            if not document:
                self._mark_job_failed(db, job, f"Document {document_id} not found", stage=None)
                return False
            
            # This check should never be reached since we filter in claim_job,
            # but keeping it as a safety check
            if document.source_type != "file":
                logger.warning(f"Job {job.id} is for non-file document (type: {document.source_type}), this should have been filtered in claim_job")
                # Don't mark as succeeded or failed - just skip
                return False
            
            # Stage 1: Download
            file_data, content_type = self._stage_download(db, job, document)
            
            # Stage 2: Parse
            extracted_text, parse_metadata = self._stage_parse(db, job, document, file_data, content_type)
            
            # Stage 3: Store
            self._stage_store(db, job, document, extracted_text, parse_metadata)
            
            # Mark job as succeeded
            self._mark_job_succeeded(db, job)
            logger.info(f"Job {job.id} completed successfully")
            return True
            
        except Exception as e:
            logger.error(f"Error processing job {job.id}: {e}", exc_info=True)
            # Get current stage from job (refresh to get latest)
            db.refresh(job)
            current_stage = job.stage
            self._mark_job_failed(db, job, str(e), stage=current_stage)
            return False
    
    def _stage_download(self, db: Session, job: IngestionJob, document: Document) -> Tuple[Optional[bytes], Optional[str]]:
        """Stage 1: Download file from MinIO."""
        try:
            self._update_job_stage(db, job, IngestionJobStage.DOWNLOAD)
            logger.info(f"Job {job.id}: Downloading file from MinIO")
            
            if not document.source_url:
                raise ValueError("Document has no source_url")
            
            # Download file from MinIO
            file_data, content_type = download_file(document.source_url)
            
            logger.info(f"Job {job.id}: Downloaded {len(file_data)} bytes from MinIO")
            return file_data, content_type
            
        except Exception as e:
            logger.error(f"Job {job.id}: Download stage failed: {e}")
            # Error will be handled in process_job
            raise
    
    def _stage_parse(
        self,
        db: Session,
        job: IngestionJob,
        document: Document,
        file_data: bytes,
        content_type: Optional[str],
    ) -> Tuple[Optional[str], Optional[Dict[str, Any]]]:
        """Stage 2: Parse document and extract text."""
        try:
            self._update_job_stage(db, job, IngestionJobStage.PARSE)
            logger.info(f"Job {job.id}: Parsing document")
            
            # Extract text using parser
            doc_content_type = document.content_type if document.content_type else None
            doc_filename = document.filename if document.filename else None
            extracted_text, parse_metadata = DocumentParser.extract_text(
                file_data=file_data,
                content_type=content_type or doc_content_type,
                filename=doc_filename,
            )
            
            # Log parse completion
            if not job.logs:
                job.logs = []
            if not isinstance(job.logs, list):
                job.logs = []
            
            job.logs.append({
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "stage": "parse",
                "level": "info",
                "message": f"Extracted {len(extracted_text)} characters",
                "metadata": parse_metadata,
            })
            
            db.commit()
            db.refresh(job)
            
            logger.info(f"Job {job.id}: Extracted {len(extracted_text)} characters")
            return extracted_text, parse_metadata
            
        except Exception as e:
            logger.error(f"Job {job.id}: Parse stage failed: {e}")
            # Error will be handled in process_job
            raise
    
    def _stage_store(
        self,
        db: Session,
        job: IngestionJob,
        document: Document,
        extracted_text: str,
        parse_metadata: Dict[str, Any],
    ) -> bool:
        """Stage 3: Store extracted text to MinIO and update document metadata."""
        try:
            self._update_job_stage(db, job, IngestionJobStage.CHUNK)  # Using CHUNK as "store" for now
            logger.info(f"Job {job.id}: Storing extracted text to MinIO")
            
            # Build object key for extracted text
            doc_user_id = document.user_id
            doc_bot_id = document.bot_id
            doc_doc_id = document.id
            doc_filename = document.filename if document.filename else 'document'
            # Use .txt extension to distinguish from original file (e.g., document.pdf -> document.txt)
            extracted_text_key = build_object_key(
                user_id=doc_user_id,
                bot_id=doc_bot_id,
                document_id=doc_doc_id,
                filename=f"{doc_filename}.txt",
            )
            
            # Upload extracted text to MinIO
            extracted_text_bytes = extracted_text.encode("utf-8")
            upload_file(
                object_key=extracted_text_key,
                data=extracted_text_bytes,
                content_type="text/plain",
            )
            
            logger.info(f"Job {job.id}: Stored extracted text to {extracted_text_key}")
            
            # Update document metadata
            current_metadata = document.metadata_payload or {}
            current_metadata.update({
                "extracted_text_key": extracted_text_key,
                **parse_metadata,  # Includes parser, page_count, char_count, checksum
            })
            
            # Update document metadata (use flag_modified for JSONB columns)
            setattr(document, "metadata_payload", current_metadata)
            flag_modified(document, "metadata_payload")  # Mark JSONB column as modified
            
            # Flush to database (don't commit yet - will commit in _mark_job_succeeded)
            db.flush()
            db.refresh(document)
            
            logger.info(f"Job {job.id}: Updated document metadata")
            return True
            
        except Exception as e:
            logger.error(f"Job {job.id}: Store stage failed: {e}")
            # Error will be handled in process_job
            raise
    
    def _update_job_stage(self, db: Session, job: IngestionJob, stage: IngestionJobStage) -> None:
        """Update job stage."""
        job.stage = stage
        job.updated_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(job)
    
    def _mark_job_succeeded(self, db: Session, job: IngestionJob) -> None:
        """Mark job as succeeded."""
        job.status = IngestionJobStatus.SUCCEEDED
        job.stage = None  # Clear stage when completed
        job.finished_at = datetime.now(timezone.utc)
        job.updated_at = datetime.now(timezone.utc)
        
        # Update document status
        if job.document_id:
            document = db.query(Document).filter(Document.id == job.document_id).first()
            if document:
                document.status = "processing"  # Mark as processing (text extracted, ready for chunking/embedding)
        
        db.commit()
    
    def _mark_job_failed(self, db: Session, job: IngestionJob, error_message: str, stage: Optional[IngestionJobStage] = None) -> None:
        """
        Mark job as failed or re-queue for retry.
        
        If attempts < max_attempts, the job will be re-queued.
        Otherwise, it will be marked as permanently failed.
        
        Args:
            db: Database session
            job: IngestionJob to mark as failed
            error_message: Error message to log
            stage: Current stage when error occurred (optional)
        """
        # Refresh job to get current attempts count
        db.refresh(job)
        
        # Get current logs or initialize
        current_logs = job.logs if job.logs else []
        if not isinstance(current_logs, list):
            current_logs = []
        
        # Add error to logs with stage information
        log_entry = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": "error",
            "message": error_message,
        }
        if stage:
            stage_value = stage.value if hasattr(stage, 'value') else str(stage)
            log_entry["stage"] = stage_value
        elif job.stage:
            # Use job's current stage if stage parameter not provided
            stage_value = job.stage.value if hasattr(job.stage, 'value') else str(job.stage)
            log_entry["stage"] = stage_value
        
        current_logs.append(log_entry)
        
        # Check if job can be retried
        current_attempts = job.attempts if job.attempts is not None else 0
        max_attempts = job.max_attempts if job.max_attempts is not None else 5
        
        if current_attempts < max_attempts:
            # Re-queue the job for retry
            logger.info(f"Job {job.id} failed but can be retried (attempt {current_attempts}/{max_attempts}). Re-queuing...")
            setattr(job, "status", IngestionJobStatus.QUEUED)
            setattr(job, "stage", None)  # Clear stage to start from beginning
            setattr(job, "finished_at", None)  # Clear finished_at since job is being retried
            setattr(job, "updated_at", datetime.now(timezone.utc))
            setattr(job, "logs", current_logs)
            # Don't update document status - it will be updated on success or permanent failure
            
        else:
            # Job has exceeded max attempts - mark as permanently failed
            logger.error(f"Job {job.id} failed and exceeded max attempts ({current_attempts}/{max_attempts}). Marking as permanently failed.")
            setattr(job, "status", IngestionJobStatus.FAILED)
            setattr(job, "finished_at", datetime.now(timezone.utc))
            setattr(job, "updated_at", datetime.now(timezone.utc))
            setattr(job, "logs", current_logs)
            
            # Update document status to error only on permanent failure
            if job.document_id:
                document = db.query(Document).filter(Document.id == job.document_id).first()
                if document:
                    setattr(document, "status", "error")
        
        db.commit()
        db.refresh(job)
    
    def run_once(self, db: Session) -> bool:
        """
        Run one iteration of the worker (claim and process one job).
        
        Args:
            db: Database session
        
        Returns:
            True if a job was processed, False if no jobs were available
        """
        job = self.claim_job(db)
        if not job:
            return False
        
        self.process_job(db, job)
        return True
    
    def run_forever(self) -> None:
        """Run the worker continuously, polling for new jobs."""
        self.running = True
        logger.info("Ingestion worker started")
        
        try:
            while self.running:
                db = next(get_db())
                try:
                    processed = self.run_once(db)
                    if not processed:
                        # No jobs available, sleep before next poll
                        time.sleep(self.poll_interval)
                finally:
                    db.close()
        except KeyboardInterrupt:
            logger.info("Worker stopped by user")
            self.running = False
        except Exception as e:
            logger.error(f"Worker error: {e}", exc_info=True)
            self.running = False
        finally:
            logger.info("Ingestion worker stopped")
    
    def stop(self) -> None:
        """Stop the worker gracefully."""
        self.running = False

