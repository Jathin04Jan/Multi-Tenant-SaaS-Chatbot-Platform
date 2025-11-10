import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../components/DataTable";
import StatusPill, { AdminStatusVariant } from "../components/StatusPill";
import type { AdminTenant } from "../types";
import * as mock from "../mocks/mockService";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const Tenants = () => {
  const [tenants, setTenants] = useState<AdminTenant[]>([]);
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();
  useEffect(() => { mock.getTenants().then(setTenants); }, []);

  const filtered = useMemo(() => {
    return tenants.filter((t) => (planFilter === "all" ? true : t.plan === planFilter) && (statusFilter === "all" ? true : t.status === (statusFilter as any)));
  }, [tenants, planFilter, statusFilter]);

  const columns: ColumnDef<AdminTenant>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8"><AvatarFallback>{row.original.name.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
          <div className="leading-tight">
            <Link to={`/admin/tenants/${row.original.id}/summary`} className="underline font-medium">{row.original.name}</Link>
            <div className="text-xs text-muted-foreground">{row.original.slug}</div>
          </div>
        </div>
      ),
    },
    { accessorKey: "plan", header: "Plan" },
    { accessorKey: "bots", header: "Bots" },
    { accessorKey: "usageMessages", header: "Usage (msgs)" },
    { accessorKey: "spendUsd", header: "Spend (USD)", cell: ({ row }) => `$${row.original.spendUsd.toFixed(2)}` },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = String(row.original.status);
        const map: Record<string, AdminStatusVariant> = {
          active: "operational",
          trial: "degraded",
          past_due: "degraded",
          suspended: "down",
        };
        return <StatusPill variant={map[s] || "degraded"} />;
      },
    },
    { accessorKey: "lastActivity", header: "Last Activity" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/admin/tenants/${row.original.id}/summary`)}>View</Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="outline" disabled>Impersonate</Button>
            </TooltipTrigger>
            <TooltipContent>Demo only</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="destructive" disabled>Suspend</Button>
            </TooltipTrigger>
            <TooltipContent>Demo only</TooltipContent>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Tenants</h2>
        <p className="text-sm text-muted-foreground">Global view of all tenants. Select a tenant to see its bots, billing, data sources, and security.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Plan" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="trial">Trial</SelectItem>
            <SelectItem value="past_due">Past Due</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={filtered} />
    </div>
  );
};

export default Tenants;

