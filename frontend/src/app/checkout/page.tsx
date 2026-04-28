"use client";

import { useCartStore } from "@/store/cartStore";
import { ArrowLeft, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const { items, getTotals } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { subtotal } = getTotals();
  const shipping = subtotal > 150 ? 0 : 15;
  const taxes = subtotal * 0.08;
  const total = subtotal + shipping + taxes;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate network request to Django / Stripe
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // We would clear the cart here in a real app
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-6 py-24 max-w-2xl text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Payment Successful!</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Thank you for your order. We've sent a confirmation email to your inbox.
        </p>
        <Link 
          href="/" 
          className="bg-foreground text-background px-8 py-4 rounded-full font-medium inline-block hover:bg-brand-900 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-secondary/30 min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8">
          <Link href="/products" className="hover:text-brand-600 flex items-center gap-1 transition-colors w-fit font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-bold tracking-tighter mb-8">Checkout</h1>
            
            <form onSubmit={handleSimulatePayment} className="space-y-8">
              {/* Contact Info */}
              <div className="bg-background p-6 rounded-2xl shadow-sm border border-border">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input type="email" required className="w-full border rounded-lg px-4 py-2 bg-secondary/50 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-background p-6 rounded-2xl shadow-sm border border-border">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input type="text" required className="w-full border rounded-lg px-4 py-2 bg-secondary/50 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input type="text" required className="w-full border rounded-lg px-4 py-2 bg-secondary/50 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input type="text" required className="w-full border rounded-lg px-4 py-2 bg-secondary/50 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input type="text" required className="w-full border rounded-lg px-4 py-2 bg-secondary/50 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1">Postal Code</label>
                    <input type="text" required className="w-full border rounded-lg px-4 py-2 bg-secondary/50 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-background p-6 rounded-2xl shadow-sm border border-border">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Payment Details
                </h2>
                <div className="space-y-4 relative">
                  {/* Fake Card Input */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full border rounded-lg px-4 py-2 bg-secondary/50 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full border rounded-lg px-4 py-2 bg-secondary/50 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none font-mono" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVC</label>
                      <input type="text" placeholder="123" className="w-full border rounded-lg px-4 py-2 bg-secondary/50 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none font-mono" />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing || items.length === 0}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isProcessing ? "Processing..." : `Pay ${total.toFixed(2)} TND`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-background p-6 rounded-2xl shadow-sm border border-border sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div 
                      className="w-16 h-20 bg-secondary rounded-md bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                      {item.size && <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>}
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium">{(item.price * item.quantity).toFixed(2)} TND</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-border text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{subtotal.toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : `${shipping.toFixed(2)} TND`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Taxes</span>
                  <span className="font-medium">{taxes.toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border text-lg font-bold">
                  <span>Total</span>
                  <span>{total.toFixed(2)} TND</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
