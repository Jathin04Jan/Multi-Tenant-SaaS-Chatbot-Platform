import { Key, Plus, Eye, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { mockCreateApiKey, mockDeleteApiKey, mockListApiKeys, type ApiKeyDTO } from '@/lib/api';

const ApiKeys = () => {
  const [keys, setKeys] = useState<ApiKeyDTO[]>([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => { mockListApiKeys().then((r) => setKeys(r.data)); }, []);

  const handleCopy = (label: string) => {
    toast.success('API key copied!');
  };

  const createKey = async () => {
    setCreating(true);
    const res = await mockCreateApiKey('New Key');
    setKeys((k) => [ { id: res.data.id, label: res.data.label, last4: res.data.last4, createdAt: res.data.createdAt }, ...k ]);
    toast.message('API key created', { description: res.data.secretPreview });
    setCreating(false);
  };

  const revoke = async (id: string) => {
    await mockDeleteApiKey(id);
    setKeys((k) => k.filter((x) => x.id !== id));
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
        <Button className="rounded-xl" onClick={createKey} disabled={creating}>
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
        {keys.map((apiKey) => (
          <div
            key={apiKey.id}
            className="flex items-center justify-between p-4 rounded-xl bg-muted/30"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">{apiKey.label}</div>
                <div className="text-sm text-muted-foreground font-mono">
                  sk_••••••••••••{apiKey.last4}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Created {new Date(apiKey.createdAt).toLocaleDateString()}
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
                onClick={() => handleCopy(apiKey.label)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 text-destructive" onClick={() => revoke(apiKey.id)}>
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
