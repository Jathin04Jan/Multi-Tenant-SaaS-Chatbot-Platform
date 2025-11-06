#!/usr/bin/env python3
"""
Development Database Reset Script

⚠️  WARNING: This will DELETE ALL DATA in the database!
Only use this in development environments.

Usage:
    python reset_db.py
"""

import sys
from app.core.database import engine, Base
from app.models import User  # Import all models to register them


def reset_database():
    """Drop all tables and recreate them."""
    print("🔄 Resetting database...")
    
    try:
        # Drop all tables
        print("  → Dropping all tables...")
        Base.metadata.drop_all(bind=engine)
        
        # Recreate all tables
        print("  → Creating all tables...")
        Base.metadata.create_all(bind=engine)
        
        print("✅ Database reset complete!")
        print("\n📊 Database is now empty and ready for development.")
        print("   You can now run: python run.py")
        
    except Exception as e:
        print(f"❌ Error resetting database: {e}")
        print(f"   Make sure PostgreSQL is running: docker-compose up -d postgres")
        sys.exit(1)


if __name__ == "__main__":
    # Safety check - warn user
    print("⚠️  WARNING: This will DELETE ALL DATA!")
    print("   Make sure you're in a development environment.\n")
    
    response = input("Type 'RESET' to confirm: ")
    
    if response == "RESET":
        reset_database()
    else:
        print("❌ Reset cancelled.")
        sys.exit(0)

