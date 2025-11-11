# Technical Concepts Explained

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## 1. PostgreSQL with SQLAlchemy

### What is PostgreSQL?
**PostgreSQL** is a powerful, open-source relational database management system (RDBMS). Think of it as a sophisticated filing cabinet that stores your data in a structured, organized way.

- It's a **database server** that runs separately from your application
- It stores data in **tables** (like spreadsheets with rows and columns)
- It's **ACID compliant** (ensures data integrity)
- It's **production-ready** and used by many large companies

### What is SQLAlchemy?
**SQLAlchemy** is a Python library that acts as a "translator" between Python code and your database.

**Without SQLAlchemy (Raw SQL):**
```python
# You'd write raw SQL queries like this:
cursor.execute("""
    SELECT id, email, full_name 
    FROM users 
    WHERE email = %s
""", (email,))
user = cursor.fetchone()
```

**With SQLAlchemy (Python Objects):**
```python
# You write Python code like this:
user = db.query(User).filter(User.email == email).first()
```

### Why Use SQLAlchemy?

1. **Object-Relational Mapping (ORM)**: Converts database tables into Python classes
   ```python
   # Your database table becomes a Python class
   class User(Base):
       __tablename__ = "users"
       id = Column(UUID, primary_key=True)
       email = Column(String(255), unique=True)
       password = Column(String(255))
   ```

2. **Type Safety**: Python type hints work with database queries
3. **SQL Injection Protection**: Automatically escapes queries
4. **Database Agnostic**: Can switch from PostgreSQL to MySQL without changing code
5. **Relationship Management**: Easy to define relationships between tables
6. **Query Building**: Write complex queries in Python instead of raw SQL

### Example: How They Work Together

```python
# 1. Define your model (Python class = Database table)
class User(Base):
    __tablename__ = "users"
    id = Column(UUID, primary_key=True)
    email = Column(String(255))

# 2. SQLAlchemy creates the table in PostgreSQL
# This SQL runs automatically:
# CREATE TABLE users (
#     id UUID PRIMARY KEY,
#     email VARCHAR(255)
# );

# 3. You use Python to interact with the database
user = User(email="test@example.com")
db.add(user)
db.commit()  # SQLAlchemy translates to: INSERT INTO users (email) VALUES ('test@example.com')
```

---

## 2. Alembic Migrations

### What is a Migration?
A **migration** is a script that describes changes to your database structure over time. Think of it as version control for your database schema.

### Why Do We Need Migrations?

**Without Migrations:**
- You manually run SQL commands to create/change tables
- No history of what changed
- Team members have different database structures
- Production database doesn't match development
- Can't rollback changes easily

**With Migrations:**
- Track all database changes
- Everyone has the same database structure
- Can rollback to previous versions
- Safe to deploy changes to production

### What is Alembic?
**Alembic** is a migration tool specifically designed for SQLAlchemy. It automatically generates migration scripts based on changes to your SQLAlchemy models.

### How Alembic Works

#### Step 1: You Define a Model
```python
# app/models/user.py
class User(Base):
    __tablename__ = "users"
    id = Column(UUID, primary_key=True)
    email = Column(String(255))
```

#### Step 2: Generate a Migration
```bash
alembic revision --autogenerate -m "Create users table"
```

This creates a file like:
```
alembic/versions/001_create_users_table.py
```

#### Step 3: Review the Generated Migration
```python
# alembic/versions/001_create_users_table.py
def upgrade():
    op.create_table('users',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('email', sa.String(255), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    op.drop_table('users')
```

#### Step 4: Apply the Migration
```bash
alembic upgrade head
```

This runs the `upgrade()` function, creating the table in your database.

### Migration Workflow Example

**Initial State:**
```python
class User(Base):
    email = Column(String(255))
```

**You add a new field:**
```python
class User(Base):
    email = Column(String(255))
    full_name = Column(String(255))  # NEW FIELD
```

**Generate migration:**
```bash
alembic revision --autogenerate -m "Add full_name to users"
```

**Alembic creates:**
```python
def upgrade():
    op.add_column('users', sa.Column('full_name', sa.String(255)))

def downgrade():
    op.drop_column('users', 'full_name')
```

**Apply it:**
```bash
alembic upgrade head  # Adds the column
# or
alembic downgrade -1  # Removes the column (rollback)
```

### Migration History

Alembic keeps track of which migrations have been applied:

```
Migration History:
├── 001_create_users_table.py ✅ (applied)
├── 002_add_full_name.py ✅ (applied)
└── 003_add_phone_number.py ❌ (not applied yet)
```

When you run `alembic upgrade head`, it only applies the migrations that haven't been run yet.

### Real-World Example

**Scenario**: You need to add a "phone_number" field to the User model.

1. **Edit the model:**
   ```python
   class User(Base):
       email = Column(String(255))
       phone_number = Column(String(20))  # NEW
   ```

2. **Generate migration:**
   ```bash
   alembic revision --autogenerate -m "Add phone_number to users"
   ```

3. **Review the generated file** (make sure it's correct)

4. **Apply to development:**
   ```bash
   alembic upgrade head
   ```

5. **Test your changes**

6. **Apply to production:**
   ```bash
   alembic upgrade head  # Same command, works everywhere!
   ```

---

## Summary

### PostgreSQL + SQLAlchemy
- **PostgreSQL**: The actual database (where data lives)
- **SQLAlchemy**: Python library that lets you interact with PostgreSQL using Python code instead of raw SQL
- **Benefit**: Write Python code, SQLAlchemy handles the SQL

### Alembic Migrations
- **Migrations**: Version-controlled scripts that change your database structure
- **Alembic**: Tool that generates and manages these migration scripts
- **Benefit**: Track database changes, keep everyone in sync, safe rollbacks

### Why This Matters for Your Project

1. **Scalability**: As your app grows, you'll need to add new fields/tables
2. **Team Collaboration**: Everyone stays synchronized
3. **Production Safety**: Deploy database changes safely
4. **Rollback**: If something breaks, you can undo changes
5. **History**: See exactly what changed and when

---

## Quick Reference

### Common Alembic Commands

```bash
# Create a new migration (auto-detect changes)
alembic revision --autogenerate -m "Description"

# Apply all pending migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1

# Show current migration version
alembic current

# Show migration history
alembic history

# Show pending migrations
alembic heads
```

### SQLAlchemy Basics

```python
# Create a record
user = User(email="test@example.com")
db.add(user)
db.commit()

# Query records
user = db.query(User).filter(User.email == "test@example.com").first()

# Update a record
user.email = "new@example.com"
db.commit()

# Delete a record
db.delete(user)
db.commit()
```

