import Image from "next/link"; // oops, let's just use standard div with background

export default function AboutPage() {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-secondary">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80")' }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto font-light">
            Redefining modern luxury through sustainable craftsmanship and timeless design.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter mb-6">The Philosophy</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Founded in 2026, LUXE was born out of a simple philosophy: clothing should be an investment, not a disposable commodity. We believe in creating pieces that transcend seasonal trends, focusing instead on enduring style and impeccable quality.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every garment in our collection is meticulously crafted by artisans who share our passion for perfection. From the initial sketch to the final stitch, we ensure that our products not only look beautiful but feel extraordinary.
            </p>
          </div>
          <div className="aspect-square bg-secondary rounded-2xl overflow-hidden relative">
            <div 
              className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80")' }}
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-secondary/30 py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-16 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-brand-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">01</div>
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-muted-foreground">We source ethically, minimize waste, and prioritize eco-friendly materials to protect our planet for future generations.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-brand-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">02</div>
              <h3 className="text-xl font-semibold mb-4">Craftsmanship</h3>
              <p className="text-muted-foreground">Partnering with family-owned factories, we ensure every detail is executed with precision and care.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-brand-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">03</div>
              <h3 className="text-xl font-semibold mb-4">Transparency</h3>
              <p className="text-muted-foreground">We believe you have the right to know how, where, and by whom your clothes are made. Complete honesty, always.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
