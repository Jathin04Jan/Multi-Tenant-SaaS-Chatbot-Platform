import * as React from "react";
import { cn } from "@/lib/utils";

export interface PageSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "none" | "sm" | "md" | "lg";
}

const spacingClasses = {
  none: "",
  sm: "space-y-4",
  md: "space-y-6",
  lg: "space-y-8",
};

const PageSection = React.forwardRef<HTMLDivElement, PageSectionProps>(
  ({ className, spacing = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spacingClasses[spacing], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
PageSection.displayName = "PageSection";

export { PageSection };

