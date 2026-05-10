"use client";

import { useAuthStore } from "@/store/authStore";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";

export default function MerchantDashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Business Overview</h1>
        <p className="text-neutral-400 mt-2">Welcome back, {user?.first_name}. Here is your store's performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6" />
          </div>
          <p className="text-neutral-400 font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-white mt-1">124,592.00 TND</p>
        </div>

        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-4">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <p className="text-neutral-400 font-medium">New Orders</p>
          <p className="text-3xl font-bold text-white mt-1">342</p>
        </div>

        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center mb-4">
            <Package className="w-6 h-6" />
          </div>
          <p className="text-neutral-400 font-medium">Active Products</p>
          <p className="text-3xl font-bold text-white mt-1">89</p>
        </div>

        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-neutral-400 font-medium">Conversion Rate</p>
          <p className="text-3xl font-bold text-white mt-1">4.2%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-8">
          <h2 className="text-lg font-bold text-white mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-neutral-950/50 rounded-lg border border-neutral-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-emerald-500 font-bold">
                  AT
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-300">Order #ORD-8921</p>
                  <p className="text-xs text-neutral-500">Ahmed Trabelsi • 10 mins ago</p>
                </div>
              </div>
              <span className="font-bold text-white">+750.00 TND</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-950/50 rounded-lg border border-neutral-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-blue-500 font-bold">
                  SB
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-300">Order #ORD-8920</p>
                  <p className="text-xs text-neutral-500">Sara Ben Ali • 1 hour ago</p>
                </div>
              </div>
              <span className="font-bold text-white">+390.00 TND</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-950/50 rounded-lg border border-neutral-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-purple-500 font-bold">
                  YG
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-300">Order #ORD-8919</p>
                  <p className="text-xs text-neutral-500">Youssef Gharbi • 3 hours ago</p>
                </div>
              </div>
              <span className="font-bold text-white">+280.00 TND</span>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-8">
          <h2 className="text-lg font-bold text-white mb-6">Top Selling Products</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-neutral-950/50 rounded-lg border border-neutral-800/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-neutral-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-300">Classic Leather Watch</p>
                  <p className="text-xs text-neutral-500">142 units sold</p>
                </div>
              </div>
              <span className="text-sm font-bold text-emerald-500">+106,500 TND</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-950/50 rounded-lg border border-neutral-800/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-neutral-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-300">Minimalist Backpack</p>
                  <p className="text-xs text-neutral-500">89 units sold</p>
                </div>
              </div>
              <span className="text-sm font-bold text-emerald-500">+34,710 TND</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-950/50 rounded-lg border border-neutral-800/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-neutral-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-300">Wireless Earbuds</p>
                  <p className="text-xs text-neutral-500">56 units sold</p>
                </div>
              </div>
              <span className="text-sm font-bold text-emerald-500">+15,680 TND</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
