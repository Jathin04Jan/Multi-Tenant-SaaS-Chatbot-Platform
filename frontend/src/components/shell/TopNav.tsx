import { useState, useEffect } from 'react';
import { Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { apiRequest } from '@/lib/api';

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
  const initials = getInitials(displayName);

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 glass">
      <div className="flex h-16 items-center justify-end w-full pr-4">
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

          {/* Profile Avatar */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full glass border-2 border-primary/30 hover:border-primary/50 transition-all h-10 w-10 p-0 overflow-hidden"
            onClick={() => navigate('/dashboard/settings/profile')}
            aria-label="Profile"
          >
            <Avatar className="h-full w-full">
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
};
