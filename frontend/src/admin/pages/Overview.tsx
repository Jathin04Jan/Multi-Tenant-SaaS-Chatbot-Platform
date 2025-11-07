import { MessageSquare, Users, Cloud, Activity, Database, Webhook, BrainCircuit } from "lucide-react";
import KpiCard from "../components/KpiCard";
import DataTable from "../components/DataTable";
import TrendSparkline from "../components/TrendSparkline";
import StatusPill, { AdminStatusVariant } from "../components/StatusPill";
import * as mock from "../mocks/mockService";
import { useEffect, useState } from "react";
import type { AdminJob, AdminTenant, UsageRow, AdminBot } from "../types";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Overview = () => {
  const [tenants, setTenants] = useState<AdminTenant[]>([]);
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [trend, setTrend] = useState<UsageRow[]>([]);
  const [bots, setBots] = useState<AdminBot[]>([]);

  useEffect(() => {
    mock.getTenants().then(setTenants);
    mock.getJobs().then(setJobs);
    mock.getUsage().then((u) => setTrend(u as unknown as UsageRow[]));
    mock.mock.listBots().then((b) => setBots(b as unknown as AdminBot[]));
  }, []);

  const totalTenants = tenants.length;
  const activeJobs = jobs.filter((j) => j.status === "running" || j.status === "queued").length;
  const totalChats = tenants.reduce((acc, t) => acc + (t as any).usageMessages, 0);
  const avgLatency = trend.length ? Math.round(trend.reduce((a, b) => a + (b.latencyP50 || 0), 0) / trend.length) : 0;
  const avgSuccess = bots.length ? Math.round(bots.reduce((a, b) => a + (b.successRate || 0), 0) / bots.length) : 0;
  const totalCost = trend.reduce((a, b) => a + (b.costUsd || 0), 0);
  const lastFinishedJob = jobs
    .map((j) => j.finishedAt || j.startedAt)
    .filter(Boolean)
    .sort()
    .slice(-1)[0];
  const indexFreshnessHrs = lastFinishedJob ? Math.max(0, Math.round((Date.now() - new Date(lastFinishedJob).getTime()) / 36e5)) : 0;

  const jobColumns: ColumnDef<AdminJob>[] = [
    { accessorKey: "id", header: "Job ID" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "tenantId", header: "Tenant" },
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
    { accessorKey: "createdAt", header: "Created" },
  ];

  const alerts: { id: string; text: string }[] = [
    { id: "al-1", text: "Vector sync delay detected for tenant t-005 (EU region)." },
    { id: "al-2", text: "Moderation spike: toxicity flags up 40% in last 24h." },
  ];

  const statusTiles: { label: string; icon: React.ReactNode; variant: AdminStatusVariant }[] = [
    { label: "API", icon: <Activity className="w-4 h-4" />, variant: "operational" },
    { label: "Vector DB", icon: <Database className="w-4 h-4" />, variant: "syncing" },
    { label: "LLM", icon: <BrainCircuit className="w-4 h-4" />, variant: "operational" },
    { label: "Webhooks", icon: <Webhook className="w-4 h-4" />, variant: "degraded" },
  ];

  return (
    <div className="space-y-6">
      {/* Status tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statusTiles.map((t) => (
          <div key={t.label} className="admin-card p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {t.icon}
              <span>{t.label}</span>
            </div>
            <StatusPill variant={t.variant} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Tenants" value={totalTenants} icon={<Users className="w-4 h-4" />} />
        <KpiCard label="Total Chats" value={totalChats.toLocaleString()} icon={<MessageSquare className="w-4 h-4" />} />
        <KpiCard label="Avg Latency" value={`${avgLatency}ms`} icon={<Activity className="w-4 h-4" />} />
        <KpiCard label="Success Rate" value={`${avgSuccess}%`} icon={<Cloud className="w-4 h-4" />} />
        <KpiCard label="Index Freshness" value={`${indexFreshnessHrs}h`} icon={<Database className="w-4 h-4" />} />
        <KpiCard label="Cost" value={`$${totalCost.toFixed(2)}`} icon={<Cloud className="w-4 h-4" />} />
      </div>

      <div className="admin-card p-4 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Traffic Trend</h3>
        </div>
        <TrendSparkline data={trend} dataKey="tokensOut" xKey="date" />
      </div>

      {/* Alerts and Quick actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="admin-card p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-3">Alerts</h3>
          <ul className="space-y-2 text-sm">
            {alerts.map((a) => (
              <li key={a.id} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-destructive" />
                <span>{a.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="admin-card p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { key: "qa1", label: "Create Tenant" },
              { key: "qa2", label: "Impersonate" },
              { key: "qa3", label: "Pause Indexing" },
            ].map((q) => (
              <Tooltip key={q.key}>
                <TooltipTrigger asChild>
                  <Button disabled variant="outline" size="sm">{q.label}</Button>
                </TooltipTrigger>
                <TooltipContent>Demo only</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-card p-4 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Recent Jobs</h3>
        <DataTable columns={jobColumns} data={jobs.slice(0, 6)} />
      </div>
    </div>
  );
};

export default Overview;

