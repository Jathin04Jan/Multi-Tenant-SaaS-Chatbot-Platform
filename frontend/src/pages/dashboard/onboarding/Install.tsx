import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWizardStore } from '@/store/wizard';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Install = () => {
  const navigate = useNavigate();
  const { tenantId, branding, completeStep } = useWizardStore();
  const [copied, setCopied] = useState(false);
  const [domains, setDomains] = useState<string[]>(['localhost:3000']);
  const [newDomain, setNewDomain] = useState('');

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

  const handleAddDomain = () => {
    if (!newDomain.trim()) return;
    if (!/^[a-z0-9][a-z0-9-]*(\.[a-z0-9][a-z0-9-]*)*:[0-9]+$|^[a-z0-9][a-z0-9-]*(\.[a-z0-9][a-z0-9-]*)+$/.test(newDomain)) {
      toast.error('Invalid domain format');
      return;
    }
    setDomains([...domains, newDomain]);
    setNewDomain('');
    toast.success('Domain added');
  };

  const handleRemoveDomain = (index: number) => {
    setDomains(domains.filter((_, i) => i !== index));
  };

  const handleFinish = () => {
    completeStep(5);
    toast.success('Setup complete! 🎉');
    navigate('/dashboard');
  };

  return (
    <div className="container max-w-4xl px-4 py-8 space-y-8">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass-card p-6 space-y-4"
      >
        <h2 className="text-lg font-semibold">Domain Allowlist</h2>
        <p className="text-sm text-muted-foreground">
          Restrict where your chatbot can be embedded for security
        </p>

        <div className="flex gap-2">
          <Input
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddDomain()}
            placeholder="example.com"
            className="rounded-xl"
          />
          <Button
            onClick={handleAddDomain}
            className="rounded-xl"
            disabled={!newDomain.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {domains.map((domain, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
            >
              <span className="text-sm font-mono">{domain}</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleRemoveDomain(index)}
                className="h-8 w-8 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {!domains.includes(window.location.hostname) && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-sm text-yellow-600 dark:text-yellow-400">
            <strong>Warning:</strong> Current domain ({window.location.hostname}) 
            is not in the allowlist.
          </div>
        )}
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
