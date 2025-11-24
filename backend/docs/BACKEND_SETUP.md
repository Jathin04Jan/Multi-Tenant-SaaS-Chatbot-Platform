# Backend Setup Guide

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## Quick Start

### 1. Start PostgreSQL Database

```bash
# From project root
docker-compose up -d postgres

# Verify it's running
docker-compose ps
```

### 2. Set Up Python Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
# Edit .env if needed (defaults should work for local development)
```

### 3. Run Database Migrations

```bash
# From backend directory
alembic upgrade head
```

### 4. Start the Backend Server

```bash
# From backend directory with venv activated
python run.py

# Or use uvicorn directly:
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### 5. Test the API

Visit http://localhost:8000/docs for interactive API documentation (Swagger UI)

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://yourbot_user:yourbot_password@localhost:5433/yourbot_db
SECRET_KEY=your-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=10080
CORS_ORIGINS=http://localhost:5173,http://localhost:8080
```

**Note:** Port `5433` is used (not `5432`) because docker-compose.yml maps container port 5432 to host port 5433 to avoid conflicts with local PostgreSQL installations.

## API Endpoints

### Authentication

- **POST** `/api/v1/auth/signup` - Register new user
- **POST** `/api/v1/auth/signin` - Login user
- **GET** `/api/v1/auth/me` - Get current user (requires auth token)

### Health Check

- **GET** `/health` - Health check endpoint
- **GET** `/` - API info

## Frontend Integration

The frontend is configured to connect to `http://localhost:8000` by default.

To change the API URL, set the environment variable in `frontend/.env`:
```
VITE_API_URL=http://localhost:8000
```

## Seed Data for Testing

Need thousands of users/bots to exercise pagination or embeds? Use the seeding script:

```bash
cd backend
python generate_test_data.py            # 1000 users, 5–6 bots each
python generate_test_data.py --users 200 --min-bots 4 --max-bots 8
```

Each “Test User N” receives multiple bots with full branding/guardrails so every feature has data. Only run this in local/staging environments—never against production.

## Troubleshooting

### Database Connection Issues

1. Verify PostgreSQL is running:
   ```bash
   docker-compose ps
   ```

2. Check database logs:
   ```bash
   docker-compose logs postgres
   ```

3. Test connection manually:
   ```bash
   psql -h localhost -p 5433 -U yourbot_user -d yourbot_db
   ```

### Migration Issues

1. If tables don't exist, create them:
   ```bash
   alembic upgrade head
   ```

2. If you need to reset the database:
   ```bash
   alembic downgrade base
   alembic upgrade head
   ```

### Port Already in Use

If port 8000 is already in use, change it in `run.py` or use:
```bash
uvicorn app.main:app --reload --port 8001
```

### CORS Issues

Make sure your frontend URL is in the `CORS_ORIGINS` list in `.env`:
```
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

## Production Deployment

1. **Set strong SECRET_KEY**:
   ```python
   import secrets
   secrets.token_urlsafe(32)
   ```

2. **Update DATABASE_URL** to production database

3. **Set proper CORS_ORIGINS** for production domains

4. **Use production ASGI server**:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
   ```

5. **Use reverse proxy** (nginx/Traefik) for SSL/TLS

