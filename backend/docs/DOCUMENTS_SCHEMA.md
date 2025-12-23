# Documents / Knowledge Sources Schema

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

This table stores metadata for tenant knowledge sources persisted in MinIO or referenced externally. Actual file contents live in MinIO (for uploads) or remain at the remote URL/integration; the database only stores metadata, source type, and status.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Document identifier |
| `tenant_id` | UUID (FK → users.id) | Tenant/owner reference. Every query must filter by this column. |
| `bot_id` | UUID (FK → bots.id) | Bot that the document belongs to. Enforces tenant → bot ownership. |
| `source_type` | ENUM('file','url','integration') | Origin of the knowledge item (uploaded file, crawled URL, or 3rd-party integration). |
| `source_url` | VARCHAR(512) | Storage path or remote URL. For uploads, this is the MinIO object key; for crawls/integrations it's the external URL. |
| `filename` | VARCHAR(255) | Original filename provided by the tenant (nullable for URL/integration sources). |
| `content_type` | VARCHAR(128) | MIME type (nullable for URL/integration sources). |
| `size` | INTEGER | File size in bytes (only populated for file uploads, not URLs). |
| `status` | ENUM('pending','processing','indexed','error') | Lifecycle state for ingestion/indexing. Crawled URLs start as `processing` until the pipeline ingests them. |
| `metadata` | JSONB | Optional extra data (checksums, crawler info, ingest pipeline outputs, etc.). |
| `created_at` | TIMESTAMP WITH TIME ZONE | Creation time. |
| `updated_at` | TIMESTAMP WITH TIME ZONE | Last modification time (auto-updated). |

> Notes:
> - Object keys are never accepted from clients; they are built server-side.
> - MinIO credentials remain backend-only. Tenants interact solely through FastAPI endpoints. File uploads are limited to 1 GB and to PDF/DOC/DOCX/TXT types; validation happens server-side.
> - All MinIO operations use the single server-side MinIO account configured in `.env`. URL-based documents (web crawls) are tracked in Postgres only; no MinIO object is created.

## API Surface

- `POST /api/v1/bots/{bot_id}/documents` – Upload a document (backend validates type/size, **uploads to MinIO immediately**, creates database record, responds with metadata). **Documents are not queued** - they are persisted immediately to ensure they survive wizard exits and page refreshes.
- `POST /api/v1/bots/{bot_id}/documents/crawl` – Register a crawled website (stored as `source_type = url`, no MinIO upload)
- `GET /api/v1/bots/{bot_id}/documents` – List documents for the bot (tenant ownership enforced). Used by the wizard to re-hydrate document list when resuming.
- `GET /api/v1/documents/{document_id}` – Download a file (streams bytes, requires tenant auth)
- `DELETE /api/v1/documents/{document_id}` – Remove file + metadata (also deletes MinIO object)

### Immediate Upload Behavior

**Important**: Documents are uploaded to both the database and MinIO **immediately** when added in Step 4 of the bot creation wizard. This ensures:

1. **Persistence**: Documents persist even if the user exits the wizard or refreshes the page
2. **Resume Capability**: When the user returns to the wizard, documents are re-hydrated from the database
3. **No Data Loss**: Documents are never lost due to incomplete wizard sessions
4. **Production Ready**: The system handles partial bot creation gracefully

The frontend calls `POST /api/v1/bots/{bot_id}/documents` as soon as a file is selected, and the backend:
1. Validates the file (type, size)
2. Creates the database record with `status = 'pending'`
3. Uploads the file to MinIO
4. Updates the database record with the `source_url` (MinIO object key)
5. Returns the document metadata to the frontend

The frontend then updates its local state with the document ID and status, ensuring the UI reflects the persisted state.

### Future Enhancements

- Implement pre-signed URLs for large uploads (recorded as TODO in `app/services/presign.py`).
- Extend ingestion pipeline to populate `status` transitions (`pending → processing → indexed/error`) automatically.
- Surface metadata such as page counts, vectorization stats, and crawl summaries in the UI.

---

## 📝 SQL CREATE Statement

```sql
-- Create enum types for document source type and status
CREATE TYPE document_source_type AS ENUM ('file', 'url', 'integration');
CREATE TYPE document_status AS ENUM ('pending', 'processing', 'indexed', 'error');

CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
    source_type document_source_type NOT NULL DEFAULT 'file',
    source_url VARCHAR(512),
    filename VARCHAR(255),
    content_type VARCHAR(128),
    size INTEGER,
    status document_status NOT NULL DEFAULT 'pending',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documents_tenant_id ON documents(tenant_id);
CREATE INDEX idx_documents_bot_id ON documents(bot_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_source_type ON documents(source_type);
```

**Note**: The Python model uses `metadata_payload` as the attribute name, but the database column is named `metadata`. This is handled via SQLAlchemy's `Column` definition with the `name` parameter.

