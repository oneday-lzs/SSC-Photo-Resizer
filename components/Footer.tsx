'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Language } from '@/lib/types';
import { translations } from '@/lib/translations';
import { ShieldCheck, Zap } from 'lucide-react';

interface FooterProps {
  lang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const pathname = usePathname() || '/';
  const isHindiPath = pathname.startsWith('/hi');
  const activeLang: Language = lang || (isHindiPath ? 'hi' : 'en');
  const t = translations[activeLang] || translations.en;

  const prefix = `/${activeLang}`;

  return (
    <footer className="w-full mt-16 border-t border-gray-200 bg-white/80 py-10 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium text-gray-500">
          <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            {activeLang === 'hi' ? '100% स्थानीय गोपनीयता' : '100% Client-Side Privacy'}
          </span>
          <span className="flex items-center gap-1 text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            <Zap className="w-3.5 h-3.5" />
            {activeLang === 'hi' ? 'कोई सर्वर अपलोड नहीं' : 'Zero Server Uploads'}
          </span>
          <span className="text-gray-400 hidden sm:inline">•</span>
          <span className="text-gray-600">
            {activeLang === 'hi' ? 'आधिकारिक परीक्षा विनिर्देश' : 'Official Exam Dimension Presets'}
          </span>
        </div>

        {/* Internal Navigation Links for Search Crawlers */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-600">
          <Link href={prefix} className="hover:text-saffron-600 transition">
            {activeLang === 'hi' ? 'होम' : 'Home'}
          </Link>
          <Link href={`${prefix}/resizer/upsc`} className="hover:text-saffron-600 transition">
            UPSC Photo & Signature
          </Link>
          <Link href={`${prefix}/resizer/ssc`} className="hover:text-saffron-600 transition">
            SSC CGL/CHSL
          </Link>
          <Link href={`${prefix}/resizer/ibps`} className="hover:text-saffron-600 transition">
            IBPS Bank PO/Clerk
          </Link>
          <Link href={`${prefix}/guide`} className="hover:text-saffron-600 transition">
            {activeLang === 'hi' ? 'परीक्षा फोटो दिशानिर्देश' : 'Exam Photo Guidelines'}
          </Link>
          <Link href={`${prefix}/about`} className="hover:text-saffron-600 transition">
            {activeLang === 'hi' ? 'हमारे बारे में' : 'About Us'}
          </Link>
          <Link href={`${prefix}/privacy`} className="hover:text-saffron-600 transition">
            {activeLang === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
          </Link>
        </div>

        <p className="text-sm font-semibold text-gray-800 flex items-center justify-center gap-1.5">
          {t.madeWithLove}
        </p>

        <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
          {t.disclaimer}
        </p>

        <div className="text-[11px] text-gray-400 pt-1">
          © {new Date().getFullYear()} UPSC Photo Resizer. Built for accuracy, candidate privacy, and speed.
        </div>
      </div>
    </footer>
  );
};
