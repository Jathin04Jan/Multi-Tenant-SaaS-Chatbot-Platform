import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as mock from "../../mocks/mockService";
import type { AdminTenant } from "../../types";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCurrentAdmin } from "../../useCurrentAdmin";

const TenantSecurity = () => {
  const { tenantId } = useParams();
  const [tenant, setTenant] = useState<AdminTenant | null>(null);
  useEffect(() => { if (tenantId) mock.getTenantById(tenantId).then(setTenant); }, [tenantId]);
  const { role } = useCurrentAdmin();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Security</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="admin-card p-4 rounded-xl">
          <div className="text-sm text-muted-foreground">Region</div>
          <div className="font-medium uppercase">{tenant?.region}</div>
        </div>
        <div className="admin-card p-4 rounded-xl">
          <div className="text-sm text-muted-foreground">Retention</div>
          <div className="font-medium">30 days</div>
        </div>
        <div className="admin-card p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">PII Redaction</div>
            <div className="font-medium">Mask sensitive data</div>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Switch checked={true} disabled={role !== "superadmin"} />
              </div>
            </TooltipTrigger>
            <TooltipContent>{role !== "superadmin" ? "Superadmin only (demo)" : "Demo only"}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default TenantSecurity;

