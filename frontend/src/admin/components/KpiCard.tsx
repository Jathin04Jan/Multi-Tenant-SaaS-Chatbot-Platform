import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { icon: React.ReactNode; value: string | number; label: string; delta?: string };

const KpiCard = ({ icon, value, label, delta }: Props) => (
  <Card className="rounded-xl">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {delta ? <p className="text-xs text-muted-foreground mt-1">{delta}</p> : null}
    </CardContent>
  </Card>
);

export default KpiCard;

