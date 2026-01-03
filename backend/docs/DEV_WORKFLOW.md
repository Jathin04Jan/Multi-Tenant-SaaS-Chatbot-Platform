# Development Workflow

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## Quick Development Setup (No Migrations Needed)

Since we're in development, you can use the simplified workflow:

### 1. Start Infrastructure
```bash
# From project root
docker-compose up -d
```

### 2. Start Backend (No migrations needed!)
```bash
cd backend
python run.py
```

The `Base.metadata.create_all()` in `main.py` will automatically create tables if they don't exist.

### 3. Reset Database (If Needed)
```bash
python reset_db.py
```

Type `RESET` when prompted to confirm.

### 4. Seed Large Test Data (Optional, but great for stress testing)
```bash
python generate_test_data.py            # 1000 users, 5–6 bots each
python generate_test_data.py --users 200 --min-bots 4 --max-bots 8
```

This script lives in the backend root and creates realistic “Test User N” accounts with multiple bots so you can hammer list endpoints, embeds, or analytics with real data. Never run it against production.

---

## Development Workflow

### Normal Development Flow:
```bash
# 1. Start services (if not running)
docker-compose up -d

# 2. Start backend (tables auto-created)
python run.py
```

### When You Change Models:
```bash
# Option 1: Reset database (loses all data)
python reset_db.py

# Option 2: Use migrations (preserves data, tracks changes)
alembic revision --autogenerate -m "Description"
alembic upgrade head
```

---

## Reset Database Script

The `reset_db.py` script will:
- ✅ Drop all existing tables
- ✅ Recreate all tables from your models
- ✅ Delete all MinIO objects in the configured bucket
- ✅ Reset everything for a clean development state (⚠️ development only!)
- ✅ (As of the bot deletion hardening) removing a bot now also purges its MinIO objects automatically, so `reset_db.py` is the nuclear option for wiping *everything*.

### Usage:
```bash
python reset_db.py
# Type 'RESET' to confirm
```

### What It Does:
1. Warns you about data loss
2. Drops all tables
3. Recreates tables from models
4. Ready for fresh development

---

## When to Use What

### Use `reset_db.py` (Quick & Easy):
- ✅ Early development
- ✅ Testing with fresh data
- ✅ Schema changes
- ✅ You don't care about existing data

### Use Migrations (Proper Way):
- ✅ When you have important data
- ✅ Team collaboration
- ✅ Production deployments
- ✅ Need to track changes

---

## Development Commands Cheat Sheet

```bash
# Start PostgreSQL
docker-compose up -d

# Start backend (no migrations needed in dev!)
python run.py

# Start ingestion worker (separate process)
python run_worker.py

# Reset database
python reset_db.py

# Check container status
docker-compose ps

# View PostgreSQL logs
docker-compose logs -f postgres

# View MinIO logs
docker-compose logs -f minio

# Stop services
docker-compose stop
```

### Running the Ingestion Worker

The ingestion worker processes document text extraction jobs from the queue. Run it as a separate process:

```bash
# In a separate terminal
cd backend
python run_worker.py
```

The worker will:
- Poll for queued jobs every 2 seconds
- Extract text from uploaded documents (PDF, DOCX, TXT)
- Store extracted text in MinIO
- Update document metadata with extraction details
- Automatically retry failed jobs

You can run multiple worker processes simultaneously for increased throughput. Each worker safely claims different jobs using `FOR UPDATE SKIP LOCKED`.

---

## Quick Start Script

You can also use the convenience script:

```bash
./dev_quickstart.sh
```

This will:
- Start PostgreSQL if needed
- Set up virtual environment
- Install dependencies
- Ready to go!

---

## Notes

- **Development**: `create_all()` is fine for quick iteration
- **Production**: Always use migrations
- **Reset**: Use `reset_db.py` when you want a clean slate
- **Migrations**: Still recommended for tracking changes

