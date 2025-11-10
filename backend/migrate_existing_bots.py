#!/usr/bin/env python3
"""
Migration Script for Existing Bots

This script updates existing bots to ensure they have:
1. Slugs (generated from bot name if missing)
2. UI positioning defaults in branding JSONB
3. Optionally activate bots

Usage:
    python migrate_existing_bots.py [--activate]
"""

import sys
import re
from app.core.database import SessionLocal
from app.models.bot import Bot, BotStatus
from app.services.bot_service import BotService


def generate_slug(name: str, existing_slugs: set) -> str:
    """Generate a unique slug from bot name."""
    # Generate slug from name: lowercase, replace spaces with hyphens, remove special chars
    slug_base = re.sub(r'[^a-z0-9]+', '-', name.lower().strip())
    slug_base = re.sub(r'^-+|-+$', '', slug_base)  # Remove leading/trailing hyphens
    
    if not slug_base:
        slug_base = 'bot'
    
    slug = slug_base
    counter = 1
    while slug in existing_slugs:
        slug = f"{slug_base}-{counter}"
        counter += 1
    
    return slug


def migrate_bots(activate: bool = False):
    """Migrate existing bots to have slugs and UI defaults."""
    db = SessionLocal()
    
    try:
        print("🔄 Migrating existing bots...")
        
        # Get all bots
        bots = db.query(Bot).all()
        
        if not bots:
            print("  → No bots found in database.")
            return
        
        print(f"  → Found {len(bots)} bot(s)")
        
        # Get existing slugs
        existing_slugs = {bot.slug for bot in bots if bot.slug}
        
        updated_count = 0
        activated_count = 0
        
        for bot in bots:
            updated = False
            
            # 1. Generate slug if missing
            if not bot.slug:
                bot.slug = generate_slug(bot.name, existing_slugs)
                existing_slugs.add(bot.slug)
                updated = True
                print(f"  → Bot '{bot.name}': Generated slug '{bot.slug}'")
            
            # 2. Add UI positioning defaults to branding if missing
            branding = bot.branding or {}
            branding_updated = False
            
            if "position" not in branding:
                branding["position"] = "bottom-right"
                branding_updated = True
            
            if "height" not in branding:
                branding["height"] = 600
                branding_updated = True
            
            if "width" not in branding:
                branding["width"] = 400
                branding_updated = True
            
            if "background_color" not in branding:
                branding["background_color"] = "#ffffff"
                branding_updated = True
            
            if branding_updated:
                bot.branding = branding
                updated = True
                print(f"  → Bot '{bot.name}': Added UI positioning defaults")
            
            # 3. Activate bot if requested
            if activate and bot.status != BotStatus.ACTIVE:
                bot.status = BotStatus.ACTIVE
                updated = True
                activated_count += 1
                print(f"  → Bot '{bot.name}': Activated")
            
            # Save changes
            if updated:
                db.commit()
                db.refresh(bot)
                updated_count += 1
        
        print(f"\n✅ Migration complete!")
        print(f"   - Updated {updated_count} bot(s)")
        if activate:
            print(f"   - Activated {activated_count} bot(s)")
        
    except Exception as e:
        print(f"❌ Error during migration: {e}")
        db.rollback()
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Migrate existing bots')
    parser.add_argument(
        '--activate',
        action='store_true',
        help='Activate all bots (set status to active)'
    )
    
    args = parser.parse_args()
    
    if args.activate:
        print("⚠️  WARNING: This will activate all bots!")
        response = input("Continue? (yes/no): ")
        if response.lower() != 'yes':
            print("❌ Migration cancelled.")
            sys.exit(0)
    
    migrate_bots(activate=args.activate)

