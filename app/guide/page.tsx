import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import {
  SITE_URL,
  getAlternateLanguages,
  generateHowToSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Camera,
  PenTool,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Complete Guide: Photo & Signature Rules for Indian Govt Exams 2026',
  description:
    'Comprehensive guide on photograph and signature specifications for UPSC, SSC, IBPS, NDA, and State PSC exams. Learn dimension limits, KB restrictions, and rejection reasons.',
  alternates: {
    canonical: '/en/guide',
    languages: getAlternateLanguages('/guide'),
  },
  openGraph: {
    title: 'Complete Guide: Photo & Signature Rules for Indian Govt Exams 2026',
    description:
      'Everything you need to know about photo dimensions, background color, aspect ratios, and file sizes for Indian competitive exams.',
    url: `${SITE_URL}/guide`,
  },
};

const guideFaqs = [
  {
    question: 'Why do government portals reject photos with spectacles or caps?',
    answer:
      'Glasses frequently reflect camera flashes and obscure the iris pattern, which hinders biometric and facial recognition systems during exam hall entry. Caps and scarves cast shadows over facial contours.',
  },
  {
    question: 'How recent should the passport photo be for UPSC or SSC?',
    answer:
      'Most notifications mandate that the photograph must not be older than 10 days from the date of the online application submission, with the candidate’s name and date of photo printed at the bottom if requested.',
  },
  {
    question: 'Can I take the exam photo with my phone camera?',
    answer:
      'Yes, as long as you take it in good daytime lighting against a plain white wall or background, avoid selfies (use a friend or tripod to avoid facial distortion), and keep a straight frontal face without tilting.',
  },
];

export default function GuidePage() {
  const howToSchema = generateHowToSchema({
    name: 'How to Take and Prepare an Exam-Compliant Passport Photo at Home',
    description:
      'Simple steps to click, edit, and compress government exam photos to meet UPSC, SSC, and Banking specifications.',
  });

  const faqSchema = generateFAQSchema(guideFaqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Exam Photo Guide', url: '/guide' },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd schema={[howToSchema, faqSchema, breadcrumbSchema]} />
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-saffron-600 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Exam Photo Guide</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-navy-700 text-xs font-bold uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Candidate Knowledge Base</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Official Photo & Signature Guidelines for Indian Govt Exams (2026)
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Every year, thousands of candidate applications are disqualified due to blurry photos, wrong dimensions, or unreadable signatures. Here is your definitive checklist to pass portal verification on the first try.
          </p>
        </div>

        {/* Section 1: Photograph rules */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-5">
          <div className="flex items-center gap-2 text-saffron-600">
            <Camera className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              1. Photograph Requirements Checklist
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-xs font-bold uppercase text-emerald-800 flex items-center gap-1 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#138808]" />
                Do&rsquo;s (Approved)
              </span>
              <ul className="text-xs text-gray-700 space-y-2 list-disc list-inside">
                <li>Plain white, off-white, or light grey background.</li>
                <li>Clear frontal pose with both ears visible and eyes open.</li>
                <li>Face covering 70% to 75% of the total frame.</li>
                <li>Uniform natural lighting without harsh facial shadows.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200">
              <span className="text-xs font-bold uppercase text-red-800 flex items-center gap-1 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Don&rsquo;ts (Auto-Rejected)
              </span>
              <ul className="text-xs text-gray-700 space-y-2 list-disc list-inside">
                <li>No dark glasses, goggles, or tinted lenses.</li>
                <li>No caps, hats, or headwear (unless religious turban).</li>
                <li>No tilted self-portraits (selfies) with fish-eye distortions.</li>
                <li>No stamps, watermarks, or software filters.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Signature rules */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-5">
          <div className="flex items-center gap-2 text-navy-600">
            <PenTool className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              2. Signature Upload Standards
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <p>
              Candidates must sign on unruled plain white paper using a <strong>black ink ballpoint or gel pen</strong>. Signatures in blue or red ink are often disapproved by scanning OCR readers.
            </p>
            <p>
              <strong>Important:</strong> Never sign in all block or capital letters (e.g. &ldquo;RAHUL SHARMA&rdquo;). Portals such as IBPS and SSC categorically disqualify applications signed in capital letters. Sign in your genuine, everyday running handwriting.
            </p>
          </div>
        </section>

        {/* Section 3: Tools CTA */}
        <section className="p-6 rounded-3xl bg-gradient-to-r from-saffron-500 to-amber-600 text-white shadow-lg space-y-4">
          <h2 className="text-lg sm:text-xl font-bold">
            Ready to resize your photo & signature now?
          </h2>
          <p className="text-xs sm:text-sm text-white/90">
            Use our 100% private in-browser resizer. No registration or file upload required.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-900 text-xs sm:text-sm font-bold shadow hover:bg-gray-100 transition"
            >
              <span>Launch Free Resizer Tool</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Section 4: FAQs */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Common Candidate Inquiries
          </h2>
          <div className="space-y-3">
            {guideFaqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
                <h3 className="font-bold text-sm text-gray-900 mb-1">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
