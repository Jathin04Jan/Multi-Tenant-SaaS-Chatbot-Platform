import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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
    <nav aria-label="Progress" className="w-full overflow-visible">
      <ol className="flex items-start justify-between w-full gap-4 pb-20">
        {steps.map((step, index) => {
          const isCompleted = step.completed;
          const isCurrent = step.number === currentStep;
          const isUpcoming = step.number > currentStep && !step.completed;

          return (
            <li
              key={step.number}
              className="relative flex items-start flex-1 min-w-0"
            >
              <div className="flex items-start w-full">
                {/* Step Circle */}
                <div className="relative flex-shrink-0 z-10">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : isCompleted ? 1.05 : 1,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: 'easeInOut',
                    }}
                    className={cn(
                      'relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 shadow-sm overflow-visible',
                      isCompleted
                        ? 'bg-primary border-primary text-primary-foreground shadow-lg'
                        : isCurrent
                        ? 'border-primary bg-background text-primary shadow-md ring-2 ring-primary/20'
                        : 'border-muted bg-background text-muted-foreground'
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {isCompleted ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, opacity: 0, rotate: -180 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          exit={{ scale: 0, opacity: 0, rotate: 180 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                          <Check className="h-7 w-7 text-primary-foreground" strokeWidth={3} />
                        </motion.div>
                      ) : (
                        <motion.span
                          key="number"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className={cn(
                            'text-base font-bold',
                            isCurrent ? 'text-primary' : 'text-muted-foreground'
                          )}
                        >
                          {step.number}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  {/* Step Label */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap">
                    <p
                      className={cn(
                        'text-sm font-medium hidden sm:block transition-colors duration-300',
                        isCurrent
                          ? 'text-foreground font-semibold'
                          : isCompleted
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      )}
                    >
                      {step.name}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index !== steps.length - 1 && (
                  <div className="flex-1 mx-3 relative mt-7">
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={false}
                          animate={{
                            width: isCompleted ? '100%' : '0%',
                          }}
                          transition={{
                            duration: 0.6,
                            ease: 'easeInOut',
                            delay: isCompleted ? 0.2 : 0,
                          }}
                          className={cn(
                            'h-full rounded-full transition-colors duration-300',
                            isCompleted ? 'bg-primary' : 'bg-muted'
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
