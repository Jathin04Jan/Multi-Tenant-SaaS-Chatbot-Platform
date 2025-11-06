import { useState, useEffect } from 'react';
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
import { Upload, Globe, Trash2, RefreshCw, ArrowRight, CheckCircle2, Bot, Circle } from 'lucide-react';
import { mockUploadFile, mockStartCrawl, mockGetGuardrails, mockSaveGuardrails, createBot } from '@/lib/api';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const steps = [
  { number: 1, name: 'Brand & Persona' },
  { number: 2, name: 'Tone' },
  { number: 3, name: 'Data Sources' },
  { number: 4, name: 'Indexing' },
  { number: 5, name: 'Guardrails' },
  { number: 6, name: 'Test Chat' },
  { number: 7, name: 'Install' },
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
    resetWizard,
    branding,
    persona,
    tone,
    guardrails
  } = useWizardStore();
  const [crawlUrl, setCrawlUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isCrawling, setIsCrawling] = useState(false);
  const [indexingStatus, setIndexingStatus] = useState<'idle' | 'indexing' | 'completed'>('idle');
  const [indexingProgress, setIndexingProgress] = useState(0);
  const [testMessage, setTestMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ type: 'user' | 'bot'; message: string }>>([
    { type: 'bot', message: 'Hello! How can I help you today?' }
  ]);

  // Reset wizard when panel opens
  useEffect(() => {
    if (open) {
      resetWizard();
      setCurrentStep(1);
    }
  }, [open, resetWizard, setCurrentStep]);

  // Map steps with completion status
  const stepsWithCompletion = steps.map((step) => {
    let isCompleted = false;
    if (completedSteps instanceof Set) {
      isCompleted = completedSteps.has(step.number);
    } else if (Array.isArray(completedSteps)) {
      isCompleted = (completedSteps as number[]).includes(step.number);
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

  // Step 3: Data Sources
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const result = await mockUploadFile(file);
      addDataSource({
        id: Date.now().toString(),
        type: 'upload',
        name: file.name,
        status: 'indexed',
        updatedAt: new Date().toISOString(),
      });
      toast.success('File uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCrawl = async () => {
    if (!crawlUrl.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsCrawling(true);
    try {
      await mockStartCrawl(crawlUrl);
      addDataSource({
        id: Date.now().toString(),
        type: 'crawl',
        name: crawlUrl,
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
    completeStep(3);
    setCurrentStep(4);
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

  // Step 4: Indexing
  useEffect(() => {
    if (indexingStatus === 'completed' && indexingProgress === 100 && currentStep === 4) {
      completeStep(4);
      setCurrentStep(5);
    }
  }, [indexingStatus, indexingProgress, currentStep, completeStep, setCurrentStep]);

  // Step 5: Guardrails
  const handleGuardrailsContinue = () => {
    completeStep(5);
    setCurrentStep(6);
  };

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

  // Step 7: Install
  const handleFinish = async () => {
    try {
      // Get bot name from persona (BrandingForm updates persona.botName)
      const botName = persona.botName || 'My Bot';
      
      // Prepare bot data from wizard store
      const botData = {
        name: botName,
        description: `A ${tone.communicationStyle} chatbot`,
        branding: {
          logo_url: branding.logo || null,
          primary_color: branding.primaryColor,
          welcome_message: branding.welcomeMessage,
          assistant_name: botName,
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
      
      completeStep(7);
      toast.success('Bot created successfully! 🎉');
      
      setTimeout(() => {
        onOpenChange(false);
        // Reset for next time
        resetWizard();
        // Refresh the page to show the new bot
        window.location.reload();
      }, 1000);
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

            <Button onClick={handleToneComplete} size="default" className="w-full">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Data Sources</h2>
              <p className="text-muted-foreground text-sm">
                Upload documents or crawl a website to train your chatbot
              </p>
            </div>

            {/* File Upload */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="font-semibold text-base">Upload Files</h3>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
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

            {/* Data Sources List */}
            {dataSources.length > 0 && (
              <div className="glass-card p-6 space-y-4">
                <h3 className="font-semibold text-base">Data Sources ({dataSources.length})</h3>
                <div className="space-y-2">
                  {dataSources.map((source) => (
                    <div key={source.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {source.type === 'upload' ? (
                          <Upload className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Globe className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="text-sm font-medium">{source.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {source.status}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDataSource(source.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={handleDataContinue} size="default" className="w-full">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 4:
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
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${indexingProgress}%` }}
                  />
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
            </div>
          </div>
        );

      case 5:
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

            <Button 
              onClick={handleGuardrailsContinue} 
              size="default" 
              className="w-full"
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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

            <Button onClick={handleTestContinue} size="default" className="w-full">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Install</h2>
              <p className="text-muted-foreground text-sm">
                Your chatbot is ready! Copy the embed code to add it to your website
              </p>
            </div>

            <div className="glass-card p-6 space-y-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Embed Code</label>
                <div className="relative">
                  <div className="p-4 bg-muted rounded-lg font-mono text-xs overflow-x-auto border border-border/50">
                    <code className="text-xs whitespace-pre">
{`<!-- Add this before closing </body> tag -->
<script 
  src="https://yourbot.com/widget.js"
  data-bot-id="your-bot-id"
  data-theme="auto"
  async>
</script>`}
                    </code>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 h-7 px-3 text-xs"
                    onClick={() => {
                      const embedCode = `<!-- Add this before closing </body> tag -->
<script 
  src="https://yourbot.com/widget.js"
  data-bot-id="your-bot-id"
  data-theme="auto"
  async>
</script>`;
                      navigator.clipboard.writeText(embedCode);
                      toast.success('Code copied to clipboard!');
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={handleFinish} size="default" className="w-full">
              Complete Setup <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-semibold">Create New Bot</DialogTitle>
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

