import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { brandingSchema, type BrandingInput } from '@/lib/zod-schemas';
import { useWizardStore } from '@/store/wizard';

interface BrandingFormProps {
  onComplete: () => void;
}

export const BrandingForm = ({ onComplete }: BrandingFormProps) => {
  const { branding, updateBranding } = useWizardStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BrandingInput>({
    resolver: zodResolver(brandingSchema),
    defaultValues: branding,
    mode: 'onChange',
  });

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
        <label htmlFor="primaryColor" className="text-sm font-medium block mb-2">
          Primary Color
        </label>
        <div className="flex gap-3">
          <Input
            id="primaryColor"
            type="color"
            className="w-16 h-11 p-1 rounded-xl cursor-pointer"
            {...register('primaryColor')}
          />
          <Input
            type="text"
            placeholder="#6366f1"
            className="flex-1 rounded-xl"
            {...register('primaryColor')}
          />
        </div>
        {errors.primaryColor && (
          <p className="text-sm text-destructive mt-1">{errors.primaryColor.message}</p>
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
