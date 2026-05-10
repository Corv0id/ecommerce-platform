"use client";

import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  AreaChart, Area
} from 'recharts';

const COLORS = ['#e5e5e5', '#3f3f46', '#a1a1aa', '#18181b'];

interface ChurnDashboardProps {
  data: {
    general_metrics: any;
    churn_metrics: any;
    app_engagement: any;
    model_performance: any[];
    churn_by_order_count: any[];
  }
}

export default function ChurnDashboard({ data }: ChurnDashboardProps) {
  const { general_metrics, churn_metrics, app_engagement, model_performance, churn_by_order_count } = data;

  const pieData = [
    { name: 'Retained', value: churn_metrics.total_retained },
    { name: 'Churned', value: churn_metrics.total_churned },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <p className="text-neutral-400 text-sm font-medium">Total Users</p>
          <p className="text-3xl font-bold mt-2">{general_metrics.total_users.toLocaleString()}</p>
          <p className="text-emerald-500 text-sm mt-2 flex items-center">
            <span>+12% this month</span>
          </p>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <p className="text-neutral-400 text-sm font-medium">Total Sales</p>
          <p className="text-3xl font-bold mt-2">${general_metrics.total_sales.toLocaleString()}</p>
          <p className="text-emerald-500 text-sm mt-2 flex items-center">
            <span>+5.4% this month</span>
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <p className="text-neutral-400 text-sm font-medium">Retention Rate</p>
          <p className="text-3xl font-bold mt-2">{churn_metrics.retention_rate}%</p>
          <p className="text-rose-500 text-sm mt-2 flex items-center">
            <span>-2.1% this month</span>
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <p className="text-neutral-400 text-sm font-medium">Avg Orders / User</p>
          <p className="text-3xl font-bold mt-2">{app_engagement.avg_orders_per_user}</p>
          <p className="text-neutral-500 text-sm mt-2 flex items-center">
            <span>Stable</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Retention Pie Chart */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl col-span-1">
          <h3 className="text-lg font-medium mb-4">User Retention</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                  itemStyle={{ color: '#e5e5e5' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Churn by Orders Area Chart */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl col-span-2">
          <h3 className="text-lg font-medium mb-4">Retention vs Churn by Order Count</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={churn_by_order_count}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="orders" stroke="#737373" />
                <YAxis stroke="#737373" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="retained" stackId="1" stroke="#e5e5e5" fill="#e5e5e5" />
                <Area type="monotone" dataKey="churned" stackId="1" stroke="#3f3f46" fill="#3f3f46" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ML Model Performance */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl col-span-1 lg:col-span-3">
          <h3 className="text-lg font-medium mb-4">ML Models Performance (Accuracy %)</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={model_performance}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#737373" />
                <YAxis dataKey="name" type="category" stroke="#737373" width={150} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                  cursor={{fill: '#262626'}}
                />
                <Bar dataKey="accuracy" fill="#e5e5e5" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
