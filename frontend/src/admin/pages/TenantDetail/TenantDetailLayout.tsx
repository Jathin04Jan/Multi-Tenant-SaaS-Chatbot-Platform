import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { mock } from "@/admin/mocks/mockService";
import type { Tenant } from "@/admin/types";
import ImpersonationBanner from "../../components/ImpersonationBanner";

export default function TenantDetailLayout() {
  const { tenantId } = useParams();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("[TenantDetailLayout] tenantId =", tenantId);

  useEffect(() => {
    if (!tenantId) return;
    setLoading(true);
    mock.getTenant(tenantId).then((t) => {
      console.log("[TenantDetailLayout] fetched tenant =", t);
      setTenant(t);
      setLoading(false);
    });
  }, [tenantId]);

  if (!tenantId) {
    return <div className="p-6">[debug] No tenantId in route.</div>;
  }

  if (loading) {
    return <div className="p-6">[debug] Loading tenant {tenantId}…</div>;
  }

  if (!tenant) {
    return <div className="p-6">[debug] Tenant {tenantId} not found in mock data.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <ImpersonationBanner />
      <div>
        <h1 className="text-xl font-semibold">{tenant.name}</h1>
        <p className="text-sm text-muted-foreground">
          Plan: {tenant.plan} · Status: {tenant.status}
        </p>
      </div>

      <div className="flex gap-4 border-b">
        <TenantTab to={`/admin/tenants/${tenant.id}/summary`} label="Summary" />
        <TenantTab to={`/admin/tenants/${tenant.id}/bots`} label="Bots" />
        <TenantTab to={`/admin/tenants/${tenant.id}/members`} label="Members" />
        <TenantTab to={`/admin/tenants/${tenant.id}/billing`} label="Billing" />
        <TenantTab to={`/admin/tenants/${tenant.id}/data-sources`} label="Data Sources" />
        <TenantTab to={`/admin/tenants/${tenant.id}/security`} label="Security" />
        <TenantTab to={`/admin/tenants/${tenant.id}/webhooks`} label="Webhooks" />
      </div>

      <Outlet context={{ tenant }} />
    </div>
  );
}

function TenantTab({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `pb-2 text-sm ${isActive ? "border-b-2 border-foreground" : "text-muted-foreground"}`
      }
    >
      {label}
    </NavLink>
  );
}

