import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/shell/TopNav';
import { Sidebar } from '@/components/shell/Sidebar';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useSidebarStore } from '@/store/sidebar';
import { useUserStore } from '@/store/user';
import FirstTimeWelcome from './FirstTimeWelcome';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { isCollapsed } = useSidebarStore();
  const userEmail = useUserStore((state) => state.userEmail);
  const sidebarWidth = isCollapsed ? '4rem' : '16rem';
  const [welcomeState, setWelcomeState] = useState<'loading' | 'show' | 'hidden'>('loading');

  useEffect(() => {
    if (!userEmail) {
      setWelcomeState('loading');
      return;
    }
    const key = `hasSeenDashboardWelcome:${userEmail}`;
    const hasSeen = localStorage.getItem(key);
    setWelcomeState(hasSeen === 'true' ? 'hidden' : 'show');
  }, [userEmail]);

  const persistWelcomeState = () => {
    if (userEmail) {
      localStorage.setItem(`hasSeenDashboardWelcome:${userEmail}`, 'true');
    }
  };

  const completeWelcome = () => {
    persistWelcomeState();
    setWelcomeState('hidden');
  };

  const handleStartSetup = () => {
    completeWelcome();
    navigate('/dashboard/onboarding');
  };

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
            <FirstTimeWelcome onStartSetup={handleStartSetup} onSkip={completeWelcome} />
          ) : (
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
