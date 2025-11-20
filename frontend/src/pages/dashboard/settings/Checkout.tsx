import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { pricingPlans, getPlanPrice, type BillingFrequency } from '@/constants/pricingPlans';
import { mockUpdatePlan, type SubscriptionDTO } from '@/lib/api';
import { toast } from 'sonner';
import { useUserStore } from '@/store/user';

const paymentOptions = [
  { id: 'card', label: 'Card', icons: ['visa', 'mc', 'amex'] },
  { id: 'alipay', label: 'Alipay' },
  { id: 'cash-app', label: 'Cash App Pay', badge: '$5 back' },
  { id: 'bank', label: 'Bank' },
];

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storedEmail = useUserStore((state) => state.userEmail);

  const initialPlanId = (searchParams.get('plan') as SubscriptionDTO['plan']) ?? 'pro';
  const initialBilling = (searchParams.get('billing') as BillingFrequency) === 'yearly' ? 'yearly' : 'monthly';

  const [billingCycle, setBillingCycle] = useState<BillingFrequency>(initialBilling);
  const [selectedPlanId, setSelectedPlanId] = useState<SubscriptionDTO['plan']>(initialPlanId);
  const [email, setEmail] = useState(storedEmail || '');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPlan = useMemo(() => {
    return pricingPlans.find((plan) => plan.id === selectedPlanId) ?? pricingPlans[1];
  }, [selectedPlanId]);

  const monthlyPrice = getPlanPrice(selectedPlan, billingCycle);
  const dueToday = billingCycle === 'monthly' ? monthlyPrice : monthlyPrice * 12;
  const savings =
    billingCycle === 'yearly' ? selectedPlan.monthlyPrice * 12 - selectedPlan.yearlyPrice * 12 : 0;

  const handleCheckout = async () => {
    if (!email) {
      toast.error('Please enter a contact email.');
      return;
    }
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      await mockUpdatePlan(selectedPlan.id);
      toast.success(`${selectedPlan.title} plan activated!`);
      navigate('/dashboard/settings/billing', {
        state: { planChangedAt: Date.now() },
      });
    } catch (error) {
      toast.error('Unable to process payment right now.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container max-w-6xl px-4 py-10 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-2"
      >
        <p className="text-sm text-muted-foreground">Subscribe to {selectedPlan.title}</p>
        <h1 className="text-4xl font-bold">${selectedPlan.monthlyPrice}.00</h1>
        <p className="text-muted-foreground">per month · change anytime</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card rounded-3xl p-6 space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{selectedPlan.title} plan</h2>
              <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
            </div>
            <select
              className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
              value={selectedPlanId}
              onChange={(event) => setSelectedPlanId(event.target.value as SubscriptionDTO['plan'])}
            >
              {pricingPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-muted/30 p-4">
            <div>
              <p className="text-sm text-muted-foreground">Annual billing</p>
              <p className="text-base font-medium">
                {billingCycle === 'yearly' ? 'Enabled · save more' : 'Enable to save up to 20%'}
              </p>
            </div>
            <button
              type="button"
              className={`relative h-9 w-16 rounded-full border border-border transition ${
                billingCycle === 'yearly' ? 'bg-success/20 border-success' : 'bg-muted/40'
              }`}
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            >
              <span
                className={`absolute top-1 h-7 w-7 rounded-full bg-background shadow transition ${
                  billingCycle === 'yearly' ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>${dueToday.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Tax</span>
              <span>Enter address to calculate</span>
            </div>
            {savings > 0 && (
              <div className="flex items-center justify-between text-success">
                <span>Savings</span>
                <span>- ${savings.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-base font-semibold">
            <span>Total due today</span>
            <span>${dueToday.toFixed(2)}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card rounded-3xl p-6 space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="checkout_email">Contact information</Label>
            <Input
              id="checkout_email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-3">
            <Label>Payment method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              {paymentOptions.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                    paymentMethod === method.id ? 'border-primary/60 bg-primary/5' : 'border-border/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={method.id} id={`payment-${method.id}`} />
                    <Label htmlFor={`payment-${method.id}`} className="cursor-pointer font-medium">
                      {method.label}
                    </Label>
                  </div>
                  {method.badge && (
                    <span className="rounded-full bg-success/20 px-3 py-1 text-xs font-semibold text-success">
                      {method.badge}
                    </span>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button
            className="w-full rounded-xl h-12"
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing…' : 'Subscribe'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By subscribing, you authorize us to charge according to the plan terms until you cancel.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;

