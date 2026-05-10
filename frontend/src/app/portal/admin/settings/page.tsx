"use client";

import { useState } from "react";
import { Settings, Globe, Shield, Zap, Save, CheckCircle2, X } from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('platform');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'platform', label: 'Platform Settings', icon: Globe },
    { id: 'security', label: 'Security Policies', icon: Shield },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'integrations', label: 'Integrations', icon: Settings },
  ];

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      {/* Modal Overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white capitalize">{modalOpen} Configuration</h3>
              <button onClick={() => setModalOpen(null)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">API Key / Connection String</label>
                <input 
                  type="password" 
                  defaultValue="sk_test_1234567890abcdef"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(null)} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={() => setModalOpen(null)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Save Keys
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">System Settings</h1>
          <p className="text-slate-400 mt-2">Global configuration and platform parameters.</p>
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
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-sm">
          {saved && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-4 py-3 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5" />
              Global settings updated successfully.
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === 'platform' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Core Platform</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Platform Name</label>
                    <input 
                      type="text" 
                      defaultValue="L U X E Enterprise"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Support Email</label>
                    <input 
                      type="email" 
                      defaultValue="support@luxe-platform.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Default Currency</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none">
                      <option>TND</option>
                      <option>USD</option>
                      <option>EUR</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Platform Fee (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      defaultValue="2.5"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
                  <div>
                    <h4 className="text-white font-medium flex items-center gap-2">Global Maintenance Mode</h4>
                    <p className="text-sm text-slate-400 mt-1">Suspend all customer-facing traffic. API continues for Admins.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Access & Identity</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Require 2FA for Admins</h4>
                      <p className="text-sm text-slate-400 mt-1">Enforce two-factor authentication on all administrative accounts.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800 pt-6">
                    <div>
                      <h4 className="text-white font-medium">Public Registration</h4>
                      <p className="text-sm text-slate-400 mt-1">Allow new users to create CUSTOMER accounts.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                  <div className="space-y-2 border-t border-slate-800 pt-6">
                    <label className="text-sm font-medium text-slate-300">Session Timeout (Minutes)</label>
                    <input 
                      type="number" 
                      defaultValue="60"
                      className="w-full md:w-1/2 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Performance Optimization</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 border-b border-slate-800 pb-6 md:border-b-0 md:border-r md:pr-6">
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" /> Cache Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-300 block mb-2">Global Cache TTL (Seconds)</label>
                        <select defaultValue="3600" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none">
                          <option value="900">15 Minutes</option>
                          <option value="3600">1 Hour</option>
                          <option value="86400">24 Hours</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-300">Enable CDN Edge Caching</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 md:pl-6">
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-emerald-500" /> API Limits
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-300 block mb-2">Rate Limit (Req / Minute)</label>
                        <input 
                          type="number" 
                          defaultValue="60"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-300">Strict IP Throttling</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">External Integrations</h2>
                
                <div className="space-y-4">
                  <div className="p-5 border border-slate-800 rounded-xl bg-slate-950/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-white font-medium">Stripe Payment Gateway</h4>
                      <p className="text-sm text-slate-500 mt-1">Configure API keys for processing credit card transactions.</p>
                    </div>
                    <button type="button" onClick={() => setModalOpen('Stripe')} className="shrink-0 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                      Configure Keys
                    </button>
                  </div>

                  <div className="p-5 border border-slate-800 rounded-xl bg-slate-950/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-medium">SendGrid Mailer</h4>
                        <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Active</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">SMTP settings for automated transactional emails.</p>
                    </div>
                    <button type="button" onClick={() => setModalOpen('SendGrid')} className="shrink-0 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                      Manage
                    </button>
                  </div>

                  <div className="p-5 border border-slate-800 rounded-xl bg-slate-950/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-medium">ElasticSearch Analytics</h4>
                        <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Setup Req.</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">Connect cluster for advanced search and telemetry logs.</p>
                    </div>
                    <button type="button" onClick={() => setModalOpen('ElasticSearch')} className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-slate-800 flex justify-end">
              <button 
                type="submit" 
                disabled={saving || activeTab === 'performance' || activeTab === 'integrations'}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save className="w-5 h-5" />
                )}
                Save Configuration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
