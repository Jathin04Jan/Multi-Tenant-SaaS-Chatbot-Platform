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
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('access_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        data: data as T,
        error: data.detail || data.message || 'An error occurred',
      };
    }
    
    return { data: data as T };
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

// Jobs
export const mockListJobs = async (): Promise<ApiResponse<JobDTO[]>> => {
  await new Promise((r) => setTimeout(r, 300));
  return { data: [{ id: 'job_1', type: 'ingest', status: 'completed', startedAt: new Date(Date.now() - 3600e3).toISOString(), finishedAt: new Date().toISOString() }] };
};

// Billing
export const mockGetSubscription = async (): Promise<ApiResponse<SubscriptionDTO>> => {
  await new Promise((r) => setTimeout(r, 250));
  return { data: { plan: 'free', status: 'trialing', renewsAt: null, usage: { messages: 47, messagesLimit: 100, storageMb: 12, storageLimitMb: 50, bots: 1, botsLimit: 1 } } };
};

export const mockUpdatePlan = async (plan: SubscriptionDTO['plan']): Promise<ApiResponse<SubscriptionDTO>> => {
  await new Promise((r) => setTimeout(r, 400));
  const limits: Record<SubscriptionDTO['plan'], { messagesLimit: number; storageLimitMb: number; botsLimit: number }> = {
    free: { messagesLimit: 100, storageLimitMb: 50, botsLimit: 1 },
    pro: { messagesLimit: 10000, storageLimitMb: 1024, botsLimit: 10 },
    business: { messagesLimit: 100000, storageLimitMb: 10240, botsLimit: 999 },
    enterprise: { messagesLimit: 999999, storageLimitMb: 999999, botsLimit: 999 },
  };
  const l = limits[plan];
  return {
    data: {
      plan,
      status: plan === 'free' ? 'trialing' : 'active',
      renewsAt: plan === 'free' ? null : new Date(Date.now() + 30 * 24 * 3600e3).toISOString(),
      usage: { messages: 0, messagesLimit: l.messagesLimit, storageMb: 0, storageLimitMb: l.storageLimitMb, bots: 1, botsLimit: l.botsLimit },
    },
  };
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
