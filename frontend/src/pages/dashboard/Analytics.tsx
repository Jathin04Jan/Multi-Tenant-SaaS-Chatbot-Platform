import { CalendarIcon, Download, Check, MessageSquare, Clock, FileText, Database, TrendingUp, TrendingDown, ArrowUpRight, Sparkles, Zap, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/user';
import { useWizardStore } from '@/store/wizard';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Analytics = () => {
  const userName = useUserStore((state) => state.userName);
  const navigate = useNavigate();
  const { completedSteps } = useWizardStore();
  
  // Check if onboarding is complete (all 5 steps completed)
  const isOnboardingComplete = completedSteps instanceof Set 
    ? completedSteps.size >= 5 && [1, 2, 3, 4, 5].every(step => completedSteps.has(step))
    : Array.isArray(completedSteps) 
    ? (completedSteps as number[]).length >= 5 && [1, 2, 3, 4, 5].every(step => (completedSteps as number[]).includes(step))
    : false;
  
  // Safari compatibility: ensure animations work
  useEffect(() => {
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

  // Enhanced stats with better data structure
  const stats = [
    { 
      name: 'Total Chats', 
      icon: MessageSquare, 
      value: '1,247', 
      change: '+12%', 
      trend: 'up',
      description: 'This period',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    { 
      name: 'Avg Response Time', 
      icon: Clock, 
      value: '2.3s', 
      change: '-8%', 
      trend: 'down',
      description: 'Faster than last period',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    { 
      name: 'Docs Indexed', 
      icon: FileText, 
      value: '87', 
      change: '+5', 
      trend: 'up',
      description: 'New documents',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    { 
      name: 'Active Sources', 
      icon: Database, 
      value: '12', 
      change: '+2', 
      trend: 'up',
      description: 'Connected sources',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ] as const;

  return (
    <div className="container max-w-7xl px-4 py-8 space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <Badge variant="secondary" className="rounded-full">
              <Sparkles className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            Welcome back{userName ? `, ${userName}` : ''}! Here's what's happening with your chatbot.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-xl glass hover:bg-muted/50 transition-colors">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {selectedRange.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass rounded-xl">
              <DropdownMenuLabel>Date range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ranges.map((r) => (
                <DropdownMenuItem
                  key={r.id}
                  onClick={() => setSelectedRange(r)}
                  className="justify-between rounded-lg cursor-pointer"
                >
                  {r.label}
                  {selectedRange.id === r.id && <Check className="w-4 h-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="rounded-xl glass hover:bg-muted/50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="group relative glass-card p-6 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  )}
                  <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-green-500'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground mb-1">{stat.name}</div>
              <div className="text-xs text-muted-foreground/70">{stat.description}</div>
            </div>
            
            {/* Hover indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Conversations Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Conversations Over Time</h3>
              <p className="text-sm text-muted-foreground">Daily conversation volume</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-lg">
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Chart visualization</div>
                <div className="text-xs text-muted-foreground/70">Connect your analytics to see real-time data</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sentiment Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Sentiment Analysis</h3>
              <p className="text-sm text-muted-foreground">User sentiment breakdown</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-lg">
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="text-2xl">😊</span>
                </div>
                <div className="text-sm font-medium">72%</div>
                <div className="text-xs text-muted-foreground">Positive</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <span className="text-2xl">😐</span>
                </div>
                <div className="text-sm font-medium">18%</div>
                <div className="text-xs text-muted-foreground">Neutral</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-2xl">😞</span>
                </div>
                <div className="text-sm font-medium">10%</div>
                <div className="text-xs text-muted-foreground">Negative</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="glass-card p-6 rounded-2xl lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Top Questions</h3>
              <p className="text-sm text-muted-foreground">Most frequently asked questions</p>
            </div>
            <Button variant="ghost" size="sm" className="rounded-lg">
              View All
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { question: 'How do I reset my password?', count: 47, trend: 'up' },
              { question: 'What are your business hours?', count: 32, trend: 'up' },
              { question: 'Do you offer refunds?', count: 28, trend: 'down' },
              { question: 'How can I contact support?', count: 24, trend: 'up' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">{item.question}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.count} times
                    </Badge>
                    {item.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Unanswered Questions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="glass-card p-6 rounded-2xl lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Unanswered Questions</h3>
              <p className="text-sm text-muted-foreground">Questions that need attention</p>
            </div>
            <Badge variant="destructive" className="rounded-full">
              3 urgent
            </Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Question</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Frequency</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Last Asked</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { question: 'How do I reset my password?', frequency: 47, lastAsked: '2 hours ago', urgent: true },
                  { question: 'What are your business hours?', frequency: 32, lastAsked: '5 hours ago', urgent: false },
                  { question: 'Do you offer refunds?', frequency: 28, lastAsked: '1 day ago', urgent: false },
                ].map((row, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{row.question}</span>
                        {row.urgent && (
                          <Badge variant="destructive" className="text-xs rounded-full">
                            Urgent
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{row.frequency}</span>
                        <TrendingUp className="w-3 h-3 text-muted-foreground" />
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{row.lastAsked}</td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm" className="rounded-lg">
                        Add Answer
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="glass-card p-6 rounded-2xl"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              label: 'Manage Documents', 
              icon: FileText, 
              color: 'text-blue-500', 
              bgColor: 'bg-blue-500/10',
              href: isOnboardingComplete ? '/dashboard/knowledge' : '/dashboard/onboarding/data'
            },
            { 
              label: 'Configure Bot', 
              icon: Settings, 
              color: 'text-purple-500', 
              bgColor: 'bg-purple-500/10',
              href: '/dashboard/agents'
            },
            { 
              label: 'Manage Data Sources', 
              icon: Database, 
              color: 'text-green-500', 
              bgColor: 'bg-green-500/10',
              href: isOnboardingComplete ? '/dashboard/sources' : '/dashboard/onboarding/data'
            },
          ].map((action, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(action.href)}
              className={`p-4 rounded-xl ${action.bgColor} hover:opacity-80 transition-all text-left group cursor-pointer`}
            >
              <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className={`w-5 h-5 ${action.color}`} />
              </div>
              <div className="font-medium text-sm">{action.label}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
