"use client";

import Link from "next/link";
import { ShoppingBag, User, Search, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { catalogApi } from "@/lib/api";

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toggleCart, getTotals } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Fetch categories
    const fetchCats = async () => {
      try {
        const res = await catalogApi.getCategories();
        setCategories(res.data.results || res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCats();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = mounted ? getTotals().totalItems : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const parents = categories.filter(c => c.parent === null);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-40 transition-all duration-300",
          scrolled ? "glass py-4 shadow-sm" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            L U X E .
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/products" className="hover:text-brand-500 transition-colors">
              Collections
            </Link>
            
            {parents.map((parent) => (
              <div key={parent.id} className="group relative">
                <Link href={`/products?category=${parent.slug}`} className="flex items-center gap-1 hover:text-brand-500 transition-colors py-4">
                  {parent.name} <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </Link>
                
                {/* Dropdown */}
                <div className="absolute top-full left-0 w-48 bg-background border border-border rounded-xl shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 overflow-hidden">
                  <div className="py-2">
                    {categories.filter(c => c.parent === parent.id).map(child => (
                      <Link 
                        key={child.id} 
                        href={`/products?category=${child.slug}`}
                        className="block px-4 py-2 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                      >
                        {child.name}
                      </Link>
                    ))}
                    {categories.filter(c => c.parent === parent.id).length === 0 && (
                      <div className="px-4 py-2 text-sm text-muted-foreground">Aucune sous-catégorie</div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <Link href="/about" className="hover:text-brand-500 transition-colors py-4">
              About Us
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {isAuthenticated ? (
              <Link href="/portal" className="hidden md:flex text-muted-foreground hover:text-foreground transition-colors p-2" aria-label="Account">
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <Link href="/login" className="hidden md:flex text-sm font-medium hover:text-brand-600 transition-colors px-2">
                Sign In
              </Link>
            )}
            <button 
              onClick={toggleCart}
              className="p-2 hover:bg-secondary rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-background h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 flex justify-between items-center border-b border-border">
              <span className="text-2xl font-bold tracking-tighter">L U X E .</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-secondary rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 text-lg font-medium">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between border-b border-border pb-4">
                Home <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between border-b border-border pb-4">
                Collections <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              
              {parents.map((parent) => (
                <div key={parent.id} className="border-b border-border pb-4">
                  <Link href={`/products?category=${parent.slug}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between mb-3 text-brand-600">
                    {parent.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                  <div className="pl-4 flex flex-col gap-3 text-base text-muted-foreground">
                    {categories.filter(c => c.parent === parent.id).map(child => (
                      <Link 
                        key={child.id} 
                        href={`/products?category=${child.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-foreground transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between border-b border-border pb-4">
                About Us <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </nav>
            <div className="p-6 border-t border-border bg-secondary/30">
              <Link href="/portal" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-lg font-medium">
                <User className="w-5 h-5" /> My Account
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
          <div className="fixed inset-0 bg-background/95 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSearchOpen(false)} />
          <div className="relative w-full max-w-2xl px-6 animate-in slide-in-from-top-4 duration-300">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des produits..."
                className="w-full text-xl bg-background border-2 border-border focus:border-brand-500 rounded-2xl py-6 pl-14 pr-16 outline-none shadow-2xl transition-colors"
                autoFocus
              />
              <button 
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
