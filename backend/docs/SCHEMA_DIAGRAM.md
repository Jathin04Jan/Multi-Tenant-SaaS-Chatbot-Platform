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
        uuid user_id FK
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
        uuid user_id FK
        uuid bot_id FK
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
        uuid tenant_id FK
        uuid bot_id FK
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

    subscriptions {
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
        uuid plan_id FK
        varchar country_code
        varchar currency
        varchar billing_interval
        integer price
        boolean is_active
        timestamptz created_at
        timestamptz updated_at
    }

    entitlements {
        uuid id PK
        uuid subscription_id FK
        enum category
        varchar entitlement
        varchar unit
        integer quota
        timestamptz created_at
        timestamptz updated_at
    }

    user_subscriptions {
        uuid id PK
        uuid user_id FK
        uuid subscription_id FK
        enum status
        date start_date
        date end_date
        boolean auto_renew
        timestamptz created_at
        timestamptz updated_at
    }

    user_subscription_entitlements {
        uuid id PK
        uuid user_id FK
        uuid subscription_id FK
        enum category
        varchar entitlement
        varchar unit
        integer quota
        integer consumption
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
- **Global tables (admin-only):** `subscriptions`, `pricing_plan_country_prices`, `entitlements`, `app_settings`.
- **Tenant data:** `users` (tenants), `bots`, `documents`, `installation_snippets`, `user_subscriptions`, `user_subscription_entitlements`.
- **Cascade deletes:** FKs are configured with `ON DELETE CASCADE` in the models for dependent rows.
- **Enums:** 
  - `user_status` - used by `users.status` (active, pending_verification, suspended)
  - `bot_status` - used by `bots.status` (draft, active, paused, archived)
  - `document_source_type` - used by `documents.source_type` (file, url, integration)
  - `document_status` - used by `documents.status` (pending, processing, indexed, error)
  - `entitlement_category` - used by `entitlements.category` (file, chat, other)
  - `user_subscription_status` - used by `user_subscriptions.status` (active, expired, cancelled)
- **Computed Properties**: Some models provide computed properties (not database columns):
  - `User.is_verified` - computed from `users.status` (returns `True` if status == 'active')
  - `Bot.is_active` - computed from `bots.status` (returns `True` if status == 'active')
  - `InstallationSnippet.is_active` - computed from `installation_snippets.status` (returns `True` if status == 'active')
  - `UserSubscription.is_active` - computed from `user_subscriptions.status` (returns `True` if status == 'active')
  - `UserSubscription.is_expired` - computed from `user_subscriptions.end_date` (returns `True` if end_date < today())
  - `UserSubscriptionEntitlement.balance` - computed from `user_subscription_entitlements.quota - consumption`
  - `UserSubscriptionEntitlement.is_exceeded` - computed from `user_subscription_entitlements.consumption > quota`
  - `UserSubscriptionEntitlement.usage_percentage` - computed from `user_subscription_entitlements.consumption / quota * 100`
- For full column details and SQL, see `FINAL_SCHEMA.md` and `DATABASE_SCHEMA.md`.

