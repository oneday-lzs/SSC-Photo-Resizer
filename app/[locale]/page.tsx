import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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

interface LocalePageProps {
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hi' }];
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const isHindi = params.locale === 'hi';

  const title = isHindi
    ? 'UPSC फोटो रीसाइज़र 413x531 पिक्सल (20KB-300KB) – मुफ्त और निजी'
    : 'UPSC Photo Resizer 413x531 Pixels (20KB-300KB) – Free & Private';

  const description = isHindi
    ? 'मुफ्त UPSC फोटो रीसाइज़र और हस्ताक्षर रीसाइज़ टूल। फोटो को 413x531 पिक्सल (20KB-300KB) और हस्ताक्षर को 140x60 पिक्सल में कंप्रेस करें। 100% निजी, कोई सर्वर अपलोड नहीं।'
    : 'Free UPSC photo resizer and signature resize tool. Crop and compress photo to 413x531 pixels (20KB-300KB) and signature to 140x60 pixels. 100% private, client-side, zero upload.';

  const keywords = isHindi
    ? [
        'UPSC फोटो रीसाइज़र',
        'UPSC हस्ताक्षर',
        '413x531',
        '140x60',
        '20KB-300KB',
        'फोटो कंप्रेस',
        'UPSC फॉर्म फोटो',
        'हस्ताक्षर आकार 140x60',
      ]
    : [
        'UPSC photo resizer',
        '413x531',
        '140x60',
        '20KB-300KB',
        'compress UPSC photo',
        'signature resize',
        'UPSC photo converter online',
        'UPSC signature padding',
      ];

  const alternates = {
    canonical: `/${params.locale}`,
    languages: getAlternateLanguages(''),
  };

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    alternates,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}`,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
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

const homeFaqsEn = [
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

const homeFaqsHi = [
  {
    question: 'UPSC 2026 आवेदन के लिए फोटो की सटीक आवश्यकताएं क्या हैं?',
    answer:
      'आधिकारिक UPSC अधिसूचना के अनुसार, पासपोर्ट फोटो का आकार 413x531 पिक्सल (JPEG प्रारूप) और फाइल साइज 20KB-300KB के बीच होना चाहिए। उम्मीदवार का चेहरा सफेद पृष्ठभूमि पर कम से कम 75% हिस्से को कवर करे और फोटो आवेदन से 10 दिन से अधिक पुरानी न हो।',
  },
  {
    question: 'UPSC हस्ताक्षर रीसाइज़ के लिए आवश्यक आयाम और फाइल साइज क्या है?',
    answer:
      'UPSC हस्ताक्षर के लिए आधिकारिक अनुशंसित आकार 140x60 पिक्सल है। फाइल साइज सख्त रूप से 20KB-300KB के बीच होना चाहिए। सफेद सादे कागज पर काली स्याही से सामान्य लिखावट में साइन करें (सभी बड़े अक्षर वर्जित हैं)।',
  },
  {
    question: 'UPSC पोर्टल हस्ताक्षर को "File size less than 20 KB" कहकर क्यों खारिज करता है?',
    answer:
      'सफेद कागज पर साफ हस्ताक्षर आसानी से कंप्रेस होकर 5KB-15KB तक छोटे हो जाते हैं। UPSC को कम से कम 20KB चाहिए। हमारा टूल सुरक्षित मानक JPEG पैडिंग जोड़कर फाइल को 20KB से अधिक का बनाता है जिससे पोर्टल इसे तुरंत स्वीकार कर लेता है।',
  },
  {
    question: 'चेहरे को खींचे बिना फोटो को 20KB-300KB में कैसे कंप्रेस करें?',
    answer:
      'हमारा टूल स्मार्ट सेंटर कवर-क्रॉप और बाइनरी सर्च कंप्रेशन का उपयोग करता है। यह आपके चेहरे के अनुपात को बिना विकृत किए आवश्यक 20KB-300KB सीमा में सटीक रूप से ले आता है।',
  },
  {
    question: 'क्या मेरी फोटो या हस्ताक्षर किसी सर्वर पर अपलोड होते हैं?',
    answer:
      'बिल्कुल नहीं। 100% गोपनीयता की गारंटी है। सभी रीसाइज़िंग सीधे आपके फोन या कंप्यूटर के ब्राउज़र में स्थानीय रूप से होती है। कोई भी फाइल इंटरनेट पर नहीं भेजी जाती।',
  },
  {
    question: 'क्या मैं अपने मोबाइल फोन (Android / iPhone) पर इसका उपयोग कर सकता हूँ?',
    answer:
      'हाँ! यह टूल मोबाइल ब्राउज़र (Safari और Chrome) के लिए पूरी तरह अनुकूलित है। आप सीधे गैलरी या कैमरे से फोटो चुनकर तुरंत डाउनलोड कर सकते हैं।',
  },
];

export default function LocalizedHomePage({ params }: LocalePageProps) {
  const locale: Language = params.locale === 'hi' ? 'hi' : 'en';
  if (params.locale !== 'en' && params.locale !== 'hi') {
    notFound();
  }

  const isHindi = locale === 'hi';
  const faqs = isHindi ? homeFaqsHi : homeFaqsEn;

  const softwareSchema = generateSoftwareApplicationSchema({
    name: isHindi
      ? 'UPSC फोटो रीसाइज़र 413x531 पिक्सल (20KB-300KB)'
      : 'UPSC Photo Resizer 413x531 Pixels (20KB-300KB)',
    description: isHindi
      ? 'मुफ्त UPSC फोटो रीसाइज़र और हस्ताक्षर रीसाइज़ टूल। फोटो 413x531 और हस्ताक्षर 140x60 (20KB-300KB)।'
      : 'Free, 100% client-side tool to resize and compress photos to 413x531 and signatures to 140x60 (20KB-300KB) for UPSC applications.',
    url: `${SITE_URL}/${locale}`,
  });

  const howToSchema = generateHowToSchema({
    name: isHindi
      ? 'UPSC फोटो (413x531) और हस्ताक्षर (140x60) को कैसे रीसाइज़ और कंप्रेस करें'
      : 'How to Resize and Compress UPSC Photo (413x531) and Signature (140x60)',
    description: isHindi
      ? 'ब्राउज़र में UPSC फोटो को 20KB-300KB में कंप्रेस करने और हस्ताक्षर को 140x60 पिक्सल में बदलने की आसान गाइड।'
      : 'Complete guide to compress UPSC photo to 20KB-300KB and perform UPSC signature resize to 140x60 using in-browser Canvas processing.',
    steps: isHindi
      ? [
          {
            name: 'फोटो या हस्ताक्षर अपलोड करें',
            text: 'अपने स्मार्टफोन या कंप्यूटर से JPG, PNG, या WEBP फोटो चुनें।',
          },
          {
            name: 'UPSC प्रीसेट चुनें',
            text: '"UPSC Photo" (413x531 px) या "UPSC Signature" (140x60 px) चुनें।',
          },
          {
            name: 'ब्राउज़र में स्वचालित कम्प्रेशन',
            text: 'Canvas इंजन बिना विकृति के आकार काटता है और 20KB-300KB के बीच सुरक्षित रूप से कंप्रेस करता है।',
          },
          {
            name: 'तैयार JPEG डाउनलोड करें',
            text: 'सरकारी पोर्टल के लिए तैयार JPEG फाइल तुरंत अपने डिवाइस में सेव करें।',
          },
        ]
      : undefined,
  });

  const faqSchema = generateFAQSchema(faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isHindi ? 'होम' : 'Home', url: `/${locale}` },
  ]);

  const prefix = `/${locale}`;

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd schema={[softwareSchema, howToSchema, faqSchema, breadcrumbSchema]} />

      <Navbar currentLang={locale} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12">
        {/* ========================================================= */}
        {/* ABOVE THE FOLD: TOOL CONTAINER (CLIENT COMPONENT)         */}
        {/* ========================================================= */}
        <section aria-label={isHindi ? 'UPSC फोटो रीसाइज़र टूल' : 'UPSC Photo Resizer Tool'} className="space-y-4">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/90 border border-orange-200 text-saffron-800 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
              <span>{isHindi ? 'आधिकारिक 2026 परीक्षा विनिर्देश' : 'Official 2026 Examination Specifications'}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {isHindi
                ? 'मुफ्त • 100% सुरक्षित • कोई सर्वर अपलोड नहीं • मोबाइल व पीसी पर ऑफलाइन सक्षम'
                : 'Free • Private • No Server Upload • Works Offline on Mobile & PC'}
            </p>
          </div>

          <TrustBanner lang={locale} />

          <ResizerWidget initialPresetId="upsc-photo" initialLang={locale} />
        </section>

        {/* ========================================================= */}
        {/* BELOW THE FOLD: SERVER-RENDERED SEO CONTENT               */}
        {/* ========================================================= */}

        {/* H1 Header & Content */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {isHindi ? (
              <>
                UPSC फोटो रीसाइज़र:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-500 via-orange-600 to-amber-600">
                  413x531 पिक्सल और हस्ताक्षर रीसाइज़ (20KB-300KB)
                </span>
              </>
            ) : (
              <>
                UPSC Photo Resizer:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-500 via-orange-600 to-amber-600">
                  413x531 Pixels & Signature Resize (20KB-300KB)
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {isHindi ? (
              <>
                भारतीय सिविल सेवा परीक्षा के उम्मीदवारों के लिए समर्पित <strong>UPSC फोटो रीसाइज़र</strong> में आपका स्वागत है। चाहे आप UPSC CSE (IAS, IPS, IFS), NDA, CDS या अन्य सरकारी परीक्षाओं का फॉर्म भर रहे हों, आधिकारिक UPSC ऑनलाइन पोर्टल पर सख्त नियम लागू होते हैं: फोटो ठीक <strong>413x531</strong> पिक्सल और फोटो व हस्ताक्षर दोनों <strong>20KB-300KB</strong> की फाइल सीमा में होने चाहिए।
              </>
            ) : (
              <>
                Welcome to the dedicated <strong>UPSC photo resizer</strong> built specifically for Indian civil services aspirants. Whether you are applying for UPSC CSE (IAS, IPS, IFS), NDA, CDS, CMS, or Indian Forest Service, the official UPSC online application portal enforces rigorous biometric rules: your photograph must be exactly <strong>413x531</strong> pixels, and both your photo and signature must strictly remain within the <strong>20KB-300KB</strong> file size range.
              </>
            )}
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {isHindi ? (
              <>
                पारंपरिक संपादकों के विपरीत जो आपके चेहरे को खींचकर विकृत कर देते हैं या संवेदनशील दस्तावेज अनजान सर्वरों पर अपलोड कराते हैं, हमारा टूल आपके ब्राउज़र में ही सुरक्षित रूप से <strong>फोटो कंप्रेस</strong> और <strong>हस्ताक्षर रीसाइज़</strong> करता है।
              </>
            ) : (
              <>
                Unlike traditional editors that stretch your facial features or require you to upload personal identity documents to third-party cloud servers, our utility allows you to <strong>compress UPSC photo</strong> and carry out complete <strong>signature resize</strong> entirely within your local browser.
              </>
            )}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">
                {isHindi ? 'लक्ष्य फोटो' : 'Target Photo'}
              </span>
              <span className="font-mono font-bold text-saffron-700 text-sm sm:text-base">413 × 531 px</span>
            </div>
            <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">
                {isHindi ? 'लक्ष्य हस्ताक्षर' : 'Target Signature'}
              </span>
              <span className="font-mono font-bold text-saffron-700 text-sm sm:text-base">140 × 60 px</span>
            </div>
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">
                {isHindi ? 'फाइल साइज सीमा' : 'File Size Range'}
              </span>
              <span className="font-bold text-[#138808] text-sm sm:text-base">20KB – 300KB</span>
            </div>
            <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 text-center">
              <span className="block text-[11px] font-semibold text-gray-500">
                {isHindi ? 'गोपनीयता' : 'Privacy Guarantee'}
              </span>
              <span className="font-bold text-navy-600 text-sm sm:text-base">
                {isHindi ? '100% स्थानीय' : '100% Local'}
              </span>
            </div>
          </div>
        </section>

        {/* Specifications Table */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              {isHindi
                ? 'आधिकारिक UPSC फोटो और हस्ताक्षर विनिर्देश तालिका'
                : 'Official UPSC Photo and Signature Specifications'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {isHindi
                ? 'नवीनतम UPSC सिविल सेवा परीक्षा (CSE) अधिसूचना के अनुसार सत्यापित विनिर्देश।'
                : 'Cross-checked against the latest official UPSC Civil Services Examination (CSE) notification.'}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[540px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-800">
                  <th scope="col" className="py-3.5 px-4 font-bold">{isHindi ? 'आवश्यकता' : 'Requirement'}</th>
                  <th scope="col" className="py-3.5 px-4 font-bold">{isHindi ? 'UPSC फोटो' : 'UPSC Photograph'}</th>
                  <th scope="col" className="py-3.5 px-4 font-bold">{isHindi ? 'UPSC हस्ताक्षर' : 'UPSC Signature'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{isHindi ? 'अनुशंसित आकार' : 'Target Dimensions'}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-saffron-700">413 × 531 pixels</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-saffron-700">140 × 60 pixels</td>
                </tr>
                <tr className="hover:bg-emerald-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{isHindi ? 'फाइल साइज सीमा' : 'File Size Boundary'}</td>
                  <td className="py-3.5 px-4 font-bold text-[#138808]">20 KB to 300 KB</td>
                  <td className="py-3.5 px-4 font-bold text-[#138808]">20 KB to 300 KB</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{isHindi ? 'स्वीकृत प्रारूप' : 'File Format'}</td>
                  <td className="py-3.5 px-4">JPG / JPEG only</td>
                  <td className="py-3.5 px-4">JPG / JPEG only</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{isHindi ? 'पृष्ठभूमि रंग' : 'Background Color'}</td>
                  <td className="py-3.5 px-4">{isHindi ? 'सफेद या हल्की पृष्ठभूमि' : 'Plain white or light grey'}</td>
                  <td className="py-3.5 px-4">{isHindi ? 'सफेद सादा कागज' : 'Plain white unruled paper'}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{isHindi ? 'चेहरा / स्याही नियम' : 'Facial Composition / Ink'}</td>
                  <td className="py-3.5 px-4">{isHindi ? 'चेहरा कम से कम 75% हिस्से में हो' : 'Face must cover 75% of photograph'}</td>
                  <td className="py-3.5 px-4">{isHindi ? 'काली स्याही; बड़े अक्षर वर्जित' : 'Black ink pen; no capital letters'}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{isHindi ? 'न्यूनतम साइज सुरक्षा' : 'Under-size Protection'}</td>
                  <td className="py-3.5 px-4">{isHindi ? 'स्वचालित गुणवत्ता समायोजन' : 'Iterative binary quality adjustment'}</td>
                  <td className="py-3.5 px-4 font-semibold text-blue-700">
                    {isHindi ? '20KB से कम होने पर ऑटो-पैडिंग' : 'Auto-padded to >20KB if needed'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How-To Steps */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-saffron-600">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                {isHindi
                  ? 'UPSC फोटो और हस्ताक्षर को 4 सरल चरणों में कैसे रीसाइज़ करें'
                  : 'How to Compress UPSC Photo and Resize Signature'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                {isHindi
                  ? '10 सेकंड के भीतर सरकारी परीक्षा हेतु वैध फाइलें तैयार करने की सरल प्रक्रिया।'
                  : 'Follow this simple 4-step workflow to prepare valid examination files in under 10 seconds.'}
              </p>
            </div>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 list-none counter-reset-step">
            {(isHindi
              ? [
                  { name: 'इमेज अपलोड करें', text: 'अपने फोन या कंप्यूटर से कोई भी JPG, PNG या WEBP फाइल चुनें।' },
                  { name: 'UPSC प्रीसेट चुनें', text: 'UPSC Photo (413x531) या Signature (140x60) प्रीसेट चुनें।' },
                  { name: 'स्वचालित कम्प्रेशन', text: 'टूल चेहरे को बिना खींचे सही अनुपात और 20KB-300KB सीमा में सेट करता है।' },
                  { name: 'तुरंत डाउनलोड करें', text: 'UPSC पोर्टल पर अपलोड करने के लिए तैयार JPEG फाइल डाउनलोड करें।' },
                ]
              : [
                  { name: 'Upload Picture', text: 'Choose any high-resolution JPG or PNG file from your smartphone camera or scanner.' },
                  { name: 'Select Preset', text: 'Click "UPSC Photo" (413x531 px) or "UPSC Signature" (140x60 px).' },
                  { name: 'Canvas Auto-Compress', text: 'Your browser crops without stretching and auto-tunes JPEG quality into the legal KB threshold.' },
                  { name: 'Instant Download', text: 'Save the 100% compliant JPEG file directly to your device ready for the portal.' },
                ]
            ).map((step, idx) => (
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
                  <span>{isHindi ? `चरण ${idx + 1} सत्यापित` : `Step ${idx + 1} Verified`}</span>
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
                {isHindi ? '100% स्थानीय गोपनीयता: कोई सर्वर अपलोड नहीं' : '100% Client-Side Privacy: Why Zero Server Upload Matters'}
              </h2>
              <p className="text-xs text-gray-500">
                {isHindi ? 'उम्मीदवारों की सुरक्षा और बायोमेट्रिक डेटा की पूर्ण सुरक्षा।' : 'Engineered with high security standards for government exam candidates.'}
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-gray-700 space-y-2.5 leading-relaxed">
            <p>
              {isHindi
                ? 'आपकी फोटो और हस्ताक्षर व्यक्तिगत संवेदनशील डेटा हैं। यह टूल पूरी तरह से आपके ब्राउज़र के भीतर HTML5 Canvas API पर चलता है। पेज लोड होने के बाद आप इंटरनेट बंद करके भी बिना किसी नेटवर्क ट्रांसमिशन के फोटो रीसाइज़ कर सकते हैं।'
                : 'Your passport photo contains facial biometric identifiers, and your signature is a legal authentication mark. This UPSC photo resizer executes entirely through the HTML5 Canvas API within your local browser sandbox without transmitting a single byte across the internet.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
              <Lock className="w-3.5 h-3.5 text-[#138808]" />
              {isHindi ? 'शून्य रिमोट स्टोरेज' : 'Zero Remote Image Storage'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
              <Smartphone className="w-3.5 h-3.5 text-[#138808]" />
              {isHindi ? 'मोबाइल पर ऑफलाइन सक्षम' : 'Offline Capable on Android & iOS'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
              <FileCheck className="w-3.5 h-3.5 text-[#138808]" />
              {isHindi ? 'मानक JPEG हेडर सुरक्षा' : 'Safe JPEG Header Padding'}
            </span>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-[#138808]">
              <HelpCircle className="w-4 h-4 text-[#138808]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                {isHindi ? 'अक्सर पूछे जाने वाले प्रश्न (FAQs)' : 'Frequently Asked Questions (FAQs)'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                {isHindi ? 'UPSC फोटो और हस्ताक्षर के नियमों से जुड़े महत्वपूर्ण उत्तर।' : 'Detailed answers to UPSC online application photo and signature guidelines.'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
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

        {/* Quick Links */}
        <section className="p-5 rounded-2xl bg-gray-100/80 border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <span className="font-semibold text-gray-700">
            {isHindi ? 'अन्य सरकारी परीक्षाओं के लिए रीसाइज़र टूल्स:' : 'Applying for other government exams? Use dedicated presets:'}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`${prefix}/resizer/ssc`}
              className="inline-flex items-center gap-1 font-bold text-[#138808] hover:text-emerald-800 bg-white px-3 py-1.5 rounded-lg border border-gray-200 transition shadow-xs"
            >
              <span>{isHindi ? 'SSC फोटो रीसाइज़र (100x120)' : 'SSC Photo Resizer (100x120)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`${prefix}/resizer/ibps`}
              className="inline-flex items-center gap-1 font-bold text-navy-600 hover:text-navy-800 bg-white px-3 py-1.5 rounded-lg border border-gray-200 transition shadow-xs"
            >
              <span>{isHindi ? 'IBPS बैंक रीसाइज़र (200x230)' : 'IBPS Bank Resizer (200x230)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`${prefix}/guide`}
              className="inline-flex items-center gap-1 font-bold text-gray-700 hover:text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200 transition shadow-xs"
            >
              <span>{isHindi ? 'संपूर्ण फोटो दिशानिर्देश' : 'Full Photo Rules Guide'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={locale} />
    </div>
  );
}
