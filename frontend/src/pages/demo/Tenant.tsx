// [schema-demo:additive]
import { useMemo } from 'react';
import { useDemoSession } from '@/demo/DemoSession';
import { mockTenants } from '@/demo/mocks';

const DemoTenant = () => {
  const { tenantId } = useDemoSession();
  const t = useMemo(() => mockTenants.find(x => x.id === tenantId), [tenantId]);
  if (!t) return null;
  return (
    <div className="container max-w-4xl px-2 md:px-4 py-4 space-y-4">
      <h1 className="text-2xl font-bold">Tenant</h1>
      <div className="glass-card p-4 space-y-2 text-sm">
        <div><span className="text-muted-foreground">Name:</span> {t.name}</div>
        <div><span className="text-muted-foreground">Domain:</span> {t.domain || '-'}</div>
        <div><span className="text-muted-foreground">Plan:</span> {t.plan}</div>
        <div><span className="text-muted-foreground">Status:</span> {t.status}</div>
        <div>
          <div className="text-muted-foreground mb-1">Settings</div>
          <pre className="bg-muted/50 p-3 rounded-xl overflow-auto"><code>{JSON.stringify(t.settings || {}, null, 2)}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default DemoTenant;


