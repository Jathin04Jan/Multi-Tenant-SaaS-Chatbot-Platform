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
    title: 'Hobby',
    subtitle: 'Free',
    description: 'Perfect for exploring the studio with limited usage.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    ctaLabel: 'Download',
    features: ['One-week Pro trial', 'Limited Agent requests', 'Limited Tab completions'],
  },
  {
    id: 'pro',
    title: 'Pro',
    subtitle: '$20 / mo',
    description: 'Everything in Hobby, plus extended capacity for growing teams.',
    monthlyPrice: 20,
    yearlyPrice: 16,
    ctaLabel: 'Get Pro',
    features: ['Extended limits on Agent', 'Unlimited tab completions', 'Background Agents', 'Max context windows'],
  },
  {
    id: 'business',
    title: 'Pro+',
    subtitle: '$60 / mo',
    description: 'Scale confidently with premium usage across models.',
    monthlyPrice: 60,
    yearlyPrice: 48,
    ctaLabel: 'Get Pro+',
    badge: 'Recommended',
    recommended: true,
    features: ['3x usage on OpenAI, Claude, Gemini', 'Priority inference queue', 'Advanced analytics'],
  },
  {
    id: 'enterprise',
    title: 'Ultra',
    subtitle: '$200 / mo',
    description: 'Best for enterprises that demand ultra-high usage and service.',
    monthlyPrice: 200,
    yearlyPrice: 160,
    ctaLabel: 'Get Ultra',
    features: ['20x usage on all premium models', 'Priority access to new features', 'Dedicated success manager'],
  },
];

export const getPlanPrice = (plan: PricingPlan, billing: BillingFrequency) =>
  billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

export const getPlanById = (id: SubscriptionDTO['plan']) =>
  pricingPlans.find((plan) => plan.id === id) ?? pricingPlans[0];

export const formatPlanPrice = (price: number) => (price === 0 ? 'Free' : `$${price.toLocaleString()}`);

