import { Truck, ShieldCheck, Clock, Globe } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-center">Shipping & Returns</h1>
      <p className="text-muted-foreground text-center mb-16 text-lg">
        Everything you need to know about getting your LUXE pieces delivered safely to your door.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-background border border-border p-8 rounded-2xl shadow-sm text-center">
          <Truck className="w-10 h-10 mx-auto mb-4 text-brand-600" />
          <h3 className="text-xl font-semibold mb-2">Standard Shipping</h3>
          <p className="text-muted-foreground mb-4">3-5 Business Days</p>
          <p className="font-bold text-lg">Free on orders over 150 TND</p>
          <p className="text-sm text-muted-foreground mt-1">Otherwise 10.00 TND</p>
        </div>
        <div className="bg-background border border-border p-8 rounded-2xl shadow-sm text-center">
          <Clock className="w-10 h-10 mx-auto mb-4 text-brand-600" />
          <h3 className="text-xl font-semibold mb-2">Express Shipping</h3>
          <p className="text-muted-foreground mb-4">1-2 Business Days</p>
          <p className="font-bold text-lg">25.00 TND Flat Rate</p>
          <p className="text-sm text-muted-foreground mt-1">Order before 2 PM EST</p>
        </div>
        <div className="bg-background border border-border p-8 rounded-2xl shadow-sm text-center">
          <Globe className="w-10 h-10 mx-auto mb-4 text-brand-600" />
          <h3 className="text-xl font-semibold mb-2">International</h3>
          <p className="text-muted-foreground mb-4">7-14 Business Days</p>
          <p className="font-bold text-lg">Calculated at Checkout</p>
          <p className="text-sm text-muted-foreground mt-1">Duties may apply</p>
        </div>
        <div className="bg-background border border-border p-8 rounded-2xl shadow-sm text-center">
          <ShieldCheck className="w-10 h-10 mx-auto mb-4 text-brand-600" />
          <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
          <p className="text-muted-foreground mb-4">Within 30 Days</p>
          <p className="font-bold text-lg">Free Return Shipping</p>
          <p className="text-sm text-muted-foreground mt-1">Original condition required</p>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>Return Policy Details</h2>
        <p>
          We want you to be completely satisfied with your purchase. If for any reason you are not, we gladly accept returns of unworn, unwashed, undamaged, or defective merchandise purchased on our site for a full refund or exchange within 30 days of the original delivery.
        </p>
        <ul>
          <li><strong>Original Condition:</strong> Items must be returned in their original packaging, including all tags and labels.</li>
          <li><strong>Footwear:</strong> Shoes must be returned in their original shoe box, and the box must be undamaged.</li>
          <li><strong>Final Sale:</strong> Items marked as "Final Sale" cannot be returned or exchanged.</li>
        </ul>
        
        <h2>How to Start a Return</h2>
        <p>
          To initiate a return, please visit our online Returns Portal. Enter your order number and email address to generate a prepaid return label. Once we receive and inspect your returned item(s), your refund will be processed within 5-7 business days to your original form of payment.
        </p>
      </div>
    </div>
  );
}
