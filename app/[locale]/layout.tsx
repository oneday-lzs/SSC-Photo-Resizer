import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL, getAlternateLanguages } from '@/lib/seo';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hi' }];
}

export function generateMetadata({ params }: LocaleLayoutProps): Metadata {
  const locale = params.locale;
  const isHindi = locale === 'hi';

  const title = isHindi
    ? 'UPSC फोटो रीसाइज़र 413x531 पिक्सल (20KB-300KB) – मुफ्त और निजी'
    : 'UPSC Photo Resizer 413x531 Pixels (20KB-300KB) – Free & Private';

  const description = isHindi
    ? 'UPSC परीक्षा फोटो को ठीक 413x531 पिक्सल और 20KB-300KB में रीसाइज़ करें। 100% ब्राउज़र में, कोई सर्वर अपलोड नहीं, तत्काल डाउनलोड।'
    : 'Resize and compress photo to 413x531 pixels (20KB-300KB) and signature to 140x60 for UPSC, SSC & Indian exams. 100% private in-browser tool.';

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: getAlternateLanguages(''),
    },
    openGraph: {
      locale: isHindi ? 'hi_IN' : 'en_IN',
      url: `${SITE_URL}/${locale}`,
      title,
      description,
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  return <div lang={params.locale}>{children}</div>;
}
