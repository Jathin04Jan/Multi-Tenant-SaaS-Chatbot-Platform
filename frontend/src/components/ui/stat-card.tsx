import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  hint?: string;
  detail?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, hint, detail, icon: Icon, trend, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="glass"
        className={cn(
          "relative overflow-hidden transition-all hover:border-primary/20",
          className
        )}
        {...props}
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <p className="text-micro text-muted-foreground font-medium uppercase tracking-wider">
              {label}
            </p>
            {Icon && (
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            )}
          </div>
          <p className="text-3xl font-bold leading-tight">{value}</p>
          {detail && (
            <p className="text-body-sm text-primary/80 font-medium">{detail}</p>
          )}
          {hint && (
            <p className="text-small text-muted-foreground">{hint}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1.5 pt-1">
              <span
                className={cn(
                  "text-small font-medium",
                  trend.positive !== false
                    ? "text-success"
                    : "text-destructive"
                )}
              >
                {trend.positive !== false ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-small text-muted-foreground">
                {trend.label}
              </span>
            </div>
          )}
        </div>
      </Card>
    );
  }
);
StatCard.displayName = "StatCard";

export { StatCard };

