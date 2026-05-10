"use client";

import { useState, useEffect } from "react";
import { Package, ChevronRight, ChevronDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchOrders = async () => {
      try {
        const { orderApi } = await import("@/lib/api");
        const res = await orderApi.getOrders();
        if (mounted) {
          setOrders(res.data.results || res.data);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        if (mounted) setLoadingOrders(false);
      }
    };
    fetchOrders();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-4xl animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Orders & Returns</h1>
        <p className="text-neutral-500 mt-2">Track, return, or buy items again.</p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        {loadingOrders ? (
          <div className="p-12 flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
            <p className="text-neutral-500 font-medium">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">No orders yet</h3>
            <p className="text-neutral-500 mb-6">You haven't placed any orders. Start exploring our catalog.</p>
            <a href="/" className="inline-block bg-neutral-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-900 transition-colors">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {orders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-neutral-50/50 transition-colors">
                <div 
                  className="flex flex-wrap items-center justify-between gap-4 cursor-pointer"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-600">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 font-medium">Order #{String(order.id).padStart(6, '0')}</p>
                      <p className="text-sm font-medium text-neutral-900 mt-0.5">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-neutral-500 font-medium">Total</p>
                      <p className="font-bold text-neutral-900">{formatCurrency(order.total_amount)}</p>
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                      {order.status}
                    </div>
                    {expandedOrder === order.id ? <ChevronDown className="w-5 h-5 text-neutral-400" /> : <ChevronRight className="w-5 h-5 text-neutral-400" />}
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="mt-6 pt-6 border-t border-neutral-100 animate-in fade-in slide-in-from-top-2 duration-200">
                    <h4 className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wider">Order Items</h4>
                    <div className="space-y-4">
                      {order.items?.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
                          {item.product_image && (
                            <Image 
                              src={item.product_image} 
                              alt={item.product_name}
                              width={60} 
                              height={60} 
                              className="rounded-lg object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-bold text-neutral-900">{item.product_name}</p>
                            <p className="text-sm text-neutral-500">Qty: {item.quantity} × {formatCurrency(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
