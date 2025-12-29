# Database Schema Diagram

[← Docs Index](./README.md) · [Full Schema](./FINAL_SCHEMA.md)

## ER Diagram (Mermaid)

```mermaid
erDiagram
    users ||--o{ bots : user_id
    users ||--o{ installation_snippets : user_id
    users ||--o{ documents : tenant_id

    bots ||--o{ installation_snippets : bot_id
    bots ||--o{ documents : bot_id

    subscriptions ||--o{ pricing_plan_country_prices : plan_id
    subscriptions ||--o{ entitlements : subscription_id
    subscriptions ||--o{ user_subscriptions : subscription_id
    subscriptions ||--o{ user_subscription_entitlements : subscription_id
    
    users ||--o{ user_subscriptions : user_id
    users ||--o{ user_subscription_entitlements : user_id
    users ||--o{ ingestion_jobs : user_id

    bots ||--o{ ingestion_jobs : bot_id
    documents ||--o{ ingestion_jobs : document_id

    users {
        uuid id PK
        varchar email UNIQUE
        varchar hashed_password
        varchar full_name NOT_NULL
        varchar company_name NOT_NULL
        varchar domain NULLABLE
        enum status "active|pending_verification|suspended" DEFAULT_pending_verification
        jsonb settings NULLABLE
        timestamptz created_at
        timestamptz updated_at
    }

    bots {
        uuid id PK
        uuid user_id FK
        varchar name NOT_NULL
        text description NULLABLE
        enum status "draft|active|paused|archived" DEFAULT_draft
        jsonb llm_config NULLABLE
        jsonb retrieval_config NULLABLE
        jsonb guardrails NULLABLE
        jsonb branding NULLABLE
        timestamptz created_at INDEXED
        timestamptz updated_at
    }

    installation_snippets {
        uuid id PK
        uuid user_id FK
        uuid bot_id FK
        text script_url NULLABLE
        text embed_code NOT_NULL
        varchar status "active|revoked" DEFAULT_active INDEXED
        jsonb domain_whitelist NULLABLE
        integer usage_count DEFAULT_0
        timestamptz last_used_at NULLABLE
        timestamptz created_at INDEXED
        timestamptz updated_at
        timestamptz expires_at NULLABLE
    }

    documents {
        uuid id PK
        uuid tenant_id FK INDEXED
        uuid bot_id FK INDEXED
        enum source_type "file|url|integration" DEFAULT_file INDEXED
        varchar source_url NULLABLE
        varchar filename NULLABLE
        varchar content_type NULLABLE
        integer size NULLABLE
        enum status "pending|processing|indexed|error" DEFAULT_pending INDEXED
        jsonb metadata NULLABLE
        timestamptz created_at
        timestamptz updated_at
    }

    subscriptions {
        uuid id PK INDEXED
        text name NOT_NULL
        text description NULLABLE
        boolean is_highlighted DEFAULT_false INDEXED
        jsonb sort_order NULLABLE
        varchar support_level NULLABLE
        jsonb features NULLABLE
        timestamptz created_at
        timestamptz updated_at
    }

    pricing_plan_country_prices {
        uuid id PK INDEXED
        uuid plan_id FK INDEXED
        varchar country_code NOT_NULL INDEXED
        varchar currency NOT_NULL
        varchar billing_interval "monthly|yearly" NOT_NULL
        integer price NOT_NULL
        boolean is_active DEFAULT_true
        timestamptz created_at
        timestamptz updated_at
    }

    entitlements {
        uuid id PK INDEXED
        uuid subscription_id FK INDEXED
        enum category "file|chat|other" NOT_NULL INDEXED
        varchar entitlement NOT_NULL
        varchar unit NOT_NULL
        integer quota NOT_NULL
        timestamptz created_at
        timestamptz updated_at
    }

    user_subscriptions {
        uuid id PK INDEXED
        uuid user_id FK INDEXED
        uuid subscription_id FK INDEXED
        enum status "active|expired|cancelled" DEFAULT_active INDEXED
        date start_date NOT_NULL INDEXED
        date end_date NULLABLE INDEXED
        boolean auto_renew DEFAULT_true
        timestamptz created_at
        timestamptz updated_at
    }

    user_subscription_entitlements {
        uuid id PK INDEXED
        uuid user_id FK INDEXED
        uuid subscription_id FK INDEXED
        enum category "file|chat|other" NOT_NULL INDEXED
        varchar entitlement NOT_NULL
        varchar unit NOT_NULL
        integer quota DEFAULT_0
        integer consumption DEFAULT_0
        timestamptz created_at
        timestamptz updated_at
    }

    ingestion_jobs {
        uuid id PK INDEXED
        uuid user_id FK INDEXED
        uuid bot_id FK INDEXED
        uuid document_id FK NULLABLE INDEXED
        enum job_type "ingest_upload|ingest_url|reindex_document|delete_document_vectors_reindex_bot" NOT_NULL INDEXED
        enum status "queued|processing|succeeded|failed|cancelled" DEFAULT_queued INDEXED
        enum stage "download|parse|chunk|embed|index" NULLABLE INDEXED
        integer attempts DEFAULT_0
        integer max_attempts DEFAULT_5
        jsonb logs NULLABLE
        timestamptz created_at INDEXED
        timestamptz updated_at
        timestamptz started_at NULLABLE
        timestamptz finished_at NULLABLE
    }

    app_settings {
        varchar key PK INDEXED
        jsonb value NOT_NULL
        text description NULLABLE
        boolean is_public DEFAULT_false INDEXED
        timestamptz created_at
        timestamptz updated_at
    }
```

## Legend

- **PK** = Primary Key
- **FK** = Foreign Key (with CASCADE DELETE)
- **INDEXED** = Column has an index
- **UNIQUE** = Column has a unique constraint
- **NOT_NULL** = Column is required (NOT NULL)
- **NULLABLE** = Column can be NULL
- **DEFAULT_x** = Default value for the column
- **Enum values** are shown inline as `"option1|option2|option3"`

## Notes
- **Global tables (admin-only):** `subscriptions`, `pricing_plan_country_prices`, `entitlements`, `app_settings`.
- **Tenant data:** `users` (tenants), `bots`, `documents`, `installation_snippets`, `user_subscriptions`, `user_subscription_entitlements`, `ingestion_jobs`.
- **Cascade deletes:** All foreign keys are configured with `ON DELETE CASCADE` in the models for dependent rows.
- **Enum Details:**
  - `users.status`: **active** (verified, can log in), **pending_verification** (default, cannot log in), **suspended** (cannot log in)
  - `bots.status`: **draft** (default, being configured), **active** (live), **paused** (temporarily disabled), **archived** (deactivated)
  - `documents.source_type`: **file** (uploaded file, default), **url** (crawled URL), **integration** (3rd-party integration)
  - `documents.status`: **pending** (default), **processing** (being indexed), **indexed** (ready), **error** (failed)
  - `entitlements.category`: **file** (file-related entitlements), **chat** (chat/token entitlements), **other** (miscellaneous)
  - `user_subscriptions.status`: **active** (default), **expired** (end_date passed), **cancelled** (manually cancelled)
  - `ingestion_jobs.job_type`: **ingest_upload** (process uploaded file), **ingest_url** (crawl and process URL), **reindex_document** (re-index existing document), **delete_document_vectors_reindex_bot** (delete vectors and re-index entire bot)
  - `ingestion_jobs.status`: **queued** (default), **processing** (in progress), **succeeded** (completed), **failed** (error occurred), **cancelled** (manually cancelled)
  - `ingestion_jobs.stage`: **download** (downloading content), **parse** (parsing document), **chunk** (chunking text), **embed** (generating embeddings), **index** (indexing vectors)
- **Computed Properties**: Some models provide computed properties (not database columns):
  - `User.is_verified` - computed from `users.status` (returns `True` if status == 'active')
  - `Bot.is_active` - computed from `bots.status` (returns `True` if status == 'active')
  - `InstallationSnippet.is_active` - computed from `installation_snippets.status` (returns `True` if status == 'active')
  - `UserSubscription.is_active` - computed from `user_subscriptions.status` (returns `True` if status == 'active')
  - `UserSubscription.is_expired` - computed from `user_subscriptions.end_date` (returns `True` if end_date < today())
  - `UserSubscriptionEntitlement.balance` - computed from `user_subscription_entitlements.quota - consumption`
  - `UserSubscriptionEntitlement.is_exceeded` - computed from `user_subscription_entitlements.consumption > quota`
  - `UserSubscriptionEntitlement.usage_percentage` - computed from `user_subscription_entitlements.consumption / quota * 100`
  - `IngestionJob.is_completed` - computed from `ingestion_jobs.status` (returns `True` if status is succeeded, failed, or cancelled)
  - `IngestionJob.is_active` - computed from `ingestion_jobs.status` (returns `True` if status is queued or processing)
  - `IngestionJob.can_retry` - computed from `ingestion_jobs.status`, `attempts`, and `max_attempts` (returns `True` if failed and attempts < max_attempts)
  - `IngestionJob.duration_seconds` - computed from `ingestion_jobs.started_at` and `finished_at` (returns duration in seconds)
- For full column details and SQL, see `FINAL_SCHEMA.md` and `DATABASE_SCHEMA.md`.

