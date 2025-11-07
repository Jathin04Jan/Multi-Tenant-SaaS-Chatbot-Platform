import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bot, Gauge, Users, Activity, ListChecks, ShieldAlert, CreditCard, Archive, Settings } from "lucide-react";

const nav = [
  { to: "/admin/overview", label: "Overview", icon: Gauge },
  { to: "/admin/tenants", label: "Tenants", icon: Users },
  { to: "/admin/usage", label: "Usage", icon: Activity },
  { to: "/admin/jobs", label: "Jobs", icon: ListChecks },
  { to: "/admin/moderation", label: "Moderation", icon: ShieldAlert },
  { to: "/admin/plans", label: "Plans", icon: CreditCard },
  { to: "/admin/audit", label: "Audit", icon: Archive },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("adminSession");
    navigate("/admin/signin");
  }
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col border-r p-4 gap-2">
        <Link to="/admin/overview" className="flex items-center gap-2 px-2 py-2">
          <Bot className="w-6 h-6" />
          <span className="font-semibold">Admin</span>
        </Link>
        <nav className="mt-2 space-y-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
              }`}
            >
              <n.icon className="w-4 h-4" />
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto w-full rounded-md bg-destructive text-destructive-foreground px-3 py-2 text-sm hover:opacity-90"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <div className="flex flex-col min-h-screen">
        <div className="admin-sticky-header flex items-center justify-between px-4 lg:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{location.pathname}</span>
          </div>
        </div>

        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

