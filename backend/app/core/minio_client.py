"""Utility wrapper around MinIO SDK for secure backend-only access."""

from __future__ import annotations

from functools import lru_cache
from io import BytesIO
from typing import Tuple

from minio import Minio
from minio.error import S3Error

from app.core.config import settings


@lru_cache()
def _get_client() -> Minio:
    """Create (and cache) a MinIO client."""
    client = Minio(
        settings.MINIO_ENDPOINT,
        access_key=settings.MINIO_ACCESS_KEY,
        secret_key=settings.MINIO_SECRET_KEY,
        secure=settings.MINIO_SECURE,
    )
    _ensure_bucket(client)
    return client


def _ensure_bucket(client: Minio) -> None:
    """Create bucket if it doesn't exist (idempotent)."""
    bucket = settings.MINIO_BUCKET_NAME
    found = client.bucket_exists(bucket)
    if not found:
        client.make_bucket(bucket)


def ensure_bucket_exists() -> None:
    """Public helper to eagerly ensure the bucket exists."""
    _get_client()


def upload_file(object_key: str, data: bytes, content_type: str) -> None:
    """Upload raw bytes to MinIO with the provided object key."""
    client = _get_client()
    try:
        stream = BytesIO(data)
        client.put_object(
            settings.MINIO_BUCKET_NAME,
            object_key,
            data=stream,
            length=len(data),
            content_type=content_type or "application/octet-stream",
        )
    except S3Error as exc:
        raise RuntimeError(f"MinIO upload failed: {exc}") from exc


def download_file(object_key: str) -> Tuple[bytes, str]:
    """Download object and return (bytes, content_type)."""
    client = _get_client()
    try:
        response = client.get_object(settings.MINIO_BUCKET_NAME, object_key)
        data = response.read()
        content_type = response.headers.get("Content-Type", "application/octet-stream")
    except S3Error as exc:
        raise RuntimeError(f"MinIO download failed: {exc}") from exc
    finally:
        try:
            response.close()
            response.release_conn()
        except Exception:
            pass
    return data, content_type


def delete_file(object_key: str) -> None:
    """Delete an object if it exists."""
    client = _get_client()
    try:
        client.remove_object(settings.MINIO_BUCKET_NAME, object_key)
    except S3Error as exc:
        # Ignore not found errors, re-raise others
        if exc.code != "NoSuchKey":
            raise RuntimeError(f"MinIO delete failed: {exc}") from exc


