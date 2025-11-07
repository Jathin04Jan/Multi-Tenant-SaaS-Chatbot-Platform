import { Badge } from "@/components/ui/badge";

export type AdminStatusVariant = "operational" | "syncing" | "degraded" | "down";

const variantToBadge: Record<AdminStatusVariant, React.ComponentProps<typeof Badge>["variant"]> = {
  operational: "secondary",
  syncing: "outline",
  degraded: "default",
  down: "destructive",
};

const StatusPill = ({ variant }: { variant: AdminStatusVariant }) => (
  <Badge variant={variantToBadge[variant]} className="rounded-full">
    {variant}
  </Badge>
);

export default StatusPill;

