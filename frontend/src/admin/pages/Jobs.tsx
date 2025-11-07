import { useEffect, useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import StatusPill, { AdminStatusVariant } from "../components/StatusPill";
import type { AdminJob } from "../types";
import * as mock from "../mocks/mockService";
import type { ColumnDef } from "@tanstack/react-table";
import Drawer from "../components/Drawer";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Jobs = () => {
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<AdminJob | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => { mock.getJobs().then(setJobs); }, []);

  const onView = async (job: AdminJob) => {
    setSelected(job);
    setOpen(true);
    const l = await mock.mock.listJobLogs(job.id);
    setLogs(l as string[]);
  };

  const duration = (j: AdminJob) => {
    const start = new Date(j.startedAt).getTime();
    const end = new Date(j.finishedAt || Date.now()).getTime();
    const ms = Math.max(0, end - start);
    const mm = Math.floor(ms / 60000);
    const ss = Math.floor((ms % 60000) / 1000);
    return `${mm}m ${ss}s`;
  };

  const columns: ColumnDef<AdminJob>[] = [
    { accessorKey: "id", header: "Job ID" },
    { accessorKey: "tenantId", header: "Tenant" },
    { accessorKey: "source", header: "Source" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = String(row.original.status);
        const map: Record<string, AdminStatusVariant> = {
          queued: "syncing",
          running: "syncing",
          completed: "operational",
          failed: "down",
        };
        const v = map[s] || "degraded";
        return <StatusPill variant={v} />;
      },
    },
    { accessorKey: "startedAt", header: "Started" },
    { id: "duration", header: "Duration", cell: ({ row }) => duration(row.original) },
    { accessorKey: "retries", header: "Retries" },
    { id: "actions", header: "Actions", cell: ({ row }) => (<Button size="sm" variant="outline" onClick={() => onView(row.original)}>View</Button>) },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Jobs</h2>
      <DataTable columns={columns} data={jobs} />

      <Drawer open={open} onOpenChange={setOpen} title={selected ? `Job ${selected.id}` : "Job"}>
        {selected ? (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-muted-foreground">Tenant:</span> {selected.tenantId}</div>
              <div><span className="text-muted-foreground">Source:</span> {selected.source}</div>
              <div><span className="text-muted-foreground">Status:</span> {selected.status}</div>
              <div><span className="text-muted-foreground">Started:</span> {selected.startedAt}</div>
              <div><span className="text-muted-foreground">Finished:</span> {selected.finishedAt || "-"}</div>
              <div><span className="text-muted-foreground">Duration:</span> {duration(selected)}</div>
              <div><span className="text-muted-foreground">Retries:</span> {selected.retries}</div>
              {selected.error ? <div className="col-span-2"><span className="text-muted-foreground">Error:</span> {selected.error}</div> : null}
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Logs</div>
              <pre className="p-3 border rounded-xl bg-muted/40 text-xs overflow-auto" style={{ maxHeight: 280 }}>{logs.join("\n") || "No logs."}</pre>
            </div>
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" disabled>Retry</Button>
                </TooltipTrigger>
                <TooltipContent>Demo only</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="outline" disabled>Pause</Button>
                </TooltipTrigger>
                <TooltipContent>Demo only</TooltipContent>
              </Tooltip>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
};

export default Jobs;

