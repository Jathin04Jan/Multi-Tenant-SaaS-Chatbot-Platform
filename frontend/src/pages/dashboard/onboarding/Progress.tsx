import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Stepper } from '@/components/shell/Stepper';
import { useWizardStore } from '@/store/wizard';
import { mockGetIndexingStatus } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const steps = [
  { number: 1, name: 'Brand & Persona', path: '/dashboard/onboarding/brand' },
  { number: 2, name: 'Data Sources', path: '/dashboard/onboarding/data' },
  { number: 3, name: 'Indexing', path: '/dashboard/onboarding/progress' },
  { number: 4, name: 'Test Chat', path: '/dashboard/onboarding/test' },
  { number: 5, name: 'Install', path: '/dashboard/onboarding/install' },
];

const IndexingProgress = () => {
  const navigate = useNavigate();
  const {
    indexingProgress,
    indexingStatus,
    setIndexingProgress,
    setIndexingStatus,
    completeStep,
    setCurrentStep,
    completedSteps,
  } = useWizardStore();

  useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);

  const stepsWithCompletion = steps.map((step) => {
    let isCompleted = false;
    if (completedSteps instanceof Set) {
      isCompleted = completedSteps.has(step.number);
    } else if (Array.isArray(completedSteps)) {
      isCompleted = (completedSteps as number[]).includes(step.number);
    }
    return { ...step, completed: isCompleted };
  });

  const { data } = useQuery({
    queryKey: ['indexing-status'],
    queryFn: mockGetIndexingStatus,
    refetchInterval: indexingStatus === 'running' ? 2000 : false,
  });

  useEffect(() => {
    if (data) {
      setIndexingProgress(data.data.progress);
      setIndexingStatus(data.data.status as any);
    }
  }, [data, setIndexingProgress, setIndexingStatus]);

  const handleContinue = () => {
    completeStep(3);
    setCurrentStep(4);
    navigate('/dashboard/onboarding/test');
  };

  const stages = [
    { name: 'Queued', status: indexingProgress > 0 ? 'complete' : 'current' },
    { name: 'Processing', status: indexingProgress > 30 ? 'complete' : indexingProgress > 0 ? 'current' : 'pending' },
    { name: 'Vectorizing', status: indexingProgress > 60 ? 'complete' : indexingProgress > 30 ? 'current' : 'pending' },
    { name: 'Indexed', status: indexingProgress === 100 ? 'complete' : 'pending' },
  ];

  return (
    <div className="container max-w-4xl px-4 py-8 space-y-8">
      {/* Persistent Stepper */}
      <div className="glass-card p-6 mb-8">
        <Stepper steps={stepsWithCompletion} currentStep={3} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold mb-2">Indexing Progress</h1>
        <p className="text-muted-foreground">
          Your data is being processed and indexed for search
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card p-8"
      >
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{indexingProgress}%</span>
            </div>
            <Progress value={indexingProgress} className="h-2" />
          </div>

          <div className="space-y-4">
            {stages.map((stage, index) => (
              <div
                key={stage.name}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30"
              >
                {stage.status === 'complete' ? (
                  <CheckCircle2 className="w-6 h-6 text-success shrink-0" />
                ) : stage.status === 'current' ? (
                  <Loader2 className="w-6 h-6 text-primary animate-spin shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground shrink-0" />
                )}
                <div className="flex-1">
                  <div className="font-medium">{stage.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {stage.status === 'complete'
                      ? 'Completed'
                      : stage.status === 'current'
                      ? 'In progress...'
                      : 'Pending'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {indexingStatus === 'failed' && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-sm text-destructive">
              Indexing failed. Please try uploading your data again.
            </div>
          )}

          {indexingStatus === 'completed' && (
            <div className="p-4 bg-success/10 border border-success/20 rounded-xl text-sm text-success">
              Indexing complete! Your chatbot is ready to test.
            </div>
          )}
        </div>
      </motion.div>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard/onboarding/data')}
          className="rounded-xl glass"
        >
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={indexingStatus !== 'completed'}
          className="rounded-xl"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default IndexingProgress;
