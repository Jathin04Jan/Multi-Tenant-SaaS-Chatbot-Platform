# Ingestion Jobs Schema

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## 📊 `ingestion_jobs` Table

Tracks RAG pipeline jobs for document processing. This table manages the lifecycle of ingestion jobs including document uploads, URL crawls, reindexing, and vector deletion operations.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique job identifier |
| `user_id` | UUID | FOREIGN KEY → users.id, NOT NULL, INDEXED, CASCADE DELETE | Foreign key to users.id - the user/tenant who owns this job |
| `bot_id` | UUID | FOREIGN KEY → bots.id, NOT NULL, INDEXED, CASCADE DELETE | Foreign key to bots.id - the bot this job is for |
| `document_id` | UUID | FOREIGN KEY → documents.id, NULLABLE, INDEXED, CASCADE DELETE | Foreign key to documents.id - the document being processed (nullable for bot-level jobs) |
| `job_type` | ENUM | NOT NULL, INDEXED | Job type: ingest_upload, ingest_url, reindex_document, delete_document_vectors_reindex_bot |
| `status` | ENUM | NOT NULL, DEFAULT 'queued', INDEXED | Job status: queued, processing, succeeded, failed, cancelled |
| `stage` | ENUM | NULLABLE, INDEXED | Current processing stage: download, parse, chunk, embed, index |
| `attempts` | INTEGER | NOT NULL, DEFAULT 0 | Number of processing attempts made |
| `max_attempts` | INTEGER | NOT NULL, DEFAULT 5 | Maximum number of retry attempts allowed |
| `logs` | JSONB | NULLABLE | Job execution logs and error details (stored as JSON array of log entries) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), INDEXED | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |
| `started_at` | TIMESTAMP WITH TIME ZONE | NULLABLE | Timestamp when job processing started |
| `finished_at` | TIMESTAMP WITH TIME ZONE | NULLABLE | Timestamp when job processing finished (succeeded or failed) |

### Job Type Enum Values
- **`ingest_upload`** - Process an uploaded file document
- **`ingest_url`** - Process a URL/crawled document
- **`reindex_document`** - Reindex an existing document
- **`delete_document_vectors_reindex_bot`** - Delete document vectors and reindex entire bot

### Status Enum Values
- **`queued`** - Job is queued for processing (default)
- **`processing`** - Job is currently being processed
- **`succeeded`** - Job completed successfully
- **`failed`** - Job failed (can be retried if attempts < max_attempts)
- **`cancelled`** - Job was cancelled

### Stage Enum Values
- **`download`** - Downloading document from source
- **`parse`** - Parsing document content
- **`chunk`** - Chunking document into segments
- **`embed`** - Generating embeddings for chunks
- **`index`** - Indexing embeddings in vector database

### Key Design Decisions

1. **Job Lifecycle Tracking**: Tracks complete RAG pipeline job lifecycle from queued to completion
   - Supports multiple job types (upload, URL, reindex, bot-level operations)
   - Tracks processing stage within the pipeline
   - Records timing information (started_at, finished_at)

2. **Retry Mechanism**: Built-in retry support with `attempts` and `max_attempts`
   - Default max_attempts is 5
   - Can check `can_retry` property to determine if job can be retried
   - Tracks number of attempts made

3. **Nullable Document ID**: `document_id` is nullable for bot-level jobs
   - Document-specific jobs (ingest_upload, ingest_url, reindex_document) have document_id
   - Bot-level jobs (delete_document_vectors_reindex_bot) have null document_id

4. **Logging**: JSONB `logs` field stores detailed execution logs
   - Structured log entries with timestamp, level, and message
   - Useful for debugging and monitoring
   - Can store error details and stack traces

5. **Performance Optimization**: 
   - Composite indexes on `(user_id, bot_id)` and `(user_id, bot_id, status)` for efficient user/bot/status queries
   - Indexes on `status`, `stage`, `document_id` for filtering
   - Index on `created_at` for time-based queries

### Computed Properties (Not Database Columns)

The model provides four computed properties for convenience:

#### 1. `is_completed` Property
```python
@property
def is_completed(self) -> bool:
    """Returns True if job is completed (succeeded, failed, or cancelled)"""
    return self.status.value in [IngestionJobStatus.SUCCEEDED.value, IngestionJobStatus.FAILED.value, IngestionJobStatus.CANCELLED.value]
```

**Usage:**
```python
# In your code:
if ingestion_job.is_completed:
    # Job is finished
    cleanup_job()
```

**Important:**
- **Not stored in database** - computed from `status` column
- Returns `True` for succeeded, failed, or cancelled jobs

#### 2. `is_active` Property
```python
@property
def is_active(self) -> bool:
    """Returns True if job is currently active (queued or processing)"""
    return self.status.value in [IngestionJobStatus.QUEUED.value, IngestionJobStatus.PROCESSING.value]
```

**Usage:**
```python
# In your code:
if ingestion_job.is_active:
    # Job is still running
    show_progress()
```

**Important:**
- **Not stored in database** - computed from `status` column
- Returns `True` for queued or processing jobs

#### 3. `can_retry` Property
```python
@property
def can_retry(self) -> bool:
    """Returns True if job can be retried (failed and attempts < max_attempts)"""
    return self.status.value == IngestionJobStatus.FAILED.value and self.attempts < self.max_attempts
```

**Usage:**
```python
# In your code:
if ingestion_job.can_retry:
    # Retry the job
    retry_job(ingestion_job)
```

**Important:**
- **Not stored in database** - computed from `status`, `attempts`, and `max_attempts` columns
- Useful for implementing automatic retry logic

#### 4. `duration_seconds` Property
```python
@property
def duration_seconds(self) -> float:
    """Returns job duration in seconds (if finished)"""
    if self.finished_at is not None and self.started_at is not None:
        return (self.finished_at - self.started_at).total_seconds()
    return 0.0
```

**Usage:**
```python
# In your code:
duration = ingestion_job.duration_seconds
if duration > 300:  # 5 minutes
    # Job took longer than expected
    log_slow_job(ingestion_job)
```

**Important:**
- **Not stored in database** - computed from `started_at` and `finished_at` columns
- Returns 0.0 if job hasn't finished yet
- Useful for performance monitoring and analytics

**Why Computed Properties?**
- ✅ Avoids storing redundant data (single source of truth)
- ✅ Prevents data inconsistency (computed from actual columns)
- ✅ Convenient for code readability
- ✅ No database overhead (computed in Python)

---

## 📝 SQL CREATE Statement

```sql
-- Create enum types for ingestion jobs
CREATE TYPE ingestion_job_type AS ENUM ('ingest_upload', 'ingest_url', 'reindex_document', 'delete_document_vectors_reindex_bot');
CREATE TYPE ingestion_job_status AS ENUM ('queued', 'processing', 'succeeded', 'failed', 'cancelled');
CREATE TYPE ingestion_job_stage AS ENUM ('download', 'parse', 'chunk', 'embed', 'index');

CREATE TABLE ingestion_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    job_type ingestion_job_type NOT NULL,
    status ingestion_job_status NOT NULL DEFAULT 'queued',
    stage ingestion_job_stage,
    attempts INTEGER NOT NULL DEFAULT 0,
    max_attempts INTEGER NOT NULL DEFAULT 5,
    logs JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP WITH TIME ZONE,
    finished_at TIMESTAMP WITH TIME ZONE
);

-- Indexes created automatically by SQLAlchemy (index=True on columns)
-- Primary key index: id (automatic)
-- Foreign key indexes: user_id, bot_id, document_id (automatic from index=True)
-- Column indexes: job_type, status, stage, created_at (automatic from index=True)

-- Composite indexes defined in __table_args__
CREATE INDEX idx_ingestion_jobs_user_bot ON ingestion_jobs(user_id, bot_id);
CREATE INDEX idx_ingestion_jobs_user_bot_status ON ingestion_jobs(user_id, bot_id, status);
CREATE INDEX idx_ingestion_jobs_status ON ingestion_jobs(status);
CREATE INDEX idx_ingestion_jobs_stage ON ingestion_jobs(stage);
CREATE INDEX idx_ingestion_jobs_document ON ingestion_jobs(document_id);
CREATE INDEX idx_ingestion_jobs_created ON ingestion_jobs(created_at);
```

---

## 💾 Example Records

### Example 1: Active Upload Job
```json
{
  "id": "j1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "bot_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "document_id": "d1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "job_type": "ingest_upload",
  "status": "processing",
  "stage": "embed",
  "attempts": 0,
  "max_attempts": 5,
  "logs": [
    {"timestamp": "2024-01-15T10:00:00Z", "level": "info", "message": "Job started"},
    {"timestamp": "2024-01-15T10:01:00Z", "level": "info", "message": "Document downloaded from MinIO"},
    {"timestamp": "2024-01-15T10:02:00Z", "level": "info", "message": "Document parsed into 150 chunks"},
    {"timestamp": "2024-01-15T10:03:00Z", "level": "info", "message": "Generating embeddings for chunks..."}
  ],
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:03:00Z",
  "started_at": "2024-01-15T10:00:00Z",
  "finished_at": null
}
```
**Computed Properties:**
- `is_completed`: `False` (status is 'processing')
- `is_active`: `True` (status is 'processing')
- `can_retry`: `False` (job hasn't failed)
- `duration_seconds`: `180.0` (3 minutes elapsed)

### Example 2: URL Ingestion Job (Ignored by Worker)
```json
{
  "id": "j2b3c4d5-e6f7-8901-bcde-f12345678901",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "bot_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "document_id": "d2b3c4d5-e6f7-8901-bcde-f12345678901",
  "job_type": "ingest_url",
  "status": "queued",
  "stage": null,
  "attempts": 0,
  "max_attempts": 5,
  "logs": null,
  "created_at": "2024-01-15T09:00:00Z",
  "updated_at": "2024-01-15T09:00:00Z",
  "started_at": null,
  "finished_at": null
}
```
**Computed Properties:**
- `is_completed`: `False` (status is 'queued')
- `is_active`: `True` (status is 'queued')
- `can_retry`: `False` (job hasn't failed)
- `duration_seconds`: `0.0` (job hasn't started)

**Note**: URL and integration jobs are currently ignored by the async worker. They remain in `queued` status and are not processed. Only file upload jobs (`source_type = 'file'`) are processed for text extraction.

### Example 3: Failed Job (Auto-Retry)
```json
{
  "id": "j3b4c5d6-e7f8-9012-cdef-123456789012",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "bot_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "document_id": "d1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "job_type": "ingest_upload",
  "status": "queued",
  "stage": null,
  "attempts": 2,
  "max_attempts": 5,
  "logs": [
    {"timestamp": "2024-01-15T11:00:00Z", "level": "info", "message": "Job started"},
    {"timestamp": "2024-01-15T11:01:00Z", "level": "info", "message": "Document downloaded"},
    {"timestamp": "2024-01-15T11:02:00Z", "level": "info", "message": "Document parsed"},
    {"timestamp": "2024-01-15T11:03:00Z", "level": "error", "message": "MinIO upload failed", "stage": "store"}
  ],
  "created_at": "2024-01-15T11:00:00Z",
  "updated_at": "2024-01-15T11:03:00Z",
  "started_at": null,
  "finished_at": null
}
```
**Computed Properties:**
- `is_completed`: `False` (status is 'queued' - job was re-queued for retry)
- `is_active`: `True` (status is 'queued')
- `can_retry`: `False` (job is queued, not failed)
- `duration_seconds`: `0.0` (job hasn't restarted yet)

**Note**: This job failed but was automatically re-queued because `attempts (2) < max_attempts (5)`. The worker will pick it up again and retry from the beginning. The stage was cleared and `finished_at` was reset to allow a fresh retry attempt.

### Example 4: Bot-Level Job (No Document)
```json
{
  "id": "j4b5c6d7-e8f9-0123-cdef-234567890123",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "bot_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "document_id": null,
  "job_type": "delete_document_vectors_reindex_bot",
  "status": "processing",
  "stage": "index",
  "attempts": 0,
  "max_attempts": 5,
  "logs": [
    {"timestamp": "2024-01-15T12:00:00Z", "level": "info", "message": "Job started"},
    {"timestamp": "2024-01-15T12:01:00Z", "level": "info", "message": "Deleted all document vectors for bot"},
    {"timestamp": "2024-01-15T12:02:00Z", "level": "info", "message": "Reindexing all documents for bot..."}
  ],
  "created_at": "2024-01-15T12:00:00Z",
  "updated_at": "2024-01-15T12:02:00Z",
  "started_at": "2024-01-15T12:00:00Z",
  "finished_at": null
}
```
**Computed Properties:**
- `is_completed`: `False` (status is 'processing')
- `is_active`: `True` (status is 'processing')
- `can_retry`: `False` (job hasn't failed)
- `duration_seconds`: `120.0` (2 minutes elapsed)

---

## 🔍 Common Query Patterns

### Get active jobs for a bot:
```sql
SELECT * FROM ingestion_jobs 
WHERE bot_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  AND status IN ('queued', 'processing')
ORDER BY created_at ASC;
```

### Get failed jobs that can be retried:
```sql
SELECT * FROM ingestion_jobs 
WHERE status = 'failed'
  AND attempts < max_attempts
ORDER BY created_at ASC;
```

### Get jobs by stage:
```sql
SELECT * FROM ingestion_jobs 
WHERE bot_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  AND stage = 'embed'
ORDER BY created_at DESC;
```

### Get job statistics for a bot:
```sql
SELECT 
    status,
    COUNT(*) as count,
    AVG(EXTRACT(EPOCH FROM (finished_at - started_at))) as avg_duration_seconds
FROM ingestion_jobs
WHERE bot_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  AND finished_at IS NOT NULL
GROUP BY status;
```

### Get recent jobs with details:
```sql
SELECT 
    ij.id,
    ij.job_type,
    ij.status,
    ij.stage,
    ij.attempts,
    b.name as bot_name,
    d.filename as document_name,
    ij.created_at,
    ij.finished_at,
    EXTRACT(EPOCH FROM (ij.finished_at - ij.started_at)) as duration_seconds
FROM ingestion_jobs ij
JOIN bots b ON ij.bot_id = b.id
LEFT JOIN documents d ON ij.document_id = d.id
WHERE ij.user_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY ij.created_at DESC
LIMIT 20;
```

### Update job status and stage:
```sql
UPDATE ingestion_jobs 
SET status = 'processing',
    stage = 'embed',
    started_at = CURRENT_TIMESTAMP,
    updated_at = CURRENT_TIMESTAMP
WHERE id = 'j1b2c3d4-e5f6-7890-abcd-ef1234567890';
```

### Add log entry to job:
```sql
UPDATE ingestion_jobs 
SET logs = COALESCE(logs, '[]'::jsonb) || 
    jsonb_build_array(
        jsonb_build_object(
            'timestamp', CURRENT_TIMESTAMP,
            'level', 'info',
            'message', 'Processing completed'
        )
    ),
    updated_at = CURRENT_TIMESTAMP
WHERE id = 'j1b2c3d4-e5f6-7890-abcd-ef1234567890';
```

### Mark job as succeeded:
```sql
UPDATE ingestion_jobs 
SET status = 'succeeded',
    stage = 'index',
    finished_at = CURRENT_TIMESTAMP,
    updated_at = CURRENT_TIMESTAMP
WHERE id = 'j1b2c3d4-e5f6-7890-abcd-ef1234567890';
```

### Increment attempts and mark as failed:
```sql
UPDATE ingestion_jobs 
SET status = 'failed',
    attempts = attempts + 1,
    finished_at = CURRENT_TIMESTAMP,
    updated_at = CURRENT_TIMESTAMP
WHERE id = 'j1b2c3d4-e5f6-7890-abcd-ef1234567890';
```

---

## 🔗 Relationships

- **Many-to-One with User**: Multiple jobs belong to one user
- **Many-to-One with Bot**: Multiple jobs belong to one bot
- **Many-to-One with Document**: Multiple jobs can process one document (nullable for bot-level jobs)
- **Cascade Delete**: 
  - Deleting a user deletes all their jobs
  - Deleting a bot deletes all its jobs
  - Deleting a document deletes all its jobs

---

## 🎯 Use Cases

1. **Document Upload Processing**: Track ingestion of uploaded files through RAG pipeline
2. **URL Crawling**: Track ingestion of crawled URLs and web pages
3. **Document Reindexing**: Track reindexing of existing documents
4. **Bot-Level Operations**: Track bot-wide operations like deleting all vectors and reindexing
5. **Job Monitoring**: Monitor job progress and status in real-time
6. **Error Handling**: Track failed jobs and implement retry logic
7. **Performance Analytics**: Analyze job durations and identify bottlenecks
8. **Audit Trail**: Maintain complete history of all ingestion operations

---

## 🔐 Security & Access Control

- **User Ownership**: Always filter by `user_id` to ensure users can only see their own jobs
- **Bot Ownership**: Verify bot ownership before allowing job operations
- **Cascade Delete**: Deleting a user/bot/document automatically removes all related jobs
- **Job Isolation**: Jobs are scoped to specific users and bots for multi-tenant isolation

---

## 💡 Best Practices

1. **Use Computed Properties**: Use `is_completed`, `is_active`, `can_retry`, and `duration_seconds` properties in code for readability
2. **Atomic Updates**: Use database transactions when updating job status to prevent race conditions
3. **Logging**: Always log important events to the `logs` JSONB field for debugging, including stage information for errors
4. **Retry Logic**: The async worker automatically handles retries - failed jobs with `attempts < max_attempts` are automatically re-queued
5. **Status Management**: Always update `status`, `stage`, `started_at`, and `finished_at` appropriately
6. **Query Optimization**: Use indexes on `user_id`, `bot_id`, `status`, and `stage` for efficient queries
7. **Cleanup**: Periodically archive or delete old completed jobs to maintain performance
8. **Worker Process**: Run the ingestion worker as a separate process using `python run_worker.py` to process queued jobs
9. **Concurrent Workers**: Multiple worker processes can run simultaneously - they use `FOR UPDATE SKIP LOCKED` to safely claim jobs
10. **URL Jobs**: URL and integration jobs are currently ignored by the worker and remain in `queued` status until URL processing is implemented

---

## 📊 Indexes

- **Primary Key**: `id` (UUID) - automatic index
- **Foreign Key Indexes**: `user_id`, `bot_id`, `document_id` - automatic indexes from `index=True`
- **Column Indexes**: `job_type`, `status`, `stage`, `created_at` - automatic indexes from `index=True`
- **Composite Indexes**: 
  - `idx_ingestion_jobs_user_bot` - `(user_id, bot_id)` for querying user's jobs for a specific bot
  - `idx_ingestion_jobs_user_bot_status` - `(user_id, bot_id, status)` for filtering by status
  - `idx_ingestion_jobs_status` - `status` for status filtering
  - `idx_ingestion_jobs_stage` - `stage` for stage filtering
  - `idx_ingestion_jobs_document` - `document_id` for document-specific queries
  - `idx_ingestion_jobs_created` - `created_at` for time-based queries

---

## 🔄 Job Lifecycle

1. **Creation**: Job created with `status = 'queued'`, `attempts = 0`
2. **Queued**: Job is waiting to be processed by the async worker
3. **Claiming**: Worker claims job using `FOR UPDATE SKIP LOCKED` (prevents multiple workers from picking the same job)
4. **Processing**: Job status updated to `processing`, `started_at` set, `stage` updated as job progresses through pipeline stages
5. **Completion**: Job status updated to `succeeded` or `failed`, `finished_at` set
6. **Retry**: If failed and `attempts < max_attempts`, job is automatically re-queued (status set back to `queued`, stage cleared, attempts incremented)
7. **Permanent Failure**: If failed and `attempts >= max_attempts`, job marked as permanently `failed`, document status set to `error`
8. **Cancellation**: Job status updated to `cancelled`, `finished_at` set

### Async Worker Processing

The ingestion worker (`run_worker.py`) runs as a separate process and:
- Continuously polls the `ingestion_jobs` table for queued jobs
- Only processes file uploads (URL and integration jobs are ignored and remain in `queued` status)
- Uses `FOR UPDATE SKIP LOCKED` to safely claim jobs (supports multiple concurrent workers)
- Processes jobs through stages: `download` → `parse` → `store`
- Extracts text from documents (PDF, DOCX, TXT) and stores it in MinIO
- Updates document metadata with extraction details (`extracted_text_key`, `parser`, `page_count`, `char_count`, `checksum`)
- Implements automatic retry logic for failed jobs
- Logs all errors with stage information for debugging

**To start the worker:**
```bash
cd backend
python run_worker.py
```

The worker runs continuously until stopped (Ctrl+C) and polls every 2 seconds by default.

---

## ⚠️ Important Notes

- **Computed Properties**: `is_completed`, `is_active`, `can_retry`, and `duration_seconds` are Python `@property` methods, NOT database columns
- **Single Source of Truth**: Always use `status`, `attempts`, `max_attempts`, `started_at`, and `finished_at` columns for database queries
- **Nullable Document ID**: `document_id` is NULL for bot-level jobs (e.g., `delete_document_vectors_reindex_bot`)
- **Stage Tracking**: `stage` is NULL when job is queued or not yet started
- **Logging**: `logs` is a JSONB array of log entries with timestamp, level, and message
- **Atomic Updates**: Use database transactions when updating job status to prevent race conditions

---

## 🔄 Relationship with Other Tables

### `documents` Table
- **Purpose**: Stores document metadata and references
- **Relationship**: `ingestion_jobs` links to `documents` via `document_id` (nullable)
- **Usage**: Document-specific jobs reference the document being processed

### `bots` Table
- **Purpose**: Stores bot configurations
- **Relationship**: `ingestion_jobs` links to `bots` via `bot_id`
- **Usage**: All jobs are scoped to a specific bot

### `users` Table
- **Purpose**: Stores user/tenant accounts
- **Relationship**: `ingestion_jobs` links to `users` via `user_id`
- **Usage**: All jobs are scoped to a specific user/tenant for multi-tenant isolation

