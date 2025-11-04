import { Settings, Bell, LayoutDashboard, Bot, BarChart3, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Bot Builder', href: '/dashboard/onboarding', icon: Bot },
  { name: 'Dashboard', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Billing', href: '/dashboard/settings/billing', icon: CreditCard },
];

export const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="container relative flex h-16 items-center gap-4 px-4">
        <div className="flex-1" />

        {/* Centered Navigation */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 rounded-2xl border border-border/50 bg-background/70 backdrop-blur-xl px-2 py-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href ||
              (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
            const Icon = item.icon as any;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>

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
    </header>
  );
};
