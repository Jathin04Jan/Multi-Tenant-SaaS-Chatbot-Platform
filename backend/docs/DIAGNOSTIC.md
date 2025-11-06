# Route Registration Diagnostic

## ✅ Code Structure Analysis

### Route Path Breakdown:
1. **main.py** (line 33):
   ```python
   app.include_router(api_router, prefix=settings.API_V1_PREFIX)
   ```
   - `settings.API_V1_PREFIX = "/api/v1"`

2. **api/v1/__init__.py** (line 6):
   ```python
   api_router.include_router(auth.router)
   ```
   - No additional prefix

3. **api/v1/auth.py** (line 9):
   ```python
   router = APIRouter(prefix="/auth", tags=["authentication"])
   ```
   - Prefix: `/auth`

4. **api/v1/auth.py** (line 12):
   ```python
   @router.post("/signup", ...)
   ```
   - Route: `/signup`

### Final Path Calculation:
```
/api/v1 (from main.py) 
  + /auth (from auth.py router prefix)
    + /signup (from @router.post decorator)
      = /api/v1/auth/signup ✅ CORRECT!
```

## ❌ The Problem

**Routes are NOT being registered** because:

1. **SQLAlchemy Import Error**: Python 3.13 + SQLAlchemy 2.0.23 = Compatibility issue
   - When `app/api/v1/auth.py` tries to import `from sqlalchemy.orm import Session`, it fails
   - This prevents the auth router from being created
   - The server starts but routes aren't loaded

2. **Server Status**: 
   - Server IS running (`python run.py` on PID 12714)
   - But routes aren't registered (only `/api/inngest` appears in OpenAPI)
   - This means the import failed silently

## ✅ The Fix

### Step 1: Stop Current Server
```bash
# Find and kill the running server
pkill -f "python run.py"
# OR Ctrl+C in the terminal running it
```

### Step 2: Activate Virtual Environment
```bash
cd backend

# Check which venv exists
ls -la | grep -E "venv|\.venv"

# Activate it (choose one):
source venv/bin/activate
# OR
source .venv/bin/activate
```

### Step 3: Upgrade SQLAlchemy
```bash
pip install --upgrade sqlalchemy>=2.0.35 alembic>=1.13.0
pip install -r requirements.txt
```

### Step 4: Verify Routes Can Load
```bash
python3 -c "
import sys
sys.path.insert(0, '.')
try:
    from app.api.v1.auth import router
    print('✅ Auth router loaded successfully!')
    print(f'Prefix: {router.prefix}')
    print(f'Routes: {len(router.routes)}')
    for r in router.routes:
        if hasattr(r, 'path') and hasattr(r, 'methods'):
            print(f'  {r.methods} {r.path}')
except Exception as e:
    print(f'❌ Error: {e}')
    import traceback
    traceback.print_exc()
"
```

### Step 5: Start Server
```bash
python run.py
```

### Step 6: Test Routes
```bash
# Test OPTIONS
curl -X OPTIONS http://localhost:8000/api/v1/auth/signup \
  -H "Origin: http://localhost:8080" \
  -H "Access-Control-Request-Method: POST" \
  -v

# Test POST
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:8080" \
  -d '{"email":"test@test.com","password":"Test1234","full_name":"Test","company_name":"TestCo"}' \
  -v

# Verify routes in OpenAPI
curl http://localhost:8000/openapi.json | python3 -m json.tool | grep -E '"/api/v1'
```

## Expected Results

After restart:
- ✅ OPTIONS should return `200 OK` with CORS headers
- ✅ POST should return `201 Created` with JWT token (or `422` for validation errors, NOT `404`)
- ✅ OpenAPI should show `/api/v1/auth/signup`, `/api/v1/auth/signin`, `/api/v1/auth/me`

