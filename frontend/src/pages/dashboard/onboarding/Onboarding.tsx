import { useNavigate } from 'react-router-dom';
import { Stepper } from '@/components/shell/Stepper';
import { Button } from '@/components/ui/button';
import { useWizardStore } from '@/store/wizard';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

const steps = [
  { number: 1, name: 'Brand & Persona', path: '/dashboard/onboarding/brand' },
  { number: 2, name: 'Data Sources', path: '/dashboard/onboarding/data' },
  { number: 3, name: 'Indexing', path: '/dashboard/onboarding/progress' },
  { number: 4, name: 'Test Chat', path: '/dashboard/onboarding/test' },
  { number: 5, name: 'Install', path: '/dashboard/onboarding/install' },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { completedSteps, currentStep } = useWizardStore();

  // Safari compatibility: ensure animations work
  useEffect(() => {
    // Force reflow to ensure Safari renders correctly
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        document.body.offsetHeight;
      });
    }
  }, []);

  // Safari compatibility: Ensure completedSteps is a Set before using .has()
  const stepsWithCompletion = steps.map((step) => {
    let isCompleted = false;
    if (completedSteps instanceof Set) {
      isCompleted = completedSteps.has(step.number);
    } else if (Array.isArray(completedSteps)) {
      isCompleted = (completedSteps as number[]).includes(step.number);
    }
    
    return {
      ...step,
      completed: isCompleted,
    };
  });

  return (
    <div className="container max-w-5xl px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold mb-2">Onboarding</h1>
        <p className="text-muted-foreground mb-8">
          Set up your chatbot in 5 simple steps
        </p>

        <Stepper steps={stepsWithCompletion} currentStep={currentStep} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass-card p-12 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Follow the guided setup to configure your chatbot's personality, 
          upload training data, and deploy to your website.
        </p>
        <Button
          size="lg"
          onClick={() => navigate(steps[0].path)}
          className="rounded-xl"
        >
          Start Setup <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="flex justify-center"
      >
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard')}
          className="rounded-xl glass"
        >
          Exit Onboarding
        </Button>
      </motion.div>
    </div>
  );
};

export default Onboarding;
