export type ExamCategory = 'upsc' | 'ssc' | 'ibps' | 'custom';

export type ImageKind = 'photo' | 'signature' | 'custom';

export interface ExamPreset {
  id: string;
  name: string;
  nameHi: string;
  category: ExamCategory;
  kind: ImageKind;
  targetWidth: number;
  targetHeight: number;
  minKb: number;
  maxKb: number;
  description: string;
  descriptionHi: string;
  defaultFilename: string;
  isPopular?: boolean;
}

export interface ProcessingOptions {
  targetWidth: number;
  targetHeight: number;
  minKb: number;
  maxKb: number;
  rotation?: number; // 0, 90, 180, 270
  backgroundColor?: string; // Default #FFFFFF for signatures and photos
}

export interface ProcessingResult {
  blob: Blob;
  previewUrl: string;
  width: number;
  height: number;
  sizeKb: number;
  quality: number;
  isSizeValid: boolean;
  paddedBytes?: number;
  errorMessage?: string;
}

export interface OriginalImageInfo {
  file: File;
  previewUrl: string;
  width: number;
  height: number;
  sizeKb: number;
  name: string;
}

export type Language = 'en' | 'hi';
