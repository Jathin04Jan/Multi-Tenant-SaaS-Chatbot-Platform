import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import type { AdminAuditLog } from "../types";
import * as mock from "../mocks/mockService";
import type { ColumnDef } from "@tanstack/react-table";
import Drawer from "../components/Drawer";
import JsonDiffView from "../components/JsonDiffView";
import { useCurrentAdmin } from "../useCurrentAdmin";
import { Badge } from "@/components/ui/badge";

const Audit = () => {
  const [logs, setLogs] = useState<AdminAuditLog[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<AdminAuditLog | null>(null);
  useEffect(() => { mock.getAudit().then(setLogs); }, []);
  const admin = useCurrentAdmin();

  const columns: ColumnDef<AdminAuditLog>[] = [
    { accessorKey: "ts", header: "Time" },
    { accessorKey: "actor", header: "Actor" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "scope", header: "Scope" },
    { accessorKey: "tenantId", header: "Tenant" },
    { accessorKey: "action", header: "Action" },
    { accessorKey: "ip", header: "IP" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">Audit Logs</h2>
        {admin.role !== "superadmin" ? <Badge variant="outline">superadmin only</Badge> : null}
      </div>
      <DataTable columns={columns} data={logs} onRowClick={(row) => { setSelected(row); setOpen(true); }} />

      <Drawer open={open} onOpenChange={setOpen} title={selected ? `${selected.action}` : "Event"}>
        {selected ? (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-muted-foreground">Time:</span> {selected.ts}</div>
              <div><span className="text-muted-foreground">Actor:</span> {selected.actor}</div>
              <div><span className="text-muted-foreground">Role:</span> {selected.role}</div>
              <div><span className="text-muted-foreground">Scope:</span> {selected.scope}</div>
              <div><span className="text-muted-foreground">Tenant:</span> {selected.tenantId || '-'}</div>
              <div><span className="text-muted-foreground">IP:</span> {selected.ip}</div>
            </div>
            <JsonDiffView left={selected.before} right={selected.after} />
          </div>
        ) : null}
      </Drawer>
    </div>
  );
};

export default Audit;

