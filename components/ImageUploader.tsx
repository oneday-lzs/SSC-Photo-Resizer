'use client';

import React, { useRef, useState, useCallback } from 'react';
import { UploadCloud, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Language } from '@/lib/types';
import { translations } from '@/lib/translations';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  lang: Language;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  lang,
  disabled = false,
}) => {
  const t = translations[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateAndProcessFile = useCallback(
    (file: File) => {
      setErrorMessage(null);

      // Validate MIME type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!validTypes.includes(file.type.toLowerCase()) && !file.name.match(/\.(jpe?g|png|webp)$/i)) {
        setErrorMessage(t.errorInvalidType);
        return;
      }

      // Max size guard (15MB)
      if (file.size > 15 * 1024 * 1024) {
        setErrorMessage(lang === 'en' ? 'File too large. Please select an image under 15MB.' : 'फ़ाइल बहुत बड़ी है। कृपया 15MB से कम आकार की छवि चुनें।');
        return;
      }

      onImageSelected(file);
    },
    [lang, onImageSelected, t.errorInvalidType]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleClickZone = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={handleClickZone}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClickZone();
          }
        }}
        className={`relative cursor-pointer transition-all duration-300 rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center flex flex-col items-center justify-center group ${
          isDragOver
            ? 'border-saffron-500 bg-saffron-50/50 scale-[1.01]'
            : 'border-gray-300 hover:border-saffron-400 bg-white hover:bg-orange-50/20 shadow-soft'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />

        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-saffron-100 to-orange-100 flex items-center justify-center text-saffron-600 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
          <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-saffron-600" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 group-hover:text-saffron-600 transition-colors">
          {t.uploadTitle}
        </h3>
        <p className="text-sm text-gray-500 mb-3 max-w-sm">
          {t.uploadSubtitle}
        </p>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>{t.uploadHint}</span>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700 animate-fadeIn">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
