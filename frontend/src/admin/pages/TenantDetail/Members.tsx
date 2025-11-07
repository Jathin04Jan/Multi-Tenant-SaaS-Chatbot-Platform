import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as mock from "../../mocks/mockService";
import type { AdminMember } from "../../types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TenantMembers = () => {
  const { tenantId } = useParams();
  const [members, setMembers] = useState<AdminMember[]>([]);
  useEffect(() => { if (tenantId) mock.mock.listMembers(tenantId).then(setMembers); }, [tenantId]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Members</h3>
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
            {members.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell className="capitalize">{m.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TenantMembers;

