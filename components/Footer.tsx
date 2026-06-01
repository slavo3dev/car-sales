"use client";
import { useLang } from "./LangProvider";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#0a0a0a] font-black text-[9px]">M</span>
          </div>
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase">MotorSelect</span>
        </div>
        <p className="text-white/20 text-xs tracking-wide">
          {t.footer.tagline}
        </p>
        <p className="text-white/20 text-xs">
          © {year} MotorSelect. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
