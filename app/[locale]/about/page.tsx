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
import { ShieldCheck, Cpu, HeartHandshake, EyeOff, Lock } from 'lucide-react';

interface AboutPageProps {
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hi' }];
}

export function generateMetadata({ params }: AboutPageProps): Metadata {
  const isHindi = params.locale === 'hi';
  const pagePath = '/about';

  const title = isHindi
    ? 'हमारे बारे में – यूपीएससी फोटो रीसाइज़र | गोपनीयता-प्रथम मिशन'
    : 'About Us – UPSC Photo Resizer | Privacy-First Mission';

  const description = isHindi
    ? 'यूपीएससी फोटो रीसाइज़र एक मुफ़्त, विज्ञापन-मुक्त और गोपनीयता-प्रथम टूल है जिसे भारतीय सरकारी नौकरी के उम्मीदवारों की सुविधा के लिए बनाया गया है।'
    : 'UPSC Photo Resizer is an open-access, zero-server-upload photo utility created for Indian government job aspirants.';

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

export default function LocalizedAboutPage({ params }: AboutPageProps) {
  const locale: Language = params.locale === 'hi' ? 'hi' : 'en';
  if (params.locale !== 'en' && params.locale !== 'hi') {
    notFound();
  }

  const isHindi = locale === 'hi';
  const prefix = `/${locale}`;

  const breadcrumbs = generateBreadcrumbSchema([
    { name: isHindi ? 'होम' : 'Home', url: prefix },
    { name: isHindi ? 'हमारे बारे में' : 'About Us', url: `${prefix}/about` },
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
          <span className="text-gray-900 font-semibold">{isHindi ? 'हमारे बारे में' : 'About'}</span>
        </nav>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-saffron-700 text-xs font-bold uppercase">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{isHindi ? 'हमारा मिशन' : 'Our Mission'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {isHindi
              ? 'उम्मीदवारों के लिए सुरक्षित और सटीक फोटो रीसाइज़र'
              : 'Built for Aspirants: Fast, Accurate & 100% Private'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {isHindi
              ? 'हर साल लाखों छात्र UPSC, SSC, IBPS और State PSC फॉर्म भरते हैं। कई उम्मीदवार अपने व्यक्तिगत दस्तावेज़ और तस्वीरें असुरक्षित साइबर कैफे या संदिग्ध क्लाउड सर्वर पर अपलोड करने के लिए मजबूर होते हैं। हमने इस समस्या को पूरी तरह हल करने के लिए यह टूल बनाया है।'
              : 'Every year, millions of Indian aspirants fill competitive examination forms. Many are forced to upload personal photos and signatures to unsecured third-party servers. We created this tool to eliminate data privacy risks entirely.'}
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#138808]">
              <EyeOff className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-900">
              {isHindi ? 'शून्य सर्वर अपलोड' : 'Zero Server Uploads'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isHindi
                ? 'सभी गणनाएँ आपके वेब ब्राउज़र (HTML5 Canvas) में स्थानीय रूप से निष्पादित होती हैं। आपकी तस्वीरें कभी भी आपके फोन या कंप्यूटर से बाहर नहीं जातीं।'
                : 'All processing runs 100% locally in your browser memory. Your images and signatures never leave your device.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-saffron-100 flex items-center justify-center text-saffron-600">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-900">
              {isHindi ? 'सटीक पिक्सेल व KB' : 'Exact Pixels & KB'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isHindi
                ? 'स्मार्ट बाइनरी सर्च कम्प्रेशन और मानक JPEG COM पैडिंग द्वारा 20KB से 300KB की सटीक फाइल सीमा सुनिश्चित की जाती है।'
                : 'Intelligent iterative compression algorithms ensure your photos hit official dimension and kilobyte requirements without blurring.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-navy-100 flex items-center justify-center text-navy-700">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-900">
              {isHindi ? 'हमेशा मुफ़्त' : 'Free Forever'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isHindi
                ? 'कोई छुपा हुआ शुल्क नहीं, कोई लॉगिन या ईमेल पंजीकरण आवश्यक नहीं है। यह हमेशा छात्रों के लिए खुला और मुफ़्त रहेगा।'
                : 'No hidden paywalls, no watermark additions, and no sign-up required. Free for all competitive exam aspirants.'}
            </p>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-4">
          <div className="flex items-center gap-2 text-[#138808]">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              {isHindi ? 'तकनीकी वास्तुकला और सुरक्षा' : 'Technical Architecture & Security'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {isHindi
              ? 'यह वेबसाइट Next.js स्टैटिक एक्सपोर्ट के माध्यम से चलती है और केवल क्लाइंट-साइड जावास्क्रिप्ट लाइब्रेरीज़ का उपयोग करती है। किसी भी बैकएंड डेटाबेस या स्टोरेज बकेट से कोई संबंध नहीं है।'
              : 'Our utility leverages client-side Web APIs including Offscreen Canvas, File API, and typed binary buffers. No cloud database or storage bucket exists to collect your personal images.'}
          </p>
        </section>
      </main>

      <Footer lang={locale} />
    </div>
  );
}
