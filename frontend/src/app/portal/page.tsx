"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function PortalIndexPage() {
  const router = useRouter();
  const { user, isAuthenticated, _hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!_hasHydrated) return;

    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    if (user.role === "ADMIN") {
      router.replace("/portal/admin");
    } else if (user.role === "MERCHANT") {
      router.replace("/portal/merchant");
    } else {
      router.replace("/portal/customer"); // Default to customer portal
    }
  }, [isAuthenticated, user, router, _hasHydrated]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium">Redirecting to your portal...</p>
      </div>
    </div>
  );
}
