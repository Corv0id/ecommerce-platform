import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard, { Product } from "@/components/product/ProductCard";

async function getTrendingProducts() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/v1/catalog/products/", { 
      next: { revalidate: 60 } 
    });
    if (!res.ok) return [];
    const data = await res.json();
    const allProducts: Product[] = data.results || data;
    // Return first 3 as trending
    return allProducts.slice(0, 3);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const trendingProducts = await getTrendingProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full bg-secondary flex items-center justify-center overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-200/50 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-50"></div>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-300/30 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-50"></div>
        
        <div className="container mx-auto px-6 text-center z-10 relative">
          <span className="inline-block py-1 px-3 rounded-full bg-background border text-xs font-medium tracking-widest uppercase mb-6 shadow-sm">
            Spring Collection 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground max-w-4xl mx-auto leading-tight">
            Redefining <span className="text-brand-600 italic">Elegance</span> for the Modern Era.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Discover our meticulously curated selection of premium essentials. 
            Designed for durability, crafted for style.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/products" 
              className="bg-foreground text-background px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-brand-900 transition-all hover:gap-3"
            >
              Shop Collection <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/about" 
              className="bg-background border text-foreground px-8 py-4 rounded-full font-medium hover:bg-secondary transition-all"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter mb-2">Trending Now</h2>
            <p className="text-muted-foreground">The pieces everyone is talking about.</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-1 font-medium hover:text-brand-600 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingProducts.length > 0 ? (
            trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-3 py-12 text-center text-muted-foreground">
              <p>No products available right now.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
