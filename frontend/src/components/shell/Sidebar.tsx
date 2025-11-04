import { useState } from 'react';
import { Bot, LayoutDashboard, Wand2, BarChart3, CreditCard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Custom Sidebar Layout Icon
const SidebarIcon = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-current"
  >
    <rect
      x="2"
      y="2"
      width="16"
      height="16"
      rx="2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="7"
      y1="2"
      x2="7"
      y2="18"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="4"
      y1="6"
      x2="6"
      y2="6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={isCollapsed ? 'opacity-0' : 'opacity-100'}
    />
    <line
      x1="4"
      y1="9"
      x2="6"
      y2="9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={isCollapsed ? 'opacity-0' : 'opacity-100'}
    />
    <line
      x1="4"
      y1="12"
      x2="6"
      y2="12"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={isCollapsed ? 'opacity-0' : 'opacity-100'}
    />
  </svg>
);

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Bot Builder',
    href: '/dashboard/onboarding',
    icon: Bot,
  },
  {
    name: 'Dashboard',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    name: 'Billing',
    href: '/dashboard/settings/billing',
    icon: CreditCard,
  },
  // [schema-demo:additive]
  {
    name: 'Metrics', // [schema-demo:additive]
    href: '/dashboard/demo', // [schema-demo:additive]
    icon: LayoutDashboard,
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative hidden lg:flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'relative flex flex-col border-r border-border/50 backdrop-blur-xl bg-background/80 transition-all duration-300 ease-in-out overflow-hidden',
          isCollapsed ? 'w-0 border-r-0' : 'w-64'
        )}
      >
        <div className={cn(
          'flex items-center gap-3 h-16 px-6 border-b border-border/50 transition-opacity duration-300 whitespace-nowrap',
          isCollapsed ? 'opacity-0' : 'opacity-100'
        )}>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-xl">YourBot</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/dashboard' && location.pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  isCollapsed && 'opacity-0 pointer-events-none'
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Toggle Button - positioned relative to parent, moves outside when collapsed */}
      <Button
        onClick={toggleSidebar}
        variant="outline"
        size="default"
        className={cn(
          'absolute top-4 z-20 h-12 w-12 rounded-lg border-2 border-white/20 bg-background/90 backdrop-blur-xl hover:bg-muted shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center',
          isCollapsed 
            ? 'left-4' 
            : 'left-[256px] -translate-x-full'
        )}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <SidebarIcon isCollapsed={isCollapsed} />
      </Button>
    </div>
  );
};
