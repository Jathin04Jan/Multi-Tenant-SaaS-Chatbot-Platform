import { Outlet } from 'react-router-dom';
import { TopNav } from '@/components/shell/TopNav';
import { Sidebar } from '@/components/shell/Sidebar';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useSidebarStore } from '@/store/sidebar';

const DashboardLayout = () => {
  const { isCollapsed } = useSidebarStore();
  const sidebarWidth = isCollapsed ? '4rem' : '16rem';

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
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
