import { CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useCallback, useEffect, useState } from 'react';
import { mockGetSubscription, type SubscriptionDTO } from '@/lib/api';
import { pricingPlans, getPlanPrice, type BillingFrequency } from '@/constants/pricingPlans';
import { useLocation, useNavigate } from 'react-router-dom';

const Billing = () => {
  const [sub, setSub] = useState<SubscriptionDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<BillingFrequency>('monthly');
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
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold capitalize">{sub.plan} Plan</h2>
                <Badge variant={sub.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                  {sub.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {sub.renewsAt ? `Renews on ${new Date(sub.renewsAt).toLocaleDateString()}` : 'No renewal date'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-muted/30">
              <div className="text-sm text-muted-foreground mb-1">Messages</div>
              <div className="text-2xl font-bold mb-2">
                {sub.usage.messages.toLocaleString()} / {sub.usage.messagesLimit.toLocaleString()}
              </div>
              <Progress
                value={Math.min(100, (sub.usage.messages / sub.usage.messagesLimit) * 100)}
                className="h-2"
              />
            </div>

            <div className="p-4 rounded-xl bg-muted/30">
              <div className="text-sm text-muted-foreground mb-1">Storage</div>
              <div className="text-2xl font-bold mb-2">
                {sub.usage.storageMb} / {sub.usage.storageLimitMb} MB
              </div>
              <Progress
                value={Math.min(100, (sub.usage.storageMb / sub.usage.storageLimitMb) * 100)}
                className="h-2"
              />
            </div>

            <div className="p-4 rounded-xl bg-muted/30">
              <div className="text-sm text-muted-foreground mb-1">Chatbots</div>
              <div className="text-2xl font-bold mb-2">
                {sub.usage.bots} / {sub.usage.botsLimit === 999 ? '∞' : sub.usage.botsLimit}
              </div>
              <Progress
                value={Math.min(100, (sub.usage.bots / sub.usage.botsLimit) * 100)}
                className="h-2"
              />
            </div>
          </div>
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
