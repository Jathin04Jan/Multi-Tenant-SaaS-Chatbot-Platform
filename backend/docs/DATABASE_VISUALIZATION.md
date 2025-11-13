# Database Visualization Guide

## 🎯 Quick Setup: pgAdmin (Recommended)

I've added **pgAdmin** to your `docker-compose.yml`. It's a web-based PostgreSQL admin tool.

### Start pgAdmin:

```bash
# Start all services (including pgAdmin)
docker-compose up -d

# Or start just pgAdmin if other services are running
docker-compose up -d pgadmin
```

### Access pgAdmin:

1. **Open in browser**: http://localhost:5050
2. **Login**:
   - Email: `admin@yourbot.com`
   - Password: `admin`

### Connect to Your Database:

1. Right-click **"Servers"** → **"Create"** → **"Server"**
2. **General Tab**:
   - Name: `YourBot Local`
3. **Connection Tab**:
   - Host: `postgres` (container name, not `localhost`)
   - Port: `5432`
   - Database: `yourbot_db`
   - Username: `yourbot_user`
   - Password: `yourbot_password`
   - ✅ Check "Save password"
4. Click **"Save"**

### View Your Data:

- Expand **"YourBot Local"** → **"Databases"** → **"yourbot_db"** → **"Schemas"** → **"public"** → **"Tables"**
- Right-click any table → **"View/Edit Data"** → **"All Rows"**
- You can see, edit, and query all your data!

---

## 🔧 Alternative Options

### Option 2: TablePlus (macOS/Windows - GUI App)

1. **Download**: https://tableplus.com/ (free for basic use)
2. **Connect**:
   - Host: `localhost`
   - Port: `5433` (note: 5433, not 5432 - see your docker-compose.yml)
   - Database: `yourbot_db`
   - Username: `yourbot_user`
   - Password: `yourbot_password`
3. **View tables**: Beautiful GUI, easy to browse and edit data

### Option 3: DBeaver (Free, Cross-Platform)

1. **Download**: https://dbeaver.io/download/
2. **New Connection** → **PostgreSQL**:
   - Host: `localhost`
   - Port: `5433`
   - Database: `yourbot_db`
   - Username: `yourbot_user`
   - Password: `yourbot_password`
3. **Features**: ER diagrams, SQL editor, data export

### Option 4: Command Line (psql)

```bash
# Connect via Docker
docker exec -it yourbot_postgres psql -U yourbot_user -d yourbot_db

# Or if you have psql installed locally
psql -h localhost -p 5433 -U yourbot_user -d yourbot_db
```

**Useful commands:**
```sql
-- List all tables
\dt

-- View users table
SELECT * FROM users;

-- View bots table
SELECT * FROM bots;

-- View ui_configs table
SELECT * FROM ui_configs;

-- Exit
\q
```

### Option 5: VS Code Extension

1. Install **"PostgreSQL"** extension by Chris Kolkman
2. Add connection:
   - Host: `localhost`
   - Port: `5433`
   - Database: `yourbot_db`
   - Username: `yourbot_user`
   - Password: `yourbot_password`
3. Browse tables in VS Code sidebar

---

## 📊 Quick Data Queries

Once connected, try these queries:

```sql
-- Count all users
SELECT COUNT(*) FROM users;

-- View all bots with their owners
SELECT b.id, b.name, b.status, u.email as owner_email
FROM bots b
JOIN users u ON b.user_id = u.id;

-- View bots with UI configs
SELECT b.name, b.status, uc.chat_title, uc.primary_color
FROM bots b
LEFT JOIN ui_configs uc ON b.ui_config_id = uc.id;

-- View all data in a table (example: users)
SELECT * FROM users;

-- View JSONB data (example: bot branding)
SELECT name, branding->>'primary_color' as color, branding->>'welcome_message' as welcome
FROM bots;
```

---

## 🎯 Recommended Setup

**For quick testing**: Use **pgAdmin** (already in docker-compose.yml)
- Web-based, no installation needed
- Full-featured SQL editor
- Visual table browser
- Easy data editing

**For daily development**: Use **TablePlus** or **DBeaver**
- Native app, faster
- Better UX for frequent use

---

## 🔗 Related Documentation

- [Database Setup Guide](./DATABASE_SETUP.md) - PostgreSQL container management
- [Database Schema](./DATABASE_SCHEMA.md) - Complete schema reference
- [Backend Quick Start](../README.md) - Backend setup instructions

