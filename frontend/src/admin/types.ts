export type PlanKey = "free" | "pro" | "business" | "enterprise";
export type TenantStatus = "active" | "suspended" | "trial" | "past_due";

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: PlanKey;
  region: "us" | "eu" | "in" | "apac";
  bots: number;
  usageMessages: number;
  spendUsd: number;
  status: TenantStatus;
  lastActivity: string; // ISO
}

export interface Bot {
  id: string;
  tenantId: string;
  name: string;
  model: string;
  temperature: number;
  status: "active" | "disabled";
  lastDeploy: string; // ISO
  errors24h: number;
  successRate: number; // 0-100
}

export interface UsageRow {
  date: string;        // YYYY-MM-DD
  tenantId?: string;
  botId?: string;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
  latencyP50: number;
  latencyP90: number;
  latencyP99: number;
}

export interface Job {
  id: string;
  tenantId: string;
  source: "gdrive" | "web" | "s3" | "upload";
  status: "queued" | "running" | "failed" | "completed";
  startedAt: string;   // ISO
  finishedAt?: string; // ISO
  retries: number;
  error?: string;
}

export interface ModerationEvent {
  id: string;
  tenantId: string;
  botId: string;
  category: "toxicity" | "pii" | "self-harm" | "jailbreak";
  action: "blocked" | "flagged";
  messagePreview: string;
  createdAt: string;   // ISO
}

export interface AuditEvent {
  id: string;
  actor: string;
  role: "superadmin" | "admin" | "support" | "analyst" | "billing";
  scope: "global" | "tenant";
  tenantId?: string;
  action: string;
  ip: string;
  ts: string;          // ISO
  before?: any;
  after?: any;
}

// Back-compat admin type aliases (for existing admin pages)
export type AdminTenant = Tenant;
export type AdminBot = Bot;
export type AdminUsageMetric = UsageRow;
export type AdminJob = Job;
export type AdminModerationItem = ModerationEvent;
export type AdminAuditLog = AuditEvent;

export interface AdminPlan {
  id: PlanKey;
  name: string;
  priceMonthly: number;
  features: string[];
}

// Admin-only supplementary types for tenant detail pages
export interface AdminMember {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "editor" | "viewer";
}

export interface AdminInvoice {
  id: string;
  tenantId: string;
  date: string; // ISO
  amountUsd: number;
  status: "paid" | "open" | "void";
}

export interface AdminDataSource {
  id: string;
  tenantId: string;
  type: "gdrive" | "web" | "s3" | "upload";
  name: string;
  lastIndexedAt?: string; // ISO
  status: "healthy" | "warning" | "error";
}

export interface AdminWebhookEndpoint {
  id: string;
  tenantId: string;
  url: string;
  status: "active" | "disabled";
}

export interface AdminWebhookDelivery {
  id: string;
  tenantId: string;
  endpointId: string;
  event: string;
  ts: string; // ISO
  status: "ok" | "retry" | "failed";
}

