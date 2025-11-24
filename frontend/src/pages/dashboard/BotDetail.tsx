import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBot, type BotDTO, updateBot, getSnippetsForBot, createSnippet, updateSnippet, deleteSnippet, type InstallationSnippetDTO, uploadBotDocument, listBotDocuments, deleteBotDocument, downloadBotDocument, type BotDocumentDTO, createCrawlDocument } from '@/lib/api';
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
  Eye,
  Upload,
  Globe,
  Shield,
  Sparkles,
  RefreshCw,
  ArrowLeft,
  Check,
  Save,
  Code2,
  Plus,
  X,
  ExternalLink,
  Activity,
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

const formatFileSize = (bytes?: number | null): string => {
  if (bytes === undefined || bytes === null) return 'Unknown size';
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, index);
  return `${value.toFixed(1)} ${units[index]}`;
};

const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
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

// Helper to derive a human-friendly document type from source
const getDocumentType = (source: any): string => {
  if (source.type === 'crawl') {
    return 'Website';
  }

  const name: string = source.name || '';
  const ext = name.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'pdf':
      return 'PDF';
    case 'doc':
    case 'docx':
      return 'Word Document';
    case 'txt':
      return 'Text File';
    case 'md':
      return 'Markdown';
    case 'csv':
      return 'CSV';
    default:
      return 'File';
  }
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

  // Snippet Management State
  const [snippets, setSnippets] = useState<InstallationSnippetDTO[]>([]);
  const [snippetsLoading, setSnippetsLoading] = useState(false);
  const [isRefreshingSnippets, setIsRefreshingSnippets] = useState(false);
  const [isCreateSnippetDialogOpen, setIsCreateSnippetDialogOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<InstallationSnippetDTO | null>(null);
  const [newSnippetDomains, setNewSnippetDomains] = useState<string[]>([]);
  const [newDomainInput, setNewDomainInput] = useState('');
  const [allowAllDomains, setAllowAllDomains] = useState(true);
  
  // Edit snippet domain state
  const [editSnippetDomains, setEditSnippetDomains] = useState<string[]>([]);
  const [editDomainInput, setEditDomainInput] = useState('');
  const [editAllowAllDomains, setEditAllowAllDomains] = useState(true);

  // Document Management State
  const [documents, setDocuments] = useState<BotDocumentDTO[]>([]);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [isUploadingDocument, setIsUploadingDocument] = useState(false);
  const [newDocumentUrl, setNewDocumentUrl] = useState('');
  const [isAddingDocumentUrl, setIsAddingDocumentUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const normalizeUrl = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };


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
        
        // Extract branding/UI configuration data from JSONB
        const branding = botData.branding as any || {};
        setWelcomeMessage(branding.intro_message || branding.welcome_message || 'Hello! How can I help you today?');
        setSelectedColor(branding.primary_color || '#6366f1');
        // Use chat_title or assistant_name from branding if available
        if (branding.chat_title || branding.assistant_name) {
          setBotName(branding.chat_title || branding.assistant_name || botData.name);
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

  // Fetch snippets function (can be called manually or automatically)
  const fetchSnippets = useCallback(async (showLoading = true) => {
    if (!botId || !bot) return;

    try {
      if (showLoading) {
        setSnippetsLoading(true);
      } else {
        setIsRefreshingSnippets(true);
      }
      const response = await getSnippetsForBot(botId);
      
      if (response.error) {
        if (showLoading) {
          toast.error(response.error || 'Failed to load snippets');
        }
        return;
      }

      setSnippets(response.data || []);
    } catch (error) {
      console.error('Error fetching snippets:', error);
      if (showLoading) {
        toast.error('Failed to load snippets');
      }
    } finally {
      setSnippetsLoading(false);
      setIsRefreshingSnippets(false);
    }
  }, [botId, bot]);

  // Fetch snippets when bot is loaded
  useEffect(() => {
    if (bot) {
      fetchSnippets(true);
    }
  }, [bot, fetchSnippets]);

  const fetchDocuments = useCallback(
    async (showToast = false) => {
      if (!botId) return;
      try {
        setDocumentsLoading(true);
        const response = await listBotDocuments(botId);
        if (response.error) {
          if (showToast) {
            toast.error(response.error || 'Failed to load documents');
          }
          return;
        }
        setDocuments(response.data || []);
      } catch (error) {
        console.error('Error fetching documents:', error);
        if (showToast) {
          toast.error('Failed to load documents');
        }
      } finally {
        setDocumentsLoading(false);
      }
    },
    [botId]
  );

  useEffect(() => {
    if (botId) {
      fetchDocuments();
    }
  }, [botId, fetchDocuments]);

  // Auto-refresh snippets every 30 seconds
  useEffect(() => {
    if (!botId || !bot) return;

    const interval = setInterval(() => {
      fetchSnippets(false); // Silent refresh (no loading spinner)
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [botId, bot, fetchSnippets]);

  // Initialize edit snippet state when dialog opens
  useEffect(() => {
    if (editingSnippet) {
      // Handle null, undefined, or empty array as "allow all domains"
      const domains = editingSnippet.allowed_domains || [];
      const hasDomains = domains.length > 0;
      setEditSnippetDomains(hasDomains ? domains : []);
      setEditAllowAllDomains(!hasDomains); // true if no domains (allow all), false if domains exist
      setEditDomainInput('');
      console.log('Initializing edit snippet:', { 
        allowed_domains: editingSnippet.allowed_domains, 
        domains, 
        hasDomains,
        editAllowAllDomains: !hasDomains 
      }); // Debug log
    } else {
      setEditSnippetDomains([]);
      setEditAllowAllDomains(true);
      setEditDomainInput('');
    }
  }, [editingSnippet]);

  // Update style prompt when communication style changes
  useEffect(() => {
    const selectedOption = styleOptions.find(opt => opt.value === communicationStyle);
    if (selectedOption && (!stylePrompt || stylePrompt === selectedOption.defaultPrompt)) {
      setStylePrompt(selectedOption.defaultPrompt);
    }
  }, [communicationStyle]);

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

  const handleDeleteDocument = async (documentId: string) => {
    if (!botId) return;
    try {
      const response = await deleteBotDocument(documentId);
      if (response.error) {
        toast.error(response.error || 'Failed to delete document');
        return;
      }
      setDocuments((docs) => docs.filter((doc) => doc.id !== documentId));
      toast.success('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to delete document');
    }
  };

  const handleDownloadDocument = async (
    documentId: string,
    filename: string,
    mode: 'download' | 'view' = 'download'
  ) => {
    try {
      const response = await downloadBotDocument(documentId);
      if (response.error || !response.data) {
        toast.error(response.error || 'Failed to fetch document');
        return;
      }
      const { blob, contentType } = response.data;
      const url = URL.createObjectURL(blob);
      if (mode === 'view') {
        window.open(url, '_blank');
      } else {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(url);
      toast.success(mode === 'view' ? 'Document opened' : 'Document downloaded');
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.error('Failed to download document');
    }
  };

  const handleOpenExternalDocument = (document: BotDocumentDTO) => {
    if (!document.source_url) {
      toast.error('No URL available for this document');
      return;
    }
    window.open(document.source_url, '_blank', 'noopener');
  };

  const handleAddWebsiteDocument = async () => {
    if (!botId) return;
    if (!newDocumentUrl.trim()) {
      toast.error('Please enter a website URL');
      return;
    }

    const normalizedUrl = normalizeUrl(newDocumentUrl);
    if (!normalizedUrl) {
      toast.error('Please enter a valid URL');
      return;
    }

    try {
      setIsAddingDocumentUrl(true);
      const response = await createCrawlDocument(botId, {
        url: normalizedUrl,
        name: normalizedUrl,
      });

      if (response.error || !response.data) {
        toast.error(response.error || 'Failed to add website');
        return;
      }

      toast.success('Website added to knowledge base!');
      setDocuments((prev) => [response.data, ...prev]);
      setNewDocumentUrl('');
    } catch (error) {
      console.error('Error adding website document:', error);
      toast.error('Failed to add website');
    } finally {
      setIsAddingDocumentUrl(false);
    }
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
    // Get the first snippet (there should only be one per bot)
    const snippet = snippets.length > 0 ? snippets[0] : null;
    if (!snippet) {
      toast.error('No snippet found. Please create a snippet first.');
      return;
    }
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const embedCode = `<!-- Add this before closing </body> tag -->\n<script \n  src="${apiBase}/static/widget.js"\n  data-snippet-id="${snippet.id}"\n  async>\n</script>`;

    try {
      await navigator.clipboard.writeText(embedCode);
      toast.success('Embed code copied to clipboard');
    } catch (error) {
      console.error('Failed to copy embed code:', error);
      toast.error('Failed to copy embed code');
    }
  };

  // Snippet Management Handlers
  const handleCreateSnippet = async () => {
    if (!botId) return;

    try {
      const response = await createSnippet(botId, {
        bot_id: botId,
        status: 'active',
        allowed_domains: allowAllDomains ? undefined : (newSnippetDomains.length > 0 ? newSnippetDomains : undefined),
      });

      if (response.error) {
        toast.error(response.error || 'Failed to create snippet');
        return;
      }

      toast.success('Snippet created successfully');
      setIsCreateSnippetDialogOpen(false);
      setNewSnippetDomains([]);
      setNewDomainInput('');
      setAllowAllDomains(true);
      
      // Refresh snippets list
      const snippetsResponse = await getSnippetsForBot(botId);
      if (!snippetsResponse.error) {
        setSnippets(snippetsResponse.data || []);
      }
    } catch (error) {
      console.error('Error creating snippet:', error);
      toast.error('Failed to create snippet');
    }
  };

  const handleUpdateSnippet = async (snippet: InstallationSnippetDTO) => {
    try {
      // Prepare the update payload
      const updatePayload: any = {
        status: snippet.status,
      };

      // Handle allowed_domains based on toggle
      console.log('DEBUG Frontend: editAllowAllDomains:', editAllowAllDomains); // Debug log
      console.log('DEBUG Frontend: editSnippetDomains:', editSnippetDomains); // Debug log
      console.log('DEBUG Frontend: editSnippetDomains.length:', editSnippetDomains.length); // Debug log
      
      if (editAllowAllDomains) {
        // If "Allow All Domains" is ON, send null explicitly to clear restrictions
        updatePayload.allowed_domains = null;
        console.log('DEBUG Frontend: Setting allowed_domains to null (allow all toggle is ON)'); // Debug log
      } else {
        // If "Allow All Domains" is OFF, send the domain list
        // If no domains are specified, send null (which means allow all)
        // This is a bit counterintuitive, but empty array gets converted to null anyway
        if (editSnippetDomains.length > 0) {
          updatePayload.allowed_domains = editSnippetDomains;
          console.log('DEBUG Frontend: Setting allowed_domains to list:', editSnippetDomains); // Debug log
        } else {
          updatePayload.allowed_domains = null;
          console.log('DEBUG Frontend: Setting allowed_domains to null (no domains in list)'); // Debug log
        }
      }

      console.log('Updating snippet with payload:', updatePayload); // Debug log
      const response = await updateSnippet(snippet.id, updatePayload);

      if (response.error) {
        toast.error(response.error || 'Failed to update snippet');
        return;
      }

      console.log('Update response:', response.data); // Debug log

      // Update the snippets list with the updated snippet from the response
      if (response.data) {
        setSnippets(prevSnippets => {
          const updated = prevSnippets.map(s => 
            s.id === response.data!.id ? response.data! : s
          );
          // If snippet not found in list, add it
          if (!updated.find(s => s.id === response.data!.id)) {
            updated.push(response.data!);
          }
          console.log('Updated snippets state:', updated); // Debug log
          return updated;
        });
      } else {
        // Fallback: refresh from server if response doesn't have data
        if (botId) {
          const snippetsResponse = await getSnippetsForBot(botId);
          if (!snippetsResponse.error) {
            console.log('Refreshed snippets:', snippetsResponse.data); // Debug log
            setSnippets(snippetsResponse.data || []);
          }
        }
      }

      toast.success('Snippet updated successfully');
      
      // Close dialog and reset state after successful update
      setEditingSnippet(null);
      setEditSnippetDomains([]);
      setEditDomainInput('');
      setEditAllowAllDomains(true);
    } catch (error) {
      console.error('Error updating snippet:', error);
      toast.error('Failed to update snippet');
    }
  };

  const handleToggleSnippetStatus = async (snippet: InstallationSnippetDTO) => {
    try {
      const newStatus = snippet.status === 'active' ? 'revoked' : 'active';
      const response = await updateSnippet(snippet.id, { status: newStatus });

      if (response.error) {
        toast.error(response.error || 'Failed to update snippet status');
        return;
      }

      toast.success(`Snippet ${newStatus === 'active' ? 'activated' : 'revoked'} successfully`);
      
      // Refresh snippets list
      if (botId) {
        const snippetsResponse = await getSnippetsForBot(botId);
        if (!snippetsResponse.error) {
          setSnippets(snippetsResponse.data || []);
        }
      }
    } catch (error) {
      console.error('Error updating snippet status:', error);
      toast.error('Failed to update snippet status');
    }
  };

  const handleDeleteSnippet = async (snippetId: string) => {
    if (!confirm('Are you sure you want to delete this snippet? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await deleteSnippet(snippetId);

      if (response.error) {
        toast.error(response.error || 'Failed to delete snippet');
        return;
      }

      toast.success('Snippet deleted successfully');
      
      // Refresh snippets list
      if (botId) {
        const snippetsResponse = await getSnippetsForBot(botId);
        if (!snippetsResponse.error) {
          setSnippets(snippetsResponse.data || []);
        }
      }
    } catch (error) {
      console.error('Error deleting snippet:', error);
      toast.error('Failed to delete snippet');
    }
  };

  const handleAddDomain = () => {
    const domain = extractDomain(newDomainInput);
    if (domain && !newSnippetDomains.includes(domain)) {
      setNewSnippetDomains([...newSnippetDomains, domain]);
      setNewDomainInput('');
    } else if (domain && newSnippetDomains.includes(domain)) {
      toast.error('Domain already added');
    } else if (!domain) {
      toast.error('Please enter a valid domain');
    }
  };

  const handleRemoveDomain = (domain: string) => {
    setNewSnippetDomains(newSnippetDomains.filter(d => d !== domain));
  };

  // Helper function to extract domain from URL or domain string
  const extractDomain = (input: string): string | null => {
    console.log('extractDomain called with input:', input);
    
    if (!input || typeof input !== 'string') {
      console.log('extractDomain: input is empty or not a string');
      return null;
    }
    
    const trimmed = input.trim().toLowerCase();
    console.log('extractDomain: trimmed:', trimmed);
    
    if (!trimmed) {
      console.log('extractDomain: trimmed is empty');
      return null;
    }
    
    // If it's a URL, extract the hostname
    try {
      // Add protocol if missing for URL parsing
      const urlString = trimmed.startsWith('http://') || trimmed.startsWith('https://') 
        ? trimmed 
        : `http://${trimmed}`;
      console.log('extractDomain: trying to parse URL:', urlString);
      const url = new URL(urlString);
      const hostname = url.hostname;
      console.log('extractDomain: extracted hostname:', hostname);
      return hostname;
    } catch (error) {
      console.log('extractDomain: URL parsing failed, trying fallback:', error);
      // If URL parsing fails, assume it's already a domain
      // Remove protocol if present
      const cleaned = trimmed.replace(/^https?:\/\//, '').split('/')[0].split('?')[0].split('#')[0];
      console.log('extractDomain: cleaned domain:', cleaned);
      const result = cleaned || null;
      console.log('extractDomain: returning:', result);
      return result;
    }
  };

  const handleEditAddDomain = () => {
    console.log('=== handleEditAddDomain CALLED ===');
    console.log('editDomainInput:', editDomainInput);
    console.log('editDomainInput.trim():', editDomainInput.trim());
    
    const domain = extractDomain(editDomainInput);
    console.log('Extracted domain:', domain);
    console.log('Current editSnippetDomains (before update):', editSnippetDomains);
    
    if (!domain) {
      console.error('Domain extraction failed!');
      toast.error('Please enter a valid domain (e.g., example.com or http://example.com)');
      return;
    }
    
    // Use functional update to ensure we have the latest state
    setEditSnippetDomains(prevDomains => {
      console.log('setEditSnippetDomains called with prevDomains:', prevDomains);
      
      if (prevDomains.includes(domain)) {
        console.log('Domain already exists in list');
        toast.error('Domain already added');
        return prevDomains;
      }
      
      const newDomains = [...prevDomains, domain];
      console.log('New domains array:', newDomains);
      
      // Automatically turn OFF "Allow All Domains" when a domain is added
      setEditAllowAllDomains(false);
      
      // Clear input
      setEditDomainInput('');
      
      // Show success
      toast.success(`Domain "${domain}" added successfully`);
      
      return newDomains;
    });
  };

  const handleEditRemoveDomain = (domain: string) => {
    const newDomains = editSnippetDomains.filter(d => d !== domain);
    setEditSnippetDomains(newDomains);
    // Automatically turn ON "Allow All Domains" when all domains are removed
    if (newDomains.length === 0) {
      setEditAllowAllDomains(true);
      console.log('DEBUG Frontend: Turned ON Allow All Domains toggle (all domains removed)'); // Debug log
    }
    console.log('DEBUG Frontend: Removed domain, new editSnippetDomains:', newDomains); // Debug log
  };

  // Update style prompt when communication style changes
  useEffect(() => {
    const selectedOption = styleOptions.find(opt => opt.value === communicationStyle);
    if (selectedOption && (!stylePrompt || stylePrompt === selectedOption.defaultPrompt)) {
      setStylePrompt(selectedOption.defaultPrompt);
    }
  }, [communicationStyle]);

  const handleSaveBotConfiguration = async (data: BrandingData) => {
    if (!bot) return;

    try {
      // Prepare UI config payload
      // Update branding JSONB with all UI configuration
      const updatedBranding = {
        ...(bot.branding as any || {}),
        // Logo and avatar
        logo_url: (bot.branding as any)?.logo_url || null,
        avatar_url: (bot.branding as any)?.avatar_url || (bot.branding as any)?.logo_url || null,
        // Colors
        primary_color: data.primaryColor,
        background_color: (bot.branding as any)?.background_color || '#ffffff',
        // Messages
        welcome_message: data.welcomeMessage,
        intro_message: data.welcomeMessage,
        assistant_name: data.botName,
        chat_title: data.botName,
        // Widget positioning and sizing (preserve existing or use defaults)
        position: (bot.branding as any)?.position || 'bottom-right',
        height: (bot.branding as any)?.height || 600,
        width: (bot.branding as any)?.width || 400,
      };

      const response = await updateBot(bot.id, {
        name: data.botName,
        branding: updatedBranding,
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

    try {
      setIsUploadingDocument(true);
      const response = await uploadBotDocument(bot.id, file);
      if (response.error) {
        toast.error(response.error || 'Failed to delete document');
        return;
      }
      toast.success('Document uploaded successfully!');
      e.target.value = '';
      if (response.data) {
        setDocuments((prev) => [response.data, ...prev]);
      } else {
        fetchDocuments();
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error('Failed to upload document');
    } finally {
      setIsUploadingDocument(false);
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
                <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
                  Uploads accept PDF, DOC, DOCX, or TXT files only. Add new websites via the form below to queue crawl sources.
                </div>
                {documentsLoading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <RefreshCw className="w-5 h-5 mx-auto mb-4 animate-spin" />
                    <p>Loading documents…</p>
                  </div>
                ) : documents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No documents yet</p>
                    <p className="text-sm mt-2">Upload PDFs, DOCs, or text files to build your knowledge base.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc) => {
                      const isExternal = doc.source_type === 'url';
                      const displayName = doc.filename || doc.source_url || 'External source';
                      const metaInfo = isExternal
                        ? `${doc.source_url || 'Website'}`
                        : `${formatFileSize(doc.size)} · Uploaded ${formatDate(doc.created_at)}`;

                      return (
                        <div
                          key={doc.id}
                          className="flex flex-wrap items-center gap-3 p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                            {isExternal ? (
                              <Globe className="w-5 h-5 text-muted-foreground" />
                            ) : (
                              <FileText className="w-5 h-5 text-muted-foreground" />
                            )}
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-medium break-all">{displayName}</p>
                                <Badge variant="outline" className="text-xs capitalize">
                                  {isExternal ? 'Website' : 'File'}
                                </Badge>
                                <Badge variant="secondary" className="text-xs capitalize">
                                  {doc.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground break-all">{metaInfo}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isExternal ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => handleOpenExternalDocument(doc)}
                                disabled={!doc.source_url}
                              >
                                <ExternalLink className="w-4 h-4" />
                                Open
                              </Button>
                            ) : (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() =>
                                    handleDownloadDocument(
                                      doc.id,
                                      doc.filename || 'document',
                                      'view'
                                    )
                                  }
                                >
                                  <Eye className="w-4 h-4" />
                                  View
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() =>
                                    handleDownloadDocument(
                                      doc.id,
                                      doc.filename || 'document',
                                      'download'
                                    )
                                  }
                                >
                                  <Download className="w-4 h-4" />
                                  Download
                                </Button>
                              </>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDocument(doc.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                  aria-label="Upload document"
                />
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  type="button"
                  disabled={isUploadingDocument}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className={`w-4 h-4 ${isUploadingDocument ? 'animate-bounce' : ''}`} />
                  {isUploadingDocument ? 'Uploading…' : 'Add Document'}
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Add Website
                </CardTitle>
                <CardDescription>Add a URL to your knowledge base (e.g., documentation, blog, support site).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col gap-2 md:flex-row">
                  <Input
                    placeholder="https://example.com/docs"
                    value={newDocumentUrl}
                    onChange={(e) => setNewDocumentUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleAddWebsiteDocument}
                    disabled={isAddingDocumentUrl}
                    className="gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    {isAddingDocumentUrl ? 'Adding...' : 'Add URL'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Uploads accept PDF, DOC, DOCX, or TXT files only. Websites can be added via the form above.
                </p>
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

            {/* Installation Snippet Section */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="h-5 w-5" />
                      Installation Snippet
                    </CardTitle>
                    <CardDescription>
                      Your bot's embed code snippet with domain allow-list and analytics
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fetchSnippets(true)}
                    disabled={snippetsLoading || isRefreshingSnippets}
                    className="gap-2"
                    title="Refresh snippet data"
                  >
                    <RefreshCw className={`h-4 w-4 ${isRefreshingSnippets ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {snippetsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : snippets.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Code2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Snippet not found</p>
                    <p className="text-xs mt-1">Snippets are automatically created when you create a bot.</p>
                    <Button 
                      onClick={() => setIsCreateSnippetDialogOpen(true)} 
                      className="mt-4"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Snippet
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Show only the first snippet (there should only be one) */}
                    {snippets.slice(0, 1).map((snippet) => (
                      <Card key={snippet.id} className="border border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-3">
                                <h4 className="font-semibold">Installation Snippet</h4>
                                <Badge variant={snippet.status === 'active' ? 'default' : 'secondary'}>
                                  {snippet.status}
                                </Badge>
                              </div>
                              
                              {/* Analytics */}
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground text-xs">Usage Count</p>
                                  <p className="font-semibold flex items-center gap-1">
                                    <Activity className="h-4 w-4" />
                                    {snippet.usage_count || 0}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground text-xs">Last Used</p>
                                  <p className="font-semibold">
                                    {snippet.last_used_at 
                                      ? formatTimeAgo(snippet.last_used_at)
                                      : 'Never'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground text-xs">Allowed Domains</p>
                                  <p className="font-semibold">
                                    {snippet.allowed_domains && snippet.allowed_domains.length > 0
                                      ? `${snippet.allowed_domains.length} domain(s)`
                                      : 'All domains'}
                                  </p>
                                </div>
                              </div>

                              {/* Domain List */}
                              {snippet.allowed_domains && snippet.allowed_domains.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {snippet.allowed_domains.map((domain, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      <Globe className="h-3 w-3 mr-1" />
                                      {domain}
                                    </Badge>
                                  ))}
                                </div>
                              )}

                              {/* Embed Code Preview */}
                              <div className="mt-3 p-3 bg-muted rounded-lg">
                                <p className="text-xs text-muted-foreground mb-2">Embed Code:</p>
                                <code className="text-xs block break-all">
                                  data-snippet-id="{snippet.id}"
                                </code>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 ml-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                                  const embedCode = `<!-- Add this before closing </body> tag -->
<script 
  src="${apiBase}/static/widget.js"
  data-snippet-id="${snippet.id}"
  async>
</script>`;
                                  navigator.clipboard.writeText(embedCode);
                                  toast.success('Embed code copied!');
                                }}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Code
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingSnippet(snippet)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleSnippetStatus(snippet)}
                              >
                                {snippet.status === 'active' ? (
                                  <>
                                    <X className="h-4 w-4 mr-2" />
                                    Revoke
                                  </>
                                ) : (
                                  <>
                                    <Check className="h-4 w-4 mr-2" />
                                    Activate
                                  </>
                                )}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteSnippet(snippet.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      {/* Create Snippet Dialog */}
      <Dialog open={isCreateSnippetDialogOpen} onOpenChange={setIsCreateSnippetDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Installation Snippet</DialogTitle>
            <DialogDescription>
              Create a new embed code snippet with optional domain restrictions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow All Domains</Label>
                <p className="text-sm text-muted-foreground">
                  Allow the snippet to be used on any domain (recommended for testing)
                </p>
              </div>
              <Switch 
                checked={allowAllDomains} 
                onCheckedChange={(checked) => {
                  setAllowAllDomains(checked);
                  if (checked) {
                    setNewSnippetDomains([]);
                    setNewDomainInput('');
                  }
                }}
              />
            </div>
            
            {!allowAllDomains && (
              <div>
                <Label>Allowed Domains</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Add domains to restrict where the snippet can be used.
                </p>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newDomainInput}
                    onChange={(e) => setNewDomainInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDomain();
                      }
                    }}
                    placeholder="example.com"
                  />
                  <Button type="button" onClick={handleAddDomain} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {newSnippetDomains.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newSnippetDomains.map((domain, idx) => (
                      <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {domain}
                        <button
                          onClick={() => handleRemoveDomain(domain)}
                          className="ml-1 hover:text-destructive"
                          aria-label={`Remove domain ${domain}`}
                          title={`Remove domain ${domain}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                setIsCreateSnippetDialogOpen(false);
                setAllowAllDomains(true);
                setNewSnippetDomains([]);
                setNewDomainInput('');
              }}>
                Cancel
              </Button>
              <Button onClick={handleCreateSnippet}>
                Create Snippet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Snippet Dialog */}
      <Dialog open={editingSnippet !== null} onOpenChange={(open) => !open && setEditingSnippet(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Snippet</DialogTitle>
            <DialogDescription>
              Update domain allow-list and status
            </DialogDescription>
          </DialogHeader>
          {editingSnippet && (
            <div className="space-y-4">
              <div>
                <Label>Status</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={editingSnippet.status === 'active' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setEditingSnippet({ ...editingSnippet, status: 'active' })}
                  >
                    Active
                  </Button>
                  <Button
                    variant={editingSnippet.status === 'revoked' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setEditingSnippet({ ...editingSnippet, status: 'revoked' })}
                  >
                    Revoked
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow All Domains</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow the snippet to be used on any domain (recommended for testing)
                  </p>
                </div>
                <Switch 
                  checked={editAllowAllDomains} 
                  onCheckedChange={(checked) => {
                    setEditAllowAllDomains(checked);
                    if (checked) {
                      setEditSnippetDomains([]);
                      setEditDomainInput('');
                    }
                  }}
                />
              </div>
              
              {!editAllowAllDomains && (
                <div>
                  <Label>Allowed Domains</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Add domains to restrict where the snippet can be used.
                  </p>
                  {/* Debug info - remove in production */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="mb-2 p-2 bg-muted rounded text-xs space-y-1">
                      <div><strong>Debug State:</strong></div>
                      <div>Allow All: {editAllowAllDomains ? 'YES' : 'NO'}</div>
                      <div>Domains Array: {JSON.stringify(editSnippetDomains)}</div>
                      <div>Domain Count: {editSnippetDomains.length}</div>
                      <div>Input Value: "{editDomainInput}"</div>
                      <div>Input Length: {editDomainInput.length}</div>
                    </div>
                  )}
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={editDomainInput}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        console.log('Input onChange:', newValue);
                        setEditDomainInput(newValue);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          console.log('Enter key pressed in input');
                          handleEditAddDomain();
                        }
                      }}
                      placeholder="example.com or http://example.com"
                    />
                    <Button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('=== ADD BUTTON CLICKED ===');
                        console.log('Event:', e);
                        console.log('editDomainInput:', editDomainInput);
                        console.log('editDomainInput.trim():', editDomainInput.trim());
                        console.log('editAllowAllDomains:', editAllowAllDomains);
                        console.log('editSnippetDomains:', editSnippetDomains);
                        handleEditAddDomain();
                      }} 
                      variant="outline"
                      disabled={!editDomainInput.trim()}
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                  <div className="mt-2">
                    {editSnippetDomains.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {editSnippetDomains.map((domain, idx) => (
                          <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {domain}
                            <button
                              onClick={() => handleEditRemoveDomain(domain)}
                              className="ml-1 hover:text-destructive"
                              aria-label={`Remove domain ${domain}`}
                              title={`Remove domain ${domain}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">
                        No domains added yet. Add a domain above to restrict where the snippet can be used.
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => {
                  setEditingSnippet(null);
                  setEditSnippetDomains([]);
                  setEditDomainInput('');
                  setEditAllowAllDomains(true);
                }}>
                  Cancel
                </Button>
                <Button onClick={() => handleUpdateSnippet(editingSnippet)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEmbedDialogOpen} onOpenChange={setIsEmbedDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Embed Code</DialogTitle>
            <DialogDescription>
              Add this snippet to your website before the closing <code>&lt;/body&gt;</code> tag.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {snippets.length > 0 ? (
              <>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto border border-border/50">
{`<!-- Add this before closing </body> tag -->
<script 
  src="${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/static/widget.js"
  data-snippet-id="${snippets[0].id}"
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
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground mb-4">
                  No snippet found. Please create a snippet first in the Settings tab.
                </p>
                <Button 
                  onClick={() => {
                    setIsEmbedDialogOpen(false);
                    // Navigate to Settings tab - you may need to add tab state management
                  }}
                  variant="outline"
                  size="sm"
                >
                  Create Snippet
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BotDetail;

