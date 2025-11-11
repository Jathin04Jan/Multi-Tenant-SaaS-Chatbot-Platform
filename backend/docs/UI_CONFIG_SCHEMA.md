# UI Configuration Schema

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## Overview
The `ui_configs` table stores chatbot UI customization settings. This allows users to create reusable UI configurations that can be shared across multiple bots.

## Table Structure

### `ui_configs` Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `user_id` | UUID | NOT NULL, FK to `users.id` | Owner/tenant reference |
| `name` | VARCHAR(100) | NULLABLE | Optional name for this UI config |
| `primary_color` | VARCHAR(20) | NULLABLE | Primary theme color (e.g., '#6366f1') |
| `background_color` | VARCHAR(20) | NULLABLE | Background color (e.g., '#ffffff') |
| `chat_title` | VARCHAR(150) | NULLABLE | Chat widget title |
| `intro_message` | TEXT | NULLABLE | Welcome/intro message shown to users |
| `avatar_url` | TEXT | NULLABLE | Avatar/logo URL for the chatbot |
| `position` | VARCHAR(50) | NULLABLE | Widget position (e.g., 'bottom-right', 'bottom-left') |
| `height` | INTEGER | NULLABLE | Chat window height in pixels |
| `width` | INTEGER | NULLABLE | Chat window width in pixels |
| `created_at` | TIMESTAMP | NOT NULL | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL | Last update timestamp |

## Relationships

### Foreign Keys
- `user_id` → `users.id` (CASCADE on delete)

### Relationships
- `User.ui_configs` - One-to-many relationship (user has many UI configs)
- `Bot.ui_config` - Many-to-one relationship (bot can have one UI config)

## Bot Integration

### `bots` Table - New Field
- `ui_config_id` (UUID, FK to `ui_configs.id`, NULLABLE)
  - Optional foreign key to UI configuration
  - If set, bot uses UI config for embedding
  - If NULL, bot falls back to `branding` JSONB field

## Usage

### Creating a UI Config
```python
# POST /api/v1/ui-configs
{
    "name": "Default Theme",
    "primary_color": "#6366f1",
    "background_color": "#ffffff",
    "chat_title": "Support Chat",
    "intro_message": "Hello! How can I help?",
    "avatar_url": "https://example.com/avatar.png",
    "position": "bottom-right",
    "height": 600,
    "width": 400
}
```

### Assigning UI Config to Bot
```python
# PATCH /api/v1/bots/{bot_id}
{
    "ui_config_id": "uuid-of-ui-config"
}
```

### Embed Config Resolution
The public embed endpoint (`/public/embed-config`) resolves UI configuration in this order:
1. **UI Config Table** (if `bot.ui_config_id` is set)
2. **Branding JSONB** (fallback)
3. **Defaults** (if neither is available)

## SQL CREATE Statement

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
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ui_configs_user_id ON ui_configs(user_id);

-- Add foreign key to bots table
ALTER TABLE bots ADD COLUMN ui_config_id UUID REFERENCES ui_configs(id) ON DELETE SET NULL;
CREATE INDEX idx_bots_ui_config_id ON bots(ui_config_id);
```

## API Endpoints

### Private Endpoints (Authenticated)

- **POST** `/api/v1/ui-configs` - Create a new UI config
- **GET** `/api/v1/ui-configs` - List all UI configs for current user
- **GET** `/api/v1/ui-configs/{id}` - Get a specific UI config
- **PATCH** `/api/v1/ui-configs/{id}` - Update a UI config
- **DELETE** `/api/v1/ui-configs/{id}` - Delete a UI config

### Public Endpoints (No Authentication)

- **GET** `/public/embed-config?bot_id={bot_id}` - Get bot UI config for embedding
  - Uses `ui_config` if `bot.ui_config_id` is set
  - Falls back to `branding` JSONB if not set
  - Only works for ACTIVE bots

## Security

- **Tenant Isolation**: UI configs are scoped by `user_id`
- **Ownership Validation**: Users can only access/update their own UI configs
- **Bot Validation**: When assigning `ui_config_id` to a bot, system validates:
  - UI config exists
  - UI config belongs to the same user as the bot
  - Returns 400 error if validation fails

## Benefits

1. **Reusability**: One UI config can be shared across multiple bots
2. **Separation of Concerns**: UI configuration is separate from bot logic
3. **Backward Compatibility**: Bots can still use `branding` JSONB (fallback)
4. **Flexibility**: Users can create multiple UI themes and switch between them

## Migration Notes

- Existing bots will continue to work using `branding` JSONB
- New bots can optionally use `ui_config_id` for structured UI config
- Both approaches are supported simultaneously
- Embed endpoint automatically resolves to the best available config

