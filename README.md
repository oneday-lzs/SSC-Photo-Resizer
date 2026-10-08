# UPSC Photo & Signature Resizer 🇮🇳

A fast, private, 100% client-side tool tailored for Indian competitive exam aspirants (UPSC Civil Services, NDA, CDS, SSC CGL/CHSL, IBPS Bank PO/Clerk). It resizes, crops, and compresses photos and signatures to match strict government specifications without uploading any files to any server.

---

## 🌟 Key Features

1. **100% Client-Side & Private**:
   - Zero files uploaded to any backend. All image cropping, rotation, and compression happen entirely within the user's browser using HTML5 Canvas & binary JPEG manipulation.
2. **Official Exam Presets**:
   - **UPSC Photo**: 413 × 531 px, 20 KB – 300 KB, JPEG
   - **UPSC Signature**: 140 × 60 px, 20 KB – 300 KB, JPEG
   - **SSC Photo**: 100 × 120 px, 20 KB – 50 KB
   - **SSC Signature**: 140 × 60 px, 10 KB – 20 KB
   - **IBPS Photo**: 200 × 230 px, 20 KB – 50 KB
   - **IBPS Signature**: 140 × 60 px, 10 KB – 20 KB
   - **Custom**: User-defined width, height, min size, and max size.
3. **Smart Aspect-Ratio Preserving Crop (Cover Mode)**:
   - Centered crop prevents distortion and aspect ratio skewing.
4. **Binary Search Quality Compression**:
   - Iterative quality tuning (0.05 to 1.0) to land precisely within official KB boundaries.
5. **Smart Min-Size Auto-Padding**:
   - Solves the common UPSC portal error where high-clarity signature images compress to under 20KB by safely injecting standard JPEG `COM` comment markers.
6. **Bilingual Support**:
   - Full English and Hindi (हिन्दी) interface.
7. **Mobile-First & Responsive**:
   - Optimized for touch, drag-and-drop, and mobile browsers (Safari on iOS & Chrome on Android).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Indian flag tricolor accents: Saffron `#FF9933`, White, Green `#138808`)
- **Icons**: Lucide React
- **Processing**: Pure HTML5 Canvas API + Binary JPEG padding (Zero external backend or heavy dependencies)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.17.0 or newer)
- npm or pnpm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deploy to Vercel

Because this application is 100% client-side with `output: 'export'`, it can be deployed with zero configuration on Vercel:

### Method 1: Deploy with Vercel CLI
```bash
npm i -g vercel
vercel
```

### Method 2: Deploy via GitHub / GitLab / Bitbucket
1. Push this repository to GitHub.
2. Log into [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will be automatically detected as **Next.js**.
5. Click **"Deploy"**.
6. Done! Your site is live on a free `.vercel.app` domain.
