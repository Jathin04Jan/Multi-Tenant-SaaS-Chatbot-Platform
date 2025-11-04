// [schema-demo:additive]
import { Agent, IngestionJob, InstallSnippet, KnowledgeSource, Subscription, Tenant, TenantAdmin, User } from './types';

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
  // Acme Inc chatbots
  {
    id: 'a1', tenant_id: 't_acme', name: 'Acme Support', description: 'Customer support bot',
    branding: { logo_url: '/placeholder.svg', themeColor: '#3b82f6' },
    llm_config: { model: 'gpt-4o-mini', temperature: 0.2 },
    retrieval_config: { top_k: 8, chunk_size: 800 },
    guardrails: { blocked_phrases: ['refund now'], max_output_tokens: 512 },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(), // 45 days ago
    updated_at: new Date().toISOString(),
  },
  {
    id: 'a2', tenant_id: 't_acme', name: 'Acme Sales Assistant', description: 'Sales and product inquiries bot',
    branding: { logo_url: '/placeholder.svg', themeColor: '#8b5cf6' },
    llm_config: { model: 'gpt-4o', temperature: 0.4 },
    retrieval_config: { top_k: 6, chunk_size: 700 },
    guardrails: {},
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 38).toISOString(), // 38 days ago
    updated_at: new Date().toISOString(),
  },
  {
    id: 'a3', tenant_id: 't_acme', name: 'Acme Technical Help', description: 'Technical support and troubleshooting',
    branding: { logo_url: '/placeholder.svg', themeColor: '#f59e0b' },
    llm_config: { model: 'gpt-4o-mini', temperature: 0.3 },
    retrieval_config: { top_k: 10, chunk_size: 900 },
    guardrails: { max_output_tokens: 600 },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(), // 25 days ago
    updated_at: new Date().toISOString(),
  },
  {
    id: 'a4', tenant_id: 't_acme', name: 'Acme Billing Bot', description: 'Billing and subscription inquiries',
    branding: { logo_url: '/placeholder.svg', themeColor: '#ef4444' },
    llm_config: { model: 'gpt-4o-mini', temperature: 0.2 },
    retrieval_config: { top_k: 5, chunk_size: 500 },
    guardrails: { blocked_phrases: ['cancel immediately'] },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(), // 20 days ago
    updated_at: new Date().toISOString(),
  },
  {
    id: 'a5', tenant_id: 't_acme', name: 'Acme Onboarding Helper', description: 'Help new users get started',
    branding: { logo_url: '/placeholder.svg', themeColor: '#06b6d4' },
    llm_config: { model: 'gpt-4o', temperature: 0.6 },
    retrieval_config: { top_k: 7, chunk_size: 650 },
    guardrails: {},
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
    updated_at: new Date().toISOString(),
  },
  {
    id: 'a6', tenant_id: 't_acme', name: 'Acme FAQ Bot', description: 'Answers frequently asked questions',
    branding: { logo_url: '/placeholder.svg', themeColor: '#10b981' },
    llm_config: { model: 'gpt-4o-mini', temperature: 0.25 },
    retrieval_config: { top_k: 8, chunk_size: 750 },
    guardrails: {},
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    updated_at: new Date().toISOString(),
  },
  // Globex chatbots
  {
    id: 'a7', tenant_id: 't_globex', name: 'Globex Concierge',
    branding: { logo_url: '/placeholder.svg', themeColor: '#10b981' },
    llm_config: { model: 'gpt-4o', temperature: 0.5 },
    retrieval_config: { top_k: 5, chunk_size: 600 },
    guardrails: {},
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
    updated_at: new Date().toISOString(),
  },
  {
    id: 'a8', tenant_id: 't_globex', name: 'Globex Sales Expert', description: 'Product sales and recommendations',
    branding: { logo_url: '/placeholder.svg', themeColor: '#3b82f6' },
    llm_config: { model: 'gpt-4o', temperature: 0.45 },
    retrieval_config: { top_k: 6, chunk_size: 650 },
    guardrails: {},
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 22).toISOString(), // 22 days ago
    updated_at: new Date().toISOString(),
  },
  {
    id: 'a9', tenant_id: 't_globex', name: 'Globex Support Agent', description: 'Customer service and support',
    branding: { logo_url: '/placeholder.svg', themeColor: '#f59e0b' },
    llm_config: { model: 'gpt-4o-mini', temperature: 0.3 },
    retrieval_config: { top_k: 8, chunk_size: 700 },
    guardrails: { max_output_tokens: 500 },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(), // 18 days ago
    updated_at: new Date().toISOString(),
  },
  {
    id: 'a10', tenant_id: 't_globex', name: 'Globex Account Manager', description: 'Account management and billing',
    branding: { logo_url: '/placeholder.svg', themeColor: '#8b5cf6' },
    llm_config: { model: 'gpt-4o-mini', temperature: 0.2 },
    retrieval_config: { top_k: 5, chunk_size: 550 },
    guardrails: {},
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(), // 12 days ago
    updated_at: new Date().toISOString(),
  },
  {
    id: 'a11', tenant_id: 't_globex', name: 'Globex Product Guide', description: 'Product information and features',
    branding: { logo_url: '/placeholder.svg', themeColor: '#06b6d4' },
    llm_config: { model: 'gpt-4o', temperature: 0.5 },
    retrieval_config: { top_k: 7, chunk_size: 680 },
    guardrails: {},
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(), // 8 days ago
    updated_at: new Date().toISOString(),
  },
  {
    id: 'a12', tenant_id: 't_globex', name: 'Globex Help Center', description: 'General help and guidance',
    branding: { logo_url: '/placeholder.svg', themeColor: '#ef4444' },
    llm_config: { model: 'gpt-4o-mini', temperature: 0.35 },
    retrieval_config: { top_k: 9, chunk_size: 800 },
    guardrails: {},
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
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
  { id: 'sub3', tenant_id: 't_initech', plan: 'free', status: 'canceled', start_date: '2024-01-10', usage_metrics: { tokens: 1200, api_calls: 32, storage: 20 } },
];

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

// [schema-demo:additive] Mock users with unique IDs, chat start times, and chat histories
const generateRandomUserId = (index: number): string => {
  const prefix = 'USR';
  const random = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
  return `${prefix}${random}${index}`;
};

const generateRandomTimestamp = (daysAgo: number, hoursAgo: number = 0): string => {
  const msAgo = (daysAgo * 24 * 60 * 60 * 1000) + (hoursAgo * 60 * 60 * 1000);
  return new Date(Date.now() - msAgo).toISOString();
};

const generateChatHistory = (userId: string, agentId: string, firstChatAt: string, numMessages: number = 4): User['chat_history'] => {
  const messages: User['chat_history'] = [];
  let currentTime = new Date(firstChatAt).getTime();
  
  const sampleUserMessages = [
    'Hello, I need help with my account',
    'How do I upgrade my plan?',
    'What are your business hours?',
    'Can you help me with billing?',
    'I want to cancel my subscription',
    'How do I reset my password?',
    'What features are included in Pro?',
    'Is there a free trial?',
  ];
  
  const sampleBotMessages = [
    'Hello! I\'d be happy to help you with your account. What specific issue are you experiencing?',
    'To upgrade your plan, you can visit the billing section in your dashboard or contact our sales team.',
    'Our support team is available Monday through Friday, 9 AM to 6 PM EST.',
    'I can help you with billing questions. What would you like to know?',
    'I understand you\'re considering canceling. Let me help you explore options that might work better for you.',
    'You can reset your password by clicking the "Forgot Password" link on the login page.',
    'The Pro plan includes advanced analytics, priority support, and higher usage limits.',
    'Yes! We offer a 14-day free trial with full access to all features.',
  ];
  
  for (let i = 0; i < numMessages; i++) {
    const isUser = i % 2 === 0;
    const messageIndex = Math.floor(Math.random() * (isUser ? sampleUserMessages.length : sampleBotMessages.length));
    
    messages.push({
      id: `msg_${userId}_${i}`,
      user_id: userId,
      agent_id: agentId,
      role: isUser ? 'user' : 'bot',
      content: isUser ? sampleUserMessages[messageIndex] : sampleBotMessages[messageIndex],
      created_at: new Date(currentTime).toISOString(),
    });
    
    // Add 1-5 minutes between messages
    currentTime += (1 + Math.random() * 4) * 60 * 1000;
  }
  
  return messages;
};

export const mockUsers: User[] = [
  // Acme Inc users
  (() => {
    const userId1 = generateRandomUserId(1);
    const firstChat1 = generateRandomTimestamp(5, 2);
    return {
      id: userId1,
      tenant_id: 't_acme',
      agent_id: 'a1',
      first_chat_at: firstChat1,
      chat_history: generateChatHistory(userId1, 'a1', firstChat1, 6),
    };
  })(),
  (() => {
    const userId2 = generateRandomUserId(2);
    const firstChat2 = generateRandomTimestamp(3, 8);
    return {
      id: userId2,
      tenant_id: 't_acme',
      agent_id: 'a1',
      first_chat_at: firstChat2,
      chat_history: generateChatHistory(userId2, 'a1', firstChat2, 4),
    };
  })(),
  (() => {
    const userId3 = generateRandomUserId(3);
    const firstChat3 = generateRandomTimestamp(1, 12);
    return {
      id: userId3,
      tenant_id: 't_acme',
      agent_id: 'a1',
      first_chat_at: firstChat3,
      chat_history: generateChatHistory(userId3, 'a1', firstChat3, 8),
    };
  })(),
  (() => {
    const userId4 = generateRandomUserId(4);
    const firstChat4 = generateRandomTimestamp(0, 6);
    return {
      id: userId4,
      tenant_id: 't_acme',
      agent_id: 'a1',
      first_chat_at: firstChat4,
      chat_history: generateChatHistory(userId4, 'a1', firstChat4, 5),
    };
  })(),
  (() => {
    const userId5 = generateRandomUserId(5);
    const firstChat5 = generateRandomTimestamp(0, 2);
    return {
      id: userId5,
      tenant_id: 't_acme',
      agent_id: 'a1',
      first_chat_at: firstChat5,
      chat_history: generateChatHistory(userId5, 'a1', firstChat5, 3),
    };
  })(),
  // Globex users
  (() => {
    const userId6 = generateRandomUserId(6);
    const firstChat6 = generateRandomTimestamp(7, 4);
    return {
      id: userId6,
      tenant_id: 't_globex',
      agent_id: 'a2',
      first_chat_at: firstChat6,
      chat_history: generateChatHistory(userId6, 'a2', firstChat6, 7),
    };
  })(),
  (() => {
    const userId7 = generateRandomUserId(7);
    const firstChat7 = generateRandomTimestamp(4, 10);
    return {
      id: userId7,
      tenant_id: 't_globex',
      agent_id: 'a2',
      first_chat_at: firstChat7,
      chat_history: generateChatHistory(userId7, 'a2', firstChat7, 6),
    };
  })(),
  (() => {
    const userId8 = generateRandomUserId(8);
    const firstChat8 = generateRandomTimestamp(2, 5);
    return {
      id: userId8,
      tenant_id: 't_globex',
      agent_id: 'a2',
      first_chat_at: firstChat8,
      chat_history: generateChatHistory(userId8, 'a2', firstChat8, 4),
    };
  })(),
];


