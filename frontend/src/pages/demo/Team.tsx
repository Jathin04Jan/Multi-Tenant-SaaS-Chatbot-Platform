// [schema-demo:additive]
import { useMemo } from 'react';
import { useDemoSession } from '@/demo/DemoSession';
import { mockTenantAdmins } from '@/demo/mocks';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check } from 'lucide-react';

const DemoTeam = () => {
  const { tenantId } = useDemoSession();
  const admins = useMemo(() => mockTenantAdmins.filter(a => a.tenant_id === tenantId), [tenantId]);

  return (
    <div className="container max-w-7xl px-2 md:px-4 py-4 space-y-4">
      <h1 className="text-2xl font-bold">Team (Admins)</h1>
      <div className="glass-card p-2 md:p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Last Login</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map(u => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.email}</TableCell>
                <TableCell className="text-sm">{u.role}</TableCell>
                <TableCell>{u.verified ? <Check className="w-4 h-4 text-green-500" /> : '-'}</TableCell>
                <TableCell className="text-sm">{u.last_login ? new Date(u.last_login).toLocaleString() : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DemoTeam;


