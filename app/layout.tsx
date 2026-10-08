import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from '@/lib/seo';

const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Free, Fast & 100% Private`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'UPSC photo resizer',
    'UPSC signature resizer',
    'UPSC photo 413 x 531',
    'UPSC signature 140 x 60',
    'UPSC photo size 20kb to 300kb',
    'SSC photo resize 100x120',
    'SSC signature 140x60 10kb to 20kb',
    'IBPS photo compressor 200x230',
    'Indian government exam photo maker',
    'free photo resizer online',
    'browser photo compressor no upload',
  ],
  authors: [{ name: 'UPSC Exam Aspirants Team' }],
  creator: 'UPSC Exam Aspirants Team',
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Free, Fast & 100% Private`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Resize exam photos and signatures locally`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Free, Fast & 100% Private`,
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: gscVerification
    ? {
        google: gscVerification,
      }
    : undefined,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#FF9933',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="flex flex-col min-h-screen antialiased text-gray-900 bg-slate-50 selection:bg-saffron-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
