// [schema-demo:additive]
import { Agent, IngestionJob, InstallSnippet, KnowledgeSource, Subscription, Tenant, TenantAdmin } from './types';

export const mockTenants: Tenant[] = [
  { id: 't_acme', name: 'Acme Inc.', domain: 'acme.com', plan: 'pro', status: 'active', settings: { language: 'en' } },
  { id: 't_globex', name: 'Globex', domain: 'globex.com', plan: 'enterprise', status: 'trial', settings: { sso: true } },
  { id: 't_initech', name: 'Initech', domain: 'initech.io', plan: 'free', status: 'paused' },
];

export const mockTenantAdmins: TenantAdmin[] = [
  { id: 'u1', tenant_id: 't_acme', email: 'owner@acme.com', role: 'owner', verified: true, last_login: new Date().toISOString() },
  { id: 'u2', tenant_id: 't_acme', email: 'admin@acme.com', role: 'admin', verified: true },
  { id: 'u3', tenant_id: 't_globex', email: 'owner@globex.com', role: 'owner', verified: false },
  { id: 'u4', tenant_id: 't_initech', email: 'admin@initech.io', role: 'admin', verified: true },
];

export const mockAgents: Agent[] = [
  {
    id: 'a1', tenant_id: 't_acme', name: 'Acme Support', description: 'Customer support bot',
    branding: { logo_url: '/placeholder.svg', themeColor: '#3b82f6' },
    llm_config: { model: 'gpt-4o-mini', temperature: 0.2 },
    retrieval_config: { top_k: 8, chunk_size: 800 },
    guardrails: { blocked_phrases: ['refund now'], max_output_tokens: 512 },
    updated_at: new Date().toISOString(),
  },
  {
    id: 'a2', tenant_id: 't_globex', name: 'Globex Concierge',
    branding: { logo_url: '/placeholder.svg', themeColor: '#10b981' },
    llm_config: { model: 'gpt-4o', temperature: 0.5 },
    retrieval_config: { top_k: 5, chunk_size: 600 },
    guardrails: {},
    updated_at: new Date().toISOString(),
  },
];

export const mockKnowledgeSources: KnowledgeSource[] = [
  { id: 's1', tenant_id: 't_acme', agent_id: 'a1', name: 'FAQ.pdf', type: 'file', status: 'indexed', metadata: { size: 1024 * 320 }, updated_at: new Date().toISOString() },
  { id: 's2', tenant_id: 't_acme', agent_id: 'a1', name: 'Help Center', type: 'url', status: 'processing', metadata: { crawlDate: new Date().toISOString() }, updated_at: new Date().toISOString() },
  { id: 's3', tenant_id: 't_globex', name: 'Zendesk', type: 'integration', status: 'pending', metadata: {}, updated_at: new Date().toISOString() },
  { id: 's4', tenant_id: 't_globex', name: 'Legacy Docs', type: 'file', status: 'error', metadata: { size: 1024 * 120 }, updated_at: new Date().toISOString() },
];

export const mockIngestionJobs: IngestionJob[] = [
  { id: 'j1', tenant_id: 't_acme', source_id: 's2', status: 'running', progress: 45, logs: 'Fetching sitemap...\nDiscovered 12 pages.', created_at: new Date().toISOString() },
  { id: 'j2', tenant_id: 't_acme', source_id: 's1', status: 'completed', progress: 100, logs: 'Indexed 32 pages.', created_at: new Date().toISOString() },
  { id: 'j3', tenant_id: 't_globex', source_id: 's4', status: 'failed', progress: 10, logs: 'Parse error on page 3.', created_at: new Date().toISOString() },
];

export const mockInstallSnippets: InstallSnippet[] = [
  {
    id: 'i1', tenant_id: 't_acme', agent_id: 'a1',
    script_url: 'https://cdn.example/widget.js',
    embed_code: `<script src="https://cdn.example/widget.js" data-tenant="t_acme" data-agent="a1"></script>`,
  },
];

export const mockSubscriptions: Subscription[] = [
  { id: 'sub1', tenant_id: 't_acme', plan: 'pro', status: 'active', start_date: '2024-09-01', usage_metrics: { tokens: 125000, api_calls: 1832, storage: 540 } },
  { id: 'sub2', tenant_id: 't_globex', plan: 'enterprise', status: 'trialing', start_date: '2024-10-15', usage_metrics: { tokens: 98000, api_calls: 721, storage: 320 } },
  { id: 'sub3', tenant_id: 't_initech', plan: 'free', status: 'paused', start_date: '2024-01-10', usage_metrics: { tokens: 1200, api_calls: 32, storage: 20 } },
];

// [schema-demo:additive] Engagement counts used in tenant dashboard
export const mockEngagementByRange: Record<string, Record<string, number>> = {
  t_acme: { '24h': 120, '7d': 840, '30d': 3200, '3m': 8800, '6m': 15200 },
  t_globex: { '24h': 45, '7d': 300, '30d': 1200, '3m': 3400, '6m': 6100 },
  t_initech: { '24h': 6, '7d': 40, '30d': 160, '3m': 420, '6m': 800 },
};

// [schema-demo:additive] Product enquiries per tenant
export const mockProductEnquiries: Record<string, { product: string; count: number }[]> = {
  t_acme: [
    { product: 'Starter', count: 420 },
    { product: 'Pro', count: 980 },
    { product: 'Enterprise', count: 260 },
  ],
  t_globex: [
    { product: 'Core', count: 310 },
    { product: 'Plus', count: 510 },
    { product: 'Ultimate', count: 240 },
  ],
  t_initech: [
    { product: 'Basic', count: 60 },
    { product: 'Standard', count: 95 },
    { product: 'Premium', count: 35 },
  ],
};

// [schema-demo:additive] Most asked questions per tenant
export const mockMostAskedQuestions: Record<string, { question: string; count: number; topic?: string }[]> = {
  t_acme: [
    { question: 'How do I reset my password?', count: 124, topic: 'Account' },
    { question: 'What is included in Pro plan?', count: 88, topic: 'Pricing' },
    { question: 'How can I contact support?', count: 74, topic: 'Support' },
  ],
  t_globex: [
    { question: 'Do you have an API?', count: 61, topic: 'API' },
    { question: 'How to upgrade?', count: 44, topic: 'Billing' },
    { question: 'Is data encrypted?', count: 33, topic: 'Security' },
  ],
  t_initech: [
    { question: 'Free tier limits?', count: 18, topic: 'Pricing' },
    { question: 'Can I export data?', count: 12, topic: 'Data' },
  ],
};

// [schema-demo:additive] Lightweight recent chat messages (for demo UI only)
export type DemoChatMsg = { id: string; tenant_id: string; agent_id: string; role: 'user' | 'bot'; content: string; created_at: string };
export const mockChatHistory: DemoChatMsg[] = [
  { id: 'c1', tenant_id: 't_acme', agent_id: 'a1', role: 'user', content: 'Hi, what does Pro include?', created_at: new Date(Date.now()-1000*60*12).toISOString() },
  { id: 'c2', tenant_id: 't_acme', agent_id: 'a1', role: 'bot', content: 'Pro includes advanced analytics and higher limits.', created_at: new Date(Date.now()-1000*60*11).toISOString() },
  { id: 'c3', tenant_id: 't_acme', agent_id: 'a1', role: 'user', content: 'How to reset password?', created_at: new Date(Date.now()-1000*60*8).toISOString() },
  { id: 'c4', tenant_id: 't_globex', agent_id: 'a2', role: 'user', content: 'Is there an API?', created_at: new Date(Date.now()-1000*60*25).toISOString() },
  { id: 'c5', tenant_id: 't_globex', agent_id: 'a2', role: 'bot', content: 'Yes, visit /docs/api for details.', created_at: new Date(Date.now()-1000*60*24).toISOString() },
];


