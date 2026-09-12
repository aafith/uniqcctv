# Uniq CCTV — Smart Security & Surveillance Solutions

A high-performance, Apple-style product landing page featuring a scroll-driven frame animation for **Uniq CCTV** (Sainthamaruthu, Sri Lanka).

---

## Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Library**: React 19
- **Styling**: Tailwind CSS v4.3.3
- **Animations & Scroll**: Framer Motion (useScroll, useTransform, useMotionValueEvent)
- **Icons**: Lucide React & React Icons
- **Language**: TypeScript 5

---

## Features

- **Apple-Style Scroll Animation**: 102 progressive 4K CCTV camera frames rendered on a high-DPI Retina canvas buffer with RAF throttling.
- **Instant First Paint**: Frame 1 streams with immediate priority to eliminate cold-start loading delays.
- **In-Page Navigation**: Smooth scroll targets (`#top`, `#gallery`, `#services`, `#upgrade`, `#contact`) allowing natural exploration.
- **Direct WhatsApp Funnels**: Pre-filled consultation and quote links connected to the company hotline.
- **Responsive Navigation & Footer**: Clean white frosted sticky header with accessible mobile drawer, plus an executive business footer.
- **Tailwind CSS v4 Only**: Zero legacy CSS files; 100% utility-first styling.

---

## Project Structure

```
uniqcctv/
├── app/
│   ├── globals.css      # Tailwind v4 entry point & theme variables
│   ├── layout.tsx       # Root layout with fonts & SEO metadata
│   └── page.tsx         # Main landing page
├── components/
│   ├── home/
│   │   └── Hero.tsx     # Scroll-driven camera showcase & hero sections
│   └── layouts/
│       ├── Header.tsx   # Sticky frosted header & mobile navigation
│       └── Footer.tsx   # Business info, hours, solutions & WhatsApp CTA
├── lib/
│   └── constants.ts     # Site info, nav links, and WhatsApp deep links
└── public/
    ├── frames/          # 102 WebP animation frames
    └── logo.webp        # Brand logo
```

---

## Getting Started

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Code Quality / Linting

```bash
npm run lint
```

---

## Business Configuration

Update business contact details, hours, and phone numbers in [`lib/constants.ts`](./lib/constants.ts):

```typescript
export const SITE_CONFIG = {
  name: "Uniq CCTV",
  phone: "+94 77 123 4567",
  whatsappNumber: "94771234567",
  location: "Main Street, Sainthamaruthu, Sri Lanka",
  hours: "Mon – Sat: 8:30 AM – 7:00 PM",
};
```
