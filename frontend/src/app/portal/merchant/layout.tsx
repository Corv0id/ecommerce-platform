"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import PortalGuard from "@/components/auth/PortalGuard";
import { LogOut, LayoutDashboard, ShoppingBag, PackageOpen, PieChart, Users, Settings } from "lucide-react";

export default function MerchantPortalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const navigation = [
    { name: "Business Overview", href: "/portal/merchant", icon: LayoutDashboard },
    { name: "Catalog Management", href: "/portal/merchant/catalog", icon: PackageOpen },
    { name: "Order Fulfillment", href: "/portal/merchant/orders", icon: ShoppingBag },
    { name: "Customer Insights", href: "/portal/merchant/customers", icon: Users },
    { name: "Analytics & Churn", href: "/portal/merchant/analytics", icon: PieChart },
    { name: "Store Settings", href: "/portal/merchant/settings", icon: Settings },
  ];

  return (
    <PortalGuard allowedRoles={["MERCHANT", "ADMIN"]}>
      <div className="flex h-screen bg-neutral-950 text-white">
        {/* Merchant Sidebar */}
        <aside className="w-72 bg-neutral-900 border-r border-neutral-800 flex flex-col">
          <div className="p-8">
            <Link href="/" className="text-2xl font-bold tracking-widest text-white">
              L U X E
            </Link>
          </div>

          <div className="px-8 pb-6 mb-2 border-b border-neutral-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm uppercase">
                {user?.first_name?.[0] || ""}{user?.last_name?.[0] || user?.email?.[0]}
              </div>
              <div>
                <h2 className="font-semibold text-white line-clamp-1">
                  {user?.first_name} {user?.last_name}
                </h2>
                <p className="text-xs text-amber-500 font-medium">Merchant Portal</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive 
                      ? "bg-amber-500/10 text-amber-500 shadow-sm" 
                      : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-amber-500" : "text-neutral-500"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-neutral-800">
            <button 
              onClick={() => {
                logout();
                window.location.href = "/login";
              }}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-neutral-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-neutral-950 p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </PortalGuard>
  );
}
