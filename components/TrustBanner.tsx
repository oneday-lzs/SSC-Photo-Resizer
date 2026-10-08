'use client';

import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { Language } from '@/lib/types';
import { translations } from '@/lib/translations';

interface TrustBannerProps {
  lang?: Language;
}

export const TrustBanner: React.FC<TrustBannerProps> = ({ lang = 'en' }) => {
  return (
    <div className="w-full bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3.5 sm:p-4 text-emerald-900 shadow-sm flex items-center gap-3">
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
        <ShieldCheck className="w-5 h-5 text-[#138808]" />
      </div>
      <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
        <span className="font-bold text-[#138808] mr-1 inline-flex items-center gap-1">
          <Lock className="w-3.5 h-3.5 inline mr-0.5 -mt-0.5" />
          {lang === 'en' ? '100% Client-Side Privacy:' : '100% गोपनीय व सुरक्षित:'}
        </span>
        {lang === 'en'
          ? ' Your files never leave your device. All image resizing, cropping, and compression happen directly inside your web browser.'
          : ' आपकी फाइलें कभी आपके डिवाइस से बाहर नहीं जाती हैं। सारा रीसाइज़िंग और कम्प्रेशन सीधे आपके ब्राउज़र में होता है।'}
      </div>
    </div>
  );
};
