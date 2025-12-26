from pydantic_settings import BaseSettings
from pydantic import Field
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # API Configuration
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "YourBot API"
    VERSION: str = "1.0.0"
    
    # Security - Load from environment (REQUIRED in production!)
    SECRET_KEY: str = Field(
        default="your-secret-key-change-in-production-DO-NOT-USE-IN-PRODUCTION",
        description="JWT secret key - MUST be set in .env for production"
    )
    ALGORITHM: str = Field(default="HS256", description="JWT algorithm")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=10080, description="JWT token expiration in minutes (7 days)")
    
    # Database - Load from environment
    DATABASE_URL: str = Field(
        default="postgresql://yourbot_user:yourbot_password@localhost:5433/yourbot_db",
        description="PostgreSQL database connection URL (port 5433 matches docker-compose.yml)"
    )
    
    # CORS - Accept comma-separated string
    CORS_ORIGINS: str = Field(
        default="http://localhost:5173,http://localhost:8080,http://127.0.0.1:5173,http://127.0.0.1:8080",
        description="Comma-separated list of allowed CORS origins"
    )
    
    def get_cors_origins(self) -> List[str]:
        """Get CORS origins as a list."""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]
    
    # Email Verification (optional)
    EMAIL_VERIFICATION_REQUIRED: bool = Field(default=False, description="Require email verification")
    
    # MinIO S3-Compatible Storage
    MINIO_ENDPOINT: str = Field(default="localhost:9000", description="MinIO endpoint")
    MINIO_ACCESS_KEY: str = Field(default="yourbot_minio_admin", description="MinIO access key")
    MINIO_SECRET_KEY: str = Field(default="yourbot_minio_password", description="MinIO secret key")
    MINIO_SECURE: bool = Field(default=False, description="Use HTTPS for MinIO")
    MINIO_BUCKET_NAME: str = Field(default="yourbot-documents", description="MinIO bucket name")
    
    # Admin Configuration
    ADMIN_EMAIL: str = Field(
        default="admin@example.com",
        description="Admin email for authentication (can be any email for now)"
    )
    ADMIN_PASSWORD: str = Field(
        default="admin123",
        description="Admin password for authentication (change in production!)"
    )
    ADMIN_ALLOW_ANY_CREDENTIALS: bool = Field(
        default=True,
        description="Allow any credentials for admin login (development mode). Set to False in production!"
    )
    
    # Embed Token Configuration (for widget authentication)
    EMBED_TOKEN_SECRET: str = Field(
        default="your-embed-token-secret-change-in-production",
        description="Secret key for embed JWT tokens (should be different from SECRET_KEY in production)"
    )
    EMBED_TOKEN_TTL_MINUTES: int = Field(
        default=10,
        description="Embed token TTL in minutes (short-lived for security)"
    )
    
    # API Base URL (for embed code generation)
    API_BASE_URL: str = Field(
        default="http://localhost:8000",
        description="Base URL for the API (used in embed code generation). In production, set this to your domain."
    )
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()

