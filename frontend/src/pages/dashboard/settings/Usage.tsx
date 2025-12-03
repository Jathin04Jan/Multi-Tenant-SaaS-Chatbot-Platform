import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Filter, Download, X, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockGetSubscription, type SubscriptionDTO } from '@/lib/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const formatNumber = (value: number, options?: Intl.NumberFormatOptions) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 0, ...options });

const formatCompact = (value: number, decimals: number = 1): string => {
  if (value >= 1000000) {
    const mValue = value / 1000000;
    return `${mValue.toFixed(decimals)}M`;
  }
  if (value >= 1000) {
    const kValue = value / 1000;
    return `${kValue.toFixed(decimals)}K`;
  }
  return formatNumber(value);
};

interface UsageRecord {
  id: string;
  dateTime: string;
  requests?: number;
  tokens: number;
  endpoint?: string;
  description: string;
}

const Usage = () => {
  const [sub, setSub] = useState<SubscriptionDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [hourlyView, setHourlyView] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchSubscription = useCallback(() => {
    setLoading(true);
    mockGetSubscription().then((r) => {
      setSub(r.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  // Mock usage records
  const usageRecords: UsageRecord[] = [
    {
      id: '1',
      dateTime: '2025 Dec 2nd 15:13',
      tokens: 10000000,
      description: 'Free tokens in every new API key',
    },
  ];

  const planAnalytics = sub
    ? (() => {
        const usage = sub.usage;
        const totalRequests = usage.messages;
        const totalTokens = usage.messagesLimit * 420;
        const sevenDayVolume = Math.min(totalRequests, 150);
        const avgRpm = Math.max(0, Math.round(totalRequests / 60));
        const medianRpm = Math.max(0, Math.floor(avgRpm * 0.8));
        const p90Rpm = Math.max(0, Math.round(avgRpm * 1.4));
        const p99Rpm = Math.max(0, Math.round(avgRpm * 1.8));
        const minRpm = avgRpm > 0 ? Math.max(0, avgRpm - 3) : 0;
        const maxRpm = Math.max(avgRpm * 2, 1);

        return {
          totalTokens: totalTokens,
          totalRequests: totalRequests,
          avgRpm,
          medianRpm,
          p90Rpm,
          p99Rpm,
          minRpm,
          maxRpm,
          sevenDayVolume,
        };
      })()
    : null;

  const totalPages = Math.ceil(usageRecords.length / recordsPerPage);
  const paginatedRecords = usageRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="container max-w-7xl px-4 py-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">Usage</h1>
          <p className="text-muted-foreground">Monitor your API usage and performance metrics</p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Section - Usage Table */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Usage in last 7 days</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={fetchSubscription}
                className="rounded-full"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Data is not in real-time and can be few minutes delayed.
            </p>

            <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter by attribute
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date time</TableHead>
                    <TableHead>Requests</TableHead>
                    <TableHead>Tokens</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No usage records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <ChevronUp className="w-3 h-3 text-green-500" />
                            <span>{record.dateTime}</span>
                          </div>
                        </TableCell>
                        <TableCell>{record.requests ?? '-'}</TableCell>
                        <TableCell>{formatCompact(record.tokens)}</TableCell>
                        <TableCell>{record.endpoint ?? '-'}</TableCell>
                        <TableCell>{record.description}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Records per page:</span>
                <Select value={recordsPerPage.toString()} onValueChange={(v) => setRecordsPerPage(Number(v))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                {paginatedRecords.length > 0
                  ? `${(currentPage - 1) * recordsPerPage + 1}-${Math.min(
                      currentPage * recordsPerPage,
                      usageRecords.length
                    )} of ${usageRecords.length}`
                  : '0-0 of 0'}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Section - Summary Metrics */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Hourly view</span>
                <Switch checked={hourlyView} onCheckedChange={setHourlyView} />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  EXPORT AS CSV
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {planAnalytics && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    Total tokens since created
                  </p>
                  <p className="text-2xl font-bold">{formatCompact(planAnalytics.totalTokens)}</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    Total requests since created
                  </p>
                  <p className="text-2xl font-bold">{formatCompact(planAnalytics.totalRequests)}</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    Average RPM
                  </p>
                  <p className="text-2xl font-bold">{formatCompact(planAnalytics.avgRpm)}</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    Median RPM
                  </p>
                  <p className="text-2xl font-bold">{formatCompact(planAnalytics.medianRpm)}</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    90th percentile RPM
                  </p>
                  <p className="text-2xl font-bold">{formatCompact(planAnalytics.p90Rpm)}</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    99th percentile RPM
                  </p>
                  <p className="text-2xl font-bold">{formatCompact(planAnalytics.p99Rpm)}</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    Min RPM
                  </p>
                  <p className="text-2xl font-bold">{formatCompact(planAnalytics.minRpm)}</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    Max RPM
                  </p>
                  <p className="text-2xl font-bold">{formatCompact(planAnalytics.maxRpm)}</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    Total in the last 7 days
                  </p>
                  <p className="text-2xl font-bold">{formatCompact(planAnalytics.sevenDayVolume)}</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Usage;

