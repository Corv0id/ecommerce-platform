import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  base_price: string;
  category: {
    name: string;
    slug: string;
  };
  images: { url: string; is_primary: boolean; sort_order?: number }[];
}

export default function ProductCard({ product }: { product: Product }) {
  // Try to find primary image, fallback to first image, then placeholder
  const primaryImage = product.images?.find((img) => img.is_primary)?.url 
    || product.images?.[0]?.url 
    || "/placeholder.jpg";

  return (
    <Link href={`/products/${product.slug}`} className="group flex flex-col h-full">
      <div className="relative aspect-[4/5] bg-secondary rounded-2xl overflow-hidden mb-4">
        <div className="absolute inset-0 bg-brand-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        {/* Replace with next/image in real production */}
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${primaryImage})` }}
        />
        
        {/* Quick Add Button */}
        <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 shadow-lg hover:bg-foreground hover:text-background">
          <ShoppingBag className="w-4 h-4" /> Quick Add
        </button>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <span className="font-medium">{parseFloat(product.base_price).toFixed(2)} TND</span>
        </div>
        <p className="text-muted-foreground text-sm">{product.category?.name || "Collection"}</p>
      </div>
    </Link>
  );
}
