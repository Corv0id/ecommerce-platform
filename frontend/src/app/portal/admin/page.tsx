"use client";

import { useAuthStore } from "@/store/authStore";
import { Server, Activity, Users, ShieldAlert } from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">System Supervision</h1>
        <p className="text-slate-400 mt-2">Welcome back, {user?.first_name}. Global system status is nominal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-slate-400 font-medium">Total Active Users</p>
          <p className="text-3xl font-bold text-white mt-1">14,293</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center mb-4">
            <Server className="w-6 h-6" />
          </div>
          <p className="text-slate-400 font-medium">System Uptime</p>
          <p className="text-3xl font-bold text-white mt-1">99.9%</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center mb-4">
            <Activity className="w-6 h-6" />
          </div>
          <p className="text-slate-400 font-medium">API Requests (24h)</p>
          <p className="text-3xl font-bold text-white mt-1">2.4M</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <p className="text-slate-400 font-medium">Security Alerts</p>
          <p className="text-3xl font-bold text-white mt-1">3</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
          <h2 className="text-lg font-bold text-white mb-6">Recent Audit Logs</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-slate-950/50 rounded-lg border border-slate-800/50">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-300">Admin auth token refreshed</p>
                <p className="text-xs text-slate-500">admin@luxe.com • 192.168.1.42</p>
              </div>
              <span className="text-xs text-slate-500">2 mins ago</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-slate-950/50 rounded-lg border border-slate-800/50">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-300">Catalog inventory synchronized</p>
                <p className="text-xs text-slate-500">system_daemon • localhost</p>
              </div>
              <span className="text-xs text-slate-500">1 hour ago</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-slate-950/50 rounded-lg border border-slate-800/50">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-300">Failed login attempt</p>
                <p className="text-xs text-slate-500">unknown • 45.22.19.11</p>
              </div>
              <span className="text-xs text-slate-500">3 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
          <h2 className="text-lg font-bold text-white mb-6">Platform Metrics</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Database Load</span>
                <span className="text-emerald-500 font-medium">42%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Cache Utilization</span>
                <span className="text-blue-500 font-medium">78%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Storage Capacity</span>
                <span className="text-amber-500 font-medium">85%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
