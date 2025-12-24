#!/usr/bin/env python3
"""
Development Database Reset Script

⚠️  WARNING: This will DELETE ALL DATA in the database and MinIO!
Only use this in development environments.

Usage:
    python reset_db.py
"""

import sys
from sqlalchemy import text
from app.core.database import engine, Base
from app.core.config import settings
from app.models import (
    User,
    Bot,
    InstallationSnippet,
    Document,
    Subscription,
    PricingPlanCountryPrice,
    AppSetting,
    Entitlement,
    UserSubscription,
)  # Import all models to register them


def reset_minio():
    """Clear all objects from MinIO bucket."""
    try:
        from minio import Minio
        
        print("🔄 Clearing MinIO storage...")
        
        # Initialize MinIO client
        client = Minio(
            settings.MINIO_ENDPOINT,
            access_key=settings.MINIO_ACCESS_KEY,
            secret_key=settings.MINIO_SECRET_KEY,
            secure=settings.MINIO_SECURE
        )
        
        # Check if bucket exists
        if client.bucket_exists(settings.MINIO_BUCKET_NAME):
            print(f"  → Deleting all objects from bucket '{settings.MINIO_BUCKET_NAME}'...")
            
            # List and delete all objects
            objects = client.list_objects(settings.MINIO_BUCKET_NAME, recursive=True)
            deleted_count = 0
            for obj in objects:
                if obj.object_name:  # Check if object_name is not None
                    client.remove_object(settings.MINIO_BUCKET_NAME, obj.object_name)
                    deleted_count += 1
            
            if deleted_count > 0:
                print(f"  → Deleted {deleted_count} object(s)")
            else:
                print("  → Bucket is already empty")
        else:
            print(f"  → Bucket '{settings.MINIO_BUCKET_NAME}' does not exist (will be created on first use)")
        
        print("✅ MinIO cleared!")
        
    except ImportError:
        print("⚠️  MinIO client not installed. Skipping MinIO cleanup.")
        print("   Install with: pip install minio")
    except Exception as e:
        # Catch all exceptions including S3Error (if minio is installed)
        error_type = type(e).__name__
        print(f"⚠️  MinIO error ({error_type}): {e}")
        print("   Skipping MinIO cleanup.")


def reset_database():
    """Drop all tables and recreate them."""
    print("🔄 Resetting database...")
    
    try:
        # First, manually clean up old ui_configs table and its foreign key constraint
        # This handles the case where the database still has the old schema
        print("  → Cleaning up old ui_configs table and constraints...")
        with engine.begin() as conn:
            # Drop the foreign key constraint from bots table if it exists
            conn.execute(text("""
                ALTER TABLE bots 
                DROP CONSTRAINT IF EXISTS bots_ui_config_id_fkey;
            """))
            
            # Drop the ui_config_id column from bots table if it exists
            conn.execute(text("""
                ALTER TABLE bots 
                DROP COLUMN IF EXISTS ui_config_id;
            """))
            
            # Drop the ui_configs table if it exists (CASCADE will drop dependent objects)
            conn.execute(text("DROP TABLE IF EXISTS ui_configs CASCADE;"))
        
        print("  → Old ui_configs table and constraints removed")
        
        # Now drop all remaining tables using SQLAlchemy
        print("  → Dropping all tables...")
        Base.metadata.drop_all(bind=engine, checkfirst=True)
        
        # Recreate all tables
        print("  → Creating all tables...")
        Base.metadata.create_all(bind=engine)
        
        print("✅ Database reset complete!")
        
    except Exception as e:
        print(f"❌ Error resetting database: {e}")
        print(f"   Make sure PostgreSQL is running: docker-compose up -d postgres")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    # Safety check - warn user
    print("⚠️  WARNING: This will DELETE ALL DATA!")
    print("   - All database tables will be dropped and recreated")
    print("   - All MinIO objects will be deleted")
    print("   Make sure you're in a development environment.\n")
    
    response = input("Type 'RESET' to confirm: ")
    
    if response == "RESET":
        reset_database()
        reset_minio()
        print("\n✅ Complete reset finished!")
        print("📊 Database and MinIO are now empty and ready for development.")
        print("   You can now run: python run.py")
    else:
        print("❌ Reset cancelled.")
        sys.exit(0)

