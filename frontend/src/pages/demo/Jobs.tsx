// [schema-demo:additive]
import { useMemo, useState } from 'react';
import { useDemoSession } from '@/demo/DemoSession';
import { mockIngestionJobs } from '@/demo/mocks';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const DemoJobs = () => {
  const { tenantId } = useDemoSession();
  const [openLog, setOpenLog] = useState<string | null>(null);
  const [rows, setRows] = useState(() => mockIngestionJobs);
  const jobs = useMemo(() => rows.filter(j => j.tenant_id === tenantId), [tenantId, rows]);

  const simulate = () => {
    setRows(prev => prev.map(j => j.tenant_id === tenantId && j.status === 'running' ? { ...j, progress: Math.min(100, j.progress + 10), status: j.progress + 10 >= 100 ? 'completed' : 'running' } : j));
  };

  return (
    <div className="container max-w-7xl px-2 md:px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ingestion Jobs</h1>
        <Button variant="outline" className="rounded-xl glass" onClick={simulate}>Simulate progress</Button>
      </div>
      <div className="glass-card p-2 md:p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Logs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map(j => (
              <TableRow key={j.id}>
                <TableCell className="font-medium">{j.id}</TableCell>
                <TableCell className="text-sm">{j.status}</TableCell>
                <TableCell className="min-w-[180px]"><Progress value={j.progress} /></TableCell>
                <TableCell className="text-right"><Button size="sm" variant="outline" onClick={() => setOpenLog(j.id)}>View Logs</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!openLog} onOpenChange={(o) => !o && setOpenLog(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Logs</DialogTitle>
          </DialogHeader>
          <pre className="bg-muted/50 p-3 rounded-xl overflow-auto text-sm"><code>{(jobs.find(j => j.id === openLog)?.logs) || ''}</code></pre>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DemoJobs;


