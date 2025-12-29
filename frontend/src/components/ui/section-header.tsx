import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  subtitle?: string | React.ReactNode;
  icon?: LucideIcon;
  actions?: React.ReactNode;
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, eyebrow, title, subtitle, icon: Icon, actions, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-start justify-between gap-4", className)}
        {...props}
      >
        <div className="space-y-2 flex-1">
          {eyebrow && (
            <p className="text-micro text-muted-foreground font-semibold uppercase tracking-wider">
              {eyebrow}
            </p>
          )}
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
            )}
            <div>
              <h2 className="text-h2">{title}</h2>
              {subtitle && (
                <p className="text-body-sm text-muted-foreground mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    );
  }
);
SectionHeader.displayName = "SectionHeader";

export { SectionHeader };

