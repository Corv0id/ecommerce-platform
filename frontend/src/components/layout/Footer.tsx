"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-foreground text-background py-16 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-2xl font-bold tracking-tighter mb-6">L U X E .</h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            Elevating your everyday style with premium, carefully curated collections designed for the modern aesthetic.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Shop</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/products?category=all" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/products?category=women" className="hover:text-white transition-colors">Women's Collection</Link></li>
            <li><Link href="/products?category=men" className="hover:text-white transition-colors">Men's Collection</Link></li>
            <li><Link href="/products?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link href="mailto:contact@luxe.com" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-muted-foreground text-sm mb-4">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address" 
              required
              className="bg-primary border border-white/20 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:border-white transition-colors"
            />
            <button 
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-all flex items-center justify-center min-w-[100px]"
            >
              {subscribed ? <Check className="w-4 h-4 text-green-600" /> : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 LUXE. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
