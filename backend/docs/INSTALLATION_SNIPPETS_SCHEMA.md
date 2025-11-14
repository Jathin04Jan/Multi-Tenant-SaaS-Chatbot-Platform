# Installation Snippets Table Schema

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## 📊 `installation_snippets` Table

Stores embed codes and script URLs for installing bots on customer websites. Each snippet is tied to a specific bot and user/tenant and integrates with the public endpoint (`GET /public/embed-config`) that only serves ACTIVE bots.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique snippet identifier |
| `user_id` | UUID | FOREIGN KEY → users.id, NOT NULL, INDEXED, CASCADE DELETE | Owner/tenant reference |
| `bot_id` | UUID | FOREIGN KEY → bots.id, NOT NULL, INDEXED, CASCADE DELETE | Bot reference - snippet is specific to this bot |
| `script_url` | TEXT | NULLABLE | CDN-hosted script URL (e.g., https://cdn.example.com/bot-script.js) |
| `embed_code` | TEXT | NOT NULL | Full JavaScript snippet for installation |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'active', INDEXED | Snippet status: 'active' | 'revoked' |
| `domain_whitelist` | JSONB | NULLABLE | List of allowed domains (null = no restrictions, stored as JSON array) |
| `usage_count` | INTEGER | NOT NULL, DEFAULT 0 | Number of times this snippet has been used/accessed (tracks widget loads + chat messages) |
| `last_used_at` | TIMESTAMP WITH TIME ZONE | NULLABLE | Timestamp when snippet was last accessed/used (updated on widget load and chat messages) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |
| `expires_at` | TIMESTAMP WITH TIME ZONE | NULLABLE | Optional expiry timestamp (null = never expires) |

### Key Design Decisions

1. **Dual Foreign Keys (`user_id` + `bot_id`)**
   - `user_id`: Enables user-level queries (get all snippets for a user)
   - `bot_id`: Links snippet to specific bot (each bot has its own embed code)
   - Both are required for data integrity and query flexibility
   - Both have CASCADE DELETE (deleting user/bot deletes snippets)

2. **Why Both Foreign Keys?**
   - **Bot-specific**: Each bot needs its own embed code with unique bot ID
   - **User-level queries**: Users need to see all their snippets across bots
   - **Security**: Can verify user owns the bot before accessing snippet
   - **Flexibility**: Can query by user OR by bot

3. **Additional Fields:**
   - `status`: Enable/disable snippets without deleting ('active' | 'revoked')
   - `domain_whitelist`: Security - restrict where snippet can be used
   - `usage_count` & `last_used_at`: Analytics and tracking
   - `expires_at`: Time-limited snippets for testing/trials

**Note:** `is_active` is a computed property (not a database column) derived from `status`:
- `status == 'active'` → `is_active = true`
- `status == 'revoked'` → `is_active = false`

**Note:** `name` and `environment` fields were removed as they were redundant:
- One snippet per bot is enforced, so environment distinction is unnecessary
- Bot name already identifies the snippet, so a separate name field is redundant

### JSONB Field Structures

#### `domain_whitelist` Structure:
```json
[
  "example.com",
  "www.example.com",
  "app.example.com",
  "*.example.com"
]
```
- `null` = No domain restrictions (can be used anywhere)
- Empty array `[]` = No domains allowed (effectively disabled)
- Array of strings = Only these domains can use the snippet

---

## 📝 SQL CREATE Statement

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

-- Composite index for common queries (user + bot)
CREATE INDEX idx_installation_snippets_user_bot ON installation_snippets(user_id, bot_id);
```

---

## 💾 Example Records

### Example 1: Production Snippet
```json
{
  "id": "s1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "bot_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "script_url": "https://cdn.yourapp.com/bot-script-v1.2.3.js",
  "embed_code": "<!-- Add this before closing </body> tag -->\n<script \n  src=\"https://api.yourapp.com/static/widget.js\"\n  data-snippet-id=\"s1b2c3d4-e5f6-7890-abcd-ef1234567890\"\n  async>\n</script>",
  "status": "active",
  "is_active": true,  // Computed from status (status == 'active')
  "domain_whitelist": ["example.com", "www.example.com"],
  "usage_count": 1250,
  "last_used_at": "2024-01-15T10:30:00Z",
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "expires_at": null
}
```

### Example 2: Staging Snippet (with expiry)
```json
{
  "id": "s2b3c4d5-e6f7-8901-bcde-f12345678901",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "bot_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "script_url": "https://cdn-staging.yourapp.com/bot-script-dev.js",
  "embed_code": "<!-- Add this before closing </body> tag -->\n<script \n  src=\"https://api-staging.yourapp.com/static/widget.js\"\n  data-snippet-id=\"s2b3c4d5-e6f7-8901-bcde-f12345678901\"\n  async>\n</script>",
  "status": "active",
  "is_active": true,  // Computed from status (status == 'active')
  "domain_whitelist": null,
  "usage_count": 45,
  "last_used_at": "2024-01-14T15:20:00Z",
  "created_at": "2024-01-10T08:00:00Z",
  "updated_at": "2024-01-14T15:20:00Z",
  "expires_at": "2024-02-01T00:00:00Z"
}
```

---

## 🔍 Common Query Patterns

### Get all active snippets for a bot:
```sql
SELECT * FROM installation_snippets 
WHERE bot_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' 
  AND status = 'active' 
  AND (expires_at IS NULL OR expires_at > NOW());
```

### Get all snippets for a user:
```sql
SELECT * FROM installation_snippets 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY created_at DESC;
```

### Get active snippet for a bot:
```sql
SELECT * FROM installation_snippets 
WHERE bot_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' 
  AND status = 'active'
LIMIT 1;
```

### Check if domain is whitelisted:
```sql
SELECT * FROM installation_snippets 
WHERE bot_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  AND (
    domain_whitelist IS NULL 
    OR 'example.com' = ANY(SELECT jsonb_array_elements_text(domain_whitelist))
  );
```

---

## 🔗 Relationships

- **Many-to-One with User**: Multiple snippets belong to one user (one per bot)
- **One-to-One with Bot**: Each bot has exactly one installation snippet (enforced by the system)
- **Cascade Delete**: 
  - Deleting a user deletes all their snippets
  - Deleting a bot deletes its snippet

---

## 🎯 Use Cases

1. **One Snippet Per Bot**: Each bot has exactly one installation snippet (enforced by the system)
2. **Security**: Domain whitelisting prevents unauthorized usage
3. **Analytics**: Track usage with `usage_count` and `last_used_at`
4. **Time-Limited Access**: Use `expires_at` for trial periods or temporary access
5. **Status Management**: Enable/disable snippets without deleting using `status` field

---

## 🔐 Security Considerations

1. **Domain Whitelisting**: Restrict where snippets can be embedded (validated on `/public/embed-config`)
2. **Status Field**: Use `status` field ('active' | 'revoked') for production-ready snippet management
3. **Expiry Dates**: Automatically disable snippets after a certain date
4. **Active Property**: `is_active` is computed from `status` (for backward compatibility in API responses)
5. **User Verification**: Always verify `user_id` matches authenticated user before access
6. **Bot Ownership**: Verify user owns the bot before creating/accessing snippets
7. **One Snippet Per Bot**: The system enforces one snippet per bot (existing snippets are updated, not duplicated)
8. **JWT Embed Tokens**: Short-lived tokens issued by `/public/embed-config` for secure chat API access
9. **Usage Tracking**: Tracks both widget loads and chat messages for accurate analytics

## 📊 Usage Tracking

The `usage_count` and `last_used_at` fields are updated in two scenarios:

1. **Widget Load**: When the widget loads and calls `/public/embed-config`, the usage count is incremented
2. **Chat Messages**: When a user sends a chat message via `/api/v1/chat`, the usage count is incremented again

This provides comprehensive analytics showing both installations and actual usage.

