# MotorSelect — Premium Car Listings Site

A BMW-inspired dark luxury landing page with bilingual support (English/Serbian), a car listings section, contact form, and a password-protected admin portal. Built with **Next.js 15 + Tailwind CSS**. No database — listings persist in a local JSON file (`data/ads.json`).

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set your admin password (change this!)
echo "ADMIN_KEY=your_secret_password" > .env.local

# 3. Run in development
npm run dev

# 4. Open http://localhost:3000
```

---

## Features

| Feature | Details |
|---|---|
| 🌍 Bilingual | English / Serbian toggle in navbar |
| 🚗 Listings | Grid of car ads with brand, price, year, image, and external link |
| ⭐ Featured | Toggle listing to appear as "Featured" |
| 📩 Contact Form | Name, email, phone, message — logged to console (hook up email service) |
| 🔐 Admin Portal | `/admin` — password-protected CRUD for listings |
| 💾 No DB | Data stored in `data/ads.json` (auto-created with sample data) |
| 📱 Responsive | Mobile-first, hamburger menu on small screens |
| 🔗 QR Code | Link directly to `/?ref=qr` — listings are always visible on load |

---

## Admin Portal

Visit `/admin` and enter the `ADMIN_KEY` from your `.env.local`.

**Capabilities:**
- Add new listing (title EN + SR, URL, price, year, brand, image URL, featured toggle)
- Remove listing (with confirmation step)
- Toggle featured status

---

## Connecting a Real Email Service

In `app/api/contact/route.ts`, replace the `console.log` with your email provider:

```ts
// Example with Resend (https://resend.com)
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({ from: '...', to: '...', subject: '...', text: message });
```

---

## Deployment (Vercel)

```bash
npx vercel
# Set ADMIN_KEY in Vercel Dashboard → Settings → Environment Variables
```

> ⚠️ On Vercel (serverless), `data/ads.json` will reset on redeploy. For persistence, replace `lib/ads-store.ts` with a database (PlanetScale, Supabase, Vercel KV, etc.).

---

## Structure

```
app/
  page.tsx          ← Landing page
  admin/page.tsx    ← Admin portal
  api/
    ads/route.ts    ← GET all, POST new
    ads/[id]/route.ts ← DELETE, PATCH
    contact/route.ts  ← Contact form
components/
  Navbar.tsx
  Hero.tsx
  Listings.tsx
  Contact.tsx
  Footer.tsx
  LangProvider.tsx  ← Language context
lib/
  ads-store.ts      ← File-based data store
  i18n.ts           ← EN/SR translations
data/
  ads.json          ← Auto-generated, gitignore this in production
```
