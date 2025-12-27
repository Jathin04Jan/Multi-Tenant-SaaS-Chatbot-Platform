import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { TopNav } from '@/components/shell/TopNav';
import { Sidebar } from '@/components/shell/Sidebar';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useSidebarStore } from '@/store/sidebar';
import { useUserStore } from '@/store/user';
import { getBots } from '@/lib/api';
import { GuidedTour } from '@/components/onboarding/GuidedTour';
import FirstTimeWelcome from './FirstTimeWelcome';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed } = useSidebarStore();
  const userEmail = useUserStore((state) => state.userEmail);
  const sidebarWidth = isCollapsed ? '4rem' : '16rem';
  const [welcomeState, setWelcomeState] = useState<'loading' | 'show' | 'hidden'>('loading');
  const [botCount, setBotCount] = useState<number>(0);

  // Fetch bots to determine if welcome should be shown
  useEffect(() => {
    if (!userEmail) {
      setWelcomeState('loading');
      return;
    }

    let isMounted = true;

    const fetchBots = async () => {
      try {
        const response = await getBots();
        
        if (!isMounted) return;

        if (response.error) {
          // On error, default to showing welcome (safer for new users)
          setWelcomeState('show');
          return;
        }

        const bots = response.data || [];
        setBotCount(bots.length);
        // Show welcome if user has no bots, hide if they have at least one
        setWelcomeState(bots.length === 0 ? 'show' : 'hidden');
      } catch (error) {
        if (!isMounted) return;
        // On error, default to showing welcome
        setWelcomeState('show');
      }
    };

    fetchBots();

    return () => {
      isMounted = false;
    };
  }, [userEmail, location.pathname]); // Refresh when location changes (e.g., after creating a bot)

  const handleSkip = () => {
    // Just hide welcome temporarily, but it will show again if no bots exist
    setWelcomeState('hidden');
  };

  const handleStartSetup = () => {
    navigate('/dashboard/onboarding');
  };

  const isNewUser = botCount === 0;

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <div className="flex flex-1 overflow-hidden relative">
        <div
          className="shrink-0 transition-all duration-300 ease-in-out"
          style={{ width: sidebarWidth }}
        />
        <Sidebar />
        <main className="flex-1 overflow-auto pt-16">
          {welcomeState === 'loading' ? null : welcomeState === 'show' ? (
            <FirstTimeWelcome 
              onStartSetup={handleStartSetup} 
              onSkip={handleSkip}
              onRestartTour={() => {
                // Force tour to restart by clearing localStorage and reloading
                if (userEmail) {
                  localStorage.removeItem(`onboarding_tour_completed_${userEmail}`);
                  window.location.reload();
                }
              }}
            />
          ) : (
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          )}
        </main>
      </div>
      {/* Guided Tour - only for new users (0 bots) */}
      <GuidedTour userId={userEmail} isNewUser={isNewUser} />
    </div>
  );
};

export default DashboardLayout;
