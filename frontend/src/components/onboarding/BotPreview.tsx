import { Bot } from 'lucide-react';
import { useWizardStore } from '@/store/wizard';
import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';

// Helper to extract RGB values from hex color
const hexToRgb = (hex: string) => {
  const cleanHex = hex.replace('#', '');
  return {
    r: parseInt(cleanHex.slice(0, 2), 16),
    g: parseInt(cleanHex.slice(2, 4), 16),
    b: parseInt(cleanHex.slice(4, 6), 16),
  };
};

// Helper to get dynamic message bubble colors (shifting from one shade to another)
const getMessageColors = (primaryColor: string) => {
  const { r, g, b } = hexToRgb(primaryColor);

  // Create gradient of colors shifting from purple-ish to blue-ish
  return [
    `rgb(${Math.min(255, r + 20)}, ${Math.max(0, g - 10)}, ${Math.min(255, b + 30)})`,
    `rgb(${Math.max(0, r - 10)}, ${Math.min(255, g + 10)}, ${Math.min(255, b + 40)})`,
  ];
};

// Helper to get subtle background gradient colors
const getBackgroundGradient = (primaryColor: string) => {
  const { r, g, b } = hexToRgb(primaryColor);

  return [
    `rgba(${r}, ${g}, ${b}, 0.08)`,
    `rgba(${Math.max(0, r - 20)}, ${Math.min(255, g + 10)}, ${Math.min(255, b + 30)}, 0.06)`,
    `rgba(${r}, ${g}, ${b}, 0.08)`,
  ];
};

export const BotPreview = () => {
  const { branding, persona, tone } = useWizardStore();

  // Generate message colors for user bubbles
  const messageColors = useMemo(
    () => getMessageColors(branding.primaryColor),
    [branding.primaryColor]
  );

  // Generate background gradient colors
  const bgGradient = useMemo(
    () => getBackgroundGradient(branding.primaryColor),
    [branding.primaryColor]
  );

  // Inject CSS animation for subtle background gradient
  useEffect(() => {
    const styleId = 'dynamic-gradient-animation';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = `
      @keyframes subtleGradient {
        0%, 100% {
          background: linear-gradient(135deg, ${bgGradient[0]} 0%, ${bgGradient[1]} 50%, ${bgGradient[2]} 100%);
        }
        50% {
          background: linear-gradient(135deg, ${bgGradient[1]} 0%, ${bgGradient[2]} 50%, ${bgGradient[0]} 100%);
        }
      }
      .subtle-gradient-bg {
        animation: subtleGradient 10s ease-in-out infinite;
      }
    `;
  }, [bgGradient]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 space-y-4"
    >
      <h3 className="font-semibold mb-4">Live Preview</h3>

      {/* Chat Widget Preview */}
      <div 
        className="rounded-2xl p-4 space-y-4 min-h-[300px] overflow-hidden relative subtle-gradient-bg"
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 pb-3 border-b rounded-t-xl px-2 -mx-2 -mt-2 pt-2 relative z-10 backdrop-blur-sm"
          style={{ 
            borderColor: `${branding.primaryColor}40`,
            backgroundColor: `${branding.primaryColor}15`,
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
            style={{ backgroundColor: `${branding.primaryColor}25` }}
          >
            <Bot className="w-5 h-5" style={{ color: branding.primaryColor }} />
          </div>
          <div className="flex-1">
            <div className="font-medium" style={{ color: branding.primaryColor }}>
              {persona.botName}
            </div>
            <div className="text-xs" style={{ color: `${branding.primaryColor}CC` }}>
              {tone?.communicationStyle 
                ? tone.communicationStyle.charAt(0).toUpperCase() + tone.communicationStyle.slice(1)
                : 'Friendly'
              } · 
              Temperature {tone?.llmTemperature?.toFixed(2) ?? '0.70'}
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="flex gap-3 relative z-10">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md transition-all duration-300"
            style={{ 
              backgroundColor: `${branding.primaryColor}30`,
              boxShadow: `0 4px 12px ${branding.primaryColor}25`
            }}
          >
            <Bot className="w-4 h-4" style={{ color: branding.primaryColor }} />
          </div>
          <div
            className="p-3 rounded-2xl rounded-tl-none max-w-[80%] backdrop-blur-md transition-all duration-300"
            style={{ 
              backgroundColor: `${branding.primaryColor}25`,
              borderLeft: `3px solid ${branding.primaryColor}`,
              boxShadow: `0 2px 8px ${branding.primaryColor}15`
            }}
          >
            <p className="text-sm">{branding.welcomeMessage}</p>
          </div>
        </div>

        {/* Sample User Messages - each with different color from gradient */}
        <div className="flex flex-col gap-3 items-end relative z-10">
          <div 
            className="p-3 rounded-2xl rounded-tr-none max-w-[80%] text-white shadow-md"
            style={{ 
              backgroundColor: messageColors[0]
            }}
          >
            <p className="text-sm">How can you help me?</p>
          </div>
          <div 
            className="p-3 rounded-2xl rounded-tr-none max-w-[80%] text-white shadow-md"
            style={{ 
              backgroundColor: messageColors[1]
            }}
          >
            <p className="text-sm">That sounds great, thanks!</p>
          </div>
        </div>

        {/* Sample Bot Response */}
        <div className="flex gap-3 relative z-10">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md transition-all duration-300"
            style={{ 
              backgroundColor: `${branding.primaryColor}30`,
              boxShadow: `0 4px 12px ${branding.primaryColor}25`
            }}
          >
            <Bot className="w-4 h-4" style={{ color: branding.primaryColor }} />
          </div>
          <div 
            className="p-3 rounded-2xl rounded-tl-none max-w-[80%] backdrop-blur-md transition-all duration-300"
            style={{ 
              backgroundColor: `${branding.primaryColor}25`,
              borderLeft: `3px solid ${branding.primaryColor}`,
              boxShadow: `0 2px 8px ${branding.primaryColor}15`
            }}
          >
            <p className="text-sm">
              I'm trained on your documents and can answer questions about your 
              products, services, and more!
            </p>
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        This preview updates in real-time as you configure your bot
      </div>
    </motion.div>
  );
};
