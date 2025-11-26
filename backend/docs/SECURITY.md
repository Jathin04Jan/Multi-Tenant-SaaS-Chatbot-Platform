# Security Implementation

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## ✅ JWT Authentication

The backend uses **JWT (JSON Web Tokens)** for secure authentication.

### Implementation Details

1. **Token Creation** (`app/core/security.py`):
   - Uses `python-jose` library for JWT encoding/decoding
   - Tokens signed with `SECRET_KEY` using HS256 algorithm
   - Default expiration: 7 days (configurable via `ACCESS_TOKEN_EXPIRE_MINUTES`)
   - Tokens include user ID (`sub`) and email

2. **Token Validation** (`app/api/dependencies.py`):
   - `get_current_user()` dependency validates tokens
   - Extracts user ID from token payload
   - Verifies user exists and is active
   - Used to protect routes that require authentication

3. **Protected Routes**:
   - `/api/v1/auth/me` - Requires valid JWT token
   - Any route using `Depends(get_current_user)` is protected

### Security Features

- ✅ **Password Hashing**: bcrypt with automatic salt generation
- ✅ **JWT Tokens**: Signed and verified tokens
- ✅ **Token Expiration**: Tokens expire after configured time
- ✅ **User Validation**: Active user check on every request
- ✅ **Secure Headers**: Proper HTTP exception handling

## 🔒 Database Security

### PostgreSQL Connection

**✅ Using Docker Container Only**

The backend is configured to connect to PostgreSQL running in the Docker container:

```python
# Default connection (from docker-compose.yml)
DATABASE_URL=postgresql://yourbot_user:yourbot_password@localhost:5433/yourbot_db
```

**Important**: 
- The connection uses `localhost:5433` (mapped from container port 5432)
- No local PostgreSQL instance is used
- All database operations go through the Docker container
- Port 5433 is used to avoid conflicts with local PostgreSQL installations

### Connection Pooling

- **Pool Size**: 10 connections
- **Max Overflow**: 20 connections
- **Pre-ping**: Enabled (verifies connections before use)
- **Connection Timeout**: Automatic retry on failure

## 🔐 Environment Variables Security

All sensitive credentials are stored in `.env` file (gitignored):

- `SECRET_KEY` - JWT signing key (must be strong in production)
- `DATABASE_URL` - Database connection string
- `MINIO_ACCESS_KEY` - MinIO access credentials
- `MINIO_SECRET_KEY` - MinIO secret credentials

**⚠️ Never commit `.env` to Git!**

## 🛡️ Best Practices

1. **Generate Strong Secret Keys**:
   ```bash
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```

2. **Use HTTPS in Production**: Always use SSL/TLS in production

3. **Token Expiration**: Keep token expiration reasonable (default: 7 days)

4. **Password Requirements**: Enforced via Pydantic validation (min 8 characters)

5. **CORS Configuration**: Restrict origins to your frontend domains only

## 🖼️ Branding & Avatar Security

Brand assets (logos/avatars) flow through a tenant-scoped pipeline:

1. **Authenticated upload** (`POST /api/v1/uploads/logo`) validates extension, MIME type, and size (≤10 MB) before writing to MinIO under `brand-logos/{tenant_id}/…` and merging metadata into `bot.branding`.
2. **Config normalization** (`/public/embed-config`) rewrites relative or localhost URLs so the widget always receives absolute HTTPS links tied to the current API host, and only ACTIVE bots pass validation.
3. **Controlled delivery** (`GET /api/v1/uploads/logo/{encoded_key}`) streams bytes from MinIO, now with `Access-Control-Allow-Origin: *` to support embeds on any customer domain, while still keeping MinIO credentials private.

**Hardening backlog**

- Inspect magic bytes (and optionally virus-scan) before persisting uploaded files.
- Add cache-busting/version hashes when logo metadata changes so avatars refresh instantly.
- Consider signed/time-limited URLs if brand assets should not remain publicly accessible forever.
- Apply rate limiting to `/api/v1/uploads/logo` to prevent brute-force or spam uploads.

See [APPLICATION_SECURITY.md](./APPLICATION_SECURITY.md#🖼️-branding--avatar-pipeline) for the full analysis.

## 🔐 Embed Token Security

### Short-Lived JWT Tokens for Widgets

The platform uses **short-lived JWT tokens** for secure widget-to-API communication:

1. **Token Creation** (`app/core/embed_tokens.py`):
   - Uses `python-jose` for JWT encoding/decoding
   - Tokens signed with `EMBED_TOKEN_SECRET` (separate from main JWT secret)
   - Default expiration: 10 minutes (configurable via `EMBED_TOKEN_TTL_MINUTES`)
   - Tokens include: `tenant_id`, `bot_id`, `snippet_id`, `origin`, `iat`, `exp`

2. **Token Flow**:
   - Widget loads → calls `/public/embed-config?snippet_id=...`
   - Backend validates snippet status and domain allow-list
   - Backend generates short-lived JWT token
   - Widget stores token and uses it for `/api/v1/chat` requests
   - Token expires after configured TTL

3. **Security Features**:
   - ✅ **No API Keys in Frontend**: Tokens are generated server-side
   - ✅ **Domain Validation**: Only allowed domains can receive tokens
   - ✅ **Snippet Status Check**: Only `active` snippets can be embedded
   - ✅ **Short Expiration**: Tokens expire quickly (default 10 minutes)
   - ✅ **Origin Tracking**: Token includes request origin for audit
   - ✅ **Bot Status Verification**: Only `ACTIVE` bots can be embedded

### Domain Allow-List Security

- **Domain Validation**: Snippets can restrict usage to specific domains
- **Automatic Extraction**: URLs are automatically converted to hostnames
- **Real-time Validation**: Domain is checked on every widget load
- **No Restrictions**: `null` domain_whitelist means "allow all domains"

## 📝 Security Checklist

- [x] JWT token-based authentication
- [x] Password hashing with bcrypt
- [x] Secure token generation and validation
- [x] Protected routes with dependency injection
- [x] Database connection via Docker container only
- [x] Environment variables for sensitive data
- [x] CORS configuration
- [x] Input validation with Pydantic
- [x] SQL injection protection (SQLAlchemy ORM)
- [x] Short-lived embed tokens for widgets
- [x] Domain allow-list validation
- [x] Snippet status management (active/revoked)
- [x] Bot status verification for embeds
- [x] One snippet per bot enforcement
- [x] Tenant-scoped branding uploads via MinIO with normalized public delivery

