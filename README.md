# Dev Studio — 3D Interactive Web & AI Engineering Studio

> A high-performance, productized AI engineering portfolio and client intake engine built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features a frame-accurate 3D scroll-scrubbed canvas experience and an Apple/Linear-inspired dark aesthetic.

---

## ⚡ Overview

- **Interactive 3D Canvas Scroller**: Dual-stage canvas sequence scrubbed to scroll depth with high-efficiency WebP frames (~5 MB total).
- **1080p HUD Docking Monitor**: Smooth 3D perspective flip (`rotateX`), scale, and unblur effect directly mirroring physical camera motion into an interactive project showcase.
- **Extreme Professional Premium Design**: Disciplined obsidian dark palette (`#06080e`), 1px micro-borders, tactile solid white buttons, and segmented control tabs.
- **Productized Client Acquisition**: Built-in 4-step project scoping wizard with instant WhatsApp and Email dispatch with zero freelance platform fees.
- **Production-Grade SEO & Hostinger Ready**: Full Schema.org `ProfessionalService` JSON-LD, dynamic OpenGraph metadata, XML sitemap, and static HTML export (`output: 'export'`).

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router, Static Export)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, Custom Micro-Borders, Glassmorphism
- **Animations**: Framer Motion & Native Canvas 2D Scrubbing
- **Icons**: Lucide React
- **Micro-Interactions**: Canvas Confetti

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Asadullah404/Dev_Studio.git
cd Dev_Studio
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Production Build & Static Export

```bash
npm run build
```

This compiles optimized static assets into the `out/` directory ready to be uploaded directly to Hostinger `public_html`, Vercel, or GitHub Pages.

---

## 📁 Repository Structure

```
├── public/
│   └── frames/              # Extracted WebP frame sequences for 3D scroller
├── scripts/
│   └── extract_frames.py    # Python OpenCV script for frame extraction
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout, metadata & Schema.org JSON-LD
│   │   ├── page.tsx         # App entry point
│   │   ├── globals.css      # Design tokens, micro-borders, and utilities
│   │   ├── sitemap.ts       # Dynamic sitemap generator
│   │   └── robots.ts        # Dynamic robots.txt
│   ├── components/
│   │   ├── Navbar.tsx             # Fixed luxury header & status pill
│   │   ├── Hero3DExperience.tsx   # Canvas scroller + 3D HUD docking card
│   │   ├── ProjectsShowcase.tsx   # Verified production project cards
│   │   ├── ServicesSection.tsx    # 6 productized capabilities & pricing
│   │   ├── HowItWorks.tsx         # 4-step client milestone roadmap
│   │   ├── TrustSection.tsx       # Guarantees & interactive FAQ
│   │   ├── IntakeWizard.tsx       # 4-step client intake & quote generator
│   │   ├── ProjectModal.tsx       # Deep technical architecture drawer
│   │   └── Footer.tsx             # Minimalist footer & copyright
│   ├── data/                # Project and service structured catalogs
│   └── types/               # TypeScript interfaces
└── next.config.mjs          # Next.js static export configuration
```

---

## 📄 License

MIT © [Asadullah](https://github.com/Asadullah404)
