// [schema-demo:additive]
import { useMemo, useState } from 'react';
import { useDemoSession } from '@/demo/DemoSession';
import { mockAgents } from '@/demo/mocks';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const DemoAgents = () => {
  const { tenantId } = useDemoSession();
  const agents = useMemo(() => mockAgents.filter(a => a.tenant_id === tenantId), [tenantId]);
  const [openId, setOpenId] = useState<string | null>(null);
  const selected = agents.find(a => a.id === openId) || null;

  return (
    <div className="container max-w-7xl px-2 md:px-4 py-4 space-y-4">
      <h1 className="text-2xl font-bold">Agents</h1>
      <div className="glass-card p-2 md:p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Theme</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map(a => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{a.description || '-'}</TableCell>
                <TableCell><span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: a.branding.themeColor }} /></TableCell>
                <TableCell className="text-sm">{new Date(a.updated_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" onClick={() => setOpenId(a.id)}>View Config</Button>
                </TableCell>
              </TableRow>
            ))}
            {agents.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-sm text-muted-foreground">No agents for this tenant.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configuration Preview</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <pre className="bg-muted/50 p-3 rounded-xl overflow-auto"><code>{JSON.stringify(selected.llm_config, null, 2)}</code></pre>
              <pre className="bg-muted/50 p-3 rounded-xl overflow-auto"><code>{JSON.stringify(selected.retrieval_config, null, 2)}</code></pre>
              <pre className="bg-muted/50 p-3 rounded-xl overflow-auto"><code>{JSON.stringify(selected.guardrails, null, 2)}</code></pre>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DemoAgents;


