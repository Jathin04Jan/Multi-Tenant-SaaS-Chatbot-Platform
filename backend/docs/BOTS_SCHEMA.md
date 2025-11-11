# Bots Table Schema

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## 📊 `bots` Table

Stores all chatbot/bot configurations and settings for each user/tenant.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique bot identifier |
| `user_id` | UUID | FOREIGN KEY → users.id, NOT NULL, INDEXED, CASCADE DELETE | Owner/creator of the bot |
| `name` | VARCHAR(255) | NOT NULL | Bot name |
| `description` | TEXT | NULLABLE | Bot persona summary/description |
| `slug` | VARCHAR(255) | NULLABLE, UNIQUE, INDEXED | URL-friendly identifier (e.g., 'support-bot') |
| `status` | ENUM | NOT NULL, DEFAULT 'draft', INDEXED | Bot status: draft, active, paused, archived |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT true | Quick enable/disable toggle |
| `last_deployed_at` | TIMESTAMP WITH TIME ZONE | NULLABLE | When bot was last deployed/activated |
| `llm_config` | JSONB | NULLABLE | LLM configuration (model, temperature, style, etc.) |
| `retrieval_config` | JSONB | NULLABLE | RAG/Retrieval configuration (Vector DB, filters, chunking, etc.) |
| `guardrails` | JSONB | NULLABLE | Content guardrails (moderation, blocked phrases, filters) |
| `branding` | JSONB | NULLABLE | Branding fallback (logo, colors, welcome message, assistant name, default widget sizing) |
| `ui_config_id` | UUID | FOREIGN KEY → ui_configs.id, NULLABLE, INDEXED | Optional UI configuration reference |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

### Status Enum Values
- **`draft`** - Bot is being created/configured (default)
- **`active`** - Bot is live and operational
- **`paused`** - Bot is temporarily disabled
- **`archived`** - Bot is deactivated/removed

### Key Design Decisions

1. **Table Name: `bots`**
   - Clear, simple naming that matches user-facing terminology
   - Avoids confusion with "agents" terminology

### JSONB Field Structures

#### `llm_config` Structure:
```json
{
  "model": "gpt-4",
  "temperature": 0.7,
  "top_p": 0.9,
  "max_tokens": 1000,
  "communication_style": "friendly",
  "style_prompt": "You are a friendly and warm assistant..."
}
```

#### `retrieval_config` Structure:
```json
{
  "vector_db": {
    "provider": "pinecone",
    "index_name": "bot-index"
  },
  "filters": {},
  "rag_params": {
    "top_k": 5,
    "similarity_threshold": 0.7
  },
  "chunk_size": 1000,
  "chunk_overlap": 200,
  "embedding_model": "text-embedding-ada-002"
}
```

#### `guardrails` Structure:
```json
{
  "max_response_length": 500,
  "blocked_phrases": ["refund immediately", "cancel now"],
  "block_explicit_content": true,
  "block_political_views": true,
  "strictly_stick_to_topic": true,
  "block_personal_info": true,
  "enable_fact_checking": true,
  "custom_instructions": "Always be helpful and professional..."
}
```

#### `branding` Structure (fallback when no `ui_config_id` is linked):
```json
{
  "logo_url": "https://example.com/logo.png",
  "primary_color": "#6366f1",
  "welcome_message": "Hello! How can I help you today?",
  "assistant_name": "Assistant",
  "position": "bottom-right",
  "height": 600,
  "width": 400
}
```

> When a bot links to a record in `ui_configs`, the widget will use the structured data from that table.  
> The `branding` JSONB remains as a backwards-compatible fallback and default configuration.

---

## 📝 SQL CREATE Statement

```sql
-- Create enum type for bot status
CREATE TYPE bot_status AS ENUM ('draft', 'active', 'paused', 'archived');

-- Create bots table
CREATE TABLE bots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) UNIQUE,
    status bot_status NOT NULL DEFAULT 'draft',
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_deployed_at TIMESTAMP WITH TIME ZONE,
    llm_config JSONB,
    retrieval_config JSONB,
    guardrails JSONB,
    branding JSONB,
    ui_config_id UUID REFERENCES ui_configs(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_bots_user_id ON bots(user_id);
CREATE INDEX idx_bots_id ON bots(id);
CREATE INDEX idx_bots_slug ON bots(slug);
CREATE INDEX idx_bots_status ON bots(status);
CREATE INDEX idx_bots_ui_config_id ON bots(ui_config_id);
CREATE INDEX idx_bots_created_at ON bots(created_at);
```

---

## 💾 Example Record

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Support Assistant",
  "description": "A friendly customer support bot that helps with product questions",
  "slug": "support-assistant",
  "status": "active",
  "is_active": true,
  "last_deployed_at": "2024-01-15T10:30:00Z",
  "llm_config": {
    "model": "gpt-4",
    "temperature": 0.7,
    "top_p": 0.9,
    "max_tokens": 1000,
    "communication_style": "friendly",
    "style_prompt": "You are a friendly and warm assistant..."
  },
  "retrieval_config": {
    "vector_db": {
      "provider": "pinecone",
      "index_name": "support-bot-index"
    },
    "chunk_size": 1000,
    "chunk_overlap": 200,
    "embedding_model": "text-embedding-ada-002"
  },
  "guardrails": {
    "max_response_length": 500,
    "blocked_phrases": [],
    "block_explicit_content": true,
    "block_political_views": true,
    "strictly_stick_to_topic": true,
    "block_personal_info": true,
    "enable_fact_checking": true,
    "custom_instructions": ""
  },
  "branding": {
    "logo_url": "https://example.com/logo.png",
    "primary_color": "#6366f1",
    "welcome_message": "Hello! How can I help you today?",
    "assistant_name": "Support Assistant",
    "position": "bottom-right",
    "height": 600,
    "width": 400
  },
  "ui_config_id": "b82dc1a8-4e6c-4c52-9a0e-7d8bce771123",
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

## 🎯 Key Design Decisions

### 1. **Foreign Key to Users**
- Uses `user_id` (not `tenant_id`) since users = tenants in this system
- `ON DELETE CASCADE` ensures bots are deleted when user account is deleted

### 2. **Status vs is_active**
- `status`: Lifecycle state (draft → active → paused → archived)
- `is_active`: Quick toggle for enabling/disabling without changing status

### 3. **UI Config Integration**
- `ui_config_id` links to reusable records in `ui_configs`
- Embed endpoint prefers UI config; `branding` provides backwards-compatible defaults
- Supports per-bot overrides while enabling shared themes

### 4. **JSONB for Flexibility**
- Allows schema evolution without migrations
- Supports complex nested configurations
- Enables querying with PostgreSQL JSONB operators

### 5. **Slug Field**
- Optional but useful for URL-friendly bot identifiers
- Unique constraint prevents conflicts
- Can be used for public bot URLs (e.g., `/bot/support-assistant`)

### 6. **Additional Fields Added**
- `slug`: URL-friendly identifier
- `status`: Lifecycle management (draft, active, paused, archived)
- `is_active`: Quick enable/disable
- `last_deployed_at`: Track deployment history

---

## 🔍 Indexes

- **Primary Key**: `id` (UUID)
- **Foreign Key Index**: `user_id` (for efficient user → bots queries)
- **Unique Index**: `slug` (for URL lookups)
- **Status Index**: `status` (for filtering by status)
- **Created At Index**: `created_at` (for sorting/ordering)

---

## 🔗 Relationships

- **Many-to-One**: Multiple bots belong to one user
- **Cascade Delete**: Deleting a user deletes all their bots

