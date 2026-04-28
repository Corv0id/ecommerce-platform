"use client";

import { User, Package, MapPin, Heart, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

type Tab = "info" | "orders" | "addresses" | "wishlist";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const { user, isAuthenticated, logout, fetchProfile } = useAuthStore();
  const router = useRouter();

  // Profile Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      fetchProfile();
    }
  }, [isAuthenticated, router, fetchProfile]);

  useEffect(() => {
    if (isAuthenticated && activeTab === "orders") {
      const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
          const { orderApi } = await import("@/lib/api");
          const res = await orderApi.getOrders();
          setOrders(res.data.results || res.data);
        } catch (err) {
          console.error("Failed to fetch orders", err);
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [isAuthenticated, activeTab]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      // Mock phone since we didn't fetch UserProfile relation yet, 
      // but in real app we'd map it.
      setPhone("+216 00 000 000"); 
    }
  }, [user, isAuthenticated]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const { accountApi } = await import("@/lib/api");
      await accountApi.updateProfile({ first_name: firstName, last_name: lastName });
      await fetchProfile();
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [addressForm, setAddressForm] = useState({
    line1: "",
    line2: "",
    city: "",
    postal_code: "",
    country: "Tunisia",
    is_default: false
  });

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const { toggleWishlist } = useAuthStore();

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { accountApi } = await import("@/lib/api");
      if (editingAddress) {
        await accountApi.updateAddress(editingAddress.id, addressForm);
      } else {
        await accountApi.addAddress(addressForm);
      }
      setIsAddressModalOpen(false);
      setEditingAddress(null);
      await fetchProfile();
    } catch (err) {
      alert("Failed to save address.");
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      const { accountApi } = await import("@/lib/api");
      await accountApi.deleteAddress(id);
      await fetchProfile();
    } catch (err) {
      alert("Failed to delete address.");
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    try {
      const { accountApi } = await import("@/lib/api");
      await accountApi.updateAddress(id, { is_default: true });
      await fetchProfile();
    } catch (err) {
      alert("Failed to set default address.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-background rounded-3xl p-8 max-w-md w-full shadow-2xl border border-border animate-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-bold mb-6">{editingAddress ? "Edit Address" : "Add New Address"}</h3>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Address Line 1</label>
                <input required type="text" value={addressForm.line1} onChange={(e) => setAddressForm({...addressForm, line1: e.target.value})} className="w-full border border-border rounded-xl px-4 py-2.5 bg-secondary/30 focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address Line 2 (Optional)</label>
                <input type="text" value={addressForm.line2} onChange={(e) => setAddressForm({...addressForm, line2: e.target.value})} className="w-full border border-border rounded-xl px-4 py-2.5 bg-secondary/30 focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input required type="text" value={addressForm.city} onChange={(e) => setAddressForm({...addressForm, city: e.target.value})} className="w-full border border-border rounded-xl px-4 py-2.5 bg-secondary/30 focus:ring-2 focus:ring-brand-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Postal Code</label>
                  <input required type="text" value={addressForm.postal_code} onChange={(e) => setAddressForm({...addressForm, postal_code: e.target.value})} className="w-full border border-border rounded-xl px-4 py-2.5 bg-secondary/30 focus:ring-2 focus:ring-brand-500 outline-none" />
                </div>
              </div>
              <div className="flex items-center gap-2 py-2">
                <input type="checkbox" id="is_default" checked={addressForm.is_default} onChange={(e) => setAddressForm({...addressForm, is_default: e.target.checked})} className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500" />
                <label htmlFor="is_default" className="text-sm font-medium">Set as default address</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsAddressModalOpen(false)} className="flex-1 px-6 py-3 rounded-full font-medium bg-secondary hover:bg-secondary/80 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-6 py-3 rounded-full font-medium bg-foreground text-background hover:bg-brand-900 transition-colors">Save Address</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-12 border-b border-border pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your personal information and orders.</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium border border-border px-4 py-2 rounded-full hover:bg-secondary">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-secondary/30 rounded-3xl p-6 border border-border sticky top-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-brand-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md uppercase">
                {user.first_name?.[0] || ""}{user.last_name?.[0] || user.email[0]}
              </div>
              <div>
                <h2 className="font-semibold text-lg">{user.first_name} {user.last_name}</h2>
                <p className="text-sm text-muted-foreground">Premium Member</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab("info")}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all ${activeTab === 'info' ? 'bg-background border border-border shadow-sm text-brand-600' : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}`}
              >
                <User className="w-5 h-5" /> Personal Info
              </button>
              <button 
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all ${activeTab === 'orders' ? 'bg-background border border-border shadow-sm text-brand-600' : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}`}
              >
                <Package className="w-5 h-5" /> Order History
              </button>
              <button 
                onClick={() => setActiveTab("addresses")}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all ${activeTab === 'addresses' ? 'bg-background border border-border shadow-sm text-brand-600' : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}`}
              >
                <MapPin className="w-5 h-5" /> Saved Addresses
              </button>
              <button 
                onClick={() => setActiveTab("wishlist")}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all ${activeTab === 'wishlist' ? 'bg-background border border-border shadow-sm text-brand-600' : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}`}
              >
                <Heart className="w-5 h-5" /> Wishlist
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* TAB: Personal Info */}
          {activeTab === "info" && (
            <div className="bg-background rounded-3xl p-8 border border-border shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-semibold mb-6">Personal Information</h3>
              <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input type="email" value={email} disabled className="w-full border border-border rounded-xl px-4 py-3 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all opacity-70 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+216 00 000 000" className="w-full border border-border rounded-xl px-4 py-3 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                </div>
                <div className="pt-4">
                  <button type="submit" disabled={isUpdating} className="bg-foreground text-background px-8 py-3 rounded-full font-medium hover:bg-brand-900 transition-colors disabled:opacity-50">
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: Orders */}
          {activeTab === "orders" && (
            <div className="bg-background rounded-3xl p-8 border border-border shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-semibold mb-6">Order History</h3>
              
              {loadingOrders ? (
                <div className="py-12 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="py-12 text-center border-2 border-dashed border-border rounded-2xl bg-secondary/30">
                  <Package className="w-8 h-8 mx-auto text-muted-foreground mb-3 opacity-50" />
                  <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-border rounded-2xl p-6 bg-secondary/10">
                      <div className="flex flex-wrap justify-between items-center border-b border-border pb-4 mb-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Order Number</p>
                          <p className="font-semibold">#ORD-{order.id.toString().padStart(6, '0')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date Placed</p>
                          <p className="font-semibold">{new Date(order.placed_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Amount</p>
                          <p className="font-semibold">{formatCurrency(order.total_amount)}</p>
                        </div>
                        <div>
                          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                            order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 
                            order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      {order.lines && order.lines.length > 0 && (
                        <div>
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                              <Package className="w-8 h-8 text-muted-foreground opacity-30" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{order.lines[0].product_name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {order.lines.length > 1 ? `And ${order.lines.length - 1} other items` : `Qty: ${order.lines[0].quantity}`}
                              </p>
                            </div>
                            <button 
                              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                              className="text-brand-600 font-medium text-sm hover:underline flex items-center"
                            >
                              {expandedOrder === order.id ? "Hide Details" : "View Details"} 
                              <ChevronRight className={`w-4 h-4 transition-transform ${expandedOrder === order.id ? 'rotate-90' : ''}`} />
                            </button>
                          </div>
                          
                          {expandedOrder === order.id && (
                            <div className="mt-6 pt-6 border-t border-border animate-in slide-in-from-top-2 duration-200">
                              <h5 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Order Summary</h5>
                              <div className="space-y-4">
                                {order.lines.map((line: any, idx: number) => (
                                  <div key={idx} className="flex justify-between items-center text-sm">
                                    <span>{line.product_name} <span className="text-muted-foreground text-xs ml-2">x{line.quantity}</span></span>
                                    <span className="font-medium">{formatCurrency(parseFloat(line.unit_price) * line.quantity)}</span>
                                  </div>
                                ))}
                                <div className="border-t border-border pt-4 flex justify-between font-bold">
                                  <span>Total</span>
                                  <span>{formatCurrency(order.total_amount)}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: Addresses */}
          {activeTab === "addresses" && (
            <div className="bg-background rounded-3xl p-8 border border-border shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">Saved Addresses</h3>
                <button 
                  onClick={() => {
                    setEditingAddress(null);
                    setAddressForm({line1: "", line2: "", city: "", postal_code: "", country: "Tunisia", is_default: false});
                    setIsAddressModalOpen(true);
                  }}
                  className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-full hover:bg-brand-900 transition-colors"
                >
                  + Add New
                </button>
              </div>
              
              {(!user.addresses || user.addresses.length === 0) ? (
                <div className="py-12 text-center border-2 border-dashed border-border rounded-2xl bg-secondary/30">
                  <MapPin className="w-8 h-8 mx-auto text-muted-foreground mb-3 opacity-50" />
                  <p className="text-muted-foreground">You haven't saved any addresses yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.addresses.map((address) => (
                    <div key={address.id} className={`border rounded-2xl p-6 relative ${address.is_default ? 'border-brand-500 shadow-sm' : 'border-border bg-secondary/10'}`}>
                      {address.is_default && <div className="absolute top-4 right-4 bg-brand-100 text-brand-800 text-xs font-bold px-2 py-1 rounded-md">Default</div>}
                      <p className="font-semibold text-lg mb-1">{user.first_name} {user.last_name}</p>
                      <p className="text-muted-foreground mb-1">{address.line1}</p>
                      {address.line2 && <p className="text-muted-foreground mb-1">{address.line2}</p>}
                      <p className="text-muted-foreground mb-4">{address.city}, {address.postal_code}, {address.country}</p>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => {
                            setEditingAddress(address);
                            setAddressForm({...address});
                            setIsAddressModalOpen(true);
                          }}
                          className="text-brand-600 font-medium text-sm hover:underline"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-500 font-medium text-sm hover:underline"
                        >
                          Remove
                        </button>
                        {!address.is_default && (
                          <button 
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="text-muted-foreground font-medium text-sm hover:text-foreground"
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: Wishlist */}
          {activeTab === "wishlist" && (
            <div className="bg-background rounded-3xl p-8 border border-border shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-semibold mb-6">Your Wishlist</h3>
              
              {(!user.wishlist || user.wishlist.length === 0) ? (
                <div className="aspect-[4/5] max-w-sm mx-auto bg-secondary/30 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                  <Heart className="w-10 h-10 mb-4 opacity-50" />
                  <p className="font-medium mb-2">Looking for more?</p>
                  <Link href="/products" className="text-sm text-brand-600 hover:underline">Explore Collection</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.wishlist.map((item) => {
                    const product = item.product_details;
                    if (!product) return null;
                    const primaryImage = product.images?.find((img: any) => img.is_primary)?.url || product.images?.[0]?.url || "/placeholder.jpg";
                    return (
                      <div key={item.id} className="group relative">
                        <Link href={`/products/${product.slug}`}>
                          <div className="aspect-[4/5] bg-secondary rounded-2xl overflow-hidden mb-4 relative">
                            <img src={primaryImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </Link>
                        <button 
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:scale-110 transition-transform shadow-sm"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                        <div>
                          <h4 className="font-medium line-clamp-1">{product.name}</h4>
                          <p className="text-muted-foreground text-sm mb-2">{formatCurrency(product.base_price)}</p>
                          <Link 
                            href={`/products/${product.slug}`}
                            className="block w-full py-2 bg-secondary text-center text-foreground rounded-full text-sm font-medium hover:bg-brand-600 hover:text-white transition-colors"
                          >
                            View Product
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
