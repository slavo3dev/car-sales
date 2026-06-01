"use client";
import { useState, useEffect } from "react";
import { useLang } from "./LangProvider";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#0a0a0a] font-black text-sm tracking-tighter">M</span>
          </div>
          <span className="text-white font-light tracking-[0.3em] text-sm uppercase">
            MotorSelect
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { key: "home", id: "hero" },
            { key: "listings", id: "listings" },
            { key: "contact", id: "contact" },
          ].map(({ key, id }) => (
            <button
              key={key}
              onClick={() => scrollTo(id)}
              className="text-white/70 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors"
            >
              {t.nav[key as keyof typeof t.nav]}
            </button>
          ))}

          {/* Language toggle */}
          <div className="flex items-center gap-1 border border-white/20 rounded-full px-3 py-1">
            <button
              onClick={() => setLang("en")}
              className={`text-xs tracking-widest uppercase transition-colors px-1 ${
                lang === "en" ? "text-white font-medium" : "text-white/40 hover:text-white/70"
              }`}
            >
              EN
            </button>
            <span className="text-white/20 text-xs">|</span>
            <button
              onClick={() => setLang("sr")}
              className={`text-xs tracking-widest uppercase transition-colors px-1 ${
                lang === "sr" ? "text-white font-medium" : "text-white/40 hover:text-white/70"
              }`}
            >
              SR
            </button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-px bg-white transition-all mb-1.5 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-5 h-px bg-white transition-all mb-1.5 ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-px bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a]/98 backdrop-blur-md border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {[
            { key: "home", id: "hero" },
            { key: "listings", id: "listings" },
            { key: "contact", id: "contact" },
          ].map(({ key, id }) => (
            <button
              key={key}
              onClick={() => scrollTo(id)}
              className="text-white/70 hover:text-white text-sm tracking-[0.2em] uppercase text-left transition-colors"
            >
              {t.nav[key as keyof typeof t.nav]}
            </button>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-white/10">
            {(["en", "sr"] as const).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setMenuOpen(false); }}
                className={`text-xs tracking-widest uppercase ${lang === l ? "text-white" : "text-white/40"}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
