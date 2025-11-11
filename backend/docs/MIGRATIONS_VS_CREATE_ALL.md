# What Happens If You Skip `alembic upgrade head`?

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## Quick Answer

**If you skip `alembic upgrade head` and run `python run.py`:**

✅ **The app will likely still work** (because of `Base.metadata.create_all()` in `main.py`)  
⚠️ **But you're using a "hacky" approach** that won't work well in production  
❌ **You'll lose migration history and proper schema management**

---

## What Actually Happens?

### Current Code in `app/main.py`:

```python
# Line 8 in main.py
Base.metadata.create_all(bind=engine)
```

This line **automatically creates tables** if they don't exist, so your app might work without migrations.

### But There Are Important Differences:

| Aspect | `alembic upgrade head` ✅ | `Base.metadata.create_all()` ❌ |
|--------|-------------------------|--------------------------------|
| **Creates tables** | Yes | Yes |
| **Tracks migration history** | Yes | No |
| **Handles schema changes** | Yes (updates existing tables) | No (only creates new) |
| **Can rollback** | Yes | No |
| **Production ready** | Yes | No |
| **Team synchronization** | Yes | No |
| **Indexes & constraints** | Yes (from migrations) | Sometimes missing |

---

## Real-World Scenarios

### Scenario 1: Fresh Database (No Tables)

**Without migrations:**
```bash
python run.py
# ✅ Works! Creates tables via create_all()
```

**With migrations:**
```bash
alembic upgrade head
python run.py
# ✅ Works! Creates tables via migration + tracks history
```

**Result:** Both work, but migrations are better.

---

### Scenario 2: Existing Database (Tables Already Exist)

**Without migrations:**
```bash
python run.py
# ✅ App starts, but...
# ❌ If you added a new column to User model, it WON'T be added to existing database
# ❌ create_all() only creates missing tables, doesn't modify existing ones
```

**With migrations:**
```bash
alembic revision --autogenerate -m "Add new column"
alembic upgrade head
python run.py
# ✅ New column added to existing table
# ✅ Migration history tracked
```

**Result:** Migrations handle schema changes properly.

---

### Scenario 3: You Modify Your Model

**Example:** You add a `phone_number` field to the User model:

```python
class User(Base):
    email = Column(String(255))
    phone_number = Column(String(20))  # NEW FIELD
```

**Without migrations:**
```bash
python run.py
# ❌ Existing database won't get the new column
# ❌ New installations will have it, old ones won't
# ❌ Inconsistent database schemas across environments
```

**With migrations:**
```bash
alembic revision --autogenerate -m "Add phone_number"
alembic upgrade head
python run.py
# ✅ All databases (dev, staging, prod) get updated consistently
```

---

## What Happens Step-by-Step

### Without Running Migrations:

1. **App starts** (`python run.py`)
2. **`create_all()` runs** → Checks if tables exist
3. **If tables don't exist:**
   - Creates them ✅
   - But no migration history ❌
   - Might miss indexes/constraints ❌
4. **If tables exist:**
   - Does nothing (even if model changed!) ❌
   - Your new columns won't appear ❌

### With Running Migrations:

1. **Run migrations** (`alembic upgrade head`)
2. **Alembic checks migration history**
3. **Applies any pending migrations**
4. **Updates database schema properly**
5. **App starts** (`python run.py`)
6. **Everything works** ✅

---

## Production Issues

### Problem 1: Schema Drift
```
Development DB: Has phone_number column ✅
Production DB: Missing phone_number column ❌
```

**Without migrations:** You'll have inconsistent schemas  
**With migrations:** All environments stay in sync

### Problem 2: Can't Rollback
```bash
# Oops! The new column broke something
# Without migrations: Can't rollback ❌
# With migrations: alembic downgrade -1 ✅
```

### Problem 3: Team Collaboration
```
Developer A: Adds column → Runs create_all() → Works locally
Developer B: Pulls code → Runs create_all() → Might not work (timing issues)
```

**With migrations:** Everyone runs the same migration scripts ✅

---

## Best Practice Recommendation

### Option 1: Remove `create_all()` (Recommended for Production)

```python
# app/main.py
# Remove or comment out this line:
# Base.metadata.create_all(bind=engine)  # ❌ Remove this
```

**Why?** Forces you to use migrations properly.

**Then always run:**
```bash
alembic upgrade head
python run.py
```

### Option 2: Keep `create_all()` for Development Only

```python
# app/main.py
import os

if os.getenv("ENVIRONMENT") != "production":
    Base.metadata.create_all(bind=engine)  # Only in dev
```

**Why?** Allows quick development, but still use migrations for production.

---

## What You Should Do

### For Development:
```bash
# First time setup
alembic upgrade head
python run.py

# After model changes
alembic revision --autogenerate -m "Description"
alembic upgrade head
python run.py
```

### For Production:
```bash
# ALWAYS use migrations
alembic upgrade head
# Then start your app
```

---

## Summary

| Question | Answer |
|----------|--------|
| **Will app work without migrations?** | Maybe (if tables don't exist) |
| **Should you skip migrations?** | ❌ No, especially in production |
| **Why use migrations?** | Track changes, rollback, team sync, production safety |
| **What happens if you skip?** | Tables might be created, but schema changes won't apply, no history |

**Bottom Line:** Always run `alembic upgrade head` before starting your app. It's the proper way to manage database schemas.

