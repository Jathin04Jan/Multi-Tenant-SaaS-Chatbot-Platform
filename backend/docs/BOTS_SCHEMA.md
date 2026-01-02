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
| `status` | ENUM | NOT NULL, DEFAULT 'draft', INDEXED | Bot status: draft, active, paused, archived |
| `llm_config` | JSONB | NULLABLE | LLM configuration (model, temperature, style, etc.) |
| `retrieval_config` | JSONB | NULLABLE | RAG/Retrieval configuration (Vector DB, filters, chunking, etc.) |
| `guardrails` | JSONB | NULLABLE | Content guardrails (moderation, blocked phrases, filters) |
| `branding` | JSONB | NULLABLE | Branding and UI configuration (logo, colors, messages, positioning, widget sizing) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

### Status Enum Values
- **`draft`** - Bot is being created/configured (default). Used for in-progress bot creation. Each user can have only one draft bot at a time. Draft bots are automatically created when the user starts the bot creation wizard and are updated at each step. When the wizard is completed, the draft bot's status is changed to `active`.
- **`active`** - Bot is live and operational (can be embedded)
- **`paused`** - Bot is temporarily disabled
- **`archived`** - Bot is deactivated/removed

**Note:** `is_active` is a computed property (not a database column) derived from `status`:
- `status == 'active'` → `is_active = true`
- `status == 'draft'/'paused'/'archived'` → `is_active = false`

### Key Design Decisions

1. **Table Name: `bots`**
   - Clear, simple naming that matches user-facing terminology
   - Avoids confusion with "agents" terminology

### JSONB Field Structures

#### `llm_config` Structure:
```json
{
  "model": "qwen3-vl:8b",
  "temperature": 0.7,
  "top_p": 0.9,
  "max_tokens": 1000,
  "communication_style": "friendly",
  "style_prompt": "You are a friendly and warm assistant..."
}
```

**Default Values** (set automatically when creating a draft bot or new bot):
- `model`: `"qwen3-vl:8b"` (from `settings.OLLAMA_LLM_MODEL`)
- `temperature`: `0.7`

These defaults are applied in `BotService.create_draft_bot()` and `BotService.create_bot()` if not provided.

#### `retrieval_config` Structure:
```json
{
  "embedding_model": "qwen3-embedding:4b",
  "chunk_size": 1000,
  "chunk_overlap": 200,
  "vector_db": {
    "provider": "qdrant",
    "collection_name": "bot_{bot_id}"
  },
  "filters": {},
  "rag_params": {
    "top_k": 5,
    "similarity_threshold": 0.7
  }
}
```

**Default Values** (set automatically when creating a draft bot or new bot):
- `embedding_model`: `"qwen3-embedding:4b"` (from `settings.OLLAMA_EMBEDDING_MODEL`)
- `chunk_size`: `1000` (characters)
- `chunk_overlap`: `200` (characters)

These defaults are applied in `BotService.create_draft_bot()` and `BotService.create_bot()` if not provided.

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

#### `branding` Structure (stores all UI configuration):
```json
{
  "logo_url": "https://example.com/logo.png",
  "avatar_url": "https://example.com/logo.png",
  "primary_color": "#6366f1",
  "background_color": "#ffffff",
  "welcome_message": "Hello! How can I help you today?",
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

---

## 💾 Example Record

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Support Assistant",
  "description": "A friendly customer support bot that helps with product questions",
  "status": "active",
  "is_active": true,  // Computed from status (status == 'active')
  "llm_config": {
    "model": "gpt-4",
    "temperature": 0.7,
    "top_p": 0.9,
    "max_tokens": 1000,
    "communication_style": "friendly",
    "style_prompt": "You are a friendly and warm assistant..."
  },
  "retrieval_config": {
    "embedding_model": "qwen3-embedding:4b",
    "chunk_size": 1000,
    "chunk_overlap": 200,
    "vector_db": {
      "provider": "qdrant",
      "collection_name": "bot_a1b2c3d4_e5f6_7890_abcd_ef1234567890"
    }
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
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

## 🎯 Key Design Decisions

### 1. **Foreign Key to Users**
- Uses `user_id` (not `tenant_id`) since users = tenants in this system
- `ON DELETE CASCADE` ensures bots are deleted when user account is deleted

### 2. **Status Management**
- `status`: Single source of truth for bot lifecycle (draft → active → paused → archived)
- `is_active`: Computed property derived from `status` (for backward compatibility in API responses)

### 3. **UI Configuration**
- All UI configuration is stored in `branding` JSONB (no separate table needed)
- Includes: logo, colors, messages, positioning, widget sizing
- Simple and efficient - no joins required

### 4. **JSONB for Flexibility**
- Allows schema evolution without migrations
- Supports complex nested configurations
- Enables querying with PostgreSQL JSONB operators

### 5. **Draft Bot System**
- **One Draft Per User**: Each user can have only one draft bot at a time. This is enforced at the API level.
- **Step-by-Step Persistence**: All configuration (branding, tone, guardrails) is saved to the database immediately when the user clicks "Next" on each step of the wizard.
- **Immediate Document Upload**: Documents are uploaded to database and MinIO immediately when added in Step 4 (not queued for later). This ensures documents persist even if the user exits and resumes.
- **Progress Preservation**: If the user exits the wizard and returns, their progress is restored from the database, including all uploaded documents.
- **Draft Cleanup**: When a draft bot is completed (status changed to `active`), a new draft can be created. The "Reset" button in the wizard deletes the draft bot and all associated assets (logo, documents) from MinIO.

### 6. **Additional Fields Added**
- `status`: Lifecycle management (draft, active, paused, archived) - single source of truth
- `is_active`: Computed property (not stored) - derived from `status == 'active'`
- `updated_at`: Automatically tracks when bot was last modified (includes activation/deployment)

---

## 🔍 Indexes

- **Primary Key**: `id` (UUID)
- **Foreign Key Index**: `user_id` (for efficient user → bots queries)
- **Status Index**: `status` (for filtering by status)
- **Created At Index**: `created_at` (for sorting/ordering)

---

## 🔗 Relationships

- **Many-to-One**: Multiple bots belong to one user
- **Cascade Delete**: Deleting a user deletes all their bots

