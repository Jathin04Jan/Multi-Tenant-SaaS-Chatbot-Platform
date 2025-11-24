import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

export interface GuardrailsData {
  maxResponseLength: number;
  blockedPhrases: string[];
  enableFactChecking: boolean;
  blockExplicitContent: boolean;
  blockPoliticalViews: boolean;
  strictlyStickToTopic: boolean;
  blockPersonalInfo: boolean;
  customInstructions: string;
}

interface GuardrailsConfigProps {
  initialData: GuardrailsData;
  onSave: (data: GuardrailsData) => void | Promise<void>;
  showSaveButton?: boolean;
  saveButtonText?: string;
}

export const GuardrailsConfig = ({
  initialData,
  onSave,
  showSaveButton = true,
  saveButtonText = 'Save Guardrails',
}: GuardrailsConfigProps) => {
  const [maxResponseLength, setMaxResponseLength] = useState(initialData.maxResponseLength || 500);
  const [blockedPhrasesText, setBlockedPhrasesText] = useState(
    initialData.blockedPhrases?.join('\n') || ''
  );
  const [enableFactChecking, setEnableFactChecking] = useState(initialData.enableFactChecking ?? true);
  const [blockExplicitContent, setBlockExplicitContent] = useState(initialData.blockExplicitContent ?? true);
  const [blockPoliticalViews, setBlockPoliticalViews] = useState(initialData.blockPoliticalViews ?? true);
  const [strictlyStickToTopic, setStrictlyStickToTopic] = useState(initialData.strictlyStickToTopic ?? true);
  const [blockPersonalInfo, setBlockPersonalInfo] = useState(initialData.blockPersonalInfo ?? true);
  const [customInstructions, setCustomInstructions] = useState(initialData.customInstructions || '');

  const handleSave = async () => {
    await onSave({
      maxResponseLength,
      blockedPhrases: (blockedPhrasesText || '').split(/\n|\r/).map((s) => s.trim()).filter(Boolean),
      enableFactChecking,
      blockExplicitContent,
      blockPoliticalViews,
      strictlyStickToTopic,
      blockPersonalInfo,
      customInstructions,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-3 block">Maximum Response Length: {maxResponseLength} characters</Label>
        <Slider
          value={[maxResponseLength]}
          onValueChange={(values) => setMaxResponseLength(values[0])}
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
        <Label htmlFor="blockedPhrases">Blocked Phrases (one per line)</Label>
        <Textarea
          id="blockedPhrases"
          value={blockedPhrasesText}
          onChange={(e) => setBlockedPhrasesText(e.target.value)}
          placeholder="refund immediately&#10;cancel now&#10;..."
          className="mt-2 rounded-xl min-h-[100px] font-mono text-sm"
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
            <p className="text-sm text-muted-foreground">Verify information before responding</p>
          </div>
          <Switch
            id="enableFactChecking"
            checked={enableFactChecking}
            onCheckedChange={setEnableFactChecking}
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border">
          <div className="space-y-0.5">
            <Label htmlFor="blockExplicitContent" className="text-base font-medium">
              Block Explicit Content
            </Label>
            <p className="text-sm text-muted-foreground">
              Prevent responses containing explicit or adult content
            </p>
          </div>
          <Switch
            id="blockExplicitContent"
            checked={blockExplicitContent}
            onCheckedChange={setBlockExplicitContent}
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border">
          <div className="space-y-0.5">
            <Label htmlFor="blockPoliticalViews" className="text-base font-medium">
              Block Political Views
            </Label>
            <p className="text-sm text-muted-foreground">
              Prevent responses that express political opinions or views
            </p>
          </div>
          <Switch
            id="blockPoliticalViews"
            checked={blockPoliticalViews}
            onCheckedChange={setBlockPoliticalViews}
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border">
          <div className="space-y-0.5">
            <Label htmlFor="strictlyStickToTopic" className="text-base font-medium">
              Strictly Stick to Topic
            </Label>
            <p className="text-sm text-muted-foreground">
              Keep responses focused only on your knowledge base and avoid off-topic discussions
            </p>
          </div>
          <Switch
            id="strictlyStickToTopic"
            checked={strictlyStickToTopic}
            onCheckedChange={setStrictlyStickToTopic}
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border">
          <div className="space-y-0.5">
            <Label htmlFor="blockPersonalInfo" className="text-base font-medium">
              Block Personal Information
            </Label>
            <p className="text-sm text-muted-foreground">
              Prevent responses that may contain personal information or sensitive data
            </p>
          </div>
          <Switch
            id="blockPersonalInfo"
            checked={blockPersonalInfo}
            onCheckedChange={setBlockPersonalInfo}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="customInstructions">Custom Instructions</Label>
        <Textarea
          id="customInstructions"
          value={customInstructions}
          onChange={(e) => setCustomInstructions(e.target.value)}
          placeholder="Add specific instructions for how the chatbot should behave..."
          className="mt-2 rounded-xl min-h-[120px]"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Additional guidelines for chatbot behavior and responses
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

