import PlanCard from "../components/PlanCard";
import * as mock from "../mocks/mockService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const Plans = () => {
  const plans = mock.getPlans();
  const flags = [
    { key: "rag_guard", description: "Retrieval hallucination guardrails", defaultState: true, rollout: "ga" },
    { key: "webhooks_v2", description: "New webhook delivery pipeline", defaultState: false, rollout: "beta" },
    { key: "sso_saml", description: "Enterprise SAML SSO", defaultState: false, rollout: "private" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} />
        ))}
      </div>
      <div className="admin-card p-4 rounded-xl">
        <h3 className="text-lg font-semibold mb-3">Feature Flags</h3>
        <div className="border rounded-xl overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Rollout</TableHead>
                <TableHead>Toggle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flags.map((f) => (
                <TableRow key={f.key}>
                  <TableCell className="font-mono text-xs">{f.key}</TableCell>
                  <TableCell>{f.description}</TableCell>
                  <TableCell>{String(f.defaultState)}</TableCell>
                  <TableCell>
                    <Badge variant={f.rollout === "ga" ? "secondary" : f.rollout === "beta" ? "default" : "outline"}>{f.rollout.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>
                    <Switch checked={f.defaultState} disabled />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Plans;

