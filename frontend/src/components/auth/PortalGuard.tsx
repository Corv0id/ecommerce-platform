"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface PortalGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

/**
 * Enterprise-grade Auth Guard for Portal Routes
 * Ensures user is authenticated and authorized before rendering children.
 * Prevents hydration mismatches and UI flashing.
 */
export default function PortalGuard({ children, allowedRoles }: PortalGuardProps) {
  const { user, isAuthenticated, fetchProfile, _hasHydrated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    let mounted = true;

    const authorize = async () => {
      // Wait for Zustand to hydrate from localStorage
      if (!_hasHydrated) return;

      // 1. Check Authentication
      if (!isAuthenticated) {
        if (mounted) router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // 2. Refresh Profile if user object is incomplete (defense in depth)
      if (isAuthenticated && !user?.role) {
         await fetchProfile();
      }

      const currentUser = useAuthStore.getState().user;

      if (!currentUser) {
         if (mounted) router.push(`/login`);
         return;
      }

      // 3. Check Role Authorization
      if (allowedRoles && allowedRoles.length > 0) {
        if (!allowedRoles.includes(currentUser.role || "CUSTOMER")) {
          // Unauthorized access attempt - Redirect to their specific portal
          const userRole = currentUser.role || "CUSTOMER";
          const redirectPath = 
            userRole === "ADMIN" ? "/portal/admin" : 
            userRole === "MERCHANT" ? "/portal/merchant" : 
            "/portal/customer";
            
          if (mounted) router.push(redirectPath);
          return;
        }
      }

      // 4. Authorized
      if (mounted) {
        setIsAuthorizing(false);
      }
    };

    authorize();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, user, allowedRoles, router, pathname, fetchProfile, _hasHydrated]);

  // Show a professional loading state while verifying authorization
  if (isAuthorizing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
          <p className="text-muted-foreground animate-pulse text-sm">Verifying secure access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
