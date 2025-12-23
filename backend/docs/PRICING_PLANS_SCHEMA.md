# Pricing Plans Schema

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## 📊 `subscriptions` Table

Stores all subscription plans that can be offered to tenants (Free, Pro, Enterprise, custom, etc.). These are **global** plans, not per-tenant. Only platform admins can create or modify entries.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique plan ID |
| `name` | TEXT | NOT NULL | Display name (e.g., 'Free', 'Pro', 'Enterprise') |
| `description` | TEXT | NULLABLE | Short tagline/description |
| `is_highlighted` | BOOLEAN | NOT NULL, DEFAULT false | Mark as "Most Popular" in UI |
| `sort_order` | JSONB | NULLABLE | Ordering configuration for UI display |
| `limits` | JSONB | NULLABLE | Plan limits (e.g., { "max_bots": 1, "max_docs": 20, "max_chats_per_month": 1000 }) |
| `support_level` | VARCHAR(50) | NULLABLE | Support level (None, email, call, priority, etc.) |
| `features` | JSONB | NULLABLE | List of features (e.g., ["Unlimited chats", "Priority support", "Custom branding"]) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

### Key Design Decisions

1. **Global Plans**: Plans are global, not per-tenant. All tenants can reference the same set of plans.
2. **Admin-Only**: Only platform admins can create or modify pricing plans.
3. **Flexible Limits**: `limits` JSONB allows for flexible plan configurations without schema changes.
4. **Feature Lists**: `features` JSONB stores an array of feature strings for easy UI rendering.

### Example `limits` JSONB Structure:
```json
{
  "max_bots": 1,
  "max_docs": 20,
  "max_chats_per_month": 1000,
  "max_storage_gb": 5,
  "max_users": 1
}
```

### Example `features` JSONB Structure:
```json
[
  "Unlimited chats",
  "Priority support",
  "Custom branding",
  "Advanced analytics",
  "API access"
]
```

### Example `sort_order` JSONB Structure:
```json
{
  "position": 1,
  "category": "standard"
}
```

---

## 📊 `pricing_plan_country_prices` Table

Stores pricing per country/region for each plan. Allows different pricing for different markets (e.g., India vs. US vs. EU).

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique row ID |
| `plan_id` | UUID | FOREIGN KEY → subscriptions.id, NOT NULL, INDEXED, CASCADE DELETE | Maps price to plan |
| `country_code` | VARCHAR(10) | NOT NULL, INDEXED | Country/region code (e.g., 'IN-SOUTH', 'US-CENTRAL', 'EU-WEST') |
| `currency` | VARCHAR(10) | NOT NULL | Currency code (e.g., 'USD', 'INR', 'EUR') |
| `billing_interval` | VARCHAR(20) | NOT NULL | Billing interval: 'monthly' or 'yearly' |
| `price` | INTEGER | NOT NULL | Price in smallest currency unit (e.g., cents for USD, paise for INR) |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT true | Enable/disable this price |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

### Key Design Decisions

1. **Country-Based Pricing**: Supports different prices for different regions/countries.
2. **Currency Support**: Stores currency code separately from price.
3. **Billing Intervals**: Supports both monthly and yearly billing.
4. **Price Storage**: Price stored as integer in smallest currency unit (avoids floating-point issues).
5. **Active/Inactive**: `is_active` allows disabling prices without deleting records.

### Relationships

- **Many-to-One**: Multiple country prices belong to one pricing plan
- **Cascade Delete**: Deleting a pricing plan deletes all its country prices

---

## 📝 SQL CREATE Statements

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
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

CREATE INDEX idx_subscriptions_id ON subscriptions(id);
CREATE INDEX idx_subscriptions_is_highlighted ON subscriptions(is_highlighted);
```

### Pricing Plan Country Prices Table
```sql
CREATE TABLE pricing_plan_country_prices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
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

---

## 💾 Example Records

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

---

## 🔐 Security & Access Control

- **Admin-Only**: Only platform admins can create or modify pricing plans
- **Global Scope**: Plans are global, not per-tenant
- **Tenant Reference**: Tenants reference plans (e.g., via subscriptions table) but cannot modify them
- **Backend Enforcement**: Backend enforces limits via `plan.limits` when tenants use the system

---

## 🔗 Relationships & Usage

### Subscriptions ↔ Tenants
- Plans are global
- Tenants reference a plan (e.g., via `users.plan` field)
- Backend enforces limits via `plan.limits` when tenants create bots, upload documents, etc.

### Subscriptions ↔ Country Prices
- One pricing plan can have multiple country prices (one per country/region)
- Country prices are filtered by `country_code` and `billing_interval` when displaying pricing
- Only active prices (`is_active = true`) are shown to users

