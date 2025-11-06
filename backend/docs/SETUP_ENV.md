# Environment Variables Setup

## 🔒 Important: Security Best Practices

**Never commit `.env` files to Git!** They contain sensitive credentials.

## Setup Steps

### 1. Create Your `.env` File

In the `backend/` directory, create a `.env` file:

```bash
cd backend
cp .env.example .env
```

### 2. Update with Your Values

Edit `backend/.env` with your actual configuration:

```env
# Database Configuration
DATABASE_URL=postgresql://yourbot_user:yourbot_password@localhost:5432/yourbot_db

# Security - GENERATE A STRONG SECRET KEY!
SECRET_KEY=generate-a-strong-random-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:5173,http://localhost:8080

# Email Verification
EMAIL_VERIFICATION_REQUIRED=false
```

### 3. Generate a Strong Secret Key

**For Production:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Copy the output and use it as your `SECRET_KEY` in `.env`.

**Example:**
```env
SECRET_KEY=xK9mP2qR7vN4wT8yU3zA6bC1dE5fG0hI2jK4lM6nO8pQ0rS2tU4vW6xY8zA0
```

### 4. Verify `.env` is Gitignored

Check that `.env` is in `.gitignore`:

```bash
grep "\.env" ../.gitignore
```

It should show `.env` in the ignore list.

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://yourbot_user:yourbot_password@localhost:5432/yourbot_db` | ✅ Yes |
| `SECRET_KEY` | Secret key for JWT tokens | `your-secret-key-change-in-production` | ✅ Yes (production) |
| `ALGORITHM` | JWT algorithm | `HS256` | No |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time (minutes) | `10080` (7 days) | No |
| `CORS_ORIGINS` | Allowed frontend origins (comma-separated) | `http://localhost:5173,...` | No |
| `EMAIL_VERIFICATION_REQUIRED` | Require email verification | `false` | No |

## Database URL Format

```
postgresql://[username]:[password]@[host]:[port]/[database_name]
```

**Example:**
```
postgresql://yourbot_user:yourbot_password@localhost:5432/yourbot_db
```

## Production Checklist

Before deploying to production:

- [ ] Generate a strong `SECRET_KEY` (use `secrets.token_urlsafe(32)`)
- [ ] Update `DATABASE_URL` to production database
- [ ] Set `CORS_ORIGINS` to your production frontend URLs
- [ ] Set `EMAIL_VERIFICATION_REQUIRED=true` if needed
- [ ] Never commit `.env` to Git
- [ ] Use environment variables in your deployment platform (Heroku, AWS, etc.)

## Troubleshooting

### Config not loading from `.env`

1. Make sure `.env` is in the `backend/` directory
2. Check file permissions (should be readable)
3. Restart the server after creating/updating `.env`

### Variables not working

The config uses `os.getenv()` as fallback, so environment variables will work even without `.env` file. However, `.env` is the recommended way for local development.

