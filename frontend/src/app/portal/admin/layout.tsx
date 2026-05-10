"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import PortalGuard from "@/components/auth/PortalGuard";
import { LogOut, LayoutDashboard, Users, Activity, ShieldAlert, Database, Settings } from "lucide-react";

export default function AdminPortalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const navigation = [
    { name: "System Overview", href: "/portal/admin", icon: LayoutDashboard },
    { name: "User Management", href: "/portal/admin/users", icon: Users },
    { name: "Global Analytics", href: "/portal/admin/analytics", icon: Activity },
    { name: "Moderation & Logs", href: "/portal/admin/logs", icon: ShieldAlert },
    { name: "Data Maintenance", href: "/portal/admin/data", icon: Database },
    { name: "System Settings", href: "/portal/admin/settings", icon: Settings },
  ];

  return (
    <PortalGuard allowedRoles={["ADMIN"]}>
      <div className="flex h-screen bg-slate-950 text-white">
        {/* Admin Sidebar */}
        <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">
          <div className="p-8">
            <Link href="/" className="text-2xl font-bold tracking-widest text-white flex items-center gap-2">
              L U X E <span className="text-xs font-mono bg-red-500/20 text-red-500 px-2 py-1 rounded">SYS_ADMIN</span>
            </Link>
          </div>

          <div className="px-8 pb-6 mb-2 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm uppercase">
                {user?.first_name?.[0] || ""}{user?.last_name?.[0] || user?.email?.[0]}
              </div>
              <div>
                <h2 className="font-semibold text-white line-clamp-1">
                  {user?.first_name} {user?.last_name}
                </h2>
                <p className="text-xs text-red-400 font-medium tracking-wider">SUPERVISOR</p>
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
                      ? "bg-red-500/10 text-red-500 shadow-sm border border-red-500/20" 
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-red-500" : "text-slate-500"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-slate-800">
            <button 
              onClick={() => {
                logout();
                window.location.href = "/login";
              }}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </PortalGuard>
  );
}
