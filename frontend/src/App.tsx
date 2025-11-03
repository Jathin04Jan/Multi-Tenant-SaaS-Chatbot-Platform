import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Verify from "./pages/Verify";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Analytics from "./pages/dashboard/Analytics";
import Onboarding from "./pages/dashboard/onboarding/Onboarding";
import Brand from "./pages/dashboard/onboarding/Brand";
import Data from "./pages/dashboard/onboarding/Data";
import Progress from "./pages/dashboard/onboarding/Progress";
import Test from "./pages/dashboard/onboarding/Test";
import Install from "./pages/dashboard/onboarding/Install";
import Profile from "./pages/dashboard/settings/Profile";
import Team from "./pages/dashboard/settings/Team";
import Billing from "./pages/dashboard/settings/Billing";
import ApiKeys from "./pages/dashboard/settings/ApiKeys";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/verify" element={<Verify />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="analytics" element={<Analytics />} />
            
            {/* Onboarding */}
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="onboarding/brand" element={<Brand />} />
            <Route path="onboarding/data" element={<Data />} />
            <Route path="onboarding/progress" element={<Progress />} />
            <Route path="onboarding/test" element={<Test />} />
            <Route path="onboarding/install" element={<Install />} />

            {/* Settings */}
            <Route path="settings/profile" element={<Profile />} />
            <Route path="settings/team" element={<Team />} />
            <Route path="settings/billing" element={<Billing />} />
            <Route path="settings/api-keys" element={<ApiKeys />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
