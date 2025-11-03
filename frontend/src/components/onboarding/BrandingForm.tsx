import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { brandingSchema, type BrandingInput } from '@/lib/zod-schemas';
import { useWizardStore } from '@/store/wizard';
import { cn } from '@/lib/utils';

interface BrandingFormProps {
  onComplete: () => void;
}

// Beautiful dynamic color combinations
const colorCombinations = [
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    primary: '#3b82f6',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    description: 'Calm and professional',
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    primary: '#f97316',
    gradient: 'from-orange-500 via-pink-500 to-rose-500',
    description: 'Warm and inviting',
  },
  {
    id: 'forest',
    name: 'Forest Canopy',
    primary: '#10b981',
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    description: 'Fresh and natural',
  },
];

export const BrandingForm = ({ onComplete }: BrandingFormProps) => {
  const { branding, updateBranding } = useWizardStore();
  const [selectedColor, setSelectedColor] = useState<string>(
    branding.primaryColor || colorCombinations[0].primary
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<BrandingInput>({
    resolver: zodResolver(brandingSchema),
    defaultValues: {
      ...branding,
      primaryColor: branding.primaryColor || colorCombinations[0].primary,
    },
    mode: 'onChange',
  });

  const handleColorSelect = (primaryColor: string) => {
    setSelectedColor(primaryColor);
    setValue('primaryColor', primaryColor, { shouldValidate: true });
    // Update store immediately for live preview
    updateBranding({ primaryColor });
  };

  const onSubmit = (data: BrandingInput) => {
    updateBranding(data);
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="text-sm font-medium block mb-2">Logo (Optional)</label>
        <div className="glass-card p-8 text-center border-2 border-dashed cursor-pointer hover:border-primary transition-colors">
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium block mb-3">
          Color Theme
        </label>
        <div className="grid grid-cols-3 gap-3">
          {colorCombinations.map((combo) => (
            <button
              key={combo.id}
              type="button"
              onClick={() => handleColorSelect(combo.primary)}
              className={cn(
                'relative group p-4 rounded-xl border-2 transition-all hover:scale-105',
                selectedColor === combo.primary
                  ? 'border-primary shadow-lg ring-2 ring-primary/20'
                  : 'border-border/50 hover:border-border'
              )}
            >
              <div
                className={cn(
                  'w-full h-20 rounded-lg mb-2 bg-gradient-to-br',
                  combo.gradient
                )}
              />
              <div className="text-center">
                <p className="text-sm font-semibold mb-1">{combo.name}</p>
                <p className="text-xs text-muted-foreground">{combo.description}</p>
              </div>
              {selectedColor === combo.primary && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
        <Input
          type="hidden"
          {...register('primaryColor')}
        />
        {errors.primaryColor && (
          <p className="text-sm text-destructive mt-2">{errors.primaryColor.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="welcomeMessage" className="text-sm font-medium block mb-2">
          Welcome Message
        </label>
        <Textarea
          id="welcomeMessage"
          placeholder="Hello! How can I help you today?"
          className="rounded-xl resize-none"
          rows={3}
          {...register('welcomeMessage')}
        />
        {errors.welcomeMessage && (
          <p className="text-sm text-destructive mt-1">{errors.welcomeMessage.message}</p>
        )}
      </div>

      <Button type="submit" disabled={!isValid} className="w-full rounded-xl">
        Continue
      </Button>
    </form>
  );
};
