# Frontend UI Features Documentation

This document provides a comprehensive breakdown of the User Interface (UI) features for the Multi-Tenant SaaS Chatbot Platform. The application uses a glassmorphism design language with a focus on smooth interactions, responsiveness, and dark mode support.

---

## 🎨 Global Design System

*   **Visual Style**: "Glassmorphism" — translucent cards, backdrops, and overlays with blur effects.
*   **Color Palette**:
    *   **Primary**: Indigo (`text-indigo-500`, `bg-indigo-500`)
    *   **Accent**: Sky Blue
    *   **Success**: Emerald Green
    *   **Backgrounds**: Animated gradients (blob animations) in the background.
*   **Typography**: Modern sans-serif (Inter/SF Pro).
*   **Motion**: `framer-motion` is used for:
    *   Page transitions (fade/slide in).
    *   Hover effects (scale/lift).
    *   Staggered list animations.
    *   Sidebar expansion/collapse.
*   **Theme**:
    *   **Dark Mode**: First-class citizen. All components react to `dark` class.
    *   **Toggle**: Manual switch (Sun/Moon icon) available in the Top Navigation.
*   **Responsiveness**: Mobile-first design; collapsible sidebar logic adapts to screen size.

---

## 🧭 Navigation & Layout

### 1. Sidebar (`src/components/shell/Sidebar.tsx`)
A vertical navigation bar on the left side.
*   **State**: Collapsible (Expand/Collapse).
    *   *Collapsed*: Shows icons only (w-16).
    *   *Expanded*: Shows icons + text labels (w-64).
    *   *Toggle Button*: Located at the top-right edge of the sidebar; visible on hover/always.
*   **Navigation Items**:
    1.  **Home** (`LayoutDashboard` icon): Links to `/dashboard`.
    2.  **Bots** (`Bot` icon): Links to `/dashboard/onboarding` (Bot Management).
    3.  **Dashboard** (`BarChart3` icon): Links to `/dashboard/analytics` (Analytics).
    4.  **Billing** (`CreditCard` icon): Links to `/dashboard/settings/billing`.
*   **Interactions**:
    *   Active state highlight: `bg-primary` text `primary-foreground` with shadow.
    *   Hover state: `bg-muted/50`.
    *   Smooth width transition (`duration-500`).

### 2. Top Navigation (`src/components/shell/TopNav.tsx`)
Fixed header at the top of the screen.
*   **Left Side**:
    *   **Logo**: Circular container with `Bot` icon.
    *   **App Name**: "YourBot" text.
*   **Right Side**:
    *   **Theme Toggle**: Sun/Moon icon button.
    *   **Notifications**: Bell icon (Outline variant).
    *   **Profile Dropdown**:
        *   **Trigger**: User Avatar (with initials).
        *   **Menu Content**:
            *   **Header**: Large avatar, user name, email.
            *   **Logout Button**: Full-width, distinct style.
            *   **Settings Group**:
                *   *Profile*: Links to `/dashboard/settings/profile`.
                *   *Appearance*: Links to `/dashboard/settings/appearance`.

---

## 🏠 Dashboard Overview (`src/pages/dashboard/Overview.tsx`)

The main landing page after login (`/dashboard`).

### 1. Welcome Section
*   **Greeting**: "Welcome back, [User Name]!".
*   **Subtext**: "Here's your workspace at a glance."
*   **Animation**: Staggered fade-in on load.

### 2. System Status
A set of indicators showing the health of the platform services.
*   **Badge**: "All Systems Operational".
*   **Cards**:
    *   API Status (Green Check)
    *   Vector DB (Green Database)
    *   LLM Service (Green Bot)
    *   Data Sync (Yellow/Syncing Refresh icon)

### 3. Quick Actions
Dynamic cards that change based on user state (Onboarding Complete vs. In-Progress).
*   **Logic**: Checks `completedSteps` from `wizardStore`.
*   **Cards (Post-Onboarding)**:
    1.  **Manage Documents**: Blue icon, links to `/dashboard/knowledge`.
    2.  **Manage Data Sources**: Green icon, links to `/dashboard/sources`.
    3.  **Configure Bot**: Purple icon, links to `/dashboard/agents`.
    4.  **View Embed Code**: Orange icon, opens `EmbedCodeDialog`.
*   **Cards (Pre-Onboarding)**:
    *   "Resume Onboarding", "Start Setup" variants targeting `/dashboard/onboarding`.

### 4. Activity Feeds (Two-Column Grid)
*   **Recent Activity**:
    *   List of system events (New conversation, Document indexed, etc.).
    *   Formatted with localized relative time (e.g., "2 minutes ago").
*   **Recent Conversations**:
    *   Preview of chat logs.
    *   Status badges ("Active", "Resolved").
    *   "View All" link.

### 5. Performance Highlights
Three stats cards displaying KPIs:
1.  **Success Rate**: Percentage + progress bar.
2.  **Avg Session**: Duration (minutes).
3.  **Active Users**: Count (Weekly).

### 6. Getting Started Guide
Visible if the user is new.
*   **Checklist**:
    1.  Configure bot's personality (Done/Pending).
    2.  Add knowledge base documents (Done/Pending).
    3.  Test your chatbot (Done/Pending).
    4.  Deploy to your website (Done/Pending).
*   **Action**: "Continue Setup" button.

---

## 🤖 Bot Management

### 1. Bots List (`src/pages/dashboard/onboarding/Onboarding.tsx`)
*   **Grid Layout**: Displays all created bots as cards.
*   **Card Content**:
    *   Bot Name & Avatar.
    *   Status Badge (Active/Inactive).
    *   "Manage" button.
*   **"Add New" Card**: Dashed border card to trigger the creation wizard.

### 2. Creation Wizard
A 7-step modal experience for creating a new bot.
*   **UI Container**: Centered modal with backdrop blur.
*   **Stepper**: Visual progress indicator (Dots/Numbers).
*   **Steps**:
    1.  **Brand & Persona**: Name, Logo Upload (Drag & Drop + Zoom Slider), Color Picker.
    2.  **Tone**: Personality sliders (Temperature), Custom Prompts.
    3.  **Data Sources**: File Upload (PDF/TXT), Website Crawler input.
    4.  **Indexing**: RAG pipeline visualization (Processing animation).
    5.  **Guardrails**: Sensitive word filters, PII blocking toggles.
    6.  **Test Chat**: Interactive chat window to test the current config.
    7.  **Install**: Generates the `<script>` tag for embedding.

### 3. Bot Detail View (`src/pages/dashboard/BotDetail.tsx`)
The central hub for managing a specific bot.
*   **Tabs**:
    *   **Overview**: High-level stats.
    *   **Configuration**:
        *   Edit Branding (Logo, Colors).
        *   Edit Tone (System Prompt).
        *   Edit Guardrails.
    *   **Knowledge Base**:
        *   Table of uploaded documents.
        *   Columns: Name, Type (File/URL), Status (Indexed/Error), Date.
        *   Actions: Delete, Re-index.
    *   **Settings**:
        *   **Installation Snippet**: View/Copy/Revoke Snippet ID.
        *   **Danger Zone**: Delete Bot.

---

## ⚙️ Settings Pages

### 1. Profile (`/dashboard/settings/profile`)
*   **Form**: Edit Name, Email.
*   **Avatar**: Upload new profile picture.
*   **Security**: Change Password (Current/New/Confirm).

### 2. Appearance (`/dashboard/settings/appearance`)
*   **Theme Selection**: Three large cards:
    *   **Light**: Preview of light UI.
    *   **Dark**: Preview of dark UI.
    *   **System**: Auto-detect.
*   **Accent Color**: Picker to change the global primary color (future scope).

### 3. Billing (`/dashboard/settings/billing`)
*   **Current Plan**: Card showing "Free" or "Pro".
*   **Usage**: Progress bars for:
    *   Messages Sent vs Limit.
    *   Storage Used vs Limit.
*   **Payment Method**: Credit card display / "Update Method" button.
*   **Invoices**: List of past payments with "Download PDF" button.

---

## 🧩 Shared Components

*   **`EmbedCodeDialog`**:
    *   Popup displaying the `<script>` tag.
    *   "Copy to Clipboard" button with toast confirmation.
*   **`ThemeToggle`**:
    *   Dropdown or Toggle switch to change `light`/`dark` mode.
*   **`Badge`**:
    *   Used for status (Green = Active/Operational, Gray = Inactive).
*   **`GlassCard`**:
    *   Custom CSS class `.glass` providing the blur and border transparency.

---

## 📱 Mobile Responsiveness

*   **Sidebar**:
    *   Collapses to a bottom navigation bar or hamburger menu on mobile (Check `Sidebar.tsx` media queries).
    *   On tablet: Defaults to collapsed icon-only mode.
*   **Tables**:
    *   Become scrollable horizontally on small screens.
*   **Grid Layouts**:
    *   `grid-cols-1` on mobile → `grid-cols-2` on tablet → `grid-cols-4` on desktop.
