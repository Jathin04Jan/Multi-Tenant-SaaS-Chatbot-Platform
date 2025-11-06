import React, { useState, useEffect } from 'react';
import { FileText, Database, ArrowRight, Bot, Activity, MessageCircle, CheckCircle2, AlertCircle, Clock, Zap, Bell, Settings, Link as LinkIcon, TrendingUp, Users, Shield, RefreshCw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserStore } from '@/store/user';
import { useWizardStore } from '@/store/wizard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { EmbedCodeDialog } from '@/components/EmbedCodeDialog';
import { apiRequest } from '@/lib/api';

interface UserData {
  full_name: string;
  email: string;
}

const Overview = () => {
  const userName = useUserStore((state) => state.userName);
  const { completedSteps } = useWizardStore();
  const [embedDialogOpen, setEmbedDialogOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiRequest<UserData>('/api/v1/auth/me', {
          method: 'GET',
        });
        
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        // Silently fail - use fallback
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  
  // Check if onboarding is complete (all 5 steps completed)
  const isOnboardingComplete = completedSteps instanceof Set 
    ? completedSteps.size >= 5 && [1, 2, 3, 4, 5].every(step => completedSteps.has(step))
    : Array.isArray(completedSteps) 
    ? (completedSteps as number[]).length >= 5 && [1, 2, 3, 4, 5].every(step => (completedSteps as number[]).includes(step))
    : false;

  // Recent activity feed
  const recentActivity = [
    { id: 1, type: 'conversation', message: 'New conversation started', time: '2 minutes ago', icon: MessageCircle, color: 'text-blue-500' },
    { id: 2, type: 'document', message: 'Document indexed successfully', time: '15 minutes ago', icon: FileText, color: 'text-green-500' },
    { id: 3, type: 'update', message: 'Bot configuration updated', time: '1 hour ago', icon: Settings, color: 'text-purple-500' },
    { id: 4, type: 'integration', message: 'New data source connected', time: '3 hours ago', icon: LinkIcon, color: 'text-orange-500' },
  ];

  // Recent conversations preview
  const recentConversations = [
    { id: 1, user: 'User_123', preview: 'How do I reset my password?', time: '2 min ago', status: 'resolved' },
    { id: 2, user: 'User_456', preview: 'What are your business hours?', time: '5 min ago', status: 'active' },
    { id: 3, user: 'User_789', preview: 'I need help with my account...', time: '12 min ago', status: 'resolved' },
  ];

  // System status
  const systemStatus = [
    { name: 'API Status', status: 'operational', icon: CheckCircle2, color: 'text-green-500' },
    { name: 'Vector DB', status: 'operational', icon: Database, color: 'text-green-500' },
    { name: 'LLM Service', status: 'operational', icon: Bot, color: 'text-green-500' },
    { name: 'Data Sync', status: 'syncing', icon: RefreshCw, color: 'text-yellow-500' },
  ];

  // Quick actions - use management pages if onboarding is complete
  const quickActions = [
    {
      title: isOnboardingComplete ? 'Manage Documents' : 'Resume Onboarding',
      description: isOnboardingComplete ? 'Manage your knowledge base' : 'Complete your bot setup',
      href: isOnboardingComplete ? '/dashboard/knowledge' : '/dashboard/onboarding',
      icon: isOnboardingComplete ? FileText : ArrowRight,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      onClick: undefined,
    },
    {
      title: 'Manage Data Sources',
      description: isOnboardingComplete ? 'Configure data sources' : 'Add data sources',
      href: isOnboardingComplete ? '/dashboard/sources' : '/dashboard/onboarding/data',
      icon: Database,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      onClick: undefined,
    },
    {
      title: 'Configure Bot',
      description: 'Customize bot settings',
      href: '/dashboard/agents',
      icon: Settings,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      onClick: undefined,
    },
    {
      title: isOnboardingComplete ? 'View Embed Code' : 'Start Setup',
      description: isOnboardingComplete ? 'Get installation snippet' : 'Begin bot configuration',
      href: isOnboardingComplete ? undefined : '/dashboard/onboarding',
      icon: isOnboardingComplete ? LinkIcon : Bot,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      onClick: isOnboardingComplete ? () => setEmbedDialogOpen(true) : undefined,
    },
  ];

  return (
    <div className="container max-w-7xl px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Overview</h1>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <p className="text-lg text-muted-foreground">
              Welcome back,{' '}
              <span className="font-semibold text-foreground">
                {userData?.full_name || userName || 'there'}
              </span>
              ! Here's your workspace at a glance.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Separator */}
      <div className="border-t border-[hsl(40_20%_75%)] dark:hidden" />

      {/* Main Content */}
      <div className="rounded-2xl bg-card p-6 mt-4 space-y-8">
        {/* Bot Status & Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Bot Status
            </h2>
            <Badge variant="default" className="rounded-full">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              All Systems Operational
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {systemStatus.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                className="p-4 rounded-xl bg-muted/30 border border-border/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <Badge variant="secondary" className="text-xs mt-1">
                  {item.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const ActionWrapper = action.onClick 
                ? ({ children }: { children: React.ReactNode }) => (
                    <div onClick={action.onClick} className="cursor-pointer">
                      {children}
                    </div>
                  )
                : ({ children }: { children: React.ReactNode }) => (
                    <Link to={action.href!}>
                      {children}
                    </Link>
                  );

              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <ActionWrapper>
                    <div className="glass-card p-5 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group border border-border/50">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 rounded-xl ${action.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <action.icon className={`w-6 h-6 ${action.color}`} />
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="font-semibold mb-1 text-sm">{action.title}</h3>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </ActionWrapper>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="glass-card p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Recent Activity
              </h2>
              <Button variant="ghost" size="sm" className="text-xs rounded-lg">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
                >
                  <div className={`w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 ${activity.color} group-hover:scale-110 transition-transform`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Conversations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="glass-card p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Recent Conversations
              </h2>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-xs rounded-lg">
                  View All
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentConversations.map((conv, idx) => (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                  className="p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{conv.user}</div>
                        <div className="text-xs text-muted-foreground">{conv.time}</div>
                      </div>
                    </div>
                    <Badge 
                      variant={conv.status === 'resolved' ? 'default' : 'secondary'} 
                      className="text-xs rounded-full"
                    >
                      {conv.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{conv.preview}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Performance Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="glass-card p-6 rounded-xl"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Performance Highlights
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Success Rate</span>
              </div>
              <div className="text-2xl font-bold mb-1">94.2%</div>
              <Progress value={94.2} className="h-2 mt-2" />
              <div className="text-xs text-muted-foreground mt-1">Questions answered correctly</div>
            </div>
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Avg Session</span>
              </div>
              <div className="text-2xl font-bold mb-1">4.2 min</div>
              <div className="text-xs text-muted-foreground mt-1">Average conversation duration</div>
            </div>
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Active Users</span>
              </div>
              <div className="text-2xl font-bold mb-1">1.2K</div>
              <div className="text-xs text-muted-foreground mt-1">Users this week</div>
            </div>
          </div>
        </motion.div>

        {/* Getting Started Guide (for new users) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="glass-card p-6 rounded-xl border-2 border-primary/20 bg-primary/5"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Getting Started</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                New to the platform? Follow these steps to set up your chatbot and start engaging with users.
              </p>
              <div className="space-y-2">
                {[
                  { step: 1, text: 'Configure your bot\'s personality and branding', done: true },
                  { step: 2, text: 'Add knowledge base documents', done: true },
                  { step: 3, text: 'Test your chatbot', done: false },
                  { step: 4, text: 'Deploy to your website', done: false },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                    {item.done ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground shrink-0" />
                    )}
                    <span className={`text-sm ${item.done ? 'line-through text-muted-foreground' : ''}`}>
                      {item.step}. {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <Link to={isOnboardingComplete ? "/dashboard/knowledge" : "/dashboard/onboarding"}>
              <Button className="rounded-xl ml-4">
                {isOnboardingComplete ? "Manage Knowledge" : "Continue Setup"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Embed Code Dialog */}
      <EmbedCodeDialog open={embedDialogOpen} onOpenChange={setEmbedDialogOpen} />
    </div>
  );
};

export default Overview;
