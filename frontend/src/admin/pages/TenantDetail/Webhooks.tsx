import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as mock from "../../mocks/mockService";
import type { AdminWebhookEndpoint, AdminWebhookDelivery } from "../../types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCurrentAdmin } from "../../useCurrentAdmin";

const TenantWebhooks = () => {
  const { tenantId } = useParams();
  const [endpoints, setEndpoints] = useState<AdminWebhookEndpoint[]>([]);
  const [deliveries, setDeliveries] = useState<AdminWebhookDelivery[]>([]);
  const { role } = useCurrentAdmin();
  useEffect(() => {
    if (!tenantId) return;
    mock.mock.listWebhooks(tenantId).then(setEndpoints);
    mock.mock.listWebhookDeliveries(tenantId).then(setDeliveries);
  }, [tenantId]);

  return (
    <div className="space-y-6">
      <h3 className="font-semibold">Webhooks</h3>
      <div className="admin-card p-4 rounded-xl">
        <h4 className="font-semibold mb-2">Endpoints</h4>
        <div className="border rounded-xl overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpoints.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-mono text-xs">{e.url}</TableCell>
                  <TableCell className="capitalize">{e.status}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" disabled={role !== "superadmin"}>Rotate Secret</Button>
                      </TooltipTrigger>
                      <TooltipContent>{role !== "superadmin" ? "Superadmin only (demo)" : "Demo only"}</TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="admin-card p-4 rounded-xl">
        <h4 className="font-semibold mb-2">Recent Deliveries</h4>
        <div className="border rounded-xl overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-mono text-xs">{d.event}</TableCell>
                  <TableCell>{d.ts}</TableCell>
                  <TableCell className="capitalize">{d.status}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" variant="outline" disabled={role !== "superadmin"}>Retry</Button>
                      </TooltipTrigger>
                      <TooltipContent>{role !== "superadmin" ? "Superadmin only (demo)" : "Demo only"}</TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TenantWebhooks;

