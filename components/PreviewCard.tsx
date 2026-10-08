'use client';

import React from 'react';
import {
  Download,
  RotateCw,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Maximize2,
  FileCheck,
  Zap,
} from 'lucide-react';
import {
  ExamPreset,
  Language,
  OriginalImageInfo,
  ProcessingResult,
} from '@/lib/types';
import { translations } from '@/lib/translations';

interface PreviewCardProps {
  original: OriginalImageInfo;
  result: ProcessingResult | null;
  preset: ExamPreset;
  lang: Language;
  isProcessing: boolean;
  onRotate: () => void;
  onReset: () => void;
  onDownload: () => void;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({
  original,
  result,
  preset,
  lang,
  isProcessing,
  onRotate,
  onReset,
  onDownload,
}) => {
  const t = translations[lang];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-100 shadow-soft transition-all">
      {/* Top action bar */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-indiaGreen-600">
            <FileCheck className="w-4 h-4 text-[#138808]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {lang === 'en' ? 'Live Comparison & Download' : 'तुलना और डाउनलोड'}
            </h3>
            <p className="text-xs text-gray-500">
              {preset.name} ({preset.targetWidth}x{preset.targetHeight} px)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRotate}
            disabled={isProcessing}
            title={t.rotate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition active:scale-95 disabled:opacity-50"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.rotate}</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            title={t.resetBtn}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.changeImage}</span>
          </button>
        </div>
      </div>

      {/* Side-by-side or stacked preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Original image */}
        <div className="flex flex-col items-center bg-gray-50 rounded-2xl p-4 border border-gray-200/70">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <span>{t.original}</span>
            <span className="text-[10px] font-normal text-gray-400">({original.name})</span>
          </div>

          <div className="w-full h-52 sm:h-64 flex items-center justify-center bg-white rounded-xl border border-dashed border-gray-200 p-2 overflow-hidden shadow-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={original.previewUrl}
              alt="Original preview"
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          </div>

          <div className="w-full mt-3 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-white p-2 rounded-lg border border-gray-100">
              <span className="text-gray-400 block text-[10px]">{t.dimensions}</span>
              <span className="font-semibold text-gray-700">
                {original.width} × {original.height} px
              </span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-gray-100">
              <span className="text-gray-400 block text-[10px]">{t.fileSize}</span>
              <span className="font-semibold text-gray-700">{original.sizeKb} KB</span>
            </div>
          </div>
        </div>

        {/* Right: Processed image */}
        <div className="flex flex-col items-center bg-gradient-to-b from-orange-50/40 to-emerald-50/30 rounded-2xl p-4 border-2 border-saffron-300 relative shadow-sm">
          <div className="text-xs font-bold text-saffron-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#138808] animate-pulse" />
            <span>{t.processed} (JPEG)</span>
          </div>

          <div className="w-full h-52 sm:h-64 flex items-center justify-center bg-white rounded-xl border border-gray-200 p-2 overflow-hidden shadow-inner relative">
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center gap-2 text-saffron-600">
                <RefreshCw className="w-8 h-8 animate-spin" />
                <span className="text-xs font-medium">{t.processing}</span>
              </div>
            ) : result ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.previewUrl}
                alt="Processed output"
                className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
              />
            ) : null}
          </div>

          {result && (
            <div className="w-full mt-3 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-white p-2 rounded-lg border border-emerald-100">
                <span className="text-gray-400 block text-[10px]">{t.dimensions}</span>
                <span className="font-bold text-gray-900">
                  {result.width} × {result.height} px
                </span>
              </div>

              <div
                className={`p-2 rounded-lg border ${
                  result.isSizeValid
                    ? 'bg-emerald-50 border-emerald-200 text-[#138808]'
                    : 'bg-red-50 border-red-200 text-red-600'
                }`}
              >
                <span className="block text-[10px] opacity-80">{t.fileSize}</span>
                <span className="font-bold">
                  {result.sizeKb} KB
                  <span className="text-[10px] font-normal block">
                    ({preset.minKb} - {preset.maxKb} KB)
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Validation status badge */}
      {result && (
        <div className="mt-5 space-y-2">
          {result.isSizeValid ? (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 text-[#138808] rounded-xl border border-emerald-200 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-[#138808]" />
              <span>{t.validSize}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs sm:text-sm font-semibold">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-600" />
              <span>
                {result.sizeKb > preset.maxKb ? t.tooLarge : t.tooSmall} (Target: {preset.minKb}-{preset.maxKb} KB)
              </span>
            </div>
          )}

          {result.paddedBytes && result.paddedBytes > 0 ? (
            <div className="flex items-center gap-2 p-2.5 bg-blue-50 text-navy-600 rounded-xl border border-blue-200 text-xs font-medium">
              <Zap className="w-4 h-4 flex-shrink-0 text-blue-600" />
              <span>
                {t.paddingApplied} (+{(result.paddedBytes / 1024).toFixed(1)} KB)
              </span>
            </div>
          ) : null}
        </div>
      )}

      {/* Download action button */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onDownload}
          disabled={!result || isProcessing}
          className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-saffron-500 via-orange-500 to-amber-600 hover:from-saffron-600 hover:to-orange-600 text-white font-bold text-base shadow-lg shadow-saffron-500/30 hover:shadow-saffron-500/40 active:scale-[0.99] transition flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5 stroke-[2.5]" />
          <span>{t.downloadBtn}</span>
        </button>
      </div>
    </div>
  );
};
