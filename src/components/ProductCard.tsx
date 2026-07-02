import { useState } from "react";
import type { Product, SizeOption } from "@/data/products";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product, size: SizeOption) => void;
}

const ProductCard = ({ product, index, onAddToCart }: ProductCardProps) => {
  const [selected, setSelected] = useState<SizeOption>(product.sizes[2]);
  const [notesOpen, setNotesOpen] = useState(false);

  return (
    <Reveal delay={index * 120}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone/20 bg-porcelain transition-all duration-500 hover:border-gold/50 hover:shadow-[0_28px_60px_-25px_rgba(41,36,29,0.3)] hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-marble-2">
          <img
            src={product.image}
            alt={`${product.name} scented candle`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.badge && (
            <span
              className={cn(
                "absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] backdrop-blur-sm",
                product.badge === "Bestseller"
                  ? "bg-gold text-porcelain"
                  : "bg-porcelain/85 text-gold border border-gold/40",
              )}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
            {product.family}
          </p>
          <h3 className="mt-2 font-display text-3xl font-light text-ink">
            {product.name}
          </h3>
          <p className="mt-1 text-sm italic text-stone">{product.tagline}</p>

          {/* Scent notes accordion */}
          <button
            onClick={() => setNotesOpen((o) => !o)}
            className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-ink-2/60 hover:text-gold transition-colors cursor-pointer"
          >
            Scent notes
            <span
              className={cn(
                "transition-transform duration-300",
                notesOpen && "rotate-45",
              )}
            >
              +
            </span>
          </button>
          <div
            className={cn(
              "grid transition-all duration-500 ease-in-out",
              notesOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <dl className="space-y-1.5 border-l-2 border-gold/30 pl-4 text-xs leading-relaxed text-ink-2/80">
                <div>
                  <dt className="inline text-gold">Top — </dt>
                  <dd className="inline">{product.notes.top}</dd>
                </div>
                <div>
                  <dt className="inline text-gold">Heart — </dt>
                  <dd className="inline">{product.notes.middle}</dd>
                </div>
                <div>
                  <dt className="inline text-gold">Base — </dt>
                  <dd className="inline">{product.notes.base}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Size selector — grams first */}
          <div className="mt-5">
            <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-stone">
              Size
            </p>
            <div className="grid grid-cols-3 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size.label}
                  onClick={() => setSelected(size)}
                  className={cn(
                    "rounded-lg border px-2 py-2.5 text-center transition-all duration-300 cursor-pointer",
                    selected.label === size.label
                      ? "border-gold bg-gold/10 text-ink"
                      : "border-stone/25 text-ink-2/60 hover:border-gold/50",
                  )}
                >
                  <span className="block text-xs font-medium">{size.label}</span>
                  <span className="block text-[11px] text-gold">
                    {size.grams} g
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-stone">
              {selected.grams} g ({selected.ounces}) · ~{selected.burnHours} h burn
              time
            </p>
          </div>

          {/* Price + CTA */}
          <div className="mt-auto flex items-center justify-between pt-6">
            <span className="font-display text-2xl text-ink">
              ${selected.price.toFixed(2)}
            </span>
            <button
              onClick={() => onAddToCart(product, selected)}
              className="rounded-full bg-ink px-6 py-2.5 text-[11px] uppercase tracking-[0.25em] text-marble transition-all duration-300 hover:bg-gold cursor-pointer"
            >
              Add to cart
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
};

export default ProductCard;
