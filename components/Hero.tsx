"use client";
import { useLang } from "./LangProvider";

export default function Hero() {
  const { t } = useLang();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.06)_0%,transparent_70%)]" />

      {/* Accent line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <p className="text-xs tracking-[0.4em] text-white/40 uppercase mb-8 animate-fade-in">
          {t.hero.eyebrow}
        </p>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white leading-[1.05] tracking-[-0.02em] mb-8">
          {t.hero.headline.split(" ").map((word, i) => (
            <span
              key={i}
              className={i === t.hero.headline.split(" ").length - 1 ? "block" : ""}
            >
              {word}{" "}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <p className="text-white/50 text-lg font-light leading-relaxed max-w-2xl mx-auto mb-12">
          {t.hero.sub}
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => scrollTo("listings")}
            className="bg-white text-[#0a0a0a] px-8 py-3.5 text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/90 transition-colors"
          >
            {t.hero.cta}
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="border border-white/30 text-white px-8 py-3.5 text-xs font-light tracking-[0.2em] uppercase hover:border-white/60 hover:bg-white/5 transition-all"
          >
            {t.hero.ctaContact}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white animate-pulse" />
      </div>
    </section>
  );
}
