import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of the delivery date. Items must be unworn, unwashed, and in their original condition with all tags attached. Please visit our Returns portal to initiate the process."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. Expedited shipping options (2-day and overnight) are available at checkout. International orders usually arrive within 7-14 business days."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. International shipping rates are calculated at checkout based on your location and the weight of your order. Please note that customs duties and taxes may apply."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you will receive a confirmation email containing a tracking link. You can also track your order status by logging into your account on our website."
    },
    {
      question: "Are your products sustainable?",
      answer: "Sustainability is at the core of our brand. We use eco-friendly materials, partner with ethical factories, and continuously work to reduce our carbon footprint. Read more on our About Us page."
    }
  ];

  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-center">Frequently Asked Questions</h1>
      <p className="text-muted-foreground text-center mb-16 text-lg">
        Find answers to common questions about our products, shipping, and returns.
      </p>

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-background border border-border p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">{faq.question}</h3>
            <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-secondary/50 rounded-2xl p-8 text-center border border-border">
        <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">Our customer support team is here to help.</p>
        <Link href="mailto:support@example.com" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-xl font-medium hover:bg-brand-900 transition-colors">
          Contact Support <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
