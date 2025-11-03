import { Key, Plus, Eye, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const apiKeys = [
  { id: '1', name: 'Production API Key', key: 'sk_live_••••••••••••••••', createdAt: '2024-01-15' },
  { id: '2', name: 'Development API Key', key: 'sk_test_••••••••••••••••', createdAt: '2024-01-10' },
];

const ApiKeys = () => {
  const handleCopy = (key: string) => {
    toast.success('API key copied!');
  };

  return (
    <div className="container max-w-4xl px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">API Keys</h1>
          <p className="text-muted-foreground">
            Manage your API keys for programmatic access
          </p>
        </div>
        <Button className="rounded-xl">
          <Plus className="w-4 h-4 mr-2" />
          Create Key
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card p-6 space-y-4"
      >
        {apiKeys.map((apiKey) => (
          <div
            key={apiKey.id}
            className="flex items-center justify-between p-4 rounded-xl bg-muted/30"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">{apiKey.name}</div>
                <div className="text-sm text-muted-foreground font-mono">
                  {apiKey.key}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Created {apiKey.createdAt}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="h-9 w-9">
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9"
                onClick={() => handleCopy(apiKey.key)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass-card p-6"
      >
        <h3 className="font-semibold mb-3">Security Best Practices</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Never expose API keys in client-side code</li>
          <li>• Rotate keys regularly</li>
          <li>• Use environment variables for key storage</li>
          <li>• Delete unused keys immediately</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default ApiKeys;
