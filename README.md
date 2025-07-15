# 🚀 MasterFabric Website

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-Latest-000000?logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC?logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![PNPM](https://img.shields.io/badge/PNPM-Latest-F69220?logo=pnpm&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?logo=vercel&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)

[![Live Site](https://img.shields.io/badge/🌐%20Live-masterfabric.co-blue?style=for-the-badge)](https://masterfabric.co)
[![Repository](https://img.shields.io/badge/📁%20Repo-GitHub-black?style=for-the-badge&logo=github)](https://github.com/masterfabric/masterfabric-website)

---

## 📑 Table of Contents
- [🎯 Project Overview](#-project-overview)
- [⚡ Quick Start](#-quick-start)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🎨 Components Architecture](#-components-architecture)
- [📜 Available Scripts](#-available-scripts)
- [🔧 Configuration](#-configuration)
- [🎨 Styling System](#-styling-system)
- [📱 Features](#-features)
- [🚀 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [📊 Performance](#-performance)
- [🔗 Integration](#-integration)
- [🤝 Contributing](#-contributing)
- [📚 Resources](#-resources)
- [📄 License](#-license)

---

## 🎯 Project Overview

**MasterFabric Website** is a modern, responsive web application built with Next.js to showcase mobile app development services. It features:
- Interactive UI/UX (code editor simulation, project timeline)
- Mobile-first, fully responsive design
- Performance-optimized with Next.js SSR/SSG/ISR
- Conversion-focused forms and CTAs
- JSON-driven content management
- GDPR-ready cookie management

---

## ⚡ Quick Start

### 🚀 Automated Setup
```bash
# Clone the repository
git clone https://github.com/masterfabric-mobile/masterfabric-website.git
cd masterfabric-website
chmod +x run.sh
./run.sh setup
```

### 🔧 Manual Setup
```bash
node --version  # Should be 18+
npm install     # or pnpm/yarn
npm run dev     # or pnpm run dev / yarn dev
```

**🌍 Your site will be available at:** `http://localhost:3000`

---

## 🛠️ Tech Stack

| Category         | Technology / Tool                                      | Key Features / Notes                                                                 |
|------------------|--------------------------------------------------------|--------------------------------------------------------------------------------------|
| **Framework**    | [Next.js](https://nextjs.org/)                         | App Router, SSR/SSG/ISR, API Routes, Image Optimization, SEO, Fast Refresh           |
| **Styling**      | [Tailwind CSS](https://tailwindcss.com/)               | Utility-first CSS, responsive design, dark mode, typography plugin                   |
| **Type System**  | [TypeScript](https://www.typescriptlang.org/)          | Static typing, safer code, better DX                                                 |
| **Content**      | [MDX](https://mdxjs.com/)                              | Markdown + JSX, rich content in blog/docs                                            |
| **Icons**        | [Iconify](https://iconify.design/)                     | 100,000+ icons, SVG, easy integration                                               |
| **Fonts**        | [Fontsource](https://fontsource.org/)                  | Bricolage Grotesque, Inter Variable, self-hosted, performance                        |
| **Image Tools**  | [Sharp](https://sharp.pixelplumbing.com/)              | Image optimization, resizing, fast builds                                            |
| **Testing**      | [Jest](https://jestjs.io/)                             | Unit/integration testing, fast feedback                                              |
| **Package Mgmt** | [PNPM](https://pnpm.io/) / npm / yarn                  | Fast, disk-efficient, monorepo support                                               |
| **Deployment**   | [Vercel](https://vercel.com/)                          | Zero-config, edge functions, preview/production deploys                              |
| **Hosting**      | [Firebase Hosting](https://firebase.google.com/)       | Static export, global CDN, SSL, fast delivery                                        |
| **SEO**          | [next-seo](https://github.com/garmeeh/next-seo)        | SEO meta tags, Open Graph, Twitter cards                                             |
| **Sitemap**      | [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) | Automatic sitemap generation, robots.txt support                                     |
| **Analytics**    | Google Analytics, Vercel Analytics                     | Traffic, performance, and engagement monitoring                                      |
| **CI/CD**        | GitHub Actions                                         | Automated builds, tests, and deployments                                             |

---

## 📁 Project Structure

```
masterfabric-website/
├── package.json             # Project dependencies and scripts
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── run.sh                   # Development & deployment script
├── README.md                # Project documentation
├── public/                  # Static assets (favicon, images, robots.txt, etc.)
│
└── src/
    ├── app/                 # Next.js App Router (routing, layouts, pages)
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── globals.css
    │   ├── about/
    │   ├── blog/
    │   ├── contact/
    │   ├── jobs/
    │   ├── privacy-policy/
    │   └── terms-of-use/
    │
    ├── assets/              # Images, SVGs, and other media
    │
    ├── components/          # Reusable UI and feature components
    │   ├── about/
    │   ├── cookie/
    │   ├── forms/
    │   ├── jobs/
    │   ├── layout/
    │   ├── navbar/
    │   ├── pages/
    │   ├── timeline/
    │   ├── ui/
    │   └── wrapper/
    │
    ├── data/                # JSON data files (about, contact, jobs, navigation, etc.)
    │
    ├── styles/              # Global and modular CSS files
    │
    └── utils/               # Utility functions (cookies, performance, etc.)
```

---

## 🎨 Components Architecture

- **Layout Components:** Container, Footer, SectionHead, etc.
- **Navigation System:** Responsive navbar, dropdowns, keyboard navigation
- **Interactive Components:** Timeline, code editor simulation, splash screen, etc.
- **Form Components:** Contact forms, validation, benefits
- **About Page Components:** Animated text, globe, timeline, statistics
- **UI Components:** Button, Link, Icon, LazyImage
- **Privacy & Compliance:** CookieBanner, CookieSettingsDialog

---

## 📜 Available Scripts

| Command                  | Description                        |
|--------------------------|------------------------------------|
| `./run.sh setup`         | Complete project setup              |
| `./run.sh dev`           | Start development server            |
| `./run.sh build`         | Production build                    |
| `./run.sh preview`       | Preview production build            |
| `./run.sh deploy-vercel` | Deploy to Vercel (preview)          |
| `./run.sh deploy-vercel --prod` | Deploy to Vercel (production) |
| `./run.sh deploy-firebase`| Deploy to Firebase                 |
| `./run.sh deploy-all`    | Deploy to all platforms             |
| `./run.sh test`          | Setup test environment              |
| `./run.sh help`          | Show all available commands         |

---

## 🔧 Configuration

- **Site config:** `src/config/site-data.json`
- **Navigation:** `src/data/navigation.json`
- **Content:** `src/data/about.json`, `src/data/contact.json`, `src/data/project-flow.json`
- **TypeScript paths:** `tsconfig.json`
- **Tailwind config:** `tailwind.config.js`

---

## 🎨 Styling System

- **Tailwind CSS** for utility-first styling
- **Design tokens** for color, typography, spacing
- **Responsive breakpoints** for mobile-first design
- **Animation utilities** for transitions and effects

---

## 📱 Features

- ⚡ Performance & SEO: Optimized for Core Web Vitals, SEO meta tags, sitemap
- 📱 Responsive Design: Mobile-first, adaptive layouts
- ♿ Accessibility: Keyboard navigation, screen reader support, color contrast
- 🔒 Privacy & Compliance: GDPR cookie consent, privacy policy, terms of service
- 🎨 Interactive Features: Code editor simulation, project timeline, contact forms
- 🛠️ Technical Features: TypeScript, reusable components, asset optimization
- 🔧 Dev Experience: HMR, import aliases, error boundaries

---

## 🚀 Deployment

- **Build:** `./run.sh build` or `npm run build`
- **Vercel Deploy:** `./run.sh deploy-vercel` or `./run.sh deploy-vercel --prod`
- **Firebase Deploy:** `./run.sh deploy-firebase`
- **Static Export:** Next.js `out/` directory for static hosting

---

## 🧪 Testing

- **Manual QA:** Cross-device, cross-browser, accessibility, performance, security
- **Automated Testing:** (Planned) Unit, integration, E2E, accessibility
- **Test setup:** `./run.sh test`

---

## 📊 Performance

- **Lighthouse Score:** 95+
- **Accessibility:** 100
- **SEO:** 100
- **PWA:** 85+
- **Bundle Analysis:** See build output
- **Optimization:** Tree shaking, code splitting, critical CSS, CDN delivery

---

## 🔗 Integration

- **Web3Forms** - Contact form handling
- **Google Analytics** - Website analytics
- **Vercel Analytics** - Performance monitoring
- **Firebase** - Hosting and potential future features

---

## 🤝 Contributing

### File Naming Conventions
- **Components:** `PascalCase.tsx` (e.g., `ContactForm.tsx`)
- **Utilities:** `camelCase.ts` (e.g., `formatDate.ts`)
- **Data Files:** `kebab-case.json` (e.g., `project-flow.json`)
- **CSS Files:** `kebab-case.css` (e.g., `navbar-styles.css`)

### Contribution Process
1. Fork and clone the repository
2. Install dependencies: `./run.sh setup`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Start development: `./run.sh dev`
5. Open a pull request with a clear description

---

## 📚 Resources
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Styling system
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - Type system
- **[Component Guidelines](./src/components/README.md)** - Internal component docs

---

## 📄 License

**© 2025 MasterFabric Information Technology Inc. All rights reserved.**

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

### 🔒 Privacy & Compliance
- **🍪 [Privacy Policy](https://masterfabric.co/privacy-policy)** - How we handle user data
- **⚖️ [Terms of Use](https://masterfabric.co/terms-of-use)** - Website usage terms
- **🛡️ GDPR Compliance** - EU privacy regulation compliance
- **🔐 Data Security** - Industry-standard security practices

### 🏗️ Third-Party Licenses
This project uses open-source software under various licenses:
- **Tailwind CSS** - MIT License  
- **TypeScript** - Apache License 2.0
- **Various Icon Sets** - See individual icon pack licenses

---

**🚀 Ready to get started? Run `./run.sh setup` and begin building amazing experiences!**
