# Environment Variables Setup

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## 🔒 Important: Security Best Practices

**Never commit `.env` files to Git!** They contain sensitive credentials.

## Setup Steps

### 1. Create Your `.env` File

In the `backend/` directory, create a `.env` file:

```bash
cd backend
cp .env.example .env
```

### 2. Update with Your Values

Edit `backend/.env` with your actual configuration:

```env
# Database Configuration
DATABASE_URL=postgresql://yourbot_user:yourbot_password@localhost:5433/yourbot_db

# Security - GENERATE A STRONG SECRET KEY!
SECRET_KEY=generate-a-strong-random-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:5173,http://localhost:8080

# Email Verification
EMAIL_VERIFICATION_REQUIRED=false

# MinIO Object Storage
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=yourbot_minio_admin
MINIO_SECRET_KEY=yourbot_minio_password
MINIO_SECURE=false
MINIO_BUCKET_NAME=yourbot-documents

# Qdrant Vector Database
# For local development: use localhost
# For Docker Compose: use 'qdrant' (service name)
QDRANT_HOST=localhost
QDRANT_PORT=6333
QDRANT_GRPC_PORT=6334
QDRANT_API_KEY=  # Leave empty for local development
QDRANT_PREFER_GRPC=true

# Ollama Configuration
# Ollama must be running locally (default: http://localhost:11434)
# Make sure you've pulled the models: ollama pull qwen3-embedding:4b && ollama pull qwen3-vl:8b
OLLAMA_HOST=http://localhost:11434
OLLAMA_EMBEDDING_MODEL=qwen3-embedding:4b
OLLAMA_LLM_MODEL=qwen3-vl:8b

# Embed Token Security
EMBED_TOKEN_SECRET=generate-a-strong-random-key-here
EMBED_TOKEN_TTL_MINUTES=10

# API Base URL (for embed code generation)
API_BASE_URL=http://localhost:8000

# Admin Configuration
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
ADMIN_ALLOW_ANY_CREDENTIALS=True  # Set to False in production
```

### 3. Generate a Strong Secret Key

**For Production:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Copy the output and use it as your `SECRET_KEY` in `.env`.

**Example:**
```env
SECRET_KEY=xK9mP2qR7vN4wT8yU3zA6bC1dE5fG0hI2jK4lM6nO8pQ0rS2tU4vW6xY8zA0
```

### 4. Verify `.env` is Gitignored

Check that `.env` is in `.gitignore`:

```bash
grep "\.env" ../.gitignore
```

It should show `.env` in the ignore list.

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://yourbot_user:yourbot_password@localhost:5433/yourbot_db` | ✅ Yes |
| `SECRET_KEY` | Secret key for JWT tokens | `your-secret-key-change-in-production` | ✅ Yes (production) |
| `ALGORITHM` | JWT algorithm | `HS256` | No |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time (minutes) | `10080` (7 days) | No |
| `CORS_ORIGINS` | Allowed frontend origins (comma-separated) | `http://localhost:5173,...` | No |
| `EMAIL_VERIFICATION_REQUIRED` | Require email verification | `false` | No |
| `MINIO_ENDPOINT` | MinIO host:port | `localhost:9000` | ✅ Yes (when MinIO enabled) |
| `MINIO_ACCESS_KEY` | MinIO access key | `yourbot_minio_admin` | ✅ Yes |
| `MINIO_SECRET_KEY` | MinIO secret key | `yourbot_minio_password` | ✅ Yes |
| `MINIO_SECURE` | Use HTTPS when connecting to MinIO | `false` | No (set `true` in prod) |
| `MINIO_BUCKET_NAME` | Default bucket name | `yourbot-documents` | ✅ Yes |
| `QDRANT_HOST` | Qdrant host (use 'qdrant' in Docker, 'localhost' for local) | `localhost` | ✅ Yes |
| `QDRANT_PORT` | Qdrant REST API port | `6333` | No |
| `QDRANT_GRPC_PORT` | Qdrant gRPC API port | `6334` | No |
| `QDRANT_API_KEY` | Qdrant API key (optional, for production/cloud) | `` (empty) | No |
| `QDRANT_PREFER_GRPC` | Prefer gRPC over REST API | `true` | No |
| `OLLAMA_HOST` | Ollama API endpoint | `http://localhost:11434` | ✅ Yes |
| `OLLAMA_EMBEDDING_MODEL` | Default embedding model | `qwen3-embedding:4b` | No |
| `OLLAMA_LLM_MODEL` | Default LLM model for chat | `qwen3-vl:8b` | No |
| `EMBED_TOKEN_SECRET` | Secret key for embed JWT tokens | `your-embed-token-secret` | ✅ Yes (production) |
| `EMBED_TOKEN_TTL_MINUTES` | Embed token expiration (minutes) | `10` | No |
| `API_BASE_URL` | Base URL for API (used in embed code) | `http://localhost:8000` | ✅ Yes |
| `ADMIN_EMAIL` | Admin email for authentication | `admin@example.com` | ❌ No |
| `ADMIN_PASSWORD` | Admin password for authentication | `admin123` | ❌ No |
| `ADMIN_ALLOW_ANY_CREDENTIALS` | Allow any credentials for admin login (development mode) | `True` | ❌ No |

## Database URL Format

```
postgresql://[username]:[password]@[host]:[port]/[database_name]
```

**Example:**
```
postgresql://yourbot_user:yourbot_password@localhost:5433/yourbot_db
```

**Note:** The port is `5433` (not `5432`) because docker-compose.yml maps the container port 5432 to host port 5433 to avoid conflicts with local PostgreSQL installations.

## Production Checklist

Before deploying to production:

- [ ] Generate a strong `SECRET_KEY` (use `secrets.token_urlsafe(32)`)
- [ ] Update `DATABASE_URL` to production database
- [ ] Set `CORS_ORIGINS` to your production frontend URLs
- [ ] Set `EMAIL_VERIFICATION_REQUIRED=true` if needed
- [ ] Never commit `.env` to Git
- [ ] Use environment variables in your deployment platform (Heroku, AWS, etc.)

## Troubleshooting

### Config not loading from `.env`

1. Make sure `.env` is in the `backend/` directory
2. Check file permissions (should be readable)
3. Restart the server after creating/updating `.env`

### Variables not working

The config uses `os.getenv()` as fallback, so environment variables will work even without `.env` file. However, `.env` is the recommended way for local development.

