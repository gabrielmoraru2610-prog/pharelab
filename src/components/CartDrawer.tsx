import { cn } from "@/lib/utils";
import type { CartItem } from "@/App";

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemove: (key: string) => void;
}

const CartDrawer = ({ open, items, onClose, onRemove }: CartDrawerProps) => {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm transition-opacity duration-400",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col border-l border-gold/25 bg-porcelain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-stone/20 px-7 py-6">
          <h2 className="font-display text-2xl font-light text-ink">
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none text-stone hover:text-gold transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="animate-flicker text-4xl">🕯️</div>
              <p className="mt-4 text-sm text-stone">
                Your cart is empty — your next favourite scent awaits.
              </p>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover border border-stone/20"
                  />
                  <div className="flex flex-1 flex-col">
                    <span className="font-display text-lg text-ink">
                      {item.name}
                    </span>
                    <span className="text-xs text-stone">
                      {item.sizeLabel} · {item.grams} g
                    </span>
                    <span className="mt-1 text-sm text-gold">
                      {item.qty} × ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemove(item.key)}
                    className="self-start text-xs uppercase tracking-[0.2em] text-stone/70 hover:text-ember transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-stone/20 px-7 py-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.3em] text-stone">
              Subtotal
            </span>
            <span className="font-display text-2xl text-ink">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full rounded-full bg-ink py-4 text-xs uppercase tracking-[0.35em] font-medium text-marble transition-all duration-300 hover:bg-gold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Checkout
          </button>
          <p className="mt-3 text-center text-[11px] text-stone">
            Crafted & shipped from Zurich, Switzerland
          </p>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;
