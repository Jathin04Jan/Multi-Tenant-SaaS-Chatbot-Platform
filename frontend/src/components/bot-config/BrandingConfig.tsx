import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import { Check, Upload, Loader2, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { colorCombinations } from '@/lib/constants';
import { uploadBrandLogo } from '@/lib/api';
import { toast } from 'sonner';
import { resolveAssetUrl } from '@/lib/media';
import type { BrandLogoMetadata } from '@/store/wizard';

export interface BrandingData {
  botName: string;
  welcomeMessage: string;
  primaryColor: string;
  logoUrl?: string | null;
  logoZoom?: number;
  logoMetadata?: BrandLogoMetadata | null;
}

interface BrandingConfigProps {
  initialData: BrandingData;
  onSave: (data: BrandingData) => void | Promise<void>;
  showSaveButton?: boolean;
  saveButtonText?: string;
  botId?: string;
}

export const BrandingConfig = ({
  initialData,
  onSave,
  showSaveButton = true,
  saveButtonText = 'Save Bot Configuration',
  botId,
}: BrandingConfigProps) => {
  const [botName, setBotName] = useState(initialData.botName || '');
  const [welcomeMessage, setWelcomeMessage] = useState(initialData.welcomeMessage || '');
  const [selectedColor, setSelectedColor] = useState(initialData.primaryColor || colorCombinations[0].primary);
  const [logoUrl, setLogoUrl] = useState<string | null | undefined>(initialData.logoUrl);
  const [logoZoom, setLogoZoom] = useState(initialData.logoZoom ?? 1);
  const [logoMetadata, setLogoMetadata] = useState<BrandLogoMetadata | null>(
    initialData.logoMetadata || null
  );
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setBotName(initialData.botName || '');
    setWelcomeMessage(initialData.welcomeMessage || '');
    setSelectedColor(initialData.primaryColor || colorCombinations[0].primary);
    setLogoUrl(initialData.logoUrl);
    setLogoZoom(initialData.logoZoom ?? 1);
    setLogoMetadata(initialData.logoMetadata || null);
  }, [
    initialData.botName,
    initialData.welcomeMessage,
    initialData.primaryColor,
    initialData.logoUrl,
    initialData.logoZoom,
    initialData.logoMetadata,
  ]);

  const handleSave = async () => {
    await onSave({
      botName,
      welcomeMessage,
      primaryColor: selectedColor,
      logoUrl,
      logoZoom,
      logoMetadata,
    });
  };

  const handleLogoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Logo must be PNG, JPG, or SVG.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Logo must be 10MB or smaller.');
      return;
    }

    setIsUploadingLogo(true);
    const response = await uploadBrandLogo(file, botId ? { botId } : undefined);
    setIsUploadingLogo(false);

    if (response.error || !response.data?.logo_url) {
      toast.error(response.error || 'Failed to upload logo.');
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

    setLogoUrl(nextUrl);
    setLogoZoom(1);
    setLogoMetadata(nextMetadata);
    toast.success('Logo uploaded.');
  };

  const handleLogoRemove = () => {
    setLogoUrl(null);
    setLogoZoom(1);
    setLogoMetadata(null);
  };

  const handleLogoZoomChange = (value: number) => {
    setLogoZoom(value);
  };

  const resolvedLogo = resolveAssetUrl(logoUrl);
  const hasLogo = Boolean(resolvedLogo);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="mb-2 block">Logo (Optional)</Label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.svg"
            className="hidden"
            ref={fileInputRef}
            onChange={handleLogoUpload}
            aria-label="Upload logo"
            title="Upload logo"
          />
          <div className="glass-card p-6 text-center rounded-2xl border border-border/40">
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
                  alt="Logo preview"
                  className="h-full w-full object-cover transition-transform duration-300"
                  style={{ transform: `scale(${logoZoom ?? 1})` }}
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
                  <span>{Math.round((logoZoom ?? 1) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0.6}
                  max={1.6}
                  step={0.02}
                  value={logoZoom ?? 1}
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
                  size="sm"
                  variant="ghost"
                  onClick={handleLogoRemove}
                  className="w-full"
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
        </div>

        <div>
          <Label htmlFor="botName">Assistant Name</Label>
          <Input
            id="botName"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            placeholder="Assistant"
            className="mt-2 rounded-xl"
          />
        </div>
        <div>
          <Label htmlFor="welcomeMessage">Welcome Message</Label>
          <Textarea
            id="welcomeMessage"
            value={welcomeMessage}
            onChange={(e) => setWelcomeMessage(e.target.value)}
            placeholder="Hello! How can I help you today?"
            className="mt-2 rounded-xl resize-none"
            rows={3}
          />
        </div>
        <div>
          <Label className="mb-3 block">Color Theme</Label>
          <div className="grid grid-cols-3 gap-3">
            {colorCombinations.map((combo) => (
              <button
                key={combo.id}
                type="button"
                onClick={() => setSelectedColor(combo.primary)}
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
        </div>
      </div>
      {showSaveButton && (
        <Button onClick={handleSave} className="w-full">
          {saveButtonText}
        </Button>
      )}
    </div>
  );
};

