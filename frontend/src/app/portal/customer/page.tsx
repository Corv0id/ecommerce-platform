"use client";

import { useAuthStore } from "@/store/authStore";
import { Package, Heart, MapPin, Clock } from "lucide-react";

export default function CustomerDashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Welcome back, {user?.first_name}</h1>
        <p className="text-neutral-500 mt-2">Here is an overview of your account activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <Package className="w-6 h-6" />
          </div>
          <p className="text-neutral-500 font-medium">Active Orders</p>
          <p className="text-3xl font-bold text-neutral-900 mt-1">2</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center mb-4">
            <Heart className="w-6 h-6" />
          </div>
          <p className="text-neutral-500 font-medium">Wishlist Items</p>
          <p className="text-3xl font-bold text-neutral-900 mt-1">{user?.wishlist?.length || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <p className="text-neutral-500 font-medium">Saved Addresses</p>
          <p className="text-3xl font-bold text-neutral-900 mt-1">{user?.addresses?.length || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
            <Clock className="w-6 h-6" />
          </div>
          <p className="text-neutral-500 font-medium">LTV Status</p>
          <p className="text-lg font-bold text-neutral-900 mt-1">Premium</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
          <h2 className="text-lg font-bold text-neutral-900 mb-6">Recent Orders</h2>
          <div className="text-center py-12 text-neutral-500 bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
            Fetching recent orders... (To be migrated in Phase 2)
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
          <h2 className="text-lg font-bold text-neutral-900 mb-6">Recommended for You</h2>
          <div className="text-center py-12 text-neutral-500 bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
            AI Recommendations will appear here.
          </div>
        </div>
      </div>
    </div>
  );
}
