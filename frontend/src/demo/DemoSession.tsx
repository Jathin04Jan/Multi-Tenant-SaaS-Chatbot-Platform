// [schema-demo:additive]
import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type Role = 'owner' | 'admin';

type DemoSessionValue = {
  role: Role;
  tenantId: string;
  setRole: (r: Role) => void;
  setTenantId: (id: string) => void;
  tenants: { id: string; name: string }[];
};

const DemoSessionContext = createContext<DemoSessionValue | null>(null);

export const useDemoSession = () => {
  const ctx = useContext(DemoSessionContext);
  if (!ctx) throw new Error('useDemoSession must be used within <DemoSessionProvider />');
  return ctx;
};

export const DemoSessionProvider = ({ children }: { children: ReactNode }) => {
  // Lightweight in-memory session for demo
  const [role, setRole] = useState<Role>('owner'); // single-role demo; switcher hidden
  const tenants = useMemo(() => [
    { id: 't_acme', name: 'Acme Inc.' },
    { id: 't_globex', name: 'Globex' },
    { id: 't_initech', name: 'Initech' },
  ], []);
  const [tenantId, setTenantId] = useState<string>(tenants[0].id);

  const value = useMemo(() => ({ role, tenantId, setRole, setTenantId, tenants }), [role, tenantId, tenants]);

  return (
    <DemoSessionContext.Provider value={value}>
      {children}
      {/* [schema-demo:additive] toolbar removed as per request */}
    </DemoSessionContext.Provider>
  );
};

// (No toolbar UI rendered)


