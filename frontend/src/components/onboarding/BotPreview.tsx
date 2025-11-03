import { Bot } from 'lucide-react';
import { useWizardStore } from '@/store/wizard';
import { motion } from 'framer-motion';

export const BotPreview = () => {
  const { branding, persona } = useWizardStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 space-y-4"
    >
      <h3 className="font-semibold mb-4">Live Preview</h3>

      {/* Chat Widget Preview */}
      <div className="bg-muted/50 rounded-2xl p-4 space-y-4 min-h-[300px]">
        {/* Header */}
        <div
          className="flex items-center gap-3 pb-3 border-b"
          style={{ borderColor: `${branding.primaryColor}20` }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${branding.primaryColor}20` }}
          >
            <Bot className="w-5 h-5" style={{ color: branding.primaryColor }} />
          </div>
          <div>
            <div className="font-medium">{persona.botName}</div>
            <div className="text-xs text-muted-foreground">
              {persona.style.charAt(0).toUpperCase() + persona.style.slice(1)} · 
              Tone {persona.tone}%
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="flex gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${branding.primaryColor}20` }}
          >
            <Bot className="w-4 h-4" style={{ color: branding.primaryColor }} />
          </div>
          <div
            className="glass-card p-3 rounded-2xl rounded-tl-none max-w-[80%]"
          >
            <p className="text-sm">{branding.welcomeMessage}</p>
          </div>
        </div>

        {/* Sample User Message */}
        <div className="flex gap-3 justify-end">
          <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-none max-w-[80%]">
            <p className="text-sm">How can you help me?</p>
          </div>
        </div>

        {/* Sample Bot Response */}
        <div className="flex gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${branding.primaryColor}20` }}
          >
            <Bot className="w-4 h-4" style={{ color: branding.primaryColor }} />
          </div>
          <div className="glass-card p-3 rounded-2xl rounded-tl-none max-w-[80%]">
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
