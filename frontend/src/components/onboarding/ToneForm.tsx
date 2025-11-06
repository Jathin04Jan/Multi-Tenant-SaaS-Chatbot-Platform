import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useWizardStore } from '@/store/wizard';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Communication style options with predefined prompts
const styleOptions = [
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

interface ToneFormProps {
  onComplete?: () => void;
}

export const ToneForm = ({}: ToneFormProps) => {
  const { tone, updateTone } = useWizardStore();
  const [llmTemperature, setLlmTemperature] = useState(tone?.llmTemperature ?? 0.7);
  const [selectedStyle, setSelectedStyle] = useState<'professional' | 'friendly' | 'casual' | 'technical' | 'supportive' | 'enthusiastic'>(
    (tone?.communicationStyle as 'professional' | 'friendly' | 'casual' | 'technical' | 'supportive' | 'enthusiastic') ?? 'friendly'
  );
  const [stylePrompt, setStylePrompt] = useState<string>(tone?.stylePrompt ?? '');

  // Initialize prompt when component mounts
  useEffect(() => {
    if (!stylePrompt && tone?.stylePrompt) {
      setStylePrompt(tone.stylePrompt);
    } else if (!stylePrompt) {
      const selectedOption = styleOptions.find(opt => opt.value === selectedStyle);
      if (selectedOption) {
        setStylePrompt(selectedOption.defaultPrompt);
        updateTone({ stylePrompt: selectedOption.defaultPrompt });
      }
    }
  }, []);

  // Update prompt when style changes
  useEffect(() => {
    const selectedOption = styleOptions.find(opt => opt.value === selectedStyle);
    if (selectedOption) {
      // Only set default if current prompt is empty or matches the previous default
      if (!stylePrompt || stylePrompt === tone?.stylePrompt || stylePrompt === selectedOption.defaultPrompt) {
        setStylePrompt(selectedOption.defaultPrompt);
        updateTone({ 
          communicationStyle: selectedStyle,
          stylePrompt: selectedOption.defaultPrompt 
        });
      } else {
        // Keep current prompt but update style
        updateTone({ communicationStyle: selectedStyle });
      }
    }
  }, [selectedStyle]);

  const handleStyleSelect = (style: 'professional' | 'friendly' | 'casual' | 'technical' | 'supportive' | 'enthusiastic') => {
    setSelectedStyle(style);
    const selectedOption = styleOptions.find(opt => opt.value === style);
    if (selectedOption) {
      setStylePrompt(selectedOption.defaultPrompt);
      updateTone({ 
        communicationStyle: style,
        stylePrompt: selectedOption.defaultPrompt 
      });
    }
  };

  const handleTemperatureChange = (value: number[]) => {
    const temp = value[0];
    setLlmTemperature(temp);
    updateTone({ llmTemperature: temp });
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPrompt = e.target.value;
    setStylePrompt(newPrompt);
    updateTone({ stylePrompt: newPrompt });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Tone & Communication</h3>
      </div>

      <div className="space-y-6">
        {/* LLM Temperature Slider */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <label className="text-sm font-medium">
              LLM Temperature: {llmTemperature.toFixed(2)}
            </label>
            <AnimatePresence>
              {llmTemperature > 0.50 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1 text-amber-500"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </motion.div>
                  <span className="text-xs font-medium">Warning: Elevated creativity can hinder your performance</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Slider
            value={[llmTemperature]}
            onValueChange={handleTemperatureChange}
            min={0}
            max={1}
            step={0.01}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>More Focused (0)</span>
            <span>More Creative (1)</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Lower values make responses more deterministic and focused. Higher values allow for more creativity and variety.
          </p>
        </div>

        {/* Communication Style Selection */}
        <div>
          <label className="text-sm font-medium block mb-3">Communication Style</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {styleOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleStyleSelect(option.value)}
                className={`glass-card p-4 text-center transition-all ${
                  selectedStyle === option.value
                    ? 'ring-2 ring-primary bg-primary/5'
                    : 'hover:scale-105'
                }`}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <div className="font-medium mb-1 text-sm">{option.label}</div>
                <div className="text-xs text-muted-foreground">
                  {option.description}
                </div>
                {selectedStyle === option.value && (
                  <Badge className="mt-2" variant="default">Selected</Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Editable Prompt Textarea */}
        <div>
          <label htmlFor="stylePrompt" className="text-sm font-medium block mb-2">
            Style Prompt (Editable)
          </label>
          <Textarea
            id="stylePrompt"
            value={stylePrompt}
            onChange={handlePromptChange}
            className="rounded-xl min-h-[150px] font-mono text-sm"
            placeholder="Enter the prompt for the selected communication style..."
          />
          <p className="text-xs text-muted-foreground mt-1">
            Customize the prompt that defines how the assistant communicates with the selected style.
          </p>
        </div>
      </div>
    </div>
  );
};

