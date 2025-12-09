# Global Configuration Tables

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## Overview

This document describes the three global configuration tables added to the platform:

1. **`pricing_plans`** - Subscription plans (Free, Pro, Enterprise, etc.)
2. **`pricing_plan_country_prices`** - Country/region-specific pricing for each plan
3. **`app_settings`** - Global application settings and landing page content

These tables are **global** (not per-tenant) and are **admin-only** (only platform admins can create or modify entries).

---

## What Was Added

### 1. Pricing Plans System

**Purpose**: Manage subscription plans that can be offered to tenants.

**Tables**:
- `pricing_plans` - Stores plan definitions (name, description, limits, features, etc.)
- `pricing_plan_country_prices` - Stores country/region-specific pricing for each plan

**Key Features**:
- Global plans (not per-tenant)
- Flexible limits stored as JSONB (e.g., `{ "max_bots": 1, "max_docs": 20 }`)
- Country-based pricing support
- Monthly and yearly billing intervals
- Support level tracking (None, email, call, priority, etc.)
- Feature lists for UI display

**Usage**:
- Tenants reference plans (e.g., via `users.plan` field or future `subscriptions` table)
- Backend enforces limits via `plan.limits` when tenants use the system
- Frontend displays plans on pricing/landing page

### 2. App Settings System

**Purpose**: Store global configuration and landing page content.

**Table**: `app_settings`

**Key Features**:
- Key-value store with namespaced keys (e.g., `landing.hero_title`, `brand.app_name`)
- JSONB values (can store strings, numbers, objects, arrays)
- Public/private flag (`is_public`) for security
- Admin-only write access
- Public API can read only `is_public = true` settings

**Usage**:
- Landing page loads public settings (e.g., `landing.*`, `brand.*`)
- Admin dashboard manages all settings (public and private)
- Backend reads settings for internal configuration (e.g., `support.email`, `legal.*`)

---

## Implementation Details

### Files Created

1. **Models**:
   - `backend/app/models/pricing_plan.py` - PricingPlan model
   - `backend/app/models/pricing_plan_country_price.py` - PricingPlanCountryPrice model
   - `backend/app/models/app_setting.py` - AppSetting model

2. **Documentation**:
   - `backend/docs/PRICING_PLANS_SCHEMA.md` - Complete pricing plans schema documentation
   - `backend/docs/APP_SETTINGS_SCHEMA.md` - Complete app settings schema documentation
   - `backend/docs/GLOBAL_CONFIGURATION_TABLES.md` - This file (overview)

### Files Updated

1. **Model Registration**:
   - `backend/app/models/__init__.py` - Added exports for new models
   - `backend/app/main.py` - Added imports to register models with SQLAlchemy Base
   - `backend/reset_db.py` - Added imports so tables are included in database reset

2. **Documentation**:
   - `backend/docs/DATABASE_SCHEMA.md` - Updated tables overview
   - `backend/docs/FINAL_SCHEMA.md` - Updated tables overview and summary
   - `backend/docs/README.md` - Added links to new schema documentation

---

## Database Schema

### Pricing Plans Table
```sql
CREATE TABLE pricing_plans (
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
```

### Pricing Plan Country Prices Table
```sql
CREATE TABLE pricing_plan_country_prices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES pricing_plans(id) ON DELETE CASCADE,
    country_code VARCHAR(10) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    billing_interval VARCHAR(20) NOT NULL,
    price INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### App Settings Table
```sql
CREATE TABLE app_settings (
    key VARCHAR(255) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

## Security & Access Control

### Admin-Only Access

- **Pricing Plans**: Only platform admins can create or modify pricing plans
- **App Settings**: Only platform admins can create or modify app settings
- **Tenants**: Can only read/reference plans and public settings (cannot modify)

### Public vs Private Settings

- **Public Settings** (`is_public = true`): Can be exposed via public API (e.g., landing page)
- **Private Settings** (`is_public = false`): Only accessible to authenticated admin users

---

## Next Steps

These tables are now ready for use. To implement the full functionality:

1. **Create Admin API Endpoints** (future):
   - `POST /api/v1/admin/pricing-plans` - Create pricing plan
   - `GET /api/v1/admin/pricing-plans` - List all plans
   - `PATCH /api/v1/admin/pricing-plans/{plan_id}` - Update plan
   - `POST /api/v1/admin/pricing-plans/{plan_id}/prices` - Add country price
   - `GET /api/v1/public/pricing-plans` - Public endpoint for landing page
   - `GET /api/v1/public/settings` - Public endpoint for landing page settings
   - `GET /api/v1/admin/settings` - Admin endpoint for all settings
   - `PUT /api/v1/admin/settings/{key}` - Update setting

2. **Frontend Integration** (future):
   - Display pricing plans on landing page
   - Load landing page content from app settings
   - Admin dashboard for managing plans and settings

3. **Backend Enforcement** (future):
   - Check plan limits when tenants create bots, upload documents, etc.
   - Enforce subscription status before allowing actions

---

## Related Documentation

- [Pricing Plans Schema](./PRICING_PLANS_SCHEMA.md) - Complete pricing plans schema documentation
- [App Settings Schema](./APP_SETTINGS_SCHEMA.md) - Complete app settings schema documentation
- [Database Schema](./DATABASE_SCHEMA.md) - Complete database schema overview
- [Final Schema](./FINAL_SCHEMA.md) - Final database schema reference

