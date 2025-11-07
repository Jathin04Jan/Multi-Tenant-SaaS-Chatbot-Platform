const sleep = (ms = 300) => new Promise((r) => setTimeout(r, ms));

import tenantsData from "./tenants.json";
import bots from "./bots.json";
import usage from "./usage.json";
import jobs from "./jobs.json";
import moderation from "./moderation.json";
import audit from "./audit.json";
import members from "./members.json";
import invoices from "./invoices.json";
import datasources from "./datasources.json";
import webhooks from "./webhooks.json";
import webhookDeliveries from "./webhook_deliveries.json";
import jobLogs from "./job_logs.json";

// Create a local mutable copy for in-memory updates
const tenants = [...(tenantsData as any[])];

export const mock = {
  async listTenants() { await sleep(); return tenants; },
  async getTenant(id: string) { await sleep(); return tenants.find((t: any) => t.id === id) ?? null; },
  async listBots(tenantId?: string) { await sleep(); const arr = bots as any[]; return tenantId ? arr.filter((b) => b.tenantId === tenantId) : arr; },
  async listUsage() { await sleep(); return usage; },
  async listJobs() { await sleep(); return jobs; },
  async listModeration() { await sleep(); return moderation; },
  async listAudit() { await sleep(); return audit; },
  async listMembers(tenantId: string) { await sleep(); return (members as any[]).filter((m) => m.tenantId === tenantId); },
  async listInvoices(tenantId: string) { await sleep(); return (invoices as any[]).filter((i) => i.tenantId === tenantId); },
  async listDataSources(tenantId: string) { await sleep(); return (datasources as any[]).filter((d) => d.tenantId === tenantId); },
  async listWebhooks(tenantId: string) { await sleep(); return (webhooks as any[]).filter((w) => w.tenantId === tenantId); },
  async listWebhookDeliveries(tenantId: string) { await sleep(); return (webhookDeliveries as any[]).filter((d) => d.tenantId === tenantId); },
  async listJobLogs(jobId: string) { await sleep(); return (jobLogs as Record<string, string[]>)[jobId] ?? []; },
};

// Back-compat named functions used by existing admin pages
export async function getTenants() { return mock.listTenants(); }
export async function getTenantById(id: string) { return mock.getTenant(id); }
export async function getBotsByTenant(tenantId: string) { return mock.listBots(tenantId); }
export async function getUsage() { return mock.listUsage(); }
export async function getJobs() { return mock.listJobs(); }
export async function getModeration() { return mock.listModeration(); }
export async function getAudit() { return mock.listAudit(); }

// Optional demo plans to keep existing Plans page compiling
export function getPlans() {
  return [
    { id: "free", name: "Free", priceMonthly: 0, features: ["1 chatbot", "1k msgs/mo", "Community support"] },
    { id: "pro", name: "Pro", priceMonthly: 29, features: ["3 chatbots", "20k msgs/mo", "Email support"] },
    { id: "business", name: "Business", priceMonthly: 99, features: ["10 chatbots", "100k msgs/mo", "SLA & SSO"] },
    { id: "enterprise", name: "Enterprise", priceMonthly: 299, features: ["Unlimited", "Custom limits", "Dedicated support"] },
  ];
}

// UI-only current admin mock
export const currentAdmin = {
  email: "super@admin.com",
  role: "superadmin",
};

// Plan catalog for UI (no API calls)
export const planCatalog = [
  { id: "free", label: "Free", price: 0 },
  { id: "pro", label: "Pro", price: 49 },
  { id: "business", label: "Business", price: 199 },
  { id: "enterprise", label: "Enterprise", price: 499 },
];

export function getPlanById(id: string) {
  return planCatalog.find((p) => p.id === id) ?? planCatalog[0];
}

// In-memory update helper
export async function updateTenantPlan(tenantId: string, plan: string) {
  const t = tenants.find((x: any) => x.id === tenantId);
  if (t) {
    t.plan = plan;
  }
  return t ?? null;
}


