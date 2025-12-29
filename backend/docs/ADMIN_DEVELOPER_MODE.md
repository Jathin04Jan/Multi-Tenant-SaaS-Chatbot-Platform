# Admin Authentication & Developer Mode

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## Overview

The platform includes a comprehensive admin interface for managing master/global tables through a user-friendly Developer Mode UI. This allows platform administrators to manage subscriptions, entitlements, country pricing, and app settings without writing SQL or JSON.

## 🔐 Admin Authentication

### Development Mode (Default)

By default, the system allows **any credentials** for admin login (development mode). This makes it easy to test and develop without strict authentication requirements.

**Configuration:**
```env
ADMIN_ALLOW_ANY_CREDENTIALS=True
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

**How it works:**
- Any email/password combination will work for admin signin
- The system automatically creates a user account if it doesn't exist
- All authenticated users can access admin endpoints in development mode

### Production Mode

For production, you should restrict admin access to specific credentials:

**Configuration:**
```env
ADMIN_ALLOW_ANY_CREDENTIALS=False
ADMIN_EMAIL=your-admin@example.com
ADMIN_PASSWORD=your-secure-password
```

**How it works:**
- Only users with matching `ADMIN_EMAIL` can sign in as admin
- Only users with matching `ADMIN_EMAIL` can access admin API endpoints
- Provides secure access control for production environments

### Admin Signin Endpoint

**POST** `/api/v1/auth/admin/signin`

Authenticate as an admin user and receive a JWT token.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Usage:**
1. Sign in through the admin UI at `/admin/signin`
2. Or use the API endpoint directly
3. Store the `access_token` for subsequent API requests
4. Include token in `Authorization: Bearer <token>` header

## 🛠️ Developer Mode UI

The Developer Mode interface provides a user-friendly way to manage all master tables through a web interface.

### Accessing Developer Mode

1. **Sign in as Admin:**
   - Navigate to `/admin/signin`
   - Enter any credentials (development) or admin credentials (production)
   - Click "Sign in"

2. **Navigate to Developer Mode:**
   - In the admin sidebar, click "Developer Mode"
   - You'll see four tabs: Subscriptions, Entitlements, Country Prices, App Settings

### Features

#### 1. Subscriptions Tab

Manage subscription plans (Free, Pro, Enterprise, etc.).

**Create/Edit Subscription:**
- **Name**: Plan name (e.g., "Free", "Pro", "Enterprise")
- **Description**: Plan description
- **Support Level**: Support tier (e.g., "email", "priority", "dedicated")
- **Limits**: 
  - Max Bots (leave empty for unlimited)
  - Max Documents (leave empty for unlimited)
  - Max Storage in MB (leave empty for unlimited)
- **Features**: Dynamic list of features
  - Type a feature and click "Add" or press Enter
  - Remove features with the X button
- **Highlighted**: Toggle to mark as "Most Popular"

**No JSON Required!** All fields are converted to JSON automatically.

#### 2. Entitlements Tab

Manage entitlements for each subscription plan.

**Create/Edit Entitlement:**
- **Subscription**: Select the subscription plan
- **Category**: Choose from "file", "chat", or "other"
- **Entitlement**: Type (e.g., "storage", "tokens", "api_calls")
- **Unit**: Unit of measurement (e.g., "MB", "count", "GB")
- **Quota**: Limit value (integer)

**Example:**
- Category: `file`
- Entitlement: `storage`
- Unit: `GB`
- Quota: `100`

#### 3. Country Prices Tab

Manage country/region-specific pricing for subscription plans.

**Create/Edit Country Price:**
- **Subscription**: Select the subscription plan
- **Country Code**: ISO country code (e.g., "US", "GB", "IN")
- **Currency**: Currency code (e.g., "USD", "GBP", "INR")
- **Billing Interval**: "monthly" or "yearly"
- **Price**: Price in smallest currency unit (cents/paisa)
  - Example: $9.99 = 999 cents
- **Active**: Toggle to enable/disable this price

#### 4. App Settings Tab

Manage global application settings and landing page content.

**Create/Edit App Setting:**
- **Key**: Namespaced key (e.g., "landing.hero_title", "features.list")
- **Value**: Any JSON value (string, number, boolean, object, array)
  - Can enter as JSON or plain text (auto-parsed)
- **Description**: Admin description of what this setting controls
- **Public**: Toggle to expose via public API

**Example Settings:**
- `landing.hero_title`: "Welcome to Our Platform"
- `features.list`: `["Feature 1", "Feature 2", "Feature 3"]`
- `pricing.show_comparison`: `true`

## 📡 Admin API Endpoints

All admin endpoints require authentication via JWT token (obtained from `/api/v1/auth/admin/signin`).

### Subscriptions

- **GET** `/api/v1/admin/subscriptions` - List all subscription plans
- **POST** `/api/v1/admin/subscriptions` - Create a new subscription plan
- **GET** `/api/v1/admin/subscriptions/{id}` - Get a specific subscription plan
- **PATCH** `/api/v1/admin/subscriptions/{id}` - Update a subscription plan
- **DELETE** `/api/v1/admin/subscriptions/{id}` - Delete a subscription plan

### Entitlements

- **GET** `/api/v1/admin/subscriptions/{subscription_id}/entitlements` - List entitlements for a plan
- **POST** `/api/v1/admin/subscriptions/{subscription_id}/entitlements` - Create an entitlement
- **PATCH** `/api/v1/admin/entitlements/{id}` - Update an entitlement
- **DELETE** `/api/v1/admin/entitlements/{id}` - Delete an entitlement

### Country Prices

- **GET** `/api/v1/admin/subscriptions/{subscription_id}/country-prices` - List prices for a plan
- **POST** `/api/v1/admin/subscriptions/{subscription_id}/country-prices` - Create a country price
- **PATCH** `/api/v1/admin/country-prices/{id}` - Update a country price
- **DELETE** `/api/v1/admin/country-prices/{id}` - Delete a country price

### App Settings

- **GET** `/api/v1/admin/app-settings` - List all app settings
- **GET** `/api/v1/admin/app-settings/{key}` - Get a specific setting
- **POST** `/api/v1/admin/app-settings` - Create a new setting
- **PATCH** `/api/v1/admin/app-settings/{key}` - Update a setting
- **DELETE** `/api/v1/admin/app-settings/{key}` - Delete a setting

## 🔒 Security

### Development Mode Security

- **Any credentials work** - Convenient for development
- **Any authenticated user** can access admin endpoints
- **Not suitable for production** - Use only in development/staging

### Production Mode Security

- **Restricted credentials** - Only `ADMIN_EMAIL` can sign in
- **Restricted access** - Only admin users can access admin endpoints
- **JWT tokens** - Secure token-based authentication
- **Token expiration** - Tokens expire after configured time

### Best Practices

1. **Never commit `.env` files** - Contains sensitive credentials
2. **Use strong passwords** in production
3. **Set `ADMIN_ALLOW_ANY_CREDENTIALS=False`** in production
4. **Rotate admin passwords** periodically
5. **Monitor admin access** logs
6. **Use HTTPS** in production

## 🚀 Quick Start

### 1. Configure Admin Access

Add to your `.env` file:

```env
# Admin Configuration
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
ADMIN_ALLOW_ANY_CREDENTIALS=True  # Set to False in production
```

### 2. Sign In as Admin

1. Navigate to `/admin/signin`
2. Enter credentials (any credentials work in development)
3. Click "Sign in"

### 3. Access Developer Mode

1. Click "Developer Mode" in the admin sidebar
2. Start managing master tables through the UI

### 4. Create Your First Subscription

1. Go to "Subscriptions" tab
2. Click "Create Subscription"
3. Fill in the form:
   - Name: "Free"
   - Description: "Free plan for getting started"
   - Max Bots: 1
   - Max Documents: 10
   - Add features: "1 bot", "10 documents", "Community support"
4. Click "Save"

### 5. Add Entitlements

1. Go to "Entitlements" tab
2. Select the subscription plan
3. Click "Create Entitlement"
4. Fill in:
   - Category: "file"
   - Entitlement: "storage"
   - Unit: "MB"
   - Quota: 100
5. Click "Save"

## 📝 Example Workflow

### Creating a Complete Subscription Plan

1. **Create Subscription:**
   - Name: "Pro"
   - Description: "For growing businesses"
   - Support Level: "email"
   - Max Bots: 5
   - Max Documents: 100
   - Features: "5 bots", "100 documents", "Email support", "Advanced analytics"
   - Highlighted: Yes

2. **Add Entitlements:**
   - Storage: 10 GB (file category)
   - File Count: 100 (file category)
   - Tokens: 100,000 (chat category)

3. **Add Country Prices:**
   - US: $29/month (USD, monthly)
   - US: $290/year (USD, yearly)
   - GB: £25/month (GBP, monthly)
   - IN: ₹2,000/month (INR, monthly)

4. **Add App Settings:**
   - `pricing.pro_plan_id`: UUID of the Pro plan
   - `features.pro_features`: `["Feature 1", "Feature 2"]`

## 🔍 Troubleshooting

### Can't Sign In as Admin

1. Check `.env` file has `ADMIN_EMAIL` and `ADMIN_PASSWORD` set
2. In development, `ADMIN_ALLOW_ANY_CREDENTIALS=True` allows any credentials
3. Check backend server is running
4. Check browser console for errors

### Can't Access Admin Endpoints

1. Verify you're signed in (check localStorage for `access_token`)
2. Check token is included in API requests (`Authorization: Bearer <token>`)
3. In production, verify your email matches `ADMIN_EMAIL`
4. Check backend logs for authentication errors

### Developer Mode Not Showing

1. Verify you're signed in as admin
2. Check the route is `/admin/developer-mode`
3. Check browser console for errors
4. Verify frontend is running and connected to backend

## 📚 Related Documentation

- **[GLOBAL_CONFIGURATION_TABLES.md](./GLOBAL_CONFIGURATION_TABLES.md)** - Overview of master tables
- **[ENTITLEMENTS_SCHEMA.md](./ENTITLEMENTS_SCHEMA.md)** - Entitlements table schema
- **[USER_SUBSCRIPTIONS_SCHEMA.md](./USER_SUBSCRIPTIONS_SCHEMA.md)** - User subscriptions schema
- **[APP_SETTINGS_SCHEMA.md](./APP_SETTINGS_SCHEMA.md)** - App settings schema
- **[SECURITY.md](./SECURITY.md)** - Security features and best practices

