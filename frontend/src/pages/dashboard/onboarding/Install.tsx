import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Stepper } from '@/components/shell/Stepper';
import { useWizardStore } from '@/store/wizard';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const steps = [
  { number: 1, name: 'Brand & Persona', path: '/dashboard/onboarding/brand' },
  { number: 2, name: 'Data Sources', path: '/dashboard/onboarding/data' },
  { number: 3, name: 'Indexing', path: '/dashboard/onboarding/progress' },
  { number: 4, name: 'Test Chat', path: '/dashboard/onboarding/test' },
  { number: 5, name: 'Install', path: '/dashboard/onboarding/install' },
];

const Install = () => {
  const navigate = useNavigate();
  const { tenantId, branding, completeStep, setCurrentStep, completedSteps } = useWizardStore();

  useEffect(() => {
    setCurrentStep(5);
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
  const [copied, setCopied] = useState(false);

  const embedCode = `<script>
(function(){
  const s=document.createElement('script');
  s.src="https://cdn.yourbot.com/widget.js";
  s.onload=()=>window.YourBot.init({
    tenantId:"${tenantId || 'TENANT_ID'}",
    apiBase:"https://api.yourbot.com",
    theme:{
      primary:"${branding.primaryColor}",
      logoUrl:"/brand.png"
    },
    identify:{ userId:null, jwt:null }
  });
  document.head.appendChild(s);
})();
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinish = () => {
    completeStep(5);
    toast.success('Setup complete! 🎉');
    navigate('/dashboard');
  };

  return (
    <div className="container max-w-4xl px-4 py-8 space-y-8">
      {/* Persistent Stepper */}
      <div className="glass-card p-6 mb-8">
        <Stepper steps={stepsWithCompletion} currentStep={5} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold mb-2">Install Your Chatbot</h1>
        <p className="text-muted-foreground">
          Add this snippet to your website to deploy your chatbot
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card p-6 space-y-4"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Embed Code</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="rounded-xl glass"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>

        <div className="relative">
          <pre className="p-4 rounded-xl bg-muted/50 overflow-x-auto text-sm">
            <code>{embedCode}</code>
          </pre>
        </div>

        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-sm">
          <strong>Installation:</strong> Paste this code before the closing{' '}
          <code className="px-1 py-0.5 bg-muted rounded">&lt;/body&gt;</code> tag 
          of your website.
        </div>
      </motion.div>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard/onboarding/test')}
          className="rounded-xl glass"
        >
          Back
        </Button>
        <Button onClick={handleFinish} className="rounded-xl">
          Finish Setup
        </Button>
      </div>
    </div>
  );
};

export default Install;
