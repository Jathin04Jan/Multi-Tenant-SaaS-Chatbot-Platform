import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

const Drawer = ({ open, onOpenChange, title, children }: DrawerProps) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent side="right" className="w-full sm:max-w-lg">
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
      </SheetHeader>
      <div className="mt-4">{children}</div>
    </SheetContent>
  </Sheet>
);

export default Drawer;

