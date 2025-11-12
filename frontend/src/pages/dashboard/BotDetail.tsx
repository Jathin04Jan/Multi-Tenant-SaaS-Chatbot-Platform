import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBot, type BotDTO, updateBot, getUiConfig, type UiConfigDTO, createUiConfig, updateUiConfig, mockUploadFile, mockStartCrawl } from '@/lib/api';
import { colorCombinations } from '@/lib/constants';
import { styleOptions } from '@/components/bot-config';
import {
  Bot,
  MessageSquare,
  Users,
  Clock,
  Star,
  TrendingUp,
  Settings,
  FileText,
  BarChart3,
  Play,
  Pause,
  Square,
  Edit,
  Trash2,
  Copy,
  Share2,
  Code,
  Download,
  Upload,
  Globe,
  Shield,
  Sparkles,
  RefreshCw,
  ArrowLeft,
  Check,
  Save,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BrandingConfig, ToneConfig, GuardrailsConfig, type BrandingData, type ToneData, type GuardrailsData } from '@/components/bot-config';

// Helper function to format time ago
const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  return `${Math.floor(diffInSeconds / 2592000)} months ago`;
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Helper function to format time
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

// Helper to get date or generate random date for existing docs
const getDocumentDate = (source: any): string => {
  const date = source.createdAt || source.updatedAt || source.created_at || source.updated_at;
  if (date) return formatDate(date);
  // Generate random date within last 90 days for existing docs
  const daysAgo = Math.floor(Math.random() * 90);
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - daysAgo);
  return formatDate(randomDate.toISOString());
};

// Helper to get time or generate random time for existing docs
const getDocumentTime = (source: any): string => {
  const date = source.createdAt || source.updatedAt || source.created_at || source.updated_at;
  if (date) return formatTime(date);
  // Generate random time for existing docs
  const daysAgo = Math.floor(Math.random() * 90);
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - daysAgo);
  return formatTime(randomDate.toISOString());
};

// Helper to normalize status
const normalizeStatus = (status: string): 'Processing' | 'Processed' | 'Active' | 'Inactive' => {
  const statusLower = status.toLowerCase();
  if (statusLower === 'processing' || statusLower === 'queued') return 'Processing';
  if (statusLower === 'processed' || statusLower === 'indexed') return 'Processed';
  if (statusLower === 'active') return 'Active';
  if (statusLower === 'inactive' || statusLower === 'failed' || statusLower === 'paused') return 'Inactive';
  return 'Processing'; // Default
};

const BotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [bot, setBot] = useState<BotDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmbedDialogOpen, setIsEmbedDialogOpen] = useState(false);
  
  // Bot Configuration State
  const [botName, setBotName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState('#6366f1');
  const [uiConfigId, setUiConfigId] = useState<string | null>(null);
  const [uiConfig, setUiConfig] = useState<UiConfigDTO | null>(null);
  
  // Document Upload/Crawl State
  const [crawlUrl, setCrawlUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isCrawling, setIsCrawling] = useState(false);
  
  // Tone Configuration State
  const [llmTemperature, setLlmTemperature] = useState(0.7);
  const [communicationStyle, setCommunicationStyle] = useState<'professional' | 'friendly' | 'casual' | 'technical' | 'supportive' | 'enthusiastic'>('friendly');
  const [stylePrompt, setStylePrompt] = useState('');
  
  // Guardrails State
  const [maxResponseLength, setMaxResponseLength] = useState(500);
  const [blockedPhrasesText, setBlockedPhrasesText] = useState('');
  const [enableFactChecking, setEnableFactChecking] = useState(true);
  const [blockExplicitContent, setBlockExplicitContent] = useState(true);
  const [blockPoliticalViews, setBlockPoliticalViews] = useState(true);
  const [strictlyStickToTopic, setStrictlyStickToTopic] = useState(true);
  const [blockPersonalInfo, setBlockPersonalInfo] = useState(true);
  const [customInstructions, setCustomInstructions] = useState('');

  // Fetch bot data from API
  useEffect(() => {
    const fetchBot = async () => {
      if (!botId) {
        navigate('/dashboard/onboarding');
        return;
      }

      try {
        setLoading(true);
        const response = await getBot(botId);
        
        if (response.error) {
          toast.error(response.error || 'Failed to load bot');
          navigate('/dashboard/onboarding');
          return;
        }

        const botData = response.data;
        setBot(botData);
        
        // Initialize state from bot data
        setBotName(botData.name);
        
        // Extract branding data
        const branding = botData.branding as any || {};
        setWelcomeMessage(branding.welcome_message || 'Hello! How can I help you today?');
        setSelectedColor(branding.primary_color || '#6366f1');
        
        // Load UI configuration if linked
        if (botData.ui_config_id) {
          try {
            const uiConfigResponse = await getUiConfig(botData.ui_config_id);
            if (uiConfigResponse.error) {
              toast.warning(uiConfigResponse.error || 'Unable to load UI configuration. Using branding defaults.');
              setUiConfigId(botData.ui_config_id);
              setUiConfig(null);
            } else {
              const uiConfigData = uiConfigResponse.data;
              setUiConfigId(uiConfigData.id);
              setUiConfig(uiConfigData);
              if (uiConfigData.chat_title) {
                setBotName(uiConfigData.chat_title);
              }
              if (uiConfigData.intro_message) {
                setWelcomeMessage(uiConfigData.intro_message);
              }
              if (uiConfigData.primary_color) {
                setSelectedColor(uiConfigData.primary_color);
              }
            }
          } catch (uiError) {
            console.error('Error fetching UI config:', uiError);
            setUiConfigId(botData.ui_config_id);
            setUiConfig(null);
          }
        } else {
          setUiConfigId(null);
          setUiConfig(null);
        }

        // Extract LLM config
        const llmConfig = botData.llm_config as any || {};
        setLlmTemperature(llmConfig.temperature || 0.7);
        setCommunicationStyle(llmConfig.communication_style || 'friendly');
        setStylePrompt(llmConfig.style_prompt || styleOptions.find(s => s.value === (llmConfig.communication_style || 'friendly'))?.defaultPrompt || '');
        
        // Extract guardrails
        const guardrails = botData.guardrails as any || {};
        setMaxResponseLength(guardrails.max_response_length || 500);
        setBlockedPhrasesText((guardrails.blocked_phrases || []).join('\n'));
        setEnableFactChecking(guardrails.enable_fact_checking !== false);
        setBlockExplicitContent(guardrails.block_explicit_content !== false);
        setBlockPoliticalViews(guardrails.block_political_views !== false);
        setStrictlyStickToTopic(guardrails.strictly_stick_to_topic !== false);
        setBlockPersonalInfo(guardrails.block_personal_info !== false);
        setCustomInstructions(guardrails.custom_instructions || '');
      } catch (error) {
        console.error('Error fetching bot:', error);
        toast.error('Failed to load bot');
        navigate('/dashboard/onboarding');
      } finally {
        setLoading(false);
      }
    };

    fetchBot();
  }, [botId, navigate]);

  const handleStatusChange = async (newStatus: 'active' | 'paused' | 'stopped') => {
    if (!bot) return;
    
    // Map UI status to database status
    const dbStatus = newStatus === 'stopped' ? 'archived' : newStatus === 'paused' ? 'paused' : 'active';
    
    try {
      const response = await updateBot(bot.id, { status: dbStatus });
      
      if (response.error) {
        toast.error(response.error || 'Failed to update bot status');
        return;
      }
      
      setBot(response.data);
      toast.success(`Bot ${newStatus === 'active' ? 'started' : newStatus === 'paused' ? 'paused' : 'stopped'} successfully`);
    } catch (error) {
      console.error('Error updating bot status:', error);
      toast.error('Failed to update bot status');
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this bot? This action cannot be undone.')) {
      toast.success('Bot deleted successfully');
      navigate('/dashboard/onboarding');
    }
  };

  const handleDuplicate = () => {
    toast.success('Bot duplicated successfully');
  };

  const handleShowEmbedCode = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    if (!bot) {
      toast.error('Bot not loaded');
      return;
    }
    setIsEmbedDialogOpen(true);
  };

  const handleCopyEmbedCode = async () => {
    if (!bot) return;
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const embedCode = `<!-- Add this before closing </body> tag -->\n<script \n  src="${apiBase}/static/widget.js"\n  data-bot-id="${bot.slug || bot.id}"\n  async>\n</script>`;

    try {
      await navigator.clipboard.writeText(embedCode);
      toast.success('Embed code copied to clipboard');
    } catch (error) {
      console.error('Failed to copy embed code:', error);
      toast.error('Failed to copy embed code');
    }
  };

  const handleSaveBotConfiguration = async (data: BrandingData) => {
    if (!bot) return;

    try {
      // Prepare UI config payload
      const uiPayload = {
        name: `${data.botName} Theme`,
        primary_color: data.primaryColor,
        background_color: '#0f172a',
        chat_title: data.botName,
        intro_message: data.welcomeMessage,
        avatar_url: data.logoUrl || ((bot.branding as any) || {}).logo_url || null,
        position: uiConfig?.position ?? 'bottom-right',
        height: uiConfig?.height ?? 600,
        width: uiConfig?.width ?? 400,
      };

      let currentUiConfigId = uiConfigId;

      try {
        if (currentUiConfigId) {
          const uiUpdateResponse = await updateUiConfig(currentUiConfigId, uiPayload);
          if (uiUpdateResponse.error) {
            toast.error(uiUpdateResponse.error || 'Failed to update UI configuration');
            return;
          }
          setUiConfigId(currentUiConfigId);
          setUiConfig(uiUpdateResponse.data);
        } else {
          const uiCreateResponse = await createUiConfig(uiPayload);
          if (uiCreateResponse.error) {
            toast.error(uiCreateResponse.error || 'Failed to create UI configuration');
            return;
          }
          currentUiConfigId = uiCreateResponse.data.id;
          setUiConfigId(currentUiConfigId);
          setUiConfig(uiCreateResponse.data);
        }
      } catch (uiError) {
        console.error('Error saving UI config:', uiError);
        toast.error('Failed to save UI configuration');
        return;
      }

      const updatedBranding = {
        ...(bot.branding as any || {}),
        welcome_message: data.welcomeMessage,
        primary_color: data.primaryColor,
        assistant_name: data.botName,
      };

      const response = await updateBot(bot.id, {
        name: data.botName,
        branding: updatedBranding,
        ui_config_id: currentUiConfigId,
      });

      if (response.error) {
        toast.error(response.error || 'Failed to save bot configuration');
        return;
      }

      setBot(response.data);
      setBotName(data.botName);
      setWelcomeMessage(data.welcomeMessage);
      setSelectedColor(data.primaryColor);
      toast.success('Bot configuration saved successfully!');
    } catch (error) {
      console.error('Error saving bot configuration:', error);
      toast.error('Failed to save bot configuration');
    }
  };

  const handleSaveToneConfiguration = async (data: ToneData) => {
    if (!bot) return;

    try {
      const updatedLlmConfig = {
        ...(bot.llm_config as any || {}),
        temperature: data.llmTemperature,
        communication_style: data.communicationStyle,
        style_prompt: data.stylePrompt,
      };

      const response = await updateBot(bot.id, {
        llm_config: updatedLlmConfig,
      });

      if (response.error) {
        toast.error(response.error || 'Failed to save tone configuration');
        return;
      }

      setBot(response.data);
      setLlmTemperature(data.llmTemperature);
      setCommunicationStyle(data.communicationStyle);
      setStylePrompt(data.stylePrompt);
      toast.success('Tone configuration saved successfully!');
    } catch (error) {
      console.error('Error saving tone configuration:', error);
      toast.error('Failed to save tone configuration');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !bot) return;

    setIsUploading(true);
    try {
      await mockUploadFile(file);
      
      const retrievalConfig = bot.retrieval_config as any || {};
      const dataSources = retrievalConfig.data_sources || [];
      
      const newSource = {
        id: Date.now().toString(),
        name: file.name,
        type: 'upload' as const,
        status: 'processing' as const,
        updatedAt: new Date().toISOString(),
      };

      const updatedConfig = {
        ...retrievalConfig,
        data_sources: [...dataSources, newSource],
      };

      const response = await updateBot(bot.id, { retrieval_config: updatedConfig });
      if (response.error) {
        toast.error(response.error || 'Failed to upload document');
        return;
      }
      setBot(response.data);
      toast.success('File uploaded successfully!');
      e.target.value = ''; // Reset input
    } catch (error) {
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCrawl = async () => {
    if (!crawlUrl.trim() || !bot) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsCrawling(true);
    try {
      await mockStartCrawl(crawlUrl);
      
      const retrievalConfig = bot.retrieval_config as any || {};
      const dataSources = retrievalConfig.data_sources || [];
      
      const newSource = {
        id: Date.now().toString(),
        name: crawlUrl,
        type: 'crawl' as const,
        status: 'processing' as const,
        updatedAt: new Date().toISOString(),
      };

      const updatedConfig = {
        ...retrievalConfig,
        data_sources: [...dataSources, newSource],
      };

      const response = await updateBot(bot.id, { retrieval_config: updatedConfig });
      if (response.error) {
        toast.error(response.error || 'Failed to start crawl');
        return;
      }
      setBot(response.data);
      setCrawlUrl('');
      toast.success('Crawl started successfully!');
    } catch (error) {
      toast.error('Failed to start crawl');
    } finally {
      setIsCrawling(false);
    }
  };

  const handleDeleteDataSource = async (sourceId: string) => {
    if (!bot) return;

    const retrievalConfig = bot.retrieval_config as any || {};
    const dataSources = retrievalConfig.data_sources || [];
    const updatedDataSources = dataSources.filter((source: any) => source.id !== sourceId);

    const updatedConfig = {
      ...retrievalConfig,
      data_sources: updatedDataSources,
    };

    try {
      const response = await updateBot(bot.id, { retrieval_config: updatedConfig });
      if (response.error) {
        toast.error(response.error || 'Failed to delete document');
        return;
      }
      setBot(response.data);
      toast.success('Document deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete document');
    }
  };

  const handleSaveGuardrails = async (data: GuardrailsData) => {
    if (!bot) return;

    try {
      const updatedGuardrails = {
        ...(bot.guardrails as any || {}),
        max_response_length: data.maxResponseLength,
        blocked_phrases: data.blockedPhrases,
        enable_fact_checking: data.enableFactChecking,
        block_explicit_content: data.blockExplicitContent,
        block_political_views: data.blockPoliticalViews,
        strictly_stick_to_topic: data.strictlyStickToTopic,
        block_personal_info: data.blockPersonalInfo,
        custom_instructions: data.customInstructions,
      };

      const response = await updateBot(bot.id, {
        guardrails: updatedGuardrails,
      });

      if (response.error) {
        toast.error(response.error || 'Failed to save guardrails');
        return;
      }

      setBot(response.data);
      setMaxResponseLength(data.maxResponseLength);
      setBlockedPhrasesText(data.blockedPhrases.join('\n'));
      setEnableFactChecking(data.enableFactChecking);
      setBlockExplicitContent(data.blockExplicitContent);
      setBlockPoliticalViews(data.blockPoliticalViews);
      setStrictlyStickToTopic(data.strictlyStickToTopic);
      setBlockPersonalInfo(data.blockPersonalInfo);
      setCustomInstructions(data.customInstructions);
      toast.success('Guardrails saved successfully!');
    } catch (error) {
      console.error('Error saving guardrails:', error);
      toast.error('Failed to save guardrails');
    }
  };

  type AnalyticsTrend = 'neutral' | 'up' | 'down';

  // Analytics cards - using placeholder data until conversations table is implemented
  const analyticsCards = bot ? [
    {
      title: 'Total Conversations',
      value: '0', // TODO: Calculate from conversations table
      icon: MessageSquare,
      change: 'No data yet',
      trend: 'neutral' as AnalyticsTrend,
      color: 'text-blue-500',
    },
    {
      title: 'Active Users',
      value: '0', // TODO: Calculate from conversations table
      icon: Users,
      change: 'No data yet',
      trend: 'neutral' as AnalyticsTrend,
      color: 'text-green-500',
    },
    {
      title: 'Avg Response Time',
      value: 'N/A', // TODO: Calculate from conversations table
      icon: Clock,
      change: 'No data yet',
      trend: 'neutral' as AnalyticsTrend,
      color: 'text-purple-500',
    },
    {
      title: 'Satisfaction Score',
      value: 'N/A', // TODO: Calculate from conversations table
      icon: Star,
      change: 'No data yet',
      trend: 'neutral' as AnalyticsTrend,
      color: 'text-yellow-500',
    },
    {
      title: 'Messages Sent',
      value: '0', // TODO: Calculate from conversations table
      icon: TrendingUp,
      change: 'No data yet',
      trend: 'neutral' as AnalyticsTrend,
      color: 'text-cyan-500',
    },
    {
      title: 'Uptime',
      value: bot.status === 'active' ? '100%' : '0%',
      icon: RefreshCw,
      change: 'Since creation',
      trend: 'neutral' as AnalyticsTrend,
      color: 'text-emerald-500',
    },
  ] : [];

  if (loading) {
    return (
      <div className="container max-w-7xl px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Loading bot details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!bot) {
    return (
      <div className="container max-w-7xl px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Bot not found</p>
          <Button onClick={() => navigate('/dashboard/onboarding')}>
            Back to Bots
          </Button>
        </div>
      </div>
    );
  }

  const branding = bot.branding as any || {};
  const llmConfig = bot.llm_config as any || {};

  return (
    <div className="container max-w-7xl px-4 py-8 space-y-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard/onboarding')}
          className="gap-2 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Bots
        </Button>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between"
      >
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">{bot.name}</h1>
              <Badge
                variant="outline"
                className={`${
                  bot.status === 'active'
                    ? 'bg-success/10 text-success border-success/20'
                    : bot.status === 'paused'
                    ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    : 'bg-destructive/10 text-destructive border-destructive/20'
                }`}
              >
                {bot.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{bot.description || 'No description'}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Last updated {formatTimeAgo(bot.updated_at)} · Created {formatDate(bot.created_at)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Control */}
          {bot.status === 'active' ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange('paused')}
                className="gap-2"
              >
                <Pause className="w-4 h-4" />
                Pause
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange('stopped')}
                className="gap-2 text-destructive hover:text-destructive"
              >
                <Square className="w-4 h-4" />
                Stop
              </Button>
            </>
          ) : bot.status === 'paused' ? (
            <Button
              variant="default"
              size="sm"
              onClick={() => handleStatusChange('active')}
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              Start
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => handleStatusChange('active')}
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              Activate
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {/* TODO: Implement edit */}}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Bot
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate Bot
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShowEmbedCode}>
                <Code className="w-4 h-4 mr-2" />
                Embed Code
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Bot
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Analytics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {analyticsCards.map((card, index) => (
          <Card key={card.title} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <span
                  className={
                    card.trend === 'up'
                      ? 'text-success'
                      : card.trend === 'down'
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  }
                >
                  {card.change}
                </span>
                <span>vs previous period</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Tabs Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 gap-2 h-auto p-1 bg-transparent border-0 shadow-none">
            <TabsTrigger 
              value="overview"
              className="glass transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:ring-2 data-[state=active]:ring-primary/50 data-[state=inactive]:bg-background/40 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-background/60"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="configuration"
              className="glass transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:ring-2 data-[state=active]:ring-primary/50 data-[state=inactive]:bg-background/40 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-background/60"
            >
              Configuration
            </TabsTrigger>
            <TabsTrigger 
              value="documents"
              className="glass transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:ring-2 data-[state=active]:ring-primary/50 data-[state=inactive]:bg-background/40 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-background/60"
            >
              Manage Knowledge Base
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="glass transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:ring-2 data-[state=active]:ring-primary/50 data-[state=inactive]:bg-background/40 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-background/60"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="glass transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:ring-2 data-[state=active]:ring-primary/50 data-[state=inactive]:bg-background/40 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-background/60"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Bot Overview</CardTitle>
                <CardDescription>Quick overview of your bot's performance and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Bot Name</Label>
                    <p className="font-medium">{bot.name}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Status</Label>
                    <p className="font-medium capitalize">{bot.status}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Communication Style</Label>
                    <p className="font-medium capitalize">{llmConfig.communication_style || 'friendly'}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">LLM Temperature</Label>
                    <p className="font-medium">{llmConfig.temperature || 0.7}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuration Tab */}
          <TabsContent value="configuration" className="space-y-6">
            {/* Bot Configuration Section */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Bot Configuration
                </CardTitle>
                <CardDescription>Edit your bot's name, welcome message, and branding</CardDescription>
              </CardHeader>
              <CardContent>
                <BrandingConfig
                  initialData={{
                    botName: botName || bot.name || '',
                    welcomeMessage: welcomeMessage || '',
                    primaryColor: selectedColor || colorCombinations[0].primary,
                    logoUrl: ((bot.branding as any) || {}).logo_url,
                  }}
                  onSave={handleSaveBotConfiguration}
                />
              </CardContent>
            </Card>

            {/* Tone & Communication Section */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Tone & Communication
                </CardTitle>
                <CardDescription>Configure LLM temperature, communication style, and prompts</CardDescription>
              </CardHeader>
              <CardContent>
                <ToneConfig
                  initialData={{
                    llmTemperature: llmTemperature || (llmConfig.temperature as number) || 0.7,
                    communicationStyle: (llmConfig.communication_style as any) || 'friendly',
                    stylePrompt: stylePrompt || (llmConfig.style_prompt as string) || '',
                  }}
                  onSave={handleSaveToneConfiguration}
                />
              </CardContent>
            </Card>

            {/* Guardrails Section */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Guardrails
                </CardTitle>
                <CardDescription>Configure safety measures and content guardrails</CardDescription>
              </CardHeader>
              <CardContent>
                <GuardrailsConfig
                  initialData={{
                    maxResponseLength: maxResponseLength || ((bot.guardrails as any)?.max_response_length as number) || 500,
                    blockedPhrases: (bot.guardrails as any)?.blocked_phrases || [],
                    enableFactChecking: enableFactChecking ?? ((bot.guardrails as any)?.enable_fact_checking as boolean) ?? true,
                    blockExplicitContent: blockExplicitContent ?? ((bot.guardrails as any)?.block_explicit_content as boolean) ?? true,
                    blockPoliticalViews: blockPoliticalViews ?? ((bot.guardrails as any)?.block_political_views as boolean) ?? true,
                    strictlyStickToTopic: strictlyStickToTopic ?? ((bot.guardrails as any)?.strictly_stick_to_topic as boolean) ?? true,
                    blockPersonalInfo: blockPersonalInfo ?? ((bot.guardrails as any)?.block_personal_info as boolean) ?? true,
                    customInstructions: customInstructions || ((bot.guardrails as any)?.custom_instructions as string) || '',
                  }}
                  onSave={handleSaveGuardrails}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Knowledge Base Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Knowledge Base
                </CardTitle>
                <CardDescription>Manage documents and data sources for your bot's knowledge base</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const retrievalConfig = bot.retrieval_config as any || {};
                  const dataSources = retrievalConfig.data_sources || [];
                  
                  if (dataSources.length === 0) {
                    return (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No data sources yet</p>
                        <p className="text-sm mt-2">Add documents or websites to build your knowledge base</p>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-medium">Name</th>
                            <th className="text-left py-3 px-4 font-medium">Type</th>
                            <th className="text-left py-3 px-4 font-medium">Date</th>
                            <th className="text-left py-3 px-4 font-medium">Time</th>
                            <th className="text-left py-3 px-4 font-medium">Status</th>
                            <th className="text-left py-3 px-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataSources.map((source: any) => {
                            const normalizedStatus = normalizeStatus(source.status);
                            return (
                              <tr key={source.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    {source.type === 'upload' ? (
                                      <FileText className="w-4 h-4 text-muted-foreground" />
                                    ) : (
                                      <Globe className="w-4 h-4 text-muted-foreground" />
                                    )}
                                    <span className="font-medium">{source.name}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                  {source.type === 'upload' ? 'Uploaded' : 'Crawled'}
                                </td>
                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                  {getDocumentDate(source)}
                                </td>
                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                  {getDocumentTime(source)}
                                </td>
                                <td className="py-3 px-4">
                                  <Badge
                                    variant={
                                      normalizedStatus === 'Processed' || normalizedStatus === 'Active'
                                        ? 'default'
                                        : normalizedStatus === 'Inactive'
                                        ? 'destructive'
                                        : 'outline'
                                    }
                                    className="capitalize"
                                  >
                                    {normalizedStatus}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleDeleteDataSource(source.id)}
                                    className="text-foreground hover:bg-muted/50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
                
                {/* File Upload */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-base">Upload Files</h3>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      accept=".pdf,.doc,.docx,.txt,.md"
                    />
                  </label>
                </div>

                {/* Website Crawl */}
                <div className="space-y-4">
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Detailed Analytics
                </CardTitle>
                <CardDescription>View detailed analytics and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Analytics charts and graphs will be displayed here</p>
                  <p className="text-sm mt-2">Coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Bot Settings</CardTitle>
                <CardDescription>Manage general bot settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Bot</Label>
                    <p className="text-sm text-muted-foreground">Allow the bot to respond to queries</p>
                  </div>
                  <Switch checked={bot.status === 'active'} onCheckedChange={(checked) => {
                    handleStatusChange(checked ? 'active' : 'stopped');
                  }} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Access</Label>
                    <p className="text-sm text-muted-foreground">Allow public access to the bot</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-respond</Label>
                    <p className="text-sm text-muted-foreground">Automatically respond to messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
      <Dialog open={isEmbedDialogOpen} onOpenChange={setIsEmbedDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Embed Code</DialogTitle>
            <DialogDescription>
              Add this snippet to your website before the closing <code>&lt;/body&gt;</code> tag.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto border border-border/50">
{`<!-- Add this before closing </body> tag -->
<script 
  src="${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/static/widget.js"
  data-bot-id="${bot?.slug || bot?.id || ''}"
  async>
</script>`}
            </pre>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Your bot must stay <strong>active</strong> for this snippet to render.</span>
              <Button onClick={handleCopyEmbedCode} size="sm" variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BotDetail;

