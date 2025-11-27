import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Stepper } from '@/components/shell/Stepper';
import { BrandingForm } from '@/components/onboarding/BrandingForm';
import { BotPreview } from '@/components/onboarding/BotPreview';
import { useWizardStore } from '@/store/wizard';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createDraftBot, getDraftBot } from '@/lib/api';
import { toast } from 'sonner';

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
  const [draftBotId, setDraftBotId] = useState<string | null>(null);
  const [loadingDraft, setLoadingDraft] = useState(true);
  const [draftError, setDraftError] = useState<string | null>(null);

  const initDraft = useCallback(async () => {
    setLoadingDraft(true);
    setDraftError(null);
    try {
      const existing = await getDraftBot();
      if (!existing.error && existing.data) {
        setDraftBotId(existing.data.id);
      } else if (existing.status === 404) {
        const created = await createDraftBot({ name: 'Assistant' });
        if (created.error || !created.data) {
          throw new Error(created.error || 'Failed to create draft bot.');
        }
        setDraftBotId(created.data.id);
      } else {
        throw new Error(existing.error || 'Unable to load draft bot.');
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to prepare draft bot.';
      setDraftError(message);
      toast.error(message);
    } finally {
      setLoadingDraft(false);
    }
  }, []);

  useEffect(() => {
    setCurrentStep(1);
    initDraft();
  }, [initDraft, setCurrentStep]);

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

  if (loadingDraft) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p>Preparing your draft bot...</p>
        </div>
      </div>
    );
  }

  if (draftError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <p className="text-sm text-muted-foreground">{draftError}</p>
        <Button onClick={initDraft} size="sm">
          Try Again
        </Button>
      </div>
    );
  }

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
          <BrandingForm onComplete={handleComplete} botId={draftBotId} />
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
