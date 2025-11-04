import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

// Dummy bot data - in production, this would come from API
const getBotData = (id: string) => {
  const bots: Record<string, any> = {
    '1': {
      id: '1',
      name: 'Customer Support Bot',
      description: 'Handles customer inquiries and support tickets',
      status: 'active',
      conversations: 1247,
      activeUsers: 342,
      avgResponseTime: 1.2,
      satisfactionScore: 4.8,
      messagesSent: 8923,
      messagesReceived: 12456,
      uptime: '99.8%',
      lastUpdated: '2 hours ago',
      createdAt: '2024-01-15',
      primaryColor: '#3b82f6',
      welcomeMessage: 'Hello! How can I help you today?',
      communicationStyle: 'friendly',
      llmTemperature: 0.7,
    },
    '2': {
      id: '2',
      name: 'Sales Assistant',
      description: 'Helps with product information and sales inquiries',
      status: 'active',
      conversations: 892,
      activeUsers: 189,
      avgResponseTime: 0.8,
      satisfactionScore: 4.6,
      messagesSent: 6543,
      messagesReceived: 8921,
      uptime: '99.9%',
      lastUpdated: '5 hours ago',
      createdAt: '2024-01-10',
      primaryColor: '#f97316',
      welcomeMessage: 'Hi! I can help you with product information.',
      communicationStyle: 'professional',
      llmTemperature: 0.6,
    },
    '3': {
      id: '3',
      name: 'HR Bot',
      description: 'Answers HR-related questions and employee onboarding',
      status: 'active',
      conversations: 456,
      activeUsers: 98,
      avgResponseTime: 1.5,
      satisfactionScore: 4.7,
      messagesSent: 3124,
      messagesReceived: 4567,
      uptime: '99.5%',
      lastUpdated: '1 day ago',
      createdAt: '2024-01-05',
      primaryColor: '#10b981',
      welcomeMessage: 'Hello! How can I assist with HR questions?',
      communicationStyle: 'supportive',
      llmTemperature: 0.75,
    },
  };
  return bots[id] || bots['1'];
};

// Color theme options
const colorCombinations = [
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    primary: '#3b82f6',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    description: 'Calm and professional',
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    primary: '#f97316',
    gradient: 'from-orange-500 via-pink-500 to-rose-500',
    description: 'Warm and inviting',
  },
  {
    id: 'forest',
    name: 'Forest Canopy',
    primary: '#10b981',
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    description: 'Fresh and natural',
  },
];

// Communication style options
const styleOptions = [
  {
    value: 'professional',
    label: 'Professional',
    description: 'Formal and business-like',
    icon: '💼',
    defaultPrompt: 'You are a professional assistant. Maintain a formal, business-appropriate tone in all interactions. Use clear and concise language. Avoid casual expressions and maintain professionalism at all times.',
  },
  {
    value: 'friendly',
    label: 'Friendly',
    description: 'Warm and approachable',
    icon: '😊',
    defaultPrompt: 'You are a friendly and warm assistant. Be approachable, empathetic, and conversational. Use a welcoming tone that makes users feel comfortable. Show genuine interest in helping them.',
  },
  {
    value: 'casual',
    label: 'Casual',
    description: 'Relaxed and conversational',
    icon: '👋',
    defaultPrompt: 'You are a casual and relaxed assistant. Use a conversational, laid-back tone. Feel free to use everyday language and be more informal. Keep it friendly but not overly formal.',
  },
  {
    value: 'technical',
    label: 'Technical',
    description: 'Precise and detailed',
    icon: '🔧',
    defaultPrompt: 'You are a technical assistant. Provide precise, detailed information. Use technical terminology when appropriate. Focus on accuracy and thoroughness in your explanations.',
  },
  {
    value: 'supportive',
    label: 'Supportive',
    description: 'Empathetic and helpful',
    icon: '🤝',
    defaultPrompt: 'You are a supportive and empathetic assistant. Show understanding and patience. Provide encouragement and reassurance. Focus on being helpful and understanding the user\'s needs.',
  },
  {
    value: 'enthusiastic',
    label: 'Enthusiastic',
    description: 'Energetic and positive',
    icon: '✨',
    defaultPrompt: 'You are an enthusiastic and energetic assistant. Maintain a positive, upbeat tone. Show excitement and energy in your responses. Be engaging and motivating.',
  },
] as const;

const BotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [bot, setBot] = useState(getBotData(botId || '1'));
  
  // Bot Configuration State
  const [botName, setBotName] = useState(bot.name);
  const [welcomeMessage, setWelcomeMessage] = useState(bot.welcomeMessage);
  const [selectedColor, setSelectedColor] = useState(bot.primaryColor);
  
  // Tone Configuration State
  const [llmTemperature, setLlmTemperature] = useState(bot.llmTemperature);
  const [communicationStyle, setCommunicationStyle] = useState(bot.communicationStyle);
  const [stylePrompt, setStylePrompt] = useState(bot.stylePrompt || styleOptions.find(s => s.value === bot.communicationStyle)?.defaultPrompt || '');
  
  // Guardrails State
  const [maxResponseLength, setMaxResponseLength] = useState(500);
  const [blockedPhrasesText, setBlockedPhrasesText] = useState('');
  const [enableFactChecking, setEnableFactChecking] = useState(true);
  const [blockExplicitContent, setBlockExplicitContent] = useState(true);
  const [blockPoliticalViews, setBlockPoliticalViews] = useState(true);
  const [strictlyStickToTopic, setStrictlyStickToTopic] = useState(true);
  const [blockPersonalInfo, setBlockPersonalInfo] = useState(true);
  const [customInstructions, setCustomInstructions] = useState('');

  // Initialize state when bot data changes
  useEffect(() => {
    const botData = getBotData(botId || '1');
    setBot(botData);
    setBotName(botData.name);
    setWelcomeMessage(botData.welcomeMessage);
    setSelectedColor(botData.primaryColor);
    setLlmTemperature(botData.llmTemperature);
    setCommunicationStyle(botData.communicationStyle);
    const defaultPrompt = styleOptions.find(s => s.value === botData.communicationStyle)?.defaultPrompt || '';
    setStylePrompt(botData.stylePrompt || defaultPrompt);
  }, [botId]);

  const handleStatusChange = (newStatus: 'active' | 'paused' | 'stopped') => {
    setBot({ ...bot, status: newStatus });
    toast.success(`Bot ${newStatus === 'active' ? 'started' : newStatus === 'paused' ? 'paused' : 'stopped'} successfully`);
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

  // Update style prompt when communication style changes
  useEffect(() => {
    const selectedOption = styleOptions.find(opt => opt.value === communicationStyle);
    if (selectedOption && (!stylePrompt || stylePrompt === selectedOption.defaultPrompt)) {
      setStylePrompt(selectedOption.defaultPrompt);
    }
  }, [communicationStyle]);

  const handleSaveBotConfiguration = () => {
    setBot({
      ...bot,
      name: botName,
      welcomeMessage,
      primaryColor: selectedColor,
    });
    toast.success('Bot configuration saved successfully!');
  };

  const handleSaveToneConfiguration = () => {
    setBot({
      ...bot,
      llmTemperature,
      communicationStyle,
      stylePrompt,
    });
    toast.success('Tone configuration saved successfully!');
  };

  const handleSaveGuardrails = () => {
    toast.success('Guardrails saved successfully!');
  };

  const analyticsCards = [
    {
      title: 'Total Conversations',
      value: bot.conversations.toLocaleString(),
      icon: MessageSquare,
      change: '+12%',
      trend: 'up',
      color: 'text-blue-500',
    },
    {
      title: 'Active Users',
      value: bot.activeUsers.toLocaleString(),
      icon: Users,
      change: '+8%',
      trend: 'up',
      color: 'text-green-500',
    },
    {
      title: 'Avg Response Time',
      value: `${bot.avgResponseTime}s`,
      icon: Clock,
      change: '-5%',
      trend: 'down',
      color: 'text-purple-500',
    },
    {
      title: 'Satisfaction Score',
      value: bot.satisfactionScore.toFixed(1),
      icon: Star,
      change: '+0.2',
      trend: 'up',
      color: 'text-yellow-500',
    },
    {
      title: 'Messages Sent',
      value: bot.messagesSent.toLocaleString(),
      icon: TrendingUp,
      change: '+15%',
      trend: 'up',
      color: 'text-cyan-500',
    },
    {
      title: 'Uptime',
      value: bot.uptime,
      icon: RefreshCw,
      change: 'Last 30 days',
      trend: 'neutral',
      color: 'text-emerald-500',
    },
  ];

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
            <p className="text-muted-foreground">{bot.description}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Last updated {bot.lastUpdated} · Created {bot.createdAt}
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
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => handleStatusChange('active')}
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              Start
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
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Bot
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate Bot
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Code className="w-4 h-4 mr-2" />
                Embed Code
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="documents">Manage Knowledge Base</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
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
                    <p className="font-medium capitalize">{bot.communicationStyle}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">LLM Temperature</Label>
                    <p className="font-medium">{bot.llmTemperature}</p>
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
              <CardContent className="space-y-6">
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
                              'w-full h-20 rounded-lg mb-2 bg-gradient-to-br',
                              combo.gradient
                            )}
                          />
                          <div className="text-center">
                            <p className="text-sm font-semibold mb-1">{combo.name}</p>
                            <p className="text-xs text-muted-foreground">{combo.description}</p>
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
                <Button onClick={handleSaveBotConfiguration} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Bot Configuration
                </Button>
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
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-3 block">
                    LLM Temperature: {llmTemperature.toFixed(2)}
                  </Label>
                  <Slider
                    value={[llmTemperature]}
                    onValueChange={(values) => setLlmTemperature(values[0])}
                    min={0}
                    max={1}
                    step={0.01}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>More Focused (0)</span>
                    <span>More Creative (1)</span>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Communication Style</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {styleOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setCommunicationStyle(option.value)}
                        className={cn(
                          'glass-card p-4 text-center transition-all',
                          communicationStyle === option.value
                            ? 'ring-2 ring-primary bg-primary/5'
                            : 'hover:scale-105'
                        )}
                      >
                        <div className="text-2xl mb-2">{option.icon}</div>
                        <div className="font-medium mb-1 text-sm">{option.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {option.description}
                        </div>
                        {communicationStyle === option.value && (
                          <Badge className="mt-2" variant="default">Selected</Badge>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="stylePrompt">Style Prompt (Editable)</Label>
                  <Textarea
                    id="stylePrompt"
                    value={stylePrompt}
                    onChange={(e) => setStylePrompt(e.target.value)}
                    className="mt-2 rounded-xl min-h-[150px] font-mono text-sm"
                    placeholder="Enter the prompt for the selected communication style..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Customize the prompt that defines how the assistant communicates with the selected style.
                  </p>
                </div>

                <Button onClick={handleSaveToneConfiguration} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Tone Configuration
                </Button>
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
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-3 block">
                    Maximum Response Length: {maxResponseLength} characters
                  </Label>
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

                <Button onClick={handleSaveGuardrails} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Guardrails
                </Button>
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
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Product Documentation.pdf</p>
                      <p className="text-sm text-muted-foreground">2.4 MB · Indexed</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">https://docs.example.com</p>
                      <p className="text-sm text-muted-foreground">Crawled · 245 pages</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <Upload className="w-4 h-4" />
                  Add Document or Website
                </Button>
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
    </div>
  );
};

export default BotDetail;

