import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Bot,
  FilePlus2,
  ShieldCheck,
  MessageCircle,
  Rocket,
  PlayCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/store/user';
import { apiRequest } from '@/lib/api';
import { restartTour } from '@/components/onboarding/GuidedTour';

interface FirstTimeWelcomeProps {
  onStartSetup: () => void;
  onSkip: () => void;
  onRestartTour?: () => void;
}

interface UserData {
  full_name: string;
  email: string;
}

const steps = [
  {
    title: 'Define Your Brand',
    description: 'Set the persona, tone, and visual identity for your assistant.',
    icon: Bot,
  },
  {
    title: 'Add Knowledge',
    description: 'Upload documents or crawl websites so your bot knows your business.',
    icon: FilePlus2,
  },
  {
    title: 'Configure Guardrails',
    description: 'Set boundaries, compliance rules, and safe response guidelines.',
    icon: ShieldCheck,
  },
  {
    title: 'Test & Deploy',
    description: 'Chat with your bot, fine-tune responses, then launch everywhere.',
    icon: Rocket,
  },
];

export const FirstTimeWelcome = ({ onStartSetup, onSkip, onRestartTour }: FirstTimeWelcomeProps) => {
  const storedName = useUserStore((state) => state.userName);
  const userEmail = useUserStore((state) => state.userEmail);
  const setUserName = useUserStore((state) => state.setUserName);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleRestartTour = () => {
    if (userEmail) {
      restartTour(userEmail);
      onRestartTour?.();
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiRequest<UserData>('/auth/me', { method: 'GET' });
        if (response.data) {
          setUserData(response.data);
          setUserName(response.data.full_name);
        }
      } catch {
        // ignore errors in demo mode
      }
    };

    fetchUser();
  }, [setUserName]);

  const displayName = userData?.full_name || storedName || 'Trailblazer';
  const firstName = displayName.trim().split(/\s+/)[0] || 'Trailblazer';

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl space-y-8"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Welcome to your dashboard, {firstName}, please feel at home! 😄
          </div>
          <h1 className="text-4xl font-bold">Let’s build your first AI assistant</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow this quick guided setup to understand the platform, configure your assistant,
            and deploy it with confidence. We’ll walk you through every step.
          </p>
          <p className="max-w-2xl mx-auto text-base md:text-lg font-medium text-primary-foreground/80 bg-primary/5 border border-primary/15 rounded-2xl px-5 py-3">
            Welcome to your home sweet home, {displayName}. Make yourself comfortable—this workspace was built just for you, so let’s get your assistant cozy and ready to help.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.title} className="glass-card h-full">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      Step {index + 1}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="glass-card">
          <CardContent className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between py-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Ready for a quick tour?</h2>
              <p className="text-muted-foreground">
                We'll help you create a bot, connect data sources, set guardrails, and test
                responses before deployment. It takes just a few minutes.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <Button
                size="lg"
                className="rounded-xl px-6 flex items-center gap-2"
                onClick={onStartSetup}
              >
                Start guided setup
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="rounded-xl"
                onClick={onSkip}
              >
                Skip & explore later
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Take the interactive tour</h3>
                  <p className="text-sm text-muted-foreground">
                    Follow step-by-step guidance to create your first bot
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={handleRestartTour}
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Restart tour
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Need help along the way?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our knowledge base and team are just a click away.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="rounded-xl">
                  View docs
                </Button>
                <Button variant="outline" className="rounded-xl">
                  Contact support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FirstTimeWelcome;


