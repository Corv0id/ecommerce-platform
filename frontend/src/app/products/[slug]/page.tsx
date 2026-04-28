"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, Star, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/catalog/products/${slug}/`);
        setProduct(response.data);
        if (response.data.variants && response.data.variants.length > 0) {
          // Select first available size by default
          setSelectedSize(response.data.variants[0].attributes?.size || "");
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Find the variant id based on size
    const variant = product.variants?.find((v: any) => v.attributes?.size === selectedSize);
    
    addItem({
      id: variant?.id || product.id,
      name: product.name,
      price: parseFloat(product.base_price),
      quantity: 1,
      imageUrl: product.images?.[0]?.url || "/placeholder.jpg",
      size: selectedSize || undefined,
    });
  };

  const { toggleWishlist, user } = useAuthStore();
  const isWishlisted = user?.wishlist?.some((item) => String(item.product) === String(product?.id));

  if (loading) {
    return <div className="py-24 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="py-24 text-center">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/products" className="hover:text-foreground flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </Link>
        <span className="mx-2">/</span>
        <span className="capitalize">{product.category?.name || "Catalog"}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[4/5] bg-secondary rounded-2xl overflow-hidden relative">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${product.images?.[activeImage]?.url || "/placeholder.jpg"})` }}
            />
            <button 
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? "fill-red-500 text-red-500" : "text-foreground"}`} />
            </button>
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img: any, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-brand-600' : 'border-transparent'}`}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img.url})` }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tighter mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-medium">{formatCurrency(product.base_price)}</span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-brand-500 text-brand-500" />
                <Star className="w-4 h-4 fill-brand-500 text-brand-500" />
                <Star className="w-4 h-4 fill-brand-500 text-brand-500" />
                <Star className="w-4 h-4 fill-brand-500 text-brand-500" />
                <Star className="w-4 h-4 fill-brand-500 text-brand-500" />
                <span className="ml-1">(124 reviews)</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="mb-8 border-t border-border pt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Select Size</h3>
                <button className="text-sm text-brand-600 underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.variants.map((variant: any) => {
                  const size = variant.attributes?.size;
                  if (!size) return null;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-lg border font-medium transition-all ${
                        selectedSize === size 
                          ? "border-foreground bg-foreground text-background" 
                          : "border-border hover:border-foreground/50"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button 
            onClick={handleAddToCart}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white py-5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors mb-8 shadow-lg shadow-brand-600/20 active:scale-[0.98]"
          >
            <ShoppingBag className="w-5 h-5" /> Add to Bag
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary">
              <Truck className="w-5 h-5 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Free Shipping</p>
                <p className="text-muted-foreground">On all orders over 150 TND. Arrives in 2-4 days.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary">
              <ShieldCheck className="w-5 h-5 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Lifetime Guarantee</p>
                <p className="text-muted-foreground">Quality that speaks for itself, forever.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Complete the Outfit Section */}
      <div className="mt-32 border-t border-border pt-16">
        <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">Complete the Outfit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <RelatedProducts categorySlug={product.category?.slug} currentProductId={product.id} />
        </div>
      </div>
    </div>
  );
}

// Client component wrapper for fetching related products
function RelatedProducts({ categorySlug, currentProductId }: { categorySlug: string, currentProductId: string }) {
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug) {
      setLoading(false);
      return;
    }
    
    const fetchRelated = async () => {
      try {
        const response = await api.get('/catalog/products/');
        const allProducts = response.data.results || response.data;
        // Filter by complementary category (same gender, different item type)
        const isMen = categorySlug.startsWith('men-');
        const isWomen = categorySlug.startsWith('women-');
        
        const filtered = allProducts
          .filter((p: any) => {
            const pSlug = p.category?.slug || '';
            if (p.id === currentProductId) return false;
            if (isMen && pSlug.startsWith('men-') && pSlug !== categorySlug) return true;
            if (isWomen && pSlug.startsWith('women-') && pSlug !== categorySlug) return true;
            return false;
          })
          .slice(0, 4);
        setRelated(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRelated();
  }, [categorySlug, currentProductId]);

  if (loading) return Array(4).fill(0).map((_, i) => <div key={i} className="aspect-[4/5] bg-secondary animate-pulse rounded-2xl"></div>);
  if (related.length === 0) return <div className="col-span-full text-center text-muted-foreground py-8">No related products found.</div>;

  return (
    <>
      {related.map((p) => (
        <Link key={p.id} href={`/products/${p.slug}`} className="group">
          <div className="aspect-[4/5] bg-secondary rounded-2xl overflow-hidden mb-4">
            <div 
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url(${p.images?.[0]?.url || "/placeholder.jpg"})` }}
            />
          </div>
          <h3 className="font-medium group-hover:text-brand-600 transition-colors truncate">{p.name}</h3>
          <p className="text-muted-foreground">{formatCurrency(p.base_price)}</p>
        </Link>
      ))}
    </>
  );
}
