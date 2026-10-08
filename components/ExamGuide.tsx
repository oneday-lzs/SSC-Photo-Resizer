'use client';

import React from 'react';
import { Language } from '@/lib/types';
import { translations } from '@/lib/translations';
import { BookOpen } from 'lucide-react';

interface ExamGuideProps {
  lang?: Language;
}

export const ExamGuide: React.FC<ExamGuideProps> = ({ lang = 'en' }) => {
  const t = translations[lang] || translations.en;

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-navy-600">
          <BookOpen className="w-4 h-4" />
        </div>
        <h3 className="text-base font-bold text-gray-900">
          {t.guidelinesTitle}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
        <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 flex flex-col justify-between">
          <div>
            <span className="font-bold text-saffron-700 block text-sm mb-1">
              UPSC (IAS / IPS / NDA)
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-gray-700">
              <li>{t.guidePhotoUPSC}</li>
              <li>{t.guideSigUPSC}</li>
              <li>Size: 20 KB to 300 KB</li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col justify-between">
          <div>
            <span className="font-bold text-[#138808] block text-sm mb-1">
              SSC (CGL / CHSL / GD)
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-gray-700">
              <li>Photo: 100 x 120 px, 20 KB - 50 KB</li>
              <li>Signature: 140 x 60 px, 10 KB - 20 KB</li>
              <li>Frontal view without cap or spectacles</li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col justify-between">
          <div>
            <span className="font-bold text-navy-600 block text-sm mb-1">
              IBPS / SBI Banking
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-gray-700">
              <li>Photo: 200 x 230 px, 20 KB - 50 KB</li>
              <li>Signature: 140 x 60 px, 10 KB - 20 KB</li>
              <li>Clear signature in running hand (not CAPITAL)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
