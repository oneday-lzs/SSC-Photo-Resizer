import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TrustBanner } from '@/components/TrustBanner';
import { ResizerWidget } from '@/components/ResizerWidget';
import { JsonLd } from '@/components/JsonLd';
import {
  SITE_URL,
  getAlternateLanguages,
  generateSoftwareApplicationSchema,
  generateHowToSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  FileCheck,
  Lock,
  ChevronDown,
  HelpCircle,
  Smartphone,
  Check,
} from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'UPSC Photo Resizer 413x531 Pixels (20KB-300KB) – Free & Private';
  const description =
    'Free UPSC photo resizer and signature resize tool. Crop and compress photo to 413x531 pixels (20KB-300KB) and signature to 140x60 pixels. 100% private, client-side, zero upload.';

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: [
      'UPSC photo resizer',
      '413x531',
      '140x60',
      '20KB-300KB',
      'compress UPSC photo',
      'signature resize',
      'UPSC photo converter online',
      'UPSC signature padding',
      'UPSC exam photo requirements 2026',
    ],
    alternates: {
      canonical: '/en',
      languages: getAlternateLanguages(''),
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'UPSC Photo Resizer 413x531 Pixels (20KB-300KB) – Free & Private',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

const upscFaqs = [
  {
    question: 'What are the exact photo specifications for UPSC 2026 application?',
    answer:
      'According to the official UPSC notification, photographs must be in JPG/JPEG format with dimensions of 413 pixels (width) by 531 pixels (height). The file size must be strictly between 20KB-300KB. The candidate’s face must occupy at least 3/4th (75%) of the frame with a clean white or light background, taken within 10 days of the online application.',
  },
  {
    question: 'What are the required dimensions and file size for UPSC signature resize?',
    answer:
      'For UPSC signature resize, the official recommended dimension is 140 pixels in width by 60 pixels in height (aspect ratio ~7:3). Like the photo, the signature file size must strictly fall between 20KB-300KB and be in JPEG format. It must be signed in black ink on white unruled paper without all-capital lettering.',
  },
  {
    question: 'Why does the UPSC portal reject my signature with "File size less than 20 KB"?',
    answer:
      'Signatures on blank white paper compress very efficiently, often shrinking to only 5 KB to 15 KB even at high quality. Because UPSC mandates a minimum file size of 20 KB, the government portal automatically rejects such files. Our UPSC photo resizer solves this by safely adding compliant JPEG comment markers (padding) so the signature easily exceeds 20 KB without altering visual quality or violating format standards.',
  },
  {
    question: 'How do I compress UPSC photo to 20KB-300KB without blurring or stretching my face?',
    answer:
      'Our tool uses an automated binary-search algorithm combined with HTML5 Canvas centered cover-cropping. It preserves your facial aspect ratio without stretching, crops out unnecessary margins, and iteratively tests compression quality between 0.05 and 1.0 until the JPEG size lands precisely in the 20KB-300KB safe zone.',
  },
  {
    question: 'Are my confidential photos and signature uploaded to any server?',
    answer:
      'No. Your privacy is 100% protected. All operations in this UPSC photo resizer happen locally inside your web browser memory. No photographs or signature files are ever transmitted, saved, or uploaded to any cloud server or database.',
  },
  {
    question: 'Can I resize photos and signatures on my Android or iPhone mobile browser?',
    answer:
      'Yes! The tool is mobile-first and fully compatible with mobile Safari (iOS) and Google Chrome (Android). You can select pictures directly from your phone gallery or camera, resize them to 413x531 or 140x60, and download the portal-ready JPEG immediately.',
  },
];

const howToSteps = [
  {
    name: 'Upload Your Photo or Signature',
    text: 'Tap or drag-and-drop your JPG, PNG, or WEBP image into the upload box on any smartphone, tablet, or desktop.',
  },
  {
    name: 'Choose UPSC Preset',
    text: 'Select "UPSC Photo" (413x531 px) or "UPSC Signature" (140x60 px). Dimensions and the 20KB-300KB constraint configure automatically.',
  },
  {
    name: 'Instant In-Browser Compression',
    text: 'The engine uses HTML5 Canvas to perform a center cover-crop without distortion and iteratively adjusts compression to land between 20KB and 300KB.',
  },
  {
    name: 'Download Exam-Ready JPEG',
    text: 'Inspect the live preview with exact width, height, and KB counters, then click "Download" to save your government portal-ready JPEG.',
  },
];

export default function HomePage() {
  const softwareSchema = generateSoftwareApplicationSchema({
    name: 'UPSC Photo Resizer 413x531 Pixels (20KB-300KB)',
    description:
      'Free, 100% client-side tool to resize and compress photos to 413x531 and signatures to 140x60 (20KB-300KB) for UPSC Civil Services, NDA, and CDS applications.',
    url: SITE_URL,
  });

  const howToSchema = generateHowToSchema({
    name: 'How to Resize and Compress UPSC Photo (413x531) and Signature (140x60)',
    description:
      'Complete guide to compress UPSC photo to 20KB-300KB and perform UPSC signature resize to 140x60 using in-browser Canvas processing.',
    steps: howToSteps,
  });

  const faqSchema = generateFAQSchema(upscFaqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Structured Data for Search Engine Rich Snippets */}
      <JsonLd schema={[softwareSchema, howToSchema, faqSchema, breadcrumbSchema]} />

      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12">
        {/* ========================================================= */}
        {/* ABOVE THE FOLD: TOOL CONTAINER (CLIENT COMPONENT)         */}
        {/* ========================================================= */}
        <section aria-label="UPSC Photo Resizer Tool" className="space-y-4">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/90 border border-orange-200 text-saffron-800 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
              <span>Official 2026 Examination Specifications</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Free • Private • No Server Upload • Works Offline on Mobile & PC
            </p>
          </div>

          {/* Privacy trust bar directly above tool */}
          <TrustBanner />

          {/* Primary Interactive Client Resizer Widget */}
          <ResizerWidget initialPresetId="upsc-photo" />
        </section>

        {/* ========================================================= */}
        {/* BELOW THE FOLD: SERVER-RENDERED SEO CONTENT               */}
        {/* ========================================================= */}

        {/* H1 Primary Header & Natural Introduction */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            UPSC Photo Resizer:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-500 via-orange-600 to-amber-600">
              413x531 Pixels & Signature Resize (20KB-300KB)
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Welcome to the dedicated <strong>UPSC photo resizer</strong> built specifically for Indian civil services aspirants. Whether you are applying for UPSC CSE (IAS, IPS, IFS), NDA, CDS, CMS, or Indian Forest Service, the official UPSC online application portal enforces rigorous biometric rules: your photograph must be exactly <strong>413x531</strong> pixels, and both your photo and signature must strictly remain within the <strong>20KB-300KB</strong> file size range.
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Unlike traditional editors that stretch your facial features or require you to upload personal identity documents to third-party cloud servers, our utility allows you to <strong>compress UPSC photo</strong> and carry out complete <strong>signature resize</strong> entirely within your local browser.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">Target Photo</span>
              <span className="font-mono font-bold text-saffron-700 text-sm sm:text-base">413 × 531 px</span>
            </div>
            <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">Target Signature</span>
              <span className="font-mono font-bold text-saffron-700 text-sm sm:text-base">140 × 60 px</span>
            </div>
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">File Size Range</span>
              <span className="font-bold text-[#138808] text-sm sm:text-base">20KB – 300KB</span>
            </div>
            <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">Privacy Guarantee</span>
              <span className="font-bold text-navy-600 text-sm sm:text-base">100% Local</span>
            </div>
          </div>
        </section>

        {/* Specifications Table (UPSC Photo and Signature) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Official UPSC Photo and Signature Specifications
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Cross-checked against the latest official UPSC Civil Services Examination (CSE) notification.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[540px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-800">
                  <th scope="col" className="py-3.5 px-4 font-bold">Requirement</th>
                  <th scope="col" className="py-3.5 px-4 font-bold">UPSC Photograph</th>
                  <th scope="col" className="py-3.5 px-4 font-bold">UPSC Signature</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">Target Dimensions</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-saffron-700">413 × 531 pixels</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-saffron-700">140 × 60 pixels</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">Official Permitted Range</td>
                  <td className="py-3.5 px-4">Min: 350×350 px | Max: 1000×1000 px</td>
                  <td className="py-3.5 px-4">Min: 350×350 px | Aspect ~7:3</td>
                </tr>
                <tr className="hover:bg-emerald-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">File Size Boundary</td>
                  <td className="py-3.5 px-4 font-bold text-[#138808]">20 KB to 300 KB</td>
                  <td className="py-3.5 px-4 font-bold text-[#138808]">20 KB to 300 KB</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">File Format</td>
                  <td className="py-3.5 px-4">JPG / JPEG only</td>
                  <td className="py-3.5 px-4">JPG / JPEG only</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">Background Color</td>
                  <td className="py-3.5 px-4">Plain white or light grey</td>
                  <td className="py-3.5 px-4">Plain white unruled paper</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">Facial Composition / Ink</td>
                  <td className="py-3.5 px-4">Face must cover 75% of photograph</td>
                  <td className="py-3.5 px-4">Black ink pen; no capital letters</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">Under-size Protection</td>
                  <td className="py-3.5 px-4">Iterative binary quality adjustment</td>
                  <td className="py-3.5 px-4 font-semibold text-blue-700">Auto-padded to &gt;20KB if needed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How-To Step-by-Step with Semantic <ol> */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-saffron-600">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                How to Compress UPSC Photo and Resize Signature
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Follow this simple 4-step workflow to prepare valid examination files in under 10 seconds.
              </p>
            </div>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 list-none counter-reset-step">
            {howToSteps.map((step, idx) => (
              <li
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-gray-50/80 border border-gray-200/70 hover:border-orange-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-saffron-500 to-amber-500 text-white font-bold text-sm flex items-center justify-center shadow-sm mb-3">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                    {step.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {step.text}
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-saffron-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Step {idx + 1} Verified</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Privacy Section */}
        <section className="bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-soft space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-[#138808]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                100% Client-Side Privacy: Why Zero Server Upload Matters
              </h2>
              <p className="text-xs text-gray-500">
                Engineered with high security standards for government exam candidates.
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-gray-700 space-y-2.5 leading-relaxed">
            <p>
              Your passport photo contains facial biometric identifiers, and your signature is a legal authentication mark. Generic online resizing websites often transmit your pictures to remote cloud servers where they may be cached, logged, or inadvertently exposed.
            </p>
            <p>
              This <strong>UPSC photo resizer</strong> executes entirely through the <strong>HTML5 Canvas API</strong> within your local browser sandbox. Once this webpage loads on your phone or computer, you can even disconnect your internet connection—the entire crop, <strong>signature resize</strong>, and <strong>20KB-300KB</strong> JPEG compression process will execute without sending a single byte over the web.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
              <Lock className="w-3.5 h-3.5 text-[#138808]" />
              Zero Remote Image Storage
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
              <Smartphone className="w-3.5 h-3.5 text-[#138808]" />
              Offline Capable on Android & iOS
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
              <FileCheck className="w-3.5 h-3.5 text-[#138808]" />
              Safe JPEG Header Padding
            </span>
          </div>
        </section>

        {/* Semantic FAQ Section with <details> and <summary> */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-[#138808]">
              <HelpCircle className="w-4 h-4 text-[#138808]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                Frequently Asked Questions (FAQs)
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Detailed answers to UPSC online application photo and signature guidelines.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {upscFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-gray-200 rounded-2xl bg-gray-50/70 p-4 transition-all duration-200 hover:border-orange-300 open:bg-white open:shadow-xs"
              >
                <summary className="flex items-center justify-between cursor-pointer font-bold text-sm sm:text-base text-gray-900 select-none list-none">
                  <span className="flex items-center gap-2 pr-2">
                    <span className="text-saffron-600 font-extrabold text-sm sm:text-base">Q:</span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0" />
                </summary>
                <div className="mt-3 pt-3 border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed pl-6">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Quick Links for Other Exam Resizers */}
        <section className="p-5 rounded-2xl bg-gray-100/80 border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <span className="font-semibold text-gray-700">
            Applying for other government exams? Use dedicated presets:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/resizer/ssc"
              className="inline-flex items-center gap-1 font-bold text-[#138808] hover:text-emerald-800 bg-white px-3 py-1.5 rounded-lg border border-gray-200 transition shadow-xs"
            >
              <span>SSC Photo Resizer (100x120)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/resizer/ibps"
              className="inline-flex items-center gap-1 font-bold text-navy-600 hover:text-navy-800 bg-white px-3 py-1.5 rounded-lg border border-gray-200 transition shadow-xs"
            >
              <span>IBPS Bank Resizer (200x230)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center gap-1 font-bold text-gray-700 hover:text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200 transition shadow-xs"
            >
              <span>Full Photo Rules Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
