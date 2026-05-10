"use client";

import { useEffect, useState } from "react";
import { accountApi } from "@/lib/api";
import { Users, Search, Download, X, Mail, MapPin, Calendar, ShoppingBag } from "lucide-react";

export default function MerchantCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchCustomers = async () => {
      try {
        const response = await accountApi.getAdminCustomers();
        if (mounted) {
          const data = response.data.results || response.data;
          setCustomers(data);
        }
      } catch (error) {
        console.error("Failed to fetch merchant customers", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchCustomers();
    return () => { mounted = false; };
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const link = document.createElement('a');
      link.href = 'data:text/csv;charset=utf-8,ID,Email,FirstName,LastName,JoinedDate\n';
      link.download = 'customer_insights.csv';
      link.click();
    }, 1500);
  };

  const filteredCustomers = customers.filter(c => {
    const term = searchQuery.toLowerCase();
    return (
      c.email?.toLowerCase().includes(term) ||
      c.first_name?.toLowerCase().includes(term) ||
      c.last_name?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* View Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center text-xl font-bold text-neutral-300 uppercase border border-neutral-700">
                  {selectedCustomer.first_name?.[0] || selectedCustomer.email?.[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedCustomer.first_name || selectedCustomer.last_name ? `${selectedCustomer.first_name} ${selectedCustomer.last_name}` : 'Unknown'}
                  </h3>
                  <p className="text-amber-500 text-sm font-medium">{selectedCustomer.role}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-neutral-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center gap-3">
                <Mail className="w-5 h-5 text-neutral-500" />
                <div>
                  <p className="text-xs text-neutral-500 font-medium">Email Address</p>
                  <p className="text-sm text-neutral-300">{selectedCustomer.email}</p>
                </div>
              </div>
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-neutral-500" />
                <div>
                  <p className="text-xs text-neutral-500 font-medium">Joined Date</p>
                  <p className="text-sm text-neutral-300">{new Date(selectedCustomer.date_joined).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-neutral-500" />
                <div>
                  <p className="text-xs text-neutral-500 font-medium">Lifetime Value</p>
                  <p className="text-sm font-bold text-white">Analyzing... (Phase 4)</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6 flex justify-end">
              <button onClick={() => setSelectedCustomer(null)} className="bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors">
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Customer Insights</h1>
          <p className="text-neutral-400 mt-2">Analyze and manage your customer base.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} disabled={isExporting} className="flex items-center gap-2 bg-neutral-900 text-neutral-300 px-4 py-2 rounded-xl font-medium border border-neutral-800 hover:bg-neutral-800 transition-colors disabled:opacity-50">
            {isExporting ? <div className="w-4 h-4 border-2 border-neutral-300 border-t-transparent rounded-full animate-spin"></div> : <Download className="w-4 h-4" />}
            Export Data
          </button>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-neutral-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers by name or email..." 
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            <p className="text-neutral-500 font-medium">Loading customer data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-950/50 text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Joined Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="w-12 h-12 bg-neutral-950 text-neutral-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6" />
                      </div>
                      <p className="text-neutral-400 font-medium">No customers found.</p>
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-neutral-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-300 uppercase">
                            {c.first_name?.[0] || c.email?.[0]}
                          </div>
                          <div>
                            <p className="font-medium text-white">{c.first_name || c.last_name ? `${c.first_name} ${c.last_name}` : 'Unknown'}</p>
                            <p className="text-neutral-500 text-xs">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wider ${
                          c.role === 'ADMIN' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                          c.role === 'MERCHANT' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                          'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                        }`}>
                          {c.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-400">
                        {new Date(c.date_joined).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => setSelectedCustomer(c)} className="text-amber-500 font-medium text-sm hover:text-amber-400 transition-colors">
                          View Profile
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
