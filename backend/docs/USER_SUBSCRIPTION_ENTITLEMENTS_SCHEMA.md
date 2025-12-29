# User Subscription Entitlements Schema

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## 📊 `user_subscription_entitlements` Table

Tracks per-user entitlement usage and consumption. This table records the actual quota, consumption, and balance for each entitlement type (storage, file_count, tokens, etc.) for a specific user's subscription.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique entitlement instance identifier |
| `user_id` | UUID | FOREIGN KEY → users.id, NOT NULL, INDEXED, CASCADE DELETE | Foreign key to users.id - the user who has this entitlement. **Must match** the `user_id` of the referenced `user_subscription` (enforced by database trigger). |
| `user_subscription_id` | UUID | FOREIGN KEY → user_subscriptions.id, NOT NULL, INDEXED, CASCADE DELETE | Foreign key to user_subscriptions.id - the user's subscription instance |
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

### Key Design Decisions

1. **One Row Per Category/Entitlement Per User Subscription**: UNIQUE constraint on `(user_subscription_id, category, entitlement)` ensures each user subscription can only have one entitlement record per category/entitlement combination. This prevents duplicate entitlements (e.g., you can't have two 'file'/'storage' entitlements for the same user subscription).

2. **User ID Validation**: Database trigger ensures `user_id` matches the `user_id` of the referenced `user_subscription`. This prevents data integrity issues where an entitlement could reference a subscription belonging to a different user. The trigger fires on INSERT and UPDATE of `user_id` or `user_subscription_id` columns.

3. **Per-User Tracking**: Tracks actual usage/consumption for each entitlement type per user subscription
   - One user can have multiple entitlement records (one per entitlement type)
   - Links to both user and user subscription for complete context

3. **Quota vs Consumption**: 
   - `quota` is the limit allocated to the user for this entitlement
   - `consumption` tracks how much has been used
   - Balance is computed (not stored) as `quota - consumption`

4. **Flexible Entitlement Types**: 
   - `entitlement` field allows any string (storage, file_count, tokens, api_calls, etc.)
   - `unit` field allows any unit (MB, count, GB, hours, etc.)
   - `category` enum provides grouping (file, chat, other)

5. **Performance Optimization**: 
   - Composite indexes on `(user_id, user_subscription_id)` and `(user_id, category)` for efficient queries
   - Indexes on foreign keys and category for fast lookups

6. **Data Integrity Constraints**:
   - **Check Constraints**: `consumption >= 0` and `quota >= 0` ensure non-negative values
   - **Trigger Validation**: PostgreSQL trigger validates that `user_id` matches the `user_id` of the referenced `user_subscription` to prevent data inconsistency

### Computed Properties (Not Database Columns)

The model provides three computed properties for convenience:

#### 1. `balance` Property
```python
@property
def balance(self) -> int:
    """Returns remaining balance = quota - consumption"""
    return self.quota - self.consumption
```

**Usage:**
```python
# In your code:
remaining = user_entitlement.balance
if remaining > 0:
    # User has remaining quota
    allow_action()
else:
    # User has exhausted quota
    block_action()
```

**Important:**
- **Not stored in database** - computed from `quota` and `consumption` columns
- Single source of truth: `quota` and `consumption` columns
- Can be negative if consumption exceeds quota

#### 2. `is_exceeded` Property
```python
@property
def is_exceeded(self) -> bool:
    """Returns True if consumption > quota"""
    return self.consumption > self.quota
```

**Usage:**
```python
# In your code:
if user_entitlement.is_exceeded:
    # User has exceeded their quota
    block_access()
    send_warning_email()
```

**Important:**
- **Not stored in database** - computed from `quota` and `consumption` columns
- Useful for access control and enforcement

#### 3. `usage_percentage` Property
```python
@property
def usage_percentage(self) -> float:
    """Returns percentage of quota used (0-100)"""
    if self.quota == 0:
        return 0.0
    return min(100.0, (self.consumption / self.quota) * 100.0)
```

**Usage:**
```python
# In your code:
usage = user_entitlement.usage_percentage
if usage > 80:
    # Warn user they're approaching limit
    send_warning_notification()
elif usage > 100:
    # User has exceeded quota
    block_access()
```

**Important:**
- **Not stored in database** - computed from `quota` and `consumption` columns
- Returns 0.0 if `quota == 0`
- Capped at 100.0 (can exceed if consumption > quota, but percentage is capped)

**Why Computed Properties?**
- ✅ Avoids storing redundant data (single source of truth)
- ✅ Prevents data inconsistency (computed from actual columns)
- ✅ Convenient for code readability
- ✅ No database overhead (computed in Python)

---

## 📝 SQL CREATE Statement

```sql
-- Uses existing entitlement_category enum (shared with entitlements table)
-- CREATE TYPE entitlement_category AS ENUM ('file', 'chat', 'other');

CREATE TABLE user_subscription_entitlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_subscription_id UUID NOT NULL REFERENCES user_subscriptions(id) ON DELETE CASCADE,
    category entitlement_category NOT NULL,
    entitlement VARCHAR(100) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    quota INTEGER NOT NULL DEFAULT 0,
    consumption INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Unique constraint: one row per user_subscription/category/entitlement combination
ALTER TABLE user_subscription_entitlements ADD CONSTRAINT uq_user_subscription_entitlements_user_subscription_category_entitlement UNIQUE (user_subscription_id, category, entitlement);

-- Check constraints: prevent negative consumption and quota
ALTER TABLE user_subscription_entitlements ADD CONSTRAINT chk_user_subscription_entitlements_consumption_non_negative CHECK (consumption >= 0);
ALTER TABLE user_subscription_entitlements ADD CONSTRAINT chk_user_subscription_entitlements_quota_non_negative CHECK (quota >= 0);

-- Trigger function: validates that user_id matches user_subscriptions.user_id
CREATE OR REPLACE FUNCTION validate_user_subscription_entitlement_user_id()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the user_id matches the user_id of the referenced user_subscription
    IF NOT EXISTS (
        SELECT 1 
        FROM user_subscriptions 
        WHERE id = NEW.user_subscription_id 
        AND user_id = NEW.user_id
    ) THEN
        RAISE EXCEPTION 'user_id mismatch: user_id (%) does not match user_subscriptions.user_id for user_subscription_id (%)',
            NEW.user_id, NEW.user_subscription_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: fires before INSERT or UPDATE to validate user_id consistency
CREATE TRIGGER trg_validate_user_subscription_entitlement_user_id
BEFORE INSERT OR UPDATE OF user_id, user_subscription_id
ON user_subscription_entitlements
FOR EACH ROW
EXECUTE FUNCTION validate_user_subscription_entitlement_user_id();

-- Create indexes
CREATE INDEX idx_user_subscription_entitlements_id ON user_subscription_entitlements(id);
CREATE INDEX idx_user_subscription_entitlements_user_id ON user_subscription_entitlements(user_id);
CREATE INDEX idx_user_subscription_entitlements_user_subscription_id ON user_subscription_entitlements(user_subscription_id);
CREATE INDEX idx_user_subscription_entitlements_category ON user_subscription_entitlements(category);
CREATE INDEX idx_user_subscription_entitlements_user_subscription ON user_subscription_entitlements(user_id, user_subscription_id);
CREATE INDEX idx_user_subscription_entitlements_user_category ON user_subscription_entitlements(user_id, category);
```

---

## 💾 Example Records

### Example 1: File Storage Entitlement
```json
{
  "id": "e1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_subscription_id": "u1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "category": "file",
  "entitlement": "storage",
  "unit": "MB",
  "quota": 10000,
  "consumption": 3500,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```
**Computed Properties:**
- `balance`: `6500` (quota - consumption = 10000 - 3500)
- `is_exceeded`: `False` (consumption <= quota)
- `usage_percentage`: `35.0` (3500 / 10000 * 100)

### Example 2: File Count Entitlement
```json
{
  "id": "e2b3c4d5-e6f7-8901-bcde-f12345678901",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_subscription_id": "u1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "category": "file",
  "entitlement": "file_count",
  "unit": "count",
  "quota": 100,
  "consumption": 75,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```
**Computed Properties:**
- `balance`: `25` (quota - consumption = 100 - 75)
- `is_exceeded`: `False` (consumption <= quota)
- `usage_percentage`: `75.0` (75 / 100 * 100)

### Example 3: Chat Tokens Entitlement (Exceeded)
```json
{
  "id": "e3b4c5d6-e7f8-9012-cdef-123456789012",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_subscription_id": "u1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "category": "chat",
  "entitlement": "tokens",
  "unit": "count",
  "quota": 10000,
  "consumption": 12500,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-20T10:30:00Z"
}
```
**Computed Properties:**
- `balance`: `-2500` (quota - consumption = 10000 - 12500)
- `is_exceeded`: `True` (consumption > quota)
- `usage_percentage`: `100.0` (capped at 100.0, even though actual usage is 125%)

---

## 🔍 Common Query Patterns

### Get all entitlements for a user:
```sql
SELECT * FROM user_subscription_entitlements 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY category, entitlement;
```

### Get entitlements for a user's active subscription:
```sql
SELECT use.* 
FROM user_subscription_entitlements use
JOIN user_subscriptions us ON use.user_subscription_id = us.id
WHERE use.user_id = '550e8400-e29b-41d4-a716-446655440000'
  AND us.status = 'active'
ORDER BY use.category, use.entitlement;
```

### Get entitlements that are exceeded:
```sql
SELECT * FROM user_subscription_entitlements 
WHERE consumption > quota
ORDER BY user_id, category;
```

### Get entitlements approaching limit (80%+ usage):
```sql
SELECT * FROM user_subscription_entitlements 
WHERE quota > 0
  AND (consumption::float / quota::float) >= 0.8
  AND consumption <= quota
ORDER BY (consumption::float / quota::float) DESC;
```

### Get user entitlement with subscription details:
```sql
SELECT 
    u.email as user_email,
    s.name as subscription_name,
    use.category,
    use.entitlement,
    use.unit,
    use.quota,
    use.consumption,
    (use.quota - use.consumption) as balance
FROM user_subscription_entitlements use
JOIN users u ON use.user_id = u.id
JOIN user_subscriptions us ON use.user_subscription_id = us.id
JOIN subscriptions s ON us.subscription_id = s.id
WHERE use.user_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY use.category, use.entitlement;
```

### Update consumption (increment usage):
```sql
UPDATE user_subscription_entitlements 
SET consumption = consumption + 100,
    updated_at = CURRENT_TIMESTAMP
WHERE id = 'e1b2c3d4-e5f6-7890-abcd-ef1234567890';
```

### Reset consumption (monthly reset):
```sql
UPDATE user_subscription_entitlements 
SET consumption = 0,
    updated_at = CURRENT_TIMESTAMP
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
  AND category = 'chat';
```

---

## 🔗 Relationships

- **Many-to-One with User**: Multiple entitlement records belong to one user
- **Many-to-One with Subscription**: Multiple entitlement records can reference one subscription plan
- **Cascade Delete**: 
  - Deleting a user deletes all their entitlement records
  - Deleting a subscription plan deletes all related user entitlement records

---

## 🎯 Use Cases

1. **Usage Tracking**: Track actual consumption of entitlements (storage used, files uploaded, tokens consumed, etc.)
2. **Access Control**: Check `balance` or `is_exceeded` before allowing actions
3. **Billing**: Track usage for billing purposes
4. **Quota Enforcement**: Enforce limits based on `quota` and `consumption`
5. **Usage Monitoring**: Monitor usage percentage to warn users approaching limits
6. **Reporting**: Generate usage reports for users and admins

---

## 🔐 Security & Access Control

- **User Ownership**: Always filter by `user_id` to ensure users can only see their own entitlements
- **Quota Enforcement**: Check `balance` or `is_exceeded` before allowing actions
- **Cascade Delete**: Deleting a user automatically removes all their entitlement records
- **Data Integrity**: Backend should validate that `consumption >= 0` and `quota >= 0`

---

## 💡 Best Practices

1. **Use Computed Properties**: Use `balance`, `is_exceeded`, and `usage_percentage` properties in code for readability
2. **Atomic Updates**: Use database transactions when updating consumption to prevent race conditions
3. **Quota Initialization**: Initialize entitlements when user subscribes (copy from subscription plan entitlements)
4. **Periodic Resets**: Reset consumption periodically (e.g., monthly) based on billing cycle
5. **Usage Monitoring**: Monitor usage percentage and warn users at thresholds (80%, 90%, 100%)
6. **Query Optimization**: Use indexes on `user_id`, `user_subscription_id`, and `category` for efficient queries

---

## 📊 Indexes

- **Primary Key**: `id` (UUID)
- **Foreign Key Indexes**: `user_id`, `user_subscription_id`
- **Category Index**: `category` (for filtering by category)
- **Composite Indexes**: 
  - `(user_id, user_subscription_id)` - for querying user's entitlements for a specific subscription
  - `(user_id, category)` - for querying user's entitlements by category

## 🔒 Constraints

- **Unique Constraint**: `(user_subscription_id, category, entitlement)` - ensures one entitlement record per user subscription/category/entitlement combination
- **Check Constraints**:
  - `consumption >= 0` - ensures consumption is non-negative
  - `quota >= 0` - ensures quota is non-negative
- **Trigger**: `trg_validate_user_subscription_entitlement_user_id` - validates that `user_id` matches the `user_id` of the referenced `user_subscription` before INSERT or UPDATE

---

## 🔄 Entitlement Lifecycle

1. **Initialization**: When user subscribes, create entitlement records based on subscription plan entitlements
   - Copy `category`, `entitlement`, `unit` from `entitlements` table
   - Set `quota` from subscription plan entitlements
   - Set `consumption = 0`

2. **Usage**: As user uses resources, increment `consumption`
   - File upload: increment storage consumption
   - Chat message: increment token consumption
   - Document upload: increment file_count consumption

3. **Monitoring**: Check `balance`, `is_exceeded`, and `usage_percentage` for access control
   - Block access if `is_exceeded == True`
   - Warn user if `usage_percentage > 80`

4. **Reset**: Periodically reset `consumption = 0` based on billing cycle
   - Monthly subscriptions: reset monthly
   - Yearly subscriptions: reset yearly

---

## ⚠️ Important Notes

- **Computed Properties**: `balance`, `is_exceeded`, and `usage_percentage` are Python `@property` methods, NOT database columns
- **Single Source of Truth**: Always use `quota` and `consumption` columns for database queries
- **Negative Balance**: `balance` can be negative if `consumption > quota` (user has exceeded quota)
- **Shared Enum**: Uses the same `entitlement_category` enum as the `entitlements` table
- **Atomic Updates**: Use database transactions when updating consumption to prevent race conditions
- **Check Constraints**: Database enforces `consumption >= 0` and `quota >= 0` at the database level
- **Trigger Validation**: The trigger automatically validates that `user_id` matches the `user_id` of the referenced `user_subscription` to prevent data inconsistency

---

## 🔄 Relationship with Other Tables

### `entitlements` Table
- **Purpose**: Defines what entitlements a subscription plan includes (template)
- **Relationship**: `user_subscription_entitlements` initializes from `entitlements` when user subscribes
- **Difference**: `entitlements` is a template (global), `user_subscription_entitlements` is per-user usage tracking

### `user_subscriptions` Table
- **Purpose**: Tracks user subscription instances (when user subscribes, status, dates)
- **Relationship**: `user_subscription_entitlements` links to `user_subscriptions` via `user_subscription_id` (FK to `user_subscriptions.id`)
- **Usage**: Check `user_subscriptions.status == 'active'` before allowing entitlement usage

### `subscriptions` Table
- **Purpose**: Defines subscription plans (Free, Pro, Enterprise, etc.)
- **Relationship**: `user_subscription_entitlements` links to `subscriptions` indirectly via `user_subscriptions.subscription_id`
- **Usage**: Initialize entitlements from subscription plan when user subscribes

