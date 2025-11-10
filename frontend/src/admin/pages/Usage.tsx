import { useEffect, useMemo, useState } from "react";
import * as mock from "../mocks/mockService";
import type { UsageRow } from "../types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "../components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Usage = () => {
  const [data, setData] = useState<UsageRow[]>([]);
  const [timeframe, setTimeframe] = useState<string>("7");
  const [groupBy, setGroupBy] = useState<string>("tenant");
  useEffect(() => {
    mock.getUsage().then((u) => setData(u as unknown as UsageRow[]));
  }, []);

  const filtered = useMemo(() => {
    if (!data.length) return [] as UsageRow[];
    // timeframe in days from latest date
    const days = Number(timeframe);
    const maxDate = new Date(Math.max(...data.map((d) => new Date(d.date).getTime())));
    const minMs = maxDate.getTime() - days * 24 * 60 * 60 * 1000;
    return data.filter((d) => new Date(d.date).getTime() >= minMs);
  }, [data, timeframe]);

  type GroupKey = string;
  const groupLabel = (row: UsageRow): GroupKey => {
    if (groupBy === "tenant") return row.tenantId || "unknown";
    if (groupBy === "bot") return row.botId || "unknown";
    if (groupBy === "provider") return (row as any).provider || "unknown";
    return "unknown";
  };

  const breakdown = useMemo(() => {
    const map = new Map<GroupKey, { group: GroupKey; tokensIn: number; tokensOut: number; costUsd: number; latencyP50: number; latencyP90: number; latencyP99: number; count: number }>();
    for (const r of filtered) {
      const k = groupLabel(r);
      const prev = map.get(k) || { group: k, tokensIn: 0, tokensOut: 0, costUsd: 0, latencyP50: 0, latencyP90: 0, latencyP99: 0, count: 0 };
      prev.tokensIn += r.tokensIn || 0;
      prev.tokensOut += r.tokensOut || 0;
      prev.costUsd += r.costUsd || 0;
      prev.latencyP50 += r.latencyP50 || 0;
      prev.latencyP90 += r.latencyP90 || 0;
      prev.latencyP99 += r.latencyP99 || 0;
      prev.count += 1;
      map.set(k, prev);
    }
    // average latencies
    return Array.from(map.values()).map((v) => ({
      ...v,
      latencyP50: v.count ? Math.round(v.latencyP50 / v.count) : 0,
      latencyP90: v.count ? Math.round(v.latencyP90 / v.count) : 0,
      latencyP99: v.count ? Math.round(v.latencyP99 / v.count) : 0,
    }));
  }, [filtered, groupBy]);

  const columns: ColumnDef<(typeof breakdown)[number]>[] = [
    { accessorKey: "group", header: "Group" },
    { accessorKey: "tokensIn", header: "Tokens In" },
    { accessorKey: "tokensOut", header: "Tokens Out" },
    { accessorKey: "costUsd", header: "Cost ($)", cell: ({ row }) => row.original.costUsd.toFixed(2) },
    { accessorKey: "latencyP50", header: "P50 (ms)" },
    { accessorKey: "latencyP90", header: "P90 (ms)" },
    { accessorKey: "latencyP99", header: "P99 (ms)" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Timeframe" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
        <Select value={groupBy} onValueChange={setGroupBy}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Group by" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="tenant">Tenant</SelectItem>
            <SelectItem value="bot">Bot</SelectItem>
            <SelectItem value="provider">Provider</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="rounded-xl">
        <CardHeader><CardTitle className="text-base">Tokens In/Out</CardTitle></CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <AreaChart data={filtered} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="tokensIn" stroke="#82ca9d" fill="#82ca9d33" name="Tokens In" />
                <Area type="monotone" dataKey="tokensOut" stroke="#8884d8" fill="#8884d833" name="Tokens Out" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader><CardTitle className="text-base">Cost</CardTitle></CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={filtered} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="costUsd" fill="#10b981" name="Cost ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader><CardTitle className="text-base">Latency</CardTitle></CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <LineChart data={filtered} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="latencyP50" stroke="#0ea5e9" name="P50" />
                <Line type="monotone" dataKey="latencyP90" stroke="#f59e0b" name="P90" />
                <Line type="monotone" dataKey="latencyP99" stroke="#ef4444" name="P99" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="admin-card p-4 rounded-xl">
        <h3 className="font-semibold mb-2">Breakdown</h3>
        <DataTable columns={columns} data={breakdown} />
      </div>
    </div>
  );
};

export default Usage;

