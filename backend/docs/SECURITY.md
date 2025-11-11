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
DATABASE_URL=postgresql://yourbot_user:yourbot_password@localhost:5432/yourbot_db
```

**Important**: 
- The connection uses `localhost:5432`, which is the **Docker container port**
- No local PostgreSQL instance is used
- All database operations go through the Docker container

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

