# Backend API

[← Project Overview](../README.md) · [Backend Docs Index](docs/README.md)

Production-ready FastAPI backend for the YourBot platform with clean architecture and modular design.

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- PostgreSQL (via Docker Compose)

### Setup

1. **Start infrastructure:**
```bash
# From project root
docker-compose up -d
```

2. **Set up Python environment:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your configuration (defaults work for local dev)
```

4. **Start the server:**
```bash
python run.py
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

Once the server is running:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔐 Authentication Endpoints

- **POST** `/api/v1/auth/signup` - Register new user
- **POST** `/api/v1/auth/signin` - Login user
- **GET** `/api/v1/auth/me` - Get current user profile
- **PATCH** `/api/v1/auth/me` - Update profile details (full name, company, domain)

## 🤖 Bot Endpoints

- **GET** `/api/v1/bots` - List bots for the current user
- **POST** `/api/v1/bots` - Create a bot (branding, guardrails, llm_config, retrieval_config)
- **GET** `/api/v1/bots/{bot_id}` - Get bot details
- **PATCH** `/api/v1/bots/{bot_id}` - Update bot details and configuration
- **DELETE** `/api/v1/bots/{bot_id}` - Delete a bot and its dependent records

### Draft Bot Endpoints (Bot Creation Wizard)

- **GET** `/api/v1/bots/draft` - Get the current user's draft bot (if exists)
- **POST** `/api/v1/bots/draft` - Create or update a draft bot (one per user, enforced)
- **DELETE** `/api/v1/bots/draft` - Delete the current user's draft bot and associated assets (logo, documents)

**Draft Bot System**: Each user can have only one draft bot at a time. This is enforced at the API level. Draft bots are used during the 7-step bot creation wizard to persist progress. All configuration (branding, tone, guardrails) is saved to the database immediately when the user clicks "Next" on each step. When the wizard is completed, the draft bot's status is changed to `active`.

## 📦 Installation Snippet Endpoints

- **POST** `/api/v1/bots/{bot_id}/snippets` - Create or get installation snippet (one per bot, auto-created)
- **GET** `/api/v1/bots/{bot_id}/snippets` - List snippets for a bot
- **GET** `/api/v1/snippets/{snippet_id}` - Get snippet details
- **PATCH** `/api/v1/snippets/{snippet_id}` - Update snippet (domain allow-list, status)
- **DELETE** `/api/v1/snippets/{snippet_id}` - Delete a snippet

## 📂 Document Endpoints

- **POST** `/api/v1/bots/{bot_id}/documents` - Upload a document (PDF/DOC/DOCX/TXT up to 1 GB); backend records `source_type`, `status`, `metadata`, and a secure `source_url`
- **POST** `/api/v1/bots/{bot_id}/documents/crawl` - Register a crawled website/URL (stored as metadata, no MinIO upload)
- **GET** `/api/v1/bots/{bot_id}/documents` - List documents for a bot with ingestion status and source info. Used by the wizard to re-hydrate document list when resuming.
- **GET** `/api/v1/documents/{document_id}` - Download a document (auth-required, streams via backend using `source_url` for file uploads)
- **DELETE** `/api/v1/documents/{document_id}` - Delete document entry + underlying MinIO object (for uploads)

**Immediate Upload Behavior**: Documents are uploaded to both the database and MinIO immediately when added in Step 4 of the bot creation wizard. This ensures persistence and allows users to exit and resume without losing their uploaded documents.

## 🖼️ Upload Endpoints

- **POST** `/api/v1/uploads/logo` - Upload a bot/company logo (PNG/JPG/SVG up to 10 MB). Stores the file in MinIO and returns a URL suitable for the `branding.logo_url` field.
- **GET** `/api/v1/uploads/logo/{encoded_key}` - Stream a previously uploaded logo (public read, cached).

## 🌐 Public & Chat Endpoints

- **GET** `/public/embed-config?snippet_id=...` - Public endpoint for widget configuration (returns JWT token, validates domain allow-list, ACTIVE bots only)
- **POST** `/api/v1/chat` - Chat endpoint for embedded widgets (JWT-authenticated, tracks usage)

## 🏗️ Architecture

```
backend/
├── app/
│   ├── api/v1/          # API endpoints
│   ├── core/            # Config, database, security
│   ├── models/          # SQLAlchemy database models
│   ├── schemas/         # Pydantic schemas
│   ├── services/        # Business logic
│   └── main.py          # FastAPI app entry point
├── alembic/             # Database migrations
├── docs/                # Documentation files
└── requirements.txt     # Dependencies
```

## 🛠️ Development

### Development Workflow (No Migrations Needed)

For development, you can skip migrations and use auto-creation:

```bash
# Start services (PostgreSQL + MinIO)
docker-compose up -d

# Start backend (tables auto-created)
python run.py
```

### Reset Database

```bash
python reset_db.py
# Type 'RESET' to confirm
```

### Database Migrations

For production or when you need to track schema changes:

```bash
# Create migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

### Generate Large Test Datasets

Use the bundled seeding script to stress-test paging, embeds, and analytics with thousands of rows:

```bash
cd backend
python generate_test_data.py            # 1000 users, 5–6 bots each
python generate_test_data.py --users 200 --min-bots 4 --max-bots 8
```

Each user is created as “Test User N” with hashed credentials and 5–6 bots containing realistic branding, guardrails, and retrieval config. Only run this in local/staging environments—never against production.

## 🔒 Security Features

### Authentication & Authorization
- ✅ **JWT Authentication** - Secure token-based authentication for all API endpoints
- ✅ **Password Hashing** - bcrypt with automatic salt generation
- ✅ **Token Expiration** - Configurable token expiration (default 7 days)
- ✅ **Protected Routes** - Token-based route protection with dependency injection

### Embed Security
- ✅ **Short-Lived JWT Tokens** - Widgets receive 10-minute tokens (no API keys in frontend)
- ✅ **Domain Allow-List** - Restrict where snippets can be embedded
- ✅ **Snippet Status Management** - Active/revoked status control
- ✅ **Bot Status Verification** - Only ACTIVE bots can be embedded
- ✅ **One Snippet Per Bot** - Enforced to prevent confusion
- ✅ **Origin Tracking** - Token includes request origin for audit

### Data Security
- ✅ **Database Security** - Uses Docker container PostgreSQL only (no local DB)
- ✅ **CORS Configuration** - Restricted to frontend domains
- ✅ **SQL Injection Protection** - SQLAlchemy ORM prevents injection attacks
- ✅ **Input Validation** - Pydantic schemas validate all inputs
- ✅ **Environment Variables** - All sensitive data in `.env` (gitignored)

See [SECURITY.md](docs/SECURITY.md) and [EMBED_SECURITY_AND_SNIPPETS.md](docs/EMBED_SECURITY_AND_SNIPPETS.md) for detailed security documentation.
For an end-to-end review (auth, embeds, avatars, storage, and future hardening), read [APPLICATION_SECURITY.md](docs/APPLICATION_SECURITY.md).

## 📦 Services

### PostgreSQL (Database)
- Container: `yourbot_postgres`
- Host Port: `5433` (for local connections); container listens on `5432`
- Connected via Docker container only

### MinIO (Object Storage)
- Container: `yourbot_minio`
- API Port: `9000`
- Console Port: `9001`
- Used for document storage

See `docs/MINIO_SETUP.md` for detailed MinIO setup instructions.

## 📦 Installation Snippets & Usage Tracking

### Snippet Management

- **One Snippet Per Bot**: System automatically creates/updates one snippet per bot
- **Auto-Creation**: Snippets are created automatically when bots are activated
- **Domain Allow-List**: Restrict where snippets can be embedded
- **Status Management**: Activate/revoke snippets without deleting
- **Usage Analytics**: Track widget loads and chat messages

### Usage Tracking

The `usage_count` and `last_used_at` fields are updated in two scenarios:

1. **Widget Load**: When widget calls `/public/embed-config` → increments count
2. **Chat Messages**: When user sends message via `/api/v1/chat` → increments count again

This provides comprehensive analytics showing both installations and actual engagement.

### Domain Allow-List

- **Automatic Extraction**: URLs are converted to hostnames (e.g., `http://example.com/page` → `example.com`)
- **Real-time Validation**: Domain is checked on every widget load
- **No Restrictions**: `null` domain_whitelist means "allow all domains"
- **Frontend Management**: Users can add/remove domains via Bot Detail page

See [EMBED_SECURITY_AND_SNIPPETS.md](docs/EMBED_SECURITY_AND_SNIPPETS.md) for complete documentation.

## 📖 Additional Documentation

See the `docs/` directory for detailed guides:
- `EXPLANATIONS.md` - Technical concepts (PostgreSQL, SQLAlchemy, Alembic)
- `DEV_WORKFLOW.md` - Development workflow guide
- `SETUP_ENV.md` - Environment variables setup
- `MIGRATIONS_VS_CREATE_ALL.md` - Migration best practices
- `EMBED_SECURITY_AND_SNIPPETS.md` - Complete guide to embed security and code snippets
- `INSTALLATION_SNIPPETS_SCHEMA.md` - Installation snippets table schema

## 🚀 Production Deployment

1. Set strong `SECRET_KEY` in `.env`
2. Update `DATABASE_URL` to production database
3. Set `CORS_ORIGINS` for production domains
4. Use migrations: `alembic upgrade head`
5. Run with production ASGI server:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
   ```

## 📝 Code Quality

- Clean architecture with separation of concerns
- Type hints throughout
- Comprehensive error handling
- Modular and maintainable code structure
- Production-ready patterns
