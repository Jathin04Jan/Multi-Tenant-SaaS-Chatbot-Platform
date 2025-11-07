import { useState } from 'react';
import { LayoutDashboard, BarChart3, CreditCard, Sidebar as SidebarIcon, Bot } from 'lucide-react';
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
];

export const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="fixed left-0 top-16 bottom-0 flex z-30">
      {/* Sidebar */}
      <aside
        className={cn(
          'relative flex flex-col h-full border-r border-border/50 glass transition-all duration-300 ease-in-out overflow-visible',
          isCollapsed ? 'w-0 border-r-0' : 'w-64'
        )}
      >
        {/* Toggle Button - positioned on the border at the top right */}
        {!isCollapsed && (
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="icon"
            className="absolute -right-3.5 top-3 h-7 w-7 rounded-lg glass hover:bg-muted shadow-lg z-10 border border-border/50"
            aria-label="Collapse sidebar"
          >
            <SidebarIcon className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        )}

        {!isCollapsed && (
          <>
            {/* Header Section with Logo and Title */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">YourBot</h2>
                  <p className="text-xs text-muted-foreground">Dashboard</p>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href !== '/dashboard' && location.pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-foreground hover:bg-muted/50'
                    )}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </>
        )}
      </aside>

      {/* Toggle Button - shows when collapsed, positioned to the left of where sidebar was */}
      {isCollapsed && (
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="icon"
          className="absolute left-2 top-4 h-7 w-7 rounded-lg glass hover:bg-muted shadow-lg z-20"
          aria-label="Expand sidebar"
        >
          <SidebarIcon className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      )}
    </div>
  );
};
