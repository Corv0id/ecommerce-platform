"use client";

import { useState } from "react";
import { Database, HardDrive, Cpu, RefreshCw, Archive, CheckCircle2 } from "lucide-react";

export default function AdminDataPage() {
  const [backingUp, setBackingUp] = useState(false);
  const [lastBackup, setLastBackup] = useState("Today, 03:00 AM");

  const triggerBackup = () => {
    setBackingUp(true);
    setTimeout(() => {
      setBackingUp(false);
      setLastBackup("Just now");
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Data Maintenance</h1>
        <p className="text-slate-400 mt-2">Manage database health, backups, and system caches.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold">PostgreSQL Main</h3>
              <p className="text-xs text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Healthy
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Storage Capacity</span>
                <span className="text-white">64% (320GB/500GB)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Active Connections</span>
              <span className="text-white">124 / 500</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold">Redis Cache</h3>
              <p className="text-xs text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Healthy
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Memory Usage</span>
                <span className="text-white">82% (13.1GB/16GB)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Cache Hit Ratio</span>
              <span className="text-white">94.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold">Celery Workers</h3>
              <p className="text-xs text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Healthy
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">CPU Load</span>
                <span className="text-white">45%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Pending Tasks</span>
              <span className="text-white">12</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">Database Operations</h2>
          <p className="text-sm text-slate-400">Run manual maintenance tasks.</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-800 rounded-xl p-5 flex items-start justify-between bg-slate-950/30">
            <div>
              <h4 className="text-white font-medium flex items-center gap-2">
                <Archive className="w-4 h-4 text-blue-400" /> 
                Manual Snapshot
              </h4>
              <p className="text-sm text-slate-500 mt-1 mb-3">Create a full point-in-time backup of the PostgreSQL database.</p>
              <p className="text-xs text-slate-400 font-mono">Last run: {lastBackup}</p>
            </div>
            <button 
              onClick={triggerBackup}
              disabled={backingUp}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {backingUp ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
              {backingUp ? "Backing up..." : "Run Backup"}
            </button>
          </div>

          <div className="border border-slate-800 rounded-xl p-5 flex items-start justify-between bg-slate-950/30">
            <div>
              <h4 className="text-white font-medium flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-400" /> 
                Flush Redis Cache
              </h4>
              <p className="text-sm text-slate-500 mt-1 mb-3">Clear all cached API responses. Will cause a temporary latency spike.</p>
              <p className="text-xs text-amber-500/80 font-mono">Caution: High Impact</p>
            </div>
            <button onClick={() => alert("Redis cache flushed successfully. Caches are rebuilding...")} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700">
              Clear Cache
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
