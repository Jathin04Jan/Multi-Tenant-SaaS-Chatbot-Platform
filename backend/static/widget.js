/**
 * YourBot Widget - Embeddable Chatbot Widget
 *
 * This script creates a chatbot widget that can be embedded on any website.
 * Usage:
 *   <script src="https://yourbot.com/static/widget.js" data-bot-id="your-bot-id" async></script>
 */

(function () {
  'use strict';

  // Configuration from script tag
  const scriptTag = document.currentScript || document.querySelector('script[data-bot-id]');
  const botId = scriptTag ? scriptTag.getAttribute('data-bot-id') : null;

  if (!botId) {
    console.error('YourBot Widget: data-bot-id attribute is required');
    return;
  }

  // Get API base URL from script source
  // This will be overridden by the config from the API
  let apiBaseUrl = 'http://localhost:8000';
  if (scriptTag && scriptTag.src) {
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

  const getTheme = () => {
    if (!config || !config.theme) {
      console.error('YourBot Widget: Theme is missing in configuration:', config);
      return null;
    }
    return config.theme;
  };

  const getIntroMessage = () => {
    if (!config || typeof config.intro_message !== 'string') {
      console.error('YourBot Widget: Intro message missing or invalid in configuration. intro_message:', config?.intro_message, 'full config:', config);
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
      background: ${theme.background_color};
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      display: none;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    // Chat header
    const header = document.createElement('div');
    header.style.cssText = `
      padding: 16px;
      background: ${theme.primary_color};
      color: white;
      border-radius: 12px 12px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    header.innerHTML = `
      <div>
        <div style="font-weight: 600; font-size: 16px;">${theme.chat_title}</div>
        <div style="font-size: 12px; opacity: 0.9;">Online</div>
      </div>
      <button id="yourbot-close-button" style="background: none; border: none; color: white; cursor: pointer; font-size: 24px; padding: 0; width: 32px; height: 32px;">&times;</button>
    `;
    header.querySelector('#yourbot-close-button').onclick = toggleWidget;

    // Messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.id = 'yourbot-messages';
    messagesContainer.style.cssText = `
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #f5f5f5;
    `;

    // Input area
    const inputArea = document.createElement('div');
    inputArea.style.cssText = `
      padding: 16px;
      border-top: 1px solid #e0e0e0;
      display: flex;
      gap: 8px;
    `;
    const input = document.createElement('input');
    input.id = 'yourbot-input';
    input.type = 'text';
    input.placeholder = 'Type a message...';
    input.style.cssText = `
      flex: 1;
      padding: 10px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 24px;
      outline: none;
      font-size: 14px;
    `;
    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.style.cssText = `
      padding: 10px 20px;
      background: ${theme.primary_color};
      color: white;
      border: none;
      border-radius: 24px;
      cursor: pointer;
      font-size: 14px;
    `;
    sendButton.onclick = sendMessage;
    input.onkeypress = (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    };

    inputArea.appendChild(input);
    inputArea.appendChild(sendButton);

    chatWindow.appendChild(header);
    chatWindow.appendChild(messagesContainer);
    chatWindow.appendChild(inputArea);

    document.body.appendChild(button);
    document.body.appendChild(chatWindow);

    // Apply theme when config loads
    applyTheme();

    initialIntroMessage = getIntroMessage();
  }

  // Apply theme from config
  function applyTheme() {
    if (!config || !config.theme) return;

    const theme = config.theme;
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
    } else {
      console.warn('YourBot Widget: applyTheme called before inputs rendered.');
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

    const bubble = document.createElement('div');
    bubble.style.cssText = `
      max-width: 70%;
      padding: 10px 16px;
      border-radius: 18px;
      background: ${sender === 'user' ? '#6366f1' : 'white'};
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

  // Send message
  async function sendMessage() {
    const input = document.getElementById('yourbot-input');
    const message = input.value.trim();
    if (!message) return;

    input.value = '';
    addMessage(message, 'user');

    // TODO: Replace with actual API call
    // For now, show a placeholder response
    setTimeout(() => {
      addMessage('Thank you for your message! This is a demo response. The actual chatbot API integration is coming soon.', 'bot');
    }, 500);
  }

  // Fetch config from API
  async function fetchConfig() {
    try {
      const response = await fetch(`${apiBaseUrl}/public/embed-config?bot_id=${encodeURIComponent(botId)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch config: ${response.status}`);
      }
      config = await response.json();
      console.info('YourBot Widget: Config loaded', config);
      // Use API base URL from config if provided
      if (config.api_base_url) {
        apiBaseUrl = config.api_base_url;
      }
      applyTheme();
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

