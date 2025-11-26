# Application Security Overview

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

This document summarizes the current end-to-end security posture of the YourBot platform, including authentication, tenant isolation, widget embedding, branding assets, document storage, and known hardening tasks.

---

## 🔑 Identity & Access

- **JWT authentication** (`app/core/security.py`, `app/api/dependencies.py`): bcrypt-hashed passwords, HS256-signed access tokens, enforced expiry, and active-user checks on every guarded route.
- **Tenant isolation**: every bot, document, snippet, and installation record is keyed off the authenticated `users.id`. Business logic always scopes queries by `current_user.id` (e.g. `bot_service.py`, `document_service.py`), preventing cross-tenant access.
- **Role of Alembic**: migrations keep schema in sync across environments; dev `create_all` remains available but production must run `alembic upgrade head`.

See [SECURITY.md](./SECURITY.md) for the detailed JWT/auth checklist.

---

## 🔌 Embed & Widget Security

- Browser widget loads `static/widget.js` → calls `GET /public/embed-config?snippet_id=…` (no auth).
- Backend validates snippet ownership, status, allowed domains, and bot status before responding.
- Response contains theme/branding plus a **short-lived embed JWT** created via `app/core/embed_tokens.py`. Widget stores the token and attaches it to `/api/v1/chat` requests.
- Chat API enforces tenant/bot/snippet claims server-side (`chat.py` via `get_embed_claims` dependency).
- Installation snippets live in `installation_snippets` with status (`active|revoked`), domain allow-list, `usage_count`, and `last_used_at` metrics.

See [EMBED_SECURITY_AND_SNIPPETS.md](./EMBED_SECURITY_AND_SNIPPETS.md) for diagrams, endpoint specs, and troubleshooting.

---

## 🖼️ Branding / Avatar Pipeline

1. **Upload** – Authenticated tenants call `POST /api/v1/uploads/logo`.  
   - Validates extension + MIME type (PNG/JPG/SVG) and ≤10 MB.  
   - Stores file in MinIO using tenant-scoped keys (`brand-logos/{tenant_id}/…`).  
   - Writes metadata into the bot’s `branding` JSONB (logo URL, object key, size, timestamp).
2. **Storage** – Files live only in MinIO; clients never see credentials. `object_key` stays server-side for potential rotation/cleanup.
3. **Public Access** – Widget consumes avatar via `GET /api/v1/uploads/logo/{encoded_key}`.  
   - Endpoint streams bytes from MinIO and now adds permissive CORS so embeds can load on any origin.  
   - URLs are normalized in `embed_config.py` ensuring absolute HTTPS links regardless of where the logo was uploaded.

### Current Security Guarantees
- Uploads require tenant auth and scope to that tenant’s bots.
- Object keys are random + tenant-prefixed, making guessing impractical.
- Widget fetches assets only through the backend; MinIO credentials stay private.

### Recommended Hardening
- **Magic-byte validation** for uploaded files (detect spoofed MIME types).  
- **Optional malware scanning** (e.g., ClamAV) before persisting.  
- **Signed/time-limited URLs** or CDN tokens if brand assets should not be publicly cacheable.  
- **Cache busting** (append `?v=timestamp`) when metadata changes so avatars refresh instantly.  
- **Rate limiting** on `/api/v1/uploads/logo` to block abuse.

---

## 📄 Document & Object Storage

- `documents` table tracks tenant-owned files with `bot_id`, `source_url` (MinIO key), `status` (`pending/processing/indexed/error`), `metadata` JSONB, and timestamps.
- Upload flow (`POST /api/v1/bots/{bot_id}/documents`) ensures the requester owns the bot, generates an object key via `app/utils/object_keys.py`, writes the row, uploads to MinIO, and backfills metadata.
- Downloads (`GET /api/v1/documents/{id}`) stream through the backend and re-check tenant ownership before touching MinIO.
- Deletes remove both the DB row and MinIO object, again scoped to the tenant.

> Tenants never interact with MinIO directly; every action is mediated by FastAPI with ownership checks.

---

## 🌐 CORS & Public Assets

- Global CORS middleware allows the configured frontend origins plus `*` for public widget resources.
- Explicit `OPTIONS` handlers exist for `/api/v1/*` routes, while `/api/v1/uploads/logo/{key}` now returns `Access-Control-Allow-Origin: *` since avatars must render from arbitrary customer domains.
- Widget calls `/public/embed-config` with `credentials: 'omit'` to avoid leaking cookies.

---

## 🛡️ Known Gaps & Hardening Backlog

| Area | Current State | Recommendation |
|------|---------------|----------------|
| Logo upload validation | Extension + MIME check only | Inspect magic bytes; reject malformed files |
| Malware scanning | Not implemented | Optionally integrate ClamAV/Lambda scanning for compliance |
| Public avatar URL lifetime | Static, guess-resistant but permanent | Sign URLs or add short-lived CDN tokens if secrecy is required |
| Rate limiting | Not enforced | Add FastAPI throttling (e.g., slowapi) for uploads/public endpoints |
| Logging & monitoring | Console + structured logs | Ship logs to centralized system; alert on repeated failures |
| Cache invalidation | Cache-Control `max-age=3600` | Append version hashes when logo metadata changes |

---

## ✅ Security Validation Checklist

Use this before shipping to production:

- [ ] `.env` contains unique `SECRET_KEY`, `EMBED_TOKEN_SECRET`, MinIO creds, and production `DATABASE_URL`.
- [ ] `EMBED_TOKEN_TTL_MINUTES` reflects your threat model (default 10).
- [ ] Snippets are restricted to approved domains in production.
- [ ] Upload endpoints tested with invalid file types to confirm rejection.
- [ ] MinIO bucket policies restrict public access (backend-only).
- [ ] Audit logs capture snippet creation, domain edits, and bot state changes.
- [ ] Rate limiting + WAF enabled in front of FastAPI.

For deeper implementation details, cross-reference:

- [SECURITY.md](./SECURITY.md) – Authentication, JWT, and environment security
- [EMBED_SECURITY_AND_SNIPPETS.md](./EMBED_SECURITY_AND_SNIPPETS.md) – Widget/snippet architecture
- [DOCUMENTS_SCHEMA.md](./DOCUMENTS_SCHEMA.md) – Knowledge source storage

This document will evolve as additional hardening tasks are completed.

