# User Subscriptions Schema

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

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

### Key Design Decisions

1. **Many-to-Many Relationship**: Links users to subscription plans, allowing:
   - One user to have multiple subscription records (subscription history)
   - One subscription plan to be used by many users
   - Tracking of subscription lifecycle (start, end, renewal)

2. **Date Fields**: Uses DATE type (not DATETIME) for start_date and end_date as specified

3. **Lifetime Subscriptions**: `end_date` can be NULL for lifetime subscriptions

4. **Auto-Renewal**: `auto_renew` flag controls whether subscription automatically renews at `end_date`

5. **Status Management**: Status enum provides clear lifecycle states (active, expired, cancelled)

6. **No Overlapping Active Subscriptions**: PostgreSQL exclusion constraint prevents overlapping date ranges for active subscriptions per user
   - Ensures only one active subscription per user at any given time
   - Prevents data integrity issues from bugs or race conditions
   - Uses `daterange` with GiST index for efficient range overlap checking
   - Only applies to `status = 'active'` subscriptions (expired/cancelled can overlap)
   - Handles NULL `end_date` as open-ended (infinity) for lifetime subscriptions

### Computed Properties (Not Database Columns)

The model provides two computed properties for convenience:

#### 1. `is_active` Property
```python
@property
def is_active(self) -> bool:
    """Returns True if status == 'active'"""
    return self.status.value == UserSubscriptionStatus.ACTIVE.value
```

**Usage:**
```python
# In your code:
if user_subscription.is_active:
    # Subscription is active
    grant_access()
```

**Important:**
- **Not stored in database** - computed from `status` column
- Single source of truth: `status` column
- Convenient helper for code readability

#### 2. `is_expired` Property
```python
@property
def is_expired(self) -> bool:
    """Returns True if end_date < today() (and end_date is not NULL)"""
    if self.end_date is None:
        return False  # Lifetime subscription
    return self.end_date < date.today()
```

**Usage:**
```python
# In your code:
if user_subscription.is_expired:
    # Subscription has expired
    revoke_access()
```

**Important:**
- **Not stored in database** - computed from `end_date` column
- Returns `False` for lifetime subscriptions (`end_date` is NULL)
- Convenient helper for checking expiration

**Why Computed Properties?**
- ✅ Avoids storing redundant data (single source of truth)
- ✅ Prevents data inconsistency (computed from actual columns)
- ✅ Convenient for code readability
- ✅ No database overhead (computed in Python)

---

## 📝 SQL CREATE Statement

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

-- Enable btree_gist extension for exclusion constraints with UUID
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Exclusion constraint: prevent overlapping date ranges for active subscriptions per user
-- This ensures only one active subscription per user at any given time
ALTER TABLE user_subscriptions 
ADD CONSTRAINT uq_user_subscriptions_no_overlap_active 
EXCLUDE USING GIST (
    user_id WITH =,
    daterange(start_date, COALESCE(end_date, 'infinity'::date), '[)') WITH &&
) WHERE (status = 'active'::user_subscription_status);
```

---

## 💾 Example Records

### Example 1: Active Monthly Subscription
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
**Computed Properties:**
- `is_active`: `True` (because `status == 'active'`)
- `is_expired`: `False` (because `end_date` is in the future)

### Example 2: Expired Subscription
```json
{
  "id": "u2b3c4d5-e6f7-8901-bcde-f12345678901",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "subscription_id": "p1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "expired",
  "start_date": "2023-01-01",
  "end_date": "2023-12-31",
  "auto_renew": false,
  "created_at": "2023-01-01T12:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```
**Computed Properties:**
- `is_active`: `False` (because `status == 'expired'`)
- `is_expired`: `True` (because `end_date < today()`)

### Example 3: Lifetime Subscription
```json
{
  "id": "u3b4c5d6-e7f8-9012-cdef-123456789012",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "subscription_id": "p1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "active",
  "start_date": "2024-01-01",
  "end_date": null,
  "auto_renew": false,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```
**Computed Properties:**
- `is_active`: `True` (because `status == 'active'`)
- `is_expired`: `False` (because `end_date` is NULL - lifetime subscription)

---

## 🔍 Common Query Patterns

### Get active subscriptions for a user:
```sql
SELECT * FROM user_subscriptions 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
  AND status = 'active'
ORDER BY start_date DESC;
```

### Get all subscriptions for a user (including history):
```sql
SELECT * FROM user_subscriptions 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY start_date DESC;
```

### Get subscriptions expiring soon:
```sql
SELECT * FROM user_subscriptions 
WHERE status = 'active'
  AND end_date IS NOT NULL
  AND end_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
ORDER BY end_date ASC;
```

### Get user subscription with plan details:
```sql
SELECT 
    u.email as user_email,
    u.company_name,
    s.name as subscription_name,
    us.status,
    us.start_date,
    us.end_date,
    us.auto_renew
FROM user_subscriptions us
JOIN users u ON us.user_id = u.id
JOIN subscriptions s ON us.subscription_id = s.id
WHERE us.user_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY us.start_date DESC;
```

### Get all active subscriptions with plan details:
```sql
SELECT 
    u.email as user_email,
    s.name as subscription_name,
    us.start_date,
    us.end_date,
    us.auto_renew
FROM user_subscriptions us
JOIN users u ON us.user_id = u.id
JOIN subscriptions s ON us.subscription_id = s.id
WHERE us.status = 'active'
ORDER BY u.email, us.start_date DESC;
```

---

## 🔗 Relationships

- **Many-to-One with User**: Multiple subscription instances belong to one user
- **Many-to-One with Subscription**: Multiple users can subscribe to one subscription plan
- **Cascade Delete**: 
  - Deleting a user deletes all their subscription instances
  - Deleting a subscription plan deletes all related user subscriptions

---

## 🎯 Use Cases

1. **Subscription Management**: Track when users subscribe to plans
2. **Subscription History**: Maintain complete history of user subscriptions
3. **Access Control**: Check active subscriptions to grant/revoke access
4. **Billing**: Track subscription periods for billing purposes
5. **Auto-Renewal**: Use `auto_renew` flag to handle automatic renewals
6. **Expiration Tracking**: Use `is_expired` property to check if subscription has expired

---

## 🔐 Security & Access Control

- **User Ownership**: Always filter by `user_id` to ensure users can only see their own subscriptions
- **Status Verification**: Check `status == 'active'` or use `is_active` property before granting access
- **Cascade Delete**: Deleting a user automatically removes all their subscription records
- **Date Validation**: Backend should validate that `start_date <= end_date` (or `end_date` is NULL)

---

## 💡 Best Practices

1. **Use Computed Properties**: Use `is_active` and `is_expired` properties in code for readability
2. **Status Management**: Always update `status` column, not computed properties
3. **Date Validation**: Validate `start_date` and `end_date` on creation/update
4. **Lifetime Subscriptions**: Set `end_date = NULL` for lifetime subscriptions
5. **Auto-Renewal**: Update `status` and `end_date` when auto-renewal occurs
6. **Query Optimization**: Use indexes on `user_id`, `status`, and date fields for efficient queries

---

## 📊 Indexes

- **Primary Key**: `id` (UUID)
- **Foreign Key Indexes**: `user_id`, `subscription_id`
- **Status Index**: `status` (for filtering active/expired subscriptions)
- **Date Indexes**: `start_date`, `end_date` (for date range queries)
- **Composite Indexes**: 
  - `(user_id, status)` - for querying user's active subscriptions
  - `(start_date, end_date)` - for date range queries

---

## 🔄 Subscription Lifecycle

1. **Creation**: User subscribes → `status = 'active'`, `start_date = today`, `end_date = start_date + billing_period`
2. **Active**: Subscription is active → `status = 'active'`, `is_active = True`
3. **Expiration**: End date passes → Backend updates `status = 'expired'` (or use `is_expired` property)
4. **Cancellation**: User cancels → `status = 'cancelled'`
5. **Renewal**: If `auto_renew = true`, create new subscription record or update existing one

---

## ⚠️ Important Notes

- **Computed Properties**: `is_active` and `is_expired` are Python `@property` methods, NOT database columns
- **Single Source of Truth**: Always use `status` column for status checks in database queries
- **Date Type**: Uses DATE (not DATETIME) for `start_date` and `end_date` as specified
- **Lifetime Subscriptions**: `end_date = NULL` means subscription never expires
- **Status vs Expiration**: `status` is manually set, `is_expired` is computed from `end_date`

