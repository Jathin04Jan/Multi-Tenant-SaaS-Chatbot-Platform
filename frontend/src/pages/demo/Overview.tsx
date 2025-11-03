// [schema-demo:additive]
import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDemoSession } from '@/demo/DemoSession';
import { mockAgents, mockIngestionJobs, mockSubscriptions, mockEngagementByRange, mockProductEnquiries, mockMostAskedQuestions, mockChatHistory } from '@/demo/mocks';

const DemoOverview = () => {
  const { role, tenantId } = useDemoSession();
  const sub = useMemo(() => mockSubscriptions.find(s => s.tenant_id === tenantId), [tenantId]);
  const jobs = useMemo(() => mockIngestionJobs.filter(j => j.tenant_id === tenantId).slice(0, 5), [tenantId]);
  const agentsCount = useMemo(() => mockAgents.filter(a => a.tenant_id === tenantId).length, [tenantId]);

  // [schema-demo:additive] Show realistic 3-digit counts without altering underlying mocks.
  const seeded = useMemo(() => {
    // simple hash from tenantId
    let h = 0;
    for (let i = 0; i < tenantId.length; i++) h = (h * 31 + tenantId.charCodeAt(i)) >>> 0;
    return h;
  }, [tenantId]);
  const displayedAgents = useMemo(() => 100 + (seeded % 900), [seeded]); // 100-999

  const [range, setRange] = useState<'24h' | '7d' | '30d' | '3m' | '6m'>('30d');
  // Each chatbot serves one user (customer). For demo visuals, show 3-digit numbers consistently.
  const engaged = displayedAgents;
  const products = mockProductEnquiries[tenantId] ?? [];
  const faqs = mockMostAskedQuestions[tenantId] ?? [];
  const chats = useMemo(() => mockChatHistory.filter(c => c.tenant_id === tenantId).slice(-6), [tenantId]);

  return (
    <div className="container max-w-7xl px-2 md:px-4 py-4 space-y-4">
      <h1 className="text-2xl font-bold">Demo Overview</h1>

      {role === 'owner' && sub && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Current Plan</div>
              <div className="text-xl font-semibold">{sub.plan.toUpperCase()} <Badge className="ml-2">{sub.status}</Badge></div>
            </div>
            <div className="text-sm">
              <div>Tokens: {sub.usage_metrics.tokens.toLocaleString()}</div>
              <div>API Calls: {sub.usage_metrics.api_calls.toLocaleString()}</div>
              <div>Storage: {sub.usage_metrics.storage} MB</div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Deployed Chatbots</div>
          <div className="text-2xl font-bold">{displayedAgents}</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Users Engaged</div>
              <div className="text-2xl font-bold">{engaged.toLocaleString()}</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl glass text-xs">{range}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 glass">
                <DropdownMenuLabel>Range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(['24h','7d','30d','3m','6m'] as const).map(r => (
                  <DropdownMenuItem key={r} onClick={() => setRange(r)}>{r}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Top Products (enquiries)</div>
          <div className="mt-2 space-y-2">
            {products.map(p => (
              <div key={p.product} className="flex items-center gap-2">
                <div className="w-24 text-xs text-muted-foreground">{p.product}</div>
                <div className="flex-1 h-2 rounded bg-muted overflow-hidden">
                  <div className="h-2 bg-primary" style={{ width: `${Math.min(100, (p.count / Math.max(1, products[0]?.count || p.count)) * 100)}%` }} />
                </div>
                <div className="w-12 text-right text-xs">{p.count}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="mb-3 font-semibold">Recent Jobs</div>
        <div className="space-y-3">
          {jobs.map(j => (
            <div key={j.id} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-3 text-sm">{j.id}</div>
              <div className="col-span-2"><Badge variant={j.status === 'completed' ? 'default' : j.status === 'failed' ? 'destructive' : 'secondary'}>{j.status}</Badge></div>
              <div className="col-span-5"><Progress value={j.progress} /></div>
              <div className="col-span-2 text-xs text-muted-foreground">{new Date(j.created_at).toLocaleDateString()}</div>
            </div>
          ))}
          {jobs.length === 0 && <div className="text-sm text-muted-foreground">No jobs yet for this tenant.</div>}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="mb-3 font-semibold">Most Asked Questions</div>
          <div className="space-y-2">
            {faqs.map(f => (
              <div key={f.question} className="flex items-center gap-2 text-sm">
                <div className="flex-1 truncate" title={f.question}>{f.question}</div>
                {f.topic && <Badge variant="secondary" className="mr-2">{f.topic}</Badge>}
                <div className="text-xs text-muted-foreground">{f.count}</div>
              </div>
            ))}
            {faqs.length === 0 && <div className="text-sm text-muted-foreground">No data.</div>}
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-3 font-semibold">Recent Chat History</div>
          <div className="space-y-2 max-h-64 overflow-auto">
            {chats.map(m => (
              <div key={m.id} className="text-sm">
                <span className="text-muted-foreground">[{new Date(m.created_at).toLocaleTimeString()}] </span>
                <span className={m.role === 'user' ? 'font-medium' : 'text-primary'}>{m.role}:</span> {m.content}
              </div>
            ))}
            {chats.length === 0 && <div className="text-sm text-muted-foreground">No chats yet.</div>}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DemoOverview;


