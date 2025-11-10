import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import * as mock from "../../mocks/mockService";
import type { AdminBot } from "../../types";
import DataTable from "../../components/DataTable";
import Drawer from "../../components/Drawer";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";

const TenantBots = () => {
  const { tenantId } = useParams();
  const [bots, setBots] = useState<AdminBot[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<AdminBot | null>(null);
  useEffect(() => { if (tenantId) mock.getBotsByTenant(tenantId).then(setBots); }, [tenantId]);

  const columns: ColumnDef<AdminBot>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "model", header: "Model" },
    { accessorKey: "temperature", header: "Temp" },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge variant={row.original.status === "active" ? "secondary" : "outline"}>{row.original.status}</Badge> },
    { accessorKey: "errors24h", header: "Errors 24h" },
    { accessorKey: "successRate", header: "Success %" },
    { accessorKey: "lastDeploy", header: "Last Deploy" },
  ];

  const onRowClick = (bot: AdminBot) => { setSelected(bot); setOpen(true); };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Bots</h3>
      <div onClick={() => {}}>
        <DataTable columns={columns} data={bots} />
      </div>

      <Drawer open={open} onOpenChange={setOpen} title={selected ? selected.name : "Bot"}>
        <div className="space-y-2 text-sm">
          <div><span className="text-muted-foreground">Model:</span> {selected?.model}</div>
          <div><span className="text-muted-foreground">Temperature:</span> {selected?.temperature}</div>
          <div><span className="text-muted-foreground">Status:</span> {selected?.status}</div>
          <div><span className="text-muted-foreground">Last Deploy:</span> {selected?.lastDeploy}</div>
          <div><span className="text-muted-foreground">Errors 24h:</span> {selected?.errors24h}</div>
          <div><span className="text-muted-foreground">Success Rate:</span> {selected?.successRate}%</div>
          <div className="mt-2">
            <div className="text-xs text-muted-foreground mb-1">Config Preview</div>
            <pre className="p-3 border rounded-xl bg-muted/40 text-xs overflow-auto" style={{ maxHeight: 280 }}>{JSON.stringify(selected, null, 2)}</pre>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default TenantBots;

