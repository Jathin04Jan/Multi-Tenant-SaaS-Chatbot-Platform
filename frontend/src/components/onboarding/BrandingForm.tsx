import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, Check, Loader2, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { brandingSchema, type BrandingInput } from '@/lib/zod-schemas';
import { useWizardStore } from '@/store/wizard';
import { cn } from '@/lib/utils';
import { colorCombinations } from '@/lib/constants';
import { uploadBrandLogo } from '@/lib/api';
import { resolveAssetUrl } from '@/lib/media';
import { toast } from 'sonner';
import type { BrandLogoMetadata } from '@/store/wizard';

interface BrandingFormProps {
  onComplete: () => Promise<void> | void;
  botId?: string | null;
}

export const BrandingForm = ({ onComplete, botId }: BrandingFormProps) => {
  const { branding, updateBranding, updatePersona, persona } = useWizardStore();
  const [selectedColor, setSelectedColor] = useState<string>(
    branding.primaryColor || colorCombinations[0].primary
  );
  const [logoPreview, setLogoPreview] = useState<string | null | undefined>(branding.logo);
  const [logoMetadata, setLogoMetadata] = useState<BrandLogoMetadata | null>(
    branding.logoMetadata || null
  );
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<BrandingInput>({
    resolver: zodResolver(brandingSchema),
    defaultValues: {
      ...branding,
      logoZoom: branding.logoZoom ?? 1,
      primaryColor: branding.primaryColor || colorCombinations[0].primary,
      botName: persona.botName || '',
    },
    mode: 'onChange',
  });

  const logoZoomValue = watch('logoZoom', branding.logoZoom ?? 1);
  const logoScale = logoZoomValue ?? 1;

  useEffect(() => {
    setLogoPreview(branding.logo);
    setLogoMetadata(branding.logoMetadata || null);
  }, [branding.logo, branding.logoMetadata]);

  useEffect(() => {
    setValue('botName', persona.botName || '');
  }, [persona.botName, setValue]);

  const resolvedLogo = resolveAssetUrl(logoPreview);
  const hasLogo = Boolean(resolvedLogo);

  const handleColorSelect = (primaryColor: string) => {
    setSelectedColor(primaryColor);
    setValue('primaryColor', primaryColor, { shouldValidate: true });
    // Update store immediately for live preview
    updateBranding({ primaryColor });
  };

  const handleLogoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Logo must be PNG, JPG, or SVG.');
      return;
    }

    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error('Logo must be 10MB or smaller.');
      return;
    }

    if (!botId) {
      toast.error('Draft bot is not ready yet. Please wait and try again.');
      return;
    }

    setIsUploadingLogo(true);
    const response = await uploadBrandLogo(file, { botId });
    setIsUploadingLogo(false);

    if (response.error || !response.data?.logo_url) {
      toast.error(response.error || 'Failed to upload logo. Please try again.');
      return;
    }

    const logoData = response.data.logo;
    const nextUrl = logoData?.url ?? response.data.logo_url;
    const nextMetadata: BrandLogoMetadata | null = logoData
      ? {
          objectKey: logoData.object_key ?? null,
          filename: logoData.filename ?? null,
          contentType: logoData.content_type ?? null,
          size: logoData.size ?? null,
          uploadedAt: logoData.uploaded_at ?? null,
        }
      : null;

    setLogoPreview(nextUrl);
    setLogoMetadata(nextMetadata);
    setValue('logo', nextUrl, { shouldValidate: true });
    updateBranding({
      logo: nextUrl,
      logoMetadata: nextMetadata,
      logoZoom: logoZoomValue ?? 1,
    });
    if (!branding.logoZoom) {
      updateBranding({ logoZoom: 1 });
    }

    toast.success('Logo uploaded successfully.');
  };

  const handleLogoRemove = () => {
    setLogoPreview(null);
    setLogoMetadata(null);
    setValue('logo', null, { shouldValidate: true });
    handleLogoZoomChange(1);
    updateBranding({ logo: null, logoMetadata: null, logoZoom: 1 });
  };

  const handleLogoZoomChange = (value: number) => {
    setValue('logoZoom', value, { shouldValidate: true });
    updateBranding({ logoZoom: value });
  };

  const onSubmit = async (data: BrandingInput) => {
    // Update branding (excluding botName)
    const { botName, ...brandingData } = data;
    updateBranding(brandingData);
    
    // Update persona with botName
    if (botName) {
      updatePersona({ botName });
    }
    
    await onComplete();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="botName" className="text-sm font-medium block mb-2">
          Assistant Name
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
        <label className="text-sm font-medium block mb-2">Logo (Optional)</label>
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.svg"
          ref={fileInputRef}
          onChange={handleLogoUpload}
          className="hidden"
          aria-label="Upload logo"
          title="Upload logo"
        />
        <Input type="hidden" {...register('logo')} />
        <Input type="hidden" {...register('logoZoom', { valueAsNumber: true })} />
          <div
          className={cn(
            'glass-card p-6 sm:p-8 text-center rounded-2xl border border-border/40',
            isUploadingLogo ? 'opacity-80' : ''
          )}
        >
          <div
            role="button"
            tabIndex={0}
            onClick={() => !isUploadingLogo && fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            className={cn(
              'mx-auto w-28 h-28 rounded-full border border-dashed flex items-center justify-center overflow-hidden bg-muted/30 relative',
              isUploadingLogo ? 'cursor-progress' : 'cursor-pointer hover:border-primary'
            )}
            >
              {hasLogo ? (
                <img
                  src={resolvedLogo}
                  alt="Uploaded logo preview"
                  className={cn(
                    'h-full w-full object-cover transition-transform duration-300',
                    `[transform:scale(${logoScale})]`
                  )}
                />
            ) : isUploadingLogo ? (
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            ) : (
              <Upload className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            {hasLogo ? 'Logo uploaded' : isUploadingLogo ? 'Uploading logo...' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, or SVG · Max size 10 MB</p>
          {hasLogo && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Zoom</span>
                <span>{Math.round((logoZoomValue ?? 1) * 100)}%</span>
              </div>
              <input
                type="range"
                min={0.6}
                max={1.6}
                step={0.02}
                value={logoZoomValue ?? 1}
                onChange={(e) => handleLogoZoomChange(Number(e.target.value))}
                className="w-full accent-primary"
                aria-label="Logo zoom"
                title="Logo zoom"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground uppercase tracking-wide">
                <span>Fit</span>
                <span>Fill</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={handleLogoRemove}
              >
                <ImageOff className="mr-2 h-4 w-4" />
                Remove logo
              </Button>
            </div>
          )}
          {!hasLogo && (
            <Button
              type="button"
              variant="secondary"
              className="mt-4"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingLogo}
            >
              Upload logo
            </Button>
          )}
        </div>
        {errors.logo && (
          <p className="text-sm text-destructive mt-2">{errors.logo.message}</p>
        )}
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
                  'w-full h-20 rounded-lg mb-3 bg-gradient-to-br',
                  combo.gradient
                )}
              />
              <div className="text-center h-6 flex items-center justify-center">
                <p className="text-sm font-semibold leading-tight">{combo.name}</p>
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
