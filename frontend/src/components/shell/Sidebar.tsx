import { LayoutDashboard, BarChart3, CreditCard, Bot, Sidebar as SidebarIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store/sidebar';
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
  const { isCollapsed, toggleSidebar } = useSidebarStore();

  return (
    <div className="fixed left-0 top-16 bottom-0 flex z-30 will-change-transform">
      {/* Sidebar */}
      <aside
        className={cn(
          'relative flex flex-col h-full border-r border-border/50 glass overflow-visible transition-[width,transform] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Toggle Button - positioned on the border at the top right, always visible */}
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="icon"
          className="absolute -right-3.5 top-3 h-7 w-7 rounded-lg glass hover:bg-muted shadow-lg z-10 border border-border/50"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <SidebarIcon className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-3 space-y-2 overflow-y-auto">
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
                    : 'text-foreground hover:bg-muted/50',
                  isCollapsed && 'justify-center px-2'
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};
