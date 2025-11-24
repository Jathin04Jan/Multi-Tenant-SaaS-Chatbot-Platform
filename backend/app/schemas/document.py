from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class DocumentResponse(BaseModel):
    id: str
    bot_id: str
    filename: Optional[str]
    content_type: Optional[str]
    size: Optional[int]
    source_type: str
    source_url: Optional[str]
    status: str
    metadata: Optional[dict]
    created_at: datetime
    updated_at: datetime

    @classmethod
    def from_orm(cls, obj):
        return cls(
            id=str(obj.id),
            bot_id=str(obj.bot_id),
            filename=obj.filename,
            content_type=obj.content_type,
            size=obj.size,
            source_type=str(obj.source_type),
            source_url=obj.source_url,
            status=str(obj.status),
            metadata=obj.metadata_payload,
            created_at=obj.created_at,
            updated_at=obj.updated_at,
        )

    class Config:
        from_attributes = True

