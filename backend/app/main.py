from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1 import api_router
from app.api.public import embed_config
# Import all models to register them with Base
from app.models import (
    User, Bot, InstallationSnippet, Document,
    Subscription, PricingPlanCountryPrice, AppSetting, Entitlement, UserSubscription, UserSubscriptionEntitlement,
    IngestionJob
)  # noqa: F401
from app.core.minio_client import ensure_bucket_exists

# Create database tables (development only - use migrations in production)
# This auto-creates tables if they don't exist, convenient for development
Base.metadata.create_all(bind=engine)
ensure_bucket_exists()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware - MUST be added before routes
cors_origins = settings.get_cors_origins()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for public endpoints (widget.js)
    allow_credentials=False,  # Disable credentials for public endpoints
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Include API routes FIRST
app.include_router(api_router, prefix=settings.API_V1_PREFIX)

# Include public routes (no authentication required)
app.include_router(embed_config.router)

# Serve static files (widget.js)
static_dir = Path(__file__).parent.parent / "static"
if static_dir.exists():
    app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")

# Handle OPTIONS requests explicitly AFTER routes are registered
# This catches any OPTIONS requests that the middleware might miss
@app.options("/api/v1/{full_path:path}")
async def options_handler(request: Request, full_path: str):
    """Explicit OPTIONS handler for CORS preflight requests."""
    origin = request.headers.get("origin")
    if origin in cors_origins:
        requested_method = request.headers.get("Access-Control-Request-Method", "POST")
        requested_headers = request.headers.get("Access-Control-Request-Headers", "*")
        
        return Response(
            status_code=200,
            headers={
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
                "Access-Control-Allow-Headers": requested_headers,
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Max-Age": "3600",
            },
        )
    return Response(status_code=403)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "YourBot API",
        "version": settings.VERSION,
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

