# Modern High-Performance Computer Engineering Portfolio

A sleek, responsive, dark-mode-first personal portfolio engineered specifically for **Computer Engineering students specializing in full-stack software development and systems engineering**.

Built with semantic **HTML5**, **Tailwind CSS**, and **modern vanilla JavaScript** — zero build step required, instant load time, and high accessibility.

---

## 🚀 Live Preview & Quick Start

You can immediately open and view the website:

### Option 1: Direct File Access
Simply open or double-click [`index.html`](file:///C:/Users/VIDYA/.gemini/antigravity/scratch/portfolio/index.html) in your browser (Chrome, Edge, Firefox, Brave).

### Option 2: Live Local Server (Node.js)
A dedicated Node.js static server has been provided:
```powershell
cd C:\Users\VIDYA\.gemini\antigravity\scratch\portfolio
node server.js
```
Then visit: [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Key Features & Architecture

### 1. Dark-Mode-First Engineering Aesthetic
- Deep slate/zinc palette (`#030712`, `slate-950`, `zinc-900`) with ambient radial glow accents (cyan & indigo).
- Monospace typographic accents featuring **Geist Mono** and **JetBrains Mono** paired with crisp **Inter**.
- Dynamic accent color switcher (Cyan, Indigo, Emerald, Violet) supporting user persistence via `localStorage`.

### 2. Core Sections
1. **Hero Section**:
   - High-impact tagline: *"Bridging hardware architecture with scalable software systems"*.
   - Live pulsating status beacon: *"Available for Summer 2026/2027 Internships & Roles"*.
   - Primary CTAs: *Explore Projects*, *Launch Terminal*, and *1-click Copy Email* with toast notifications.
   - Animated metric counters: LeetCode problems, GPA, Raft throughput benchmarks, and open-source contributions.
   - Social links: GitHub, LinkedIn, Email, LeetCode, Codeforces.

2. **About & Education**:
   - Degree credentials: B.S. in Computer Engineering (GPA 3.92/4.00, Dean's Honors).
   - Core Coursework tags: Operating Systems & Concurrency, Computer Architecture (RISC-V), Distributed Systems, Algorithms, Database Internals, and Computer Networks.

3. **Interactive Skill Matrix**:
   - Categorized across **Languages**, **Web & Backend**, **Systems & Low-Level**, and **DevOps & Tools**.
   - Interactive category filter buttons and real-time live search filter.

4. **Featured Projects**:
   - **AetherKV**: Distributed Raft-based fault-tolerant key-value store (Go, gRPC, Protobuf).
   - **OmniSync**: Real-time collaborative canvas & code workspace (TypeScript, React, WebSockets, CRDTs, Redis).
   - **SpectraVM**: 32-bit RISC-V pipelined processor simulator (C++20, WebAssembly, React).
   - **DevPulse**: Full-stack cloud telemetry & microservices health SaaS (FastAPI, Next.js, TimescaleDB).
   - Interactive **Deep Dive Architecture Modal** detailing problem statements, engineering solutions, and architectural breakdowns.

5. **Interactive Dev Terminal Emulator**:
   - Emulates an interactive Linux/zsh shell session (`visitor@vidya-workstation:~$`).
   - Supports commands: `help`, `about`, `skills`, `projects`, `education`, `contact`, `neofetch`, `theme [cyan|indigo|emerald|violet]`, `cat resume.txt`, `sudo`, and `clear`.
   - Command history navigation with `Up` / `Down` arrow keys, and `Tab` autocomplete.
   - Quick-run command chips for mobile and mouse users.

6. **Contact Form & Footer**:
   - Glassmorphic contact form with client-side validation, error cues, and animated transmission state.
   - Quick copy-to-clipboard email button with instant toast feedback.
   - Responsive footer with back-to-top floating shortcut.

---

## 📁 File Structure

```
portfolio/
├── index.html          # Semantic HTML5 layout with Tailwind CSS styling
├── css/
│   └── styles.css      # Custom animations, glows, themes, CRT scanlines & terminal styling
├── js/
│   └── app.js          # Terminal emulator, skill filtering, modals, form validation, copy-to-clipboard
├── assets/             # Place your resume PDF, headshot, or demo screenshots here
└── README.md           # Documentation & customization guide
```

---

## 🛠️ Personalization Checklist

To customize this portfolio for your own credentials:
1. **Name & Title**: Configured for `Vidya`. Customize titles in `index.html` and `js/app.js`.
2. **Contact Email**: Configured with `vidya.eng@example.com` in `index.html` (`data-email` attributes) and in `js/app.js`.
3. **Resume File**: Place your `resume.pdf` in the `assets/` folder and point the `Resume` link to `assets/resume.pdf`.
4. **Social Links**: Replace placeholder URLs (`github.com`, `linkedin.com`, `leetcode.com`) with your actual profile handles.
5. **Projects**: Modify titles, descriptions, and GitHub links in `index.html` and the `projectData` object inside `js/app.js`.

---

## 🌐 Free 1-Click Deployment

- **GitHub Pages**: Push this repo to GitHub, go to *Settings -> Pages*, and select the root directory on the `main` branch.
- **Vercel / Netlify / Cloudflare Pages**: Connect your GitHub repository; zero build command needed (framework preset: *Other / Static HTML*).
