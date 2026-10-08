import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, getAlternateLanguages, generateBreadcrumbSchema } from '@/lib/seo';
import { ShieldCheck, Lock, EyeOff, ServerOff } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | 100% Client-Side Zero Data Collection',
  description:
    'Our strict privacy commitment: We never upload, collect, store, or transmit your photos or signatures. All image processing executes strictly inside your local browser.',
  alternates: {
    canonical: '/en/privacy',
    languages: getAlternateLanguages('/privacy'),
  },
};

export default function PrivacyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy' },
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
          <span className="text-gray-900 font-semibold">Privacy Policy</span>
        </nav>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-[#138808]" />
            <span>Guaranteed Zero Upload Architecture</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-500">
            Last Updated: October 2026
          </p>
        </div>

        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium space-y-1">
            <p className="font-bold text-sm text-[#138808]">
              The Short Version:
            </p>
            <p>
              Your images, personal photographs, and signatures are <strong>NEVER</strong> sent to our servers, third-party clouds, or any remote computers. Everything is handled locally by your web browser.
            </p>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              1. How Client-Side Processing Works
            </h2>
            <p>
              When you drop or select a file in this application, your web browser reads the file from your local disk or phone storage into memory using the native HTML5 File and Canvas APIs. The image resizing, center-cropping, and iterative JPEG compression happen strictly within your CPU/GPU hardware on your device.
            </p>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              2. Data We Do NOT Collect
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-gray-600">
              <li>No uploaded photographs, faces, or biological data</li>
              <li>No handwritten signature specimens</li>
              <li>No names, application numbers, or exam registration credentials</li>
              <li>No personally identifiable contact details or emails</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              3. Cookies and Analytics
            </h2>
            <p>
              We do not use invasive tracking cookies or commercial user fingerprinting. Any aggregated traffic metrics are anonymous and used solely to ensure web server uptime.
            </p>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              4. Offline Capability
            </h2>
            <p>
              Once the web page has loaded in your browser, you can even disconnect your internet Wi-Fi or mobile data — the image resizing and compression will continue to function normally.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
