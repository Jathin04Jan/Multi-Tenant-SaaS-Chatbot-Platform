# App Settings Schema

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## 📊 `app_settings` Table

Stores global configuration and landing page content. These settings are **global**, not per-tenant. Only platform admins can create or modify entries.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `key` | VARCHAR(255) | PRIMARY KEY, NOT NULL, INDEXED | Namespaced key (e.g., 'landing.hero_title', 'brand.app_name', 'support.email') |
| `value` | JSONB | NOT NULL | Any JSON value (string, number, object, array, etc.) |
| `description` | TEXT | NULLABLE | Admin description of what this setting controls |
| `is_public` | BOOLEAN | NOT NULL, DEFAULT false | If true, this setting can be exposed via public API (e.g., landing page content) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

### Key Design Decisions

1. **Key-Value Store**: Simple key-value structure allows flexible configuration without schema changes.
2. **Namespaced Keys**: Keys use dot notation (e.g., `landing.hero_title`) for organization.
3. **JSONB Values**: Values can be any JSON type (string, number, object, array) for maximum flexibility.
4. **Public/Private**: `is_public` flag controls which settings can be exposed via public API.
5. **Admin-Only**: Only platform admins can create or modify app settings.

### Example Key Namespaces

#### Landing Page Settings
- `landing.hero_title` - Main hero section title
- `landing.hero_subtitle` - Hero section subtitle
- `landing.primary_cta_text` - Primary call-to-action button text
- `landing.feature_cards` - Array of feature card objects
- `landing.testimonials` - Array of testimonial objects

#### Branding Settings
- `brand.app_name` - Application name
- `brand.logo_url` - Main application logo URL
- `brand.favicon_url` - Favicon URL

#### System Settings
- `support.email` - Support email address
- `support.phone` - Support phone number
- `legal.terms_url` - Terms of service URL
- `legal.privacy_url` - Privacy policy URL

#### Feature Flags
- `features.enable_signup` - Enable/disable user signup
- `features.enable_oauth` - Enable/disable OAuth login
- `features.maintenance_mode` - Enable/disable maintenance mode

### Example Value Structures

#### String Value
```json
{
  "key": "landing.hero_title",
  "value": "Build AI-Powered Chatbots in Minutes"
}
```

#### Number Value
```json
{
  "key": "limits.max_file_size_mb",
  "value": 100
}
```

#### Object Value
```json
{
  "key": "landing.feature_cards",
  "value": [
    {
      "title": "Easy Setup",
      "description": "Get started in minutes",
      "icon": "rocket"
    },
    {
      "title": "Powerful AI",
      "description": "Built on GPT-4",
      "icon": "brain"
    }
  ]
}
```

#### Boolean Value
```json
{
  "key": "features.enable_signup",
  "value": true
}
```

---

## 📝 SQL CREATE Statement

```sql
CREATE TABLE app_settings (
    key VARCHAR(255) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_app_settings_key ON app_settings(key);
CREATE INDEX idx_app_settings_is_public ON app_settings(is_public);
```

---

## 💾 Example Records

### Landing Page Hero Title
```json
{
  "key": "landing.hero_title",
  "value": "Build AI-Powered Chatbots in Minutes",
  "description": "Main hero section title on landing page",
  "is_public": true,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Brand App Name
```json
{
  "key": "brand.app_name",
  "value": "YourBot",
  "description": "Application name displayed throughout the UI",
  "is_public": true,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Support Email (Private)
```json
{
  "key": "support.email",
  "value": "support@yourbot.com",
  "description": "Support email address (internal use only)",
  "is_public": false,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Feature Cards Array
```json
{
  "key": "landing.feature_cards",
  "value": [
    {
      "title": "Easy Setup",
      "description": "Get started in minutes with our intuitive wizard",
      "icon": "rocket",
      "color": "#6366f1"
    },
    {
      "title": "Powerful AI",
      "description": "Built on GPT-4 for intelligent conversations",
      "icon": "brain",
      "color": "#8b5cf6"
    },
    {
      "title": "Customizable",
      "description": "Brand your chatbot to match your identity",
      "icon": "palette",
      "color": "#ec4899"
    }
  ],
  "description": "Feature cards displayed on landing page",
  "is_public": true,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

## 🔐 Security & Access Control

### Public vs Private Settings

- **Public Settings** (`is_public = true`): Can be exposed via public API endpoints (e.g., landing page content)
- **Private Settings** (`is_public = false`): Only accessible to authenticated admin users (e.g., support email, internal configs)

### Access Control Rules

1. **Admin-Only Write**: Only platform admins can create or modify app settings
2. **Public Read**: Public API endpoints can only read settings where `is_public = true`
3. **Admin Read**: Admin API endpoints can read all settings (public and private)
4. **Sensitive Data**: Sensitive keys (API keys, secrets, internal configs) must have `is_public = false`

### Example Usage

#### Public API Endpoint (Landing Page)
```python
# GET /public/settings?keys=landing.hero_title,landing.hero_subtitle
# Only returns settings where is_public = true
```

#### Admin API Endpoint
```python
# GET /api/v1/admin/settings
# Returns all settings (public and private) for admin dashboard
```

---

## 🔗 Relationships & Usage

### App Settings ↔ Frontend / System

- **Landing Page**: Loads only keys with `is_public = true` (e.g., `landing.*`, `brand.*`)
- **Admin Dashboard**: Admin can manage all settings (public and private)
- **System Configuration**: Backend reads settings for internal configuration (e.g., `support.email`, `legal.*`)

### Key Naming Conventions

- Use dot notation for namespacing: `{category}.{setting_name}`
- Common categories: `landing`, `brand`, `support`, `legal`, `features`, `limits`
- Keep keys lowercase with underscores: `hero_title` not `heroTitle`

---

## 🎯 Best Practices

1. **Use Namespaces**: Organize keys by category (e.g., `landing.*`, `brand.*`)
2. **Document Keys**: Always provide a `description` for each setting
3. **Public vs Private**: Mark settings as public only if they're safe to expose
4. **Type Consistency**: Keep value types consistent (e.g., always use arrays for lists)
5. **Version Control**: Consider versioning for complex settings (e.g., `landing.feature_cards.v2`)

