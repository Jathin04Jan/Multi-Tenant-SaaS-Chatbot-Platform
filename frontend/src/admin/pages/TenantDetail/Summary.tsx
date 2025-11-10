import { useOutletContext } from "react-router-dom";
import type { Tenant } from "@/admin/types";

type Ctx = { tenant: Tenant };

export default function TenantSummaryPage() {
  const ctx = useOutletContext<Ctx | null>();
  if (!ctx) return <div className="p-6">[debug] No tenant context.</div>;

  const { tenant } = ctx;
  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">Tenant summary for {tenant.name}</div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Bots</div>
          <div className="text-2xl font-bold">{tenant.bots}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Messages</div>
          <div className="text-2xl font-bold">{tenant.usageMessages}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Spend (USD)</div>
          <div className="text-2xl font-bold">${tenant.spendUsd.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

