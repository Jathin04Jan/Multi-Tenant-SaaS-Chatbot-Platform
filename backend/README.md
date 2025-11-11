# Backend API

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

## 🤖 Bot & UI Config Endpoints

- **GET** `/api/v1/bots` - List bots for the current user
- **POST** `/api/v1/bots` - Create a bot (branding, guardrails, llm_config, retrieval_config, ui_config linkage)
- **PATCH** `/api/v1/bots/{bot_id}` - Update bot details and configuration
- **DELETE** `/api/v1/bots/{bot_id}` - Delete a bot and its dependent records
- **POST/GET/PATCH/DELETE** `/api/v1/ui-configs` - Manage reusable chatbot UI themes
- **GET** `/public/embed-config?bot_id=...` - Public endpoint used by `static/widget.js` (ACTIVE bots only)

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

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- CORS configuration
- SQL injection protection
- Input validation with Pydantic

## 🔒 Security

✅ **JWT Authentication** - Fully implemented with secure token generation and validation
✅ **Password Hashing** - bcrypt with automatic salt generation
✅ **Database Security** - Uses Docker container PostgreSQL only (no local DB)
✅ **Protected Routes** - Token-based route protection

See `SECURITY.md` for detailed security documentation.

## 📦 Services

### PostgreSQL (Database)
- Container: `yourbot_postgres`
- Port: `5432`
- Connected via Docker container only

### MinIO (Object Storage)
- Container: `yourbot_minio`
- API Port: `9000`
- Console Port: `9001`
- Used for document storage

See `docs/MINIO_SETUP.md` for detailed MinIO setup instructions.

## 📖 Additional Documentation

See the `docs/` directory for detailed guides:
- `EXPLANATIONS.md` - Technical concepts (PostgreSQL, SQLAlchemy, Alembic)
- `DEV_WORKFLOW.md` - Development workflow guide
- `SETUP_ENV.md` - Environment variables setup
- `MIGRATIONS_VS_CREATE_ALL.md` - Migration best practices

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
