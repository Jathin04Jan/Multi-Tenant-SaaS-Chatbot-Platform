import { useState } from "react";
import { X } from "lucide-react";

const ImpersonationBanner = ({ tenant = "Tenant X" }: { tenant?: string }) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur px-4 lg:px-6 py-2 text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span>Demo: Viewing as {tenant} – UI only</span>
        <button aria-label="Dismiss" onClick={() => setDismissed(true)} className="p-1">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ImpersonationBanner;

