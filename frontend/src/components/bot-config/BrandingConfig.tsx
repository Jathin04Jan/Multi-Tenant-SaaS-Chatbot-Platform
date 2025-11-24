import { useState, useEffect } from 'react';
import { Check, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { colorCombinations } from '@/lib/constants';

export interface BrandingData {
  botName: string;
  welcomeMessage: string;
  primaryColor: string;
  logoUrl?: string;
}

interface BrandingConfigProps {
  initialData: BrandingData;
  onSave: (data: BrandingData) => void | Promise<void>;
  showSaveButton?: boolean;
  saveButtonText?: string;
}

export const BrandingConfig = ({
  initialData,
  onSave,
  showSaveButton = true,
  saveButtonText = 'Save Bot Configuration',
}: BrandingConfigProps) => {
  const [botName, setBotName] = useState(initialData.botName || '');
  const [welcomeMessage, setWelcomeMessage] = useState(initialData.welcomeMessage || '');
  const [selectedColor, setSelectedColor] = useState(initialData.primaryColor || colorCombinations[0].primary);

  useEffect(() => {
    setBotName(initialData.botName || '');
    setWelcomeMessage(initialData.welcomeMessage || '');
    setSelectedColor(initialData.primaryColor || colorCombinations[0].primary);
  }, [initialData.botName, initialData.welcomeMessage, initialData.primaryColor]);

  const handleSave = async () => {
    await onSave({
      botName,
      welcomeMessage,
      primaryColor: selectedColor,
      logoUrl: initialData.logoUrl,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
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

