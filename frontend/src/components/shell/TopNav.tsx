import { Settings, Bell, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const TopNav = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="container flex h-16 items-center justify-between gap-4 px-4">
        {/* Logo and Branding */}
        <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-xl">YourBot</span>
        </Link>

        {/* Right side icons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Settings Button */}
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-xl glass"
            onClick={() => navigate('/dashboard/settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* Notification Bell */}
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-xl glass"
            onClick={() => {
              // Notification functionality to be defined later
            }}
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
