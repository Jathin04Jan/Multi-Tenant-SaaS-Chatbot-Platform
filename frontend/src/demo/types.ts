// [schema-demo:additive]
export type Plan = 'free' | 'pro' | 'enterprise';
export type TenantStatus = 'active' | 'paused' | 'trial' | 'canceled';
export type AdminRole = 'owner' | 'admin';
export type SourceType = 'file' | 'url' | 'integration';
export type SourceStatus = 'pending' | 'processing' | 'indexed' | 'error';
export type JobStatus = 'queued' | 'running' | 'completed' | 'failed';

export interface Tenant {
  id: string;
  name: string;
  domain?: string;
  plan: Plan;
  status: TenantStatus;
  settings?: Record<string, unknown>;
}

export interface TenantAdmin {
  id: string;
  tenant_id: string;
  email: string;
  role: AdminRole;
  verified: boolean;
  last_login?: string;
}

export interface AgentBranding {
  logo_url?: string;
  themeColor: string;
}

export interface AgentConfig {
  model: string;
  temperature: number;
}

export interface RetrievalConfig {
  top_k: number;
  chunk_size: number;
}

export interface GuardrailsConfig {
  blocked_phrases?: string[];
  max_output_tokens?: number;
}

export interface Agent {
  id: string;
  tenant_id: string;
  name: string;
  description?: string;
  branding: AgentBranding;
  llm_config: AgentConfig;
  retrieval_config: RetrievalConfig;
  guardrails: GuardrailsConfig;
  updated_at: string;
}

export interface KnowledgeSourceMeta {
  size?: number; // bytes
  crawlDate?: string;
}

export interface KnowledgeSource {
  id: string;
  tenant_id: string;
  agent_id?: string;
  name: string;
  type: SourceType;
  status: SourceStatus;
  metadata: KnowledgeSourceMeta;
  updated_at: string;
}

export interface IngestionJob {
  id: string;
  tenant_id: string;
  source_id: string;
  status: JobStatus;
  progress: number; // 0-100
  logs: string;
  created_at: string;
}

export interface InstallSnippet {
  id: string;
  tenant_id: string;
  agent_id?: string;
  script_url: string;
  embed_code: string;
  expires_at?: string;
}

export interface UsageMetrics {
  tokens: number;
  api_calls: number;
  storage: number; // MB
}

export interface Subscription {
  id: string;
  tenant_id: string;
  plan: Plan;
  status: 'active' | 'past_due' | 'canceled' | 'trialing';
  start_date: string;
  end_date?: string;
  usage_metrics: UsageMetrics;
  billing_id?: string;
}


