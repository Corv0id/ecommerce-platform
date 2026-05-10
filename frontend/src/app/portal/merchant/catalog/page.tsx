"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Search, Plus, Filter, Edit2, Trash2, X, Check } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

export default function MerchantCatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'ADD' | 'EDIT' | null>(null);
  const [activeProduct, setActiveProduct] = useState<any>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({ name: '', price: '', status: 'DRAFT' });

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        const response = await api.get("/catalog/products/");
        if (mounted) {
          setProducts(response.data.results || response.data);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => { mounted = false; };
  }, []);

  const handleOpenAdd = () => {
    setFormData({ name: '', price: '', status: 'DRAFT' });
    setModalMode('ADD');
  };

  const handleOpenEdit = (product: any) => {
    setActiveProduct(product);
    setFormData({ name: product.name, price: product.base_price.toString(), status: product.status || 'DRAFT' });
    setModalMode('EDIT');
  };

  const handleOpenDelete = (product: any) => {
    setActiveProduct(product);
    setIsDeleteOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    
    setTimeout(() => {
      if (modalMode === 'ADD') {
        const newProduct = {
          id: Math.random(),
          name: formData.name,
          slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
          base_price: parseFloat(formData.price),
          status: formData.status,
          category: { name: "Uncategorized" }
        };
        setProducts([newProduct, ...products]);
      } else if (modalMode === 'EDIT' && activeProduct) {
        setProducts(products.map(p => p.id === activeProduct.id ? { ...p, name: formData.name, base_price: parseFloat(formData.price), status: formData.status } : p));
      }
      setModalMode(null);
      setActionLoading(false);
    }, 1000);
  };

  const handleDelete = () => {
    setActionLoading(true);
    setTimeout(() => {
      setProducts(products.filter(p => p.id !== activeProduct.id));
      setIsDeleteOpen(false);
      setActionLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Add/Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">{modalMode === 'ADD' ? 'Add New Product' : 'Edit Product'}</h3>
              <button onClick={() => setModalMode(null)} className="text-neutral-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Product Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-amber-500 outline-none" placeholder="e.g. Silk Scarf" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Base Price (TND)</label>
                <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} type="number" step="0.01" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-amber-500 outline-none" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-amber-500 outline-none">
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setModalMode(null)} className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" disabled={actionLoading} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50">
                  {actionLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Check className="w-4 h-4" />}
                  {modalMode === 'ADD' ? 'Create' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Delete Product</h3>
            <p className="text-neutral-400 text-sm mb-6">Are you sure you want to delete <strong className="text-white">{activeProduct?.name}</strong>? This action cannot be undone.</p>
            <div className="flex justify-center gap-3">
              <button type="button" onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={handleDelete} disabled={actionLoading} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50">
                {actionLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Catalog Management</h1>
          <p className="text-neutral-400 mt-2">Manage your products, inventory, and drafts.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 bg-neutral-900 text-neutral-300 px-4 py-2 rounded-xl font-medium border border-neutral-800 hover:bg-neutral-800 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl p-2 z-10">
                <div className="px-3 py-2 text-xs font-bold text-neutral-500 uppercase">Status</div>
                <button className="w-full text-left px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg">All Statuses</button>
                <button className="w-full text-left px-3 py-2 text-sm text-emerald-500 hover:bg-neutral-800 rounded-lg">Published Only</button>
                <button className="w-full text-left px-3 py-2 text-sm text-amber-500 hover:bg-neutral-800 rounded-lg">Drafts Only</button>
              </div>
            )}
          </div>
          <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-amber-700 transition-colors">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-neutral-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search products by name or SKU..." 
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            <p className="text-neutral-500 font-medium">Loading catalog...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-950/50 text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Price</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                      No products found. Start by adding one.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-neutral-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-neutral-800 overflow-hidden relative flex-shrink-0">
                            {product.main_image ? (
                              <Image src={product.main_image} alt={product.name} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">No Img</div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-white line-clamp-1">{product.name}</p>
                            <p className="text-xs text-neutral-500 mt-0.5">SKU: {product.slug?.substring(0, 8).toUpperCase() || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-400">
                        {product.category?.name || 'Uncategorized'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wider ${
                          product.status === 'PUBLISHED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                          product.status === 'DRAFT' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                          'bg-neutral-800 text-neutral-400 border border-neutral-700'
                        }`}>
                          {product.status || 'DRAFT'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-white">
                        {formatCurrency(product.base_price)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleOpenEdit(product)} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleOpenDelete(product)} className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
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
