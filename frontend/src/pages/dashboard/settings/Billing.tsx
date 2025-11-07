import { CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { mockGetSubscription, mockUpdatePlan, type SubscriptionDTO } from '@/lib/api';
import { toast } from 'sonner';

const plans = [
  {
    id: 'free' as const,
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['100 messages/month', '50 MB storage', '1 chatbot', 'Basic support'],
    limits: { messages: 100, storage: 50, bots: 1 },
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    price: '$29',
    period: 'per month',
    features: ['10,000 messages/month', '1 GB storage', '10 chatbots', 'Priority support', 'API access'],
    limits: { messages: 10000, storage: 1024, bots: 10 },
  },
  {
    id: 'business' as const,
    name: 'Business',
    price: '$99',
    period: 'per month',
    features: ['100,000 messages/month', '10 GB storage', 'Unlimited chatbots', '24/7 support', 'Advanced analytics', 'Custom integrations'],
    limits: { messages: 100000, storage: 10240, bots: 999 },
  },
  {
    id: 'enterprise' as const,
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Unlimited messages', 'Unlimited storage', 'Unlimited chatbots', 'Dedicated support', 'SLA guarantee', 'Custom contracts'],
    limits: { messages: 999999, storage: 999999, bots: 999 },
  },
];

const Billing = () => {
  const [sub, setSub] = useState<SubscriptionDTO | null>(null);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockGetSubscription().then((r) => {
      setSub(r.data);
      setLoading(false);
    });
  }, []);

  const changePlan = async (plan: SubscriptionDTO['plan']) => {
    if (plan === sub?.plan) return;
    setUpdating(true);
    try {
      const res = await mockUpdatePlan(plan);
      setSub(res.data);
      toast.success(`Plan changed to ${plan}`);
    } catch (error) {
      toast.error('Failed to change plan');
    } finally {
      setUpdating(false);
    }
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
      >
        <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, index) => {
            const isCurrent = plan.id === sub?.plan;
            const isUpgrade = plans.findIndex((p) => p.id === sub?.plan) < index;
            const isDowngrade = plans.findIndex((p) => p.id === sub?.plan) > index;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className={`glass-card p-6 relative flex flex-col ${isCurrent ? 'ring-2 ring-primary' : ''}`}
              >
                {isCurrent && (
                  <Badge className="absolute top-4 right-4" variant="default">
                    Current
                  </Badge>
                )}
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-sm text-muted-foreground">/{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full rounded-xl mt-auto"
                  variant={isCurrent ? 'outline' : isUpgrade ? 'default' : 'secondary'}
                  disabled={isCurrent || updating}
                  onClick={() => changePlan(plan.id)}
                >
                  {isCurrent ? 'Current Plan' : isUpgrade ? 'Upgrade' : 'Downgrade'}
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
