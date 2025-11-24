// Mock API functions for TanStack Query
// Replace with real endpoints when backend is ready

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Common entities (placeholders for backend integration)
export interface AgentDTO {
  id: string;
  name: string;
  provider: string;
  model: string;
  temperature?: number;
  systemPrompt?: string;
  routing?: 'direct' | 'retrieval' | 'tools';
}

export interface SourceDTO {
  id: string;
  name: string;
  type: 'upload' | 'crawl' | 'api' | 's3' | 'gdrive' | 'notion' | 'github';
  config: Record<string, unknown>;
  status: 'queued' | 'processing' | 'indexed' | 'error';
  updatedAt: string;
}

export interface DocumentDTO {
  id: string;
  title: string;
  sourceId?: string | null;
  status: 'processing' | 'indexed' | 'error';
  createdAt: string;
}

export interface BotDocumentDTO {
  id: string;
  bot_id: string;
  filename?: string | null;
  content_type?: string | null;
  size?: number | null;
  source_type: 'file' | 'url' | 'integration';
  source_url?: string | null;
  status: 'pending' | 'processing' | 'indexed' | 'error';
  metadata?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface JobDTO {
  id: string;
  type: 'ingest' | 'embed' | 'sync';
  status: 'queued' | 'running' | 'completed' | 'failed';
  startedAt: string;
  finishedAt?: string | null;
}

export interface SubscriptionDTO {
  plan: 'free' | 'pro' | 'business' | 'enterprise';
  status: 'trialing' | 'active' | 'past_due' | 'canceled';
  renewsAt?: string | null;
  usage: { messages: number; messagesLimit: number; storageMb: number; storageLimitMb: number; bots: number; botsLimit: number };
}

export interface ApiKeyDTO { id: string; label: string; last4: string; createdAt: string; }

export interface TeamMemberDTO { id: string; name: string; email: string; role: 'owner' | 'admin' | 'member' | 'viewer'; }

export interface GuardrailsDTO {
  maxResponseLength: number;
  blockedPhrases: string[];
  enableFactChecking: boolean;
  enableSensitiveFilter: boolean;
  customInstructions?: string;
  allowedDomains: string[];
  blockedRegex: string[];
  escalationRules: Record<string, unknown>;
}

// API Base URL - use environment variable or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Helper function for API calls
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('access_token');
  const isFormData =
    typeof FormData !== 'undefined' && options.body instanceof FormData;

  const headers = new Headers(options.headers || {});

  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('content-type') || '';
    let parsedBody: any = null;

    if (response.status !== 204) {
      const text = await response.text();
      if (text) {
        if (contentType.includes('application/json')) {
          parsedBody = JSON.parse(text);
        } else {
          parsedBody = text as unknown as T;
        }
      }
    }

    if (!response.ok) {
      const errorMessage =
        (parsedBody &&
          typeof parsedBody === 'object' &&
          (parsedBody.detail || parsedBody.message)) ||
        (typeof parsedBody === 'string'
          ? parsedBody
          : response.statusText || 'An error occurred');

      return {
        data: (parsedBody ?? ({} as T)) as T,
        error: errorMessage,
      };
    }

    if (parsedBody === null) {
      return { data: {} as T };
    }

    return { data: parsedBody as T };
  } catch (error) {
    return {
      data: {} as T,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// Auth
export const mockSignUp = async (
  email: string, 
  password: string, 
  fullName: string,
  companyName: string,
  domain?: string
): Promise<ApiResponse<{ userId: string }>> => {
  return apiRequest<{ access_token: string; token_type: string; user: any }>(
    '/api/v1/auth/signup',
    {
      method: 'POST',
      body: JSON.stringify({ 
        email, 
        password, 
        full_name: fullName,
        company_name: companyName,
        domain: domain 
      }),
    }
  ).then((response) => {
    if (response.error) {
      throw new Error(response.error);
    }
    if (response.data && response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      return {
        data: {
          userId: response.data.user.id,
        },
      };
    }
    throw new Error(response.error || 'Sign up failed');
  });
};

export const mockSignIn = async (email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> => {
  return apiRequest<{ access_token: string; token_type: string; user: any }>(
    '/api/v1/auth/signin',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }
  ).then((response) => {
    if (response.data && response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      return {
        data: {
          token: response.data.access_token,
          user: response.data.user,
        },
      };
    }
    throw new Error(response.error || 'Sign in failed');
  });
};

// Tenant
export const mockCreateTenant = async (): Promise<ApiResponse<{ tenantId: string }>> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { data: { tenantId: 'tenant_' + Math.random().toString(36).substring(7) } };
};

// Upload
export const mockUploadFile = async (file: File): Promise<ApiResponse<{ fileId: string; status: string }>> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    data: {
      fileId: 'file_' + Math.random().toString(36).substring(7),
      status: 'uploaded',
    },
  };
};

// Crawl
export const mockStartCrawl = async (url: string): Promise<ApiResponse<{ crawlId: string; status: string }>> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    data: {
      crawlId: 'crawl_' + Math.random().toString(36).substring(7),
      status: 'queued',
    },
  };
};

// Indexing
export const mockGetIndexingStatus = async (): Promise<ApiResponse<{ progress: number; status: string }>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const progress = Math.min(100, Math.floor(Math.random() * 100) + 20);
  return {
    data: {
      progress,
      status: progress === 100 ? 'completed' : 'running',
    },
  };
};

// Chat
export const mockChatMessage = async (message: string): Promise<ApiResponse<{ reply: string }>> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    data: {
      reply: `Mock response to: "${message}". This is a test environment.`,
    },
  };
};

// Analytics
export const mockGetAnalytics = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    data: {
      totalChats: 1247,
      avgResponseTime: '2.3s',
      docsIndexed: 87,
      activeSources: 12,
    },
  };
};

// Agents
let _agents: AgentDTO[] = [
  { id: 'agt_1', name: 'Support Assistant', provider: 'openai', model: 'gpt-4o-mini', temperature: 0.3, routing: 'direct', systemPrompt: 'You are a helpful support assistant.' },
];
export const mockListAgents = async (): Promise<ApiResponse<AgentDTO[]>> => {
  await new Promise((r) => setTimeout(r, 300));
  return { data: _agents };
};

export const mockSaveAgent = async (agent: Omit<AgentDTO, 'id'> & { id?: string }): Promise<ApiResponse<AgentDTO>> => {
  await new Promise((r) => setTimeout(r, 400));
  const saved: AgentDTO = { id: agent.id ?? 'agt_' + Math.random().toString(36).slice(2), ...agent } as AgentDTO;
  if (agent.id) {
    _agents = _agents.map((a) => (a.id === agent.id ? saved : a));
  } else {
    _agents = [saved, ..._agents];
  }
  return { data: saved };
};

// Sources
let _sources: SourceDTO[] = [
  { id: 'src_1', name: 'Marketing Website', type: 'crawl', config: { url: 'https://example.com' }, status: 'indexed', updatedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'src_2', name: 'Product Docs', type: 'upload', config: {}, status: 'processing', updatedAt: new Date(Date.now() - 3600000).toISOString() },
];
export const mockListSources = async (): Promise<ApiResponse<SourceDTO[]>> => {
  await new Promise((r) => setTimeout(r, 300));
  return { data: _sources };
};

export const mockSaveSource = async (source: Omit<SourceDTO, 'id' | 'updatedAt' | 'status'> & { id?: string }): Promise<ApiResponse<SourceDTO>> => {
  await new Promise((r) => setTimeout(r, 400));
  const saved: SourceDTO = { id: source.id ?? 'src_' + Math.random().toString(36).slice(2), updatedAt: new Date().toISOString(), status: source.id ? _sources.find(s => s.id === source.id)?.status ?? 'queued' : 'queued', ...source };
  if (source.id) {
    _sources = _sources.map((s) => (s.id === source.id ? saved : s));
  } else {
    _sources = [saved, ..._sources];
  }
  return { data: saved };
};

// Knowledge
let _documents: DocumentDTO[] = [
  { id: 'doc_1', title: 'Return Policy', sourceId: null, status: 'indexed', createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: 'doc_2', title: 'FAQ', sourceId: null, status: 'indexed', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'doc_3', title: 'Terms of Service', sourceId: null, status: 'processing', createdAt: new Date(Date.now() - 3600000).toISOString() },
];
export const mockListDocuments = async (): Promise<ApiResponse<DocumentDTO[]>> => {
  await new Promise((r) => setTimeout(r, 300));
  return { data: _documents };
};

export const mockSaveDocument = async (doc: Omit<DocumentDTO, 'id' | 'createdAt' | 'status'> & { id?: string }): Promise<ApiResponse<DocumentDTO>> => {
  await new Promise((r) => setTimeout(r, 400));
  const saved: DocumentDTO = { id: doc.id ?? 'doc_' + Math.random().toString(36).slice(2), createdAt: doc.id ? _documents.find(d => d.id === doc.id)?.createdAt ?? new Date().toISOString() : new Date().toISOString(), status: doc.id ? _documents.find(d => d.id === doc.id)?.status ?? 'processing' : 'processing', ...doc };
  if (doc.id) {
    _documents = _documents.map((d) => (d.id === doc.id ? saved : d));
  } else {
    _documents = [saved, ..._documents];
  }
  return { data: saved };
};

// ----- Real document upload endpoints -----

export const uploadBotDocument = async (
  botId: string,
  file: File
): Promise<ApiResponse<BotDocumentDTO>> => {
  const formData = new FormData();
  formData.append('file', file);

  return apiRequest<BotDocumentDTO>(`/api/v1/bots/${botId}/documents`, {
    method: 'POST',
    body: formData,
  });
};

export const listBotDocuments = async (
  botId: string
): Promise<ApiResponse<BotDocumentDTO[]>> => {
  return apiRequest<BotDocumentDTO[]>(`/api/v1/bots/${botId}/documents`);
};

export const deleteBotDocument = async (
  documentId: string
): Promise<ApiResponse<Record<string, never>>> => {
  return apiRequest(`/api/v1/documents/${documentId}`, {
    method: 'DELETE',
  });
};

export const downloadBotDocument = async (
  documentId: string
): Promise<
  ApiResponse<{ blob: Blob; filename: string; contentType: string }>
> => {
  const token = localStorage.getItem('access_token');

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/documents/${documentId}`,
      {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      }
    );

    if (!response.ok) {
      let errorMessage = 'Failed to download document';
      try {
        const data = await response.json();
        errorMessage = data.detail || data.message || errorMessage;
      } catch {
        /* ignore */
      }
      return { data: {} as any, error: errorMessage };
    }

    const blob = await response.blob();
    const contentType =
      response.headers.get('content-type') || 'application/octet-stream';
    const disposition = response.headers.get('content-disposition') || '';
    let filename = `document-${documentId}`;
    const match = disposition.match(/filename="?([^"]+)"?/i);
    if (match?.[1]) {
      filename = match[1];
    }

    return {
      data: {
        blob,
        filename,
        contentType,
      },
    };
  } catch (error) {
    return {
      data: {} as any,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
};

// Jobs
export const mockListJobs = async (): Promise<ApiResponse<JobDTO[]>> => {
  await new Promise((r) => setTimeout(r, 300));
  return { data: [{ id: 'job_1', type: 'ingest', status: 'completed', startedAt: new Date(Date.now() - 3600e3).toISOString(), finishedAt: new Date().toISOString() }] };
};

// Billing
const planLimits: Record<SubscriptionDTO['plan'], { messagesLimit: number; storageLimitMb: number; botsLimit: number }> = {
  free: { messagesLimit: 100, storageLimitMb: 50, botsLimit: 1 },
  pro: { messagesLimit: 10000, storageLimitMb: 1024, botsLimit: 10 },
  business: { messagesLimit: 100000, storageLimitMb: 10240, botsLimit: 999 },
  enterprise: { messagesLimit: 999999, storageLimitMb: 999999, botsLimit: 999 },
};

let _subscription: SubscriptionDTO = {
  plan: 'free',
  status: 'trialing',
  renewsAt: null,
  usage: {
    messages: 47,
    messagesLimit: planLimits.free.messagesLimit,
    storageMb: 12,
    storageLimitMb: planLimits.free.storageLimitMb,
    bots: 1,
    botsLimit: planLimits.free.botsLimit,
  },
};

export const mockGetSubscription = async (): Promise<ApiResponse<SubscriptionDTO>> => {
  await new Promise((r) => setTimeout(r, 250));
  return { data: _subscription };
};

export const mockUpdatePlan = async (plan: SubscriptionDTO['plan']): Promise<ApiResponse<SubscriptionDTO>> => {
  await new Promise((r) => setTimeout(r, 400));
  const limits = planLimits[plan];
  _subscription = {
    plan,
    status: plan === 'free' ? 'trialing' : 'active',
    renewsAt: plan === 'free' ? null : new Date(Date.now() + 30 * 24 * 3600e3).toISOString(),
    usage: {
      messages: Math.min(_subscription.usage.messages, limits.messagesLimit),
      messagesLimit: limits.messagesLimit,
      storageMb: Math.min(_subscription.usage.storageMb, limits.storageLimitMb),
      storageLimitMb: limits.storageLimitMb,
      bots: Math.min(_subscription.usage.bots, limits.botsLimit),
      botsLimit: limits.botsLimit,
    },
  };
  return { data: _subscription };
};

// API Keys
let _apiKeys: ApiKeyDTO[] = [ { id: 'key_1', label: 'Production', last4: '2f9a', createdAt: new Date().toISOString() } ];
export const mockListApiKeys = async (): Promise<ApiResponse<ApiKeyDTO[]>> => { await new Promise((r)=>setTimeout(r,200)); return { data: _apiKeys }; };
export const mockCreateApiKey = async (label: string): Promise<ApiResponse<ApiKeyDTO & { secretPreview: string }>> => {
  await new Promise((r)=>setTimeout(r,250));
  const last4 = Math.random().toString(16).slice(2,6);
  const key = { id: 'key_'+Math.random().toString(36).slice(2), label, last4, createdAt: new Date().toISOString() };
  _apiKeys = [key, ..._apiKeys];
  return { data: { ...key, secretPreview: 'sk_live_'+last4+'…' } };
};
export const mockDeleteApiKey = async (id: string): Promise<ApiResponse<{ ok: true }>> => { await new Promise((r)=>setTimeout(r,200)); _apiKeys = _apiKeys.filter(k=>k.id!==id); return { data: { ok: true } }; };

// Team
let _team: TeamMemberDTO[] = [
  { id: 'u1', name: 'Owner User', email: 'owner@example.com', role: 'owner' },
  { id: 'u2', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
];
export const mockListTeam = async (): Promise<ApiResponse<TeamMemberDTO[]>> => { await new Promise((r)=>setTimeout(r,200)); return { data: _team }; };
export const mockInviteTeam = async (name: string, email: string, role: TeamMemberDTO['role']): Promise<ApiResponse<TeamMemberDTO>> => {
  await new Promise((r)=>setTimeout(r,300));
  const member = { id: 'u_'+Math.random().toString(36).slice(2), name, email, role };
  _team = [..._team, member];
  return { data: member };
};
export const mockUpdateRole = async (id: string, role: TeamMemberDTO['role']): Promise<ApiResponse<TeamMemberDTO>> => {
  await new Promise((r)=>setTimeout(r,200));
  _team = _team.map(m => m.id === id ? { ...m, role } : m);
  return { data: _team.find(m => m.id === id)! };
};
export const mockRemoveMember = async (id: string): Promise<ApiResponse<{ ok: true }>> => { await new Promise((r)=>setTimeout(r,200)); _team = _team.filter(m=>m.id!==id); return { data: { ok: true } }; };

// Guardrails
let _guardrails: GuardrailsDTO = {
  maxResponseLength: 500,
  blockedPhrases: [],
  enableFactChecking: true,
  enableSensitiveFilter: true,
  customInstructions: '',
  allowedDomains: [],
  blockedRegex: [],
  escalationRules: {},
};
export const mockGetGuardrails = async (): Promise<ApiResponse<GuardrailsDTO>> => { await new Promise((r)=>setTimeout(r,200)); return { data: _guardrails }; };
export const mockSaveGuardrails = async (g: GuardrailsDTO): Promise<ApiResponse<GuardrailsDTO>> => { await new Promise((r)=>setTimeout(r,250)); _guardrails = g; return { data: _guardrails }; };

// UI Configs
export interface UiConfigDTO {
  id: string;
  user_id: string;
  name: string | null;
  primary_color: string | null;
  background_color: string | null;
  chat_title: string | null;
  intro_message: string | null;
  avatar_url: string | null;
  position: string | null;
  height: number | null;
  width: number | null;
  created_at: string;
  updated_at: string;
}

export type UiConfigPayload = {
  name?: string | null;
  primary_color?: string | null;
  background_color?: string | null;
  chat_title?: string | null;
  intro_message?: string | null;
  avatar_url?: string | null;
  position?: string | null;
  height?: number | null;
  width?: number | null;
};

export const createUiConfig = async (
  payload: UiConfigPayload
): Promise<ApiResponse<UiConfigDTO>> => {
  return apiRequest<UiConfigDTO>('/api/v1/ui-configs', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const updateUiConfig = async (
  uiConfigId: string,
  payload: UiConfigPayload
): Promise<ApiResponse<UiConfigDTO>> => {
  return apiRequest<UiConfigDTO>(`/api/v1/ui-configs/${uiConfigId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const getUiConfig = async (
  uiConfigId: string
): Promise<ApiResponse<UiConfigDTO>> => {
  return apiRequest<UiConfigDTO>(`/api/v1/ui-configs/${uiConfigId}`, {
    method: 'GET',
  });
};

// Bots
export interface BotDTO {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  slug: string | null;
  status: 'draft' | 'active' | 'paused' | 'archived';
  is_active: boolean;
  last_deployed_at: string | null;
  llm_config: Record<string, unknown> | null;
  retrieval_config: Record<string, unknown> | null;
  guardrails: Record<string, unknown> | null;
  branding: Record<string, unknown> | null;
  ui_config_id: string | null;
  created_at: string;
  updated_at: string;
  conversations_count: number;
}

export const getBots = async (): Promise<ApiResponse<BotDTO[]>> => {
  return apiRequest<BotDTO[]>('/api/v1/bots', {
    method: 'GET',
  });
};

export const getBot = async (botId: string): Promise<ApiResponse<BotDTO>> => {
  return apiRequest<BotDTO>(`/api/v1/bots/${botId}`, {
    method: 'GET',
  });
};

export const createBot = async (botData: {
  name: string;
  description?: string;
  branding?: Record<string, unknown>;
  llm_config?: Record<string, unknown>;
  guardrails?: Record<string, unknown>;
  retrieval_config?: Record<string, unknown>;
  ui_config_id?: string | null;
}): Promise<ApiResponse<BotDTO>> => {
  return apiRequest<BotDTO>('/api/v1/bots', {
    method: 'POST',
    body: JSON.stringify(botData),
  });
};

export const updateBot = async (
  botId: string,
  botData: {
    name?: string;
    description?: string;
    status?: string;
    branding?: Record<string, unknown>;
    llm_config?: Record<string, unknown>;
    guardrails?: Record<string, unknown>;
    retrieval_config?: Record<string, unknown>;
    ui_config_id?: string | null;
  }
): Promise<ApiResponse<BotDTO>> => {
  return apiRequest<BotDTO>(`/api/v1/bots/${botId}`, {
    method: 'PATCH',
    body: JSON.stringify(botData),
  });
};

export const deleteBot = async (botId: string): Promise<ApiResponse<{ success: boolean }>> => {
  return apiRequest<{ success: boolean }>(`/api/v1/bots/${botId}`, {
    method: 'DELETE',
  });
};

// Installation Snippet DTOs and API functions
export interface InstallationSnippetDTO {
  id: string;
  user_id: string;
  bot_id: string;
  allowed_domains: string[] | null;
  status: string;
  embed_code: string | null;
  script_url: string | null;
  is_active: boolean;
  usage_count: number;
  last_used_at: string | null;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
}

export interface InstallationSnippetCreate {
  bot_id: string;
  allowed_domains?: string[];
  status?: string;
}

export interface InstallationSnippetUpdate {
  allowed_domains?: string[];
  status?: string;
}

// Create a snippet for a bot
export const createSnippet = async (
  botId: string,
  snippetData: InstallationSnippetCreate
): Promise<ApiResponse<InstallationSnippetDTO>> => {
  return apiRequest<InstallationSnippetDTO>(`/api/v1/snippets/bots/${botId}/snippets`, {
    method: 'POST',
    body: JSON.stringify(snippetData),
  });
};

// Get all snippets for a bot
export const getSnippetsForBot = async (botId: string): Promise<ApiResponse<InstallationSnippetDTO[]>> => {
  return apiRequest<InstallationSnippetDTO[]>(`/api/v1/snippets/bots/${botId}/snippets`, {
    method: 'GET',
  });
};

// Get a specific snippet
export const getSnippet = async (snippetId: string): Promise<ApiResponse<InstallationSnippetDTO>> => {
  return apiRequest<InstallationSnippetDTO>(`/api/v1/snippets/${snippetId}`, {
    method: 'GET',
  });
};

// Update a snippet
export const updateSnippet = async (
  snippetId: string,
  updateData: InstallationSnippetUpdate
): Promise<ApiResponse<InstallationSnippetDTO>> => {
  return apiRequest<InstallationSnippetDTO>(`/api/v1/snippets/${snippetId}`, {
    method: 'PATCH',
    body: JSON.stringify(updateData),
  });
};

// Delete a snippet
export const deleteSnippet = async (snippetId: string): Promise<ApiResponse<{ success: boolean }>> => {
  return apiRequest<{ success: boolean }>(`/api/v1/snippets/${snippetId}`, {
    method: 'DELETE',
  });
};
