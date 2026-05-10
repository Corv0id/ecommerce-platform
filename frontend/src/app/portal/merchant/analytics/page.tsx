"use client";

import { useEffect, useState } from "react";
import { analyticsApi } from "@/lib/api";
import { Activity, Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { formatCurrency } from "@/lib/utils";

const COLORS = ['#10b981', '#f43f5e', '#f59e0b', '#3b82f6'];

export default function MerchantAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchAnalytics = async () => {
      try {
        const response = await analyticsApi.getChurnStats();
        if (mounted) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAnalytics();
    return () => { mounted = false; };
  }, []);

  if (loading || !data) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          <p className="text-neutral-500 font-medium">Processing analytics models...</p>
        </div>
      </div>
    );
  }

  const { general_metrics, churn_metrics, churn_by_order_count } = data;

  const pieData = [
    { name: 'Retained', value: churn_metrics.total_retained },
    { name: 'Churned', value: churn_metrics.total_churned },
  ];

  const barData = churn_by_order_count.map((item: any) => ({
    name: item.orders + ' Orders',
    Retained: item.retained,
    Churned: item.churned,
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Analytics & Churn</h1>
        <p className="text-neutral-400 mt-2">Predictive insights and store performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-neutral-400 font-medium">Total Sales</h3>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(general_metrics.total_sales)}</p>
          <div className="flex items-center gap-2 mt-4 text-emerald-500 text-sm font-medium">
            <TrendingUp className="w-4 h-4" /> +12.5% vs last month
          </div>
        </div>

        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-neutral-400 font-medium">Active Users</h3>
          </div>
          <p className="text-3xl font-bold text-white">{general_metrics.active_users_this_month}</p>
          <div className="flex items-center gap-2 mt-4 text-emerald-500 text-sm font-medium">
            <TrendingUp className="w-4 h-4" /> +5.2% vs last month
          </div>
        </div>

        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-neutral-400 font-medium">Conversion</h3>
          </div>
          <p className="text-3xl font-bold text-white">{general_metrics.conversion_rate}%</p>
          <div className="flex items-center gap-2 mt-4 text-emerald-500 text-sm font-medium">
            <TrendingUp className="w-4 h-4" /> +0.8% vs last month
          </div>
        </div>

        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6" />
            </div>
            <h3 className="text-neutral-400 font-medium">Churn Rate</h3>
          </div>
          <p className="text-3xl font-bold text-white">{churn_metrics.churn_rate}%</p>
          <div className="flex items-center gap-2 mt-4 text-red-500 text-sm font-medium">
            <TrendingUp className="w-4 h-4" /> +2.1% vs last month
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 bg-neutral-900 rounded-2xl border border-neutral-800 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-white mb-6">Retention by Order Count</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="name" stroke="#a3a3a3" />
                <YAxis stroke="#a3a3a3" />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="Retained" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="Churned" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 shadow-sm flex flex-col items-center">
          <h2 className="text-lg font-bold text-white mb-2 self-start">Customer Base Health</h2>
          <p className="text-sm text-neutral-400 self-start mb-6">Ratio of active vs churned users.</p>
          
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', color: '#fff', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-white">{churn_metrics.retention_rate}%</span>
              <span className="text-xs text-neutral-500 font-medium">Retained</span>
            </div>
          </div>
          
          <div className="flex gap-6 mt-4 w-full justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-neutral-300">Retained ({pieData[0].value})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-neutral-300">Churned ({pieData[1].value})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
