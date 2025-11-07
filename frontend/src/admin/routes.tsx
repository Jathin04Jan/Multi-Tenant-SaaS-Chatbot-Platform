import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Overview from "./pages/Overview";
import Tenants from "./pages/Tenants";
import Usage from "./pages/Usage";
import Jobs from "./pages/Jobs";
import Moderation from "./pages/Moderation";
import Plans from "./pages/Plans";
import Audit from "./pages/Audit";
import Settings from "./pages/Settings";
import TenantSummary from "./pages/TenantDetail/Summary";
import TenantBots from "./pages/TenantDetail/Bots";
import TenantMembers from "./pages/TenantDetail/Members";
import TenantBillingPage from "./pages/TenantDetail/Billing";
import TenantDataSources from "./pages/TenantDetail/DataSources";
import TenantSecurity from "./pages/TenantDetail/Security";
import TenantWebhooks from "./pages/TenantDetail/Webhooks";
import TenantDetailLayout from "./pages/TenantDetail/TenantDetailLayout";
import RequireAdminAuth from "./RequireAdminAuth";

export const AdminRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <RequireAdminAuth>
          <AdminLayout />
        </RequireAdminAuth>
      }
    >
      <Route index element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<Overview />} />
      <Route path="tenants" element={<Tenants />} />
      <Route path="usage" element={<Usage />} />
      <Route path="jobs" element={<Jobs />} />
      <Route path="moderation" element={<Moderation />} />
      <Route path="plans" element={<Plans />} />
      <Route path="audit" element={<Audit />} />
      <Route path="settings" element={<Settings />} />

      <Route path="tenants/:tenantId" element={<TenantDetailLayout />}>
        <Route index element={<TenantSummary />} />
        <Route path="summary" element={<TenantSummary />} />
        <Route path="bots" element={<TenantBots />} />
        <Route path="members" element={<TenantMembers />} />
        <Route path="billing" element={<TenantBillingPage />} />
        <Route path="data-sources" element={<TenantDataSources />} />
        <Route path="security" element={<TenantSecurity />} />
        <Route path="webhooks" element={<TenantWebhooks />} />
      </Route>
    </Route>
  </Routes>
);

export default AdminRoutes;

