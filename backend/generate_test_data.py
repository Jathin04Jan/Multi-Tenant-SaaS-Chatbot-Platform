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

from app.core.database import SessionLocal
from app.core.security import get_password_hash
from app.models.user import User, UserStatus
from app.models.bot import Bot, BotStatus


def build_branding(idx: int) -> Dict[str, str]:
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


def seed_users(total_users: int, bots_per_user: int | tuple[int, int]) -> None:
    session = SessionLocal()
    created_users = 0
    created_bots = 0

    if isinstance(bots_per_user, tuple):
        min_bots, max_bots = bots_per_user
    else:
        min_bots = max_bots = bots_per_user

    try:
        for user_index in range(1, total_users + 1):
            email = f"testuser{user_index}@example.com"
            password = get_password_hash("TestUser123!")
            user = User(
                email=email,
                hashed_password=password,
                full_name=f"Test User {user_index}",
                company_name=f"Test Company {user_index}",
                domain=f"tenant{user_index}.example.com",
                status=UserStatus.ACTIVE,
                plan="pro",
                settings={"seed_user": True, "index": user_index},
            )
            session.add(user)
            session.flush()  # needed to get user.id for bot FK
            created_users += 1

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
                created_bots += 1

            if user_index % 50 == 0:
                session.commit()
                print(
                    f"✅ Created {created_users} users / {created_bots} bots so far..."
                )

        session.commit()
        print(f"\n🎉 Done! Created {created_users} users and {created_bots} bots.")
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
    args = parser.parse_args()

    if args.min_bots > args.max_bots:
        parser.error("--min-bots cannot be greater than --max-bots")

    print(
        f"🚀 Generating {args.users} users with {args.min_bots}-{args.max_bots} bots each..."
    )
    seed_users(args.users, (args.min_bots, args.max_bots))


if __name__ == "__main__":
    main()

