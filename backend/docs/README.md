# Backend Documentation

[← Backend Quick Start](../README.md) · [Project Overview](../../README.md)

This directory contains detailed documentation for the backend API.

## 📚 Documentation Index

### Setup & Configuration
- **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** - Complete backend setup walkthrough
- **[MINIO_SETUP.md](./MINIO_SETUP.md)** - MinIO object storage setup
- **[SETUP_ENV.md](./SETUP_ENV.md)** - Environment variable setup guide
- **[DEV_WORKFLOW.md](./DEV_WORKFLOW.md)** - Development workflow and best practices
- **[README_DEV.md](./README_DEV.md)** - Additional development documentation
- **`../generate_test_data.py`** - Command-line seeding script for generating thousands of users/bots for stress tests

### Database
- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** – PostgreSQL container management guide
- **[DATABASE_VISUALIZATION.md](./DATABASE_VISUALIZATION.md)** – Tools to visualize and browse your database (pgAdmin, TablePlus, etc.)
- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** – Complete database schema documentation
- **[FINAL_SCHEMA.md](./FINAL_SCHEMA.md)** – Final database schema reference (all tables, including crawl-aware documents)
- **[SCHEMA_DIAGRAM.md](./SCHEMA_DIAGRAM.md)** – ER diagram of all tables and relationships
- **[BOTS_SCHEMA.md](./BOTS_SCHEMA.md)** – Bots table schema documentation
- **[DOCUMENTS_SCHEMA.md](./DOCUMENTS_SCHEMA.md)** – Knowledge source/document storage schema (details file-type/size limits and URL support)
- **[INSTALLATION_SNIPPETS_SCHEMA.md](./INSTALLATION_SNIPPETS_SCHEMA.md)** – Installation snippets table schema documentation
- **[PRICING_PLANS_SCHEMA.md](./PRICING_PLANS_SCHEMA.md)** – Pricing plans and country-specific pricing schema (global, admin-only)
- **[ENTITLEMENTS_SCHEMA.md](./ENTITLEMENTS_SCHEMA.md)** – Subscription plan entitlements/limits schema (global, admin-only)
- **[USER_SUBSCRIPTIONS_SCHEMA.md](./USER_SUBSCRIPTIONS_SCHEMA.md)** – User subscription instances schema (includes computed properties: `is_active`, `is_expired`)
- **[USER_SUBSCRIPTION_ENTITLEMENTS_SCHEMA.md](./USER_SUBSCRIPTION_ENTITLEMENTS_SCHEMA.md)** – Per-user entitlement usage and consumption tracking schema (includes computed properties: `balance`, `is_exceeded`, `usage_percentage`)
- **[INGESTION_JOBS_SCHEMA.md](./INGESTION_JOBS_SCHEMA.md)** – RAG pipeline jobs for document processing schema (includes computed properties: `is_completed`, `is_active`, `can_retry`, `duration_seconds`)
- **[APP_SETTINGS_SCHEMA.md](./APP_SETTINGS_SCHEMA.md)** – Global application settings and landing page content schema (admin-only)
- **[GLOBAL_CONFIGURATION_TABLES.md](./GLOBAL_CONFIGURATION_TABLES.md)** – Overview of global configuration tables (pricing plans, entitlements, user subscriptions, app settings)
- **[MIGRATIONS_VS_CREATE_ALL.md](./MIGRATIONS_VS_CREATE_ALL.md)** – Explanation of Alembic migrations vs `create_all()`

### Security
- **[SECURITY.md](./SECURITY.md)** - Security features and best practices
- **[EMBED_SECURITY_AND_SNIPPETS.md](./EMBED_SECURITY_AND_SNIPPETS.md)** - Comprehensive guide to embed security, code snippets, domain allow-list, and usage tracking
- **[APPLICATION_SECURITY.md](./APPLICATION_SECURITY.md)** - Holistic security overview covering auth, embed tokens, avatars, storage, and hardening backlog

### Admin & Management
- **[ADMIN_DEVELOPER_MODE.md](./ADMIN_DEVELOPER_MODE.md)** - Admin authentication, Developer Mode UI, and master table management guide

### Technical Explanations
- **[EXPLANATIONS.md](./EXPLANATIONS.md)** - Technical concepts (SQLAlchemy, Alembic, etc.)
- **[SQLALCHEMY_VS_RAW_SQL.md](./SQLALCHEMY_VS_RAW_SQL.md)** - SQLAlchemy vs raw SQL comparison

### Troubleshooting
- **[DIAGNOSTIC.md](./DIAGNOSTIC.md)** - Route registration diagnostic guide
- **[FIX_CORS.md](./FIX_CORS.md)** - CORS configuration and troubleshooting

## 🚀 Quick Start

For quick setup instructions, see the main [README.md](../README.md) in the backend root directory.
