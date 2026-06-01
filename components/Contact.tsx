"use client";
import { useState } from "react";
import { useLang } from "./LangProvider";

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "ok" : "err");
      if (res.ok) setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("err");
    }
  };

  return (
    <section id="contact" className="bg-[#0a0a0a] py-28 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tight mb-6">
            {t.contact.title}
          </h2>
          <p className="text-white/40 font-light leading-relaxed max-w-sm">
            {t.contact.sub}
          </p>

          {/* Decorative element */}
          <div className="mt-16 hidden lg:block">
            <div className="w-16 h-px bg-white/20" />
            <div className="mt-6 text-white/20 text-xs tracking-[0.3em] uppercase">
              MotorSelect
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={t.contact.namePlaceholder}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="bg-transparent border border-white/15 focus:border-white/40 text-white placeholder-white/25 px-4 py-3.5 text-sm outline-none transition-colors"
            />
            <input
              type="email"
              placeholder={t.contact.emailPlaceholder}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="bg-transparent border border-white/15 focus:border-white/40 text-white placeholder-white/25 px-4 py-3.5 text-sm outline-none transition-colors"
            />
          </div>
          <input
            type="tel"
            placeholder={t.contact.phonePlaceholder}
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="bg-transparent border border-white/15 focus:border-white/40 text-white placeholder-white/25 px-4 py-3.5 text-sm outline-none transition-colors"
          />
          <textarea
            rows={5}
            placeholder={t.contact.messagePlaceholder}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="bg-transparent border border-white/15 focus:border-white/40 text-white placeholder-white/25 px-4 py-3.5 text-sm outline-none transition-colors resize-none"
          />

          <div className="flex items-center gap-6">
            <button
              onClick={handleSubmit}
              disabled={status === "sending"}
              className="bg-white text-[#0a0a0a] px-8 py-3.5 text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {status === "sending" ? t.contact.sending : t.contact.send}
            </button>
            {status === "ok" && (
              <p className="text-white/60 text-xs tracking-wide">{t.contact.success}</p>
            )}
            {status === "err" && (
              <p className="text-red-400/80 text-xs tracking-wide">{t.contact.error}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
