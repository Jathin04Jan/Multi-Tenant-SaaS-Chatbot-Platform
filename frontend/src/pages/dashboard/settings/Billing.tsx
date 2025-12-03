import { CreditCard, Check, ShoppingCart, Activity, Plus, DatabaseZap, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useCallback, useEffect, useState } from 'react';
import { mockGetSubscription, type SubscriptionDTO } from '@/lib/api';
import { pricingPlans, getPlanPrice, type BillingFrequency } from '@/constants/pricingPlans';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const formatNumber = (value: number, options?: Intl.NumberFormatOptions) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 0, ...options });

const formatCompact = (value: number, decimals: number = 1): string => {
  if (value >= 1000000) {
    const mValue = value / 1000000;
    return `${mValue.toFixed(decimals)}M`;
  }
  if (value >= 1000) {
    const kValue = value / 1000;
    return `${kValue.toFixed(decimals)}K`;
  }
  return formatNumber(value);
};

const TOKENS_PER_MESSAGE = 420;

type BillingMetric = {
  label: string;
  value: string;
  hint: string;
  detail?: string;
};

const vectorLimits: Record<SubscriptionDTO['plan'], number> = {
  free: 50000,
  pro: 500000,
  business: 2000000,
  enterprise: 10000000,
};

const ensureDemoUsage = (value: number, limit: number, ratio = 0.35) => {
  if (!isFinite(limit) || limit === 0) return value;
  if (value <= 0) return Math.min(limit, limit * ratio);
  if (value >= limit) return Math.max(limit * (1 - ratio), limit - limit * 0.1);
  return value;
};

const getPlanAnalytics = (sub: SubscriptionDTO) => {
  const usage = sub.usage;
  const storageLimitGb = usage.storageLimitMb / 1024;
  const storageUsedGb = usage.storageMb / 1024;
  const storageUsedDemoGb = ensureDemoUsage(storageUsedGb, storageLimitGb, 0.25);
  const storageRemainingDemoGb = Math.max(0, storageLimitGb - storageUsedDemoGb);

  const totalTokens = usage.messagesLimit * TOKENS_PER_MESSAGE;
  const tokensUsedActual = Math.min(totalTokens, usage.messages * TOKENS_PER_MESSAGE);
  const tokensUsedDemo = ensureDemoUsage(tokensUsedActual, totalTokens, 0.45);
  const tokensRemainingDemo = Math.max(0, totalTokens - tokensUsedDemo);

  const botLimit = usage.botsLimit === 999 ? 50 : usage.botsLimit;
  const botsUsedDemo = ensureDemoUsage(usage.bots, botLimit, 0.2);
  const botsRemainingDemo =
    usage.botsLimit === 999 ? Infinity : Math.max(0, usage.botsLimit - botsUsedDemo);

  const vectorLimit = vectorLimits[sub.plan];
  const vectorUsage = Math.round(
    vectorLimit *
      (usage.storageLimitMb > 0 ? Math.min(1, usage.storageMb / usage.storageLimitMb) : 0.25)
  );

  const apiLimit = usage.messagesLimit * 3;
  const apiUsed = Math.min(apiLimit, usage.messages * 2);
  const apiRemaining = Math.max(0, apiLimit - apiUsed);

  const billingMetrics: BillingMetric[] = [
    {
      label: 'Tokens remaining this cycle',
      value: `${formatCompact(tokensRemainingDemo)} / ${formatCompact(totalTokens)}`,
      hint: `Estimated at ${TOKENS_PER_MESSAGE} tokens per message.`,
      detail: `Of ~${formatCompact(totalTokens)} tokens included in your ${sub.plan} plan.`,
    },
    {
      label: 'Upload capacity remaining',
      value: `${formatCompact(storageRemainingDemoGb, 2)} / ${formatCompact(storageLimitGb, 2)} GB`,
      hint: `${formatCompact(storageUsedDemoGb, 2)} GB currently in use.`,
      detail: `Document storage left from ${formatCompact(storageLimitGb, 2)} GB included.`,
    },
    {
      label: 'Bot slots available',
      value:
        botsRemainingDemo === Infinity
          ? `${formatCompact(botsUsedDemo)} / ∞`
          : usage.botsLimit === 999
            ? `${formatCompact(botsUsedDemo)} / ∞`
            : `${formatCompact(botsRemainingDemo)} / ${formatCompact(usage.botsLimit)}`,
      hint: `${formatCompact(botsUsedDemo)} active bots in this workspace.`,
      detail:
        usage.botsLimit === 999
          ? 'Bots are effectively unmetered on this plan.'
          : `Of ${formatCompact(usage.botsLimit)} total bots allowed on this plan.`,
    },
  ];

  const vectorBreakdown = {
    limit: vectorLimit,
    used: vectorUsage,
    remaining: Math.max(0, vectorLimit - vectorUsage),
    documents: Math.max(1, Math.round(vectorUsage / 2400)),
    words: vectorUsage * 5,
  };

  const apiBreakdown = {
    apiRemaining,
    apiLimit,
    apiUsed,
    avgPerDay: Math.max(1, Math.round(apiUsed / 30)),
    estDays: Math.max(1, Math.round(apiRemaining / Math.max(1, apiUsed / 30))),
  };

  return {
    billingMetrics,
    vectorBreakdown,
    apiBreakdown,
    storageLimitGb,
    storageUsedDemoGb,
    storageRemainingDemoGb,
    botsUsedDemo,
    botsRemainingDemo,
    tokensRemainingDemo,
    totalTokens,
  };
};

const buildSummaryCards = (
  analytics: ReturnType<typeof getPlanAnalytics> | null,
  sub: SubscriptionDTO | null,
) => {
  if (!analytics || !sub) return [];
  return [
    {
      label: 'Storage',
      value: `${formatCompact(analytics.storageUsedDemoGb, 2)} / ${formatCompact(analytics.storageLimitGb, 2)} GB`,
      hint: 'Document storage currently consumed.',
      detail: `${formatCompact(analytics.storageUsedDemoGb, 2)} GB in use`,
    },
    {
      label: 'Chatbots',
      value: `${
        analytics.botsRemainingDemo === Infinity
          ? `${formatCompact(analytics.botsUsedDemo)} / ∞`
          : `${formatCompact(analytics.botsUsedDemo)} / ${formatCompact(sub.usage.botsLimit)}`
      }`,
      hint: 'Bots live in this workspace.',
      detail: sub.usage.botsLimit === 999 ? 'Unlimited bots on this plan' : 'Upgrade to add more bots',
    },
  ];
};
const Billing = () => {
  const [sub, setSub] = useState<SubscriptionDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<BillingFrequency>('monthly');
  const [vectorDialogOpen, setVectorDialogOpen] = useState(false);
  const [apiDetailsOpen, setApiDetailsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fetchSubscription = useCallback(() => {
    setLoading(true);
    mockGetSubscription().then((r) => {
      setSub(r.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  useEffect(() => {
    const state = location.state as { planChangedAt?: number } | null;
    if (state?.planChangedAt) {
      fetchSubscription();
      navigate(location.pathname, { replace: true });
    }
  }, [fetchSubscription, location.pathname, location.state, navigate]);

  const handlePlanSelect = (planId: SubscriptionDTO['plan']) => {
    const params = new URLSearchParams({
      plan: planId,
      billing: billingCycle,
    });
    navigate(`/dashboard/settings/payment?${params.toString()}`);
  };

  const planAnalytics = sub
    ? (() => {
        const usage = sub.usage;
        const totalRequests = usage.messages;
        const storageLimitGb = usage.storageLimitMb / 1024;
        const storageUsedGb = usage.storageMb / 1024;
        const botsRemaining =
          usage.botsLimit === 999 ? Infinity : Math.max(0, usage.botsLimit - usage.bots);
        const sevenDayVolume = Math.min(totalRequests, 150);
        const avgRpm = Math.max(0, Math.round(totalRequests / 60));
        const medianRpm = Math.max(0, Math.floor(avgRpm * 0.8));
        const p90Rpm = Math.max(0, Math.round(avgRpm * 1.4));
        const p99Rpm = Math.max(0, Math.round(avgRpm * 1.8));
        const minRpm = avgRpm > 0 ? Math.max(0, avgRpm - 3) : 0;
        const maxRpm = Math.max(avgRpm * 2, 1);
        const uptime = '99.9%';

        const totalTokens = usage.messagesLimit * TOKENS_PER_MESSAGE;
        const vectorLimit = vectorLimits[sub.plan];
        const vectorUsage = Math.round(
          vectorLimit *
            (usage.storageLimitMb > 0 ? Math.min(1, usage.storageMb / usage.storageLimitMb) : 0.25)
        );

        const apiLimit = usage.messagesLimit * 3;
        const apiUsed = Math.min(apiLimit, usage.messages * 2);
        const apiRemaining = Math.max(0, apiLimit - apiUsed);

        const ensureDemoUsage = (value: number, limit: number, ratio = 0.35) => {
          if (!isFinite(limit) || limit === 0) return value;
          if (value <= 0) return Math.min(limit, limit * ratio);
          if (value >= limit) return Math.max(limit * (1 - ratio), limit - limit * 0.1);
          return value;
        };

        const storageUsedDemoGb = ensureDemoUsage(storageUsedGb, storageLimitGb, 0.25);
        const storageRemainingDemoGb = Math.max(0, storageLimitGb - storageUsedDemoGb);

        const totalTokens = usage.messagesLimit * TOKENS_PER_MESSAGE;
        const tokensUsedActual = Math.min(totalTokens, usage.messages * TOKENS_PER_MESSAGE);
        const tokensUsedDemo = ensureDemoUsage(tokensUsedActual, totalTokens, 0.45);
        const tokensRemainingDemo = Math.max(0, totalTokens - tokensUsedDemo);

        const botLimit = usage.botsLimit === 999 ? 50 : usage.botsLimit;
        const botsUsedDemo = ensureDemoUsage(usage.bots, botLimit, 0.2);
        const botsRemainingDemo =
          usage.botsLimit === 999 ? Infinity : Math.max(0, usage.botsLimit - botsUsedDemo);

        const billingMetrics: BillingMetric[] = [
          {
            label: 'Tokens remaining this cycle',
            value: `${formatCompact(tokensRemainingDemo)} / ${formatCompact(totalTokens)}`,
            hint: `Estimated at ${TOKENS_PER_MESSAGE} tokens per message.`,
            detail: `Of ~${formatCompact(totalTokens)} tokens included in your ${sub.plan} plan.`,
          },
          {
            label: 'Upload capacity remaining',
            value: `${formatCompact(storageRemainingDemoGb, 2)} / ${formatCompact(storageLimitGb, 2)} GB`,
            hint: `${formatCompact(storageUsedDemoGb, 2)} GB currently in use.`,
            detail: `Document storage left from ${formatCompact(storageLimitGb, 2)} GB included.`,
          },
          {
            label: 'Bot slots available',
            value:
              botsRemainingDemo === Infinity
                ? `${formatCompact(botsUsedDemo)} / ∞`
                : usage.botsLimit === 999
                  ? `${formatCompact(botsUsedDemo)} / ∞`
                  : `${formatCompact(botsRemainingDemo)} / ${formatCompact(usage.botsLimit)}`,
            hint: `${formatCompact(botsUsedDemo)} active bots in this workspace.`,
            detail:
              usage.botsLimit === 999
                ? 'Bots are effectively unmetered on this plan.'
                : `Of ${formatCompact(usage.botsLimit)} total bots allowed on this plan.`,
          },
        ];
        const vectorBreakdown = {
          limit: vectorLimit,
          used: vectorUsage,
          remaining: Math.max(0, vectorLimit - vectorUsage),
          documents: Math.max(1, Math.round(vectorUsage / 2400)),
          words: vectorUsage * 5,
        };

        const apiBreakdown = {
          apiRemaining,
          apiLimit,
          apiUsed,
          avgPerDay: Math.max(1, Math.round(apiUsed / 30)),
          estDays: Math.max(1, Math.round(apiRemaining / Math.max(1, apiUsed / 30))),
        };

        return {
          billingMetrics,
          vectorBreakdown,
          apiBreakdown,
          storageLimitGb,
          storageUsedDemoGb,
          storageRemainingDemoGb,
          botsUsedDemo,
          botsRemainingDemo,
          tokensRemainingDemo,
          totalTokens,
        };
      })()
    : null;

  const summaryCards = buildSummaryCards(planAnalytics, sub);

const buildSummaryCards = (
  analytics: ReturnType<typeof planAnalytics> | null,
  sub: SubscriptionDTO | null,
) => {
  if (!analytics || !sub) return [];
  return [
    {
      label: 'Storage',
      value: `${formatCompact(analytics.storageUsedDemoGb, 2)} / ${formatCompact(analytics.storageLimitGb, 2)} GB`,
      hint: 'Document storage currently consumed.',
      detail: `${formatCompact(analytics.storageUsedDemoGb, 2)} GB in use`,
    },
    {
      label: 'Chatbots',
      value: `${
        analytics.botsRemainingDemo === Infinity
          ? `${formatCompact(analytics.botsUsedDemo)} / ∞`
          : `${formatCompact(analytics.botsUsedDemo)} / ${formatCompact(sub.usage.botsLimit)}`
      }`,
      hint: 'Bots live in this workspace.',
      detail: sub.usage.botsLimit === 999 ? 'Unlimited bots on this plan' : 'Upgrade to add more bots',
    },
  ];
};

  return (
    <div className="container max-w-7xl px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold mb-2">Billing & Subscription</h1>
        <p className="text-muted-foreground">Manage your plan, usage, and payment methods</p>
      </motion.div>

      {/* Current Plan & Usage */}
      {!loading && sub && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold capitalize">{sub.plan} Plan</h2>
                <Badge variant={sub.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                  {sub.status}
                </Badge>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => navigate('/dashboard/settings/topup')}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <Plus className="w-3 h-3" />
                    Top Up
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => navigate('/dashboard/settings/usage')}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    Usage
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground">
                {sub.renewsAt ? `Renews on ${new Date(sub.renewsAt).toLocaleDateString()}` : 'No renewal date'}
              </p>
            </div>
          </div>

          {planAnalytics && (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {summaryCards.map((card) => (
                  <div key={card.label} className="p-4 rounded-2xl border border-border/60 bg-muted/20">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                      {card.label}
                    </p>
                    <p className="text-2xl font-bold">{card.value}</p>
                    {card.detail && <p className="text-xs text-muted-foreground mt-1">{card.detail}</p>}
                    <p className="text-xs text-muted-foreground mt-1">{card.hint}</p>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {planAnalytics.billingMetrics.map((item) => (
                  <div key={item.label} className="p-4 rounded-2xl border border-border/60 bg-muted/20">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold">{item.value}</p>
                    {item.detail && (
                      <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{item.hint}</p>
                  </div>
                ))}

                <div
                  className="p-4 rounded-2xl border border-border/60 bg-muted/20 cursor-pointer"
                  onClick={() => setVectorDialogOpen(true)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                        Vector memory
                      </p>
                      <p className="text-2xl font-bold">
                        {formatCompact(planAnalytics.vectorBreakdown.used)} /{' '}
                        {formatCompact(planAnalytics.vectorBreakdown.limit)}
                      </p>
                    </div>
                    <DatabaseZap className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tap to inspect embeddings utilisation.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-border/60 bg-muted/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                        API requests remaining
                      </p>
                      <p className="text-2xl font-bold">
                        {formatCompact(planAnalytics.apiBreakdown.apiRemaining)} /{' '}
                        {formatCompact(planAnalytics.apiBreakdown.apiLimit)}
                      </p>
                    </div>
                    <Wifi className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Monthly allocation for chat + retrieval APIs.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-0 text-primary mt-2"
                    onClick={() => setApiDetailsOpen((prev) => !prev)}
                  >
                    {apiDetailsOpen ? 'Hide breakdown' : 'View breakdown'}
                  </Button>
                  {apiDetailsOpen && (
                    <div className="text-xs text-muted-foreground space-y-1 mt-2">
                      <p>Requests used this cycle: {formatCompact(planAnalytics.apiBreakdown.apiUsed)}</p>
                      <p>Average per day: {formatCompact(planAnalytics.apiBreakdown.avgPerDay)}</p>
                      <p>Estimated days until renewal: {planAnalytics.apiBreakdown.estDays}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* Plan Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Individual Plans</p>
          <h2 className="text-4xl font-bold">Pricing</h2>
          <div className="inline-flex items-center gap-2 bg-secondary/70 border border-border rounded-full p-1">
            {(['monthly', 'yearly'] as BillingFrequency[]).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`relative px-6 py-2 text-sm font-semibold rounded-full transition ${
                  billingCycle === cycle ? 'bg-background text-foreground shadow' : 'text-muted-foreground'
                }`}
              >
                {cycle === 'monthly' ? 'Monthly' : 'Yearly'}
                {cycle === 'yearly' && (
                  <span className="ml-2 text-[11px] font-normal text-success">Save 20%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pricingPlans.map((plan, index) => {
            const isCurrent = plan.id === sub?.plan;
            const price = getPlanPrice(plan, billingCycle);
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className={`relative flex flex-col rounded-3xl border border-white/10 bg-card/60 p-6 text-left shadow-lg ${
                  plan.recommended ? 'ring-2 ring-primary/50' : ''
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {plan.badge}
                  </span>
                )}
                <div className="space-y-2 mb-4">
                  <h3 className="text-xl font-semibold">{plan.title}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="text-3xl font-bold">
                    {price === 0 ? 'Free' : `$${price}`}
                    {price !== 0 && <span className="text-base font-normal text-muted-foreground">/{billingCycle === 'monthly' ? 'mo' : 'mo (annual)'}</span>}
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full rounded-xl mt-6"
                  variant={isCurrent ? 'outline' : plan.recommended ? 'default' : 'secondary'}
                  disabled={isCurrent}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {isCurrent ? 'Current Plan' : plan.ctaLabel}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {planAnalytics && (
        <Dialog open={vectorDialogOpen} onOpenChange={setVectorDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Vector memory</DialogTitle>
              <DialogDescription>Detailed breakdown of your embeddings capacity.</DialogDescription>
            </DialogHeader>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Embeddings generated:</span>{' '}
                {formatCompact(planAnalytics.vectorBreakdown.used)}
              </p>
              <p>
                <span className="font-semibold">Remaining capacity:</span>{' '}
                {formatCompact(planAnalytics.vectorBreakdown.remaining)}
              </p>
              <p>
                <span className="font-semibold">Documents indexed:</span>{' '}
                {planAnalytics.vectorBreakdown.documents}
              </p>
              <p>
                <span className="font-semibold">Total text processed:</span>{' '}
                {formatCompact(planAnalytics.vectorBreakdown.words)} words
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Payment Method */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-card p-8"
      >
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="font-medium">No payment method</div>
            <div className="text-sm text-muted-foreground">
              {sub?.plan === 'free'
                ? 'Add a payment method to upgrade your plan'
                : 'Add a payment method to continue your subscription'}
            </div>
          </div>
          <Button variant="outline" className="rounded-xl glass">
            <CreditCard className="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Billing;
