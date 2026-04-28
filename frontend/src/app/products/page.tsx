import ProductCard, { Product } from "@/components/product/ProductCard";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getProducts(searchQuery: string | null = null) {
  try {
    let url = "http://127.0.0.1:8000/api/v1/catalog/products/";
    if (searchQuery) {
      url = `http://127.0.0.1:8000/api/v1/catalog/products/smart_search/?q=${encodeURIComponent(searchQuery)}`;
    }
    
    const res = await fetch(url, { 
      next: { revalidate: 60 } // Revalidate every minute
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.results || data; // Handle pagination if present
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const searchFilter = typeof params.search === 'string' ? params.search.toLowerCase() : null;
  
  let products: Product[] = await getProducts(searchFilter);
  
  // Filter by category
  const categoryFilter = typeof params.category === 'string' ? params.category.toLowerCase() : null;
  if (categoryFilter && categoryFilter !== 'all') {
    products = products.filter(p => p.category?.slug.toLowerCase() === categoryFilter || p.category?.name.toLowerCase() === categoryFilter);
  }

  // If searchFilter is present, we already filtered via backend smart_search. No local filter needed.

  // Sort logic
  const sort = typeof params.sort === 'string' ? params.sort : 'featured';
  if (sort === 'price_asc') {
    products.sort((a, b) => parseFloat(a.base_price) - parseFloat(b.base_price));
  } else if (sort === 'price_desc') {
    products.sort((a, b) => parseFloat(b.base_price) - parseFloat(a.base_price));
  } else if (sort === 'newest') {
    // Assuming newer products have higher IDs for this mock sorting
    products.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2">
            {categoryFilter ? <span className="capitalize">{categoryFilter}</span> : "The Collection"}
            {searchFilter && <span>: "{searchFilter}"</span>}
          </h1>
          <p className="text-muted-foreground text-lg">Elevate your wardrobe with our curated pieces.</p>
        </div>
        
        <div className="flex items-center gap-4 mt-6 md:mt-0">
          <div className="relative group">
            <button className="flex items-center gap-2 border border-border px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary transition-colors">
              <SlidersHorizontal className="w-4 h-4" /> 
              {categoryFilter ? <span className="capitalize">{categoryFilter}</span> : "All Categories"}
            </button>
            {/* Filter Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <div className="p-2 flex flex-col gap-1">
                <Link href="?category=all" className="px-4 py-2 hover:bg-secondary rounded-lg text-sm font-medium">All Categories</Link>
                <Link href="?category=men" className="px-4 py-2 hover:bg-secondary rounded-lg text-sm font-medium">Men</Link>
                <Link href="?category=women" className="px-4 py-2 hover:bg-secondary rounded-lg text-sm font-medium">Women</Link>
                <Link href="?category=accessories" className="px-4 py-2 hover:bg-secondary rounded-lg text-sm font-medium">Accessories</Link>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-2 border border-border px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary transition-colors">
              Sort by: {sort === 'price_asc' ? 'Price: Low to High' : sort === 'price_desc' ? 'Price: High to Low' : sort === 'newest' ? 'Newest' : 'Featured'} <ChevronDown className="w-4 h-4" />
            </button>
            {/* Sort Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <div className="p-2 flex flex-col gap-1">
                <Link href={`?category=${categoryFilter || 'all'}&sort=featured`} className="px-4 py-2 hover:bg-secondary rounded-lg text-sm font-medium">Featured</Link>
                <Link href={`?category=${categoryFilter || 'all'}&sort=newest`} className="px-4 py-2 hover:bg-secondary rounded-lg text-sm font-medium">Newest Arrivals</Link>
                <Link href={`?category=${categoryFilter || 'all'}&sort=price_asc`} className="px-4 py-2 hover:bg-secondary rounded-lg text-sm font-medium">Price: Low to High</Link>
                <Link href={`?category=${categoryFilter || 'all'}&sort=price_desc`} className="px-4 py-2 hover:bg-secondary rounded-lg text-sm font-medium">Price: High to Low</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Bar */}
      {(categoryFilter || searchFilter) && (
        <div className="flex items-center gap-2 mb-8">
          <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
          {categoryFilter && categoryFilter !== 'all' && (
            <Link href={`?sort=${sort}`} className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors">
              Category: <span className="capitalize">{categoryFilter}</span> <X className="w-3 h-3 ml-1" />
            </Link>
          )}
          {searchFilter && (
            <Link href={`?category=${categoryFilter || 'all'}&sort=${sort}`} className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors">
              Search: "{searchFilter}" <X className="w-3 h-3 ml-1" />
            </Link>
          )}
        </div>
      )}

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="py-24 text-center bg-secondary/30 rounded-3xl border border-dashed border-border mt-8">
          <p className="text-muted-foreground text-lg mb-4">No products found matching your criteria.</p>
          <Link href="/products" className="text-brand-600 font-medium hover:underline">Clear all filters</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-16">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
