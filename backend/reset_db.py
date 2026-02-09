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
    UserSubscriptionEntitlement,
    IngestionJob,
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
        # First, close any existing connections
        print("  → Closing existing connections...")
        engine.dispose()
        
        # Use a fresh connection with timeout
        print("  → Establishing new connection...")
        with engine.connect() as conn:
            # Terminate any active connections to the database (except our own)
            print("  → Terminating active database connections...")
            conn.execute(text("""
                SELECT pg_terminate_backend(pg_stat_activity.pid)
                FROM pg_stat_activity
                WHERE pg_stat_activity.datname = current_database()
                  AND pid <> pg_backend_pid();
            """))
            conn.commit()
        
        # Now proceed with the reset
        with engine.begin() as conn:
            # First, manually clean up old ui_configs table and its foreign key constraint
            print("  → Cleaning up old ui_configs table and constraints...")
            conn.execute(text("""
                ALTER TABLE IF EXISTS bots 
                DROP CONSTRAINT IF EXISTS bots_ui_config_id_fkey;
            """))
            
            conn.execute(text("""
                ALTER TABLE IF EXISTS bots 
                DROP COLUMN IF EXISTS ui_config_id;
            """))
            
            conn.execute(text("DROP TABLE IF EXISTS ui_configs CASCADE;"))
            print("  → Old ui_configs table and constraints removed")
        
        # Drop dependent functions first (before dropping tables/enums)
        print("  → Dropping dependent functions...")
        with engine.begin() as conn:
            # Drop function that depends on user_subscription_status enum
            conn.execute(text("""
                DROP FUNCTION IF EXISTS user_subscription_status_to_text(user_subscription_status) CASCADE;
            """))
            
            # Drop trigger function for user_subscription_entitlements
            conn.execute(text("""
                DROP FUNCTION IF EXISTS validate_user_subscription_entitlement_user_id() CASCADE;
            """))
            
            print("  → Dependent functions dropped")
        
        # Drop all tables (outside transaction for better performance)
        print("  → Dropping all tables...")
        Base.metadata.drop_all(bind=engine, checkfirst=True)
        print("  → All tables dropped")
        
        # Drop all enum types
        print("  → Dropping enum types...")
        with engine.begin() as conn:
            enum_types = [
                'user_status',
                'bot_status',
                'document_source_type',
                'document_status',
                'entitlement_category',
                'user_subscription_status',
                'ingestion_job_type',
                'ingestion_job_status',
                'ingestion_job_stage',
            ]
            
            for enum_type in enum_types:
                try:
                    conn.execute(text(f"DROP TYPE IF EXISTS {enum_type} CASCADE;"))
                except Exception as e:
                    print(f"    ⚠️  Could not drop {enum_type}: {e}")
            
            print(f"  → Dropped {len(enum_types)} enum type(s)")
        
        # Recreate all tables (this will also recreate enum types)
        # Note: Exclusion constraint for user_subscriptions is automatically created
        # via SQLAlchemy event listener in the model (see app/models/user_subscription.py)
        # Note: Trigger for user_subscription_entitlements (user_id validation) is automatically created
        # via SQLAlchemy event listener in the model (see app/models/user_subscription_entitlement.py)
        print("  → Creating all tables and enum types...")
        Base.metadata.create_all(bind=engine)
        
        print("✅ Database reset complete!")
        print(f"   Created {len(Base.metadata.tables)} table(s) with all relationships and indexes")
        
    except Exception as e:
        print(f"❌ Error resetting database: {e}")
        print(f"   Make sure PostgreSQL is running: docker-compose up -d postgres")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        # Always dispose of connections
        engine.dispose()


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

