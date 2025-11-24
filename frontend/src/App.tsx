import { Toaster as Sonner } from "@/components/ui/sonner";
import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeInitializer } from "@/components/ThemeInitializer";

// Pages
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AdminSignIn from "./pages/AdminSignIn";
import Verify from "./pages/Verify";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Analytics from "./pages/dashboard/Analytics";
import Onboarding from "./pages/dashboard/onboarding/Onboarding";
import BotDetail from "./pages/dashboard/BotDetail";
import Brand from "./pages/dashboard/onboarding/Brand";
import Data from "./pages/dashboard/onboarding/Data";
import Progress from "./pages/dashboard/onboarding/Progress";
import Test from "./pages/dashboard/onboarding/Test";
import Install from "./pages/dashboard/onboarding/Install";
import Profile from "./pages/dashboard/settings/Profile";
import Billing from "./pages/dashboard/settings/Billing";
import Checkout from "./pages/dashboard/settings/Checkout";
import Appearance from "./pages/dashboard/settings/Appearance";
import Guardrails from "./pages/dashboard/Guardrails";
import Agents from "./pages/dashboard/Agents";
import Sources from "./pages/dashboard/Sources";
import Knowledge from "./pages/dashboard/Knowledge";
import Jobs from "./pages/dashboard/Jobs";
import NotFound from "./pages/NotFound";
// [schema-demo:additive]
import DemoLayout from "./pages/demo/DemoLayout";
import DemoOverview from "./pages/demo/Overview";
import DemoAgents from "./pages/demo/Agents";
import DemoKnowledge from "./pages/demo/Knowledge";
import DemoJobs from "./pages/demo/Jobs";
import DemoInstall from "./pages/demo/Install";
import DemoTeam from "./pages/demo/Team";
import DemoTenant from "./pages/demo/Tenant";
import DemoBilling from "./pages/demo/Billing";

const queryClient = new QueryClient();

const AdminApp = lazy(() => import("./admin/AppAdmin"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeInitializer />
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/verify" element={<Verify />} />

          {/* Admin (lazy-mounted, isolated) */}
          <Route path="/admin/*" element={<Suspense fallback={null}><AdminApp /></Suspense>} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="guardrails" element={<Guardrails />} />
            <Route path="agents" element={<Agents />} />
            <Route path="sources" element={<Sources />} />
            <Route path="knowledge" element={<Knowledge />} />
            <Route path="jobs" element={<Jobs />} />
            
            {/* Onboarding */}
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="bots/:botId" element={<BotDetail />} />
            <Route path="onboarding/brand" element={<Brand />} />
            <Route path="onboarding/data" element={<Data />} />
            <Route path="onboarding/progress" element={<Progress />} />
            <Route path="onboarding/test" element={<Test />} />
            <Route path="onboarding/install" element={<Install />} />

            {/* Settings */}
            <Route path="settings" element={<Navigate to="/dashboard/settings/appearance" replace />} />
            <Route path="settings/appearance" element={<Appearance />} />
            <Route path="settings/profile" element={<Profile />} />
            <Route path="settings/billing" element={<Billing />} />
            <Route path="settings/payment" element={<Checkout />} />

            {/* [schema-demo:additive] Demo routes also available under dashboard shell */}
            <Route path="demo" element={<DemoLayout />}>
              <Route index element={<DemoOverview />} />
              <Route path="agents" element={<DemoAgents />} />
              <Route path="knowledge" element={<DemoKnowledge />} />
              <Route path="jobs" element={<DemoJobs />} />
              <Route path="install" element={<DemoInstall />} />
              <Route path="team" element={<DemoTeam />} />
              <Route path="tenant" element={<DemoTenant />} />
              <Route path="billing" element={<DemoBilling />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
          {/* [schema-demo:additive] Demo routes (client-side only) - standalone access */}
          <Route path="/demo" element={<DemoLayout />}>
            <Route index element={<DemoOverview />} />
            <Route path="agents" element={<DemoAgents />} />
            <Route path="knowledge" element={<DemoKnowledge />} />
            <Route path="jobs" element={<DemoJobs />} />
            <Route path="install" element={<DemoInstall />} />
            <Route path="team" element={<DemoTeam />} />
            <Route path="tenant" element={<DemoTenant />} />
            <Route path="billing" element={<DemoBilling />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
