#!/usr/bin/env python3
"""
Seed script to generate large amounts of test data for stress testing.

Creates N users (default 1000) and, for each user, 5–6 bots with reasonable
default configurations so that all downstream workflows (snippets, embeds, etc.)
have meaningful data to operate on.
"""

from __future__ import annotations

import argparse
import random
from typing import Dict

from datetime import date, datetime, timedelta
from app.core.database import SessionLocal
from app.core.security import get_password_hash
from app.models.user import User, UserStatus
from app.models.bot import Bot, BotStatus
from app.models.subscription import Subscription
from app.models.entitlement import Entitlement, EntitlementCategory
from app.models.user_subscription import UserSubscription, UserSubscriptionStatus
from app.models.user_subscription_entitlement import UserSubscriptionEntitlement
from app.models.ingestion_job import IngestionJob, IngestionJobType, IngestionJobStatus, IngestionJobStage


def build_branding(idx: int) -> Dict[str, str | int]:
    colors = [
        "#6366f1",
        "#0ea5e9",
        "#f97316",
        "#22c55e",
        "#e11d48",
        "#a855f7",
    ]
    primary_color = colors[idx % len(colors)]

    return {
        "logo_url": f"https://placehold.co/80x80?text=Bot+{idx}",
        "avatar_url": f"https://placehold.co/48x48?text=B{idx}",
        "primary_color": primary_color,
        "background_color": "#ffffff",
        "welcome_message": f"Hello! I'm stress-test bot {idx}. How can I help?",
        "intro_message": "Ask me anything about our sample docs.",
        "assistant_name": f"Helper Bot {idx}",
        "chat_title": f"Helper Bot {idx}",
        "position": "bottom-right",
        "height": 620,
        "width": 400,
    }


def build_llm_config() -> Dict[str, float | str]:
    return {
        "model": "gpt-4o-mini",
        "temperature": round(random.uniform(0.4, 0.9), 2),
        "communication_style": random.choice(
            ["friendly", "professional", "enthusiastic", "casual"]
        ),
        "style_prompt": "Stay concise, polite, and solution oriented.",
    }


def build_guardrails() -> Dict[str, object]:
    return {
        "max_response_length": 600,
        "blocked_phrases": ["refund immediately", "top-secret"],
        "block_explicit_content": True,
        "block_political_views": True,
        "strictly_stick_to_topic": True,
        "block_personal_info": True,
        "enable_fact_checking": True,
        "custom_instructions": "Always mention this is a test bot.",
    }


def build_retrieval(idx: int) -> Dict[str, object]:
    return {
        "vector_db": {
            "provider": "pgvector",
            "collection": f"bot_{idx}_collection",
        },
        "rag_params": {"top_k": 4, "similarity_threshold": 0.78},
        "data_sources": [
            {
                "type": "document",
                "name": f"Sample Doc {idx}",
                "uri": f"s3://test-bucket/documents/sample_{idx}.pdf",
            }
        ],
    }


def seed_subscriptions(session) -> Dict[str, Subscription]:
    """Create default subscription plans and their entitlements."""
    print("  → Creating subscription plans...")
    
    plans_data = [
        {
            "name": "Free",
            "description": "Perfect for getting started",
            "is_highlighted": False,
            "support_level": None,
            "features": ["1 bot", "10 documents", "Community support"],
            "entitlements": [
                {"category": EntitlementCategory.FILE, "entitlement": "storage", "unit": "MB", "quota": 100},
                {"category": EntitlementCategory.FILE, "entitlement": "file_count", "unit": "count", "quota": 10},
                {"category": EntitlementCategory.CHAT, "entitlement": "tokens", "unit": "count", "quota": 10000},
            ]
        },
        {
            "name": "Pro",
            "description": "For growing businesses",
            "is_highlighted": True,
            "support_level": "email",
            "features": ["5 bots", "100 documents", "Email support", "Advanced analytics"],
            "entitlements": [
                {"category": EntitlementCategory.FILE, "entitlement": "storage", "unit": "GB", "quota": 10},
                {"category": EntitlementCategory.FILE, "entitlement": "file_count", "unit": "count", "quota": 100},
                {"category": EntitlementCategory.CHAT, "entitlement": "tokens", "unit": "count", "quota": 100000},
            ]
        },
        {
            "name": "Enterprise",
            "description": "For large organizations",
            "is_highlighted": False,
            "support_level": "priority",
            "features": ["Unlimited bots", "Unlimited documents", "Priority support", "Custom integrations"],
            "entitlements": [
                {"category": EntitlementCategory.FILE, "entitlement": "storage", "unit": "GB", "quota": 1000},
                {"category": EntitlementCategory.FILE, "entitlement": "file_count", "unit": "count", "quota": -1},
                {"category": EntitlementCategory.CHAT, "entitlement": "tokens", "unit": "count", "quota": 10000000},
            ]
        },
    ]
    
    plans = {}
    for plan_data in plans_data:
        plan = Subscription(
            name=plan_data["name"],
            description=plan_data["description"],
            is_highlighted=plan_data["is_highlighted"],
            support_level=plan_data["support_level"],
            features=plan_data["features"],
        )
        session.add(plan)
        session.flush()
        
        # Create entitlements for this plan
        for ent_data in plan_data["entitlements"]:
            entitlement = Entitlement(
                subscription_id=plan.id,
                category=ent_data["category"],
                entitlement=ent_data["entitlement"],
                unit=ent_data["unit"],
                quota=ent_data["quota"],
            )
            session.add(entitlement)
        
        plans[plan_data["name"].lower()] = plan
    
    session.commit()
    print(f"  → Created {len(plans)} subscription plans with entitlements")
    return plans


def seed_users(total_users: int, bots_per_user: int | tuple[int, int], plans: Dict[str, Subscription], session) -> None:
    created_users = 0
    created_bots = 0
    created_subscriptions = 0
    created_entitlements = 0
    created_jobs = 0

    if isinstance(bots_per_user, tuple):
        min_bots, max_bots = bots_per_user
    else:
        min_bots = max_bots = bots_per_user

    try:
        for user_index in range(1, total_users + 1):
            email = f"testuser{user_index}@example.com"
            password = get_password_hash("TestUser123!")
            # Assign plan based on user index (mix of plans)
            plan_name = random.choice(["free", "pro", "enterprise"])
            selected_plan = plans[plan_name]
            
            user = User(
                email=email,
                hashed_password=password,
                full_name=f"Test User {user_index}",
                company_name=f"Test Company {user_index}",
                domain=f"tenant{user_index}.example.com",
                status=UserStatus.ACTIVE,
                settings={"seed_user": True, "index": user_index},
            )
            session.add(user)
            session.flush()  # needed to get user.id for bot FK
            created_users += 1
            
            # Create user subscription
            start_date = date.today() - timedelta(days=random.randint(0, 90))
            end_date = start_date + timedelta(days=365) if plan_name != "free" else None
            user_subscription = UserSubscription(
                user_id=user.id,
                subscription_id=selected_plan.id,
                status=UserSubscriptionStatus.ACTIVE,
                start_date=start_date,
                end_date=end_date,
                auto_renew=random.choice([True, False]),
            )
            session.add(user_subscription)
            session.flush()
            created_subscriptions += 1
            
            # Create user subscription entitlements based on plan entitlements
            plan_entitlements = session.query(Entitlement).filter(
                Entitlement.subscription_id == selected_plan.id
            ).all()
            
            for plan_ent in plan_entitlements:
                # Add some random consumption (10-80% of quota)
                from typing import cast
                quota_value = cast(int, plan_ent.quota)
                quota = quota_value if quota_value > 0 else 1000  # Handle unlimited
                consumption = random.randint(
                    int(quota * 0.1),
                    int(quota * 0.8) if quota > 0 else 500
                ) if quota > 0 else random.randint(100, 800)
                
                user_entitlement = UserSubscriptionEntitlement(
                    user_id=user.id,
                    subscription_id=selected_plan.id,
                    category=plan_ent.category,
                    entitlement=plan_ent.entitlement,
                    unit=plan_ent.unit,
                    quota=plan_ent.quota,
                    consumption=consumption,
                )
                session.add(user_entitlement)
                created_entitlements += 1

            bots_to_create = random.randint(min_bots, max_bots)
            for bot_offset in range(1, bots_to_create + 1):
                bot_global_index = (user_index - 1) * max_bots + bot_offset
                bot = Bot(
                    user_id=user.id,
                    name=f"Test Bot {user_index}-{bot_offset}",
                    description="Auto-generated bot for stress testing.",
                    status=random.choice(
                        [BotStatus.ACTIVE, BotStatus.PAUSED, BotStatus.ARCHIVED]
                    ),
                    branding=build_branding(bot_global_index),
                    llm_config=build_llm_config(),
                    guardrails=build_guardrails(),
                    retrieval_config=build_retrieval(bot_global_index),
                )
                session.add(bot)
                session.flush()  # needed to get bot.id for ingestion jobs
                created_bots += 1
                
                # Create some ingestion jobs for active bots (30% chance)
                from typing import cast
                bot_status_value = cast(str, bot.status.value if hasattr(bot.status, 'value') else bot.status)
                if bot_status_value == BotStatus.ACTIVE.value and random.random() < 0.3:
                    job_status = random.choice([
                        IngestionJobStatus.QUEUED,
                        IngestionJobStatus.PROCESSING,
                        IngestionJobStatus.SUCCEEDED,
                        IngestionJobStatus.FAILED,
                    ])
                    
                    stage = None
                    started_at = None
                    finished_at = None
                    
                    if job_status == IngestionJobStatus.PROCESSING:
                        stage = random.choice([
                            IngestionJobStage.DOWNLOAD,
                            IngestionJobStage.PARSE,
                            IngestionJobStage.CHUNK,
                            IngestionJobStage.EMBED,
                            IngestionJobStage.INDEX,
                        ])
                        started_at = datetime.now() - timedelta(minutes=random.randint(1, 60))
                    elif job_status in [IngestionJobStatus.SUCCEEDED, IngestionJobStatus.FAILED]:
                        stage = IngestionJobStage.INDEX
                        started_at = datetime.now() - timedelta(hours=random.randint(1, 24))
                        finished_at = started_at + timedelta(minutes=random.randint(5, 120))
                    
                    job = IngestionJob(
                        user_id=user.id,
                        bot_id=bot.id,
                        document_id=None,  # Could link to actual documents if we create them
                        job_type=random.choice([
                            IngestionJobType.INGEST_UPLOAD,
                            IngestionJobType.INGEST_URL,
                            IngestionJobType.REINDEX_DOCUMENT,
                        ]),
                        status=job_status,
                        stage=stage,
                        attempts=0 if job_status != IngestionJobStatus.FAILED else random.randint(1, 3),
                        max_attempts=5,
                        logs=[
                            {
                                "timestamp": (started_at or datetime.now()).isoformat(),
                                "level": "info",
                                "message": "Job created"
                            }
                        ] if job_status != IngestionJobStatus.QUEUED else None,
                        started_at=started_at,
                        finished_at=finished_at,
                    )
                    session.add(job)

            if user_index % 50 == 0:
                session.commit()
                print(
                    f"✅ Created {created_users} users / {created_bots} bots / {created_subscriptions} subscriptions / {created_entitlements} entitlements / {created_jobs} jobs so far..."
                )

        session.commit()
        print(f"\n🎉 Done! Created:")
        print(f"   - {created_users} users")
        print(f"   - {created_bots} bots")
        print(f"   - {created_subscriptions} user subscriptions")
        print(f"   - {created_entitlements} user subscription entitlements")
        print(f"   - {created_jobs} ingestion jobs")
    finally:
        session.close()


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Seed the database with lots of users and bots for stress testing."
    )
    parser.add_argument(
        "--users",
        type=int,
        default=1000,
        help="Number of users to create (default: 1000)",
    )
    parser.add_argument(
        "--min-bots",
        type=int,
        default=5,
        help="Minimum bots per user (default: 5)",
    )
    parser.add_argument(
        "--max-bots",
        type=int,
        default=6,
        help="Maximum bots per user (default: 6)",
    )
    parser.add_argument(
        "--skip-subscriptions",
        action="store_true",
        help="Skip creating subscription plans (use existing ones)",
    )
    args = parser.parse_args()

    if args.min_bots > args.max_bots:
        parser.error("--min-bots cannot be greater than --max-bots")

    session = SessionLocal()
    try:
        # Create subscription plans first (if not skipping)
        if not args.skip_subscriptions:
            plans = seed_subscriptions(session)
        else:
            # Load existing plans
            plans = {}
            for plan in session.query(Subscription).all():
                plans[plan.name.lower()] = plan
            if not plans:
                print("⚠️  No existing plans found. Run without --skip-subscriptions first.")
                return
        
        print(
            f"🚀 Generating {args.users} users with {args.min_bots}-{args.max_bots} bots each..."
        )
        seed_users(args.users, (args.min_bots, args.max_bots), plans, session)
    finally:
        session.close()


if __name__ == "__main__":
    main()

