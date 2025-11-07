import { Navigate } from "react-router-dom";

export default function RequireAdminAuth({ children }: { children: JSX.Element }) {
  const session = typeof window !== "undefined" ? localStorage.getItem("adminSession") : null;
  if (!session) {
    return <Navigate to="/admin/signin" replace />;
  }
  return children;
}


