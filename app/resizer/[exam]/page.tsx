import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
  getAllExamSlugs,
  getExamConfig,
  getOtherExams,
} from '@/lib/examConfig';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronDown,
  HelpCircle,
  FileCheck,
  Lock,
  Smartphone,
  Check,
  AlertTriangle,
} from 'lucide-react';

interface ExamPageProps {
  params: {
    exam: string;
  };
}

export function generateStaticParams() {
  return getAllExamSlugs().map((slug) => ({
    exam: slug,
  }));
}

export function generateMetadata({ params }: ExamPageProps): Metadata {
  const config = getExamConfig(params.exam);
  if (!config) {
    return {
      title: 'Exam Photo & Signature Resizer',
    };
  }

  const l = config.locales.en;
  const pageUrl = `${SITE_URL}/resizer/${config.slug}`;

  return {
    title: {
      absolute: l.title,
    },
    description: l.description,
    keywords: l.keywords,
    alternates: {
      canonical: `/en/resizer/${config.slug}`,
      languages: getAlternateLanguages(`/resizer/${config.slug}`),
    },
    openGraph: {
      title: l.title,
      description: l.description,
      url: pageUrl,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${l.name} Photo and Signature Resizer`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: l.title,
      description: l.description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default function ExamResizerPage({ params }: ExamPageProps) {
  const config = getExamConfig(params.exam);
  if (!config) {
    notFound();
  }

  const l = config.locales.en;
  const otherExams = getOtherExams(config.slug);

  // Generate Schemas for Search Engines
  const softwareSchema = generateSoftwareApplicationSchema({
    name: l.title,
    description: l.description,
    url: `${SITE_URL}/resizer/${config.slug}`,
  });

  const howToSchema = generateHowToSchema({
    name: `How to Resize Photo & Signature for ${l.shortName}`,
    description: `Complete step-by-step instructions to format photo and signature for ${l.name} online portal.`,
    steps: l.howToSteps,
  });

  const faqSchema = generateFAQSchema(l.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: `${l.shortName} Resizer`, url: `/resizer/${config.slug}` },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Structured Data for Google Rich Snippets */}
      <JsonLd schema={[softwareSchema, howToSchema, faqSchema, breadcrumbSchema]} />

      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-saffron-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/guide" className="hover:text-saffron-600 transition">
            Exams
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{l.shortName} Photo Resizer</span>
        </nav>

        {/* ========================================================= */}
        {/* ABOVE THE FOLD: TOOL CONTAINER (CLIENT COMPONENT)         */}
        {/* ========================================================= */}
        <section aria-label={`${l.shortName} Photo Resizer Tool`} className="space-y-4">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/90 border border-orange-200 text-saffron-800 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
              <span>Official {l.officialOrg} Specifications</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Target: Photo ({config.photoWidth}x{config.photoHeight} px, {l.photoKb}) • Signature ({config.sigWidth}x{config.sigHeight} px, {l.sigKb})
            </p>
          </div>

          {/* Privacy trust bar directly above tool */}
          <TrustBanner />

          {/* Primary Interactive Client Resizer Widget */}
          <ResizerWidget initialPresetId={config.defaultPresetId} />
        </section>

        {/* ========================================================= */}
        {/* BELOW THE FOLD: SERVER-RENDERED SEO CONTENT               */}
        {/* ========================================================= */}

        {/* H1 Primary Header & Natural Introduction */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {l.shortName} Photo Resizer:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-500 via-orange-600 to-amber-600">
              {config.photoWidth}x{config.photoHeight} Pixels & Signature Resize ({l.photoKb})
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Welcome to the dedicated online tool for <strong>{l.name}</strong> candidates. The {l.officialOrg} mandates strict image dimensions and file size validation during registration. Uploading pictures outside the official boundaries (Photo: <strong>{l.photoDims}</strong>, <strong>{l.photoKb}</strong>; Signature: <strong>{l.sigDims}</strong>, <strong>{l.sigKb}</strong>) triggers automatic rejection by the portal upload validator.
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Our tool uses high-precision HTML5 Canvas processing to crop and compress your images directly on your device. Zero bytes leave your browser, ensuring total biometric security.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">Target Photo</span>
              <span className="font-mono font-bold text-saffron-700 text-sm sm:text-base">
                {config.photoWidth} × {config.photoHeight} px
              </span>
            </div>
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">Photo File Size</span>
              <span className="font-bold text-[#138808] text-sm sm:text-base">
                {l.photoKb}
              </span>
            </div>
            <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">Target Signature</span>
              <span className="font-mono font-bold text-saffron-700 text-sm sm:text-base">
                {config.sigWidth} × {config.sigHeight} px
              </span>
            </div>
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">Signature File Size</span>
              <span className="font-bold text-[#138808] text-sm sm:text-base">
                {l.sigKb}
              </span>
            </div>
          </div>
        </section>

        {/* Specifications Table */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Official {l.shortName} Photo and Signature Specifications Table
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Verified criteria according to the latest {l.officialOrg} recruitment notification.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[540px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-800">
                  <th scope="col" className="py-3.5 px-4 font-bold">Requirement</th>
                  <th scope="col" className="py-3.5 px-4 font-bold">{l.shortName} Photograph</th>
                  <th scope="col" className="py-3.5 px-4 font-bold">{l.shortName} Signature</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">Dimensions (Width × Height)</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-saffron-700">{l.photoDims}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-saffron-700">{l.sigDims}</td>
                </tr>
                <tr className="hover:bg-emerald-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">File Size Range</td>
                  <td className="py-3.5 px-4 font-bold text-[#138808]">{l.photoKb}</td>
                  <td className="py-3.5 px-4 font-bold text-[#138808]">{l.sigKb}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">Format</td>
                  <td className="py-3.5 px-4">{config.format}</td>
                  <td className="py-3.5 px-4">{config.format}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">Background</td>
                  <td className="py-3.5 px-4">{l.specialRequirements.background}</td>
                  <td className="py-3.5 px-4">White unruled paper</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">Face Coverage / Ink</td>
                  <td className="py-3.5 px-4">{l.specialRequirements.faceCoverage}</td>
                  <td className="py-3.5 px-4">{l.specialRequirements.signatureRules}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">Spectacles & Headwear</td>
                  <td className="py-3.5 px-4">{l.specialRequirements.clothingGlasses}</td>
                  <td className="py-3.5 px-4">Clear signature without smudges</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">Recency / Date Printing</td>
                  <td className="py-3.5 px-4">{l.specialRequirements.photoDateRules}</td>
                  <td className="py-3.5 px-4">Current handwritten signature</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">Other Mandates</td>
                  <td className="py-3.5 px-4">{l.specialRequirements.otherNotes}</td>
                  <td className="py-3.5 px-4">Must not be cropped too tightly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips Section */}
        <section className="bg-amber-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-soft space-y-4">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-base sm:text-lg">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Important Tips to Prevent {l.shortName} Portal Rejection</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {l.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 bg-white/80 p-3 rounded-xl border border-amber-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
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
                How to Resize Photo & Signature for {l.shortName} in 4 Steps
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Quick guide to prepare upload-ready files for your {l.name} registration.
              </p>
            </div>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 list-none">
            {l.howToSteps.map((step, idx) => (
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
                  <span>Step {idx + 1} Complete</span>
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
                Safe & Private Resizing for {l.shortName} Candidates
              </h2>
              <p className="text-xs text-gray-500">
                Zero server uploads. Your personal biometric photo and legal signature never leave your device.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
              <Lock className="w-3.5 h-3.5 text-[#138808]" />
              Zero Remote Image Storage
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
              <Smartphone className="w-3.5 h-3.5 text-[#138808]" />
              Works on Android & iPhone
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
              <FileCheck className="w-3.5 h-3.5 text-[#138808]" />
              Official Size Guarantees
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
                {l.shortName} Photo & Signature FAQs
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Frequently asked questions regarding {l.shortName} upload specifications and common errors.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {l.faqs.map((faq, idx) => (
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

        {/* Cross-linking to Other Exams */}
        {otherExams.length > 0 && (
          <section className="p-5 rounded-2xl bg-gray-100/80 border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <span className="font-semibold text-gray-700">
              Also applying for other government examinations?
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {otherExams.map((other) => (
                <Link
                  key={other.slug}
                  href={`/resizer/${other.slug}`}
                  className="inline-flex items-center gap-1 font-bold text-gray-800 hover:text-saffron-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200 transition shadow-xs"
                >
                  <span>{other.content.shortName} Resizer ({other.config.photoWidth}x{other.config.photoHeight})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
