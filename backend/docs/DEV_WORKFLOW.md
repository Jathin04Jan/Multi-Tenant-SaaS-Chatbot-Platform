# Development Workflow

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

