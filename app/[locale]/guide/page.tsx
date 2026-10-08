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
  generateHowToSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Camera,
  PenTool,
  ArrowRight,
} from 'lucide-react';

interface GuidePageProps {
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hi' }];
}

export function generateMetadata({ params }: GuidePageProps): Metadata {
  const isHindi = params.locale === 'hi';
  const pagePath = '/guide';

  const title = isHindi
    ? 'सरकारी परीक्षा फोटो और हस्ताक्षर दिशानिर्देश 2026 – पूर्ण गाइड'
    : 'Complete Guide: Photo & Signature Rules for Indian Govt Exams 2026';

  const description = isHindi
    ? 'UPSC, SSC, IBPS और राज्य सेवा परीक्षाओं के लिए फोटो और हस्ताक्षर के सभी आधिकारिक नियम, आयाम, फाइल साइज और अस्वीकृति से बचने के उपाय।'
    : 'Comprehensive guide on photograph and signature specifications for UPSC, SSC, IBPS, NDA, and State PSC exams. Learn dimension limits, KB restrictions, and rejection reasons.';

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

const guideFaqsEn = [
  {
    question: 'Why do government portals reject photos with spectacles or caps?',
    answer:
      'Glasses frequently reflect camera flashes and obscure the iris pattern, which hinders biometric and facial recognition systems during exam hall entry. Caps and scarves cast shadows over facial contours.',
  },
  {
    question: 'How recent should the passport photo be for UPSC or SSC?',
    answer:
      'Most notifications mandate that the photograph must not be older than 10 days to 3 months from the date of online application submission.',
  },
  {
    question: 'Can I take the exam photo with my phone camera?',
    answer:
      'Yes, as long as you take it in good daytime lighting against a plain white wall or background, avoid selfies (use a friend or tripod to avoid facial distortion), and keep a straight frontal face without tilting.',
  },
];

const guideFaqsHi = [
  {
    question: 'सरकारी पोर्टल चश्मे या टोपी वाली फोटो क्यों अस्वीकार करते हैं?',
    answer:
      'चश्मा कैमरे की फ्लैश लाइट को परावर्तित करता है जिससे आंखों की पुतली और चेहरा स्पष्ट नहीं दिखता। बायोमेट्रिक और फेशियल रिकॉग्निशन में समस्या के कारण चश्मा और टोपी प्रतिबंधित हैं।',
  },
  {
    question: 'UPSC या SSC के लिए फोटो कितनी हालिया होनी चाहिए?',
    answer:
      'अधिकांश आधिकारिक अधिसूचनाओं के अनुसार फोटो आवेदन पत्र भरने की तारीख से 10 दिन से 3 महीने से अधिक पुरानी नहीं होनी चाहिए।',
  },
  {
    question: 'क्या मैं अपने मोबाइल फोन से परीक्षा के लिए फोटो खींच सकता हूँ?',
    answer:
      'हाँ, यदि आप सादे सफेद बैकग्राउंड के सामने अच्छी रोशनी में सामने से फोटो खींचते हैं। सेल्फी लेने से बचें क्योंकि उससे चेहरा खिंचा हुआ दिखता है।',
  },
];

export default function LocalizedGuidePage({ params }: GuidePageProps) {
  const locale: Language = params.locale === 'hi' ? 'hi' : 'en';
  if (params.locale !== 'en' && params.locale !== 'hi') {
    notFound();
  }

  const isHindi = locale === 'hi';
  const prefix = `/${locale}`;

  const howToSchema = generateHowToSchema({
    name: isHindi
      ? 'घर पर परीक्षा के अनुकूल पासपोर्ट फोटो कैसे तैयार करें'
      : 'How to Take and Prepare an Exam-Compliant Passport Photo at Home',
    description: isHindi
      ? 'UPSC और सरकारी परीक्षाओं के लिए फोटो और हस्ताक्षर तैयार करने के सरल नियम।'
      : 'Simple steps to click, edit, and compress government exam photos to meet UPSC, SSC, and Banking specifications.',
  });

  const faqSchema = generateFAQSchema(isHindi ? guideFaqsHi : guideFaqsEn);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isHindi ? 'होम' : 'Home', url: prefix },
    { name: isHindi ? 'फोटो दिशानिर्देश' : 'Exam Photo Guide', url: `${prefix}/guide` },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd schema={[howToSchema, faqSchema, breadcrumbSchema]} />
      <Navbar currentLang={locale} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-500 flex items-center gap-2">
          <Link href={prefix} className="hover:text-saffron-600 transition">
            {isHindi ? 'होम' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{isHindi ? 'परीक्षा फोटो दिशानिर्देश' : 'Exam Photo Guide'}</span>
        </nav>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-navy-700 text-xs font-bold uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isHindi ? 'उम्मीदवार ज्ञान केंद्र' : 'Candidate Knowledge Base'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {isHindi
              ? 'भारतीय सरकारी परीक्षाओं हेतु फोटो और हस्ताक्षर के आधिकारिक नियम (2026)'
              : 'Official Photo & Signature Guidelines for Indian Govt Exams (2026)'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {isHindi
              ? 'हर साल हजारों आवेदन केवल गलत आकार, धुंधली फोटो या गलत हस्ताक्षर के कारण खारिज हो जाते हैं। पहली ही बार में सफल सत्यापन के लिए यह आवश्यक चेकलिस्ट देखें।'
              : 'Every year, thousands of candidate applications are disqualified due to blurry photos, wrong dimensions, or unreadable signatures. Here is your definitive checklist to pass portal verification on the first try.'}
          </p>
        </div>

        {/* Section 1 */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-5">
          <div className="flex items-center gap-2 text-saffron-600">
            <Camera className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              {isHindi ? '1. फोटो आवश्यकता चेकलिस्ट' : '1. Photograph Requirements Checklist'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-xs font-bold uppercase text-emerald-800 flex items-center gap-1 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#138808]" />
                {isHindi ? 'क्या करें (स्वीकृत)' : "Do's (Approved)"}
              </span>
              <ul className="text-xs text-gray-700 space-y-2 list-disc list-inside">
                <li>{isHindi ? 'सादा सफेद या हल्का बैकग्राउंड।' : 'Plain white, off-white, or light grey background.'}</li>
                <li>{isHindi ? 'दोनों कान साफ दिखाई दें, आंखें खुली हों।' : 'Clear frontal pose with both ears visible and eyes open.'}</li>
                <li>{isHindi ? 'चेहरा फ्रेम के 70% से 75% हिस्से को कवर करे।' : 'Face covering 70% to 75% of the total frame.'}</li>
                <li>{isHindi ? 'चेहरे पर परछाई या छाया न हो।' : 'Uniform natural lighting without harsh facial shadows.'}</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200">
              <span className="text-xs font-bold uppercase text-red-800 flex items-center gap-1 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                {isHindi ? 'क्या न करें (अस्वीकृत)' : "Don'ts (Auto-Rejected)"}
              </span>
              <ul className="text-xs text-gray-700 space-y-2 list-disc list-inside">
                <li>{isHindi ? 'काला चश्मा या नजर का चश्मा न लगाएं।' : 'No dark glasses, goggles, or tinted lenses.'}</li>
                <li>{isHindi ? 'टोपी या मफलर से सिर न ढकें।' : 'No caps, hats, or headwear (unless religious turban).'}</li>
                <li>{isHindi ? 'सेल्फी या साइड-एंगल फोटो न लें।' : 'No tilted self-portraits (selfies) with fish-eye distortions.'}</li>
                <li>{isHindi ? 'फोटो पर कोई वॉटरमार्क या फिल्टर न लगाएं।' : 'No stamps, watermarks, or software filters.'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-5">
          <div className="flex items-center gap-2 text-navy-600">
            <PenTool className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              {isHindi ? '2. हस्ताक्षर अपलोड के नियम' : '2. Signature Upload Standards'}
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <p>
              {isHindi
                ? 'उम्मीदवारों को सादे सफेद अनरुल्ड कागज पर काली स्याही के पेन से हस्ताक्षर करने चाहिए।'
                : 'Candidates must sign on unruled plain white paper using a black ink ballpoint or gel pen.'}
            </p>
            <p>
              {isHindi
                ? 'महत्वपूर्ण: सभी बड़े अक्षरों (CAPITAL LETTERS) में हस्ताक्षर कभी न करें। सामान्य हस्तलिपि में ही हस्ताक्षर मान्य हैं।'
                : 'Important: Never sign in all block or capital letters. Portals categorically disqualify applications signed in capital letters.'}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="p-6 rounded-3xl bg-gradient-to-r from-saffron-500 to-amber-600 text-white shadow-lg space-y-4">
          <h2 className="text-lg sm:text-xl font-bold">
            {isHindi ? 'क्या आप फोटो और हस्ताक्षर रीसाइज़ करने के लिए तैयार हैं?' : 'Ready to resize your photo & signature now?'}
          </h2>
          <p className="text-xs sm:text-sm text-white/90">
            {isHindi
              ? 'हमारे 100% सुरक्षित और मुफ्त इन-ब्राउज़र टूल का उपयोग करें।'
              : 'Use our 100% private in-browser resizer. No registration or file upload required.'}
          </p>
          <div className="pt-2">
            <Link
              href={prefix}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-900 text-xs sm:text-sm font-bold shadow hover:bg-gray-100 transition"
            >
              <span>{isHindi ? 'मुफ्त रीसाइज़र टूल खोलें' : 'Launch Free Resizer Tool'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {isHindi ? 'सामान्य प्रश्न' : 'Common Candidate Inquiries'}
          </h2>
          <div className="space-y-3">
            {(isHindi ? guideFaqsHi : guideFaqsEn).map((faq, idx) => (
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

      <Footer lang={locale} />
    </div>
  );
}
