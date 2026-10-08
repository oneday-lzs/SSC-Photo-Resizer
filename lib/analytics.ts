// Analytics tracking utility for GA4
// Zero-dependency, safe if gtag is not available

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackUpload = (fileType: string, fileSizeKb: number) => {
  trackEvent('upload_image', {
    file_type: fileType,
    file_size_kb: Math.round(fileSizeKb),
  });
};

export const trackResizeSuccess = (params: {
  exam: string;
  width: number;
  height: number;
  sizeKB: number;
}) => {
  trackEvent('resize_success', {
    exam: params.exam,
    target_width: params.width,
    target_height: params.height,
    output_kb: params.sizeKB,
  });
};

export const trackDownload = (exam: string, format: string) => {
  trackEvent('download_image', {
    exam,
    format,
  });
};
