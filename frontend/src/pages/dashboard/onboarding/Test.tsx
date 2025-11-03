import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Send, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useWizardStore } from '@/store/wizard';
import { mockChatMessage } from '@/lib/api';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

const Test = () => {
  const navigate = useNavigate();
  const { branding, persona, completeStep } = useWizardStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: branding.welcomeMessage,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCitations, setShowCitations] = useState(true);
  const [temperature, setTemperature] = useState(50);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await mockChatMessage(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: response.data.reply,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast.error('Failed to get response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: '1',
        role: 'bot',
        content: branding.welcomeMessage,
      },
    ]);
    toast.success('Conversation reset');
  };

  const handleContinue = () => {
    completeStep(4);
    navigate('/dashboard/onboarding/install');
  };

  return (
    <div className="container max-w-7xl px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold mb-2">Test Your Chatbot</h1>
        <p className="text-muted-foreground">
          Try conversations before deploying to production
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2 glass-card p-6 flex flex-col"
        >
          {/* Messages */}
          <div className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-[500px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'bot' && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${branding.primaryColor}20` }}
                  >
                    <Bot className="w-4 h-4" style={{ color: branding.primaryColor }} />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'glass-card rounded-tl-none'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${branding.primaryColor}20` }}
                >
                  <Bot className="w-4 h-4" style={{ color: branding.primaryColor }} />
                </div>
                <div className="glass-card p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="rounded-xl"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="rounded-xl"
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded-xl text-xs text-muted-foreground">
            <strong>Note:</strong> This is a test environment. Your production embed will 
            use real endpoints.
          </div>
        </motion.div>

        {/* Settings Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold">Test Settings</h3>

            <div className="flex items-center justify-between">
              <Label htmlFor="citations">Show Citations</Label>
              <Switch
                id="citations"
                checked={showCitations}
                onCheckedChange={setShowCitations}
              />
            </div>

            <div>
              <Label>Temperature: {temperature}%</Label>
              <Slider
                value={[temperature]}
                onValueChange={(values) => setTemperature(values[0])}
                min={0}
                max={100}
                step={10}
                className="mt-2"
              />
            </div>

            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full rounded-xl glass"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Conversation
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard/onboarding/progress')}
          className="rounded-xl glass"
        >
          Back
        </Button>
        <Button onClick={handleContinue} className="rounded-xl">
          Continue to Install
        </Button>
      </div>
    </div>
  );
};

export default Test;
