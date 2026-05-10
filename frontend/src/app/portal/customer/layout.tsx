"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import PortalGuard from "@/components/auth/PortalGuard";
import { User, Package, MapPin, Heart, LogOut, LayoutDashboard, ShoppingBag, Bell, HelpCircle } from "lucide-react";

export default function CustomerPortalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const navigation = [
    { name: "Dashboard", href: "/portal/customer", icon: LayoutDashboard },
    { name: "Personal Info", href: "/portal/customer/profile", icon: User },
    { name: "Orders & Returns", href: "/portal/customer/orders", icon: Package },
    { name: "Wishlist", href: "/portal/customer/wishlist", icon: Heart },
    { name: "Addresses", href: "/portal/customer/addresses", icon: MapPin },
    { name: "Notifications", href: "/portal/customer/notifications", icon: Bell },
    { name: "Support", href: "/portal/customer/support", icon: HelpCircle },
  ];

  return (
    <PortalGuard allowedRoles={["CUSTOMER", "MERCHANT", "ADMIN"]}>
      <div className="flex h-screen bg-neutral-50/50">
        {/* Customer Sidebar */}
        <aside className="w-72 bg-white border-r border-neutral-200 flex flex-col">
          <div className="p-8">
            <Link href="/" className="text-2xl font-bold tracking-widest text-neutral-900">
              L U X E
            </Link>
          </div>

          {/* User Profile Snippet */}
          <div className="px-8 pb-6 mb-2 border-b border-neutral-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm uppercase">
                {user?.first_name?.[0] || ""}{user?.last_name?.[0] || user?.email?.[0]}
              </div>
              <div>
                <h2 className="font-semibold text-neutral-900 line-clamp-1">
                  {user?.first_name} {user?.last_name}
                </h2>
                <p className="text-xs text-neutral-500 font-medium">Customer Portal</p>
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
                      ? "bg-brand-50 text-brand-700 shadow-sm" 
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-brand-600" : "text-neutral-400"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-neutral-100">
            <button 
              onClick={() => {
                logout();
                window.location.href = "/login";
              }}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-neutral-50/50 p-8 lg:p-12">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </PortalGuard>
  );
}
