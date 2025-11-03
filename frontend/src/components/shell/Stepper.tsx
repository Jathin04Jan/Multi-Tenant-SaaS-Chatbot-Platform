import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  number: number;
  name: string;
  completed: boolean;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => (
          <li
            key={step.number}
            className={cn('relative', index !== steps.length - 1 ? 'flex-1' : '')}
          >
            <div className="flex items-center">
              <div
                className={cn(
                  'relative flex h-10 w-10 items-center justify-center rounded-full transition-all',
                  step.number < currentStep || step.completed
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : step.number === currentStep
                    ? 'border-2 border-primary bg-background'
                    : 'border-2 border-muted bg-background'
                )}
              >
                {step.completed ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.number}</span>
                )}
              </div>
              <div className="ml-3 hidden sm:block">
                <p
                  className={cn(
                    'text-sm font-medium',
                    step.number === currentStep
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {step.name}
                </p>
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    'ml-4 h-0.5 w-full transition-all',
                    step.completed ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
