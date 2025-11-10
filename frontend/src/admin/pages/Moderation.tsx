import { useEffect, useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import type { AdminModerationItem } from "../types";
import * as mock from "../mocks/mockService";
import type { ColumnDef } from "@tanstack/react-table";
import Drawer from "../components/Drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const Moderation = () => {
  const [items, setItems] = useState<AdminModerationItem[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [tenant, setTenant] = useState<string>("all");
  const [action, setAction] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<AdminModerationItem | null>(null);
  useEffect(() => { mock.getModeration().then(setItems); }, []);

  const filtered = useMemo(() => items.filter((i) => (category === "all" ? true : i.category === category) && (tenant === "all" ? true : i.tenantId === tenant) && (action === "all" ? true : i.action === action)), [items, category, tenant, action]);

  const columns: ColumnDef<AdminModerationItem>[] = [
    { accessorKey: "createdAt", header: "Time" },
    { accessorKey: "tenantId", header: "Tenant" },
    { accessorKey: "botId", header: "Bot" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "action", header: "Action" },
    { accessorKey: "messagePreview", header: "Preview" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Moderation</h2>
      <div className="flex flex-wrap items-center gap-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="toxicity">Toxicity</SelectItem>
            <SelectItem value="pii">PII</SelectItem>
            <SelectItem value="self-harm">Self-harm</SelectItem>
            <SelectItem value="jailbreak">Jailbreak</SelectItem>
          </SelectContent>
        </Select>
        <Select value={tenant} onValueChange={setTenant}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Tenant" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tenants</SelectItem>
            {[...new Set(items.map((i) => i.tenantId))].map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={action} onValueChange={setAction}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Action" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={filtered} onRowClick={(row) => { setSelected(row); setOpen(true); }} />

      <Drawer open={open} onOpenChange={setOpen} title={selected ? `${selected.category} – ${selected.action}` : "Event"}>
        {selected ? (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-muted-foreground">Time:</span> {selected.createdAt}</div>
              <div><span className="text-muted-foreground">Tenant:</span> {selected.tenantId}</div>
              <div><span className="text-muted-foreground">Bot:</span> {selected.botId}</div>
              <div><span className="text-muted-foreground">Category:</span> {selected.category}</div>
              <div><span className="text-muted-foreground">Action:</span> {selected.action}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Message Context</div>
              <pre className="p-3 border rounded-xl bg-muted/40 text-xs overflow-auto" style={{ maxHeight: 240 }}>{JSON.stringify(selected, null, 2)}</pre>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" disabled>Resolve</Button>
              </TooltipTrigger>
              <TooltipContent>Demo only</TooltipContent>
            </Tooltip>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
};

export default Moderation;

