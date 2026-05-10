"use client";

import { useAuthStore } from "@/store/authStore";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

export default function CustomerWishlistPage() {
  const { user, toggleWishlist } = useAuthStore();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const wishlist = user?.wishlist || [];

  const handleRemove = async (productId: string) => {
    setRemovingId(productId);
    await toggleWishlist(productId);
    setRemovingId(null);
  };

  return (
    <div className="max-w-5xl animate-in fade-in duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">My Wishlist</h1>
          <p className="text-neutral-500 mt-2">Items you've saved for later.</p>
        </div>
        <div className="bg-brand-50 text-brand-700 px-4 py-2 rounded-lg font-bold">
          {wishlist.length} Items
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-16 text-center">
          <div className="w-20 h-20 bg-pink-50 text-pink-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-3">Your wishlist is empty</h3>
          <p className="text-neutral-500 mb-8 max-w-md mx-auto">
            Explore our collection and save your favorite luxury items to purchase them later.
          </p>
          <Link href="/catalog" className="inline-block bg-neutral-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-900 transition-colors">
            Discover Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item: any) => (
            <div key={item.id} className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden group">
              <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                {item.product_details?.main_image ? (
                  <Image 
                    src={item.product_details.main_image} 
                    alt={item.product_details.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                    No Image
                  </div>
                )}
                
                <button 
                  onClick={() => handleRemove(item.product)}
                  disabled={removingId === item.product}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 hover:scale-110 transition-all disabled:opacity-50 shadow-sm"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <Link href={`/product/${item.product_details?.slug || item.product}`}>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-1 group-hover:text-brand-600 transition-colors">
                    {item.product_details?.name || "Product"}
                  </h3>
                </Link>
                <div className="flex items-center justify-between mt-4">
                  <p className="font-bold text-lg text-neutral-900">
                    {formatCurrency(item.product_details?.price || 0)}
                  </p>
                  <Link 
                    href={`/product/${item.product_details?.slug || item.product}`}
                    className="text-sm font-bold text-brand-600 hover:text-brand-800"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
