import { useCallback, useState } from "react";
import HeroSection from "@/components/ui/dynamic-animated-hero-section-with-gradient";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import Reveal from "@/components/Reveal";
import { products, type Product, type SizeOption } from "@/data/products";
import { asset } from "@/lib/asset";

export interface CartItem {
  key: string;
  name: string;
  sizeLabel: string;
  grams: number;
  price: number;
  image: string;
  qty: number;
}

const marqueeItems = [
  "Crafted in Zurich",
  "Up to 68 hours of burn time",
  "Every candle carries its scent differently",
  "Scent stories, not just fragrances",
  "Three sizes — 75 g · 130 g · 200 g",
];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((product: Product, size: SizeOption) => {
    const key = `${product.id}-${size.label}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          key,
          name: product.name,
          sizeLabel: size.label,
          grams: size.grams,
          price: size.price,
          image: product.image,
          qty: 1,
        },
      ];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div id="top" className="grain min-h-screen bg-marble text-ink">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      {/* ─── Hero ─── */}
      <HeroSection onShopNow={scrollToCollection} />

      {/* ─── USP marquee ─── */}
      <div className="relative overflow-hidden border-y border-gold/25 bg-porcelain py-4">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-8 flex items-center gap-8 text-[11px] uppercase tracking-[0.35em] text-gold"
            >
              {item}
              <span className="text-gold/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── Collection ─── */}
      <section
        id="collection"
        className="marble-bg scroll-mt-20 border-b border-stone/15"
      >
        <div className="mx-auto max-w-6xl px-6 py-28">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
              The Collection
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl md:text-6xl font-light leading-tight">
              Five destinations,
              <span className="italic text-gold"> bottled in wax.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm md:text-base font-light leading-relaxed text-ink-2/75">
              Each Phare candle is an invitation to somewhere — a bakery at dawn,
              a hidden cove, a grandmother's kitchen. Choose your size: Mini (75
              g), Medium (130 g) or Original (200 g).
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Story ─── */}
      <section id="story" className="relative overflow-hidden bg-porcelain scroll-mt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-28 md:grid-cols-2">
          <Reveal>
            <div className="relative">
              <img
                src={asset("images/lighthouse.jpg")}
                alt="The lighthouse that inspired Phare"
                loading="lazy"
                className="w-full rounded-2xl border border-stone/20 object-cover shadow-[0_25px_60px_-30px_rgba(41,36,29,0.35)]"
              />
              <img
                src={asset("images/collection.jpg")}
                alt="Phare bestselling candles"
                loading="lazy"
                className="absolute -bottom-10 -right-6 hidden w-2/5 rounded-xl border-4 border-porcelain shadow-[0_20px_50px_rgba(41,36,29,0.25)] md:block"
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
              Our Story
            </p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-light leading-tight">
              Phare — <span className="italic text-gold">the lighthouse.</span>
            </h2>
            <p className="mt-6 text-sm md:text-base font-light leading-loose text-ink-2/80">
              We started Phare with one aspiration: finding unique ways to present
              and incorporate scent into people's lives. Every product carries its
              fragrance differently — the way a scent unfolds and spreads is unique
              to each one.
            </p>
            <p className="mt-4 text-sm md:text-base font-light leading-loose text-ink-2/80">
              Like the lighthouse we are named after, each candle is a small beacon
              — a point of light that guides you back to a memory, a place, a
              feeling. Poured with intention in Zurich, Switzerland.
            </p>
            <a
              href="#collection"
              className="mt-8 inline-block border-b border-gold pb-1 text-xs uppercase tracking-[0.35em] text-gold transition-colors hover:text-ink"
            >
              Explore the collection
            </a>
          </Reveal>
        </div>
      </section>

      {/* ─── Craft / USP cards ─── */}
      <section id="craft" className="marble-bg scroll-mt-20 border-t border-stone/15">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <Reveal>
            <p className="text-center text-[11px] uppercase tracking-[0.5em] text-gold">
              Why Phare
            </p>
            <h2 className="mx-auto mt-4 max-w-xl text-center font-display text-4xl md:text-5xl font-light leading-tight">
              Slow light, <span className="italic text-gold">long evenings.</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "A story in every jar",
                text: "Each fragrance is composed like a short story — a destination with top, heart and base chapters that unfold as the candle burns.",
                icon: "✷",
              },
              {
                title: "Up to 68 hours of light",
                text: "From the 75 g Mini (≈25 h) to the 200 g Original (≈68 h), every size is made to burn slowly, evenly and generously.",
                icon: "◐",
              },
              {
                title: "Crafted in Zurich",
                text: "Designed and poured at our atelier on Seestrasse, by the lake — Swiss precision applied to the art of scent.",
                icon: "✦",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 150}>
                <div className="group h-full rounded-2xl border border-stone/20 bg-porcelain p-10 text-center transition-all duration-500 hover:border-gold/50 hover:-translate-y-1 hover:shadow-[0_28px_55px_-30px_rgba(41,36,29,0.3)]">
                  <span className="inline-block text-3xl text-gold transition-transform duration-500 group-hover:scale-125">
                    {card.icon}
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-light text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-ink-2/70">
                    {card.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA banner — dark contrast band ─── */}
      <section className="relative overflow-hidden bg-ink text-marble">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,168,110,0.15),transparent_65%)]" />
        <img
          src={asset("phare-logo.png")}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[2%] bottom-[-20%] h-[130%] opacity-10 invert select-none"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight">
              Your next evening
              <span className="italic text-gold-2"> deserves a destination.</span>
            </h2>
            <button
              onClick={scrollToCollection}
              className="mt-10 rounded-full bg-gold-2 px-12 py-4 text-xs uppercase tracking-[0.35em] font-medium text-ink transition-all duration-300 hover:shadow-[0_0_28px_rgba(200,168,110,0.55)] hover:scale-105 cursor-pointer"
            >
              Shop Now
            </button>
          </Reveal>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer id="contact" className="bg-porcelain scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={asset("phare-logo.png")}
                  alt="Phare lighthouse logo"
                  className="h-14 w-auto"
                />
                <p className="font-display text-3xl tracking-[0.2em] uppercase text-ink">
                  Phare<span className="text-gold">.</span>
                </p>
              </div>
              <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-ink-2/70">
                Unique ways to bring scent into your life — because every candle
                carries its fragrance in its own unique way.
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
                Visit
              </p>
              <address className="mt-4 text-sm font-light not-italic leading-loose text-ink-2/80">
                Seestrasse 21
                <br />
                Zurich, Switzerland
              </address>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
                Contact
              </p>
              <p className="mt-4 text-sm font-light leading-loose text-ink-2/80">
                <a
                  href="mailto:contactus@pharelab.com"
                  className="hover:text-gold transition-colors"
                >
                  contactus@pharelab.com
                </a>
                <br />
                <a
                  href="tel:+41717417888"
                  className="hover:text-gold transition-colors"
                >
                  +41 717 417 888
                </a>
              </p>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-stone/20 pt-8 text-[11px] uppercase tracking-[0.25em] text-stone md:flex-row">
            <span>© {new Date().getFullYear()} Phare. All rights reserved.</span>
            <span>Crafted with light in Zurich</span>
          </div>
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
      />
    </div>
  );
}

export default App;
