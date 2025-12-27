import { useEffect, useState, useCallback } from 'react';
import Joyride, { type CallBackProps, type Step, STATUS } from 'react-joyride';
import { useNavigate, useLocation } from 'react-router-dom';

interface GuidedTourProps {
  userId: string | null;
  isNewUser: boolean;
  onComplete?: () => void;
}

const TOUR_STORAGE_KEY = (userId: string) => `onboarding_tour_completed_${userId}`;

// Tour steps configuration
const tourSteps: (Step & { route?: string })[] = [
    {
      target: '[data-tour="create-bot"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Start here — create your first bot</h3>
          <p className="text-sm text-muted-foreground">
            Click this card to begin building your AI assistant. We'll guide you through each step.
          </p>
        </div>
      ),
      placement: 'bottom',
      disableBeacon: true,
      route: '/dashboard/onboarding',
    },
    {
      target: '[data-tour="bot-name"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Give your bot a name</h3>
          <p className="text-sm text-muted-foreground">
            Enter a friendly name for your bot. This will be displayed to users when they interact with it.
          </p>
        </div>
      ),
      placement: 'bottom',
      disableBeacon: true,
      route: '/dashboard/onboarding',
    },
    {
      target: '[data-tour="knowledge-source"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Add knowledge sources</h3>
          <p className="text-sm text-muted-foreground">
            Upload documents or add URLs so your bot can answer questions accurately. This is where your bot learns about your business.
          </p>
        </div>
      ),
      placement: 'top',
      disableBeacon: true,
      route: '/dashboard/onboarding',
    },
    {
      target: '[data-tour="finish-create"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Create your bot</h3>
          <p className="text-sm text-muted-foreground">
            Once you're ready, click here to create your bot. You can always come back to refine it later!
          </p>
        </div>
      ),
      placement: 'top',
      disableBeacon: true,
      route: '/dashboard/onboarding',
    },
];

export const GuidedTour = ({ userId, isNewUser, onComplete }: GuidedTourProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Cleanup tour when route changes (prevent blank screen)
  useEffect(() => {
    // Stop tour immediately when route changes to prevent overlay blocking
    setRun((currentRun) => {
      if (currentRun) {
        // Restore body overflow if it was changed
        document.body.style.overflow = '';
        return false;
      }
      return currentRun;
    });
    setStepIndex(0);
  }, [location.pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Ensure body overflow is restored when component unmounts
      document.body.style.overflow = '';
      setRun(false);
      setStepIndex(0);
    };
  }, []);

  // Check if tour should run (only on initial mount or when user/bot status changes)
  useEffect(() => {
    if (!userId || !isNewUser) {
      setRun(false);
      setIsInitialized(false);
      return;
    }

    // Check if tour was already completed
    const completed = localStorage.getItem(TOUR_STORAGE_KEY(userId));
    if (completed === 'true') {
      setRun(false);
      setIsInitialized(true);
      return;
    }

    // Only initialize once - don't re-trigger on route changes
    if (isInitialized) {
      return;
    }

    // Start tour after a short delay to ensure DOM is ready
    // Only navigate if we're not already on the onboarding page
    const timer = setTimeout(() => {
      const firstStep = tourSteps[0];
      // Only auto-navigate if we're on dashboard home, not if user manually navigated elsewhere
      if (firstStep?.route && location.pathname === '/dashboard') {
        navigate(firstStep.route);
        // Wait for navigation, then start tour
        setTimeout(() => {
          setRun(true);
          setIsInitialized(true);
        }, 500);
      } else if (location.pathname === firstStep?.route) {
        // Already on correct route
        setRun(true);
        setIsInitialized(true);
      } else {
        // User is on a different route - don't auto-start tour
        setIsInitialized(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [userId, isNewUser, isInitialized, navigate, location.pathname]);

  const handleJoyrideCallback = useCallback(
    (data: CallBackProps) => {
      const { status, type, index, action } = data;

      // CRITICAL: Handle SKIPPED status separately - NO navigation, just close
      if (status === STATUS.SKIPPED) {
        if (userId) {
          localStorage.setItem(TOUR_STORAGE_KEY(userId), 'true');
        }
        setRun(false);
        setStepIndex(0);
        setIsInitialized(true);
        // Restore body overflow
        document.body.style.overflow = '';
        // Early return - prevent any further processing
        return;
      }

      // Handle FINISHED status
      if (status === STATUS.FINISHED) {
        if (userId) {
          localStorage.setItem(TOUR_STORAGE_KEY(userId), 'true');
        }
        setRun(false);
        setStepIndex(0);
        setIsInitialized(true);
        // Restore body overflow
        document.body.style.overflow = '';
        onComplete?.();
        return;
      }

      // Handle step navigation (only when tour is running)
      if (type === 'step:after' && run) {
        setStepIndex(index);
        return;
      }

      // Handle target not found - navigate to correct route if needed
      // BUT only if tour is still running and not skipped
      if (type === 'target:notFound' && run && status !== STATUS.SKIPPED) {
        const currentStep = tourSteps[index];
        if (currentStep?.route && location.pathname !== currentStep.route) {
          navigate(currentStep.route);
          // Wait for navigation and element to appear, then retry
          setTimeout(() => {
            const element = document.querySelector(currentStep.target as string);
            if (element) {
              setStepIndex(index);
            } else {
              // If still not found, skip to next step
              if (index + 1 < tourSteps.length) {
                setStepIndex(index + 1);
              }
            }
          }, 500);
        } else {
          // Element not found and we're on correct route - skip to next
          if (index + 1 < tourSteps.length) {
            setStepIndex(index + 1);
          }
        }
      }
    },
    [userId, navigate, location.pathname, onComplete, run]
  );

  // Don't render if not a new user or no userId
  if (!isNewUser || !userId) {
    return null;
  }

  // Don't render if tour is not running (prevents overlay from blocking interactions)
  // This ensures the overlay is completely unmounted when tour stops
  if (!run) {
    return null;
  }

  return (
    <Joyride
      steps={tourSteps}
      run={run}
      stepIndex={stepIndex}
      continuous
      showProgress
      showSkipButton
      disableCloseOnEsc={false}
      disableOverlayClose={false}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: 'hsl(var(--primary))',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: '1rem',
          padding: '1.5rem',
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltipTitle: {
          fontSize: '1.125rem',
          fontWeight: 600,
          color: 'hsl(var(--foreground))',
          marginBottom: '0.5rem',
        },
        tooltipContent: {
          padding: 0,
          fontSize: '0.875rem',
          color: 'hsl(var(--muted-foreground))',
        },
        buttonNext: {
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          borderRadius: '0.5rem',
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
          fontWeight: 500,
          border: 'none',
          cursor: 'pointer',
        },
        buttonBack: {
          color: 'hsl(var(--muted-foreground))',
          marginRight: '0.5rem',
          fontSize: '0.875rem',
        },
        buttonSkip: {
          color: 'hsl(var(--muted-foreground))',
          fontSize: '0.875rem',
        },
        beacon: {
          inner: {
            backgroundColor: 'hsl(var(--primary))',
          },
          outer: {
            borderColor: 'hsl(var(--primary))',
          },
        },
        spotlight: {
          borderRadius: '0.75rem',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip tour',
      }}
    />
  );
};

// Helper function to restart tour
export const restartTour = (userId: string) => {
  localStorage.removeItem(TOUR_STORAGE_KEY(userId));
};

// Helper function to check if tour is completed
export const isTourCompleted = (userId: string | null): boolean => {
  if (!userId) return false;
  return localStorage.getItem(TOUR_STORAGE_KEY(userId)) === 'true';
};

