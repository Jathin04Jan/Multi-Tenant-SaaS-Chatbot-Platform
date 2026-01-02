import { useState, useEffect, useCallback, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Stepper } from '@/components/shell/Stepper';
import { BrandingForm } from '@/components/onboarding/BrandingForm';
import { ToneForm } from '@/components/onboarding/ToneForm';
import { GuardrailsForm } from '@/components/onboarding/GuardrailsForm';
import { BotPreview } from '@/components/onboarding/BotPreview';
import { useWizardStore } from '@/store/wizard';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, Globe, Trash2, RefreshCw, ArrowRight, ArrowLeft, CheckCircle2, Bot, Circle, Loader2 } from 'lucide-react';
import {
  mockStartCrawl,
  mockGetGuardrails,
  mockSaveGuardrails,
  updateBot,
  createSnippet,
  uploadBotDocument,
  createCrawlDocument,
  listBotDocuments,
  getDraftBot,
  createDraftBot,
  resetDraftBot,
  type BotDTO,
} from '@/lib/api';
import { toast } from 'sonner';

const steps = [
  { number: 1, name: 'Brand & Persona' },
  { number: 2, name: 'Tone' },
  { number: 3, name: 'Guardrails' },
  { number: 4, name: 'Documents' },
  { number: 5, name: 'Indexing' },
  { number: 6, name: 'Test Chat' },
  { number: 7, name: 'Deploy' },
];

const DEFAULT_PRIMARY_COLOR = '#6366f1';
const DEFAULT_WELCOME_MESSAGE = 'Hello! How can I help you today?';

interface OnboardingPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OnboardingPanel = ({ open, onOpenChange }: OnboardingPanelProps) => {
  const { 
    completedSteps, 
    currentStep, 
    setCurrentStep, 
    completeStep, 
    dataSources, 
    addDataSource, 
    removeDataSource, 
    updateDataSource,
    replaceDataSources,
    resetWizard,
    branding,
    persona,
    tone,
    guardrails,
    updateBranding,
    updatePersona,
    updateTone,
    updateGuardrails,
    draftBotId,
    setDraftBotId,
    setCompletedSteps,
  } = useWizardStore();
  const [crawlUrl, setCrawlUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isCrawling, setIsCrawling] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<Record<string, File>>({});
  const [createdBotId, setCreatedBotId] = useState<string | null>(null);
  const [createdSnippetId, setCreatedSnippetId] = useState<string | null>(null);
  const [indexingStatus, setIndexingStatus] = useState<'idle' | 'indexing' | 'completed'>('idle');
  const [indexingProgress, setIndexingProgress] = useState(0);
  const [testMessage, setTestMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ type: 'user' | 'bot'; message: string }>>([
    { type: 'bot', message: 'Hello! How can I help you today?' }
  ]);
  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);
  const [isResettingDraft, setIsResettingDraft] = useState(false);
  const personaNameRef = useRef(persona.botName || '');
  const draftBotIdRef = useRef<string | null>(null);

  const isCustomAssistantName = (value?: string | null) => {
    if (!value) return false;
    const normalized = value.trim().toLowerCase();
    if (!normalized) return false;
    return !['assistant', 'untitled bot', 'my bot'].includes(normalized);
  };

  useEffect(() => {
    personaNameRef.current = persona.botName || '';
  }, [persona.botName]);

  useEffect(() => {
    draftBotIdRef.current = draftBotId;
  }, [draftBotId]);

  const normalizeUrl = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const resetLocalWizardState = useCallback(() => {
    resetWizard();
    setCurrentStep(1);
    setPendingUploads({});
    setCrawlUrl('');
    setIsUploading(false);
    setIsCrawling(false);
    setCreatedBotId(null);
    setCreatedSnippetId(null);
    setIndexingStatus('idle');
    setIndexingProgress(0);
    setTestMessage('');
    setChatMessages([{ type: 'bot', message: 'Hello! How can I help you today?' }]);
    personaNameRef.current = '';
  }, [
    resetWizard,
    setCurrentStep,
    setPendingUploads,
    setCrawlUrl,
    setIsUploading,
    setIsCrawling,
    setCreatedBotId,
    setCreatedSnippetId,
    setIndexingStatus,
    setIndexingProgress,
    setTestMessage,
    setChatMessages,
  ]);

  const hydrateWizardFromDraft = useCallback(
    (bot: BotDTO) => {
      const brandingConfig = (bot.branding ?? {}) as Record<string, any>;
      const llmConfig = (bot.llm_config ?? {}) as Record<string, any>;
      const guardrailsConfig = (bot.guardrails ?? {}) as Record<string, any>;

      // Prioritize bot.name (the main name field) over branding fields
      // This ensures the name is always preserved when navigating back
      const botNameFromMain = bot.name && bot.name.trim() ? bot.name.trim() : '';
      const assistantNameCandidate =
        brandingConfig.assistant_name || brandingConfig.chat_title || '';
      
      // Get current store value to preserve user input if they're in the middle of editing
      const currentStoreBotName = useWizardStore.getState().persona.botName;
      
      // If store already has a custom name, preserve it (user might be editing or just navigated back)
      // Only hydrate from database if store is empty or has default value
      let resolvedAssistantName = '';
      if (currentStoreBotName && currentStoreBotName.trim() && isCustomAssistantName(currentStoreBotName)) {
        // Preserve user's current input - don't overwrite with database value
        resolvedAssistantName = currentStoreBotName.trim();
      } else {
        // Store is empty or has default value - hydrate from database
        resolvedAssistantName = 
          (isCustomAssistantName(botNameFromMain) ? botNameFromMain : '') ||
          (isCustomAssistantName(assistantNameCandidate) ? assistantNameCandidate : '') ||
          botNameFromMain || // Fallback to bot.name even if not "custom" (preserves saved value)
          assistantNameCandidate || // Fallback to branding fields
          '';
      }

      updatePersona({
        botName: resolvedAssistantName,
      });
      personaNameRef.current = resolvedAssistantName;

      updateBranding({
        logo: brandingConfig.logo_url || brandingConfig.avatar_url || null,
        logoMetadata: {
          objectKey: brandingConfig.logo_object_key ?? null,
          filename: brandingConfig.logo_filename ?? null,
          contentType: brandingConfig.logo_content_type ?? null,
          size: brandingConfig.logo_size ?? null,
          uploadedAt: brandingConfig.logo_uploaded_at ?? null,
        },
        logoZoom: brandingConfig.logo_zoom ?? 1,
        primaryColor: brandingConfig.primary_color || DEFAULT_PRIMARY_COLOR,
        welcomeMessage:
          brandingConfig.welcome_message || DEFAULT_WELCOME_MESSAGE,
      });

      updateTone({
        llmTemperature:
          typeof llmConfig.temperature === 'number'
            ? llmConfig.temperature
            : 0.7,
        communicationStyle:
          (llmConfig.communication_style as any) || 'friendly',
        stylePrompt:
          typeof llmConfig.style_prompt === 'string'
            ? llmConfig.style_prompt
            : '',
      });

      updateGuardrails({
        maxResponseLength: guardrailsConfig.max_response_length ?? 500,
        blockedPhrases: guardrailsConfig.blocked_phrases ?? [],
        enableFactChecking: guardrailsConfig.enable_fact_checking ?? true,
        blockExplicitContent: guardrailsConfig.block_explicit_content ?? true,
        blockPoliticalViews: guardrailsConfig.block_political_views ?? true,
        strictlyStickToTopic:
          guardrailsConfig.strictly_stick_to_topic ?? true,
        blockPersonalInfo: guardrailsConfig.block_personal_info ?? true,
        customInstructions: guardrailsConfig.custom_instructions ?? '',
      });

      const hasBrandingProgress =
        isCustomAssistantName(resolvedAssistantName) ||
        Boolean(brandingConfig.logo_url || brandingConfig.avatar_url) ||
        (brandingConfig.primary_color &&
          brandingConfig.primary_color !== DEFAULT_PRIMARY_COLOR) ||
        (brandingConfig.welcome_message &&
          brandingConfig.welcome_message !== DEFAULT_WELCOME_MESSAGE);

      // Only detect tone progress if values differ from defaults
      // Defaults: temperature=0.7, communication_style='friendly', style_prompt=''
      const hasToneProgress =
        (typeof llmConfig.temperature === 'number' && llmConfig.temperature !== 0.7) ||
        (typeof llmConfig.communication_style === 'string' && 
         llmConfig.communication_style !== 'friendly' && 
         llmConfig.communication_style.trim() !== '') ||
        (typeof llmConfig.style_prompt === 'string' && 
         llmConfig.style_prompt.trim() !== '');

      // Only detect guardrail progress if there are actual customizations
      // Check if any guardrail values differ from defaults
      // For a new draft bot, guardrails will be null or empty, so this will be false
      const defaultGuardrails = {
        max_response_length: 500,
        enable_fact_checking: true,
        block_explicit_content: true,
        block_political_views: true,
        strictly_stick_to_topic: true,
        block_personal_info: true,
      };
      const hasGuardrailProgress = 
        guardrailsConfig &&
        typeof guardrailsConfig === 'object' &&
        Object.keys(guardrailsConfig).length > 0 &&
        (
          guardrailsConfig.max_response_length !== defaultGuardrails.max_response_length ||
          guardrailsConfig.enable_fact_checking !== defaultGuardrails.enable_fact_checking ||
          guardrailsConfig.block_explicit_content !== defaultGuardrails.block_explicit_content ||
          guardrailsConfig.block_political_views !== defaultGuardrails.block_political_views ||
          guardrailsConfig.strictly_stick_to_topic !== defaultGuardrails.strictly_stick_to_topic ||
          guardrailsConfig.block_personal_info !== defaultGuardrails.block_personal_info ||
          (Array.isArray(guardrailsConfig.blocked_phrases) && guardrailsConfig.blocked_phrases.length > 0) ||
          (typeof guardrailsConfig.custom_instructions === 'string' && guardrailsConfig.custom_instructions.trim() !== '')
        );

      // Get existing progress from store to preserve steps 4-7
      const existingCompletedSteps = useWizardStore.getState().completedSteps;
      const existingCurrentStep = useWizardStore.getState().currentStep;
      
      // Build detected progress from database (steps 1-3)
      const detectedCompleted: number[] = [];
      if (hasBrandingProgress) detectedCompleted.push(1);
      if (hasToneProgress) detectedCompleted.push(2);
      if (hasGuardrailProgress) detectedCompleted.push(3);

      // Merge detected progress with existing progress
      // Preserve steps 4-7 from existing store if they exist
      const existingArray = existingCompletedSteps instanceof Set 
        ? Array.from(existingCompletedSteps)
        : Array.isArray(existingCompletedSteps) 
          ? existingCompletedSteps 
          : [];
      
      // Combine detected steps (1-3) with existing steps (4-7)
      const mergedCompleted = [...new Set([...detectedCompleted, ...existingArray.filter(s => s > 3)])];
      setCompletedSteps(mergedCompleted);

      // Only update currentStep if existing step is not ahead of detected step
      // This preserves user's position if they were on step 4, 5, 6, or 7
      const detectedNextStep = hasGuardrailProgress
        ? 4
        : hasToneProgress
        ? 3
        : hasBrandingProgress
        ? 2
        : 1;
      
      // Use existing step if it's ahead of detected step, otherwise use detected step
      const finalStep = existingCurrentStep > detectedNextStep ? existingCurrentStep : detectedNextStep;
      setCurrentStep(finalStep);
    },
    [
      isCustomAssistantName,
      setCompletedSteps,
      setCurrentStep,
      updateBranding,
      updatePersona,
      updateTone,
      updateGuardrails,
    ]
  );

  const isHydratingRef = useRef(false);

  const ensureDraftBot = useCallback(
    async (
      seedName: string,
      options?: {
        forceReset?: boolean;
      }
    ): Promise<string | null> => {
      const forceReset = options?.forceReset ?? false;
      if (isHydratingRef.current) {
        return draftBotIdRef.current;
      }
      isHydratingRef.current = true;
      setIsDraftLoading(true);
      setDraftError(null);
      try {
        const draftResponse = await getDraftBot();
        if (!draftResponse.error && draftResponse.data) {
          const isSameDraft = draftBotIdRef.current === draftResponse.data.id;
          if (!isSameDraft || forceReset) {
            resetLocalWizardState();
            setDraftBotId(draftResponse.data.id);
            hydrateWizardFromDraft(draftResponse.data);
          } else {
            // Same draft - only update draftBotId, don't overwrite store
            // This preserves user's current input when navigating between steps
            setDraftBotId(draftResponse.data.id);
          }
          return draftResponse.data.id;
        }

        if (draftResponse.status === 404) {
        const created = await createDraftBot({
          name: seedName || 'Assistant',
        });
          if (created.error || !created.data) {
            throw new Error(created.error || 'Failed to create draft bot.');
          }
        resetLocalWizardState();
        setDraftBotId(created.data.id);
        hydrateWizardFromDraft(created.data);
          return created.data.id;
        }

        throw new Error(draftResponse.error || 'Unable to load draft bot.');
      } catch (error) {
        console.error('Draft bot error:', error);
        const message =
          error instanceof Error ? error.message : 'Failed to load draft bot.';
        setDraftError(message);
        toast.error(message);
        return null;
      } finally {
        isHydratingRef.current = false;
        setIsDraftLoading(false);
      }
    },
    [hydrateWizardFromDraft, resetLocalWizardState, setDraftBotId]
  );

  const handleResetWizard = useCallback(async () => {
    if (isResettingDraft) {
      return;
    }
    try {
      setIsResettingDraft(true);
      if (draftBotId) {
        const response = await resetDraftBot();
        if (response.error && response.status !== 404) {
          throw new Error(response.error);
        }
      }
      setDraftBotId(null);
      resetLocalWizardState();
      await ensureDraftBot(personaNameRef.current, { forceReset: true });
      toast.success('Draft reset successfully.');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to reset draft.';
      toast.error(message);
    } finally {
      setIsResettingDraft(false);
    }
  }, [
    draftBotId,
    ensureDraftBot,
    isResettingDraft,
    resetLocalWizardState,
    setDraftBotId,
  ]);

  useEffect(() => {
    if (open) {
      // Only force reset if there's no existing draft or completed steps
      // This preserves progress when reopening the modal
      const existingDraftId = draftBotIdRef.current;
      const existingCompleted = useWizardStore.getState().completedSteps;
      let hasExistingProgress = false;
      if (existingCompleted instanceof Set) {
        hasExistingProgress = existingCompleted.size > 0;
      } else {
        const completedArray = existingCompleted as number[];
        hasExistingProgress = Array.isArray(completedArray) && completedArray.length > 0;
      }
      
      // Only force reset if no existing draft or no progress
      const shouldForceReset = !existingDraftId || !hasExistingProgress;
      ensureDraftBot(personaNameRef.current, { forceReset: shouldForceReset });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const persistBrandingStep = useCallback(async (): Promise<boolean> => {
    if (!draftBotId) {
      toast.error('Draft bot is not ready yet. Please try again.');
      return false;
    }

    // Get the latest botName from store to ensure we have the most recent value
    const currentBotName = useWizardStore.getState().persona.botName;
    const botNameToSave = currentBotName && currentBotName.trim() ? currentBotName.trim() : 'Assistant';
    
    console.log('Persisting branding step - botName:', botNameToSave, 'from store:', currentBotName);

    const brandMetadata = branding.logoMetadata || {};
    const payload = {
      name: botNameToSave,
      description: `A ${tone.communicationStyle} chatbot`,
      branding: {
        logo_url: branding.logo,
        avatar_url: branding.logo,
        logo_zoom: branding.logoZoom ?? 1,
        logo_object_key: brandMetadata.objectKey ?? null,
        logo_filename: brandMetadata.filename ?? null,
        logo_content_type: brandMetadata.contentType ?? null,
        logo_size: brandMetadata.size ?? null,
        logo_uploaded_at: brandMetadata.uploadedAt ?? null,
        primary_color: branding.primaryColor || '#6366f1',
        background_color: '#ffffff',
        welcome_message:
          branding.welcomeMessage || 'Hello! How can I help you today?',
        intro_message:
          branding.welcomeMessage || 'Hello! How can I help you today?',
        assistant_name: persona.botName || 'Assistant',
        chat_title: persona.botName || 'Assistant',
        position: 'bottom-right',
        height: 600,
        width: 400,
      },
    };

    const response = await updateBot(draftBotId, payload);
    if (response.error) {
      toast.error(response.error || 'Failed to save branding. Please try again.');
      return false;
    }
    return true;
  }, [branding, draftBotId, persona.botName, tone.communicationStyle]);

  const persistToneStep = useCallback(async (): Promise<boolean> => {
    if (!draftBotId) {
      toast.error('Draft bot is not ready yet. Please try again.');
      return false;
    }
    const response = await updateBot(draftBotId, {
      llm_config: {
        model: 'gpt-4',
        temperature: tone.llmTemperature,
        communication_style: tone.communicationStyle,
        style_prompt: tone.stylePrompt,
      },
    });
    if (response.error) {
      toast.error(response.error || 'Failed to save tone configuration.');
      return false;
    }
    return true;
  }, [draftBotId, tone]);

  const persistGuardrailsStep = useCallback(async (): Promise<boolean> => {
    if (!draftBotId) {
      toast.error('Draft bot is not ready yet. Please try again.');
      return false;
    }
    const response = await updateBot(draftBotId, {
      guardrails: {
        max_response_length: guardrails.maxResponseLength,
        blocked_phrases: guardrails.blockedPhrases,
        enable_fact_checking: guardrails.enableFactChecking,
        block_explicit_content: guardrails.blockExplicitContent,
        block_political_views: guardrails.blockPoliticalViews,
        strictly_stick_to_topic: guardrails.strictlyStickToTopic,
        block_personal_info: guardrails.blockPersonalInfo,
        custom_instructions: guardrails.customInstructions,
      },
    });
    if (response.error) {
      toast.error(response.error || 'Failed to save guardrails.');
      return false;
    }
    return true;
  }, [draftBotId, guardrails]);

  // Map steps with completion status
  // Only show steps as completed if they are completed AND current step is at or beyond that step
  const stepsWithCompletion = steps.map((step) => {
    let isCompleted = false;
    if (completedSteps instanceof Set) {
      isCompleted = completedSteps.has(step.number) && step.number <= currentStep;
    } else if (Array.isArray(completedSteps)) {
      isCompleted = (completedSteps as number[]).includes(step.number) && step.number <= currentStep;
    }
    return { ...step, completed: isCompleted };
  });

  // Step 1: Brand & Persona
  const handleBrandComplete = useCallback(async () => {
    // Get the latest botName from store to avoid stale closure issues
    const currentBotName = useWizardStore.getState().persona.botName;
    
    // Check botName first before attempting to save
    if (!currentBotName?.trim()) {
      toast.error('Please provide an assistant name before continuing.');
      return;
    }
    
    // Save branding configuration (only once)
    const brandingSaved = await persistBrandingStep();
    if (!brandingSaved) {
      return;
    }
    
    completeStep(1);
    setCurrentStep(2);
  }, [completeStep, persistBrandingStep, setCurrentStep]);

  // Step 2: Tone
  const handleToneComplete = useCallback(async () => {
    const saved = await persistToneStep();
    if (!saved) {
      return;
    }
    completeStep(2);
    setCurrentStep(3);
  }, [completeStep, persistToneStep, setCurrentStep]);

  // Step 3: Guardrails
  const handleGuardrailsContinue = useCallback(async () => {
    const saved = await persistGuardrailsStep();
    if (!saved) {
      return;
    }
    completeStep(3);
    setCurrentStep(4);
  }, [completeStep, persistGuardrailsStep, setCurrentStep]);

  // Step 4: Documents
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!draftBotId) {
      toast.error('Draft bot is not ready yet. Please wait and try again.');
      return;
    }

    setIsUploading(true);
    try {
      const response = await uploadBotDocument(draftBotId, file);
      if (response.error || !response.data) {
        toast.error(response.error || `Failed to upload ${file.name}`);
        return;
      }

      const doc = response.data;
      addDataSource({
        id: doc.id,
        type: doc.source_type === 'url' ? 'crawl' : 'upload',
        name: doc.filename || doc.metadata?.original_name || file.name,
        status: (doc.status as DataSource['status']) || 'indexed',
        size: doc.size ?? file.size,
        url: doc.source_url || undefined,
        updatedAt: doc.updated_at || new Date().toISOString(),
      });
      toast.success('Document uploaded successfully.');
    } catch (error: any) {
      console.error('Error uploading document:', error);
      const message =
        error?.response?.data?.detail ||
        (error instanceof Error ? error.message : 'Failed to upload document');
      toast.error(message);
    } finally {
      setIsUploading(false);
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const handleRemoveSource = (id: string) => {
    removeDataSource(id);
    setPendingUploads((prev) => {
      if (!(id in prev)) return prev;
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  // Queued upload helper remains for compatibility but no longer used
  const uploadQueuedDocuments = async (_botId: string) => {};

  // Helper to check if an ID is a UUID (already saved to database)
  const isUUID = (id: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  const saveCrawledSources = async (botId: string) => {
    // Filter crawl sources that haven't been saved yet (don't have UUID IDs)
    const unsavedCrawlSources = dataSources.filter(
      (source) => source.type === 'crawl' && !isUUID(source.id)
    );
    
    if (unsavedCrawlSources.length === 0) {
      return;
    }

    let successCount = 0;
    for (const source of unsavedCrawlSources) {
      const url = source.url || source.name;
      if (!url) {
        continue;
      }

      try {
        const response = await createCrawlDocument(botId, {
          url: normalizeUrl(url),
          name: source.name,
        });

        if (response.error || !response.data) {
          toast.error(response.error || `Failed to register ${url}`);
          updateDataSource(source.id, {
            status: 'failed',
            updatedAt: new Date().toISOString(),
          });
        } else {
          successCount += 1;
          // Remove old source and add new one with database ID
          removeDataSource(source.id);
          addDataSource({
            id: response.data.id,
            type: 'crawl',
            name: response.data.filename || source.name,
            url: response.data.source_url || url,
            status: (response.data.status as DataSource['status']) || 'processing',
            updatedAt: response.data.updated_at || response.data.created_at || new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error('Error registering crawl source:', error);
        toast.error(`Failed to register ${url}`);
        updateDataSource(source.id, {
          status: 'failed',
          updatedAt: new Date().toISOString(),
        });
      }
    }

    if (successCount > 0) {
      toast.success(
        `Registered ${successCount} website${successCount > 1 ? 's' : ''} for crawling`
      );
    }
  };

  const handleCrawl = async () => {
    if (!crawlUrl.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    if (!draftBotId) {
      toast.error('Draft bot is not ready yet. Please wait and try again.');
      return;
    }

    setIsCrawling(true);
    try {
      const normalizedUrl = normalizeUrl(crawlUrl);
      if (!normalizedUrl) {
        toast.error('Please enter a valid URL');
        return;
      }

      // Immediately save to database, just like file uploads
      const response = await createCrawlDocument(draftBotId, {
        url: normalizedUrl,
        name: normalizedUrl,
      });

      if (response.error || !response.data) {
        toast.error(response.error || `Failed to register ${normalizedUrl}`);
        return;
      }

      const doc = response.data;
      addDataSource({
        id: doc.id,
        type: 'crawl',
        name: doc.filename || normalizedUrl,
        url: doc.source_url || normalizedUrl,
        status: (doc.status as DataSource['status']) || 'processing',
        updatedAt: doc.updated_at || doc.created_at || new Date().toISOString(),
      });
      setCrawlUrl('');
      toast.success('Website registered for crawling!');
    } catch (error: any) {
      console.error('Error registering crawl source:', error);
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        'Failed to register website';
      toast.error(message);
    } finally {
      setIsCrawling(false);
    }
  };

  // Load documents from backend for the current draft bot (so refresh/resume keeps docs)
  useEffect(() => {
    const loadDocuments = async () => {
      if (!draftBotId) return;
      try {
        const resp = await listBotDocuments(draftBotId);
        if (resp.error || !resp.data) {
          console.error('Failed to load documents for draft bot:', resp.error);
          return;
        }
        const docs = resp.data.map((doc) => ({
          id: doc.id,
          name: doc.filename || doc.metadata?.original_name || 'Document',
          type: doc.source_type === 'url' ? 'crawl' : 'upload',
          status: (doc.status as DataSource['status']) || 'indexed',
          size: doc.size ?? undefined,
          url: doc.source_url || undefined,
          updatedAt: doc.updated_at || doc.created_at,
        }));
        replaceDataSources(docs);
      } catch (error) {
        console.error('Error loading documents for draft bot:', error);
      }
    };
    loadDocuments();
  }, [draftBotId, replaceDataSources]);

  const handleDataContinue = () => {
    if (dataSources.length === 0) {
      toast.error('Please add at least one data source');
      return;
    }
    completeStep(4);
    setCurrentStep(5);
    // Start indexing simulation
    setIndexingStatus('indexing');
    setIndexingProgress(0);
    const interval = setInterval(() => {
      setIndexingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIndexingStatus('completed');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  // Step 5: Indexing
  useEffect(() => {
    if (indexingStatus === 'completed' && indexingProgress === 100 && currentStep === 5) {
      completeStep(5);
      setCurrentStep(6);
    }
  }, [indexingStatus, indexingProgress, currentStep, completeStep, setCurrentStep]);

  // Step 6: Test Chat
  const handleTestMessage = () => {
    if (!testMessage.trim()) return;
    const message = testMessage.trim();
    // Add user message
    setChatMessages(prev => [...prev, { type: 'user', message }]);
    setTestMessage(''); // Clear input after sending
    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        message: 'This is a test response. In production, this would come from your chatbot API.' 
      }]);
    }, 500);
  };

  const handleTestContinue = () => {
    completeStep(6);
    setCurrentStep(7);
  };

  // Step 7: Deploy
  const handleFinish = async () => {
    if (!draftBotId) {
      toast.error('Draft bot is not ready yet. Please try again.');
      return;
    }

    try {
      // Get existing draft bot to preserve retrieval_config values
      const draftBotResponse = await getDraftBot();
      const existingRetrievalConfig = draftBotResponse.data?.retrieval_config || {};
      
      const botName = persona.botName || 'My Bot';
      const payload = {
        name: botName,
        description: `A ${tone.communicationStyle} chatbot`,
        branding: {
          logo_url: branding.logo || null,
          avatar_url: branding.logo || null,
          logo_zoom: branding.logoZoom ?? 1,
          logo_object_key: branding.logoMetadata?.objectKey || null,
          logo_filename: branding.logoMetadata?.filename || null,
          logo_content_type: branding.logoMetadata?.contentType || null,
          logo_size: branding.logoMetadata?.size ?? null,
          logo_uploaded_at: branding.logoMetadata?.uploadedAt || null,
          primary_color: branding.primaryColor || '#6366f1',
          background_color: '#ffffff',
          welcome_message:
            branding.welcomeMessage || 'Hello! How can I help you today?',
          intro_message:
            branding.welcomeMessage || 'Hello! How can I help you today?',
          assistant_name: botName,
          chat_title: botName,
          position: 'bottom-right',
          height: 600,
          width: 400,
        },
        llm_config: {
          model: 'gpt-4',
          temperature: tone.llmTemperature,
          communication_style: tone.communicationStyle,
          style_prompt: tone.stylePrompt,
        },
        guardrails: {
          max_response_length: guardrails.maxResponseLength,
          blocked_phrases: guardrails.blockedPhrases,
          block_explicit_content: guardrails.blockExplicitContent,
          block_political_views: guardrails.blockPoliticalViews,
          strictly_stick_to_topic: guardrails.strictlyStickToTopic,
          block_personal_info: guardrails.blockPersonalInfo,
          enable_fact_checking: guardrails.enableFactChecking,
          custom_instructions: guardrails.customInstructions,
        },
        retrieval_config: {
          // Preserve existing embedding_model (from backend defaults) or use default
          embedding_model: existingRetrievalConfig.embedding_model || 'qwen3-embedding:4b',
          // Preserve existing chunk settings or use defaults
          chunk_size: existingRetrievalConfig.chunk_size || 1000,
          chunk_overlap: existingRetrievalConfig.chunk_overlap || 200,
          // Preserve any other existing retrieval_config fields (vector_db, filters, rag_params, etc.)
          ...Object.fromEntries(
            Object.entries(existingRetrievalConfig).filter(([key]) => 
              !['data_sources'].includes(key) // Remove data_sources as it's redundant (documents are in documents table)
            )
          ),
        },
        status: 'active' as const,
      };

      const response = await updateBot(draftBotId, payload);
      if (response.error) {
        toast.error(response.error || 'Failed to finalize bot.');
        return;
      }

      setCreatedBotId(draftBotId);
      toast.success('Bot created and activated successfully! 🎉');

      await uploadQueuedDocuments(draftBotId);
      await saveCrawledSources(draftBotId);

      try {
        const snippetResponse = await createSnippet(draftBotId, {
          bot_id: draftBotId,
          status: 'active',
        });

        if (snippetResponse.error) {
          toast.warning(
            'Bot created but snippet creation failed. You can create a snippet manually from the bot detail page.'
          );
        } else if (snippetResponse.data) {
          setCreatedSnippetId(snippetResponse.data.id);
          toast.success('Installation snippet created!');
        }
      } catch (snippetError) {
        console.error('Error creating snippet:', snippetError);
        toast.warning(
          'Bot created but snippet creation failed. You can create a snippet manually from the bot detail page.'
        );
      }

      // Mark step 7 as complete and stay on step 7 to show embed code
      completeStep(7);
      // Don't reset state here - keep createdBotId and createdSnippetId to show embed code
      // The state will be reset when user clicks "Finish" button
    } catch (error) {
      console.error('Error creating bot:', error);
      toast.error('Failed to create bot. Please try again.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Brand & Personality</h2>
              <p className="text-muted-foreground text-sm">
                Customize how your chatbot looks and sounds
              </p>
            </div>
            
            {/* Branding Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <BrandingForm onComplete={handleBrandComplete} botId={draftBotId} />
              </div>
              <div>
                <BotPreview />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Tone</h2>
              <p className="text-muted-foreground text-sm">
                Configure the tone, temperature, and communication style of your chatbot
              </p>
            </div>

            <div className="glass-card p-6">
              <ToneForm onComplete={handleToneComplete} />
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => setCurrentStep(1)} 
                variant="outline" 
                size="default" 
                className="flex-1"
              >
                Back
              </Button>
              <Button onClick={handleToneComplete} size="default" className="flex-1">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Guardrails</h2>
              <p className="text-muted-foreground text-sm">
                Configure safety measures and content guardrails for your chatbot
              </p>
            </div>

            {/* Guardrails Form */}
            <div className="glass-card p-6">
              <GuardrailsForm onComplete={handleGuardrailsContinue} />
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => setCurrentStep(2)} 
                variant="outline" 
                size="default" 
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleGuardrailsContinue} 
                size="default" 
                className="flex-1"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Documents</h2>
              <p className="text-muted-foreground text-sm">
                Upload documents or crawl a website to train your chatbot
              </p>
            </div>

            {/* File Upload */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="font-semibold text-base">Upload Files</h3>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="w-8 h-8 text-primary mb-2" />
                <div className="text-center text-sm text-muted-foreground space-y-1">
                  <p>Click to upload or drag and drop</p>
                  <p className="text-xs">
                    Allowed file types: PDF, DOC, DOCX, TXT · Max size 1 GB per file
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </label>
            </div>

            {/* Website Crawl */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="font-semibold text-base">Crawl Website</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com"
                  value={crawlUrl}
                  onChange={(e) => setCrawlUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleCrawl} disabled={isCrawling || !crawlUrl.trim()}>
                  {isCrawling ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Globe className="w-4 h-4 mr-2" />}
                  Crawl
                </Button>
              </div>
            </div>

            {/* Documents List */}
            {dataSources.length > 0 && (
              <div className="glass-card p-6 space-y-4">
                <h3 className="font-semibold text-base">Documents ({dataSources.length})</h3>
                <div className="space-y-2">
                  {dataSources.map((source) => {
                    const label = source.type === 'crawl' ? (source.url || source.name) : source.name;
                    return (
                      <div key={source.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {source.type === 'upload' ? (
                            <Upload className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Globe className="w-4 h-4 text-muted-foreground" />
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium break-all">{label}</span>
                            {source.type === 'crawl' && (
                              <span className="text-xs text-muted-foreground">Website</span>
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">
                            {source.status}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveSource(source.id)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                onClick={() => setCurrentStep(3)} 
                variant="outline" 
                size="default" 
                className="flex-1"
              >
                Back
              </Button>
              <Button onClick={handleDataContinue} size="default" className="flex-1">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 5:
        // Calculate sub-stage progress based on overall progress
        const getStageStatus = (stageProgress: number) => {
          if (indexingProgress >= stageProgress) return 'complete';
          if (indexingProgress >= stageProgress - 20) return 'current';
          return 'pending';
        };

        const stages = [
          { name: 'Document Parsing', description: 'Extracting text from documents', progress: 20 },
          { name: 'Text Chunking', description: 'Splitting content into searchable chunks', progress: 40 },
          { name: 'Vectorization', description: 'Converting text to vector embeddings', progress: 60 },
          { name: 'Embedding Generation', description: 'Creating semantic embeddings', progress: 80 },
          { name: 'RAG Index Creation', description: 'Building retrieval-augmented generation index', progress: 100 },
        ];

        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Indexing</h2>
              <p className="text-muted-foreground text-sm">
                Processing your data sources and creating vector embeddings for RAG (Retrieval-Augmented Generation)
              </p>
            </div>

            <div className="glass-card p-6 space-y-6">
              {/* Overall Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{indexingProgress}%</span>
                </div>
                <div
                  className="w-full bg-muted rounded-full h-2 overflow-hidden"
                  data-indexing-progress={indexingProgress}
                >
                  <div className="bg-primary h-2 rounded-full transition-all duration-300" />
                </div>
              </div>

              {/* RAG Processing Stages */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold mb-3">RAG Processing Stages</h3>
                {stages.map((stage, index) => {
                  const status = getStageStatus(stage.progress);
                  return (
                    <div
                      key={stage.name}
                      className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-border/50"
                    >
                      {status === 'complete' ? (
                        <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      ) : status === 'current' ? (
                        <RefreshCw className="w-5 h-5 text-primary animate-spin shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{stage.name}</div>
                        <div className="text-xs text-muted-foreground">{stage.description}</div>
                      </div>
                      {status === 'current' && (
                        <div className="text-xs text-primary font-medium">
                          {indexingProgress >= stage.progress - 20 && indexingProgress < stage.progress
                            ? `${Math.round((indexingProgress - (stage.progress - 20)) / 20 * 100)}%`
                            : 'Starting...'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Status Messages */}
              {indexingStatus === 'completed' && (
                <div className="flex items-center gap-2 p-4 bg-success/10 border border-success/20 rounded-xl text-sm">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  <div>
                    <div className="font-medium text-success">Indexing completed successfully!</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Your data is now vectorized and ready for RAG-based retrieval
                    </div>
                  </div>
                </div>
              )}

              {indexingStatus === 'indexing' && (
                <div className="flex items-center gap-2 p-4 bg-primary/10 border border-primary/20 rounded-xl text-sm">
                  <RefreshCw className="w-5 h-5 text-primary animate-spin shrink-0" />
                  <div>
                    <div className="font-medium">Indexing in progress...</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Creating vector embeddings and building RAG index
                    </div>
                  </div>
                </div>
              )}

              {indexingStatus === 'completed' && (
                <div className="flex gap-3">
                  <Button 
                    onClick={() => setCurrentStep(4)} 
                    variant="outline" 
                    size="default" 
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(6)} 
                    size="default" 
                    className="flex-1"
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Test Chat</h2>
              <p className="text-muted-foreground text-sm">
                Test your chatbot before deploying
              </p>
            </div>

            <div className="glass-card p-0 overflow-hidden flex flex-col h-[450px]">
              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-start gap-3',
                      msg.type === 'user' && 'justify-end'
                    )}
                  >
                    {msg.type === 'bot' ? (
                      <>
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="bg-muted rounded-2xl rounded-tl-sm p-4">
                            <p className="text-sm">{msg.message}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex-1 flex justify-end">
                          <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-4 max-w-[80%]">
                            <p className="text-sm">{msg.message}</p>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <span className="text-xs font-medium text-primary">U</span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t border-border/50 p-4 space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message to test..."
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleTestMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleTestMessage} 
                    disabled={!testMessage.trim()}
                    size="default"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => setCurrentStep(4)} 
                variant="outline" 
                size="default" 
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleTestContinue} size="default" className="flex-1">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Deploy</h2>
              <p className="text-muted-foreground text-sm">
                Your chatbot is ready! Copy the embed code to add it to your website
              </p>
            </div>

            <div className="glass-card p-6 space-y-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Embed Code</label>
                {createdBotId ? (
                  <>
                    <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg mb-4">
                      <div className="flex items-center gap-2 text-sm text-green-800 dark:text-green-200">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="font-medium">Bot is active and ready to embed!</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="p-4 bg-muted rounded-lg font-mono text-xs overflow-x-auto border border-border/50">
                        <code className="text-xs whitespace-pre">
{createdSnippetId ? `<!-- Add this before closing </body> tag -->
<script 
  src="${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/static/widget.js"
  data-snippet-id="${createdSnippetId}"
  async>
</script>` : `<!-- Snippet is being created... -->
<!-- Once created, you'll see the embed code here -->`}
                        </code>
                      </div>
                      {createdSnippetId && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="absolute top-2 right-2 h-7 px-3 text-xs"
                          onClick={() => {
                            const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                            const embedCode = `<!-- Add this before closing </body> tag -->
<script 
  src="${apiBase}/static/widget.js"
  data-snippet-id="${createdSnippetId}"
  async>
</script>`;
                            navigator.clipboard.writeText(embedCode);
                            toast.success('Code copied to clipboard!');
                          }}
                        >
                          Copy
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <p>
                        <strong>Instructions:</strong>
                      </p>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li>Copy the embed code above</li>
                        <li>Paste it into your website's HTML before the closing <code>&lt;/body&gt;</code> tag</li>
                        <li>The chatbot widget will appear on your website</li>
                      </ol>
                      <p className="mt-2 text-xs">
                        <strong>Note:</strong> The widget will only work if your bot status is <strong>active</strong>. 
                        You can manage bot status from the bot detail page.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                    Complete the bot creation to generate embed code.
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => setCurrentStep(6)} 
                variant="outline" 
                size="default" 
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {createdBotId ? (
                <Button 
                  onClick={async () => {
                    // Clear draft bot ID to prevent new draft creation
                    setDraftBotId(null);
                    // Reset all local state
                    resetLocalWizardState();
                    // Close modal
                    onOpenChange(false);
                    // Reload to refresh bot list
                    window.location.reload();
                  }} 
                  size="default" 
                  className="flex-1"
                >
                  Finish <CheckCircle2 className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleFinish} size="default" className="flex-1">
                  Complete Setup <CheckCircle2 className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="pb-4 flex items-center justify-between">
          <DialogTitle className="text-2xl font-semibold">Create New Bot</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetWizard}
            disabled={isResettingDraft || isDraftLoading}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground disabled:opacity-60"
          >
            <RefreshCw className="w-4 h-4" />
            {isResettingDraft ? 'Resetting...' : 'Reset'}
          </Button>
        </DialogHeader>

        {draftError ? (
          <div className="mt-6 p-6 text-center space-y-4 glass-card">
            <p className="text-sm text-muted-foreground">{draftError}</p>
            <Button
              onClick={() => ensureDraftBot(personaNameRef.current, { forceReset: true })}
              size="sm"
            >
              Try Again
            </Button>
          </div>
        ) : isDraftLoading ? (
          <div className="mt-6 flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Preparing your draft bot...</p>
          </div>
        ) : (
          <div className="mt-4 space-y-6">
            {/* Stepper */}
            <div className="glass-card p-4">
              <Stepper steps={stepsWithCompletion} currentStep={currentStep} />
            </div>

            {/* Step Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-[350px]"
            >
              {renderStepContent()}
            </motion.div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

