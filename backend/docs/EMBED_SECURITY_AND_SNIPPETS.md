# Embed Security & Code Snippet System

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Security Model](#security-model)
4. [Code Snippet Flow](#code-snippet-flow)
5. [Domain Allow-List](#domain-allow-list)
6. [Usage Tracking](#usage-tracking)
7. [API Endpoints](#api-endpoints)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The embed system allows customers to install chatbots on their websites using a simple JavaScript snippet. The system is designed with **production-grade security** using:

- **Short-lived JWT tokens** (no API keys in frontend)
- **Domain allow-list validation**
- **Snippet status management** (active/revoked)
- **Bot status verification**
- **One snippet per bot** enforcement
- **Comprehensive usage tracking**

---

## 🏗️ Architecture

### Components

```
┌─────────────────┐
│  Customer Site  │
│  (HTML Page)    │
└────────┬────────┘
         │
         │ 1. Loads widget.js
         ▼
┌─────────────────┐
│   widget.js     │
│  (Static File)  │
└────────┬────────┘
         │
         │ 2. GET /public/embed-config?snippet_id=...
         ▼
┌─────────────────┐
│  FastAPI Backend│
│  /public/embed- │
│  config         │
└────────┬────────┘
         │
         │ 3. Validates & Returns JWT Token
         ▼
┌─────────────────┐
│   widget.js     │
│  (Stores Token) │
└────────┬────────┘
         │
         │ 4. POST /api/v1/chat
         │    Authorization: Bearer <token>
         ▼
┌─────────────────┐
│  FastAPI Backend│
│  /api/v1/chat   │
└─────────────────┘
```

### Data Flow

1. **Snippet Creation**: User creates a bot → System auto-creates one snippet per bot
2. **Snippet Installation**: Customer pastes snippet on their website
3. **Widget Load**: Browser loads `widget.js` and calls `/public/embed-config`
4. **Token Generation**: Backend validates and issues short-lived JWT
5. **Chat Communication**: Widget uses JWT to authenticate chat requests

---

## 🔐 Security Model

### Multi-Layer Security

#### Layer 1: Snippet-Level Security

- **Snippet ID (UUID)**: Public identifier, not sensitive
- **Status Field**: `active` | `revoked` - controls if snippet can be used
- **Domain Allow-List**: Restricts which domains can use the snippet
- **One Snippet Per Bot**: Prevents duplicate snippets and confusion

#### Layer 2: Token-Based Authentication

- **Short-Lived JWTs**: Tokens expire in 10 minutes (configurable)
- **Separate Secret**: `EMBED_TOKEN_SECRET` (different from main JWT secret)
- **Token Claims**: Includes `tenant_id`, `bot_id`, `snippet_id`, `origin`
- **No API Keys**: Tokens are generated server-side, never exposed in snippet

#### Layer 3: Request Validation

- **Domain Validation**: Origin is checked against snippet's `allowed_domains`
- **Snippet Status**: Only `active` snippets can receive tokens
- **Bot Status**: Only `ACTIVE` bots can be embedded
- **Ownership Verification**: Token claims are verified against database

#### Layer 4: Chat Endpoint Security

- **JWT Verification**: Every chat request requires valid JWT token
- **Claim Validation**: `tenant_id`, `bot_id`, `snippet_id` are verified
- **Server-Side Lookup**: Bot and snippet are loaded from database (not trusted from client)
- **Usage Tracking**: Every message increments usage count

### Branding Assets in the Widget

- Avatar/logo URLs come from the bot’s `branding` JSONB.  
- `/public/embed-config` rewrites any relative or localhost URLs so embeds always load from `https://<api-host>/api/v1/uploads/logo/{key}`.  
- The logo streaming endpoint sits behind FastAPI, adds explicit CORS headers, and never exposes MinIO credentials.  
- See [APPLICATION_SECURITY.md](./APPLICATION_SECURITY.md#🖼️-branding--avatar-pipeline) for the full pipeline and hardening backlog (magic-byte validation, cache busting, signed URLs, etc.).

---

## 🔄 Code Snippet Flow

### Step 1: Snippet Creation

When a bot is created and activated, the system automatically creates an installation snippet:

```python
# Backend: POST /api/v1/bots/{bot_id}/snippets
{
  "environment": "production",
  "allowed_domains": null  # or ["example.com"] for restrictions
}
```

**Response:**
```json
{
  "id": "0af28c2a-764a-425e-9043-2710aa1b1011",
  "embed_code": "<!-- Add this before closing </body> tag -->\n<script \n  src=\"https://api.yourapp.com/static/widget.js\"\n  data-snippet-id=\"0af28c2a-764a-425e-9043-2710aa1b1011\"\n  async>\n</script>",
  "status": "active",
  "allowed_domains": null
}
```

### Step 2: Customer Installation

Customer pastes the snippet into their HTML:

```html
<!-- Add this before closing </body> tag -->
<script 
  src="https://api.yourapp.com/static/widget.js"
  data-snippet-id="0af28c2a-764a-425e-9043-2710aa1b1011"
  async>
</script>
```

### Step 3: Widget Initialization

When the page loads, `widget.js`:

1. **Reads `data-snippet-id`** from the script tag
2. **Fetches configuration** from `/public/embed-config?snippet_id=...`
3. **Receives JWT token** along with theme configuration
4. **Stores token** for subsequent chat requests
5. **Renders chatbot UI** with theme and intro message

### Step 4: Chat Communication

When user sends a message:

1. **Widget sends request** to `/api/v1/chat` with `Authorization: Bearer <token>`
2. **Backend verifies JWT** and extracts claims
3. **Backend validates** snippet, bot, and ownership
4. **Backend processes** message (LLM/RAG integration)
5. **Backend returns** response
6. **Usage count incremented** (both widget load and messages)

---

## 🌐 Domain Allow-List

### How It Works

The domain allow-list restricts where snippets can be embedded:

- **`null` or empty**: No restrictions (can be used on any domain)
- **Array of domains**: Only listed domains can use the snippet

### Domain Extraction

The system automatically extracts hostnames from URLs:

- `http://example.com/page` → `example.com`
- `https://www.example.com` → `www.example.com`
- `example.com` → `example.com`
- `localhost:3000` → `localhost`

### Validation Flow

```
1. Widget loads on customer site (origin: https://example.com)
2. Widget calls /public/embed-config?snippet_id=...
3. Backend extracts origin from request headers
4. Backend checks if origin matches snippet's allowed_domains
5. If match (or null = allow all) → Issue token
6. If no match → Return 403 Forbidden
```

### Frontend Management

Users can manage domains in the Bot Detail page:

- **Allow All Domains**: Toggle to enable/disable restrictions
- **Add Domains**: Enter domain or URL, system extracts hostname
- **Remove Domains**: Click X on domain badge
- **Auto-Sync**: Toggle automatically turns OFF when domains are added

---

## 📊 Usage Tracking

### What Gets Tracked

The `usage_count` and `last_used_at` fields track two types of usage:

1. **Widget Loads**: When `/public/embed-config` is called
2. **Chat Messages**: When `/api/v1/chat` is called

### Why Both?

- **Widget Loads**: Shows how many times the snippet was installed/accessed
- **Chat Messages**: Shows actual engagement and usage

### Analytics

The Bot Detail page displays:
- **Usage Count**: Total widget loads + chat messages
- **Last Used**: Most recent widget load or chat message
- **Auto-Refresh**: Updates every 30 seconds
- **Manual Refresh**: Click "Refresh" button for immediate update

---

## 🔌 API Endpoints

### Public Endpoints (No Authentication)

#### `GET /public/embed-config`

Fetches widget configuration and receives JWT token.

**Query Parameters:**
- `snippet_id` (required): Installation snippet UUID
- `bot_id` (deprecated): Legacy support, use `snippet_id`

**Request Headers:**
- `Origin`: Automatically sent by browser
- `Referer`: Fallback if Origin is missing

**Response:**
```json
{
  "api_base": "https://api.yourapp.com",
  "theme": {
    "primary_color": "#8b5cf6",
    "background_color": "#ffffff",
    "chat_title": "YourBot Assistant",
    "intro_message": "Hello! How can I help you today?",
    "avatar_url": null,
    "position": "bottom-right",
    "height": 600,
    "width": 400
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Security Checks:**
- ✅ Snippet exists and is `active`
- ✅ Domain matches `allowed_domains` (if restricted)
- ✅ Bot is `ACTIVE`
- ✅ Updates `usage_count` and `last_used_at`

### Authenticated Endpoints

#### `POST /api/v1/bots/{bot_id}/snippets`

Creates or gets installation snippet for a bot.

**Request Body:**
```json
{
  "environment": "production",
  "allowed_domains": ["example.com"]  // optional, null = allow all
}
```

**Response:**
- `201 Created` if new snippet created
- `200 OK` if existing snippet returned/updated

**Security:**
- ✅ Requires JWT authentication
- ✅ Verifies user owns the bot
- ✅ Enforces one snippet per bot

#### `GET /api/v1/bots/{bot_id}/snippets`

Lists all snippets for a bot.

**Response:**
```json
[
  {
    "id": "0af28c2a-764a-425e-9043-2710aa1b1011",
    "name": "Snippet for BotName",
    "status": "active",
    "allowed_domains": ["example.com"],
    "usage_count": 24,
    "last_used_at": "2024-01-15T10:30:00Z",
    "created_at": "2024-01-01T12:00:00Z"
  }
]
```

#### `PATCH /api/v1/snippets/{snippet_id}`

Updates snippet (domains, status, name).

**Request Body:**
```json
{
  "allowed_domains": ["example.com", "www.example.com"],  // or null for allow all
  "status": "active",  // or "revoked"
  "name": "Updated Snippet Name"
}
```

**Security:**
- ✅ Requires JWT authentication
- ✅ Verifies user owns the snippet
- ✅ Validates domain format

#### `DELETE /api/v1/snippets/{snippet_id}`

Deletes a snippet.

**Security:**
- ✅ Requires JWT authentication
- ✅ Verifies user owns the snippet

### Chat Endpoint

#### `POST /api/v1/chat`

Handles chat messages from embedded widgets.

**Request Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "Hello, how can you help me?"
}
```

**Response:**
```json
{
  "response": "Hello! I'm here to help...",
  "bot_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "snippet_id": "0af28c2a-764a-425e-9043-2710aa1b1011"
}
```

**Security:**
- ✅ Requires valid JWT token
- ✅ Verifies token claims (`tid`, `bid`, `sid`)
- ✅ Validates snippet and bot status
- ✅ Verifies ownership
- ✅ Increments usage count
- ✅ Updates `last_used_at`

---

## 🛡️ Best Practices

### For Developers

1. **Never Expose API Keys**: Use JWT tokens generated server-side
2. **Validate Domains**: Always check domain allow-list on widget load
3. **Short Token TTL**: Keep embed token expiration short (default 10 minutes)
4. **Separate Secrets**: Use different secrets for embed tokens vs main JWT
5. **Status Management**: Use `status` field, not just `is_active`
6. **One Snippet Per Bot**: Enforce this rule to prevent confusion
7. **Log Usage**: Track both widget loads and messages for accurate analytics

### For Users

1. **Domain Restrictions**: Use domain allow-list for production snippets
2. **Snippet Management**: Revoke snippets if compromised
3. **Monitor Usage**: Check usage count regularly
4. **Test Before Deploy**: Test snippets on staging domains first
5. **Keep Bots Active**: Only `ACTIVE` bots can be embedded

### Security Checklist

- [x] Snippet uses `data-snippet-id` (not `data-bot-id`)
- [x] Widget loads from your API domain
- [x] Domain allow-list configured for production
- [x] Snippet status is `active`
- [x] Bot status is `ACTIVE`
- [x] JWT tokens expire quickly (10 minutes)
- [x] No API keys in frontend code
- [x] Usage tracking enabled

---

## 🔧 Troubleshooting

### Widget Not Loading

**Symptoms:** Chat button doesn't appear, console errors

**Checks:**
1. Verify snippet ID is correct in embed code
2. Check browser console for errors
3. Verify `/public/embed-config` returns 200 OK
4. Check if bot is `ACTIVE`
5. Check if snippet status is `active`
6. Verify domain is in allow-list (if restricted)

### Domain Not Allowed Error

**Symptoms:** `403 Forbidden: Domain 'example.com' is not allowed`

**Solution:**
1. Go to Bot Detail → Settings → Installation Snippet
2. Click "Edit" on the snippet
3. Turn OFF "Allow All Domains"
4. Add the domain to the allow-list
5. Save changes

### Token Expired Error

**Symptoms:** `401 Unauthorized: Invalid or expired token`

**Solution:**
- This is normal - tokens expire after 10 minutes
- Widget will automatically fetch a new token on next message
- If persistent, check `EMBED_TOKEN_TTL_MINUTES` setting

### Usage Count Not Updating

**Symptoms:** Usage count stays at 0

**Checks:**
1. Verify widget is actually loading (check Network tab)
2. Check if `/public/embed-config` is being called
3. Verify database connection
4. Check backend logs for errors
5. Click "Refresh" button on Bot Detail page

### Domain Not Saving

**Symptoms:** Domains added but disappear after save

**Solution:**
1. Ensure "Allow All Domains" toggle is OFF
2. Verify domain is in the list before saving
3. Check browser console for errors
4. Verify backend received the update (check logs)
5. Check database directly to confirm save

---

## 📚 Related Documentation

- [Installation Snippets Schema](./INSTALLATION_SNIPPETS_SCHEMA.md) - Complete table schema
- [Security Implementation](./SECURITY.md) - General security features
- [Bots Schema](./BOTS_SCHEMA.md) - Bot table structure and branding JSONB configuration

---

## 🔗 Quick Links

- [Backend Quick Start](../README.md)
- [Docs Index](./README.md)
- [Project Overview](../../README.md)

