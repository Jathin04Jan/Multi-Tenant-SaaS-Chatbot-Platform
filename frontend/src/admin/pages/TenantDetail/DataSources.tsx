import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as mock from "../../mocks/mockService";
import type { AdminDataSource } from "../../types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const TenantDataSources = () => {
  const { tenantId } = useParams();
  const [rows, setRows] = useState<AdminDataSource[]>([]);
  useEffect(() => { if (tenantId) mock.mock.listDataSources(tenantId).then(setRows); }, [tenantId]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Data Sources</h3>
      <div className="border rounded-xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Indexed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.name}</TableCell>
                <TableCell className="uppercase">{r.type}</TableCell>
                <TableCell>
                  <Badge variant={r.status === "healthy" ? "secondary" : r.status === "warning" ? "default" : "destructive"}>{r.status}</Badge>
                </TableCell>
                <TableCell>{r.lastIndexedAt || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TenantDataSources;

