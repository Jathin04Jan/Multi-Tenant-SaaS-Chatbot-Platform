import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/admin/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Invalid credentials' }));
        alert(error.detail || 'Invalid credentials');
        return;
      }

      const data = await response.json();
      
      // Store token
      localStorage.setItem('access_token', data.access_token);
      
      // Store admin session
      localStorage.setItem(
        "adminSession",
        JSON.stringify({ email, role: "superadmin" })
      );
      
      navigate("/admin/overview");
    } catch (error) {
      console.error('Admin signin error:', error);
      alert('Failed to sign in. Please try again.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="w-full max-w-md bg-background rounded-2xl shadow p-8 space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">Admin Sign In</h1>
          <p className="text-sm text-muted-foreground">
            Admin area — dummy auth for now.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-background"
              placeholder="admin@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-background"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-emerald-500 hover:bg-emerald-600 text-white py-2 font-medium"
          >
            Sign in
          </button>
        </form>
        <div className="text-center">
          <Link to="/signin" className="text-xs text-muted-foreground hover:underline">
            ← Back to user sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

