'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PresetSelector } from '@/components/PresetSelector';
import { ImageUploader } from '@/components/ImageUploader';
import { PreviewCard } from '@/components/PreviewCard';
import { PRESETS } from '@/lib/presets';
import {
  ExamPreset,
  Language,
  OriginalImageInfo,
  ProcessingResult,
} from '@/lib/types';
import { loadImage, resizeAndCompress } from '@/lib/imageProcessing';
import { translations } from '@/lib/translations';
import { trackUpload, trackResizeSuccess, trackDownload } from '@/lib/analytics';

interface ResizerWidgetProps {
  initialPresetId?: string;
  initialLang?: Language;
}

export const ResizerWidget: React.FC<ResizerWidgetProps> = ({
  initialPresetId = 'upsc-photo',
  initialLang = 'en',
}) => {
  const [lang, setLang] = useState<Language>(initialLang);
  const defaultPreset =
    PRESETS.find((p) => p.id === initialPresetId) || PRESETS[0];

  const [selectedPreset, setSelectedPreset] = useState<ExamPreset>(defaultPreset);
  const [originalInfo, setOriginalInfo] = useState<OriginalImageInfo | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const t = translations[lang] || translations.en;

  // Run the core resizing & compression logic
  const processImage = useCallback(
    async (file: File, preset: ExamPreset, rotDeg: number) => {
      setIsProcessing(true);
      setError(null);

      try {
        const res = await resizeAndCompress(file, {
          targetWidth: preset.targetWidth,
          targetHeight: preset.targetHeight,
          minKb: preset.minKb,
          maxKb: preset.maxKb,
          rotation: rotDeg,
          backgroundColor: '#FFFFFF',
        });
        setResult(res);
        trackResizeSuccess({
          exam: preset.id,
          width: res.width,
          height: res.height,
          sizeKB: res.sizeKb,
        });
      } catch (err: unknown) {
        console.error('Image processing failed:', err);
        setError(t.errorProcessing);
      } finally {
        setIsProcessing(false);
      }
    },
    [t.errorProcessing]
  );

  // Handle new image upload
  const handleImageSelected = async (file: File) => {
    setError(null);
    try {
      const img = await loadImage(file);
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;
      const sizeKb = Math.round((file.size / 1024) * 10) / 10;
      const previewUrl = URL.createObjectURL(file);

      const info: OriginalImageInfo = {
        file,
        previewUrl,
        width,
        height,
        sizeKb,
        name: file.name,
      };

      setOriginalInfo(info);
      setRotation(0);
      trackUpload(file.type, sizeKb);

      // Auto process immediately
      await processImage(file, selectedPreset, 0);
    } catch (err: unknown) {
      console.error('Failed to load image', err);
      setError(t.errorLoadFailed);
    }
  };

  // Re-process when preset changes (if image already uploaded)
  const handleSelectPreset = (newPreset: ExamPreset) => {
    setSelectedPreset(newPreset);
    if (originalInfo) {
      processImage(originalInfo.file, newPreset, rotation);
    }
  };

  // Handle rotate 90 degrees
  const handleRotate = () => {
    if (!originalInfo) return;
    const nextRot = (rotation + 90) % 360;
    setRotation(nextRot);
    processImage(originalInfo.file, selectedPreset, nextRot);
  };

  // Handle reset to upload another image
  const handleReset = () => {
    if (originalInfo?.previewUrl) {
      URL.revokeObjectURL(originalInfo.previewUrl);
    }
    if (result?.previewUrl) {
      URL.revokeObjectURL(result.previewUrl);
    }
    setOriginalInfo(null);
    setResult(null);
    setRotation(0);
    setError(null);
  };

  // Handle download
  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result.previewUrl;
    link.download = selectedPreset.defaultFilename || 'upsc-resizer-image.jpg';
    trackDownload(selectedPreset.id, 'jpeg');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (originalInfo?.previewUrl) URL.revokeObjectURL(originalInfo.previewUrl);
      if (result?.previewUrl) URL.revokeObjectURL(result.previewUrl);
    };
  }, [originalInfo, result]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Error alert if any */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* Preset Selector */}
      <PresetSelector
        selectedPreset={selectedPreset}
        onSelectPreset={handleSelectPreset}
        lang={lang}
      />

      {/* Upload Area OR Preview/Download Area */}
      {!originalInfo ? (
        <ImageUploader onImageSelected={handleImageSelected} lang={lang} />
      ) : (
        <PreviewCard
          original={originalInfo}
          result={result}
          preset={selectedPreset}
          lang={lang}
          isProcessing={isProcessing}
          onRotate={handleRotate}
          onReset={handleReset}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default ResizerWidget;
