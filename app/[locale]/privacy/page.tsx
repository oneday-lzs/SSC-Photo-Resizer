import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Language } from '@/lib/types';
import {
  SITE_URL,
  getAlternateLanguages,
  generateBreadcrumbSchema,
} from '@/lib/seo';
import { ShieldAlert, CheckCircle, Database, Server, Cookie } from 'lucide-react';

interface PrivacyPageProps {
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hi' }];
}

export function generateMetadata({ params }: PrivacyPageProps): Metadata {
  const isHindi = params.locale === 'hi';
  const pagePath = '/privacy';

  const title = isHindi
    ? 'गोपनीयता नीति – यूपीएससी फोटो रीसाइज़र | 100% ऑन-डिवाइस प्रोसेसिंग'
    : 'Privacy Policy – UPSC Photo Resizer | 100% On-Device Processing';

  const description = isHindi
    ? 'हमारी गोपनीयता नीति: हम आपकी कोई भी फोटो, हस्ताक्षर या व्यक्तिगत डेटा किसी भी सर्वर पर अपलोड या संग्रहीत नहीं करते हैं।'
    : 'Read our zero-upload privacy commitment. Photos and signatures are processed exclusively in client-side browser memory.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: `/${params.locale}${pagePath}`,
      languages: getAlternateLanguages(pagePath),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}${pagePath}`,
      type: 'website',
    },
  };
}

export default function LocalizedPrivacyPage({ params }: PrivacyPageProps) {
  const locale: Language = params.locale === 'hi' ? 'hi' : 'en';
  if (params.locale !== 'en' && params.locale !== 'hi') {
    notFound();
  }

  const isHindi = locale === 'hi';
  const prefix = `/${locale}`;

  const breadcrumbs = generateBreadcrumbSchema([
    { name: isHindi ? 'होम' : 'Home', url: prefix },
    { name: isHindi ? 'गोपनीयता नीति' : 'Privacy Policy', url: `${prefix}/privacy` },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd schema={breadcrumbs} />
      <Navbar currentLang={locale} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-500 flex items-center gap-2">
          <Link href={prefix} className="hover:text-saffron-600 transition">
            {isHindi ? 'होम' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{isHindi ? 'गोपनीयता नीति' : 'Privacy Policy'}</span>
        </nav>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
            <CheckCircle className="w-3.5 h-3.5 text-[#138808]" />
            <span>{isHindi ? 'शून्य-डेटा संकलन' : 'Zero-Data Collection'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {isHindi ? 'गोपनीयता नीति' : 'Privacy Policy'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            {isHindi ? 'अंतिम अद्यतन: 2026' : 'Last Updated: 2026'}
          </p>
        </div>

        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-6">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <Server className="w-5 h-5 text-saffron-600" />
              <span>{isHindi ? '1. कोई सर्वर अपलोड नहीं (No Server Uploads)' : '1. No Server Uploads'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isHindi
                ? 'जब आप इस वेबसाइट पर कोई भी फोटो या हस्ताक्षर चुनते हैं, तो वह फ़ाइल आपके ब्राउज़र की मेमोरी (RAM) में ही प्रोसेस होती है। फ़ाइल का कोई भी बाइट किसी रिमोट सर्वर, क्लाउड या तीसरे पक्ष को नहीं भेजा जाता है।'
                : 'When you select an image or signature file on this website, it is processed entirely within your device browser using the HTML5 Canvas API and JavaScript File APIs. Not a single byte is transmitted to any remote server or third party.'}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-navy-600" />
              <span>{isHindi ? '2. कोई डेटाबेस या लॉगिंग नहीं' : '2. No Database or Logs'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isHindi
                ? 'हम आपका नाम, ईमेल, आईपी पता या कोई अन्य व्यक्तिगत विवरण रिकॉर्ड या संग्रहीत नहीं करते हैं। जैसे ही आप ब्राउज़र टैब बंद करते हैं, संसाधित डेटा पूरी तरह मिट जाता है।'
                : 'We do not maintain user databases, nor do we log or store your photos, signatures, or metadata. Once you close or refresh your browser tab, all session memory is automatically cleared.'}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-amber-600" />
              <span>{isHindi ? '3. कुकीज़ और ट्रैकिंग' : '3. Cookies & Tracking'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isHindi
                ? 'हम विज्ञापन ट्रैकिंग कुकीज़ का उपयोग नहीं करते हैं। हम केवल गुमनाम बुनियादी पृष्ठ विज़िट गणना का उपयोग कर सकते हैं ताकि सेवा की उपलब्धता सुनिश्चित की जा सके।'
                : 'We do not deploy intrusive advertising cookies or behavioral trackers. Aggregated, anonymous page visit counts may be collected strictly for performance and hosting maintenance.'}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#138808]" />
              <span>{isHindi ? '4. सरकारी संबद्धता अस्वीकरण' : '4. Non-Affiliation Disclaimer'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isHindi
                ? 'UPSC Photo Resizer एक स्वतंत्र शैक्षिक व छात्र सहायता उपकरण है। यह संघ लोक सेवा आयोग (UPSC), कर्मचारी चयन आयोग (SSC) या भारत सरकार के किसी भी आधिकारिक निकाय से संबद्ध नहीं है।'
                : 'UPSC Photo Resizer is an independent candidate assistance utility. It is not affiliated with, endorsed by, or associated with the Union Public Service Commission (UPSC), Staff Selection Commission (SSC), or any official government body.'}
            </p>
          </div>
        </section>
      </main>

      <Footer lang={locale} />
    </div>
  );
}
