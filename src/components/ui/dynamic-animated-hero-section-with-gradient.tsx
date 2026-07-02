import { useEffect } from "react";
import { asset } from "@/lib/asset";

interface HeroSectionProps {
  onShopNow?: () => void;
}

const HeroSection = ({ onShopNow }: HeroSectionProps) => {
  useEffect(() => {
    // Calculate path lengths for accurate line-draw animations
    document.querySelectorAll<SVGPathElement>(".animation-line").forEach((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}px`;
      path.style.strokeDashoffset = `${len}px`;

      setTimeout(() => {
        path.style.transition = "stroke-dashoffset 2.4s ease-in-out";
        path.style.strokeDashoffset = "0px";
      }, 500);
    });
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes patternScroll {
            0% { transform: translate(-5%, -5%); }
            100% { transform: translate(5%, 5%); }
          }

          .animate-fadeIn {
            animation: fadeIn 1.1s ease-out forwards;
          }

          .animate-fadeInRight {
            opacity: 0;
            animation: fadeInRight 1.2s ease-out 0.3s forwards;
          }

          .animate-patternScroll {
            animation: patternScroll 26s linear infinite;
          }

          .gradient-text {
            background: linear-gradient(270deg, #8a6a38, #c8a86e, #b4642f, #a9834e, #8a6a38);
            background-size: 600% 600%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient 12s ease infinite;
          }

          .animation-line {
            fill: none;
            stroke: rgba(169, 131, 78, 0.4);
            stroke-width: 1.2;
            vector-effect: non-scaling-stroke;
          }

          @keyframes pulse {
            0% { box-shadow: 0 6px 18px rgba(169, 131, 78, 0.25); }
            50% { box-shadow: 0 10px 34px rgba(169, 131, 78, 0.5); }
            100% { box-shadow: 0 6px 18px rgba(169, 131, 78, 0.25); }
          }

          .pulse-animation {
            animation: pulse 2.4s infinite;
          }
        `}
      </style>

      <div className="marble-bg min-h-screen flex items-center text-ink overflow-hidden relative pt-24 pb-16">
        {/* Faint lighthouse watermark */}
        <img
          src={asset("phare-logo.png")}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[-4%] bottom-[-10%] h-[85%] opacity-[0.06] select-none z-0"
        />

        {/* Container */}
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr] z-10 relative">
          {/* Copy */}
          <div className="animate-fadeIn text-center lg:text-left">
            <p className="uppercase tracking-[0.5em] text-[11px] md:text-xs text-gold mb-8">
              Phare · Maison de Bougies · Zurich
            </p>
            <h1 className="font-display font-light text-5xl md:text-7xl xl:text-[5.5rem] leading-[1.05] m-0 relative z-20">
              Light that
              <br />
              <span className="gradient-text inline-block relative z-10 italic pr-2">
                tells a story.
              </span>
            </h1>

            <button
              onClick={onShopNow}
              className="mt-12 px-12 py-4 bg-ink text-marble border-none rounded-full cursor-pointer text-sm uppercase tracking-[0.35em] font-medium transition-all duration-300 ease-in-out hover:bg-gold hover:-translate-y-0.5 hover:scale-105 pulse-animation"
            >
              Shop Now
            </button>

            <p className="mt-7 max-w-md text-sm md:text-base font-light text-ink-2/75 leading-relaxed mx-auto lg:mx-0">
              Scented candles crafted in Zurich — because every candle carries
              its fragrance in its own unique way.
            </p>
          </div>

          {/* Product showcase */}
          <div className="animate-fadeInRight relative mx-auto w-full max-w-sm lg:max-w-none">
            {/* Arched frame — the collection */}
            <div className="overflow-hidden rounded-t-full rounded-b-3xl border-[3px] border-gold/30 bg-porcelain p-2.5 shadow-[0_30px_70px_-30px_rgba(41,36,29,0.35)]">
              <img
                src={asset("images/collection.jpg")}
                alt="The Phare candle collection"
                className="h-[380px] w-full rounded-t-full rounded-b-2xl object-cover md:h-[460px]"
              />
            </div>

            {/* Floating bestseller card */}
            <div className="animate-floaty absolute -bottom-8 -left-6 hidden w-44 overflow-hidden rounded-2xl border border-gold/25 bg-porcelain p-1.5 shadow-[0_20px_45px_-15px_rgba(41,36,29,0.35)] sm:block">
              <img
                src={asset("images/boulangerie.jpeg")}
                alt="Boulangerie — bestselling candle"
                className="h-40 w-full rounded-xl object-cover"
              />
              <p className="px-2 py-2 text-center text-[10px] uppercase tracking-[0.25em] text-gold">
                Boulangerie · Bestseller
              </p>
            </div>

            {/* Gold accent ring */}
            <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border border-gold/30" />
          </div>
        </div>

        {/* Dynamic drawn lines */}
        <div className="line-group absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <svg
            className="line-wrapper absolute w-full h-full"
            viewBox="0 0 177 159"
            preserveAspectRatio="none"
          >
            <path
              id="main-line"
              className="animation-line"
              d="M176 1L53.5359 1C52.4313 1 51.5359 1.89543 51.5359 3L51.5359 56C51.5359 57.1046 50.6405 58 49.5359 58L0 58"
            />
          </svg>

          <svg
            className="line-wrapper absolute w-full h-full"
            viewBox="0 0 176 59"
            preserveAspectRatio="none"
          >
            <path
              className="animation-line"
              d="M0 1L122.464 1C123.569 1 124.464 1.89543 124.464 3L124.464 56C124.464 57.1046 125.36 58 126.464 58L176 58"
            />
          </svg>
        </div>

        {/* Background weave patterns — whisper-subtle on marble */}
        <div
          className="pattern absolute w-[200%] h-[200%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(169,131,78,0.025)_10px,rgba(169,131,78,0.025)_20px)] animate-patternScroll"
          style={{ top: "-50%", left: "-50%" }}
        />
        <div
          className="pattern absolute w-[200%] h-[200%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(169,131,78,0.025)_10px,rgba(169,131,78,0.025)_20px)] animate-patternScroll"
          style={{ top: "50%", left: "50%" }}
        />

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 text-gold/80">
          <span className="uppercase tracking-[0.4em] text-[10px]">Discover</span>
          <span className="block w-px h-10 bg-gradient-to-b from-gold/70 to-transparent" />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
