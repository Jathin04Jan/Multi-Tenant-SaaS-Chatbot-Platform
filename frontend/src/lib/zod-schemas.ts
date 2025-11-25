import { z } from 'zod';
import { type Agent, type Source, type Tenant } from './schema-types';

export const signUpSchema = z
  .object({
    email: z.string().trim().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Password must contain uppercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain a number' }),
    confirm_password: z.string().min(1, { message: 'Please confirm your password' }),
    full_name: z
      .string()
      .trim()
      .min(1, { message: 'Full name is required' })
      .max(255, { message: 'Full name must be less than 255 characters' }),
    company_name: z
      .string()
      .trim()
      .min(1, { message: 'Company/Organization name is required' })
      .max(255, { message: 'Company name must be less than 255 characters' }),
    domain: z
      .string()
      .trim()
      .max(255, { message: 'Domain must be less than 255 characters' })
      .optional(),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions to continue',
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const signInSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const brandingSchema = z.object({
  botName: z
    .string()
    .trim()
    .min(1, { message: 'Assistant name required' })
    .max(50, { message: 'Must be less than 50 characters' }),
  logo: z.string().min(1).optional().nullable(),
  logoZoom: z
    .number()
    .min(0.5, { message: 'Logo zoom too small' })
    .max(2, { message: 'Logo zoom too large' })
    .default(1),
  primaryColor: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, { message: 'Invalid hex color' }),
  welcomeMessage: z
    .string()
    .trim()
    .min(1, { message: 'Welcome message required' })
    .max(200, { message: 'Must be less than 200 characters' }),
});

export const personaSchema = z.object({
  botName: z
    .string()
    .trim()
    .min(1, { message: 'Bot name required' })
    .max(50, { message: 'Must be less than 50 characters' }),
});

export const crawlSchema = z.object({
  baseUrl: z.string().trim().url({ message: 'Invalid URL' }),
  includeSitemap: z.boolean(),
  maxDepth: z.number().min(1).max(5),
  frequency: z.enum(['once', 'daily', 'weekly']),
});

export const domainSchema = z.object({
  domain: z
    .string()
    .trim()
    .regex(
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/,
      { message: 'Invalid domain format' }
    ),
});

// Tenant schema (frontend form)
export const tenantSchema = z.object({
  name: z.string().trim().min(1, 'Tenant name required'),
  domain: z.string().trim().optional().or(z.literal('').transform(() => undefined)),
  plan: z.enum(['free', 'pro', 'business', 'enterprise']),
  status: z.enum(['active', 'suspended', 'pending']).default('active'),
});

// Agent schema (frontend form)
export const agentSchema = z.object({
  name: z.string().trim().min(1, 'Agent name required'),
  provider: z.enum(['openai', 'anthropic', 'azure_openai', 'other']).default('openai'),
  model: z.string().trim().min(1, 'Model is required'),
  temperature: z.number().min(0).max(1).default(0.5),
  systemPrompt: z.string().max(4000).optional(),
  routing: z.enum(['direct', 'retrieval', 'tools']).default('direct'),
});

// Source schema (frontend form)
export const sourceSchema = z.object({
  name: z.string().trim().min(1, 'Source name required'),
  type: z.enum(['upload', 'crawl', 'api', 's3', 'gdrive', 'notion', 'github']).default('upload'),
  config: z.record(z.any()).default({}),
});

// Guardrails schema (separate from persona)
export const guardrailSchema = z.object({
  maxResponseLength: z.number().min(100).max(2000).default(500),
  blockedPhrases: z.array(z.string()).default([]),
  enableFactChecking: z.boolean().default(true),
  enableSensitiveFilter: z.boolean().default(true),
  customInstructions: z.string().max(4000).optional().default(''),
  allowedDomains: z.array(z.string().url()).default([]),
  blockedRegex: z.array(z.string()).default([]),
  escalationRules: z.record(z.any()).default({}),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type BrandingInput = z.infer<typeof brandingSchema>;
export type PersonaInput = z.infer<typeof personaSchema>;
export type CrawlInput = z.infer<typeof crawlSchema>;
export type DomainInput = z.infer<typeof domainSchema>;
export type TenantInput = z.infer<typeof tenantSchema>;
export type AgentInput = z.infer<typeof agentSchema>;
export type SourceInput = z.infer<typeof sourceSchema>;
export type GuardrailInput = z.infer<typeof guardrailSchema>;
