"use client";

import { Activity, Users, DollarSign, TrendingUp, Cpu, Server, Database } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  AreaChart, Area
} from "recharts";

const performanceData = [
  { name: 'Logistic Regression', accuracy: 79 },
  { name: 'Random Forest', accuracy: 82 },
  { name: 'KNN', accuracy: 79 },
  { name: 'SVM', accuracy: 76 },
  { name: 'XGBoost', accuracy: 86 }
];

const trafficData = [
  { time: '00:00', users: 1200 },
  { time: '04:00', users: 800 },
  { time: '08:00', users: 3500 },
  { time: '12:00', users: 5200 },
  { time: '16:00', users: 6100 },
  { time: '20:00', users: 4800 },
  { time: '23:59', users: 2100 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Global Analytics</h1>
        <p className="text-slate-400 mt-2">Platform-wide performance, ML models, and infrastructure metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-slate-400 font-medium">Total Users</h3>
          </div>
          <p className="text-3xl font-bold text-white">12,543</p>
          <div className="flex items-center gap-2 mt-4 text-emerald-500 text-sm font-medium">
            <TrendingUp className="w-4 h-4" /> +15% this month
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-slate-400 font-medium">Platform GMV</h3>
          </div>
          <p className="text-3xl font-bold text-white">$4.2M</p>
          <div className="flex items-center gap-2 mt-4 text-emerald-500 text-sm font-medium">
            <TrendingUp className="w-4 h-4" /> +8.4% this month
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-slate-400 font-medium">ML Predictions</h3>
          </div>
          <p className="text-3xl font-bold text-white">45.2K</p>
          <div className="flex items-center gap-2 mt-4 text-slate-500 text-sm font-medium">
            Computed in last 24h
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-slate-400 font-medium">Storage Used</h3>
          </div>
          <p className="text-3xl font-bold text-white">845 GB</p>
          <div className="flex items-center gap-2 mt-4 text-slate-500 text-sm font-medium">
            65% of allocated capacity
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-white mb-6">Machine Learning Model Accuracy</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[50, 100]} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="accuracy" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-white mb-6">Real-time Platform Traffic</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
