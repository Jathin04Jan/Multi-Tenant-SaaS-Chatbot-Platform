import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ListRowProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  iconColor?: string;
  title: string;
  description?: string;
  meta?: React.ReactNode;
  time?: string;
  onClick?: () => void;
}

const ListRow = React.forwardRef<HTMLDivElement, ListRowProps>(
  (
    {
      className,
      icon: Icon,
      iconColor = "text-primary",
      title,
      description,
      meta,
      time,
      onClick,
      ...props
    },
    ref
  ) => {
    const Component = onClick ? "button" : "div";
    return (
      <Component
        ref={ref}
        onClick={onClick}
        className={cn(
          "flex items-start gap-4 p-4 rounded-lg transition-colors",
          onClick && "hover:bg-muted/50 cursor-pointer text-left w-full",
          className
        )}
        {...props}
      >
        {Icon && (
          <div className={cn("w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", iconColor.includes("bg-") && iconColor)}>
            <Icon className={cn("w-5 h-5", !iconColor.includes("bg-") && iconColor)} />
          </div>
        )}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-4">
            <p className="text-body-sm font-medium leading-snug">{title}</p>
            {time && (
              <span className="text-small text-muted-foreground shrink-0">
                {time}
              </span>
            )}
          </div>
          {description && (
            <p className="text-small text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
          {meta && <div className="pt-1">{meta}</div>}
        </div>
      </Component>
    );
  }
);
ListRow.displayName = "ListRow";

export { ListRow };

