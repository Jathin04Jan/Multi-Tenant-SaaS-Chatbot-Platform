import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Bot, MessageSquare, CheckCircle2, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { OnboardingPanel } from '@/components/onboarding/OnboardingPanel';

// Dummy bot data
const dummyBots = [
  {
    id: '1',
    name: 'Customer Support Bot',
    description: 'Handles customer inquiries and support tickets',
    status: 'active',
    conversations: 1247,
    lastUpdated: '2 hours ago',
  },
  {
    id: '2',
    name: 'Sales Assistant',
    description: 'Helps with product information and sales inquiries',
    status: 'active',
    conversations: 892,
    lastUpdated: '5 hours ago',
  },
  {
    id: '3',
    name: 'HR Bot',
    description: 'Answers HR-related questions and employee onboarding',
    status: 'active',
    conversations: 456,
    lastUpdated: '1 day ago',
  },
];

const Onboarding = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="container max-w-7xl px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Bots</h1>
            <p className="text-muted-foreground">
              Manage your chatbots and create new ones
            </p>
          </div>
        </motion.div>

        {/* Bot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Create New Bot Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card
              className="glass-card border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all cursor-pointer h-full flex items-center justify-center min-h-[280px]"
              onClick={() => setIsPanelOpen(true)}
            >
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Create New Bot</h3>
                <p className="text-sm text-muted-foreground">
                  Start building your chatbot in 5 simple steps
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Existing Bot Cards */}
          {dummyBots.map((bot, index) => (
            <motion.div
              key={bot.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card 
                className="glass-card hover:shadow-lg transition-all h-full flex flex-col cursor-pointer"
                onClick={() => navigate(`/dashboard/bots/${bot.id}`)}
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{bot.name}</CardTitle>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/bots/${bot.id}`);
                      }}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={(e) => e.stopPropagation()}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="mb-4">{bot.description}</CardDescription>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {bot.status}
                    </Badge>
                  </div>

                  <div className="mt-auto space-y-2 pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        Conversations
                      </span>
                      <span className="font-medium">{bot.conversations.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Updated {bot.lastUpdated}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Onboarding Panel */}
      <OnboardingPanel open={isPanelOpen} onOpenChange={setIsPanelOpen} />
    </>
  );
};

export default Onboarding;
