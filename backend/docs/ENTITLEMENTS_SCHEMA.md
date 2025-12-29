# Entitlements Schema

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

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

### Key Design Decisions

1. **One Row Per Category/Entitlement Per Subscription**: UNIQUE constraint on `(subscription_id, category, entitlement)` ensures each subscription plan can only have one entitlement definition per category/entitlement combination. This prevents duplicate entitlements (e.g., you can't have two 'file'/'storage' entitlements for the same plan).
2. **Flexible Entitlement System**: The `entitlement` and `unit` fields are VARCHAR to allow for flexible entitlement types without schema changes.
3. **Category Grouping**: The `category` enum groups entitlements by type (file, chat, other) for easier querying and organization.
4. **One-to-Many Relationship**: One subscription can have multiple entitlements (e.g., storage size, file count, tokens, API calls).
5. **Integer Quota**: Quota is stored as INTEGER for simplicity. For fractional values (e.g., 0.5 GB), store in smaller units (e.g., 500 MB).

### Common Entitlement Examples

#### File Entitlements
```json
{
  "category": "file",
  "entitlement": "storage_size",
  "unit": "GB",
  "quota": 100
}
```
Grants 100 GB of file storage.

```json
{
  "category": "file",
  "entitlement": "file_count",
  "unit": "count",
  "quota": 1000
}
```
Grants ability to upload 1000 files.

#### Chat Entitlements
```json
{
  "category": "chat",
  "entitlement": "tokens",
  "unit": "count",
  "quota": 100000
}
```
Grants 100,000 tokens per month.

```json
{
  "category": "chat",
  "entitlement": "messages",
  "unit": "count",
  "quota": 10000
}
```
Grants 10,000 messages per month.

#### Other Entitlements
```json
{
  "category": "other",
  "entitlement": "api_calls",
  "unit": "count",
  "quota": 50000
}
```
Grants 50,000 API calls per month.

---

## 📝 SQL CREATE Statement

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

-- Unique constraint: one row per subscription/category/entitlement combination
ALTER TABLE entitlements ADD CONSTRAINT uq_entitlements_subscription_category_entitlement UNIQUE (subscription_id, category, entitlement);

-- Create indexes
CREATE INDEX idx_entitlements_id ON entitlements(id);
CREATE INDEX idx_entitlements_subscription_id ON entitlements(subscription_id);
CREATE INDEX idx_entitlements_category ON entitlements(category);
```

---

## 💾 Example Records

### Example 1: File Storage Entitlement
```json
{
  "id": "e1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "subscription_id": "p1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "category": "file",
  "entitlement": "storage_size",
  "unit": "GB",
  "quota": 100,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Example 2: Chat Tokens Entitlement
```json
{
  "id": "e2b3c4d5-e6f7-8901-bcde-f12345678901",
  "subscription_id": "p1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "category": "chat",
  "entitlement": "tokens",
  "unit": "count",
  "quota": 100000,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Example 3: File Count Entitlement
```json
{
  "id": "e3b4c5d6-e7f8-9012-cdef-123456789012",
  "subscription_id": "p1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "category": "file",
  "entitlement": "file_count",
  "unit": "count",
  "quota": 1000,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

## 🔍 Common Query Patterns

### Get all entitlements for a subscription:
```sql
SELECT * FROM entitlements 
WHERE subscription_id = 'p1b2c3d4-e5f6-7890-abcd-ef1234567890'
ORDER BY category, entitlement;
```

### Get file-related entitlements:
```sql
SELECT * FROM entitlements 
WHERE subscription_id = 'p1b2c3d4-e5f6-7890-abcd-ef1234567890'
  AND category = 'file';
```

### Get storage size entitlement:
```sql
SELECT * FROM entitlements 
WHERE subscription_id = 'p1b2c3d4-e5f6-7890-abcd-ef1234567890'
  AND category = 'file'
  AND entitlement = 'storage_size';
```

### Get all subscriptions with their entitlements:
```sql
SELECT 
    s.name as subscription_name,
    e.category,
    e.entitlement,
    e.unit,
    e.quota
FROM subscriptions s
LEFT JOIN entitlements e ON s.id = e.subscription_id
ORDER BY s.name, e.category, e.entitlement;
```

---

## 🔗 Relationships

- **Many-to-One with Subscription**: Multiple entitlements belong to one subscription plan
- **Cascade Delete**: Deleting a subscription plan deletes all its entitlements

---

## 🎯 Use Cases

1. **Plan Limits Enforcement**: Backend uses entitlements to enforce plan limits when tenants use the system
2. **Flexible Configuration**: Allows adding new entitlement types without schema changes
3. **Multi-Dimensional Limits**: Supports multiple types of limits per subscription (storage, files, tokens, etc.)
4. **Easy Querying**: Category enum makes it easy to query entitlements by type

---

## 🔐 Security & Access Control

- **Admin-Only**: Only platform admins can create or modify entitlements
- **Global Scope**: Entitlements are global, not per-tenant
- **Backend Enforcement**: Backend reads entitlements to enforce limits when tenants perform actions
- **Cascade Delete**: Deleting a subscription automatically removes all its entitlements

---

## 💡 Best Practices

1. **Use Consistent Naming**: Use consistent entitlement names (e.g., 'storage_size', 'file_count', 'tokens')
2. **Standard Units**: Use standard units (MB, GB, count, hours, etc.) for consistency
3. **Integer Quotas**: Store quotas as integers. For fractional values, use smaller units (e.g., 500 MB instead of 0.5 GB)
4. **Category Organization**: Group related entitlements by category for easier management
5. **Document Entitlements**: Document what each entitlement type means and how it's enforced

