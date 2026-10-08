import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, getAlternateLanguages, generateBreadcrumbSchema } from '@/lib/seo';
import { ShieldCheck, Heart, Zap, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About UPSC Photo Resizer | Built for Indian Exam Aspirants',
  description:
    'Learn about our mission to provide a free, completely private, zero-upload photo and signature preparation tool for Indian competitive exam candidates.',
  alternates: {
    canonical: '/en/about',
    languages: getAlternateLanguages('/about'),
  },
};

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd schema={breadcrumbSchema} />
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-saffron-600 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">About</span>
        </nav>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            About UPSC Photo & Signature Resizer
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Empowering millions of Indian civil service and competitive exam aspirants with free, private, and instant image preparation utilities.
          </p>
        </div>

        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            Why We Built This Tool
          </h2>
          <p>
            Applying for government examinations in India (UPSC CSE, NDA, CDS, SSC CGL, IBPS PO, RRB NTPC) can be stressful. Beyond intense study, candidates must grapple with strict, archaic image upload requirements: exact pixel bounds (e.g., 413x531 px) and stringent file size thresholds (20 KB - 300 KB).
          </p>
          <p>
            Existing online resizing tools often require candidates to upload their sensitive personal photographs and signature specimens to unknown third-party cloud servers. This exposes applicants to data leakage, identity theft, and spam.
          </p>
          <p>
            We created <strong>UPSC Photo & Signature Resizer</strong> as a <strong>100% client-side tool</strong>. All operations occur directly in your browser memory via modern HTML5 Canvas and WebAssembly. Your files never touch any remote server.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-soft text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-100 flex items-center justify-center text-[#138808]">
              <ShieldCheck className="w-5 h-5 text-[#138808]" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">100% Private</h3>
            <p className="text-xs text-gray-500">
              Zero images leave your device. All processing happens in local browser memory.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-soft text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-orange-100 flex items-center justify-center text-saffron-600">
              <Zap className="w-5 h-5 text-saffron-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Sub-second Speed</h3>
            <p className="text-xs text-gray-500">
              No network upload delay. Instant crop, auto-aspect-ratio, and JPEG compression.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-soft text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-100 flex items-center justify-center text-navy-600">
              <Heart className="w-5 h-5 text-navy-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">100% Free</h3>
            <p className="text-xs text-gray-500">
              No paywalls, no subscriptions, and no intrusive watermarks ever applied.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
