import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import type { Tenant } from "@/admin/types";
import { getPlanById, planCatalog, updateTenantPlan } from "@/admin/mocks/mockService";
import { useCurrentAdmin } from "@/admin/useCurrentAdmin";

type Ctx = { tenant: Tenant };

export default function TenantBillingPage() {
  const { tenant } = useOutletContext<Ctx>();
  const { role } = useCurrentAdmin();
  const plan = getPlanById(tenant.plan);
  const [selectedPlan, setSelectedPlan] = useState(tenant.plan);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Billing for {tenant.name}</h2>
        <p className="text-sm text-muted-foreground">Manage this tenant’s subscription.</p>
      </div>

      <div className="rounded-lg border p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current plan</p>
            <p className="text-xl font-semibold capitalize">{plan.label}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-xl font-semibold">
              {plan.price === 0 ? "Free" : `$${plan.price}/mo`}
            </p>
          </div>
        </div>
        {role === "superadmin" ? (
          <div className="space-y-2">
            <label className="text-sm">Change plan</label>
            <select
              className="border rounded-md px-2 py-1 bg-background"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              {planCatalog.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label} {p.price ? `($${p.price}/mo)` : "(Free)"}
                </option>
              ))}
            </select>
            <button
              className="inline-flex items-center gap-1 rounded-md bg-primary text-primary-foreground px-3 py-1 text-sm disabled:opacity-50"
              disabled={saving}
              onClick={async () => {
                setSaving(true);
                await updateTenantPlan(tenant.id, selectedPlan);
                setSaving(false);
                setMsg("Plan updated (mock).");
              }}
            >
              {saving ? "Saving..." : "Update plan"}
            </button>
            {msg ? <p className="text-xs text-muted-foreground">{msg}</p> : null}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">You are an admin. Only the superadmin can change plans.</p>
        )}
      </div>

      <div className="rounded-lg border p-4">
        <p className="text-sm font-medium mb-2">Recent invoices</p>
        <p className="text-sm text-muted-foreground">No invoices in mock data.</p>
      </div>
    </div>
  );
}

