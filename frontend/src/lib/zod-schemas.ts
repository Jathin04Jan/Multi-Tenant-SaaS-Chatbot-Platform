import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain a number' }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export const signInSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const brandingSchema = z.object({
  logo: z.string().optional(),
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
  tone: z.number().min(0).max(1),
  style: z.enum(['professional', 'friendly', 'casual']),
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

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type BrandingInput = z.infer<typeof brandingSchema>;
export type PersonaInput = z.infer<typeof personaSchema>;
export type CrawlInput = z.infer<typeof crawlSchema>;
export type DomainInput = z.infer<typeof domainSchema>;
