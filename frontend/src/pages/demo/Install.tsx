// [schema-demo:additive]
import { useMemo } from 'react';
import { useDemoSession } from '@/demo/DemoSession';
import { mockInstallSnippets } from '@/demo/mocks';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DemoInstall = () => {
  const { tenantId } = useDemoSession();
  const snippet = useMemo(() => mockInstallSnippets.find(s => s.tenant_id === tenantId), [tenantId]);

  const handleCopy = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="container max-w-5xl px-2 md:px-4 py-4 space-y-4">
      <h1 className="text-2xl font-bold">Install Snippet</h1>
      {snippet ? (
        <div className="space-y-3">
          <div className="glass-card p-4">
            <div className="mb-2 text-sm text-muted-foreground">Script URL</div>
            <div className="flex items-center justify-between gap-2">
              <code className="text-sm break-all">{snippet.script_url}</code>
              <Button size="sm" variant="outline" onClick={() => handleCopy(snippet.script_url)}>Copy</Button>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="mb-2 text-sm text-muted-foreground">Embed Code</div>
            <pre className="bg-muted/50 p-3 rounded-xl overflow-auto text-sm"><code>{snippet.embed_code}</code></pre>
            <div className="mt-2 text-right"><Button size="sm" variant="outline" onClick={() => handleCopy(snippet.embed_code)}>Copy</Button></div>
          </div>
          <Button variant="outline" className="rounded-xl glass" disabled>Verify install (disabled in demo)</Button>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">No snippet for this tenant.</div>
      )}
    </div>
  );
};

export default DemoInstall;


