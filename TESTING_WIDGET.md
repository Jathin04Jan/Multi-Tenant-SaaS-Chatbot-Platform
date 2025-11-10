# Testing YourBot Widget - Production Style

## Overview
This guide explains how to test the chatbot widget embed system in production mode. **Only ACTIVE bots can be embedded.**

## Prerequisites

1. **Backend server running** on `http://localhost:8000`
2. **Frontend running** on `http://localhost:5173` (or your configured port)
3. **Database and MinIO** running via Docker Compose
4. **User account** created and logged in

## Step-by-Step Testing

### 1. Create a Bot

1. Log in to the dashboard
2. Navigate to **Bots** page
3. Click **Create New Bot** card
4. Complete all 7 steps of the onboarding:
   - **Step 1:** Brand & Persona (set assistant name, logo, colors, welcome message)
   - **Step 2:** Tone (set LLM temperature, communication style)
   - **Step 3:** Guardrails (configure content filters)
   - **Step 4:** Data Sources (add documents or websites)
   - **Step 5:** Indexing (wait for indexing to complete)
   - **Step 6:** Test Chat (test the chatbot)
   - **Step 7:** Install (get embed code)

### 2. Bot Activation

- **Automatic Activation:** When you complete the onboarding and click "Complete Setup", the bot is automatically activated (status set to `active`)
- **Manual Activation:** If needed, you can activate the bot from the Bot Detail page by changing the status to `active`

### 3. Get Embed Code

After bot creation:
1. On the **Install** step, you'll see the embed code
2. The code will look like this:
   ```html
   <script 
     src="http://localhost:8000/static/widget.js"
     data-bot-id="your-bot-slug-or-id"
     async>
   </script>
   ```
3. Copy the embed code (click the "Copy" button)

### 4. Test the Widget

#### Option A: Use the Test HTML File

1. Open `backend/static/test.html` in a text editor
2. Replace `YOUR_BOT_ID_OR_SLUG` with your actual bot ID or slug
3. Save the file
4. Open the file in your browser (double-click or `open backend/static/test.html`)
5. The widget should appear as a floating button in the bottom-right corner

#### Option B: Create Your Own Test Page

1. Create a new HTML file (e.g., `test-widget.html`)
2. Add the embed code before the closing `</body>` tag:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>My Test Page</title>
   </head>
   <body>
       <h1>Welcome to My Website</h1>
       <p>This is a test page with the chatbot widget.</p>
       
       <!-- YourBot Widget -->
       <script 
           src="http://localhost:8000/static/widget.js"
           data-bot-id="your-bot-slug-or-id"
           async>
       </script>
   </body>
   </html>
   ```
3. Open the file in your browser

### 5. Verify Widget Functionality

1. **Widget Button:** Should appear in the bottom-right corner (or configured position)
2. **Click to Open:** Clicking the button should open the chat window
3. **Theme:** Widget should use your bot's theme colors and settings
4. **Intro Message:** Should show your configured welcome message
5. **Chat Interface:** Should display a functional chat interface

## Production Mode Restrictions

### ✅ What Works:
- **Active bots:** Bots with `status='active'` AND `is_active=True` can be embedded
- **Automatic activation:** Bots are automatically activated after creation

### ❌ What Doesn't Work:
- **Draft bots:** Bots with `status='draft'` cannot be embedded (403 Forbidden)
- **Paused bots:** Bots with `status='paused'` cannot be embedded (403 Forbidden)
- **Archived bots:** Bots with `status='archived'` cannot be embedded (403 Forbidden)
- **Inactive bots:** Bots with `is_active=False` cannot be embedded (403 Forbidden)

## Troubleshooting

### Widget Not Appearing

1. **Check Bot Status:**
   - Go to the Bot Detail page
   - Verify status is `active`
   - If not active, change it to `active`

2. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Check the Console tab for errors
   - Common errors:
     - `Bot is not active` → Bot status is not `active`
     - `Bot not found` → Bot ID/slug is incorrect
     - `Failed to fetch` → Backend server is not running

3. **Check Network Requests:**
   - Open browser DevTools → Network tab
   - Look for request to `/public/embed-config?bot_id=...`
   - Check the response status:
     - `200 OK` → Bot config loaded successfully
     - `403 Forbidden` → Bot is not active
     - `404 Not Found` → Bot ID/slug is incorrect

### Widget Not Loading Script

1. **Check Script URL:**
   - Verify `http://localhost:8000/static/widget.js` is accessible
   - Open the URL directly in your browser
   - Should see the JavaScript code (not an error)

2. **Check CORS:**
   - Widget should work from any origin (CORS allows all origins)
   - If CORS errors occur, check backend CORS configuration

### Widget Shows Default Theme

1. **Check Bot Branding:**
   - Go to Bot Detail page → Configuration tab
   - Verify branding settings (colors, welcome message, etc.)
   - Update if needed and save

2. **Clear Browser Cache:**
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Or clear browser cache

## API Endpoints

### Public Endpoints (No Authentication Required)

- **GET** `/public/embed-config?bot_id={bot_id}`
  - Returns bot UI configuration
  - Only works for ACTIVE bots
  - Returns 403 if bot is not active

- **GET** `/static/widget.js`
  - Serves the widget JavaScript file
  - Publicly accessible

## Next Steps

1. **Implement Chat API:** Currently, the widget shows a placeholder message. Implement the actual chat endpoint to handle user messages.

2. **Add Message Persistence:** Store chat messages in the database for history and analytics.

3. **Add Analytics:** Track widget usage, message counts, user interactions, etc.

4. **Production Deployment:**
   - Replace `localhost:8000` with your production API URL
   - Configure CORS for production domains
   - Set up CDN for widget.js (optional)
   - Enable HTTPS for secure embedding

## Example: Complete Test Flow

```bash
# 1. Start backend
cd backend
python run.py

# 2. Start frontend (in another terminal)
cd frontend
npm run dev

# 3. Create bot in dashboard
# - Go to http://localhost:5173
# - Log in
# - Create a new bot
# - Complete onboarding
# - Copy embed code

# 4. Test widget
# - Open test.html or create your own HTML file
# - Replace bot ID in the script tag
# - Open in browser
# - Verify widget appears and works
```

## Support

If you encounter issues:
1. Check browser console for errors
2. Check backend logs for API errors
3. Verify bot status is `active`
4. Verify backend is running and accessible
5. Check database connection and bot data

