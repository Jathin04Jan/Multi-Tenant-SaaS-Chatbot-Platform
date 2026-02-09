# db/pg.py
from __future__ import annotations

import json
import logging
import os
from contextlib import contextmanager
from datetime import datetime, timezone
from typing import Any, Dict, Optional

from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session, sessionmaker

import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from db.enums import IngestionJobStage, IngestionJobStatus

logger = logging.getLogger("db.ingestion_jobs")

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://yourbot_user:yourbot_password@localhost:5433/yourbot_db",
)

_ENGINE: Optional[Engine] = None
_SessionLocal: Optional[sessionmaker] = None


def get_engine() -> Engine:
    global _ENGINE, _SessionLocal
    if _ENGINE is None:
        _ENGINE = create_engine(
            DATABASE_URL,
            pool_pre_ping=True,
            pool_size=int(os.getenv("DB_POOL_SIZE", "5")),
            max_overflow=int(os.getenv("DB_MAX_OVERFLOW", "10")),
            pool_recycle=int(os.getenv("DB_POOL_RECYCLE_S", "1800")),  # 30 mins
            future=True,
        )
        _SessionLocal = sessionmaker(bind=_ENGINE, autoflush=False, autocommit=False, future=True)
    return _ENGINE


@contextmanager
def db_session() -> Session:
    if _SessionLocal is None:
        get_engine()
    assert _SessionLocal is not None

    s: Session = _SessionLocal()
    try:
        yield s
        s.commit()
    except Exception:
        s.rollback()
        raise
    finally:
        s.close()


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def _json_array_1(item: Dict[str, Any]) -> str:
    """
    Returns a JSON array string with 1 element. Example:
    '[{"a":1}]'
    Safe to cast into jsonb in SQL.
    """
    return json.dumps([item], ensure_ascii=False)


# -------------------------------------------------------------------
# Core transitions
# -------------------------------------------------------------------

def mark_job_processing(*, job_id: str) -> None:
    """
    queued -> processing
    - sets started_at if missing
    - stage defaults to DOWNLOAD if NULL
    - attempts increments ONLY on first transition from QUEUED -> PROCESSING
    Idempotent + safe.
    """
    try:
        with db_session() as s:
            s.execute(
                text("""
                UPDATE ingestion_jobs
                SET
                  status = CASE
                    WHEN status = :queued THEN :processing
                    ELSE status
                  END,
                  stage = COALESCE(stage, :download),
                  started_at = COALESCE(started_at, NOW()),
                  attempts = CASE
                    WHEN status = :queued THEN attempts + 1
                    ELSE attempts
                  END,
                  updated_at = NOW()
                WHERE id = :job_id
                """),
                {
                    "job_id": job_id,
                    "queued": IngestionJobStatus.QUEUED.value,
                    "processing": IngestionJobStatus.PROCESSING.value,
                    "download": IngestionJobStage.DOWNLOAD.value,
                },
            )
    except OperationalError as e:
        logger.warning("DB unavailable: mark_job_processing job_id=%s err=%s", job_id, e)
    except Exception:
        logger.exception("mark_job_processing failed job_id=%s", job_id)


def update_job_stage(*, job_id: str, stage: IngestionJobStage) -> None:
    """
    Update stage only. Stage must be one of the DB enum values (UPPERCASE).
    """
    try:
        with db_session() as s:
            s.execute(
                text("""
                UPDATE ingestion_jobs
                SET stage = :stage,
                    updated_at = NOW()
                WHERE id = :job_id
                """),
                {"job_id": job_id, "stage": stage.value},
            )
    except OperationalError as e:
        logger.warning("DB unavailable: update_job_stage job_id=%s stage=%s err=%s", job_id, stage.value, e)
    except Exception:
        logger.exception("update_job_stage failed job_id=%s stage=%s", job_id, stage.value)


def mark_job_succeeded(*, job_id: str, extra_log: Optional[Dict[str, Any]] = None) -> None:
    """
    processing -> succeeded (or any -> succeeded)
    - sets finished_at
    - optional log append
    """
    try:
        with db_session() as s:
            if extra_log:
                log_entry = {
                    "timestamp": utc_now().isoformat(),
                    "level": "info",
                    "event": "job_succeeded",
                    **extra_log,
                }
                s.execute(
                    text("""
                    UPDATE ingestion_jobs
                    SET status = :status,
                        finished_at = NOW(),
                        updated_at = NOW(),
                        logs = COALESCE(logs, '[]'::jsonb) || CAST(:log_json AS jsonb)
                    WHERE id = :job_id
                    """),
                    {
                        "job_id": job_id,
                        "status": IngestionJobStatus.SUCCEEDED.value,
                        "log_json": _json_array_1(log_entry),
                    },
                )
            else:
                s.execute(
                    text("""
                    UPDATE ingestion_jobs
                    SET status = :status,
                        finished_at = NOW(),
                        updated_at = NOW()
                    WHERE id = :job_id
                    """),
                    {"job_id": job_id, "status": IngestionJobStatus.SUCCEEDED.value},
                )
    except OperationalError as e:
        logger.warning("DB unavailable: mark_job_succeeded job_id=%s err=%s", job_id, e)
    except Exception:
        logger.exception("mark_job_succeeded failed job_id=%s", job_id)


def mark_job_failed(
    *,
    job_id: str,
    error: str,
    stage: Optional[IngestionJobStage] = None,
    extra: Optional[Dict[str, Any]] = None,
) -> None:
    """
    processing -> failed (or any -> failed)
    - sets finished_at
    - stores stage if provided
    - appends an error log entry
    """
    try:
        log_entry: Dict[str, Any] = {
            "timestamp": utc_now().isoformat(),
            "level": "error",
            "event": "job_failed",
            "error": error,
        }
        if stage:
            log_entry["stage"] = stage.value
        if extra:
            log_entry["extra"] = extra

        with db_session() as s:
            if stage:
                s.execute(
                    text("""
                    UPDATE ingestion_jobs
                    SET status = :status,
                        stage = :stage,
                        finished_at = NOW(),
                        updated_at = NOW(),
                        logs = COALESCE(logs, '[]'::jsonb) || CAST(:log_json AS jsonb)
                    WHERE id = :job_id
                    """),
                    {
                        "job_id": job_id,
                        "status": IngestionJobStatus.FAILED.value,
                        "stage": stage.value,
                        "log_json": _json_array_1(log_entry),
                    },
                )
            else:
                s.execute(
                    text("""
                    UPDATE ingestion_jobs
                    SET status = :status,
                        finished_at = NOW(),
                        updated_at = NOW(),
                        logs = COALESCE(logs, '[]'::jsonb) || CAST(:log_json AS jsonb)
                    WHERE id = :job_id
                    """),
                    {
                        "job_id": job_id,
                        "status": IngestionJobStatus.FAILED.value,
                        "log_json": _json_array_1(log_entry),
                    },
                )
    except OperationalError as e:
        logger.warning("DB unavailable: mark_job_failed job_id=%s err=%s", job_id, e)
    except Exception:
        logger.exception("mark_job_failed failed job_id=%s", job_id)


def append_job_log(*, job_id: str, level: str, message: str, extra: Optional[Dict[str, Any]] = None) -> None:
    """
    Append a structured log entry into ingestion_jobs.logs (jsonb array).
    """
    try:
        log_entry: Dict[str, Any] = {
            "timestamp": utc_now().isoformat(),
            "level": level,
            "message": message,
        }
        if extra:
            log_entry["extra"] = extra

        with db_session() as s:
            s.execute(
                text("""
                UPDATE ingestion_jobs
                SET updated_at = NOW(),
                    logs = COALESCE(logs, '[]'::jsonb) || CAST(:log_json AS jsonb)
                WHERE id = :job_id
                """),
                {"job_id": job_id, "log_json": _json_array_1(log_entry)},
            )
    except OperationalError as e:
        logger.warning("DB unavailable: append_job_log job_id=%s err=%s", job_id, e)
    except Exception:
        logger.exception("append_job_log failed job_id=%s", job_id)