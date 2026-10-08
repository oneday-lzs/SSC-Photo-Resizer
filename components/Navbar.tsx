'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Language } from '@/lib/types';
import { translations } from '@/lib/translations';

interface NavbarProps {
  currentLang?: Language;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang }) => {
  const pathname = usePathname() || '/';

  // Determine active language from prop or pathname
  const isHindiPath = pathname.startsWith('/hi');
  const activeLang: Language = currentLang || (isHindiPath ? 'hi' : 'en');
  const t = translations[activeLang] || translations.en;

  // Compute language toggle destination URLs
  const getUrlForLocale = (targetLocale: Language): string => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) {
      return `/${targetLocale}`;
    }
    if (segments[0] === 'en' || segments[0] === 'hi') {
      segments[0] = targetLocale;
      return `/${segments.join('/')}`;
    }
    return `/${targetLocale}/${segments.join('/')}`;
  };

  const navLinks = [
    { href: `/${activeLang}`, label: activeLang === 'hi' ? 'होम' : 'Home' },
    { href: `/${activeLang}/resizer/upsc`, label: 'UPSC' },
    { href: `/${activeLang}/resizer/ssc`, label: 'SSC' },
    { href: `/${activeLang}/resizer/ibps`, label: 'IBPS' },
    { href: `/${activeLang}/guide`, label: activeLang === 'hi' ? 'गाइड' : 'Exam Guide' },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
      {/* Indian flag accent tri-color stripe */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white border-y border-gray-200" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link href={`/${activeLang}`} className="flex items-center space-x-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-saffron-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-saffron-500/20 font-bold text-lg group-hover:scale-105 transition-transform">
            🇮🇳
          </div>
          <div>
            <span className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight leading-tight block">
              {t.siteTitle}
            </span>
            <span className="text-[11px] text-gray-500 hidden sm:block font-medium">
              {t.siteSubtitle}
            </span>
          </div>
        </Link>

        {/* Navigation links & Language Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <nav className="hidden md:flex items-center space-x-1 text-xs font-semibold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-50 text-saffron-600 font-bold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Bilingual Switcher using crawlable semantic links */}
          <div className="flex items-center bg-gray-100 p-0.5 sm:p-1 rounded-full border border-gray-200 text-xs font-semibold">
            <Link
              href={getUrlForLocale('en')}
              hrefLang="en"
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                activeLang === 'en'
                  ? 'bg-white text-navy-600 shadow-sm font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              EN
            </Link>
            <Link
              href={getUrlForLocale('hi')}
              hrefLang="hi"
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                activeLang === 'hi'
                  ? 'bg-white text-saffron-600 shadow-sm font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              हिन्दी
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
