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

    pricing_plans ||--o{ pricing_plan_country_prices : plan_id

    users {
        uuid id PK
        varchar email
        varchar full_name
        varchar company_name
        varchar domain
        enum status
        varchar plan
        jsonb settings
        timestamptz created_at
        timestamptz updated_at
    }

    bots {
        uuid id PK
        uuid user_id
        varchar name
        text description
        enum status
        jsonb llm_config
        jsonb retrieval_config
        jsonb guardrails
        jsonb branding
        timestamptz created_at
        timestamptz updated_at
    }

    installation_snippets {
        uuid id PK
        uuid user_id
        uuid bot_id
        text script_url
        text embed_code
        varchar status
        jsonb domain_whitelist
        integer usage_count
        timestamptz last_used_at
        timestamptz created_at
        timestamptz updated_at
        timestamptz expires_at
    }

    documents {
        uuid id PK
        uuid tenant_id
        uuid bot_id
        enum source_type
        varchar source_url
        varchar filename
        varchar content_type
        integer size
        enum status
        jsonb metadata
        timestamptz created_at
        timestamptz updated_at
    }

    pricing_plans {
        uuid id PK
        text name
        text description
        boolean is_highlighted
        jsonb sort_order
        jsonb limits
        varchar support_level
        jsonb features
        timestamptz created_at
        timestamptz updated_at
    }

    pricing_plan_country_prices {
        uuid id PK
        uuid plan_id
        varchar country_code
        varchar currency
        varchar billing_interval
        integer price
        boolean is_active
        timestamptz created_at
        timestamptz updated_at
    }

    app_settings {
        varchar key PK
        jsonb value
        text description
        boolean is_public
        timestamptz created_at
        timestamptz updated_at
    }
```

## Notes
- **Global tables (admin-only):** `pricing_plans`, `pricing_plan_country_prices`, `app_settings`.
- **Tenant data:** `users` (tenants), `bots`, `documents`, `installation_snippets`.
- **Cascade deletes:** FKs are configured with `ON DELETE CASCADE` in the models for dependent rows.
- **Status enums:** `users.status`, `bots.status`, `documents.status` use enums as defined in the models.
- For full column details and SQL, see `FINAL_SCHEMA.md` and `DATABASE_SCHEMA.md`.

git 