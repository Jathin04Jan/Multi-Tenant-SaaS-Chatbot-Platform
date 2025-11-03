import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { personaSchema, type PersonaInput } from '@/lib/zod-schemas';
import { useWizardStore } from '@/store/wizard';

interface PersonaFormProps {
  onComplete: () => void;
}

const styleOptions = [
  { value: 'professional', label: 'Professional', description: 'Formal and business-like' },
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
] as const;

// Helper to get tone label based on value
const getToneLabel = (tone: number): string => {
  if (tone <= 0.3) return 'Formal';
  if (tone >= 0.7) return 'Casual';
  return 'Balanced';
};

export const PersonaForm = ({ onComplete }: PersonaFormProps) => {
  const { persona, updatePersona } = useWizardStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<PersonaInput>({
    resolver: zodResolver(personaSchema),
    defaultValues: persona,
    mode: 'onChange',
  });

  const selectedStyle = watch('style');
  const tone = watch('tone');

  const onSubmit = (data: PersonaInput) => {
    updatePersona(data);
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <label className="text-sm font-medium block mb-3">Style Preset</label>
        <div className="grid grid-cols-3 gap-3">
          {styleOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue('style', option.value, { shouldValidate: true })}
              className={`glass-card p-4 text-center transition-all ${
                selectedStyle === option.value
                  ? 'ring-2 ring-primary'
                  : 'hover:scale-105'
              }`}
            >
              <div className="font-medium mb-1">{option.label}</div>
              <div className="text-xs text-muted-foreground">
                {option.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={!isValid} className="w-full rounded-xl">
        Continue
      </Button>
    </form>
  );
};
