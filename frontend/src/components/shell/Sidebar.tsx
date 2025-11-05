import { useState } from 'react';
import { Bot, LayoutDashboard, BarChart3, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Bots',
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
  // {
  //   name: 'Metrics', // [schema-demo:additive]
  //   href: '/dashboard/demo', // [schema-demo:additive]
  //   icon: LayoutDashboard,
  // },
];

export const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'relative flex flex-col border-r border-border/50 backdrop-blur-xl bg-background/80 transition-all duration-300 ease-in-out overflow-hidden',
          isCollapsed ? 'w-0 border-r-0' : 'w-64'
        )}
      >
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto pt-6">
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

        {/* Toggle Button - inside sidebar at the bottom */}
        <div className={cn(
          'border-t border-border/50 p-4 transition-opacity duration-300',
          isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}>
          <Button
            onClick={toggleSidebar}
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 rounded-xl"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Collapse</span>
          </Button>
        </div>
      </aside>

      {/* Toggle Button - shows when collapsed */}
      {isCollapsed && (
        <Button
          onClick={toggleSidebar}
          variant="outline"
          size="icon"
          className="absolute left-2 top-4 h-10 w-10 rounded-lg bg-background/90 backdrop-blur-xl hover:bg-muted shadow-lg z-20"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};
