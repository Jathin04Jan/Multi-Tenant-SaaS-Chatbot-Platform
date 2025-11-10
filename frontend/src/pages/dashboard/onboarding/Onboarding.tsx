import { useState, useEffect } from 'react';
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
import { getBots, deleteBot, type BotDTO } from '@/lib/api';
import { toast } from 'sonner';

// Helper function to format time ago
const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  return `${Math.floor(diffInSeconds / 2592000)} months ago`;
};

const Onboarding = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [bots, setBots] = useState<BotDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBots = async () => {
      try {
        setLoading(true);
        const response = await getBots();
        if (response.error) {
          console.error('Error fetching bots:', response.error);
          setBots([]);
        } else {
          setBots(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching bots:', error);
        setBots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBots();
  }, []);

  const handleDeleteBot = async (botId: string, botName: string) => {
    const confirmed = window.confirm(`Delete "${botName}"? This action cannot be undone.`);
    if (!confirmed) {
      return;
    }

    try {
      const response = await deleteBot(botId);
      if (response.error || !response.data?.success) {
        toast.error(response.error || 'Failed to delete bot');
        return;
      }

      setBots((prev) => prev.filter((bot) => bot.id !== botId));
      toast.success(`Deleted "${botName}"`);
    } catch (error) {
      console.error('Error deleting bot:', error);
      toast.error('Failed to delete bot');
    }
  };

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
          {loading ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              Loading bots...
            </div>
          ) : bots.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No bots yet. Create your first bot to get started!
            </div>
          ) : (
            bots.map((bot, index) => (
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
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBot(bot.id, bot.name);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="mb-4">
                      {bot.description || 'No description'}
                    </CardDescription>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Badge 
                        variant="outline" 
                        className={
                          bot.status === 'active' 
                            ? "bg-success/10 text-success border-success/20"
                            : bot.status === 'paused'
                            ? "bg-warning/10 text-warning border-warning/20"
                            : bot.status === 'archived'
                            ? "bg-muted/10 text-muted-foreground border-muted/20"
                            : "bg-primary/10 text-primary border-primary/20"
                        }
                      >
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
                        <span className="font-medium">{bot.conversations_count.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Updated {formatTimeAgo(bot.updated_at)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Onboarding Panel */}
      <OnboardingPanel open={isPanelOpen} onOpenChange={setIsPanelOpen} />
    </>
  );
};

export default Onboarding;
