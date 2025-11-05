// [schema-demo:additive]
import { useMemo } from 'react';
import { useDemoSession } from '@/demo/DemoSession';
import { mockSubscriptions } from '@/demo/mocks';
import { Card } from '@/components/ui/card';

const DemoBilling = () => {
  const { tenantId, role } = useDemoSession();
  const sub = useMemo(() => mockSubscriptions.find(s => s.tenant_id === tenantId), [tenantId]);

  if (role === 'admin') {
    return (
      <div className="container max-w-4xl px-2 md:px-4 py-4">
        <Card className="p-6 text-center">
          <div className="text-lg font-semibold mb-2">Owner-only in production</div>
          <div className="text-sm text-muted-foreground">Billing is restricted to the tenant owner.</div>
        </Card>
      </div>
    );
  }

  if (!sub) return null;
  return (
    <div className="container max-w-4xl px-2 md:px-4 py-4 space-y-4">
      <h1 className="text-2xl font-bold">Billing</h1>
      <Card className="p-4">
        <div className="text-sm text-muted-foreground">Plan</div>
        <div className="text-xl font-semibold">{sub.plan.toUpperCase()} · {sub.status}</div>
        <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
          <div>
            <div className="text-muted-foreground">Tokens</div>
            <div className="text-lg font-semibold">{sub.usage_metrics.tokens.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-muted-foreground">API Calls</div>
            <div className="text-lg font-semibold">{sub.usage_metrics.api_calls.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Storage</div>
            <div className="text-lg font-semibold">{sub.usage_metrics.storage} MB</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DemoBilling;


