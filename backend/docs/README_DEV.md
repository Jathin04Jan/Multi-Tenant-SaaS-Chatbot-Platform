# Development Quick Start (No Migrations!)

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## ✅ You Can Skip Migrations in Development!

Since you're in development, you can simply:

```bash
# 1. Start PostgreSQL
docker-compose up -d postgres

# 2. Start backend (tables auto-created, no migrations needed!)
cd backend
python run.py
```

That's it! The `create_all()` in `main.py` handles table creation automatically.

---

## 🔄 Reset Database

If you need to reset your database (delete all data and recreate tables):

```bash
python reset_db.py
```

Type `RESET` when prompted to confirm.

**What it does:**
- Drops all tables
- Recreates them from your models
- Deletes all data (development only!)

---

## 📝 Development Workflow

### Normal Development:
```bash
# Just start the server
python run.py
```

### When You Change Models:
```bash
# Reset database to apply changes
python reset_db.py
```

### When You Need Fresh Data:
```bash
# Reset database
python reset_db.py
```

### When You Need Lots of Data Fast:
```bash
# Generate 1000 users with 5–6 bots each (defaults)
python generate_test_data.py

# Custom run
python generate_test_data.py --users 200 --min-bots 4 --max-bots 8
```

This seeds “Test User N” accounts with realistic bots so you can stress test dashboards, embeds, or pagination. Only run it against local/staging environments.

---

## 🚀 Quick Commands

```bash
# Start everything
docker-compose up -d postgres
cd backend && python run.py

# Reset database
python reset_db.py

# Check PostgreSQL status
docker-compose ps postgres

# View logs
docker-compose logs -f postgres
```

---

## ⚠️ Important Notes

- **Development**: This workflow is fine for development
- **Production**: Always use migrations (`alembic upgrade head`)
- **Reset Script**: Only use in development, it deletes all data!

---

## 🎯 When to Use Migrations

Use migrations when:
- You have important data you want to keep
- Working with a team (need to sync changes)
- Deploying to production
- You want to track schema changes

For now, just use `python run.py` and `python reset_db.py` when needed! 🎉

