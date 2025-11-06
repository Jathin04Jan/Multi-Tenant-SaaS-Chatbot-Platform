import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { type GuardrailInput } from '@/lib/zod-schemas';
import { Shield } from 'lucide-react';
import { mockGetGuardrails, mockSaveGuardrails } from '@/lib/api';
import { useWizardStore } from '@/store/wizard';

interface GuardrailsFormProps {
  onComplete?: () => void;
}

export const GuardrailsForm = ({ onComplete }: GuardrailsFormProps) => {
  const { guardrails: storeGuardrails, updateGuardrails } = useWizardStore();
  const [maxResponseLength, setMaxResponseLength] = useState(storeGuardrails.maxResponseLength);
  const [blockedPhrasesText, setBlockedPhrasesText] = useState(storeGuardrails.blockedPhrases.join('\n'));
  const [enableFactChecking, setEnableFactChecking] = useState(storeGuardrails.enableFactChecking);
  const [blockExplicitContent, setBlockExplicitContent] = useState(storeGuardrails.blockExplicitContent);
  const [blockPoliticalViews, setBlockPoliticalViews] = useState(storeGuardrails.blockPoliticalViews);
  const [strictlyStickToTopic, setStrictlyStickToTopic] = useState(storeGuardrails.strictlyStickToTopic);
  const [blockPersonalInfo, setBlockPersonalInfo] = useState(storeGuardrails.blockPersonalInfo);
  const [customInstructions, setCustomInstructions] = useState(storeGuardrails.customInstructions);

  // Update store when values change (debounced)
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      updateGuardrails({
        maxResponseLength,
        blockedPhrases: (blockedPhrasesText || '').split(/\n|\r/).map(s=>s.trim()).filter(Boolean),
        enableFactChecking,
        blockExplicitContent,
        blockPoliticalViews,
        strictlyStickToTopic,
        blockPersonalInfo,
        customInstructions,
      });
    }, 500); // Debounce updates

    return () => clearTimeout(saveTimeout);
  }, [maxResponseLength, blockedPhrasesText, enableFactChecking, blockExplicitContent, blockPoliticalViews, strictlyStickToTopic, blockPersonalInfo, customInstructions, updateGuardrails]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Content Guardrails</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="maxResponseLength" className="text-sm font-medium block mb-2">
            Maximum Response Length: {maxResponseLength} characters
          </label>
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
          <label htmlFor="blockedPhrases" className="text-sm font-medium block mb-2">
            Blocked Phrases (one per line)
          </label>
          <Textarea
            id="blockedPhrases"
            placeholder="refund immediately&#10;cancel now&#10;..."
            className="rounded-xl min-h-[100px] font-mono text-sm"
            value={blockedPhrasesText}
            onChange={(e) => setBlockedPhrasesText(e.target.value)}
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
          <label htmlFor="customInstructions" className="text-sm font-medium block mb-2">
            Custom Instructions
          </label>
          <Textarea
            id="customInstructions"
            placeholder="Add specific instructions for how the chatbot should behave..."
            className="rounded-xl min-h-[120px]"
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Additional guidelines for chatbot behavior and responses
          </p>
        </div>
      </div>
    </div>
  );
};

