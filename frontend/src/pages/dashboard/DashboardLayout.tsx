import { Outlet } from 'react-router-dom';
import { TopNav } from '@/components/shell/TopNav';
import { Sidebar } from '@/components/shell/Sidebar';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <div className="flex flex-1 overflow-hidden relative">
        <div className="w-64 shrink-0"></div>
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
