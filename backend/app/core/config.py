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
        default="postgresql://yourbot_user:yourbot_password@localhost:5432/yourbot_db",
        description="PostgreSQL database connection URL"
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
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()

