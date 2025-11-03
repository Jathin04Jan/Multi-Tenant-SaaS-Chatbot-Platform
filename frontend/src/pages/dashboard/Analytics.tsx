import { CalendarIcon, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Analytics = () => {
  // Safari compatibility: ensure animations work
  useEffect(() => {
    // Force reflow to ensure Safari renders correctly
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        document.body.offsetHeight;
      });
    }
  }, []);

  // Date range options (ascending granularity)
  const ranges = [
    { id: '10h', label: 'Last 10 hours' },
    { id: '24h', label: 'Last 24 hours' },
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '3m', label: 'Last 3 months' },
    { id: '6m', label: 'Last 6 months' },
    { id: '12m', label: 'Last 12 months' },
  ] as const;

  const [selectedRange, setSelectedRange] = useState<typeof ranges[number]>(ranges[3]);

  return (
    <div className="container max-w-7xl px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Track conversations, sentiment, and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-xl glass">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {selectedRange.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass">
              <DropdownMenuLabel>Date range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ranges.map((r) => (
                <DropdownMenuItem
                  key={r.id}
                  onClick={() => setSelectedRange(r)}
                  className="justify-between"
                >
                  {r.label}
                  {selectedRange.id === r.id && <Check className="w-4 h-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="rounded-xl glass" disabled>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Placeholder charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Conversations Over Time</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Line chart placeholder
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Sentiment Distribution</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Pie chart placeholder
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold mb-4">Top Questions</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Bar chart placeholder
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="glass-card p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold mb-4">Unanswered Questions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Question</th>
                  <th className="text-left py-3 px-4 font-medium">Frequency</th>
                  <th className="text-left py-3 px-4 font-medium">Last Asked</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm">How do I reset my password?</td>
                  <td className="py-3 px-4 text-sm">47</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">2 hours ago</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm">What are your business hours?</td>
                  <td className="py-3 px-4 text-sm">32</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">5 hours ago</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">Do you offer refunds?</td>
                  <td className="py-3 px-4 text-sm">28</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">1 day ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
