# Complete Database Schema

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## Tables Overview

1. **`users`** - User/Tenant accounts (users = tenants)
2. **`bots`** - Bot/Agent configurations
3. **`ui_configs`** - UI configuration themes for chatbots
4. **`installation_snippets`** - Embed codes and installation scripts

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
| `branding` | JSONB | NULLABLE | Branding fallback (logo, colors, welcome message, assistant name, widget sizing) |
| `ui_config_id` | UUID | FOREIGN KEY → ui_configs.id, NULLABLE, INDEXED | Optional UI configuration reference |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

#### Status Enum Values
- `draft` - Bot is being created/configured (default)
- `active` - Bot is live and operational
- `paused` - Bot is temporarily disabled
- `archived` - Bot is deactivated/removed

---

### `ui_configs` Table

Stores reusable UI configuration themes for chatbots.

#### Columns

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique UI config identifier |
| `user_id` | UUID | FOREIGN KEY → users.id, NOT NULL, INDEXED, CASCADE DELETE | Owner/tenant reference |
| `name` | VARCHAR(100) | NULLABLE | Optional name for this UI config |
| `primary_color` | VARCHAR(20) | NULLABLE | Primary theme color (e.g., '#6366f1') |
| `background_color` | VARCHAR(20) | NULLABLE | Background color (e.g., '#ffffff') |
| `chat_title` | VARCHAR(150) | NULLABLE | Chat widget title |
| `intro_message` | TEXT | NULLABLE | Welcome/intro message shown to users |
| `avatar_url` | TEXT | NULLABLE | Avatar/logo URL for the chatbot |
| `position` | VARCHAR(50) | NULLABLE | Widget position (e.g., 'bottom-right', 'bottom-left') |
| `height` | INTEGER | NULLABLE | Chat window height in pixels |
| `width` | INTEGER | NULLABLE | Chat window width in pixels |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

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
| `domain_whitelist` | JSONB | NULLABLE | List of allowed domains (null = no restrictions) |
| `usage_count` | INTEGER | NOT NULL, DEFAULT 0 | Number of times this snippet has been used/accessed |
| `last_used_at` | TIMESTAMP WITH TIME ZONE | NULLABLE | Timestamp when snippet was last accessed/used |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |
| `expires_at` | TIMESTAMP WITH TIME ZONE | NULLABLE | Optional expiry timestamp (null = never expires) |

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
    ui_config_id UUID REFERENCES ui_configs(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bots_user_id ON bots(user_id);
CREATE INDEX idx_bots_id ON bots(id);
CREATE INDEX idx_bots_status ON bots(status);
CREATE INDEX idx_bots_ui_config_id ON bots(ui_config_id);
CREATE INDEX idx_bots_created_at ON bots(created_at);
```

### UI Configs Table
```sql
CREATE TABLE ui_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100),
    primary_color VARCHAR(20),
    background_color VARCHAR(20),
    chat_title VARCHAR(150),
    intro_message TEXT,
    avatar_url TEXT,
    position VARCHAR(50),
    height INTEGER,
    width INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ui_configs_user_id ON ui_configs(user_id);
CREATE INDEX idx_ui_configs_id ON ui_configs(id);
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

## Key Features

### Users Table:
1. ✅ **`full_name`** - **NOT NULL** (required) - User's full name
2. ✅ **`company_name`** - **NOT NULL** (required) - Organization/Company name
3. ✅ **`domain`** - Optional tenant domain
4. ✅ **`status`** - Enum with three states (active, pending_verification, suspended)
5. ✅ **`plan`** - Subscription plan field
6. ✅ **`settings`** - JSONB for miscellaneous configuration

### Bots Table:
1. ✅ **`user_id`** - Foreign key to users (CASCADE DELETE)
2. ✅ **`status`** - Enum with four states (draft, active, paused, archived)
3. ✅ **`ui_config_id`** - Optional foreign key to ui_configs (SET NULL on delete)
4. ✅ **`llm_config`** - JSONB for LLM configuration (model, temperature, style, etc.)
5. ✅ **`retrieval_config`** - JSONB for RAG/Vector DB configuration
6. ✅ **`guardrails`** - JSONB for content moderation and safety rules
7. ✅ **`branding`** - JSONB for logo, colors, welcome message, assistant name (fallback if no ui_config_id)

### UI Configs Table:
1. ✅ **`user_id`** - Foreign key to users (CASCADE DELETE)
2. ✅ **`primary_color`** - Primary theme color
3. ✅ **`background_color`** - Background color
4. ✅ **`chat_title`** - Chat widget title
5. ✅ **`intro_message`** - Welcome/intro message
6. ✅ **`avatar_url`** - Avatar/logo URL
7. ✅ **`position`** - Widget position (bottom-right, bottom-left, etc.)
8. ✅ **`height`** - Chat window height in pixels
9. ✅ **`width`** - Chat window width in pixels

### Installation Snippets Table:
1. ✅ **`user_id` + `bot_id`** - Dual foreign keys for flexibility
2. ✅ **`embed_code`** - Full JavaScript snippet for installation
3. ✅ **`script_url`** - CDN-hosted script URL
4. ✅ **`domain_whitelist`** - JSONB for security (restrict domains)
5. ✅ **`usage_count` & `last_used_at`** - Analytics tracking
6. ✅ **`expires_at`** - Optional expiry for time-limited access

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

## Security Notes

- **Password**: Never stored in plain text, always hashed with bcrypt
- **Email**: Unique constraint prevents duplicate accounts
- **Status**: Controls account access (active, pending, suspended)
- **Settings**: JSONB allows flexible configuration storage
