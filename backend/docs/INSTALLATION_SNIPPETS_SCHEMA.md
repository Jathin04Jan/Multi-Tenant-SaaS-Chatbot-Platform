# Installation Snippets Table Schema

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
| `name` | VARCHAR(255) | NULLABLE | Optional name/identifier (e.g., 'Production', 'Staging', 'v1.0') |
| `environment` | VARCHAR(50) | NULLABLE | Environment type: 'production', 'staging', 'development' |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT true | Whether this snippet is currently active/enabled |
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

2. **Why Both Foreign Keys?**
   - **Bot-specific**: Each bot needs its own embed code with unique bot ID
   - **User-level queries**: Users need to see all their snippets across bots
   - **Security**: Can verify user owns the bot before accessing snippet
   - **Flexibility**: Can query by user OR by bot

3. **Additional Fields Added:**
   - `name`: For organizing multiple snippets (production vs staging)
   - `environment`: Track which environment the snippet is for
   - `is_active`: Enable/disable snippets without deleting
   - `domain_whitelist`: Security - restrict where snippet can be used
   - `usage_count` & `last_used_at`: Analytics and tracking
   - `expires_at`: Time-limited snippets for testing/trials

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
    name VARCHAR(255),
    environment VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
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
CREATE INDEX idx_installation_snippets_is_active ON installation_snippets(is_active);
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
  "embed_code": "<!-- Add this before closing </body> tag -->\n<script \n  src=\"https://cdn.yourapp.com/widget.js\"\n  data-bot-id=\"a1b2c3d4-e5f6-7890-abcd-ef1234567890\"\n  async>\n</script>",
  "name": "Production",
  "environment": "production",
  "is_active": true,
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
  "embed_code": "<!-- Add this before closing </body> tag -->\n<script \n  src=\"https://cdn-staging.yourapp.com/widget-dev.js\"\n  data-bot-id=\"a1b2c3d4-e5f6-7890-abcd-ef1234567890\"\n  data-env=\"staging\"\n  async>\n</script>",
  "name": "Staging v2.0",
  "environment": "staging",
  "is_active": true,
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
  AND is_active = true 
  AND (expires_at IS NULL OR expires_at > NOW());
```

### Get all snippets for a user:
```sql
SELECT * FROM installation_snippets 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY created_at DESC;
```

### Get production snippet for a bot:
```sql
SELECT * FROM installation_snippets 
WHERE bot_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' 
  AND environment = 'production' 
  AND is_active = true
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

- **Many-to-One with User**: Multiple snippets belong to one user
- **Many-to-One with Bot**: Multiple snippets can belong to one bot (different environments/versions)
- **Cascade Delete**: 
  - Deleting a user deletes all their snippets
  - Deleting a bot deletes all its snippets

---

## 🎯 Use Cases

1. **Multiple Environments**: Same bot can have production, staging, and development snippets
2. **Version Control**: Track different versions of embed codes
3. **Security**: Domain whitelisting prevents unauthorized usage
4. **Analytics**: Track usage with `usage_count` and `last_used_at`
5. **Time-Limited Access**: Use `expires_at` for trial periods or temporary access
6. **A/B Testing**: Multiple active snippets for testing different implementations

---

## 🔐 Security Considerations

1. **Domain Whitelisting**: Restrict where snippets can be embedded
2. **Expiry Dates**: Automatically disable snippets after a certain date
3. **Active Flag**: Quickly disable snippets without deleting
4. **User Verification**: Always verify `user_id` matches authenticated user before access
5. **Bot Ownership**: Verify user owns the bot before creating/accessing snippets

