import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pricingPlans, getPlanPrice, type BillingFrequency } from '@/constants/pricingPlans';
import { useState } from 'react';

export const Pricing = () => {
  const [billingCycle] = useState<BillingFrequency>('monthly');

  return (
    <section className="py-24 px-4">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground">
            Start free, scale as you grow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pricingPlans.map((plan, index) => {
            const price = getPlanPrice(plan, billingCycle);
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    {price !== 0 && (
                      <span className="text-base font-normal text-muted-foreground">
                        /{billingCycle === 'monthly' ? 'mo' : 'mo (annual)'}
                      </span>
                    )}
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
                  asChild
                  className="w-full rounded-xl mt-6"
                  variant={plan.recommended ? 'default' : 'secondary'}
                >
                  <Link to="/signup">
                    {plan.ctaLabel}
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
