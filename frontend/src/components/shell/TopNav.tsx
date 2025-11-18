import { useState, useEffect } from 'react';
import { Bell, LogOut, User, Palette, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { apiRequest } from '@/lib/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface UserData {
  full_name: string;
  email: string;
}

// Helper function to get user initials
const getInitials = (name: string | null | undefined): string => {
  if (!name) return 'U';
  
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const TopNav = () => {
  const navigate = useNavigate();
  const userName = useUserStore((state) => state.userName);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiRequest<UserData>('/api/v1/auth/me', {
          method: 'GET',
        });
        
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        // Silently fail - use fallback
      }
    };

    fetchUserData();
  }, []);

  const displayName = userData?.full_name || userName || null;
  const userEmail = userData?.email || null;
  const initials = getInitials(displayName);

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.removeItem('access_token');
    localStorage.removeItem('wizard-storage');
    useUserStore.getState().setUserName(null);
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/50 glass">
      <div className="flex h-16 items-center justify-between w-full px-4">
        {/* Left side: App logo / title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tight">
            YourBot
          </span>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

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

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full glass border-2 border-primary/30 hover:border-primary/50 transition-all h-10 w-10 p-0 overflow-hidden"
                aria-label="Profile"
              >
                <Avatar className="h-full w-full">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 glass rounded-xl p-0">
              {/* Profile Header */}
              <div className="flex flex-col items-center px-6 py-6 border-b border-border/50">
                <Avatar className="h-20 w-20 mb-3">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold text-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-semibold text-foreground text-base">{displayName || 'User'}</p>
                  <p className="text-sm text-muted-foreground mt-1">{userEmail || 'No email'}</p>
                </div>
                <Button
                  onClick={handleLogout}
                  className="w-full mt-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>

              {/* Settings Options */}
              <div className="py-2">
                <DropdownMenuLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                  Settings
                </DropdownMenuLabel>
                <DropdownMenuItem
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                  onClick={() => navigate('/dashboard/settings/profile')}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                  onClick={() => navigate('/dashboard/settings/appearance')}
                >
                  <Palette className="w-5 h-5" />
                  <span>Appearance</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
