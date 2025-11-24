"""Utility helpers for building safe MinIO object keys."""

from __future__ import annotations

import re
from pathlib import Path
from uuid import UUID


ILLEGAL_CHARS = re.compile(r"[^A-Za-z0-9._-]")


def sanitize_filename(filename: str) -> str:
    """Strip directories and remove illegal characters from filenames."""
    if not filename:
        return "file"

    # Remove path components
    name = Path(filename).name
    # Collapse whitespace
    name = "-".join(name.strip().split())
    # Remove unwanted characters
    name = ILLEGAL_CHARS.sub("_", name)
    return name or "file"


def build_object_key(
    tenant_id: UUID,
    bot_id: UUID,
    document_id: UUID,
    filename: str,
) -> str:
    """Build a safe object key for storage in MinIO."""
    clean_name = sanitize_filename(filename)
    return f"{tenant_id}/{bot_id}/{document_id}/{clean_name}"


