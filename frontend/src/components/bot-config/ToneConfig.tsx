import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Communication style options with predefined prompts
export const styleOptions = [
  {
    value: 'professional',
    label: 'Professional',
    description: 'Formal and business-like',
    icon: '💼',
    defaultPrompt: 'You are a professional assistant. Maintain a formal, business-appropriate tone in all interactions. Use clear and concise language. Avoid casual expressions and maintain professionalism at all times.',
  },
  {
    value: 'friendly',
    label: 'Friendly',
    description: 'Warm and approachable',
    icon: '😊',
    defaultPrompt: 'You are a friendly and warm assistant. Be approachable, empathetic, and conversational. Use a welcoming tone that makes users feel comfortable. Show genuine interest in helping them.',
  },
  {
    value: 'casual',
    label: 'Casual',
    description: 'Relaxed and conversational',
    icon: '👋',
    defaultPrompt: 'You are a casual and relaxed assistant. Use a conversational, laid-back tone. Feel free to use everyday language and be more informal. Keep it friendly but not overly formal.',
  },
  {
    value: 'technical',
    label: 'Technical',
    description: 'Precise and detailed',
    icon: '🔧',
    defaultPrompt: 'You are a technical assistant. Provide precise, detailed information. Use technical terminology when appropriate. Focus on accuracy and thoroughness in your explanations.',
  },
  {
    value: 'supportive',
    label: 'Supportive',
    description: 'Empathetic and helpful',
    icon: '🤝',
    defaultPrompt: 'You are a supportive and empathetic assistant. Show understanding and patience. Provide encouragement and reassurance. Focus on being helpful and understanding the user\'s needs.',
  },
  {
    value: 'enthusiastic',
    label: 'Enthusiastic',
    description: 'Energetic and positive',
    icon: '✨',
    defaultPrompt: 'You are an enthusiastic and energetic assistant. Maintain a positive, upbeat tone. Show excitement and energy in your responses. Be engaging and motivating.',
  },
] as const;

export interface ToneData {
  llmTemperature: number;
  communicationStyle: 'professional' | 'friendly' | 'casual' | 'technical' | 'supportive' | 'enthusiastic';
  stylePrompt: string;
}

interface ToneConfigProps {
  initialData: ToneData;
  onSave: (data: ToneData) => void | Promise<void>;
  showSaveButton?: boolean;
  saveButtonText?: string;
}

export const ToneConfig = ({
  initialData,
  onSave,
  showSaveButton = true,
  saveButtonText = 'Save Tone Configuration',
}: ToneConfigProps) => {
  const [llmTemperature, setLlmTemperature] = useState(initialData.llmTemperature ?? 0.7);
  const [communicationStyle, setCommunicationStyle] = useState<
    'professional' | 'friendly' | 'casual' | 'technical' | 'supportive' | 'enthusiastic'
  >(initialData.communicationStyle ?? 'friendly');
  const [stylePrompt, setStylePrompt] = useState(initialData.stylePrompt ?? '');

  // Initialize prompt when style changes
  useEffect(() => {
    const selectedOption = styleOptions.find((opt) => opt.value === communicationStyle);
    if (selectedOption && (!stylePrompt || stylePrompt === selectedOption.defaultPrompt)) {
      setStylePrompt(selectedOption.defaultPrompt);
    }
  }, [communicationStyle]);

  const handleSave = async () => {
    await onSave({
      llmTemperature,
      communicationStyle,
      stylePrompt,
    });
  };

  const handleStyleSelect = (style: typeof communicationStyle) => {
    setCommunicationStyle(style);
    const selectedOption = styleOptions.find((opt) => opt.value === style);
    if (selectedOption) {
      setStylePrompt(selectedOption.defaultPrompt);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-3 block">LLM Temperature: {llmTemperature.toFixed(2)}</Label>
        <Slider
          value={[llmTemperature]}
          onValueChange={(values) => setLlmTemperature(values[0])}
          min={0}
          max={1}
          step={0.01}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>More Focused (0)</span>
          <span>More Creative (1)</span>
        </div>
        <AnimatePresence>
          {llmTemperature > 0.5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1 text-amber-500 mt-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs">Warning: Elevated creativity can hinder performance</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <Label className="mb-3 block">Communication Style</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {styleOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleStyleSelect(option.value)}
              className={cn(
                'glass-card p-4 text-center transition-all',
                communicationStyle === option.value
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:scale-105'
              )}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <div className="font-medium mb-1 text-sm">{option.label}</div>
              <div className="text-xs text-muted-foreground">{option.description}</div>
              {communicationStyle === option.value && (
                <Badge className="mt-2" variant="default">
                  Selected
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="stylePrompt">Style Prompt (Editable)</Label>
        <Textarea
          id="stylePrompt"
          value={stylePrompt}
          onChange={(e) => setStylePrompt(e.target.value)}
          className="mt-2 rounded-xl min-h-[150px] font-mono text-sm"
          placeholder="Enter the prompt for the selected communication style..."
        />
        <p className="text-xs text-muted-foreground mt-1">
          Customize the prompt that defines how the assistant communicates with the selected style.
        </p>
      </div>

      {showSaveButton && (
        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          {saveButtonText}
        </Button>
      )}
    </div>
  );
};

