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

  const hexToRgb = (hex) => {
    const sanitized = hex?.replace('#', '') || '';
    if (sanitized.length !== 6) return { r: 99, g: 102, b: 241 };
    return {
      r: parseInt(sanitized.substring(0, 2), 16),
      g: parseInt(sanitized.substring(2, 4), 16),
      b: parseInt(sanitized.substring(4, 6), 16)
    };
  };

  const rgbaFromHex = (hex, alpha = 1) => {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const createHeaderGradient = (color) => {
    const softer = rgbaFromHex(color, 0.7);
    return `linear-gradient(135deg, ${color || '#6366f1'}, ${softer})`;
  };

  const createAvatarElement = ({
    imageUrl,
    fallbackText = 'B',
    size = 36,
    backgroundColor = '#e2e8f0',
    textColor = '#0f172a'
  }) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      overflow: hidden;
      background: ${backgroundColor};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${Math.max(12, Math.floor(size * 0.45))}px;
      font-weight: 600;
      text-transform: uppercase;
      color: ${textColor};
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.15);
      flex-shrink: 0;
    `;

    const label = (fallbackText || 'AI').trim() || 'AI';

    if (imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = label;
      img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      `;
      img.onerror = () => {
        wrapper.textContent = label.slice(0, 2);
        wrapper.style.background = '#e2e8f0';
      };
      wrapper.appendChild(img);
    } else {
      wrapper.textContent = label.slice(0, 2);
    }

    return wrapper;
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
    // Set button background - will be overridden if logo loads successfully
    const buttonBgColor = theme.primary_color || '#6366f1';
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      ${theme.position === 'bottom-left' ? 'left' : 'right'}: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: ${buttonBgColor};
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
      overflow: hidden;
      padding: 0;
    `;
    
    // Use logo/avatar if available, otherwise use default icon
    const avatarUrl = theme.avatar_url || theme.logo_url;
    if (avatarUrl && avatarUrl.trim() !== '') {
      console.log('YourBot Widget: Setting button logo from:', avatarUrl);
      const logoImg = document.createElement('img');
      logoImg.src = avatarUrl;
      logoImg.alt = 'Chat bot avatar';
      logoImg.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(${theme.logo_zoom || 1.0});
        display: block;
        background: transparent;
      `;
      logoImg.onload = () => {
        console.log('YourBot Widget: Button logo loaded successfully');
        // Ensure button background is transparent when logo is loaded
        button.style.background = 'transparent';
      };
      logoImg.onerror = (e) => {
        console.error('YourBot Widget: Failed to load button logo:', avatarUrl, e);
        console.error('YourBot Widget: Error details:', {
          src: logoImg.src,
          naturalWidth: logoImg.naturalWidth,
          naturalHeight: logoImg.naturalHeight
        });
        // Fallback to icon if image fails to load
        button.style.background = theme.primary_color;
        button.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        `;
      };
      button.appendChild(logoImg);
    } else {
      console.warn('YourBot Widget: No avatar_url in theme, using default icon. Theme:', theme);
      button.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      `;
    }
    
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
    const headerBackground = createHeaderGradient(theme.primary_color || '#6366f1');
    header.style.cssText = `
      background: ${headerBackground};
      color: white;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;
    // Create header content
    const headerLeft = document.createElement('div');
    headerLeft.style.cssText = 'display: flex; align-items: center; gap: 12px;';
    
    const headerAvatarUrl = theme.avatar_url || theme.logo_url;
    if (headerAvatarUrl && headerAvatarUrl.trim() !== '') {
      console.log('YourBot Widget: Setting header avatar from:', headerAvatarUrl);
      const avatar = document.createElement('img');
      avatar.src = headerAvatarUrl;
      avatar.alt = 'Chat bot avatar';
      const logoZoom = theme.logo_zoom || 1.0;
      avatar.style.cssText = `
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        transform: scale(${logoZoom});
        display: block;
        flex-shrink: 0;
        background: rgba(255, 255, 255, 0.2);
      `;
      avatar.onload = () => {
        console.log('YourBot Widget: Header avatar loaded successfully');
      };
      avatar.onerror = (e) => {
        console.error('YourBot Widget: Failed to load header avatar:', headerAvatarUrl, e);
        console.error('YourBot Widget: Error details:', {
          src: avatar.src,
          naturalWidth: avatar.naturalWidth,
          naturalHeight: avatar.naturalHeight
        });
        // Hide avatar if image fails to load
        avatar.style.display = 'none';
      };
      headerLeft.appendChild(avatar);
    } else {
      console.warn('YourBot Widget: No avatar_url in theme for header. Theme:', theme);
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
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
    `;

    // Input area
    const inputArea = document.createElement('div');
    inputArea.style.cssText = `
      padding: 16px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 10px;
      background: #ffffff;
      box-shadow: 0 -8px 24px rgba(15, 23, 42, 0.05);
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
      background: ${createHeaderGradient(theme.primary_color || '#6366f1')};
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
    
    // Update button logo/avatar if theme changes
    if (button && theme.avatar_url) {
      const existingImg = button.querySelector('img');
      if (existingImg) {
        existingImg.src = theme.avatar_url;
        existingImg.style.transform = `scale(${theme.logo_zoom || 1.0})`;
      } else {
        // Create new image if it doesn't exist
        const logoImg = document.createElement('img');
        logoImg.src = theme.avatar_url;
        logoImg.style.cssText = `
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(${theme.logo_zoom || 1.0});
        `;
        logoImg.onerror = () => {
          logoImg.style.display = 'none';
        };
        button.innerHTML = '';
        button.appendChild(logoImg);
      }
    }
    
    if (header && theme.primary_color) {
      header.style.background = theme.primary_color;
    }
    
    // Update header avatar if theme changes
    if (header && theme.avatar_url) {
      const headerLeft = header.querySelector('div:first-child');
      if (headerLeft) {
        const existingAvatar = headerLeft.querySelector('img');
        if (existingAvatar) {
          existingAvatar.src = theme.avatar_url;
          existingAvatar.style.transform = `scale(${theme.logo_zoom || 1.0})`;
        }
      }
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

    const messageRow = document.createElement('div');
    messageRow.style.cssText = `
      margin-bottom: 16px;
      display: flex;
      gap: 10px;
      align-items: flex-end;
      justify-content: ${sender === 'user' ? 'flex-end' : 'flex-start'};
      flex-direction: ${sender === 'user' ? 'row-reverse' : 'row'};
      width: 100%;
    `;

    const theme = getTheme();
    const primaryColor = theme?.primary_color || '#6366f1';
    const softAccent = rgbaFromHex(primaryColor, 0.15);
    const gradientAccent = `linear-gradient(135deg, ${primaryColor}, ${rgbaFromHex(primaryColor, 0.8)})`;

    const bubble = document.createElement('div');
    bubble.style.cssText = `
      max-width: 85%;
      padding: 14px 18px;
      border-radius: 22px;
      background: ${sender === 'user' ? gradientAccent : '#ffffff'};
      color: ${sender === 'user' ? '#ffffff' : '#0f172a'};
      font-size: 14px;
      line-height: 1.6;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
      border: ${sender === 'user' ? 'none' : `1px solid ${softAccent}`};
      backdrop-filter: blur(6px);
      word-break: break-word;
    `;

    bubble.textContent = text;

    const bubbleColumn = document.createElement('div');
    bubbleColumn.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 6px;
      align-items: ${sender === 'user' ? 'flex-end' : 'flex-start'};
      width: 100%;
    `;
    bubbleColumn.appendChild(bubble);

    if (sender === 'bot') {
      const meta = document.createElement('span');
      meta.textContent = theme?.chat_title || 'Assistant';
      meta.style.cssText = `
        font-size: 11px;
        color: #94a3b8;
      `;
      bubbleColumn.appendChild(meta);
    }

    if (sender === 'bot') {
      const avatar = createAvatarElement({
        imageUrl: theme?.avatar_url,
        fallbackText: theme?.chat_title || 'AI',
        size: 42,
        backgroundColor: rgbaFromHex(primaryColor, 0.15),
        textColor: primaryColor
      });
      messageRow.appendChild(avatar);
    }

    messageRow.appendChild(bubbleColumn);

    messagesContainer.appendChild(messageRow);
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
      console.info('YourBot Widget: Theme data:', config.theme);
      console.info('YourBot Widget: Avatar URL:', config.theme?.avatar_url);
      console.info('YourBot Widget: Logo Zoom:', config.theme?.logo_zoom);

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
