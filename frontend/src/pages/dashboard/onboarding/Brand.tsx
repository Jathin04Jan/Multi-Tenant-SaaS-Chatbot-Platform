import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Stepper } from '@/components/shell/Stepper';
import { BrandingForm } from '@/components/onboarding/BrandingForm';
import { BotPreview } from '@/components/onboarding/BotPreview';
import { useWizardStore } from '@/store/wizard';
import { motion } from 'framer-motion';

const steps = [
  { number: 1, name: 'Brand & Persona', path: '/dashboard/onboarding/brand' },
  { number: 2, name: 'Data Sources', path: '/dashboard/onboarding/data' },
  { number: 3, name: 'Indexing', path: '/dashboard/onboarding/progress' },
  { number: 4, name: 'Test Chat', path: '/dashboard/onboarding/test' },
  { number: 5, name: 'Install', path: '/dashboard/onboarding/install' },
];

const Brand = () => {
  const navigate = useNavigate();
  const { completeStep, setCurrentStep, completedSteps } = useWizardStore();

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  const handleComplete = () => {
    completeStep(1);
    setCurrentStep(2);
    navigate('/dashboard/onboarding/data');
  };

  // Map steps with completion status
  const stepsWithCompletion = steps.map((step) => {
    let isCompleted = false;
    if (completedSteps instanceof Set) {
      isCompleted = completedSteps.has(step.number);
    } else if (Array.isArray(completedSteps)) {
      isCompleted = (completedSteps as number[]).includes(step.number);
    }
    return { ...step, completed: isCompleted };
  });

  return (
    <div className="container max-w-7xl px-4 py-8 space-y-8">
      {/* Persistent Stepper */}
      <div className="glass-card p-6 mb-8">
        <Stepper steps={stepsWithCompletion} currentStep={1} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Brand & Personality</h1>
        <p className="text-muted-foreground">
          Customize how your chatbot looks and sounds
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card p-8"
        >
          <BrandingForm onComplete={handleComplete} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <BotPreview />
        </motion.div>
      </div>
    </div>
  );
};

export default Brand;
