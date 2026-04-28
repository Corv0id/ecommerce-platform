"use client";

import { User, Package, MapPin, Heart, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

type Tab = "info" | "orders" | "addresses" | "wishlist";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null; // or a loading spinner
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="container mx-auto px-6 py-12">
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
              <form className="space-y-6 max-w-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input type="text" defaultValue="John" className="w-full border border-border rounded-xl px-4 py-3 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input type="text" defaultValue="Doe" className="w-full border border-border rounded-xl px-4 py-3 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input type="email" defaultValue="john.doe@example.com" className="w-full border border-border rounded-xl px-4 py-3 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" placeholder="+1 (555) 000-0000" className="w-full border border-border rounded-xl px-4 py-3 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                </div>
                <div className="pt-4">
                  <button type="button" className="bg-foreground text-background px-8 py-3 rounded-full font-medium hover:bg-brand-900 transition-colors">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: Orders */}
          {activeTab === "orders" && (
            <div className="bg-background rounded-3xl p-8 border border-border shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-semibold mb-6">Order History</h3>
              <div className="space-y-6">
                {/* Mock Order 1 */}
                <div className="border border-border rounded-2xl p-6 bg-secondary/10">
                  <div className="flex flex-wrap justify-between items-center border-b border-border pb-4 mb-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order Number</p>
                      <p className="font-semibold">#ORD-2026-8924</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date Placed</p>
                      <p className="font-semibold">April 20, 2026</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="font-semibold">435.00 TND</p>
                    </div>
                    <div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider rounded-full dark:bg-green-900/30 dark:text-green-400">
                        Delivered
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=200&q=80" alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Classic Oxford Shirt</h4>
                      <p className="text-sm text-muted-foreground">Size: M | Qty: 2</p>
                    </div>
                    <button className="text-brand-600 font-medium text-sm hover:underline flex items-center">
                      View Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mock Order 2 */}
                <div className="border border-border rounded-2xl p-6 bg-secondary/10">
                  <div className="flex flex-wrap justify-between items-center border-b border-border pb-4 mb-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order Number</p>
                      <p className="font-semibold">#ORD-2026-6133</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date Placed</p>
                      <p className="font-semibold">March 12, 2026</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="font-semibold">240.00 TND</p>
                    </div>
                    <div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider rounded-full dark:bg-green-900/30 dark:text-green-400">
                        Delivered
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=200&q=80" alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Minimalist Leather Tote</h4>
                      <p className="text-sm text-muted-foreground">Size: OS | Qty: 1</p>
                    </div>
                    <button className="text-brand-600 font-medium text-sm hover:underline flex items-center">
                      View Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Addresses */}
          {activeTab === "addresses" && (
            <div className="bg-background rounded-3xl p-8 border border-border shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">Saved Addresses</h3>
                <button className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-full hover:bg-brand-900 transition-colors">
                  + Add New
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-brand-500 rounded-2xl p-6 relative">
                  <div className="absolute top-4 right-4 bg-brand-100 text-brand-800 text-xs font-bold px-2 py-1 rounded-md">Default</div>
                  <h4 className="font-bold text-lg mb-2">Home</h4>
                  <p className="text-muted-foreground mb-1">John Doe</p>
                  <p className="text-muted-foreground mb-1">123 Luxury Avenue, Suite 400</p>
                  <p className="text-muted-foreground mb-4">New York, NY 10001, United States</p>
                  <div className="flex gap-4">
                    <button className="text-brand-600 font-medium text-sm hover:underline">Edit</button>
                    <button className="text-red-500 font-medium text-sm hover:underline">Remove</button>
                  </div>
                </div>
                
                <div className="border border-border rounded-2xl p-6 relative bg-secondary/10">
                  <h4 className="font-bold text-lg mb-2">Office</h4>
                  <p className="text-muted-foreground mb-1">John Doe (Acme Corp)</p>
                  <p className="text-muted-foreground mb-1">456 Business Blvd, Floor 12</p>
                  <p className="text-muted-foreground mb-4">San Francisco, CA 94105, United States</p>
                  <div className="flex gap-4">
                    <button className="text-brand-600 font-medium text-sm hover:underline">Edit</button>
                    <button className="text-red-500 font-medium text-sm hover:underline">Remove</button>
                    <button className="text-muted-foreground font-medium text-sm hover:text-foreground">Set as Default</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Wishlist */}
          {activeTab === "wishlist" && (
            <div className="bg-background rounded-3xl p-8 border border-border shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-semibold mb-6">Your Wishlist</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Wishlist Item 1 */}
                <div className="group relative">
                  <div className="aspect-[4/5] bg-secondary rounded-2xl overflow-hidden mb-4 relative">
                    <img src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80" alt="Cashmere" className="w-full h-full object-cover" />
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:scale-110 transition-transform">
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-medium">Cashmere Crewneck</h4>
                    <p className="text-muted-foreground text-sm mb-2">195.00 TND</p>
                    <button className="w-full py-2 bg-secondary text-foreground rounded-full text-sm font-medium hover:bg-brand-600 hover:text-white transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
                
                {/* Empty State visual */}
                <div className="aspect-[4/5] bg-secondary/30 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                  <Heart className="w-10 h-10 mb-4 opacity-50" />
                  <p className="font-medium mb-2">Looking for more?</p>
                  <Link href="/products" className="text-sm text-brand-600 hover:underline">Explore Collection</Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
