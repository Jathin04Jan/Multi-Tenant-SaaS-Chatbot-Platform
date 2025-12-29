import { useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { FileText, Database, ArrowRight, Bot, Activity, MessageCircle, CheckCircle2, Clock, Zap, Bell, Settings, Link as LinkIcon, TrendingUp, Users, Shield, RefreshCw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserStore } from '@/store/user';
import { useWizardStore } from '@/store/wizard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StatCard } from '@/components/ui/stat-card';
import { SectionHeader } from '@/components/ui/section-header';
import { ListRow } from '@/components/ui/list-row';
import { Card, CardContent } from '@/components/ui/card';
import { PageContainer } from '@/components/ui/page-container';
import { PageSection } from '@/components/ui/page-section';
import { EmbedCodeDialog } from '@/components/EmbedCodeDialog';
import { apiRequest, getBots, type BotDTO } from '@/lib/api';

interface UserData {
  full_name: string;
  email: string;
}

const Overview = () => {
  const userName = useUserStore((state) => state.userName);
  const { completedSteps } = useWizardStore();
  const [embedDialogOpen, setEmbedDialogOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [bots, setBots] = useState<BotDTO[]>([]);
  const [botsLoading, setBotsLoading] = useState(true);
  const [botsError, setBotsError] = useState<string | null>(null);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiRequest<UserData>('/auth/me', {
          method: 'GET',
        });
        
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        // Silently fail - use fallback
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchBots = async () => {
      try {
        setBotsLoading(true);
        const response = await getBots();

        if (!isMounted) return;

        if (response.error) {
          setBots([]);
          setBotsError(response.error);
          return;
        }

        setBots(response.data || []);
        setBotsError(null);
      } catch (error) {
        if (!isMounted) return;
        setBots([]);
        setBotsError(error instanceof Error ? error.message : 'Failed to load bots');
      } finally {
        if (isMounted) {
          setBotsLoading(false);
        }
      }
    };

    fetchBots();

    return () => {
      isMounted = false;
    };
  }, []);
  
  // Check if onboarding is complete (all 5 steps completed)
  const isOnboardingComplete = completedSteps instanceof Set 
    ? completedSteps.size >= 5 && [1, 2, 3, 4, 5].every(step => completedSteps.has(step))
    : Array.isArray(completedSteps) 
    ? (completedSteps as number[]).length >= 5 && [1, 2, 3, 4, 5].every(step => (completedSteps as number[]).includes(step))
    : false;

  const totalConversations = useMemo(
    () => bots.reduce((sum, bot) => sum + (bot.conversations_count ?? 0), 0),
    [bots]
  );

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
    <PageContainer className="py-8">
      <PageSection>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <SectionHeader
            title="Home"
            subtitle={
              <>
                Welcome back,{' '}
                <span className="font-semibold text-foreground">
                  {userData?.full_name || userName || 'there'}
                </span>
                ! Here's your workspace at a glance.
              </>
            }
            icon={Sparkles}
          />
        </motion.div>

        {/* Separator */}
        <div className="divider" />
        {/* Bot Status & Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card variant="default" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <SectionHeader
                title="Bot Status"
                icon={Activity}
                className="!mb-0"
              />
              <Badge variant="success">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                All Systems Operational
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {systemStatus.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                  className="p-4 rounded-lg bg-card border border-border/60 hover:border-primary/30 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-body-sm font-medium">{item.name}</span>
                  </div>
                  <Badge variant={item.status === 'operational' ? 'success' : 'warning'} className="text-small">
                    {item.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <SectionHeader
            title="Quick Actions"
            icon={Zap}
            className="mb-6"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const ActionWrapper = action.onClick 
                ? ({ children }: { children: ReactNode }) => (
                    <div onClick={action.onClick} className="cursor-pointer">
                      {children}
                    </div>
                  )
                : ({ children }: { children: ReactNode }) => (
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
                  whileHover={{ scale: 1.01, y: -1 }}
                >
                  <ActionWrapper>
                    <Card variant="default" className="p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 rounded-lg ${action.bgColor} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                          <action.icon className={`w-6 h-6 ${action.color}`} />
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="text-h4 font-semibold mb-1">{action.title}</h3>
                      <p className="text-body-sm text-muted-foreground">{action.description}</p>
                    </Card>
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
          >
            <Card variant="default" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <SectionHeader
                  title="Recent Activity"
                  icon={Bell}
                  className="!mb-0"
                />
                <Button variant="ghost" size="sm" className="rounded-lg">
                  View All
                </Button>
              </div>
              <div className="space-y-2">
                {recentActivity.map((activity, idx) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                  >
                    <ListRow
                      icon={activity.icon}
                      iconColor={activity.color}
                      title={activity.message}
                      time={activity.time}
                      onClick={() => {}}
                    />
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recent Conversations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card variant="default" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <SectionHeader
                  title="Recent Conversations"
                  icon={MessageCircle}
                  className="!mb-0"
                />
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="rounded-lg">
                    View All
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-2">
                {recentConversations.map((conv, idx) => (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                  >
                    <Card variant="outline" className="p-4 hover:border-primary/30 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-body-sm font-medium">{conv.user}</div>
                            <div className="text-small text-muted-foreground">{conv.time}</div>
                          </div>
                        </div>
                        <Badge 
                          variant={conv.status === 'resolved' ? 'success' : 'neutral'} 
                          className="text-small"
                        >
                          {conv.status}
                        </Badge>
                      </div>
                      <p className="text-body-sm text-muted-foreground">{conv.preview}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Performance Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Card variant="default" className="p-6">
            <SectionHeader
              title="Performance Highlights"
              icon={TrendingUp}
              className="mb-6"
            />
            <div className="grid md:grid-cols-3 gap-4">
              <StatCard
                label="Success Rate"
                value="94.2%"
                hint="Questions answered correctly"
                icon={Shield}
              />
              <StatCard
                label="Avg Session"
                value="4.2 min"
                hint="Average conversation duration"
                icon={Clock}
              />
              <StatCard
                label="Active Users"
                value="1.2K"
                hint="Users this week"
                icon={Users}
              />
            </div>
          </Card>
        </motion.div>

        {/* Getting Started Guide (for new users) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <Card variant="default" className="p-6 border-2 border-primary/30 bg-primary/5">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <SectionHeader
                  title="Getting Started"
                  subtitle="New to the platform? Follow these steps to set up your chatbot and start engaging with users."
                  icon={Bot}
                  className="mb-6"
                />
                <div className="space-y-2">
                  {[
                    { step: 1, text: 'Configure your bot\'s personality and branding', done: true },
                    { step: 2, text: 'Add knowledge base documents', done: true },
                    { step: 3, text: 'Test your chatbot', done: false },
                    { step: 4, text: 'Deploy to your website', done: false },
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                      {item.done ? (
                        <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground shrink-0" />
                      )}
                      <span className={`text-body-sm ${item.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {item.step}. {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Link to={isOnboardingComplete ? "/dashboard/knowledge" : "/dashboard/onboarding"}>
                <Button className="rounded-lg shrink-0">
                  {isOnboardingComplete ? "Manage Knowledge" : "Continue Setup"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </PageSection>

      {/* Embed Code Dialog */}
      <EmbedCodeDialog open={embedDialogOpen} onOpenChange={setEmbedDialogOpen} />
    </PageContainer>
  );
};

export default Overview;
