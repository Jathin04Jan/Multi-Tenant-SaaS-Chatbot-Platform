# Final Database Schema

## 📊 `users` Table

**Note**: In this system, users are tenants. Each user account represents both a user and a tenant/organization.

### Complete Table Structure

| Column Name | Type | Constraints | Description |
|------------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL, INDEXED | Unique user/tenant identifier |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL, INDEXED | User email address (unique) |
| `hashed_password` | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| `full_name` | VARCHAR(255) | **NOT NULL** | User's full name (required) |
| `company_name` | VARCHAR(255) | **NOT NULL** | Organization/Company name (required) |
| `domain` | VARCHAR(255) | NULLABLE | Tenant domain (optional) |
| `status` | ENUM | NOT NULL, DEFAULT 'pending_verification' | User status: active, pending_verification, suspended |
| `plan` | VARCHAR(50) | NULLABLE | Subscription plan (free, pro, enterprise) |
| `is_verified` | BOOLEAN | NOT NULL, DEFAULT false | Email verification status |
| `settings` | JSONB | NULLABLE | Miscellaneous configuration (limits, billing IDs, etc.) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT now(), ON UPDATE | Last update timestamp |

### Status Enum Values
- **`active`** - User/tenant account is active and can log in
- **`pending_verification`** - Account created but email not verified (default)
- **`suspended`** - Account suspended, cannot log in

### Indexes
- **Primary Key**: `id` (UUID)
- **Unique Index**: `email`
- **Index**: `id`

---

## 📝 SQL CREATE Statement

```sql
-- Create enum type for user status
CREATE TYPE user_status AS ENUM ('active', 'pending_verification', 'suspended');

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    status user_status NOT NULL DEFAULT 'pending_verification',
    plan VARCHAR(50),
    is_verified BOOLEAN NOT NULL DEFAULT false,
    settings JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_id ON users(id);
```

---

## 💾 Example Record

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john.doe@acme.com",
  "hashed_password": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5r1Q8K4x5Y5Xq",
  "full_name": "John Doe",
  "company_name": "Acme Corporation",
  "domain": "acme.com",
  "status": "active",
  "plan": "pro",
  "is_verified": true,
  "settings": {
    "max_users": 100,
    "max_bots": 50,
    "billing_id": "cus_abc123",
    "features": ["advanced_analytics", "custom_branding"]
  },
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

## 🔐 Security Notes

- **Password**: Never stored in plain text, always hashed with bcrypt
- **Email**: Unique constraint prevents duplicate accounts
- **Status**: Controls account access (active, pending, suspended)
- **Settings**: JSONB allows flexible configuration storage

---

## 🎯 Key Points

1. **Single Table**: Users and tenants are the same entity
2. **Clear Naming**: `full_name` (person) vs `company_name` (organization)
3. **Status Control**: Enum-based status for account management
4. **Flexible Settings**: JSONB for miscellaneous configuration
5. **Multi-tenant Ready**: Each user is their own tenant
