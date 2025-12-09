# Complete Database Schema

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## Tables Overview

1. **`users`** - User/Tenant accounts (users = tenants)
2. **`bots`** - Bot/Agent configurations
3. **`documents`** - Knowledge sources uploaded by tenants (stored in MinIO)
4. **`installation_snippets`** - Embed codes and installation scripts
5. **`pricing_plans`** - Global subscription plans (Free, Pro, Enterprise, etc.)
6. **`pricing_plan_country_prices`** - Country/region-specific pricing for each plan
7. **`app_settings`** - Global application settings and landing page content

---

## Current Tables

### `users` Table (Users = Tenants)

In this multi-tenant system, **users are tenants**. Each user account represents both a user and a tenant/organization.

#### Columns

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique user/tenant identifier |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL, INDEXED | User email address (unique) |
| `hashed_password` | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| `full_name` | VARCHAR(255) | **NOT NULL** | User's full name (required) |
| `company_name` | VARCHAR(255) | **NOT NULL** | Organization/Company name (required) |
| `domain` | VARCHAR(255) | NULLABLE | Tenant domain (optional) |
| `status` | ENUM | NOT NULL, DEFAULT 'pending_verification' | User status: active, pending_verification, suspended |
| `plan` | VARCHAR(50) | NULLABLE | Subscription plan (free, pro, enterprise) |
| `settings` | JSONB | NULLABLE | Miscellaneous configuration (limits, billing IDs, etc.) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

#### Status Enum Values
- `active` - User/tenant account is active and verified (can log in)
- `pending_verification` - Account created but email not verified (default, cannot log in)
- `suspended` - Account suspended (cannot log in)

**Note:** `is_verified` is a computed property (not a database column) derived from `status`:
- `status == 'active'` → `is_verified = true`
- `status == 'pending_verification'` → `is_verified = false`
- `status == 'suspended'` → `is_verified = false`

#### Indexes
- Primary Key: `id` (UUID)
- Unique Index: `email`
- Index: `id`

---

---

### `bots` Table

Stores all chatbot/bot configurations and settings for each user/tenant.

#### Columns

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

#### Status Enum Values
- `draft` - Bot is being created/configured (default)
- `active` - Bot is live and operational
- `paused` - Bot is temporarily disabled
- `archived` - Bot is deactivated/removed

**Note:** `is_active` is a computed property (not a database column) derived from `status`:
- `status == 'active'` → `is_active = true`
- `status == 'draft'/'paused'/'archived'` → `is_active = false`

---

### `installation_snippets` Table

Stores embed codes and script URLs for installing bots on customer websites.

#### Columns

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique snippet identifier |
| `user_id` | UUID | FOREIGN KEY → users.id, NOT NULL, INDEXED, CASCADE DELETE | Owner/tenant reference |
| `bot_id` | UUID | FOREIGN KEY → bots.id, NOT NULL, INDEXED, CASCADE DELETE | Bot reference - snippet is specific to this bot |
| `script_url` | TEXT | NULLABLE | CDN-hosted script URL |
| `embed_code` | TEXT | NOT NULL | Full JavaScript snippet for installation |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'active', INDEXED | Snippet status: 'active' | 'revoked' |
| `domain_whitelist` | JSONB | NULLABLE | List of allowed domains (null = no restrictions, stored as JSON array) |
| `usage_count` | INTEGER | NOT NULL, DEFAULT 0 | Number of times this snippet has been used/accessed (tracks widget loads + chat messages) |
| `last_used_at` | TIMESTAMP WITH TIME ZONE | NULLABLE | Timestamp when snippet was last accessed/used (updated on widget load and chat messages) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |
| `expires_at` | TIMESTAMP WITH TIME ZONE | NULLABLE | Optional expiry timestamp (null = never expires) |

**Note:** `is_active` is a computed property (not a database column) derived from `status`:
- `status == 'active'` → `is_active = true`
- `status == 'revoked'` → `is_active = false`

**Note:** `name` and `environment` fields were removed as they were redundant:
- One snippet per bot is enforced, so environment distinction is unnecessary
- Bot name already identifies the snippet, so a separate name field is redundant

---

## SQL Equivalent

### Users Table
```sql
CREATE TYPE user_status AS ENUM ('active', 'pending_verification', 'suspended');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    status user_status NOT NULL DEFAULT 'pending_verification',
    plan VARCHAR(50),
    settings JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_id ON users(id);
```

### Bots Table
```sql
CREATE TYPE bot_status AS ENUM ('draft', 'active', 'paused', 'archived');

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

CREATE INDEX idx_bots_user_id ON bots(user_id);
CREATE INDEX idx_bots_id ON bots(id);
CREATE INDEX idx_bots_status ON bots(status);
CREATE INDEX idx_bots_created_at ON bots(created_at);
```

### Installation Snippets Table
```sql
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

CREATE INDEX idx_installation_snippets_user_id ON installation_snippets(user_id);
CREATE INDEX idx_installation_snippets_bot_id ON installation_snippets(bot_id);
CREATE INDEX idx_installation_snippets_id ON installation_snippets(id);
CREATE INDEX idx_installation_snippets_status ON installation_snippets(status);
CREATE INDEX idx_installation_snippets_created_at ON installation_snippets(created_at);
CREATE INDEX idx_installation_snippets_user_bot ON installation_snippets(user_id, bot_id);
```

### `documents` Table

Stores tenant-uploaded knowledge sources that live in MinIO. The backend controls object paths and never exposes them to the frontend.

#### Columns

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL | Document identifier |
| `tenant_id` | UUID | FOREIGN KEY → users.id, NOT NULL, ON DELETE CASCADE | Owner/tenant reference |
| `bot_id` | UUID | FOREIGN KEY → bots.id, NOT NULL, ON DELETE CASCADE | Bot this document belongs to |
| `source_type` | ENUM('file','url','integration') | NOT NULL, DEFAULT 'file' | Origin of the knowledge item |
| `source_url` | VARCHAR(512) | NULLABLE | Storage key (uploads) or remote URL |
| `filename` | VARCHAR(255) | NULLABLE | Original filename (nullable for URL/integration) |
| `content_type` | VARCHAR(128) | NULLABLE | Stored mime type |
| `size` | INTEGER | NULLABLE | File size (bytes) |
| `status` | ENUM('pending','processing','indexed','error') | NOT NULL, DEFAULT 'pending' | Ingestion/indexing status |
| `metadata` | JSONB | NULLABLE | Additional metadata (checksums, crawler info, etc.) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL | Upload timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last modification |

#### Notes
- Tenants never provide storage paths. The backend builds the MinIO key as `{tenant_id}/{bot_id}/{document_id}/{filename}` and persists it in `source_url`.
- Queries always filter by `tenant_id` to enforce isolation.

### Documents Table
```sql
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

## Key Features

### Users Table:
1. ✅ **`full_name`** - **NOT NULL** (required) - User's full name
2. ✅ **`company_name`** - **NOT NULL** (required) - Organization/Company name
3. ✅ **`domain`** - Optional tenant domain
4. ✅ **`status`** - Enum with three states (active, pending_verification, suspended)
5. ✅ **`plan`** - Subscription plan field
6. ✅ **`settings`** - JSONB for miscellaneous configuration
7. ✅ **`is_verified`** - Computed property from `status` (not stored in database)

### Bots Table:
1. ✅ **`user_id`** - Foreign key to users (CASCADE DELETE)
2. ✅ **`status`** - Enum with four states (draft, active, paused, archived)
3. ✅ **`is_active`** - Computed property from `status` (not stored in database)
4. ✅ **`llm_config`** - JSONB for LLM configuration (model, temperature, style, etc.)
5. ✅ **`retrieval_config`** - JSONB for RAG/Vector DB configuration
6. ✅ **`guardrails`** - JSONB for content moderation and safety rules
7. ✅ **`branding`** - JSONB for all UI configuration (logo, colors, welcome message, assistant name, widget sizing, positioning)

### Installation Snippets Table:
1. ✅ **`user_id` + `bot_id`** - Dual foreign keys for flexibility
2. ✅ **`status`** - String field for status management ('active' | 'revoked')
3. ✅ **`is_active`** - Computed property from `status` (not stored in database)
4. ✅ **`embed_code`** - Full JavaScript snippet for installation (uses `data-snippet-id`)
5. ✅ **`script_url`** - CDN-hosted script URL (optional)
6. ✅ **`domain_whitelist`** - JSONB for security (restrict domains, null = allow all)
7. ✅ **`usage_count` & `last_used_at`** - Analytics tracking (widget loads + chat messages)
8. ✅ **`expires_at`** - Optional expiry for time-limited access
9. ✅ **One snippet per bot** - System enforces one snippet per bot (existing snippets are updated, not duplicated)

## Example Data

### User/Tenant Example
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "full_name": "John Doe",
  "company_name": "Acme Corporation",
  "domain": "acme.com",
  "status": "active",
  "plan": "pro",
  "is_verified": true,  // Computed from status (status == 'active')
  "settings": {
    "max_users": 100,
    "max_bots": 50,
    "billing_id": "cus_abc123"
  },
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T12:00:00Z"
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
    "communication_style": "friendly"
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

---

### `pricing_plans` Table

Stores all subscription plans that can be offered to tenants (Free, Pro, Enterprise, etc.). These are **global** plans, not per-tenant. Only platform admins can create or modify entries.

#### Columns

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique plan ID |
| `name` | TEXT | NOT NULL | Display name (e.g., 'Free', 'Pro', 'Enterprise') |
| `description` | TEXT | NULLABLE | Short tagline/description |
| `is_highlighted` | BOOLEAN | NOT NULL, DEFAULT false | Mark as "Most Popular" in UI |
| `sort_order` | JSONB | NULLABLE | Ordering configuration for UI display |
| `limits` | JSONB | NULLABLE | Plan limits (e.g., { "max_bots": 1, "max_docs": 20 }) |
| `support_level` | VARCHAR(50) | NULLABLE | Support level (None, email, call, priority, etc.) |
| `features` | JSONB | NULLABLE | List of features (e.g., ["Unlimited chats", "Priority support"]) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

#### Notes
- Plans are global, not per-tenant
- Only platform admins can create or modify pricing plans
- Tenants reference plans (e.g., via `users.plan` field or future `subscriptions` table)
- Backend enforces limits via `plan.limits` when tenants use the system

---

### `pricing_plan_country_prices` Table

Stores pricing per country/region for each plan. Allows different pricing for different markets.

#### Columns

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique row ID |
| `plan_id` | UUID | FOREIGN KEY → pricing_plans.id, NOT NULL, INDEXED, CASCADE DELETE | Maps price to plan |
| `country_code` | VARCHAR(10) | NOT NULL, INDEXED | Country/region code (e.g., 'IN-SOUTH', 'US-CENTRAL', 'EU-WEST') |
| `currency` | VARCHAR(10) | NOT NULL | Currency code (e.g., 'USD', 'INR', 'EUR') |
| `billing_interval` | VARCHAR(20) | NOT NULL | Billing interval: 'monthly' or 'yearly' |
| `price` | INTEGER | NOT NULL | Price in smallest currency unit (e.g., cents for USD, paise for INR) |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT true | Enable/disable this price |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

#### Notes
- Supports different prices for different regions/countries
- Supports both monthly and yearly billing
- Price stored as integer in smallest currency unit (avoids floating-point issues)
- `is_active` allows disabling prices without deleting records

---

### `app_settings` Table

Stores global configuration and landing page content. These settings are **global**, not per-tenant. Only platform admins can create or modify entries.

#### Columns

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `key` | VARCHAR(255) | PRIMARY KEY, NOT NULL, INDEXED | Namespaced key (e.g., 'landing.hero_title', 'brand.app_name', 'support.email') |
| `value` | JSONB | NOT NULL | Any JSON value (string, number, object, array, etc.) |
| `description` | TEXT | NULLABLE | Admin description of what this setting controls |
| `is_public` | BOOLEAN | NOT NULL, DEFAULT false | If true, this setting can be exposed via public API (e.g., landing page content) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

#### Notes
- Key-value store with namespaced keys (e.g., `landing.hero_title`, `brand.app_name`)
- JSONB values can store any JSON type (string, number, object, array)
- `is_public` flag controls which settings can be exposed via public API
- Only platform admins can create or modify app settings
- Landing page loads only keys with `is_public = true`
- Sensitive keys must have `is_public = false`

---

## SQL Equivalent

### Pricing Plans Table
```sql
CREATE TABLE pricing_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    is_highlighted BOOLEAN NOT NULL DEFAULT false,
    sort_order JSONB,
    limits JSONB,
    support_level VARCHAR(50),
    features JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pricing_plans_id ON pricing_plans(id);
CREATE INDEX idx_pricing_plans_is_highlighted ON pricing_plans(is_highlighted);
```

### Pricing Plan Country Prices Table
```sql
CREATE TABLE pricing_plan_country_prices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES pricing_plans(id) ON DELETE CASCADE,
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

---

## Key Features

### Users Table:
1. ✅ **`full_name`** - **NOT NULL** (required) - User's full name
2. ✅ **`company_name`** - **NOT NULL** (required) - Organization/Company name
3. ✅ **`domain`** - Optional tenant domain
4. ✅ **`status`** - Enum with three states (active, pending_verification, suspended)
5. ✅ **`plan`** - Subscription plan field
6. ✅ **`settings`** - JSONB for miscellaneous configuration
7. ✅ **`is_verified`** - Computed property from `status` (not stored in database)

### Bots Table:
1. ✅ **`user_id`** - Foreign key to users (CASCADE DELETE)
2. ✅ **`status`** - Enum with four states (draft, active, paused, archived)
3. ✅ **`is_active`** - Computed property from `status` (not stored in database)
4. ✅ **`llm_config`** - JSONB for LLM configuration (model, temperature, style, etc.)
5. ✅ **`retrieval_config`** - JSONB for RAG/Vector DB configuration
6. ✅ **`guardrails`** - JSONB for content moderation and safety rules
7. ✅ **`branding`** - JSONB for all UI configuration (logo, colors, welcome message, assistant name, widget sizing, positioning)

### Installation Snippets Table:
1. ✅ **`user_id` + `bot_id`** - Dual foreign keys for flexibility
2. ✅ **`status`** - String field for status management ('active' | 'revoked')
3. ✅ **`is_active`** - Computed property from `status` (not stored in database)
4. ✅ **`embed_code`** - Full JavaScript snippet for installation (uses `data-snippet-id`)
5. ✅ **`script_url`** - CDN-hosted script URL (optional)
6. ✅ **`domain_whitelist`** - JSONB for security (restrict domains, null = allow all)
7. ✅ **`usage_count` & `last_used_at`** - Analytics tracking (widget loads + chat messages)
8. ✅ **`expires_at`** - Optional expiry for time-limited access
9. ✅ **One snippet per bot** - System enforces one snippet per bot (existing snippets are updated, not duplicated)

### Pricing Plans Table:
1. ✅ **Global Plans** - Plans are global, not per-tenant
2. ✅ **Admin-Only** - Only platform admins can create or modify pricing plans
3. ✅ **Flexible Limits** - `limits` JSONB allows for flexible plan configurations
4. ✅ **Feature Lists** - `features` JSONB stores an array of feature strings
5. ✅ **Country Pricing** - Related `pricing_plan_country_prices` table supports country-based pricing

### Pricing Plan Country Prices Table:
1. ✅ **Country-Based Pricing** - Supports different prices for different regions/countries
2. ✅ **Currency Support** - Stores currency code separately from price
3. ✅ **Billing Intervals** - Supports both monthly and yearly billing
4. ✅ **Price Storage** - Price stored as integer in smallest currency unit
5. ✅ **Active/Inactive** - `is_active` allows disabling prices without deleting records

### App Settings Table:
1. ✅ **Key-Value Store** - Simple key-value structure allows flexible configuration
2. ✅ **Namespaced Keys** - Keys use dot notation (e.g., `landing.hero_title`) for organization
3. ✅ **JSONB Values** - Values can be any JSON type (string, number, object, array)
4. ✅ **Public/Private** - `is_public` flag controls which settings can be exposed via public API
5. ✅ **Admin-Only** - Only platform admins can create or modify app settings

## Example Data

### User/Tenant Example
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "full_name": "John Doe",
  "company_name": "Acme Corporation",
  "domain": "acme.com",
  "status": "active",
  "plan": "pro",
  "is_verified": true,  // Computed from status (status == 'active')
  "settings": {
    "max_users": 100,
    "max_bots": 50,
    "billing_id": "cus_abc123"
  },
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T12:00:00Z"
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
    "communication_style": "friendly"
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
  "limits": {
    "max_bots": 10,
    "max_docs": 100,
    "max_chats_per_month": 10000,
    "max_storage_gb": 50
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

## Security Notes

- **Password**: Never stored in plain text, always hashed with bcrypt
- **Email**: Unique constraint prevents duplicate accounts
- **Status**: Controls account access (active, pending, suspended)
- **Settings**: JSONB allows flexible configuration storage
- **Global Configuration**: `pricing_plans`, `pricing_plan_country_prices`, and `app_settings` are admin-only (only platform admins can create/modify)
- **Public Settings**: Only `app_settings` with `is_public = true` can be exposed via public API
