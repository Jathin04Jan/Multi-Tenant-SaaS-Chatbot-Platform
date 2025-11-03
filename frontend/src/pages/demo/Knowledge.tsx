// [schema-demo:additive]
import { useMemo, useState } from 'react';
import { useDemoSession } from '@/demo/DemoSession';
import { mockAgents, mockKnowledgeSources } from '@/demo/mocks';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

const typeColor: Record<string, string> = { file: 'secondary', url: 'default', integration: 'outline' };
const statusClass: Record<string, string> = { pending: 'bg-yellow-500/20 text-yellow-700', processing: 'bg-blue-500/20 text-blue-700', indexed: 'bg-green-500/20 text-green-700', error: 'bg-red-500/20 text-red-700' };

const DemoKnowledge = () => {
  const { tenantId } = useDemoSession();
  const all = useMemo(() => mockKnowledgeSources.filter(s => s.tenant_id === tenantId), [tenantId]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = all.find(s => s.id === selectedId) || null;
  const agentMap = useMemo(() => Object.fromEntries(mockAgents.map(a => [a.id, a.name])), []);

  return (
    <div className="container max-w-7xl px-2 md:px-4 py-4 space-y-4">
      <h1 className="text-2xl font-bold">Knowledge Sources</h1>
      <div className="glass-card p-2 md:p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {all.map(s => (
              <TableRow key={s.id} className="cursor-pointer" onClick={() => setSelectedId(s.id)}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell><Badge variant={typeColor[s.type] as any}>{s.type}</Badge></TableCell>
                <TableCell><span className={`px-2 py-1 text-xs rounded ${statusClass[s.status]}`}>{s.status}</span></TableCell>
                <TableCell className="text-sm">{new Date(s.updated_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            {all.length === 0 && <TableRow><TableCell colSpan={4} className="text-sm text-muted-foreground">No sources.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Drawer open={!!selected} onOpenChange={(o) => !o && setSelectedId(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Source Details</DrawerTitle>
          </DrawerHeader>
          {selected && (
            <div className="p-4 space-y-2 text-sm">
              <div><span className="text-muted-foreground">Name:</span> {selected.name}</div>
              <div><span className="text-muted-foreground">Agent:</span> {selected.agent_id ? agentMap[selected.agent_id] : '-'}</div>
              <div><span className="text-muted-foreground">Type:</span> {selected.type}</div>
              <div><span className="text-muted-foreground">Status:</span> {selected.status}</div>
              <pre className="bg-muted/50 p-3 rounded-xl overflow-auto"><code>{JSON.stringify(selected.metadata, null, 2)}</code></pre>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DemoKnowledge;


