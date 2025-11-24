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

- `POST /api/v1/bots/{bot_id}/documents` – Upload a document (backend validates type/size, uploads to MinIO, responds with metadata)
- `POST /api/v1/bots/{bot_id}/documents/crawl` – Register a crawled website (stored as `source_type = url`, no MinIO upload)
- `GET /api/v1/bots/{bot_id}/documents` – List documents for the bot (tenant ownership enforced)
- `GET /api/v1/documents/{document_id}` – Download a file (streams bytes, requires tenant auth)
- `DELETE /api/v1/documents/{document_id}` – Remove file + metadata

### Future Enhancements

- Implement pre-signed URLs for large uploads (recorded as TODO in `app/services/presign.py`).
- Extend ingestion pipeline to populate `status` transitions (`pending → processing → indexed/error`) automatically.
- Surface metadata such as page counts, vectorization stats, and crawl summaries in the UI.

