'use client';

import React, { useState } from 'react';
import { PRESETS } from '@/lib/presets';
import { ExamPreset, Language } from '@/lib/types';
import { translations } from '@/lib/translations';
import { Sliders, Sparkles, Check, Info } from 'lucide-react';

interface PresetSelectorProps {
  selectedPreset: ExamPreset;
  onSelectPreset: (preset: ExamPreset) => void;
  lang: Language;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  selectedPreset,
  onSelectPreset,
  lang,
}) => {
  const t = translations[lang];

  // Custom preset form state
  const [customWidth, setCustomWidth] = useState<number>(selectedPreset.targetWidth || 350);
  const [customHeight, setCustomHeight] = useState<number>(selectedPreset.targetHeight || 350);
  const [customMinKb, setCustomMinKb] = useState<number>(selectedPreset.minKb || 20);
  const [customMaxKb, setCustomMaxKb] = useState<number>(selectedPreset.maxKb || 100);

  const isCustom = selectedPreset.id === 'custom';

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCustom: ExamPreset = {
      id: 'custom',
      name: 'Custom',
      nameHi: 'कस्टम',
      category: 'custom',
      kind: 'custom',
      targetWidth: Math.max(20, Math.min(4000, Number(customWidth) || 350)),
      targetHeight: Math.max(20, Math.min(4000, Number(customHeight) || 350)),
      minKb: Math.max(1, Number(customMinKb) || 10),
      maxKb: Math.max(Number(customMinKb) || 10, Number(customMaxKb) || 100),
      description: `${customWidth} x ${customHeight} px, ${customMinKb}KB - ${customMaxKb}KB`,
      descriptionHi: `${customWidth} x ${customHeight} px, ${customMinKb}KB - ${customMaxKb}KB`,
      defaultFilename: 'custom-resized.jpg',
    };
    onSelectPreset(updatedCustom);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-saffron-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">
              {t.selectPreset}
            </h2>
            <p className="text-xs text-gray-500">
              {lang === 'en'
                ? 'Official dimension & file size requirements'
                : 'आधिकारिक आयाम और फ़ाइल आकार की आवश्यकताएं'}
            </p>
          </div>
        </div>

        {selectedPreset.isPopular && (
          <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-saffron-700">
            ★ Most Used
          </span>
        )}
      </div>

      {/* Pill-shaped buttons grid */}
      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {PRESETS.map((preset) => {
          const isSelected = selectedPreset.id === preset.id;
          const label = lang === 'hi' ? preset.nameHi : preset.name;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className={`relative px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 border ${
                isSelected
                  ? 'bg-gradient-to-r from-saffron-500 to-amber-500 text-white border-transparent shadow-md shadow-saffron-500/25 scale-[1.02]'
                  : 'bg-gray-50/80 hover:bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              <span>{label}</span>
              {preset.id !== 'custom' && (
                <span
                  className={`text-[11px] font-normal px-1.5 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-200/70 text-gray-600'
                  }`}
                >
                  {preset.targetWidth}x{preset.targetHeight}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active preset details banner */}
      <div className="mt-4 p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl flex items-center justify-between text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-saffron-600 flex-shrink-0" />
          <span>
            {lang === 'hi' ? selectedPreset.descriptionHi : selectedPreset.description}
          </span>
        </div>
        <div className="font-mono font-medium text-amber-800 hidden sm:block">
          JPEG format
        </div>
      </div>

      {/* Custom configuration form when Custom is selected */}
      {isCustom && (
        <form
          onSubmit={handleApplyCustom}
          className="mt-4 p-4 rounded-2xl bg-gray-50 border border-gray-200/80 transition-all"
        >
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-700 uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            <span>{t.customSettings}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-gray-600 mb-1">
                {t.widthLabel}
              </label>
              <input
                type="number"
                min="20"
                max="4000"
                value={customWidth}
                onChange={(e) => setCustomWidth(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-600 mb-1">
                {t.heightLabel}
              </label>
              <input
                type="number"
                min="20"
                max="4000"
                value={customHeight}
                onChange={(e) => setCustomHeight(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-600 mb-1">
                {t.minKbLabel}
              </label>
              <input
                type="number"
                min="1"
                max="5000"
                value={customMinKb}
                onChange={(e) => setCustomMinKb(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-600 mb-1">
                {t.maxKbLabel}
              </label>
              <input
                type="number"
                min="5"
                max="10000"
                value={customMaxKb}
                onChange={(e) => setCustomMaxKb(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500 font-mono"
              />
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-semibold shadow-sm transition"
            >
              {t.applyCustom}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
