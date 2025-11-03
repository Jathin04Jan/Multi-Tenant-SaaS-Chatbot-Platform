import { CreditCard, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

const Billing = () => {
  return (
    <div className="container max-w-4xl px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold mb-2">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and usage</p>
      </motion.div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card p-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Trial Plan</h2>
            <p className="text-muted-foreground">12 days remaining</p>
          </div>
          <Button className="rounded-xl">
            <TrendingUp className="w-4 h-4 mr-2" />
            Upgrade to Pro
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-muted/30">
            <div className="text-sm text-muted-foreground mb-1">Messages</div>
            <div className="text-2xl font-bold mb-2">47 / 100</div>
            <Progress value={47} className="h-1" />
          </div>

          <div className="p-4 rounded-xl bg-muted/30">
            <div className="text-sm text-muted-foreground mb-1">Storage</div>
            <div className="text-2xl font-bold mb-2">12 / 50 MB</div>
            <Progress value={24} className="h-1" />
          </div>

          <div className="p-4 rounded-xl bg-muted/30">
            <div className="text-sm text-muted-foreground mb-1">Chatbots</div>
            <div className="text-2xl font-bold mb-2">1 / 1</div>
            <Progress value={100} className="h-1" />
          </div>
        </div>
      </motion.div>

      {/* Payment Method */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
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
              Add a card to upgrade your plan
            </div>
          </div>
          <Button variant="outline" className="rounded-xl glass">
            Add Card
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Billing;
