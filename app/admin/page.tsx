"use client";
import { useState, useEffect, useCallback } from "react";
import type { CarAd } from "@/lib/ads-store";

const ADMIN_KEY_STORAGE = "motorselect_admin_key";

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 3.5h10M5.5 3.5V2.5h3v1M3.5 3.5l.7 8h5.6l.7-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill={filled ? "currentColor" : "none"}>
      <path d="M7 1.5l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9.5l-3 1.5.5-3.5L2 5l3.5-.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const emptyForm = {
  title: "",
  titleSr: "",
  url: "",
  price: "",
  year: "",
  brand: "",
  imageUrl: "",
  featured: false,
};

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [authed, setAuthed] = useState(false);
  const [ads, setAds] = useState<CarAd[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Restore key from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_KEY_STORAGE);
    if (saved) {
      setAdminKey(saved);
      setAuthed(true);
    }
  }, []);

  const fetchAds = useCallback(async () => {
    const r = await fetch("/api/ads");
    const data = await r.json();
    setAds(data);
  }, []);

  useEffect(() => {
    if (authed) fetchAds();
  }, [authed, fetchAds]);

  const login = async () => {
    setError("");
    // Verify key by attempting a dummy request (or just store and test on first action)
    // We'll test it by trying to add a dummy and catching 401
    // Actually let's just accept and verify on first action
    setAdminKey(keyInput);
    sessionStorage.setItem(ADMIN_KEY_STORAGE, keyInput);
    setAuthed(true);
  };

  const logout = () => {
    setAdminKey("");
    sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    setAuthed(false);
  };

  const addAd = async () => {
    if (!form.title || !form.titleSr || !form.url) {
      setError("Title (EN), Title (SR), and URL are required.");
      return;
    }
    setSaving(true);
    setError("");
    const res = await fetch("/api/ads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, year: form.year ? +form.year : undefined, adminKey }),
    });
    setSaving(false);
    if (res.status === 401) { setError("Invalid admin key."); return; }
    if (!res.ok) { setError("Failed to add listing."); return; }
    setForm(emptyForm);
    fetchAds();
  };

  const removeAd = async (id: string) => {
    const res = await fetch(`/api/ads/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminKey }),
    });
    if (res.status === 401) { setError("Invalid admin key."); return; }
    setDeleteConfirm(null);
    fetchAds();
  };

  const toggleFeatured = async (ad: CarAd) => {
    await fetch(`/api/ads/${ad.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !ad.featured, adminKey }),
    });
    fetchAds();
  };

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <span className="text-[#0a0a0a] font-black text-sm">M</span>
            </div>
            <span className="text-white font-light tracking-[0.3em] text-sm uppercase">MotorSelect</span>
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-3">Admin Portal</p>
          <h1 className="text-3xl font-extralight text-white mb-8">Access</h1>
          <input
            type="password"
            placeholder="Admin key"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full bg-transparent border border-white/15 focus:border-white/40 text-white placeholder-white/25 px-4 py-3.5 text-sm outline-none transition-colors mb-4"
          />
          <button
            onClick={login}
            className="w-full bg-white text-[#0a0a0a] py-3.5 text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/90 transition-colors"
          >
            Enter
          </button>
          {error && <p className="text-red-400/80 text-xs mt-3">{error}</p>}
          <p className="text-white/20 text-xs mt-6">
            Set <code className="font-mono">ADMIN_KEY</code> in your environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 pb-20">
      {/* Top bar */}
      <div className="max-w-5xl mx-auto">
        <div className="h-16 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
              <span className="text-[#0a0a0a] font-black text-[10px]">M</span>
            </div>
            <span className="text-white/50 text-xs tracking-[0.3em] uppercase">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-white/40 hover:text-white text-xs tracking-widest uppercase transition-colors">
              ← Site
            </a>
            <button onClick={logout} className="text-white/30 hover:text-white/70 text-xs uppercase tracking-widest transition-colors">
              Logout
            </button>
          </div>
        </div>

        {/* Add form */}
        <div className="mt-12 mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">New Listing</p>
          <div className="border border-white/10 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              placeholder="Title (English) *"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="admin-input"
            />
            <input
              placeholder="Naslov (Srpski) *"
              value={form.titleSr}
              onChange={(e) => setForm((f) => ({ ...f, titleSr: e.target.value }))}
              className="admin-input"
            />
            <input
              placeholder="Listing URL *"
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
              className="admin-input sm:col-span-2"
            />
            <input
              placeholder="Brand (e.g. BMW)"
              value={form.brand}
              onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
              className="admin-input"
            />
            <input
              placeholder="Price (e.g. €45,000)"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              className="admin-input"
            />
            <input
              placeholder="Year (e.g. 2023)"
              type="number"
              value={form.year}
              onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
              className="admin-input"
            />
            <input
              placeholder="Image URL (optional)"
              value={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
              className="admin-input"
            />

            <div className="sm:col-span-2 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${form.featured ? "bg-white" : "bg-white/15"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-[#0a0a0a] transition-all ${form.featured ? "left-5.5 left-[22px]" : "left-0.5"}`} />
                </div>
                <span className="text-white/50 text-xs tracking-wide">Featured</span>
              </label>
              <div className="flex items-center gap-3">
                {error && <p className="text-red-400/80 text-xs">{error}</p>}
                <button
                  onClick={addAd}
                  disabled={saving}
                  className="bg-white text-[#0a0a0a] px-6 py-2.5 text-xs font-medium tracking-[0.15em] uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  {saving ? "Adding..." : "Add Listing"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Listings table */}
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">
            All Listings ({ads.length})
          </p>
          {ads.length === 0 ? (
            <div className="text-center py-16 text-white/20 text-xs tracking-widest uppercase border border-white/10">
              No listings yet
            </div>
          ) : (
            <div className="border border-white/10">
              {ads.map((ad, i) => (
                <div
                  key={ad.id}
                  className={`flex items-start gap-4 p-4 ${i !== ads.length - 1 ? "border-b border-white/10" : ""} hover:bg-white/[0.02] transition-colors`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {ad.brand && (
                        <span className="text-[10px] tracking-[0.2em] uppercase text-white/25">{ad.brand}</span>
                      )}
                      {ad.featured && (
                        <span className="text-[10px] text-white/40 border border-white/15 px-1.5 py-0.5 tracking-wide">Featured</span>
                      )}
                    </div>
                    <p className="text-white/80 text-sm font-light mt-0.5">{ad.title}</p>
                    <p className="text-white/30 text-xs mt-0.5">{ad.titleSr}</p>
                    <a
                      href={ad.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/25 hover:text-white/60 text-xs mt-1 truncate block max-w-sm transition-colors"
                    >
                      {ad.url}
                    </a>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {ad.price && <span className="text-white/40 text-xs hidden sm:block">{ad.price}</span>}
                    <button
                      onClick={() => toggleFeatured(ad)}
                      className={`p-2 transition-colors ${ad.featured ? "text-white" : "text-white/20 hover:text-white/50"}`}
                      title="Toggle featured"
                    >
                      <StarIcon filled={ad.featured} />
                    </button>
                    {deleteConfirm === ad.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => removeAd(ad.id)}
                          className="text-red-400 text-[10px] tracking-wide uppercase px-2 py-1 border border-red-400/30 hover:bg-red-400/10 transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-white/30 text-[10px] uppercase px-2 py-1 hover:text-white/60 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(ad.id)}
                        className="p-2 text-white/20 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <TrashIcon />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
