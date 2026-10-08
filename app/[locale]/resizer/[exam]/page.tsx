import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TrustBanner } from '@/components/TrustBanner';
import { ResizerWidget } from '@/components/ResizerWidget';
import { JsonLd } from '@/components/JsonLd';
import { Language } from '@/lib/types';
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
  getExamLocaleContent,
  getOtherExams,
  SUPPORTED_LOCALES,
} from '@/lib/examConfig';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronDown,
  HelpCircle,
  Check,
} from 'lucide-react';

interface LocalizedExamPageProps {
  params: {
    locale: string;
    exam: string;
  };
}

export function generateStaticParams() {
  const paramsList: Array<{ locale: string; exam: string }> = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const exam of getAllExamSlugs()) {
      paramsList.push({ locale, exam });
    }
  }
  return paramsList;
}

export function generateMetadata({ params }: LocalizedExamPageProps): Metadata {
  const locale: Language = params.locale === 'hi' ? 'hi' : 'en';
  const config = getExamConfig(params.exam);
  const content = getExamLocaleContent(params.exam, locale);

  if (!config || !content) {
    return {
      title: 'Exam Photo & Signature Resizer',
    };
  }

  const pagePath = `/resizer/${config.slug}`;
  const canonicalUrl = `${SITE_URL}/${locale}${pagePath}`;

  return {
    title: {
      absolute: content.title,
    },
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical: `/${locale}${pagePath}`,
      languages: getAlternateLanguages(pagePath),
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${content.name} Photo and Signature Resizer`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default function LocalizedExamResizerPage({ params }: LocalizedExamPageProps) {
  const locale: Language = params.locale === 'hi' ? 'hi' : 'en';
  if (params.locale !== 'en' && params.locale !== 'hi') {
    notFound();
  }

  const config = getExamConfig(params.exam);
  const content = getExamLocaleContent(params.exam, locale);

  if (!config || !content) {
    notFound();
  }

  const isHindi = locale === 'hi';
  const otherExams = getOtherExams(config.slug, locale);
  const prefix = `/${locale}`;

  // Structured Data
  const softwareSchema = generateSoftwareApplicationSchema({
    name: content.title,
    description: content.description,
    url: `${SITE_URL}/${locale}/resizer/${config.slug}`,
  });

  const howToSchema = generateHowToSchema({
    name: isHindi
      ? `${content.shortName} के लिए फोटो और हस्ताक्षर कैसे रीसाइज़ करें`
      : `How to Resize Photo & Signature for ${content.shortName}`,
    description: content.description,
    steps: content.howToSteps,
  });

  const faqSchema = generateFAQSchema(content.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isHindi ? 'होम' : 'Home', url: prefix },
    { name: `${content.shortName} Resizer`, url: `${prefix}/resizer/${config.slug}` },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd schema={[softwareSchema, howToSchema, faqSchema, breadcrumbSchema]} />

      <Navbar currentLang={locale} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-gray-500 flex items-center gap-2">
          <Link href={prefix} className="hover:text-saffron-600 transition">
            {isHindi ? 'होम' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{content.shortName} Photo Resizer</span>
        </nav>

        {/* ========================================================= */}
        {/* ABOVE THE FOLD: TOOL CONTAINER WITH PRESET                */}
        {/* ========================================================= */}
        <section aria-label={`${content.shortName} Photo Resizer Tool`} className="space-y-4">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/90 border border-orange-200 text-saffron-800 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
              <span>
                {isHindi
                  ? `${content.officialOrg} आधिकारिक विनिर्देश`
                  : `Official ${content.officialOrg} Specifications`}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {isHindi
                ? `लक्ष्य: फोटो (${config.photoWidth}x${config.photoHeight} px, ${content.photoKb}) • हस्ताक्षर (${config.sigWidth}x${config.sigHeight} px, ${content.sigKb})`
                : `Target: Photo (${config.photoWidth}x${config.photoHeight} px, ${content.photoKb}) • Signature (${config.sigWidth}x${config.sigHeight} px, ${content.sigKb})`}
            </p>
          </div>

          <TrustBanner lang={locale} />

          {/* Reusable Client Tool Component with active language and preset */}
          <ResizerWidget initialPresetId={config.defaultPresetId} initialLang={locale} />
        </section>

        {/* ========================================================= */}
        {/* BELOW THE FOLD: SERVER-RENDERED SEO CONTENT               */}
        {/* ========================================================= */}

        {/* H1 Primary Header & Comprehensive Introduction */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {content.shortName} Photo Resizer:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-500 via-orange-600 to-amber-600">
              {config.photoWidth}x{config.photoHeight} Pixels & Signature ({content.photoKb})
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {isHindi ? (
              <>
                <strong>{content.name}</strong> के उम्मीदवारों के लिए समर्पित ऑनलाइन फोटो व हस्ताक्षर तैयारी टूल में आपका स्वागत है। {content.officialOrg} पंजीकरण के दौरान छवियों के आयाम और फाइल साइज की सख्त जांच करता है। आधिकारिक सीमाओं (फोटो: <strong>{content.photoDims}</strong>, <strong>{content.photoKb}</strong>; हस्ताक्षर: <strong>{content.sigDims}</strong>, <strong>{content.sigKb}</strong>) से बाहर होने पर आवेदन अस्वीकार कर दिया जाता है।
              </>
            ) : (
              <>
                Welcome to the dedicated online tool for <strong>{content.name}</strong> candidates. The {content.officialOrg} mandates strict image dimensions and file size validation during registration. Uploading pictures outside the official boundaries (Photo: <strong>{content.photoDims}</strong>, <strong>{content.photoKb}</strong>; Signature: <strong>{content.sigDims}</strong>, <strong>{content.sigKb}</strong>) triggers automatic rejection by the portal upload validator.
              </>
            )}
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {isHindi ? (
              <>
                हमारा टूल <strong>100% आपके ब्राउज़र में स्थानीय रूप से काम करता है</strong>। बिना सर्वर पर अपलोड किए, HTML5 Canvas तकनीक चेहरे को खींचे बिना सही अनुपात में क्रॉप करती है और JPEG गुणवत्ता को निर्धारित सीमा में समायोजित करती है।
              </>
            ) : (
              <>
                Our tool operates <strong>100% locally in your browser</strong> without uploading your biometric photos or signature specimens to any cloud server. It uses HTML5 Canvas to crop images to the precise aspect ratio without facial stretching and intelligently adjusts JPEG compression to land within the official KB range.
              </>
            )}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">
                {isHindi ? 'फोटो आकार' : 'Photo Size'}
              </span>
              <span className="font-mono font-bold text-saffron-700 text-sm sm:text-base">
                {config.photoWidth} × {config.photoHeight} px
              </span>
            </div>
            <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">
                {isHindi ? 'फोटो सीमा' : 'Photo Limit'}
              </span>
              <span className="font-bold text-[#138808] text-sm sm:text-base">
                {content.photoKb}
              </span>
            </div>
            <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">
                {isHindi ? 'हस्ताक्षर आकार' : 'Signature Size'}
              </span>
              <span className="font-mono font-bold text-saffron-700 text-sm sm:text-base">
                {config.sigWidth} × {config.sigHeight} px
              </span>
            </div>
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">
                {isHindi ? 'हस्ताक्षर सीमा' : 'Signature Limit'}
              </span>
              <span className="font-bold text-[#138808] text-sm sm:text-base">
                {content.sigKb}
              </span>
            </div>
          </div>
        </section>

        {/* Detailed Criteria Table */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              {isHindi
                ? `आधिकारिक ${content.shortName} फोटो और हस्ताक्षर विनिर्देश तालिका`
                : `Official ${content.shortName} Photo and Signature Specifications Table`}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {isHindi
                ? `नवीनतम ${content.officialOrg} भर्ती अधिसूचना के अनुसार सत्यापित मानक।`
                : `Verified criteria according to the latest ${content.officialOrg} recruitment notification.`}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[540px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-800">
                  <th scope="col" className="py-3.5 px-4 font-bold">{isHindi ? 'आवश्यकता' : 'Requirement'}</th>
                  <th scope="col" className="py-3.5 px-4 font-bold">{content.shortName} {isHindi ? 'फोटो' : 'Photograph'}</th>
                  <th scope="col" className="py-3.5 px-4 font-bold">{content.shortName} {isHindi ? 'हस्ताक्षर' : 'Signature'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{isHindi ? 'आयाम (चौड़ाई × ऊंचाई)' : 'Dimensions (Width × Height)'}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-saffron-700">{content.photoDims}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-saffron-700">{content.sigDims}</td>
                </tr>
                <tr className="hover:bg-emerald-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{isHindi ? 'अनुमत फाइल साइज' : 'Allowed File Size'}</td>
                  <td className="py-3.5 px-4 font-bold text-[#138808]">{content.photoKb}</td>
                  <td className="py-3.5 px-4 font-bold text-[#138808]">{content.sigKb}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{isHindi ? 'फाइल प्रारूप' : 'Allowed File Format'}</td>
                  <td className="py-3.5 px-4">{config.format}</td>
                  <td className="py-3.5 px-4">{config.format}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{isHindi ? 'पृष्ठभूमि' : 'Background Color'}</td>
                  <td className="py-3.5 px-4">{content.specialRequirements.background}</td>
                  <td className="py-3.5 px-4">{isHindi ? 'सादा सफेद कागज' : 'Plain white unruled paper'}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{isHindi ? 'चेहरा / हस्ताक्षर नियम' : 'Facial / Signature Guidelines'}</td>
                  <td className="py-3.5 px-4">{content.specialRequirements.faceCoverage}</td>
                  <td className="py-3.5 px-4">{content.specialRequirements.signatureRules}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{isHindi ? 'चश्मा व पोशाक' : 'Clothing & Glasses Rules'}</td>
                  <td className="py-3.5 px-4">{content.specialRequirements.clothingGlasses}</td>
                  <td className="py-3.5 px-4">{isHindi ? 'सामान्य लिखावट; ब्लॉक अक्षर नहीं' : 'Sign in running hand; no full initials'}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{isHindi ? 'फोटो की अवधि' : 'Recency Requirement'}</td>
                  <td className="py-3.5 px-4">{content.specialRequirements.photoDateRules}</td>
                  <td className="py-3.5 px-4">{isHindi ? 'पहचान पत्र से मेल खाती हालिया लिखावट' : 'Clear recent signature matching ID card'}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{isHindi ? 'अस्वीकृति से बचाव' : 'Rejection Prevention'}</td>
                  <td className="py-3.5 px-4">{content.specialRequirements.otherNotes}</td>
                  <td className="py-3.5 px-4">{isHindi ? 'सीमा के भीतर सटीक रूप से क्रॉप करें' : 'Crop precisely within box boundary'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Critical Instructions Checklist */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#138808]" />
            <span>
              {isHindi
                ? `${content.shortName} पोर्टल द्वारा अस्वीकृति से बचने के महत्वपूर्ण सुझाव`
                : `Important Tips to Prevent ${content.shortName} Portal Rejection`}
            </span>
          </h2>
          <ul className="text-xs sm:text-sm text-gray-600 space-y-2.5 list-disc list-inside">
            {content.tips.map((tip, idx) => (
              <li key={idx} className="leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* How-to Guide */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-saffron-600">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                {isHindi
                  ? `${content.shortName} के लिए फोटो और हस्ताक्षर 4 चरणों में कैसे तैयार करें`
                  : `How to Resize Photo & Signature for ${content.shortName} in 4 Steps`}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                {isHindi
                  ? 'कुछ ही सेकंड में 100% मानक-अनुकूल फाइल तैयार करने का सरल तरीका।'
                  : 'Quick workflow to prepare 100% compliant examination files in seconds.'}
              </p>
            </div>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 list-none counter-reset-step">
            {content.howToSteps.map((step, idx) => (
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
                  <span>{isHindi ? `चरण ${idx + 1} तैयार` : `Step ${idx + 1} Ready`}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Semantic FAQ Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-[#138808]">
              <HelpCircle className="w-4 h-4 text-[#138808]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                {content.shortName} {isHindi ? 'फोटो और हस्ताक्षर पूछे जाने वाले प्रश्न' : 'Photo & Signature FAQs'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                {isHindi
                  ? `${content.shortName} परीक्षा के फोटो अपलोड विनिर्देशों से जुड़े उत्तर।`
                  : `Frequently asked questions regarding ${content.shortName} upload specifications and common errors.`}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {content.faqs.map((faq, idx) => (
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

        {/* Cross-linking to Other Exams in same locale */}
        <section className="p-6 rounded-3xl bg-white border border-gray-100 shadow-soft space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            {isHindi ? 'अन्य सरकारी परीक्षाओं के रीसाइज़र टूल्स' : 'Check Other Government Exam Resizer Tools'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherExams.map((item) => (
              <Link
                key={item.slug}
                href={`${prefix}/resizer/${item.slug}`}
                className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-orange-300 hover:bg-orange-50/30 transition group"
              >
                <span className="font-bold text-sm text-gray-900 group-hover:text-saffron-600 flex items-center justify-between">
                  <span>{item.content.shortName} Resizer</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-xs text-gray-500 block mt-1">
                  Photo: {item.config.photoWidth}x{item.config.photoHeight} ({item.content.photoKb})
                </span>
              </Link>
            ))}
            <Link
              href={`${prefix}/guide`}
              className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-orange-300 hover:bg-orange-50/30 transition group"
            >
              <span className="font-bold text-sm text-gray-900 group-hover:text-saffron-600 flex items-center justify-between">
                <span>{isHindi ? 'परीक्षा फोटो दिशानिर्देश' : 'Exam Photo Guidelines'}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-xs text-gray-500 block mt-1">
                {isHindi ? 'सभी प्रतियोगी परीक्षाओं के लिए पूरी चेकलिस्ट' : 'Full checklist for all Indian competitive tests'}
              </span>
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={locale} />
    </div>
  );
}
