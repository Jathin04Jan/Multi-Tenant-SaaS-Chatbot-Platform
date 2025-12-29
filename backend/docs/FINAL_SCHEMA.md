# Complete Database Schema

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md) · [Schema Diagram](./SCHEMA_DIAGRAM.md)

This document provides the complete database schema for the Multi-Tenant SaaS Chatbot Platform.

## 📊 Tables Overview

1. **`users`** - User/Tenant accounts (users = tenants)
2. **`bots`** - Bot/Agent configurations
3. **`documents`** - Uploaded knowledge sources stored in MinIO
4. **`installation_snippets`** - Embed codes and installation scripts
5. **`subscriptions`** - Global subscription plans (Free, Pro, Enterprise, etc.) - **Admin-only**
6. **`pricing_plan_country_prices`** - Country/region-specific pricing for each plan - **Admin-only**
7. **`entitlements`** - Subscription plan entitlements/limits (file storage, chat tokens, etc.) - **Admin-only**
8. **`user_subscriptions`** - User subscription instances (tracks when users subscribe to plans)
9. **`user_subscription_entitlements`** - Per-user entitlement usage and consumption tracking
10. **`ingestion_jobs`** - RAG pipeline jobs for document processing
11. **`app_settings`** - Global application settings and landing page content - **Admin-only**

---

## 📊 `users` Table

**Note**: In this system, users are tenants. Each user account represents both a user and a tenant/organization.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique user/tenant identifier |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL, INDEXED | User email address (unique) |
| `hashed_password` | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| `full_name` | VARCHAR(255) | **NOT NULL** | User's full name (required) |
| `company_name` | VARCHAR(255) | **NOT NULL** | Organization/Company name (required) |
| `domain` | VARCHAR(255) | NULLABLE | Tenant domain (optional) |
| `status` | ENUM | NOT NULL, DEFAULT 'pending_verification' | User status: active, pending_verification, suspended |
| `settings` | JSONB | NULLABLE | Miscellaneous configuration (limits, billing IDs, etc.) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

### Status Enum Values
- **`active`** - User/tenant account is active and verified (can log in)
- **`pending_verification`** - Account created but email not verified (default, cannot log in)
- **`suspended`** - Account suspended (cannot log in)

**Note:** `is_verified` is a computed property (not a database column) derived from `status`:
- `status == 'active'` → `is_verified = true`
- `status == 'pending_verification'` → `is_verified = false`
- `status == 'suspended'` → `is_verified = false`

### Indexes
- **Primary Key**: `id` (UUID)
- **Unique Index**: `email`
- **Index**: `id`

---

## 📝 SQL CREATE Statement

```sql
-- Create enum type for user status
CREATE TYPE user_status AS ENUM ('active', 'pending_verification', 'suspended');

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    status user_status NOT NULL DEFAULT 'pending_verification',
    settings JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_id ON users(id);
```

---

## 💾 Example Records

### User Example
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john.doe@acme.com",
  "hashed_password": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5r1Q8K4x5Y5Xq",
  "full_name": "John Doe",
  "company_name": "Acme Corporation",
  "domain": "acme.com",
  "status": "active",
  "is_verified": true,  // Computed from status (status == 'active')
  "settings": {
    "max_users": 100,
    "max_bots": 50,
    "billing_id": "cus_abc123",
    "features": ["advanced_analytics", "custom_branding"]
  },
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Bot Example
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Support Assistant",
  "description": "A friendly customer support bot",
  "status": "active",
  "is_active": true,  // Computed from status (status == 'active')
  "llm_config": {
    "temperature": 0.7,
    "communication_style": "friendly",
    "style_prompt": "You are a friendly assistant..."
  },
  "guardrails": {
    "max_response_length": 500,
    "block_explicit_content": true,
    "block_political_views": true
  },
  "branding": {
    "primary_color": "#6366f1",
    "welcome_message": "Hello! How can I help?",
    "assistant_name": "Support Assistant",
    "position": "bottom-right",
    "height": 600,
    "width": 400
  },
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Installation Snippet Example
```json
{
  "id": "s1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "bot_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "active",
  "is_active": true,  // Computed from status (status == 'active')
  "domain_whitelist": null,
  "usage_count": 1250,
  "last_used_at": "2024-01-15T10:30:00Z",
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "expires_at": null
}
```

### Pricing Plan Example
```json
{
  "id": "p1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Pro",
  "description": "Perfect for growing businesses",
  "is_highlighted": true,
  "sort_order": {
    "position": 2,
    "category": "standard"
  },
  "support_level": "email",
  "features": [
    "Unlimited chats",
    "Priority support",
    "Custom branding",
    "Advanced analytics"
  ],
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Pricing Plan Country Price Example
```json
{
  "id": "c1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "plan_id": "p1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "country_code": "US-CENTRAL",
  "currency": "USD",
  "billing_interval": "monthly",
  "price": 2999,
  "is_active": true,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```
**Note**: `price: 2999` represents $29.99 (stored in cents).

### App Setting Example
```json
{
  "key": "landing.hero_title",
  "value": "Build AI-Powered Chatbots in Minutes",
  "description": "Main hero section title on landing page",
  "is_public": true,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### User Subscription Example
```json
{
  "id": "u1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "subscription_id": "p1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "active",
  "start_date": "2024-01-01",
  "end_date": "2024-12-31",
  "auto_renew": true,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```
**Note**: This shows a user's active subscription to the Pro plan, starting Jan 1, 2024 and ending Dec 31, 2024, with auto-renewal enabled.

**Computed Properties Available in Code (Not in Database):**
- `is_active`: Returns `True` if `status == 'active'` (computed from `status` column)
- `is_expired`: Returns `True` if `end_date < today()` (computed from `end_date` column)

### User Subscription Entitlement Example
```json
{
  "id": "e1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "subscription_id": "p1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "category": "file",
  "entitlement": "storage",
  "unit": "MB",
  "quota": 10000,
  "consumption": 3500,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```
**Note**: This shows a user's file storage entitlement with 10,000 MB quota and 3,500 MB consumed (6,500 MB remaining).

**Computed Properties Available in Code (Not in Database):**
- `balance`: Returns `6500` (quota - consumption = 10000 - 3500)
- `is_exceeded`: Returns `False` (consumption <= quota)
- `usage_percentage`: Returns `35.0` (3500 / 10000 * 100)

### Ingestion Job Example
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
    {"timestamp": "2024-01-15T10:01:00Z", "level": "info", "message": "Document downloaded"},
    {"timestamp": "2024-01-15T10:02:00Z", "level": "info", "message": "Document parsed into 150 chunks"},
    {"timestamp": "2024-01-15T10:03:00Z", "level": "info", "message": "Generating embeddings..."}
  ],
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:03:00Z",
  "started_at": "2024-01-15T10:00:00Z",
  "finished_at": null
}
```
**Note**: This shows an active ingestion job processing an uploaded document. The job is currently in the "embed" stage, generating embeddings for document chunks.

**Computed Properties Available in Code (Not in Database):**
- `is_completed`: Returns `False` (status is 'processing', not completed)
- `is_active`: Returns `True` (status is 'processing')
- `can_retry`: Returns `False` (job hasn't failed yet)
- `duration_seconds`: Returns `180.0` (3 minutes elapsed since started_at)

---

## 🔐 Security Notes

- **Password**: Never stored in plain text, always hashed with bcrypt
- **Email**: Unique constraint prevents duplicate accounts
- **Status**: Controls account access (active, pending, suspended)
- **Settings**: JSONB allows flexible configuration storage
- **Global Configuration**: `subscriptions`, `pricing_plan_country_prices`, and `app_settings` are admin-only (only platform admins can create/modify)
- **Public Settings**: Only `app_settings` with `is_public = true` can be exposed via public API

---

## 🎯 Key Points

1. **Single Table**: Users and tenants are the same entity
2. **Clear Naming**: `full_name` (person) vs `company_name` (organization)
3. **Status Control**: Enum-based status for account management
4. **Flexible Settings**: JSONB for miscellaneous configuration
5. **Multi-tenant Ready**: Each user is their own tenant
6. **Global Configuration**: `subscriptions`, `pricing_plan_country_prices`, and `app_settings` are global (admin-only) tables for platform-wide configuration
7. **Country-Based Pricing**: Supports different prices for different regions/countries via `pricing_plan_country_prices`
8. **Public/Private Settings**: `app_settings.is_public` flag controls which settings can be exposed via public API

---

## 📊 `bots` Table

Stores all chatbot/bot configurations and settings for each user/tenant.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique bot identifier |
| `user_id` | UUID | FOREIGN KEY → users.id, NOT NULL, INDEXED, CASCADE DELETE | Owner/creator of the bot |
| `name` | VARCHAR(255) | NOT NULL | Bot name |
| `description` | TEXT | NULLABLE | Bot persona summary/description |
| `status` | ENUM | NOT NULL, DEFAULT 'draft', INDEXED | Bot status: draft, active, paused, archived |
| `llm_config` | JSONB | NULLABLE | LLM configuration (model, temperature, style, etc.) |
| `retrieval_config` | JSONB | NULLABLE | RAG/Retrieval configuration (Vector DB, filters, chunking, etc.) |
| `guardrails` | JSONB | NULLABLE | Content guardrails (moderation, blocked phrases, filters) |
| `branding` | JSONB | NULLABLE | Branding and UI configuration (logo, colors, welcome message, assistant name, widget sizing, positioning) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

### Status Enum Values
- **`draft`** - Bot is being created/configured (default)
- **`active`** - Bot is live and operational
- **`paused`** - Bot is temporarily disabled
- **`archived`** - Bot is deactivated/removed

**Note:** `is_active` is a computed property (not a database column) derived from `status`:
- `status == 'active'` → `is_active = true`
- `status == 'draft'/'paused'/'archived'` → `is_active = false`

### Indexes
- **Primary Key**: `id` (UUID)
- **Foreign Key Index**: `user_id`
- **Status Index**: `status`
- **Created At Index**: `created_at`

### JSONB Field Structures

#### `branding` Structure (stores all UI configuration):
```json
{
  "logo_url": "https://example.com/logo.png",
  "avatar_url": "https://example.com/avatar.png",
  "primary_color": "#6366f1",
  "background_color": "#ffffff",
  "welcome_message": "Hello! How can I help?",
  "intro_message": "Hello! How can I help you today?",
  "assistant_name": "Assistant",
  "chat_title": "Assistant",
  "position": "bottom-right",
  "height": 600,
  "width": 400
}
```

> All UI configuration is stored directly in the `branding` JSONB field for simplicity and efficiency.

---

## 📊 `documents` Table

Tracks knowledge sources uploaded or linked by tenants. Files live in MinIO (or remote systems); the database stores metadata, ingest status, and the generated storage key.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique document identifier |
| `tenant_id` | UUID | FOREIGN KEY → users.id, NOT NULL, INDEXED, CASCADE DELETE | Owner/tenant reference |
| `bot_id` | UUID | FOREIGN KEY → bots.id, NOT NULL, INDEXED, CASCADE DELETE | Associated bot |
| `source_type` | ENUM('file','url','integration') | NOT NULL, DEFAULT 'file' | Where the knowledge came from (file upload vs. crawled URL vs. integration) |
| `source_url` | VARCHAR(512) | NULLABLE | Generated MinIO key for uploads or remote URL for crawls/integrations |
| `filename` | VARCHAR(255) | NULLABLE | Original filename (null for URL/integration sources) |
| `content_type` | VARCHAR(128) | NULLABLE | MIME type |
| `size` | INTEGER | NULLABLE | File size (bytes). Only populated for uploads; URLs usually have `NULL`. |
| `status` | ENUM('pending','processing','indexed','error') | NOT NULL, DEFAULT 'pending' | Ingestion/indexing pipeline state. Crawled URLs remain `processing` until the crawler ingests them. |
| `metadata` | JSONB | NULLABLE | Extra payload (checksums, crawl info, etc.) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Upload timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last mutation timestamp |

### Notes
- The backend generates a storage path `{tenant_id}/{bot_id}/{document_id}/{filename}` and saves it in `source_url`. Clients never provide this value.
- File uploads are validated server-side: only PDF/DOC/DOCX/TXT are accepted and max size is 1 GB. URLs are stored as metadata only (no MinIO object) and can be managed just like files.
- Every query must include `tenant_id = current_user.id` to maintain isolation.

## 📊 `installation_snippets` Table

Stores embed codes and script URLs for installing bots on customer websites. Each snippet is tied to a specific bot and user/tenant.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique snippet identifier |
| `user_id` | UUID | FOREIGN KEY → users.id, NOT NULL, INDEXED, CASCADE DELETE | Owner/tenant reference |
| `bot_id` | UUID | FOREIGN KEY → bots.id, NOT NULL, INDEXED, CASCADE DELETE | Bot reference - snippet is specific to this bot |
| `script_url` | TEXT | NULLABLE | CDN-hosted script URL (e.g., https://cdn.example.com/bot-script.js) |
| `embed_code` | TEXT | NOT NULL | Full JavaScript snippet for installation |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'active', INDEXED | Snippet status: 'active' | 'revoked' |
| `domain_whitelist` | JSONB | NULLABLE | List of allowed domains (null = no restrictions) |
| `usage_count` | INTEGER | NOT NULL, DEFAULT 0 | Number of times this snippet has been used/accessed |
| `last_used_at` | TIMESTAMP WITH TIME ZONE | NULLABLE | Timestamp when snippet was last accessed/used |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |
| `expires_at` | TIMESTAMP WITH TIME ZONE | NULLABLE | Optional expiry timestamp (null = never expires) |

### Key Design Decisions

1. **Dual Foreign Keys (`user_id` + `bot_id`)**
   - `user_id`: Enables user-level queries (get all snippets for a user)
   - `bot_id`: Links snippet to specific bot (each bot has its own embed code)
   - Both are required for data integrity and query flexibility
   - Both have CASCADE DELETE (deleting user/bot deletes snippets)

### Indexes
- **Primary Key**: `id` (UUID)
- **Foreign Key Indexes**: `user_id`, `bot_id`
- **Status Index**: `status`
- **Created At Index**: `created_at`
- **Composite Index**: `(user_id, bot_id)` for common queries

---

## 📝 Complete SQL CREATE Statements

### Users Table
```sql
-- Create enum type for user status
CREATE TYPE user_status AS ENUM ('active', 'pending_verification', 'suspended');

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    status user_status NOT NULL DEFAULT 'pending_verification',
    settings JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_id ON users(id);
```

### Bots Table
```sql
-- Create enum type for bot status
CREATE TYPE bot_status AS ENUM ('draft', 'active', 'paused', 'archived');

-- Create bots table
CREATE TABLE bots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status bot_status NOT NULL DEFAULT 'draft',
    llm_config JSONB,
    retrieval_config JSONB,
    guardrails JSONB,
    branding JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_bots_user_id ON bots(user_id);
CREATE INDEX idx_bots_id ON bots(id);
CREATE INDEX idx_bots_status ON bots(status);
CREATE INDEX idx_bots_created_at ON bots(created_at);
```

### Installation Snippets Table
```sql
-- Create installation_snippets table
CREATE TABLE installation_snippets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
    script_url TEXT,
    embed_code TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    domain_whitelist JSONB,
    usage_count INTEGER NOT NULL DEFAULT 0,
    last_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes
CREATE INDEX idx_installation_snippets_user_id ON installation_snippets(user_id);
CREATE INDEX idx_installation_snippets_bot_id ON installation_snippets(bot_id);
CREATE INDEX idx_installation_snippets_id ON installation_snippets(id);
CREATE INDEX idx_installation_snippets_status ON installation_snippets(status);
CREATE INDEX idx_installation_snippets_created_at ON installation_snippets(created_at);
CREATE INDEX idx_installation_snippets_user_bot ON installation_snippets(user_id, bot_id);
```

### Documents Table
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

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    is_highlighted BOOLEAN NOT NULL DEFAULT false,
    sort_order JSONB,
    support_level VARCHAR(50),
    features JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscriptions_id ON subscriptions(id);
CREATE INDEX idx_subscriptions_is_highlighted ON subscriptions(is_highlighted);
```

### Pricing Plan Country Prices Table
```sql
CREATE TABLE pricing_plan_country_prices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
    country_code VARCHAR(10) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    billing_interval VARCHAR(20) NOT NULL,
    price INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pricing_plan_country_prices_id ON pricing_plan_country_prices(id);
CREATE INDEX idx_pricing_plan_country_prices_plan_id ON pricing_plan_country_prices(plan_id);
CREATE INDEX idx_pricing_plan_country_prices_country_code ON pricing_plan_country_prices(country_code);
```

### Entitlements Table
```sql
-- Create enum type for entitlement category
CREATE TYPE entitlement_category AS ENUM ('file', 'chat', 'other');

CREATE TABLE entitlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
    category entitlement_category NOT NULL,
    entitlement VARCHAR(100) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    quota INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_entitlements_id ON entitlements(id);
CREATE INDEX idx_entitlements_subscription_id ON entitlements(subscription_id);
CREATE INDEX idx_entitlements_category ON entitlements(category);
```

### User Subscriptions Table
```sql
-- Create enum type for user subscription status
CREATE TYPE user_subscription_status AS ENUM ('active', 'expired', 'cancelled');

CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
    status user_subscription_status NOT NULL DEFAULT 'active',
    start_date DATE NOT NULL,
    end_date DATE,
    auto_renew BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_subscriptions_id ON user_subscriptions(id);
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_subscription_id ON user_subscriptions(subscription_id);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX idx_user_subscriptions_start_date ON user_subscriptions(start_date);
CREATE INDEX idx_user_subscriptions_end_date ON user_subscriptions(end_date);
CREATE INDEX idx_user_subscriptions_user_status ON user_subscriptions(user_id, status);
CREATE INDEX idx_user_subscriptions_dates ON user_subscriptions(start_date, end_date);
```

### User Subscription Entitlements Table
```sql
CREATE TABLE user_subscription_entitlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
    category entitlement_category NOT NULL,
    entitlement VARCHAR(100) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    quota INTEGER NOT NULL DEFAULT 0,
    consumption INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_subscription_entitlements_id ON user_subscription_entitlements(id);
CREATE INDEX idx_user_subscription_entitlements_user_id ON user_subscription_entitlements(user_id);
CREATE INDEX idx_user_subscription_entitlements_subscription_id ON user_subscription_entitlements(subscription_id);
CREATE INDEX idx_user_subscription_entitlements_category ON user_subscription_entitlements(category);
CREATE INDEX idx_user_subscription_entitlements_user_subscription ON user_subscription_entitlements(user_id, subscription_id);
CREATE INDEX idx_user_subscription_entitlements_user_category ON user_subscription_entitlements(user_id, category);
```

### App Settings Table
```sql
CREATE TABLE app_settings (
    key VARCHAR(255) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_app_settings_key ON app_settings(key);
CREATE INDEX idx_app_settings_is_public ON app_settings(is_public);
```

### Ingestion Jobs Table
```sql
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

CREATE INDEX idx_ingestion_jobs_id ON ingestion_jobs(id);
CREATE INDEX idx_ingestion_jobs_user_id ON ingestion_jobs(user_id);
CREATE INDEX idx_ingestion_jobs_bot_id ON ingestion_jobs(bot_id);
CREATE INDEX idx_ingestion_jobs_document_id ON ingestion_jobs(document_id);
CREATE INDEX idx_ingestion_jobs_job_type ON ingestion_jobs(job_type);
CREATE INDEX idx_ingestion_jobs_status ON ingestion_jobs(status);
CREATE INDEX idx_ingestion_jobs_stage ON ingestion_jobs(stage);
CREATE INDEX idx_ingestion_jobs_created_at ON ingestion_jobs(created_at);
CREATE INDEX idx_ingestion_jobs_user_bot ON ingestion_jobs(user_id, bot_id);
```

---

## 📊 `subscriptions` Table

Stores all subscription plans that can be offered to tenants (Free, Pro, Enterprise, etc.). These are **global** plans, not per-tenant. Only platform admins can create or modify entries.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique plan ID |
| `name` | TEXT | NOT NULL | Display name (e.g., 'Free', 'Pro', 'Enterprise') |
| `description` | TEXT | NULLABLE | Short tagline/description |
| `is_highlighted` | BOOLEAN | NOT NULL, DEFAULT false | Mark as "Most Popular" in UI |
| `sort_order` | JSONB | NULLABLE | Ordering configuration for UI display |
| `support_level` | VARCHAR(50) | NULLABLE | Support level (None, email, call, priority, etc.) |
| `features` | JSONB | NULLABLE | List of features (e.g., ["Unlimited chats", "Priority support"]) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

### Notes
- Plans are global, not per-tenant
- Only platform admins can create or modify pricing plans
- Tenants reference plans via the `user_subscriptions` table (links users to subscription plans)
- Backend enforces limits via `entitlements` and `user_subscription_entitlements` tables when tenants use the system

---

## 📊 `pricing_plan_country_prices` Table

Stores pricing per country/region for each plan. Allows different pricing for different markets.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique row ID |
| `plan_id` | UUID | FOREIGN KEY → subscriptions.id, NOT NULL, INDEXED, CASCADE DELETE | Maps price to plan |
| `country_code` | VARCHAR(10) | NOT NULL, INDEXED | Country/region code (e.g., 'IN-SOUTH', 'US-CENTRAL', 'EU-WEST') |
| `currency` | VARCHAR(10) | NOT NULL | Currency code (e.g., 'USD', 'INR', 'EUR') |
| `billing_interval` | VARCHAR(20) | NOT NULL | Billing interval: 'monthly' or 'yearly' |
| `price` | INTEGER | NOT NULL | Price in smallest currency unit (e.g., cents for USD, paise for INR) |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT true | Enable/disable this price |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

### Notes
- Supports different prices for different regions/countries
- Supports both monthly and yearly billing
- Price stored as integer in smallest currency unit (avoids floating-point issues)
- `is_active` allows disabling prices without deleting records

---

## 📊 `entitlements` Table

Stores subscription plan entitlements/limits. Defines what resources and limits each subscription plan provides (e.g., file storage, chat tokens, API calls, etc.). These are **global** entitlements, not per-tenant. Only platform admins can create or modify entries.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique entitlement identifier |
| `subscription_id` | UUID | FOREIGN KEY → subscriptions.id, NOT NULL, INDEXED, CASCADE DELETE | Maps entitlement to subscription plan |
| `category` | ENUM | NOT NULL, INDEXED | Entitlement category: file, chat, or other |
| `entitlement` | VARCHAR(100) | NOT NULL | Entitlement type (e.g., 'storagefile_count', 'tokens', 'api_calls', 'storage_size', etc.) |
| `unit` | VARCHAR(20) | NOT NULL | Unit of measurement (e.g., 'MB', 'count', 'GB', 'hours', etc.) |
| `quota` | INTEGER | NOT NULL | Quota/limit value (e.g., 1000 for 1000 MB, 10000 for 10000 tokens, etc.) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

### Category Enum Values
- **`file`** - File-related entitlements (storage size, file count, etc.)
- **`chat`** - Chat-related entitlements (tokens, messages, conversations, etc.)
- **`other`** - Other entitlements (API calls, integrations, etc.)

### Notes
- One subscription can have multiple entitlements (one-to-many relationship)
- Entitlements are used by the backend to enforce plan limits when tenants use the system
- Flexible design allows adding new entitlement types without schema changes
- Common examples:
  - `category='file'`, `entitlement='storage_size'`, `unit='GB'`, `quota=100` (100 GB storage)
  - `category='file'`, `entitlement='file_count'`, `unit='count'`, `quota=1000` (1000 files)
  - `category='chat'`, `entitlement='tokens'`, `unit='count'`, `quota=100000` (100k tokens/month)
  - `category='chat'`, `entitlement='messages'`, `unit='count'`, `quota=10000` (10k messages/month)

---

## 📊 `user_subscriptions` Table

Tracks user subscription instances - records when users subscribe to subscription plans. This table links users to their active/expired/cancelled subscriptions with start/end dates and auto-renewal settings.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique subscription instance identifier |
| `user_id` | UUID | FOREIGN KEY → users.id, NOT NULL, INDEXED, CASCADE DELETE | Foreign key to users.id - the user who has this subscription |
| `subscription_id` | UUID | FOREIGN KEY → subscriptions.id, NOT NULL, INDEXED, CASCADE DELETE | Foreign key to subscriptions.id - the subscription plan |
| `status` | ENUM | NOT NULL, DEFAULT 'active', INDEXED | Subscription status: active, expired, or cancelled |
| `start_date` | DATE | NOT NULL, INDEXED | Subscription start date |
| `end_date` | DATE | NULLABLE, INDEXED | Subscription end date (null for lifetime subscriptions) |
| `auto_renew` | BOOLEAN | NOT NULL, DEFAULT true | Whether subscription auto-renews at end_date |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

### Status Enum Values
- **`active`** - Subscription is currently active (default)
- **`expired`** - Subscription has expired (end_date has passed)
- **`cancelled`** - Subscription was cancelled before expiration

### Notes
- One user can have multiple subscription records (subscription history)
- One subscription plan can be used by many users
- `end_date` can be NULL for lifetime subscriptions
- `auto_renew` controls whether subscription automatically renews at `end_date`
- Composite indexes on `(user_id, status)` and `(start_date, end_date)` for efficient queries

### Computed Properties (Not Database Columns)
The model provides two computed properties for convenience:

1. **`is_active`** - Returns `True` if `status == 'active'`
   ```python
   # Usage in code:
   if user_subscription.is_active:
       # Subscription is active
   ```
   - **Not stored in database** - computed from `status` column
   - Single source of truth: `status` column

2. **`is_expired`** - Returns `True` if `end_date < today()` (and `end_date` is not NULL)
   ```python
   # Usage in code:
   if user_subscription.is_expired:
       # Subscription has expired
   ```
   - **Not stored in database** - computed from `end_date` column
   - Returns `False` for lifetime subscriptions (`end_date` is NULL)

**Important:** These are Python `@property` methods, not database columns. They provide convenient helpers but the actual data is stored in the `status` and `end_date` columns.

---

## 📊 `user_subscription_entitlements` Table

Tracks per-user entitlement usage and consumption. This table records the actual quota, consumption, and balance for each entitlement type (storage, file_count, tokens, etc.) for a specific user's subscription.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique entitlement instance identifier |
| `user_id` | UUID | FOREIGN KEY → users.id, NOT NULL, INDEXED, CASCADE DELETE | Foreign key to users.id - the user who has this entitlement |
| `subscription_id` | UUID | FOREIGN KEY → subscriptions.id, NOT NULL, INDEXED, CASCADE DELETE | Foreign key to subscriptions.id - the subscription plan |
| `category` | ENUM | NOT NULL, INDEXED | Entitlement category: file, chat, or other |
| `entitlement` | VARCHAR(100) | NOT NULL | Entitlement type (e.g., 'storage', 'file_count', 'tokens', 'api_calls', etc.) |
| `unit` | VARCHAR(20) | NOT NULL | Unit of measurement (e.g., 'MB', 'count', 'GB', 'hours', etc.) |
| `quota` | INTEGER | NOT NULL, DEFAULT 0 | Quota/limit value (e.g., 1000 for 1000 MB, 10000 for 10000 tokens, etc.) |
| `consumption` | INTEGER | NOT NULL, DEFAULT 0 | Current consumption/usage value (e.g., 500 for 500 MB used, 5000 for 5000 tokens used, etc.) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

### Category Enum Values
- **`file`** - File-related entitlements (storage, file_count, etc.)
- **`chat`** - Chat-related entitlements (tokens, messages, etc.)
- **`other`** - Other entitlements (API calls, custom features, etc.)

### Notes
- Tracks actual usage/consumption for each entitlement type per user subscription
- One user can have multiple entitlement records (one per entitlement type)
- `quota` is the limit allocated to the user for this entitlement
- `consumption` tracks how much has been used
- Composite indexes on `(user_id, subscription_id)`, `(user_id, category)` for efficient queries

### Computed Properties (Not Database Columns)
The model provides three computed properties for convenience:

1. **`balance`** - Returns remaining balance = `quota - consumption`
   ```python
   # Usage in code:
   remaining = user_entitlement.balance
   if remaining > 0:
       # User has remaining quota
   ```
   - **Not stored in database** - computed from `quota` and `consumption` columns
   - Single source of truth: `quota` and `consumption` columns

2. **`is_exceeded`** - Returns `True` if `consumption > quota`
   ```python
   # Usage in code:
   if user_entitlement.is_exceeded:
       # User has exceeded their quota
       block_access()
   ```
   - **Not stored in database** - computed from `quota` and `consumption` columns

3. **`usage_percentage`** - Returns percentage of quota used (0-100)
   ```python
   # Usage in code:
   usage = user_entitlement.usage_percentage
   if usage > 80:
       # Warn user they're approaching limit
   ```
   - **Not stored in database** - computed from `quota` and `consumption` columns
   - Returns 0.0 if `quota == 0`
   - Capped at 100.0 (can exceed if consumption > quota)

**Important:** These are Python `@property` methods, not database columns. They provide convenient helpers but the actual data is stored in the `quota` and `consumption` columns.

---

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

### Notes
- Tracks RAG pipeline job lifecycle for document processing
- Supports retry mechanism with `attempts` and `max_attempts`
- `document_id` is nullable for bot-level jobs (e.g., `delete_document_vectors_reindex_bot`)
- `stage` tracks current processing stage within the pipeline
- `logs` stores detailed execution logs and error information as JSONB
- Composite indexes on `(user_id, bot_id)`, `status`, `stage` for efficient queries

### Computed Properties (Not Database Columns)
The model provides four computed properties for convenience:

1. **`is_completed`** - Returns `True` if job is completed (succeeded, failed, or cancelled)
2. **`is_active`** - Returns `True` if job is currently active (queued or processing)
3. **`can_retry`** - Returns `True` if job can be retried (failed and attempts < max_attempts)
4. **`duration_seconds`** - Returns job duration in seconds (if finished)

**Important:** These are Python `@property` methods, not database columns. They provide convenient helpers but the actual data is stored in the respective columns.

---

## 📊 `app_settings` Table

Stores global configuration and landing page content. These settings are **global**, not per-tenant. Only platform admins can create or modify entries.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `key` | VARCHAR(255) | PRIMARY KEY, NOT NULL, INDEXED | Namespaced key (e.g., 'landing.hero_title', 'brand.app_name', 'support.email') |
| `value` | JSONB | NOT NULL | Any JSON value (string, number, object, array, etc.) |
| `description` | TEXT | NULLABLE | Admin description of what this setting controls |
| `is_public` | BOOLEAN | NOT NULL, DEFAULT false | If true, this setting can be exposed via public API (e.g., landing page content) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

### Notes
- Key-value store with namespaced keys (e.g., `landing.hero_title`, `brand.app_name`)
- JSONB values can store any JSON type (string, number, object, array)
- `is_public` flag controls which settings can be exposed via public API
- Only platform admins can create or modify app settings
- Landing page loads only keys with `is_public = true`
- Sensitive keys must have `is_public = false`

---

## 🔗 Relationships

1. **Users → Bots**: One-to-Many (one user can have many bots)
2. **Users → Installation Snippets**: One-to-Many (one user can have many snippets)
3. **Bots → Installation Snippets**: One-to-Many (one bot can have one snippet, enforced by system)
4. **Users → Documents**: One-to-Many (one user can have many documents)
5. **Bots → Documents**: One-to-Many (one bot can have many documents)
6. **Subscriptions → Pricing Plan Country Prices**: One-to-Many (one plan can have many country prices)
7. **Subscriptions → Entitlements**: One-to-Many (one plan can have many entitlements)
8. **Users → User Subscriptions**: One-to-Many (one user can have many subscription instances)
9. **Subscriptions → User Subscriptions**: One-to-Many (one plan can be subscribed to by many users)
10. **Users → User Subscription Entitlements**: One-to-Many (one user can have many entitlement records)
11. **Subscriptions → User Subscription Entitlements**: One-to-Many (one plan can have many user entitlement records)
12. **Users → Ingestion Jobs**: One-to-Many (one user can have many ingestion jobs)
13. **Bots → Ingestion Jobs**: One-to-Many (one bot can have many ingestion jobs)
14. **Documents → Ingestion Jobs**: One-to-Many (one document can have many ingestion jobs)
15. **Cascade Delete**: 
   - Deleting a user deletes all their bots, snippets, documents, user subscriptions, and ingestion jobs
   - Deleting a bot deletes all its snippets, documents, and ingestion jobs
   - Deleting a document deletes all its ingestion jobs
   - Deleting a subscription plan deletes all its country prices, entitlements, and user subscriptions

---

## 🎯 Summary

- **11 Tables**: `users`, `bots`, `documents`, `installation_snippets`, `subscriptions`, `pricing_plan_country_prices`, `entitlements`, `user_subscriptions`, `user_subscription_entitlements`, `ingestion_jobs`, `app_settings`
- **9 Enums**: `user_status`, `bot_status`, `document_source_type`, `document_status`, `entitlement_category`, `user_subscription_status`, `ingestion_job_type`, `ingestion_job_status`, `ingestion_job_stage`
- **All relationships** properly configured with foreign keys and CASCADE DELETE
- **All indexes** optimized for common query patterns
- **UI Configuration**: Stored directly in `branding` JSONB field (no separate table needed)
- **One Snippet Per Bot**: System enforces one snippet per bot (existing snippets are updated, not duplicated)
- **Global Configuration**: `subscriptions`, `pricing_plan_country_prices`, `entitlements`, and `app_settings` are global (admin-only) tables for platform-wide configuration
