import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const routes = [
  { path: '', priority: 1.0, changeFrequency: 'daily' as const },
  { path: '/resizer/upsc', priority: 0.95, changeFrequency: 'weekly' as const },
  { path: '/resizer/ssc', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/resizer/ibps', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/guide', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.5, changeFrequency: 'monthly' as const },
];

const locales = ['en', 'hi'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Root URL entry
  entries.push({
    url: `${SITE_URL}/`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
    alternates: {
      languages: {
        en: `${SITE_URL}/en`,
        hi: `${SITE_URL}/hi`,
        'x-default': `${SITE_URL}/en`,
      },
    },
  });

  // Localized URLs for all pages
  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${route.path}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: locale === 'en' ? route.priority : Number((route.priority * 0.95).toFixed(2)),
        alternates: {
          languages: {
            en: `${SITE_URL}/en${route.path}`,
            hi: `${SITE_URL}/hi${route.path}`,
            'x-default': `${SITE_URL}/en${route.path}`,
          },
        },
      });
    }
  }

  return entries;
}
