import { MessageSquare, Clock, FileText, Database, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { mockGetAnalytics } from '@/lib/api';

const stats = [
  { name: 'Total Chats', icon: MessageSquare, value: '1,247', change: '+12%' },
  { name: 'Avg Response Time', icon: Clock, value: '2.3s', change: '-8%' },
  { name: 'Docs Indexed', icon: FileText, value: '87', change: '+5' },
  { name: 'Active Sources', icon: Database, value: '12', change: '+2' },
];

const quickActions = [
  {
    title: 'Resume Onboarding',
    description: 'Complete your bot setup',
    href: '/dashboard/onboarding',
    icon: ArrowRight,
  },
  {
    title: 'Upload Documents',
    description: 'Add more training data',
    href: '/dashboard/onboarding/data',
    icon: FileText,
  },
  {
    title: 'View Embed Code',
    description: 'Get installation snippet',
    href: '/dashboard/onboarding/install',
    icon: Database,
  },
];

const Overview = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: mockGetAnalytics,
  });

  return (
    <div className="container max-w-7xl px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your chatbot performance.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-success">{stat.change}</span>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.name}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <Link to={action.href}>
                <div className="glass-card p-6 hover:scale-105 transition-transform duration-200 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                      <action.icon className="w-5 h-5 text-accent" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
