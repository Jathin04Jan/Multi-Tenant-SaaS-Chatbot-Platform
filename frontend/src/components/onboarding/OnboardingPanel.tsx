import { useState, useEffect, useCallback } from 'react';
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
import { Upload, Globe, Trash2, RefreshCw, ArrowRight, ArrowLeft, CheckCircle2, Bot, Circle } from 'lucide-react';
import { mockStartCrawl, mockGetGuardrails, mockSaveGuardrails, createBot, updateBot, createSnippet, uploadBotDocument, createCrawlDocument } from '@/lib/api';
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
    resetWizard,
    branding,
    persona,
    tone,
    guardrails
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

  const normalizeUrl = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const handleResetWizard = useCallback(() => {
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

  // Reset wizard when panel opens
  useEffect(() => {
    if (open) {
      handleResetWizard();
    }
  }, [open, handleResetWizard]);

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
  const handleBrandComplete = () => {
    completeStep(1);
    setCurrentStep(2);
  };

  // Step 2: Tone
  const handleToneComplete = () => {
    completeStep(2);
    setCurrentStep(3);
  };

  // Step 3: Guardrails
  const handleGuardrailsContinue = () => {
    completeStep(3);
    setCurrentStep(4);
  };

  // Step 4: Documents
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadId =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      setPendingUploads((prev) => ({ ...prev, [uploadId]: file }));
      addDataSource({
        id: uploadId,
        type: 'upload',
        name: file.name,
        status: 'queued',
        size: file.size,
        updatedAt: new Date().toISOString(),
      });
      toast.success('Document added. It will upload when you finish setup.');
    } catch (error) {
      toast.error('Failed to queue file for upload');
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

  const uploadQueuedDocuments = async (botId: string) => {
    const entries = Object.entries(pendingUploads);
    if (entries.length === 0) {
      return;
    }

    let successCount = 0;
    for (const [sourceId, file] of entries) {
      try {
        const response = await uploadBotDocument(botId, file);
        if (response.error) {
          updateDataSource(sourceId, {
            status: 'failed',
            updatedAt: new Date().toISOString(),
          });
          toast.error(response.error || `Failed to upload ${file.name}`);
        } else {
          updateDataSource(sourceId, {
            status: 'indexed',
            updatedAt: new Date().toISOString(),
          });
          successCount += 1;
        }
      } catch (error: any) {
        console.error('Error uploading document:', error);
        updateDataSource(sourceId, {
          status: 'failed',
          updatedAt: new Date().toISOString(),
        });
        const message =
          error?.response?.data?.detail ||
          (error instanceof Error ? error.message : 'Failed to upload document');
        toast.error(message);
      }
    }

    if (successCount > 0) {
      toast.success(
        `Uploaded ${successCount} document${successCount > 1 ? 's' : ''} to MinIO`
      );
    }
    setPendingUploads({});
  };

  const saveCrawledSources = async (botId: string) => {
    const crawlSources = dataSources.filter((source) => source.type === 'crawl');
    if (crawlSources.length === 0) {
      return;
    }

    let successCount = 0;
    for (const source of crawlSources) {
      const url = source.url || source.name;
      if (!url) {
        continue;
      }

      try {
        const response = await createCrawlDocument(botId, {
          url: normalizeUrl(url),
          name: source.name,
        });

        if (response.error) {
          toast.error(response.error || `Failed to register ${url}`);
          updateDataSource(source.id, {
            status: 'failed',
            updatedAt: new Date().toISOString(),
          });
        } else {
          successCount += 1;
          updateDataSource(source.id, {
            status: 'indexed',
            updatedAt: new Date().toISOString(),
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

    setIsCrawling(true);
    try {
      const normalizedUrl = normalizeUrl(crawlUrl);
      await mockStartCrawl(normalizedUrl);
      addDataSource({
        id: Date.now().toString(),
        type: 'crawl',
        name: normalizedUrl,
        url: normalizedUrl,
        status: 'processing',
        updatedAt: new Date().toISOString(),
      });
      setCrawlUrl('');
      toast.success('Crawl started successfully!');
    } catch (error) {
      toast.error('Failed to start crawl');
    } finally {
      setIsCrawling(false);
    }
  };

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
    try {
      // Get bot name from persona (BrandingForm updates persona.botName)
      const botName = persona.botName || 'My Bot';

      // Prepare bot data from wizard store
      // All UI configuration is stored in branding JSONB
      const botData = {
        name: botName,
        description: `A ${tone.communicationStyle} chatbot`,
        branding: {
          // Logo and avatar
          logo_url: branding.logo || null,
          avatar_url: branding.logo || null,
          // Colors
          primary_color: branding.primaryColor || '#6366f1',
          background_color: '#ffffff',
          // Messages
          welcome_message: branding.welcomeMessage || 'Hello! How can I help you today?',
          intro_message: branding.welcomeMessage || 'Hello! How can I help you today?',
          assistant_name: botName,
          chat_title: botName,
          // Widget positioning and sizing
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
          data_sources: dataSources.map(ds => ({
            id: ds.id,
            name: ds.name,
            type: ds.type,
            status: ds.status,
            updatedAt: ds.updatedAt,
          })),
          chunk_size: 1000,
          chunk_overlap: 200,
          embedding_model: 'text-embedding-ada-002',
        },
      };
      
      // Create bot via API
      const response = await createBot(botData);
      
      if (response.error) {
        toast.error(response.error || 'Failed to create bot');
        return;
      }
      
      // Store bot ID for embed code
      if (response.data) {
        setCreatedBotId(response.data.id);
        
        // PRODUCTION: Automatically activate the bot after creation
        // This makes the bot immediately embeddable
        try {
          const activateResponse = await updateBot(response.data.id, { status: 'active' });
          if (activateResponse.error) {
            toast.warning('Bot created but activation failed. Please activate it manually.');
          } else {
            toast.success('Bot created and activated successfully! 🎉');
            await uploadQueuedDocuments(response.data.id);
            await saveCrawledSources(response.data.id);
            
            // Create installation snippet for the bot
            try {
              const snippetResponse = await createSnippet(response.data.id, {
                bot_id: response.data.id,
                status: 'active',
                // allowed_domains: undefined means allow all domains (good for testing)
              });
              
              if (snippetResponse.error) {
                toast.warning('Bot created but snippet creation failed. You can create a snippet manually from the bot detail page.');
              } else if (snippetResponse.data) {
                setCreatedSnippetId(snippetResponse.data.id);
                toast.success('Installation snippet created!');
              }
            } catch (snippetError) {
              console.error('Error creating snippet:', snippetError);
              toast.warning('Bot created but snippet creation failed. You can create a snippet manually from the bot detail page.');
            }
          }
        } catch (activateError) {
          console.error('Error activating bot:', activateError);
          toast.warning('Bot created but activation failed. Please activate it manually.');
        }
      }
      
      completeStep(7);
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
                <BrandingForm onComplete={handleBrandComplete} />
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
                  onClick={() => {
                    onOpenChange(false);
                    resetWizard();
                    setCreatedBotId(null);
                    setCreatedSnippetId(null);
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
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </Button>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
};

