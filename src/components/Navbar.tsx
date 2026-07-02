import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const links = [
  { label: "Collection", href: "#collection" },
  { label: "Our Story", href: "#story" },
  { label: "Craft", href: "#craft" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-porcelain/85 backdrop-blur-md border-b border-gold/20 py-2 shadow-[0_8px_30px_-18px_rgba(41,36,29,0.3)]"
          : "bg-transparent py-4",
      )}
    >
      <nav className="mx-auto max-w-6xl px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={asset("phare-logo.png")}
            alt="Phare lighthouse logo"
            className={cn(
              "w-auto transition-all duration-500",
              scrolled ? "h-10" : "h-14",
            )}
          />
          <span className="font-display text-2xl tracking-[0.25em] uppercase text-ink">
            Phare
            <span className="text-gold">.</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs uppercase tracking-[0.3em] text-ink-2/70 hover:text-gold transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={onCartClick}
          className="relative flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink-2/80 hover:text-gold transition-colors duration-300 cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2.5 -right-4 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold tracking-normal text-porcelain">
              {cartCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
