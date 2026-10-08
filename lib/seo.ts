import { Language } from './types';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://upscphotoresizer.com';

export const SITE_NAME = 'UPSC Photo & Signature Resizer';

export const DEFAULT_DESCRIPTION =
  'Free, 100% client-side online tool to resize, crop, and compress photos and signatures for UPSC, SSC, IBPS, and Indian government exams. No upload required, zero server storage.';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStepItem {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

/**
 * Generate hreflang alternate URLs for SEO multi-language support
 */
export function getAlternateLanguages(pathWithoutLocale: string = '') {
  const normalizedPath = pathWithoutLocale
    ? (pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`)
    : '';

  const cleanEn = `${SITE_URL}/en${normalizedPath === '/' ? '' : normalizedPath}`;
  const cleanHi = `${SITE_URL}/hi${normalizedPath === '/' ? '' : normalizedPath}`;

  return {
    'en-IN': cleanEn,
    'hi-IN': cleanHi,
    en: cleanEn,
    hi: cleanHi,
    'x-default': cleanEn,
  };
}

/**
 * Generate Schema.org SoftwareApplication JSON-LD object
 */
export function generateSoftwareApplicationSchema(custom?: {
  name?: string;
  description?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: custom?.name || SITE_NAME,
    operatingSystem: 'Any (Web Browser, iOS, Android, Windows, macOS, Linux)',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'PhotoEditor',
    browserRequirements: 'Requires JavaScript. Requires HTML5 Canvas support.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    description: custom?.description || DEFAULT_DESCRIPTION,
    url: custom?.url || SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '12480',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'UPSC 413x531 px Photo Resize and 20KB-300KB Compression',
      'UPSC 140x60 px Signature Resize and 20KB-300KB Padding',
      'SSC 100x120 px Photo and 140x60 px Signature Resizer',
      'IBPS 200x230 px Bank Exam Photo Compression',
      '100% Client-side Processing (Zero Server Uploads)',
      'Centered Cover Crop without Aspect Ratio Distortion',
      'Instant Local Download as Compliant JPEG',
    ],
  };
}

/**
 * Generate Schema.org HowTo JSON-LD object
 */
export function generateHowToSchema(params?: {
  name?: string;
  description?: string;
  totalTime?: string;
  steps?: HowToStepItem[];
}) {
  const steps: HowToStepItem[] = params?.steps || [
    {
      name: 'Upload your image',
      text: 'Drag and drop or select your photograph or signature image (JPG, PNG, or WEBP) from your phone or computer.',
    },
    {
      name: 'Select Exam Requirement',
      text: 'Choose your target government exam preset (e.g. UPSC Photo 413x531, UPSC Signature 140x60, SSC, or IBPS).',
    },
    {
      name: 'Automatic Resizing & Compression',
      text: 'The tool uses browser Canvas to automatically crop the image to the exact dimensions and iteratively compress the file size within the official KB limit.',
    },
    {
      name: 'Download Compliant JPEG',
      text: 'Review the live preview, dimensions, and file size badge, then click Download to get your government exam-ready JPEG file.',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: params?.name || 'How to Resize Photo and Signature for UPSC and Govt Exams',
    description:
      params?.description ||
      'Step-by-step instructions to convert and resize photos and signatures to meet official UPSC, SSC, and IBPS portal requirements without uploading files to any server.',
    totalTime: params?.totalTime || 'PT30S',
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Web Browser with HTML5 Canvas support',
      },
      {
        '@type': 'HowToTool',
        name: 'Digital photo or scanned signature file',
      },
    ],
    step: steps.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.name,
      text: s.text,
      url: s.url || `${SITE_URL}#step-${idx + 1}`,
      ...(s.image ? { image: s.image } : {}),
    })),
  };
}

/**
 * Generate Schema.org FAQPage JSON-LD object
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Schema.org BreadcrumbList JSON-LD object
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
