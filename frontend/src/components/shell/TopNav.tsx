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
  const userEmailFromStore = useUserStore((state) => state.userEmail);
  const setUserName = useUserStore((state) => state.setUserName);
  const setUserEmail = useUserStore((state) => state.setUserEmail);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiRequest<UserData>('/auth/me', {
          method: 'GET',
        });
        
        if (response.data) {
          setUserData(response.data);
          setUserName(response.data.full_name);
          setUserEmail(response.data.email);
        }
      } catch (error) {
        // Silently fail - use fallback
      }
    };

    fetchUserData();
  }, [setUserName, setUserEmail]);

  const displayName = userData?.full_name || userName || null;
  const userEmail = userData?.email || userEmailFromStore || null;
  const initials = getInitials(displayName);

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.removeItem('access_token');
    localStorage.removeItem('wizard-storage');
    useUserStore.getState().setUserName(null);
    useUserStore.getState().setUserEmail(null);
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/60 bg-card/95 backdrop-blur-sm shadow-sm">
      <div className="flex h-16 items-center justify-between w-full px-6">
        {/* Left side: App logo / title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <span className="text-h4 font-bold tracking-tight">
            YourBot
          </span>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notification Bell */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-lg"
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
                variant="ghost"
                size="icon"
                className="rounded-lg h-10 w-10 p-0 overflow-hidden border border-border/50 hover:border-primary/30 transition-all"
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
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold text-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center space-y-1">
                  <p className="text-h4 font-semibold text-foreground">{displayName || 'User'}</p>
                  <p className="text-body-sm text-muted-foreground">{userEmail || 'No email'}</p>
                </div>
                <Button
                  onClick={handleLogout}
                  className="w-full mt-6 rounded-lg"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>

              {/* Settings Options */}
              <div className="py-2">
                <DropdownMenuLabel className="px-4 py-2 text-micro text-muted-foreground font-semibold">
                  Settings
                </DropdownMenuLabel>
                <DropdownMenuItem
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                  onClick={() => navigate('/dashboard/settings/profile')}
                >
                  <User className="w-5 h-5" />
                  <span className="text-body-sm">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                  onClick={() => navigate('/dashboard/settings/appearance')}
                >
                  <Palette className="w-5 h-5" />
                  <span className="text-body-sm">Appearance</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
