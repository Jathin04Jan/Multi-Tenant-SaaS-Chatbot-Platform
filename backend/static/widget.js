/**
 * YourBot Widget - Embeddable Chatbot Widget (Production-Ready)
 *
 * This script creates a chatbot widget that can be embedded on any website.
 * 
 * Production Usage:
 *   <script src="https://yourbot.com/static/widget.js" data-snippet-id="snippet-uuid" async></script>
 */

(function () {
  'use strict';

  // Get script tag and extract configuration
  const scriptTag = document.currentScript || 
    Array.from(document.querySelectorAll('script')).find(s => 
      (s.src || '').includes('widget') && (s.dataset.snippetId || s.dataset.botId)
    );

  if (!scriptTag) {
    console.error('YourBot Widget: Script tag not found');
    return;
  }

  // Extract snippet_id (preferred) or bot_id (legacy)
  const snippetId = scriptTag.dataset.snippetId;
  const botId = scriptTag.dataset.botId; // Legacy support

  if (!snippetId && !botId) {
    console.error('YourBot Widget: data-snippet-id (preferred) or data-bot-id (deprecated) attribute is required');
    return;
  }

  if (!snippetId && botId) {
    console.warn('YourBot Widget: Using deprecated data-bot-id. Please migrate to data-snippet-id for production-ready features.');
  }

  // Get API base URL from script source
  let apiBaseUrl = 'http://localhost:8000';
  if (scriptTag.src) {
    try {
      const scriptUrl = new URL(scriptTag.src);
      apiBaseUrl = `${scriptUrl.protocol}//${scriptUrl.host}`;
    } catch (e) {
      console.warn('YourBot Widget: Could not parse script URL, using default');
    }
  }

  // Widget state
  let config = null;
  let isOpen = false;
  let messages = [];
  let initialIntroMessage = null;
  let embedToken = null; // JWT token for chat API authentication

  // Store config globally for chat calls
  window.YourBot = window.YourBot || {};
  window.YourBot._config = null;

  const getTheme = () => {
    if (!config || !config.theme) {
      console.error('YourBot Widget: Theme is missing in configuration:', config);
      return null;
    }
    return config.theme;
  };

  const getIntroMessage = () => {
    if (!config || typeof config.intro_message !== 'string') {
      console.error('YourBot Widget: Intro message missing or invalid in configuration.');
      return null;
    }
    return config.intro_message;
  };

  // Create widget container
  function createWidget() {
    const theme = getTheme();
    if (!theme) {
      console.error('YourBot Widget: Missing theme in configuration. Widget will not render.');
      return;
    }

    // Create button (floating action button)
    const button = document.createElement('button');
    button.id = 'yourbot-widget-button';
    button.setAttribute('aria-label', 'Open chat');
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      ${theme.position === 'bottom-left' ? 'left' : 'right'}: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: ${theme.primary_color};
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
    `;
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;
    button.onmouseover = () => button.style.transform = 'scale(1.1)';
    button.onmouseout = () => button.style.transform = 'scale(1)';
    button.onclick = toggleWidget;

    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'yourbot-widget-window';
    chatWindow.style.cssText = `
      position: fixed;
      bottom: 90px;
      ${theme.position === 'bottom-left' ? 'left' : 'right'}: 20px;
      width: ${theme.width}px;
      height: ${theme.height}px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      display: none;
      flex-direction: column;
      z-index: 9999;
      overflow: hidden;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      background: ${theme.primary_color};
      color: white;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;
    // Create header content
    const headerLeft = document.createElement('div');
    headerLeft.style.cssText = 'display: flex; align-items: center; gap: 12px;';
    
    if (theme.avatar_url) {
      const avatar = document.createElement('img');
      avatar.src = theme.avatar_url;
      avatar.style.cssText = 'width: 32px; height: 32px; border-radius: 50%;';
      headerLeft.appendChild(avatar);
    }
    
    const headerText = document.createElement('div');
    const title = document.createElement('div');
    title.style.cssText = 'font-weight: 600; font-size: 16px;';
    title.textContent = theme.chat_title || 'Chat';
    headerText.appendChild(title);
    headerLeft.appendChild(headerText);
    
    header.appendChild(headerLeft);
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.id = 'yourbot-close';
    closeButton.style.cssText = 'background: none; border: none; color: white; cursor: pointer; font-size: 20px;';
    closeButton.textContent = '×';
    closeButton.onclick = toggleWidget;
    header.appendChild(closeButton);

    // Messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.id = 'yourbot-messages';
    messagesContainer.style.cssText = `
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #ffffff;
    `;

    // Input area
    const inputArea = document.createElement('div');
    inputArea.style.cssText = `
      padding: 12px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
      background: #ffffff;
    `;
    const input = document.createElement('input');
    input.id = 'yourbot-input';
    input.type = 'text';
    input.placeholder = 'Type your message...';
    input.style.cssText = `
      flex: 1;
      padding: 10px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 24px;
      outline: none;
      font-size: 14px;
    `;
    input.onkeypress = (e) => {
      if (e.key === 'Enter') sendMessage();
    };

    const sendButton = document.createElement('button');
    sendButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    `;
    sendButton.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: ${theme.primary_color};
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    `;
    sendButton.onclick = sendMessage;

    inputArea.appendChild(input);
    inputArea.appendChild(sendButton);

    chatWindow.appendChild(header);
    chatWindow.appendChild(messagesContainer);
    chatWindow.appendChild(inputArea);

    document.body.appendChild(button);
    document.body.appendChild(chatWindow);

    // Apply theme after DOM elements are created
    setTimeout(() => applyTheme(), 100);
  }

  // Apply theme to existing elements
  function applyTheme() {
    const theme = getTheme();
    if (!theme) return;

    const button = document.getElementById('yourbot-widget-button');
    const header = document.querySelector('#yourbot-widget-window > div:first-child');
    const inputElement = document.querySelector('#yourbot-input');
    const sendButton = inputElement ? inputElement.nextElementSibling : null;

    if (button && theme.primary_color) {
      button.style.background = theme.primary_color;
    }
    if (header && theme.primary_color) {
      header.style.background = theme.primary_color;
    }
    if (sendButton instanceof HTMLElement && theme.primary_color) {
      sendButton.style.background = theme.primary_color;
      sendButton.style.color = '#ffffff';
    }
    if (theme.chat_title && header) {
      const titleEl = header.querySelector('div > div:first-child');
      if (titleEl) titleEl.textContent = theme.chat_title;
    }
    if (theme.width) {
      const chatWindow = document.getElementById('yourbot-widget-window');
      if (chatWindow) chatWindow.style.width = theme.width + 'px';
    }
    if (theme.height) {
      const chatWindow = document.getElementById('yourbot-widget-window');
      if (chatWindow) chatWindow.style.height = theme.height + 'px';
    }
    if (theme.position) {
      const chatWindow = document.getElementById('yourbot-widget-window');
      const button = document.getElementById('yourbot-widget-button');
      if (chatWindow && button) {
        if (theme.position === 'bottom-left') {
          chatWindow.style.right = 'auto';
          chatWindow.style.left = '20px';
          button.style.right = 'auto';
          button.style.left = '20px';
        }
      }
    }
  }

  // Toggle widget open/close
  function toggleWidget() {
    isOpen = !isOpen;
    const chatWindow = document.getElementById('yourbot-widget-window');
    const button = document.getElementById('yourbot-widget-button');

    if (chatWindow) {
      chatWindow.style.display = isOpen ? 'flex' : 'none';
    }
    if (button) {
      button.style.display = isOpen ? 'none' : 'flex';
    }

    if (isOpen && initialIntroMessage) {
      addMessage(initialIntroMessage, 'bot');
      initialIntroMessage = null;
    }
  }

  // Add message to chat
  function addMessage(text, sender) {
    messages.push({ text, sender, timestamp: new Date() });
    const messagesContainer = document.getElementById('yourbot-messages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
      margin-bottom: 12px;
      display: flex;
      justify-content: ${sender === 'user' ? 'flex-end' : 'flex-start'};
    `;

    // Get theme for colors
    const theme = getTheme();
    const primaryColor = theme?.primary_color || '#6366f1';
    
    // Convert hex to RGB for light color (bot messages) - works with any theme color
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 99, g: 102, b: 241 }; // Default indigo
    };
    
    const rgb = hexToRgb(primaryColor);
    // Create light version of theme color (20% opacity for better visibility)
    const lightColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;

    const bubble = document.createElement('div');
    bubble.style.cssText = `
      max-width: 70%;
      padding: 10px 16px;
      border-radius: 18px;
      background: ${sender === 'user' ? primaryColor : lightColor};
      color: ${sender === 'user' ? 'white' : '#333'};
      font-size: 14px;
      line-height: 1.5;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `;
    bubble.textContent = text;

    messageDiv.appendChild(bubble);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Send message to chat API
  async function sendMessage() {
    const input = document.getElementById('yourbot-input');
    const message = input.value.trim();
    if (!message) return;

    input.value = '';
    addMessage(message, 'user');

    // Get config and token
    const cfg = window.YourBot._config;
    if (!cfg || !cfg.token) {
      addMessage('Error: Widget not properly configured. Please refresh the page.', 'bot');
      console.error('YourBot Widget: Missing token in configuration');
      return;
    }

    const { api_base, token } = cfg;

    try {
      const response = await fetch(`${api_base}/api/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message }),
        credentials: 'omit'
      });

      if (!response.ok) {
        if (response.status === 401) {
          addMessage('Session expired. Please refresh the page.', 'bot');
          console.error('YourBot Widget: Token expired or invalid');
          return;
        }
        throw new Error(`Chat API error: ${response.status}`);
      }

      const data = await response.json();
      addMessage(data.response || 'No response received', 'bot');
    } catch (error) {
      console.error('YourBot Widget: Failed to send message', error);
      addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
  }

  // Fetch config from API
  async function fetchConfig() {
    try {
      let url;
      if (snippetId) {
        // Production flow: use snippet_id
        url = `${apiBaseUrl}/public/embed-config?snippet_id=${encodeURIComponent(snippetId)}`;
      } else if (botId) {
        // Legacy flow: use bot_id (deprecated)
        console.warn('YourBot Widget: Using deprecated bot_id flow. Migrate to snippet_id.');
        url = `${apiBaseUrl}/public/embed-config?bot_id=${encodeURIComponent(botId)}`;
      } else {
        throw new Error('Neither snippet_id nor bot_id provided');
      }

      const response = await fetch(url, {
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch config: ${response.status}`);
      }

      config = await response.json();
      console.info('YourBot Widget: Config loaded', config);

      // Use API base URL from config if provided
      if (config.api_base) {
        apiBaseUrl = config.api_base;
      } else if (config.api_base_url) {
        // Legacy support
        apiBaseUrl = config.api_base_url;
      }

      // Store token if available (production flow)
      if (config.token) {
        embedToken = config.token;
        window.YourBot._config = {
          api_base: apiBaseUrl,
          theme: config.theme,
          token: embedToken,
          snippetId: snippetId
        };
      } else {
        // Legacy flow - no token
        window.YourBot._config = {
          api_base: apiBaseUrl,
          theme: config.theme,
          token: null,
          snippetId: snippetId
        };
      }

      // Don't call applyTheme() here - widget elements don't exist yet
      // applyTheme() will be called after createWidget() completes
    } catch (error) {
      console.error('YourBot Widget: Failed to load config', error);
      config = null;
      return false;
    }
    initialIntroMessage = getIntroMessage();
    return true;
  }

  // Initialize widget when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      fetchConfig().then((loaded) => {
        if (!loaded) {
          console.error('YourBot Widget: Aborting render because configuration could not be loaded.');
          return;
        }
        createWidget();
      });
    });
  } else {
    fetchConfig().then((loaded) => {
      if (!loaded) {
        console.error('YourBot Widget: Aborting render because configuration could not be loaded.');
        return;
      }
      createWidget();
    });
  }
})();
