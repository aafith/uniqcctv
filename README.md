# Uniq CCTV — Enterprise Security & Smart Surveillance Solutions

A modern, high-performance digital presence and interactive product experience for **Uniq CCTV** (Sainthamaruthu, Sri Lanka), specializing in commercial, industrial, and residential smart security installations.

Built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**.

---

## Key Features

- **Interactive Hardware Showcase**: Smooth, scroll-driven 102-frame sequence rendered onto a hardware-accelerated, high-DPI HTML5 canvas with dynamic device pixel ratio (DPR) scaling and RAF synchronization.
- **Conversion-Driven Inquiries**: Direct WhatsApp business funnels with context-aware pre-filled inquiry messages for instant quote requests, consultations, and emergency support.
- **Executive Design System**: Pure Tailwind CSS v4 architecture with crisp typography, subtle frosted-glass surfaces (`backdrop-blur`), and an executive light aesthetic.
- **Responsive Navigation**: Sticky top navigation with accessible mobile drawer, keyboard ESC closing, backdrop dimming, and smooth in-page section scrolling (`#gallery`, `#services`, `#upgrade`, `#contact`).
- **Production Performance**: Instant first-frame rendering with progressive asset preloading, zero layout shifts, and zero external style sheets.

---

## Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | 16.3.4 | Server components, static generation, Turbopack |
| **Library** | React | 19.2.4 | Modern component model & hooks |
| **Styling** | Tailwind CSS | 4.3.3 | Pure utility-first styling with `@tailwindcss/postcss` |
| **Animation** | Framer Motion | 12.40.0 | Scroll progress tracking and section transitions |
| **Icons** | Lucide React / React Icons | 1.16.0 / 5.5.0 | High-clarity system and navigation iconography |
| **Type Safety** | TypeScript | 5.x | Strict end-to-end typing |

---

## Project Structure

```
uniqcctv/
├── app/
│   ├── globals.css           # Tailwind CSS v4 theme variables & font setup
│   ├── layout.tsx            # Global HTML shell, SEO metadata, and fonts
│   └── page.tsx              # Primary landing page assembly
├── components/
│   ├── home/
│   │   └── Hero.tsx          # Scroll-driven camera sequence & presentation sections
│   └── layouts/
│       ├── Header.tsx        # Sticky navigation bar & mobile menu drawer
│       └── Footer.tsx        # Business contact info, operating hours, & site links
├── lib/
│   └── constants.ts          # Central business data, navigation items, & WhatsApp utilities
└── public/
    ├── frames/               # 102 progressive camera inspection WebP frames
    └── logo.webp             # Official company branding
```

---

## Getting Started

### Prerequisites

- Node.js 18.18 or higher
- npm 9.0 or higher

### Installation

```bash
git clone https://github.com/aafith/uniqcctv.git
cd uniqcctv
npm install
```

### Development Server

Run the local development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Verify type safety and compile optimized production assets:

```bash
npm run build
npm run start
```

### Code Quality & Linting

Run automated lint checks:

```bash
npm run lint
```

---

## Business Configuration

Contact details, working hours, and operational credentials can be managed from a single source of truth in [`lib/constants.ts`](./lib/constants.ts):

```typescript
export const SITE_CONFIG = {
  name: "Uniq CCTV",
  tagline: "Professional Security & Surveillance Systems",
  phone: "+94 77 123 4567",
  whatsappNumber: "94771234567",
  location: "Main Street, Sainthamaruthu, Sri Lanka",
  hours: "Mon – Sat: 8:30 AM – 7:00 PM",
};
```

---

## License

Copyright © 2026 Uniq CCTV. All rights reserved.
