import { ChevronDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { useWizardStore } from '@/store/wizard';

export const TopNav = () => {
  const navigate = useNavigate();
  const tenantId = useWizardStore((state) => state.tenantId);

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="container flex h-16 items-center gap-4 px-4">
        {/* Tenant Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-xl glass">
              <span className="font-medium">
                {tenantId ? `Tenant ${tenantId.slice(-6)}` : 'Select Tenant'}
              </span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 glass">
            <DropdownMenuLabel>Your Tenants</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {tenantId ? `Tenant ${tenantId.slice(-6)}` : 'No tenant'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex-1" />

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-xl glass">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/dashboard/settings/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/settings/billing')}>
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/settings/team')}>
              Team
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/')}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
