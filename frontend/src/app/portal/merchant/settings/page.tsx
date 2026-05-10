"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Store, CreditCard, Bell, Shield, Save, CheckCircle2 } from "lucide-react";

export default function MerchantSettingsPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate API call to update StoreSettings
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'general', label: 'General Info', icon: Store },
    { id: 'billing', label: 'Billing & Taxes', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Store Settings</h1>
          <p className="text-neutral-400 mt-2">Manage your merchant account preferences and configuration.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500/10 text-amber-500'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-sm">
          {saved && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-4 py-3 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5" />
              Settings saved successfully!
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === 'general' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-4">Store Identity</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Store Name</label>
                    <input 
                      type="text" 
                      defaultValue="Luxe Merchant Store"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Contact Email</label>
                    <input 
                      type="email" 
                      defaultValue={user?.email || ""}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-neutral-300">Store Description</label>
                    <textarea 
                      rows={3}
                      defaultValue="Premium vendor of luxury goods on the Luxe platform."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-amber-500 outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-neutral-800">
                  <div>
                    <h4 className="text-white font-medium">Maintenance Mode</h4>
                    <p className="text-sm text-neutral-400 mt-1">Temporarily hide your store from customers.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-4">Financial Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Base Currency</label>
                    <select className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-amber-500 outline-none">
                      <option>TND - Tunisian Dinar</option>
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Tax Rate (%)</label>
                    <input 
                      type="number" 
                      defaultValue="19.0"
                      step="0.1"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-4">Communication Preferences</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">New Order Alerts</h4>
                      <p className="text-sm text-neutral-400 mt-1">Receive an email when a customer places an order.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between border-t border-neutral-800 pt-6">
                    <div>
                      <h4 className="text-white font-medium">Low Inventory Warnings</h4>
                      <p className="text-sm text-neutral-400 mt-1">Get notified when a product stock falls below the threshold.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between border-t border-neutral-800 pt-6">
                    <div>
                      <h4 className="text-white font-medium">Marketing & Platform Updates</h4>
                      <p className="text-sm text-neutral-400 mt-1">Receive news and feature updates from L U X E.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-4">Security Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Two-Factor Authentication (2FA)</h4>
                      <p className="text-sm text-neutral-400 mt-1">Add an extra layer of security to your merchant account.</p>
                    </div>
                    <button type="button" className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-neutral-700">
                      Enable 2FA
                    </button>
                  </div>
                  <div className="space-y-4 border-t border-neutral-800 pt-6">
                    <h4 className="text-white font-medium">Change Password</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="password" 
                        placeholder="Current Password"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                      <input 
                        type="password" 
                        placeholder="New Password"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="border-t border-neutral-800 pt-6">
                    <div className="p-4 border border-red-500/20 bg-red-500/5 rounded-xl flex items-start justify-between">
                      <div>
                        <h4 className="text-red-500 font-medium">Danger Zone</h4>
                        <p className="text-sm text-neutral-400 mt-1">Permanently delete your merchant store and all associated data.</p>
                      </div>
                      <button type="button" className="shrink-0 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-red-500/20">
                        Delete Store
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-neutral-800 flex justify-end">
              <button 
                type="submit" 
                disabled={saving}
                className="flex items-center gap-2 bg-amber-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save className="w-5 h-5" />
                )}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
