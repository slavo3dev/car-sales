"use client";
import { useEffect, useState } from "react";
import { useLang } from "./LangProvider";
import type { CarAd } from "@/lib/ads-store";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
      <path d="M1 7h12M7.5 1.5L13 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CarCard({ ad, lang, t }: { ad: CarAd; lang: string; t: { viewAd: string; featured: string } }) {
  const title = lang === "sr" ? ad.titleSr : ad.title;
  return (
    <a
      href={ad.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/25 transition-all duration-300 flex flex-col"
    >
      {ad.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 border border-white/20 px-2 py-0.5">
            {t.featured}
          </span>
        </div>
      )}

      {/* Image placeholder / gradient */}
      <div className="aspect-[16/9] bg-gradient-to-br from-white/[0.04] to-white/[0.01] flex items-center justify-center overflow-hidden">
        {ad.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={ad.imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <svg width="60" height="36" viewBox="0 0 60 36" fill="none" className="opacity-10">
            <path d="M10 26H6a2 2 0 01-2-2v-6l6-12h32l6 12v6a2 2 0 01-2 2h-4M10 26a4 4 0 008 0m26 0a4 4 0 01-8 0M10 26a4 4 0 01-8 0M46 26a4 4 0 008 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          {ad.brand && (
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-1">{ad.brand}</p>
          )}
          <h3 className="text-white font-light text-base leading-snug">{title}</h3>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
          <div className="flex items-center gap-3">
            {ad.year && (
              <span className="text-xs text-white/40">{ad.year}</span>
            )}
            {ad.price && (
              <span className="text-sm font-medium text-white">{ad.price}</span>
            )}
          </div>
          <span className="text-white/50 group-hover:text-white flex items-center gap-1.5 text-xs tracking-widest uppercase transition-colors">
            {t.viewAd} <ArrowIcon />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function Listings() {
  const { lang, t } = useLang();
  const [ads, setAds] = useState<CarAd[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ads")
      .then((r) => r.json())
      .then(setAds)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="listings" className="bg-[#0a0a0a] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-3">
              {ads.length} {lang === "sr" ? "vozila" : "vehicles"}
            </p>
            <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tight">
              {t.listings.title}
            </h2>
          </div>
          <p className="text-white/40 text-sm font-light max-w-xs leading-relaxed">
            {t.listings.sub}
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/3] bg-[#0a0a0a] animate-pulse" />
            ))}
          </div>
        ) : ads.length === 0 ? (
          <div className="text-center py-24 text-white/30 text-sm tracking-widest uppercase">
            {t.listings.noAds}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {ads.map((ad) => (
              <div key={ad.id} className="bg-[#0a0a0a]">
                <CarCard ad={ad} lang={lang} t={t.listings} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
