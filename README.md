# YourBot - Multi-Tenant SaaS Chatbot Platform

A production-ready, multi-tenant chatbot platform with glassmorphism UI on React/Vite and a FastAPI + PostgreSQL backend delivering authentication, bot management, RAG configuration, and an embeddable widget system.

## 🎨 Design System

- **Glassmorphism**: Translucent cards with backdrop blur
- **Color Palette**: Indigo primary, Sky accent, Emerald success
- **Animations**: Framer Motion with subtle, performant transitions
- **Light/Dark Themes**: System preference + manual toggle
- **Responsive**: Mobile-first, fully responsive layouts
- **Browser Compatibility**: Optimized for Chrome, Safari, Firefox, and Edge

## 🚀 Quick Start

```bash
# 1. Start required services
docker-compose up -d

# 2. Launch the FastAPI backend
cd backend
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # update if needed
python run.py              # http://localhost:8000

# 3. Run the React frontend
cd ../frontend
npm install
npm run dev                # http://localhost:8080
```

> The backend auto-creates tables for local development. Use Alembic migrations in staging/production.

## 📚 Documentation Map

- [Backend Quick Start (`backend/README.md`)](backend/README.md)
- [Backend Docs Index (`backend/docs/README.md`)](backend/docs/README.md)
- [Setup Guides](backend/docs/README.md#setup--configuration) – virtualenv, database, MinIO
- [Database Schema References](backend/docs/README.md#database) – users, bots, installation snippets
- [Security & Troubleshooting](backend/docs/README.md#security) – JWT, CORS, diagnostics
- **[Embed Security & Code Snippets](backend/docs/EMBED_SECURITY_AND_SNIPPETS.md)** – Complete guide to embed system, security, domain allow-list, and usage tracking

## 📁 Project Structure

```
Multi-Tenant-SaaS-Chatbot-Platform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── marketing/          # Landing page components
│   │   │   ├── onboarding/          # Wizard step components
│   │   │   │   ├── BrandingForm.tsx    # Brand configuration
│   │   │   │   ├── ToneForm.tsx        # Tone and communication style
│   │   │   │   ├── PersonaForm.tsx     # Persona settings
│   │   │   │   ├── GuardrailsForm.tsx  # Guardrails configuration
│   │   │   │   ├── OnboardingPanel.tsx  # Main wizard panel
│   │   │   │   └── BotPreview.tsx      # Live preview component
│   │   │   ├── shell/             # Layout components
│   │   │   │   ├── TopNav.tsx          # Top navigation bar
│   │   │   │   ├── Sidebar.tsx         # Collapsible sidebar
│   │   │   │   ├── Stepper.tsx         # Progress stepper
│   │   │   │   └── ThemeToggle.tsx     # Theme switcher
│   │   │   ├── ui/                 # shadcn/ui components
│   │   │   └── ErrorBoundary.tsx   # Error boundary component
│   │   ├── lib/
│   │   │   ├── api.ts              # REST client for FastAPI backend
│   │   │   ├── theme.ts            # Theme management
│   │   │   ├── zod-schemas.ts      # Form validation schemas
│   │   │   ├── constants.ts        # Shared UI constants (color palettes, etc.)
│   │   │   └── utils.ts            # Utilities
│   │   ├── pages/
│   │   │   ├── dashboard/          # Dashboard pages
│   │   │   │   ├── onboarding/     # Wizard and bots management
│   │   │   │   │   ├── Onboarding.tsx  # Bots list page
│   │   │   │   │   └── ...
│   │   │   │   ├── BotDetail.tsx   # Individual bot detail page
│   │   │   │   ├── Analytics.tsx   # Analytics dashboard
│   │   │   │   ├── Guardrails.tsx  # Guardrails configuration
│   │   │   │   └── settings/       # Settings pages
│   │   │   ├── Landing.tsx         # Marketing landing page
│   │   │   ├── SignUp.tsx          # Authentication pages
│   │   │   └── ...
│   │   ├── store/
│   │   │   └── wizard.ts           # Zustand state management with Safari compatibility
│   │   ├── App.tsx                 # Route configuration
│   │   └── index.css               # Global styles with Safari fixes
│   ├── public/                     # Static assets
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
└── README.md
```

## 🎯 Features Implemented

### ✅ Complete User Flow
1. **Landing Page** - Hero, features, pricing
2. **Authentication** - Sign up, sign in, email verification
3. **Dashboard** - Overview with KPIs and quick actions
4. **Bots Management** - View all bots, create new bots, and manage existing ones
5. **7-Step Bot Creation Wizard**:
   - **Step 1: Brand & Persona** - Assistant name, logo, color theme, welcome message (persisted to `branding`)
   - **Step 2: Tone** - LLM temperature, communication style, editable prompts (stored in `llm_config`)
   - **Step 3: Data Sources** - Upload documents or crawl websites (syncs with retrieval config)
   - **Step 4: Indexing** - Vectorization & RAG pipeline stages with real progress indicators
   - **Step 5: Guardrails** - Content filters, blocked phrases, custom instructions (stored in `guardrails`)
   - **Step 6: Test Chat** - Interactive chat interface reflecting saved configuration
   - **Step 7: Install** - Production embed code backed by `/public/embed-config`
6. **Bot Detail Page** - Comprehensive bot management with:
   - Analytics cards (conversations, users, response time, satisfaction, etc.)
   - Full configuration editing (branding, tone, guardrails)
   - Knowledge base management (documents and data sources)
   - Bot status controls (Start/Pause/Stop)
   - Settings and preferences
7. **Analytics** - Dashboard with metrics and charts
8. **Settings** - Profile & API Keys management (backed by FastAPI)
9. **Embed Widget** - Runtime-configurable widget served from FastAPI `static/widget.js`

### 🎨 Design Features
- Glass-card utility class for consistent surfaces
- Animated gradient backgrounds
- Smooth page transitions with Framer Motion
- Collapsible sidebar navigation
- Centered modal dialogs for bot creation
- Focus rings and accessibility features
- Responsive tables and forms
- Real-time bot preview with live updates

### 🔧 Technical Features
- **State Management**: Zustand with persistence (Safari-compatible Set serialization)
- **Form Validation**: React Hook Form + Zod
- **API Layer**: Typed REST client communicating with the FastAPI backend
- **Type Safety**: Strict TypeScript end-to-end
- **Icons**: Lucide React
- **Date Formatting**: Day.js with relative time
- **Error Handling**: React Error Boundaries for graceful error handling
- **Browser Compatibility**: Safari-specific fixes for Set serialization and CSS transforms
- **Bot Management**: Complete CRUD operations persisted in PostgreSQL
- **Configuration Editing**: Full editing capabilities for all bot settings post-creation
- **RAG Integration**: Vectorization and embedding generation pipeline visualization
- **Navigation**: Collapsible sidebar with persistent state
- **Widget Delivery**: Static `widget.js` served by FastAPI with runtime theming via `/public/embed-config`

## 🔌 API Integration

The frontend talks directly to the FastAPI backend via the typed helpers in `src/lib/api.ts`.

Key endpoints:
- `POST /api/v1/auth/signup` / `signin` / `PATCH /auth/me` for onboarding and account updates
- `GET/POST/PATCH/DELETE /api/v1/bots` for complete bot lifecycle management
- `POST /api/v1/bots/{bot_id}/snippets` for installation snippet creation (auto-created, one per bot)
- `GET /api/v1/bots/{bot_id}/snippets` for listing snippets for a bot
- `GET/PATCH/DELETE /api/v1/snippets/{snippet_id}` for installation snippet management
- `GET /public/embed-config?snippet_id=...` to serve runtime embed configuration with JWT tokens (ACTIVE bots only)
- `POST /api/v1/chat` for widget chat messages (JWT-authenticated)

Supporting services:
- PostgreSQL for relational data (users, bots, installation snippets)
- MinIO for document storage
- Alembic migrations for schema evolution (optional during local dev)

### 🧪 Load/Stress Testing
Need thousands of records to test pagination, embeds, or analytics? Use the backend seeding script:

```bash
cd backend
python generate_test_data.py            # defaults: 1000 users, 5–6 bots each
python generate_test_data.py --users 200 --min-bots 4 --max-bots 8
```

The script creates active “Test User N” accounts with realistic bot configurations (branding, guardrails, RAG settings) so every downstream feature has data. Never run this against production—it's only for local/staging environments.

> Need additional routes? Extend the FastAPI routers under `backend/app/api/v1/` and add matching functions in `frontend/src/lib/api.ts`.

## 🤖 Bot Management Features

### Bot Creation Flow
1. **Bots Page** - View all created bots in a grid layout
2. **Create New Bot** - Click the "+" card to open the creation wizard
3. **7-Step Wizard** - Complete configuration in a centered modal dialog:
   - Configure branding, tone, data sources, indexing, guardrails, test, and install
4. **Live Preview** - Real-time preview of bot appearance during configuration

### Bot Detail Page
Access by clicking any bot card from the Bots page. Features include:

- **Analytics Dashboard**:
  - Total conversations with trend indicators
  - Active users count
  - Average response time
  - Satisfaction score
  - Messages sent/received
  - Uptime statistics

- **Configuration Tab** (Fully Editable):
  - **Bot Configuration**: Assistant name, welcome message, color theme selection
  - **Tone & Communication**: LLM temperature slider, communication style selection, editable style prompts
  - **Guardrails**: Response length, blocked phrases, content filters (explicit, political, personal info), custom instructions

- **Manage Knowledge Base Tab**:
  - View and manage uploaded documents
  - Manage crawled websites
  - Add new documents or websites

- **Analytics Tab**: Detailed analytics and performance metrics (placeholder)

- **Settings Tab**: 
  - Bot status controls (Enable Bot, Public Access, Auto-respond)
  - **Installation Snippet Management**:
    - View snippet details (usage count, last used, allowed domains)
    - Edit snippet (domain allow-list, status)
    - Copy embed code
    - Revoke or delete snippet
    - Auto-refresh every 30 seconds
    - Manual refresh button

- **Quick Actions**: Start/Pause/Stop bot, Edit, Share, Embed Code, Export Data, Delete (wired to backend actions)

## 🎨 Customizing Design Tokens

### Update Brand Colors
Edit `src/index.css`:
```css
:root {
  --primary: 239 84% 67%;        /* Indigo */
  --accent: 199 89% 48%;         /* Sky blue */
  --success: 142 71% 45%;        /* Emerald */
  --glass-bg: 0 0% 100% / 0.1;   /* Glass effect */
}
```

### Per-Tenant Branding
Branding data captured in the wizard is persisted to PostgreSQL in the `branding` JSONB field. This includes:
- Logo and avatar URLs
- Primary and background colors
- Welcome and intro messages
- Assistant name and chat title
- Widget positioning (bottom-right, bottom-left, etc.)
- Widget sizing (height, width)

The public embed endpoint (`/public/embed-config`) reads from the `branding` JSONB field and delivers runtime theming to `widget.js`.

## 🧪 Widget Testing (Local)

To validate the production-style embed locally:

1. **Start services**: `docker-compose up -d`, run `python backend/run.py`, and `npm run dev` from `frontend/`.
2. **Create & activate a bot**: Finish the 7-step wizard (bots are auto-activated) or toggle status to `active` on the Bot Detail page.
3. **Get the embed snippet**: 
   - After bot creation, snippet is auto-created
   - Or go to Bot Detail → Settings → Installation Snippet
   - Copy the embed code (uses `data-snippet-id`, not `data-bot-id`)
4. **Copy the embed snippet**:
   ```html
   <!-- Add this before closing </body> tag -->
   <script 
     src="http://localhost:8000/static/widget.js"
     data-snippet-id="0af28c2a-764a-425e-9043-2710aa1b1011"
     async>
   </script>
   ```
5. **Drop it into HTML**: 
   - Quick check: edit `backend/static/test.html` and swap in your snippet ID.  
   - Or create your own page and paste the snippet before `</body>`.
6. **Verify**: 
   - Only `ACTIVE` bots render
   - Only `active` snippets work
   - Domain allow-list is validated (if configured)
   - Theme, intro message, and positioning match your bot
   - Use DevTools ↦ Network to inspect `/public/embed-config?snippet_id=...` if debugging

> **Note**: The widget uses `data-snippet-id` (UUID) for security. Legacy `data-bot-id` is supported but deprecated.

### Installation Snippet Features

- **One Snippet Per Bot**: System automatically creates/updates one snippet per bot
- **Domain Allow-List**: Restrict where snippet can be embedded
- **Usage Tracking**: Tracks widget loads and chat messages
- **Auto-Refresh**: Usage stats update every 30 seconds
- **Manual Refresh**: Click "Refresh" button for immediate update
- **Status Management**: Activate/revoke snippets without deleting

## 🔐 Security Features

### Authentication & Authorization
- **JWT Authentication**: Secure token-based authentication for all API endpoints
- **Password Hashing**: bcrypt with automatic salt generation
- **Token Expiration**: Configurable token expiration (default 7 days)
- **User Status Management**: Active, pending verification, suspended states

### Embed Security
- **Short-Lived JWT Tokens**: Widgets receive 10-minute tokens (no API keys in frontend)
- **Domain Allow-List**: Restrict where snippets can be embedded
- **Snippet Status Management**: Active/revoked status control
- **Bot Status Verification**: Only ACTIVE bots can be embedded
- **One Snippet Per Bot**: Enforced to prevent confusion
- **Origin Tracking**: Token includes request origin for audit

### Data Security
- **Input Validation**: All forms use Zod schemas
- **SQL Injection Protection**: SQLAlchemy ORM prevents injection attacks
- **Environment Variables**: All sensitive data in `.env` (gitignored)
- **CORS Configuration**: Restricted to frontend domains
- **No Hardcoded Secrets**: All secrets loaded from environment

## 🌙 Theme Toggle

Switch between light/dark modes:
```typescript
import { useTheme } from '@/lib/theme';

const { theme, setTheme } = useTheme();
setTheme('dark' | 'light' | 'system');
```

## 🌐 Browser Compatibility

The application is fully optimized for all modern browsers:

- ✅ **Chrome/Edge**: Full feature support
- ✅ **Safari**: Includes Safari-specific fixes for:
  - Set serialization in localStorage (Zustand persist)
  - CSS backdrop-filter compatibility
  - Framer Motion animation optimizations
  - Hardware acceleration for smooth performance
- ✅ **Firefox**: Full feature support

### Safari-Specific Optimizations

The application includes several Safari compatibility fixes:

1. **Set Serialization**: Custom serialization/deserialization for Zustand's persist middleware to handle Safari's localStorage behavior
2. **CSS Hardware Acceleration**: Added `transform: translateZ(0)` and `will-change` properties for smooth rendering
3. **Error Boundaries**: Added React Error Boundaries to catch and display errors gracefully
4. **Animation Compatibility**: Safari-specific motion component wrapper for consistent animations across browsers

## 📦 Key Dependencies

- **React 18** + **Vite** - Fast dev experience
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Radix-based components
- **Framer Motion** - Animations
- **Zustand** - Lightweight state
- **TanStack Query** - Data fetching
- **React Hook Form** + **Zod** - Forms & validation
- **Lucide React** - Icons
- **Day.js** - Date utilities

## 🚢 Deployment

1. Navigate to the frontend directory and build the project:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `frontend/dist/` folder to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Any static hosting

3. Set environment variables for backend URLs in production.

### Environment Variables

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=https://api.yourbot.com
VITE_ENVIRONMENT=production
```

## 🧩 Next Steps

- [x] Add error boundaries and logging
- [x] Safari browser compatibility fixes
- [x] Complete bot management system with detail pages
- [x] Full configuration editing for all bot settings
- [x] Enhanced onboarding flow with 7 steps
- [x] Vectorization and RAG processing display
- [x] Collapsible sidebar navigation
- [x] Connect real backend APIs
- [x] Serve production-ready embed widget
- [x] Production-grade embed security with JWT tokens
- [x] Domain allow-list management
- [x] Usage tracking (widget loads + chat messages)
- [x] One snippet per bot enforcement
- [x] Auto-refresh and manual refresh for snippet analytics
- [x] Comprehensive documentation for embed security and code snippets
- [ ] Add WebSocket-powered live analytics
- [ ] Implement deep-chat conversation engine
- [ ] Implement advanced auth flows (OAuth/SSO/SAML)
- [ ] Add unit tests (Vitest) and e2e tests (Playwright)
- [ ] Set up CI/CD pipeline
- [ ] Build real-time document indexing status dashboard
- [ ] Ship advanced analytics visualizations

## 📝 Notes

- This is a **UI-complete** implementation with mock data
- All routes and flows are functional
- Forms have full validation
- Responsive design for all screen sizes
- Accessible with keyboard navigation
- Ready to connect real backend
- **Browser Compatibility**: Fully tested and optimized for Chrome, Safari, Firefox, and Edge
- **Error Handling**: Comprehensive error boundaries catch and display errors gracefully
- **State Persistence**: Safari-compatible state management with proper Set serialization
- **Bot Management**: Complete bot lifecycle management from creation to editing
- **Navigation**: Intuitive sidebar navigation with collapsible functionality
- **Onboarding**: Streamlined 7-step wizard for bot creation in a centered modal
- **Configuration**: Every aspect of bot configuration is editable post-creation
- **RAG Integration**: Detailed vectorization and embedding process visualization
- **Knowledge Base**: Document and data source management with upload and crawl capabilities

## 🙏 Credits

Built with ❤️ using React and modern web technologies.
