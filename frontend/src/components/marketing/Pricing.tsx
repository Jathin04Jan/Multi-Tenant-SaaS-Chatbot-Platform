import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Trial',
    price: 'Free',
    period: '14 days',
    features: [
      '50 MB upload limit',
      '100 messages/month',
      '1 chatbot',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: '$49',
    period: 'per month',
    features: [
      '5 GB upload limit',
      'Unlimited messages',
      '10 chatbots',
      'Priority support',
      'Custom branding',
      'Analytics dashboard',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact sales',
    features: [
      'Unlimited uploads',
      'Unlimited messages',
      'Unlimited chatbots',
      'Dedicated support',
      'SSO & SAML',
      'SLA guarantee',
      'On-premise option',
    ],
  },
];

export const Pricing = () => {
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

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-8 relative ${
                plan.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/ {plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full rounded-xl" size="lg">
                <Link to="/signup">
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
