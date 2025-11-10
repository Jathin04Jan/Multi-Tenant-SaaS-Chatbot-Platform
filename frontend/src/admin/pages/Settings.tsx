import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ImpersonationBanner from "../../admin/components/ImpersonationBanner";
import { useCurrentAdmin } from "../useCurrentAdmin";
import { useState } from "react";

type AdminUser = {
  name: string;
  email: string;
  role: "superadmin" | "admin";
  status: "active" | "suspended";
};

const Settings = () => {
  const admin = useCurrentAdmin();
  const [admins, setAdmins] = useState<AdminUser[]>([
    { name: "Super Admin", email: admin.email, role: admin.role, status: "active" },
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin">("admin");
  const [status, setStatus] = useState<"active" | "suspended">("active");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAdmins((prev) => [...prev, { name, email, role, status }]);
    setName("");
    setEmail("");
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Admin Settings</h2>
        <p className="text-sm text-muted-foreground">Signed in as {admin.email} ({admin.role})</p>
      </div>

      {admin.role === "superadmin" ? (
        <form onSubmit={handleAdd} className="space-y-3 rounded-lg border p-4">
          <p className="text-sm font-medium">Add new admin</p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm">Name</label>
              <input className="border rounded-md px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <label className="text-sm">Email</label>
              <input className="border rounded-md px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <label className="text-sm">Role</label>
              <select className="border rounded-md px-3 py-2" value={role} onChange={(e) => setRole(e.target.value as any)}>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm">Status</label>
              <select className="border rounded-md px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value as any)}>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
          <button type="submit" className="rounded-md bg-emerald-500 text-white px-4 py-2 text-sm">Create admin (mock)</button>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">You are an admin. Only the superadmin can create new admins.</p>
      )}

      <div className="rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Role</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a, idx) => (
              <tr key={idx} className="border-b last:border-0">
                <td className="p-2">{a.name}</td>
                <td className="p-2">{a.email}</td>
                <td className="p-2">{a.role}</td>
                <td className="p-2">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="users">Admin Users</TabsTrigger>
          <TabsTrigger value="sso">SSO</TabsTrigger>
          <TabsTrigger value="network">IP Allowlist</TabsTrigger>
          <TabsTrigger value="impersonation">Impersonation</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="admin-card p-4 rounded-xl">
          <h3 className="font-semibold mb-3">Admin Users (read-only)</h3>
          <div className="border rounded-xl overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[{ name: "Vaibhav", email: "vaibhav@admin", role: "admin" }, { name: "Root", email: "root@system", role: "superadmin" }].map((u) => (
                  <TableRow key={u.email}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell className="capitalize">{u.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="sso" className="admin-card p-4 rounded-xl">
          <h3 className="font-semibold mb-3">SSO</h3>
          <div className="grid gap-3 max-w-xl">
            <label className="text-sm">SAML Metadata URL</label>
            <Input placeholder="https://idp.example.com/metadata" disabled />
            <label className="text-sm">Entity ID</label>
            <Input placeholder="urn:example:admin" disabled />
            <div className="text-sm text-muted-foreground">SSO configuration is demo-only.</div>
          </div>
        </TabsContent>

        <TabsContent value="network" className="admin-card p-4 rounded-xl">
          <h3 className="font-semibold mb-3">IP Allowlist</h3>
          <div className="border rounded-xl overflow-x-auto mb-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CIDR</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[{ cidr: "0.0.0.0/0", desc: "All" }].map((r) => (
                  <TableRow key={r.cidr}>
                    <TableCell>{r.cidr}</TableCell>
                    <TableCell>{r.desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button disabled>Add CIDR</Button>
        </TabsContent>

        <TabsContent value="impersonation" className="admin-card p-4 rounded-xl">
          <h3 className="font-semibold mb-3">Impersonation Banner Preview</h3>
          <div className="border rounded-xl">
            <ImpersonationBanner tenant="Tenant X" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

