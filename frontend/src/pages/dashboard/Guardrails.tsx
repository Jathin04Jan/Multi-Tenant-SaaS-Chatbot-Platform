import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { personaSchema, type PersonaInput } from '@/lib/zod-schemas';
import { useWizardStore } from '@/store/wizard';
import { motion } from 'framer-motion';
import { Shield, Save, Bot } from 'lucide-react';
import { toast } from 'sonner';

// Helper to get tone label based on value
const getToneLabel = (tone: number): string => {
  if (tone <= 0.3) return 'Formal';
  if (tone >= 0.7) return 'Casual';
  return 'Balanced';
};

const styleOptions = [
  { value: 'professional', label: 'Professional', description: 'Formal and business-like', icon: '💼' },
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable', icon: '😊' },
  { value: 'casual', label: 'Casual', description: 'Relaxed and conversational', icon: '👋' },
  { value: 'technical', label: 'Technical', description: 'Precise and detailed', icon: '🔧' },
  { value: 'supportive', label: 'Supportive', description: 'Empathetic and helpful', icon: '🤝' },
  { value: 'enthusiastic', label: 'Enthusiastic', description: 'Energetic and positive', icon: '✨' },
] as const;

const Guardrails = () => {
  const { persona, updatePersona } = useWizardStore();

  type GuardrailFormData = PersonaInput & { 
    maxResponseLength: number;
    blockedPhrases: string;
    enableFactChecking: boolean;
    enableSensitiveFilter: boolean;
    customInstructions: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<GuardrailFormData>({
    resolver: zodResolver(personaSchema),
    defaultValues: {
      ...persona,
      maxResponseLength: 500,
      blockedPhrases: '',
      enableFactChecking: true,
      enableSensitiveFilter: true,
      customInstructions: '',
    },
    mode: 'onChange',
  });

  const selectedStyle = watch('style');
  const tone = watch('tone');
  const maxResponseLength = watch('maxResponseLength');
  const blockedPhrases = watch('blockedPhrases');
  const enableFactChecking = watch('enableFactChecking');
  const enableSensitiveFilter = watch('enableSensitiveFilter');
  const customInstructions = watch('customInstructions');

  const onSubmit = (data: GuardrailFormData) => {
    updatePersona({
      botName: data.botName,
      tone: data.tone,
      style: data.style,
    });
    // In a real app, you'd save the guardrail settings to a separate store/API
    toast.success('Chatbot content configuration saved successfully!');
  };

  return (
    <div className="container max-w-6xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Chatbot Content Configuration</h1>
            <p className="text-muted-foreground mt-1">
              Configure how your chatbot responds and manages content
            </p>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Persona Section */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Bot className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold">Persona & Tone</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="botName" className="text-sm font-medium block mb-2">
                Bot Name
              </label>
              <Input
                id="botName"
                placeholder="Assistant"
                className="rounded-xl"
                {...register('botName')}
              />
              {errors.botName && (
                <p className="text-sm text-destructive mt-1">{errors.botName.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium block mb-3">
                Tone: {getToneLabel(tone)} ({tone.toFixed(1)})
              </label>
              <Slider
                value={[tone]}
                onValueChange={(values) => setValue('tone', values[0], { shouldValidate: true })}
                min={0}
                max={1}
                step={0.1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Formal</span>
                <span>Casual</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-3">Communication Style</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {styleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setValue('style', option.value as any, { shouldValidate: true })}
                    className={`glass-card p-4 text-center transition-all ${
                      selectedStyle === option.value
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:scale-105'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="font-medium mb-1">{option.label}</div>
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
          </div>
        </Card>

        {/* Guardrails Section */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold">Content Guardrails</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="maxResponseLength" className="text-sm font-medium block mb-2">
                Maximum Response Length: {maxResponseLength} characters
              </label>
              <Slider
                value={[maxResponseLength]}
                onValueChange={(values) => setValue('maxResponseLength', values[0])}
                min={100}
                max={2000}
                step={50}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Short (100)</span>
                <span>Long (2000)</span>
              </div>
            </div>

            <div>
              <label htmlFor="blockedPhrases" className="text-sm font-medium block mb-2">
                Blocked Phrases (one per line)
              </label>
              <Textarea
                id="blockedPhrases"
                placeholder="refund immediately&#10;cancel now&#10;..."
                className="rounded-xl min-h-[100px] font-mono text-sm"
                {...register('blockedPhrases')}
              />
              <p className="text-xs text-muted-foreground mt-1">
                The chatbot will avoid using these phrases in responses
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border">
                <div className="space-y-0.5">
                  <Label htmlFor="enableFactChecking" className="text-base font-medium">
                    Fact Checking
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Verify information before responding
                  </p>
                </div>
                <Switch
                  id="enableFactChecking"
                  checked={enableFactChecking}
                  onCheckedChange={(checked) => setValue('enableFactChecking', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border">
                <div className="space-y-0.5">
                  <Label htmlFor="enableSensitiveFilter" className="text-base font-medium">
                    Sensitive Content Filter
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Filter out sensitive or inappropriate content
                  </p>
                </div>
                <Switch
                  id="enableSensitiveFilter"
                  checked={enableSensitiveFilter}
                  onCheckedChange={(checked) => setValue('enableSensitiveFilter', checked)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="customInstructions" className="text-sm font-medium block mb-2">
                Custom Instructions
              </label>
              <Textarea
                id="customInstructions"
                placeholder="Add specific instructions for how the chatbot should behave..."
                className="rounded-xl min-h-[120px]"
                {...register('customInstructions')}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Additional guidelines for chatbot behavior and responses
              </p>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="submit" disabled={!isValid} className="rounded-xl gap-2">
            <Save className="w-4 h-4" />
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Guardrails;

