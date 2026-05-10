import { ReactNode } from "react";
import PortalGuard from "@/components/auth/PortalGuard";

/**
 * Root Portal Layout
 * All routes under /portal require authentication.
 * Role-based layouts are handled in specific sub-directories.
 */
export default function RootPortalLayout({ children }: { children: ReactNode }) {
  return (
    <PortalGuard>
      {/* 
        This is a wrapper for all portals. 
        Specific navigation (Sidebar/TopNav) will be defined in 
        /customer/layout.tsx, /merchant/layout.tsx, /admin/layout.tsx 
      */}
      <div className="portal-root min-h-screen bg-background">
        {children}
      </div>
    </PortalGuard>
  );
}
