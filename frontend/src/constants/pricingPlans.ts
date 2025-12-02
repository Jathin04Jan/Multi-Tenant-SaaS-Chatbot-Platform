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
    description: 'Best for tinkering with a single bot and a handful of docs.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    ctaLabel: 'Stay Free',
    features: [
      'Limited file uploads (a couple per week)',
      'Tiny vector memory (~10K embeddings)',
      '5-10 SMS-style message replies each week',
      'Community support & self-serve help center',
    ],
  },
  {
    id: 'pro',
    title: 'Pro',
    subtitle: '$20 / mo',
    description: 'Unlock branding control, richer analytics, and higher limits.',
    monthlyPrice: 20,
    yearlyPrice: 16,
    ctaLabel: 'Get Pro',
    features: [
      'Custom bot name + vanity share links',
      'Email notifications and digest summaries',
      'Analytics dashboard with engagement funnels',
      'Bulk uploads & more generous vector storage',
    ],
  },
  {
    id: 'business',
    title: 'Business',
    subtitle: '$60 / mo',
    description: 'Purpose-built for go-to-market teams running multiple bots.',
    monthlyPrice: 60,
    yearlyPrice: 48,
    ctaLabel: 'Get Business',
    badge: 'Recommended',
    recommended: true,
    features: [
      'Shared calendars + instant booking links',
      'Weekly & monthly executive reports',
      'Priority support and guided onboarding',
      'Multi-channel publishing & role-based access',
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    subtitle: 'Custom',
    description: 'White-glove rollouts, deep governance, and everything we ship.',
    monthlyPrice: 200,
    yearlyPrice: 160,
    ctaLabel: 'Talk to Sales',
    features: [
      'Calendars, CRM, analytics, and SSO integrations included',
      'Unlimited uploads, vectors, and message throughput',
      'Dedicated success manager & solution architects',
      'Security reviews, custom SLAs, and deployment playbooks',
    ],
  },
];

export const getPlanPrice = (plan: PricingPlan, billing: BillingFrequency) =>
  billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

export const getPlanById = (id: SubscriptionDTO['plan']) =>
  pricingPlans.find((plan) => plan.id === id) ?? pricingPlans[0];

export const formatPlanPrice = (price: number) => (price === 0 ? 'Free' : `$${price.toLocaleString()}`);

