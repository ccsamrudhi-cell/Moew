# 🐄 Moo Translator – Speak the Herd

A playful branded web experience for **Two Brothers Organic Farms** where followers can decode the secret Moo Language used in Instagram replies.

---

## Features

- **Moo → Human** translation with fuzzy matching (typos still work)
- **Human → Moo** translation
- **Moo Dictionary** with 46 phrases + search
- **Easter eggs** — try typing `Mooooooo`
- **Gamification** — badges at 5 and 20 translations
- **Suggest a Moo** — submit new phrases (stored in localStorage, ready for API)
- **Share** — WhatsApp, Instagram, copy link
- Mobile-first, SEO optimized, Open Graph ready
- Dark mode support

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev

# 3. Open http://localhost:3000
```

---

## Configuration

Edit **`src/lib/config.ts`** to update:

```ts
export const siteConfig = {
  url: "https://mootranslator.twobrothersindia.com",   // ← Your deployed URL
  farmUrl: "https://www.twobrothersindia.com",         // ← Farm website URL
  instagramUrl: "https://www.instagram.com/twobrothersindia",
  // ...
};
```

---

## Adding / Editing Moo Phrases

Edit **`src/data/moo-dictionary.json`**:

```json
[
  { "moo": "Your-new-phrase", "human": "What it means in English" },
  ...
]
```

That's it — no code changes needed. The translator and dictionary both pull from this file.

---

## Project Structure

```
moo-translator/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + metadata/OG tags
│   │   ├── page.tsx            # Main page (assembles components)
│   │   └── globals.css         # Tailwind + CSS variables
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Translator.tsx      # Main translator UI (both tabs)
│   │   ├── Confetti.tsx        # Celebration animation
│   │   ├── MooDictionary.tsx   # Searchable dictionary cards
│   │   ├── SuggestMoo.tsx      # Suggest new phrases
│   │   ├── ShareSection.tsx    # WhatsApp / Instagram / copy link
│   │   ├── AboutSection.tsx    # About + footer
│   │   └── BadgeToast.tsx      # Badge unlock notification
│   ├── data/
│   │   └── moo-dictionary.json # 🐄 All phrases live here — easy to edit
│   └── lib/
│       ├── config.ts           # Site-wide config (URLs, brand name)
│       ├── translator.ts       # Fuzzy matching logic
│       └── useTranslationTracker.ts  # Badge / count tracking hook
├── public/
│   ├── og-image.png            # Add your 1200×630 OG image here
│   └── favicon.ico
├── tailwind.config.ts          # Brand colors
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Deploying to Vercel

### Option A — GitHub (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Add your custom domain in Vercel's domain settings

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Environment Variables

No environment variables are required for the base version. If you add a backend for suggestion storage later, add:

```
SUGGESTIONS_API_URL=https://your-api.com/suggestions
```

---

## Adding a Backend for Suggestions

Currently, `SuggestMoo.tsx` saves to `localStorage`. To send to a real endpoint:

```ts
// In src/components/SuggestMoo.tsx, replace the localStorage block with:
await fetch("/api/suggestions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ phrase, meaning }),
});
```

Then add `src/app/api/suggestions/route.ts` to handle the POST.

---

## OG Image

Add a **1200×630** image at `public/og-image.png` for Instagram link previews.
Recommended design: cream background, cow illustration, "Moo Translator — Speak the Herd" text in TBOF brand colors.

---

## Brand Colors

| Color | Hex |
|-------|-----|
| Cream | `#FFF9F0` |
| Brown | `#6B4F3A` |
| Forest Green | `#4E6B45` |
| Warm Beige | `#EADDC8` |

---

## Made with 🤍 by Two Brothers Organic Farms
