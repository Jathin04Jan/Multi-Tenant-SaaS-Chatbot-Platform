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

-- View installation_snippets table
SELECT * FROM installation_snippets;

-- View subscriptions table
SELECT * FROM subscriptions;

-- View pricing_plan_country_prices table
SELECT * FROM pricing_plan_country_prices;

-- View entitlements table
SELECT * FROM entitlements;

-- View user_subscriptions table
SELECT * FROM user_subscriptions;

-- View app_settings table
SELECT * FROM app_settings;

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

-- View bots with their branding/UI configuration
SELECT 
    b.name, 
    b.status, 
    b.branding->>'primary_color' as primary_color,
    b.branding->>'welcome_message' as welcome_message,
    b.branding->>'assistant_name' as assistant_name
FROM bots b;

-- View bots with their installation snippets
SELECT 
    b.name as bot_name,
    b.status as bot_status,
    s.id as snippet_id,
    s.status as snippet_status,
    s.usage_count,
    s.last_used_at
FROM bots b
LEFT JOIN installation_snippets s ON b.id = s.bot_id;

-- View pricing plans with country prices
SELECT 
    p.name as plan_name,
    p.is_highlighted,
    pp.country_code,
    pp.currency,
    pp.billing_interval,
    pp.price,
    pp.is_active
FROM subscriptions p
LEFT JOIN pricing_plan_country_prices pp ON p.id = pp.plan_id
WHERE pp.is_active = true;

-- View subscriptions with their entitlements
SELECT 
    s.name as subscription_name,
    e.category,
    e.entitlement,
    e.unit,
    e.quota
FROM subscriptions s
LEFT JOIN entitlements e ON s.id = e.subscription_id
ORDER BY s.name, e.category, e.entitlement;

-- View file-related entitlements for a subscription
SELECT 
    s.name as subscription_name,
    e.entitlement,
    e.unit,
    e.quota
FROM subscriptions s
JOIN entitlements e ON s.id = e.subscription_id
WHERE e.category = 'file'
ORDER BY s.name, e.entitlement;

-- View user subscriptions with plan details
SELECT 
    u.email as user_email,
    u.company_name,
    s.name as subscription_name,
    us.status,
    us.start_date,
    us.end_date,
    us.auto_renew
FROM user_subscriptions us
JOIN users u ON us.user_id = u.id
JOIN subscriptions s ON us.subscription_id = s.id
ORDER BY u.email, us.start_date DESC;

-- View active user subscriptions
SELECT 
    u.email as user_email,
    s.name as subscription_name,
    us.start_date,
    us.end_date,
    us.auto_renew
FROM user_subscriptions us
JOIN users u ON us.user_id = u.id
JOIN subscriptions s ON us.subscription_id = s.id
WHERE us.status = 'active'
ORDER BY u.email;

-- View public app settings (for landing page)
SELECT key, value, description
FROM app_settings
WHERE is_public = true;

-- View all app settings (admin only)
SELECT key, value, description, is_public
FROM app_settings;

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

