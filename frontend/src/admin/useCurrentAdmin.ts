export function useCurrentAdmin() {
  const raw = typeof window !== "undefined" ? localStorage.getItem("adminSession") : null;
  if (raw) {
    try {
      return JSON.parse(raw) as { email: string; role: "superadmin" | "admin" };
    } catch (e) {
      // ignore parse errors
    }
  }
  return { email: "admin@example.com", role: "admin" as const };
}


