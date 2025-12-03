import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { mockGetSubscription, type SubscriptionDTO } from '@/lib/api';
import { pricingPlans, getPlanPrice } from '@/constants/pricingPlans';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Database, Bot } from 'lucide-react';

type TopUpType = 'tokens' | 'storage' | 'vectors';

const topUpConfigs: Record<
  TopUpType,
  {
    title: string;
    description: string;
    unit: string;
    tiers: { label: string; amount: number; bonus: string }[];
    icon: any;
  }
> = {
  tokens: {
    title: 'Token Boost',
    description: 'Extend your throughput for bursty launches and campaigns.',
    unit: 'tokens',
    tiers: [
      { label: 'Mini Pack', amount: 25000, bonus: '+5% bonus' },
      { label: 'Launch Pack', amount: 75000, bonus: '+10% bonus' },
      { label: 'Scale Pack', amount: 150000, bonus: '+15% bonus' },
    ],
    icon: CreditCard,
  },
  storage: {
    title: 'Storage Boost',
    description: 'Add temporary ingestion space for bulk document drops.',
    unit: 'GB',
    tiers: [
      { label: 'Quick Drop', amount: 25, bonus: '3 days retention' },
      { label: 'Docs Sprint', amount: 75, bonus: '7 days retention' },
      { label: 'Knowledge Drive', amount: 150, bonus: '14 days retention' },
    ],
    icon: Database,
  },
  vectors: {
    title: 'Vector Boost',
    description: 'Increase embedding allowance for heavy fine-tuning.',
    unit: 'embeddings',
    tiers: [
      { label: 'Sampler', amount: 100000, bonus: 'Ideal for pilots' },
      { label: 'Research', amount: 400000, bonus: 'Priority encoding' },
      { label: 'Enterprise', amount: 1000000, bonus: 'Dedicated shard' },
    ],
    icon: Bot,
  },
};

const TopUp = () => {
  const [sub, setSub] = useState<SubscriptionDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<TopUpType>('tokens');
  const [selectedTier, setSelectedTier] = useState(0);

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

  const planInfo = useMemo(() => {
    if (!sub) return null;
    const plan = pricingPlans.find((p) => p.id === sub.plan);
    if (!plan) return null;
    return {
      ...plan,
      monthlyPrice: getPlanPrice(plan, 'monthly'),
    };
  }, [sub]);

  const pendingCost = useMemo(() => {
    if (!planInfo) return 0;
    const base = planInfo.monthlyPrice || 0;
    if (base === 0) return 9;
    const cost = Math.max(5, Math.round(base * 0.2));
    return Math.min(cost, Math.max(5, base - 5));
  }, [planInfo]);

  const config = topUpConfigs[selectedType];
  const tier = config.tiers[selectedTier];

  return (
    <div className="container max-w-6xl px-4 py-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold">Top Up Resources</h1>
          <p className="text-muted-foreground">
            Temporarily increase limits without changing your subscription tier.
          </p>
        </div>
        {planInfo && (
          <Badge variant="secondary" className="text-sm px-3 py-1">
            Current plan: {planInfo.title}
          </Badge>
        )}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          {Object.keys(topUpConfigs).map((key) => {
            const option = topUpConfigs[key as TopUpType];
            const Icon = option.icon;
            const active = key === selectedType;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedType(key as TopUpType);
                  setSelectedTier(0);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition ${
                  active ? 'border-primary bg-primary/10' : 'border-border/60 bg-muted/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{option.title}</p>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </button>
            );
          })}

          {planInfo && (
            <div className="p-4 rounded-2xl border border-border/60 bg-muted/30 space-y-2">
              <p className="text-sm font-semibold">Pending charge</p>
              <p className="text-3xl font-bold">${pendingCost}</p>
              <p className="text-xs text-muted-foreground">
                Less than your monthly {planInfo.title} plan (${planInfo.monthlyPrice || 0}).
              </p>
              <Progress value={Math.min(100, (pendingCost / Math.max(1, planInfo.monthlyPrice || pendingCost)) * 100)} />
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-semibold">{config.title}</h2>
                <p className="text-sm text-muted-foreground">{config.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {config.tiers.map((tierOption, idx) => (
                  <Button
                    key={tierOption.label}
                    variant={idx === selectedTier ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTier(idx)}
                  >
                    {tierOption.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 p-4 bg-muted/20 space-y-3">
              <p className="text-2xl font-bold">
                {tier.amount.toLocaleString()} {config.unit}
              </p>
              <p className="text-sm text-muted-foreground">{tier.bonus}</p>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">Distribution</span>
                <Progress value={60 + selectedTier * 10} className="flex-1" />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <h3 className="text-lg font-semibold">Checkout summary</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending cost</p>
                <p className="text-3xl font-bold">${pendingCost}</p>
              </div>
              <Button size="lg" className="rounded-xl">
                Confirm Top Up
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Top ups prorate with your billing cycle and expire at the next renewal or after 30 days,
              whichever comes first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUp;

