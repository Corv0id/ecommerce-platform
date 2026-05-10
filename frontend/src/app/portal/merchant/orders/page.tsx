"use client";

import { useEffect, useState } from "react";
import { orderApi } from "@/lib/api";
import { Package, Search, Filter } from "lucide-react";

export default function MerchantOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchOrders = async () => {
      try {
        const response = await orderApi.getAdminOrders();
        if (mounted) {
          setOrders(response.data.results || response.data);
        }
      } catch (error) {
        console.error("Failed to fetch merchant orders", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Order Fulfillment</h1>
          <p className="text-neutral-400 mt-2">Manage and track all customer orders.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-neutral-900 text-neutral-300 px-4 py-2 rounded-xl font-medium border border-neutral-800 hover:bg-neutral-800 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="bg-amber-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-amber-700 transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-neutral-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            <p className="text-neutral-500 font-medium">Loading orders...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-950/50 text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Total</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="w-12 h-12 bg-neutral-950 text-neutral-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Package className="w-6 h-6" />
                      </div>
                      <p className="text-neutral-400 font-medium">No orders found.</p>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-800/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-white">#ORD-{order.id.toString().padStart(6, '0')}</td>
                      <td className="px-6 py-4 text-neutral-400">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-950 border border-neutral-800 text-neutral-300">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-white">
                        {order.total_amount} {order.currency}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-amber-500 font-medium text-sm hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
