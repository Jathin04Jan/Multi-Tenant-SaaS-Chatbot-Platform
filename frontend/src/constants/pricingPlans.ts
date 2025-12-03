import type { SubscriptionDTO } from '@/lib/api';

export type BillingFrequency = 'monthly' | 'yearly';

export interface PricingPlan {
  id: SubscriptionDTO['plan'];
  title: string;
  subtitle: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  ctaLabel: string;
  badge?: string;
  recommended?: boolean;
  features: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    title: 'Free',
    subtitle: 'Sandbox',
    description: 'For individuals trying out the platform with small workloads.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    ctaLabel: 'Stay Free',
    features: [
      'File Handling: Uploads allowed, but with low weekly limits and smaller file sizes.',
      'Memory Capacity: Stores a small number of embeddings (suitable for a few documents).',
      'Access: Basic features only; no automation or team tools.',
    ],
  },
  {
    id: 'pro',
    title: 'Pro',
    subtitle: '$20 / mo',
    description: 'For creators who need customization and higher limits.',
    monthlyPrice: 20,
    yearlyPrice: 16,
    ctaLabel: 'Get Pro',
    features: [
      'Bot Identity: Set a custom bot name and generate branded share links.',
      'File Handling: Higher upload capacity and larger files supported.',
      'Vector Storage: Expanded memory for storing more documents and embeddings.',
      'Analytics: Access to usage graphs, interaction patterns, message counts, etc.',
      'Notifications: Email alerts for activity spikes and weekly summaries.',
    ],
  },
  {
    id: 'business',
    title: 'Business',
    subtitle: '$60 / mo',
    description: 'For teams running multiple bots with structured workflows.',
    monthlyPrice: 60,
    yearlyPrice: 48,
    ctaLabel: 'Get Business',
    badge: 'Recommended',
    recommended: true,
    features: [
      'Team Productivity: Shared calendars, booking links, and coordinated scheduling.',
      'Automated Reporting: Weekly & monthly performance reports sent to your inbox.',
      'Access Control: Role-based permissions for team members.',
      'Publishing Options: Deploy bots across multiple internal or customer-facing channels.',
      'Support: Priority assistance plus guided onboarding sessions.',
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    subtitle: 'Custom',
    description: 'For organizations that require scale, governance, and deep integration.',
    monthlyPrice: 200,
    yearlyPrice: 160,
    ctaLabel: 'Talk to Sales',
    features: [
      'Integrations: Connect with CRMs, calendars, analytics tools, identity providers (SSO).',
      'Usage Limits: Practically unlimited uploads, vectors, and message throughput.',
      'Dedicated Support: Assigned success manager + solution architect.',
      'Security & Compliance: Custom SLAs, audit support, policy controls, and deployment guides.',
      'Customisation: Tailored workflows, advanced governance, and infrastructure options.',
    ],
  },
];

export const getPlanPrice = (plan: PricingPlan, billing: BillingFrequency) =>
  billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

export const getPlanById = (id: SubscriptionDTO['plan']) =>
  pricingPlans.find((plan) => plan.id === id) ?? pricingPlans[0];

export const formatPlanPrice = (price: number) => (price === 0 ? 'Free' : `$${price.toLocaleString()}`);

