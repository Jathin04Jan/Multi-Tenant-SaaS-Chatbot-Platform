import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AdminPlan } from "../types";

const PlanCard = ({ plan, onSelect, current }: { plan: AdminPlan; onSelect?: (id: string) => void; current?: boolean }) => {
  return (
    <Card className="rounded-xl h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {plan.name}
            {current ? <Badge variant="secondary">Current</Badge> : null}
          </span>
          <span className="text-xl">${plan.priceMonthly}/mo</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2 text-sm">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span>•</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={current ? "outline" : "default"} onClick={() => onSelect?.(plan.id)}>
          {current ? "Selected" : `Choose ${plan.name}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;

