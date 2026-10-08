import { ProcessingOptions, ProcessingResult } from './types';

/**
 * Convert Canvas to Blob with given quality as a Promise
 */
function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas toBlob returned null'));
        }
      },
      'image/jpeg',
      quality
    );
  });
}

/**
 * Add a harmless JPEG COM (Comment) marker block after SOI (0xFF, 0xD8)
 * to safely increase JPEG file size to meet government minimum file size requirements (e.g. 20KB).
 * This maintains 100% JPEG standard compliance across all platforms and government upload checkers.
 */
async function padJpegBlob(blob: Blob, targetSizeBytes: number): Promise<Blob> {
  const currentSize = blob.size;
  if (currentSize >= targetSizeBytes) {
    return blob;
  }

  const neededBytes = targetSizeBytes - currentSize;
  const arrayBuffer = await blob.arrayBuffer();
  const originalBytes = new Uint8Array(arrayBuffer);

  // Check if standard JPEG SOI marker (0xFF, 0xD8) is present
  if (originalBytes.length < 2 || originalBytes[0] !== 0xff || originalBytes[1] !== 0xd8) {
    return blob; // Not standard JPEG, return as is
  }

  // A single JPEG COM marker can hold up to 65535 - 2 bytes.
  // We can create one or more COM markers.
  let remainingNeeded = neededBytes;
  const markerChunks: Uint8Array[] = [];

  const commentPrefix = 'UPSC_Photo_Resizer_Padding_Compliant_';

  while (remainingNeeded > 0) {
    // Each COM marker header takes 4 bytes: 0xFF, 0xFE, lengthHigh, lengthLow
    const headerSize = 4;
    const maxPayload = 65530;
    const payloadSize = Math.min(Math.max(remainingNeeded - headerSize, 1), maxPayload);
    const markerLength = payloadSize + 2; // Length includes the 2 length bytes

    const chunk = new Uint8Array(headerSize + payloadSize);
    chunk[0] = 0xff;
    chunk[1] = 0xfe; // COM marker
    chunk[2] = (markerLength >> 8) & 0xff;
    chunk[3] = markerLength & 0xff;

    // Fill with predictable character sequence
    for (let i = 0; i < payloadSize; i++) {
      chunk[headerSize + i] = commentPrefix.charCodeAt(i % commentPrefix.length);
    }

    markerChunks.push(chunk);
    remainingNeeded -= (headerSize + payloadSize);
  }

  // Combine SOI (2 bytes) + markerChunks + rest of original JPEG
  const totalMarkerSize = markerChunks.reduce((acc, curr) => acc + curr.length, 0);
  const resultBytes = new Uint8Array(originalBytes.length + totalMarkerSize);

  // Copy SOI (0xFF, 0xD8)
  resultBytes[0] = 0xff;
  resultBytes[1] = 0xd8;

  // Copy COM marker chunks
  let offset = 2;
  for (const chunk of markerChunks) {
    resultBytes.set(chunk, offset);
    offset += chunk.length;
  }

  // Copy remaining original JPEG bytes
  resultBytes.set(originalBytes.subarray(2), offset);

  return new Blob([resultBytes], { type: 'image/jpeg' });
}

/**
 * Load an image from File or URL into an HTMLImageElement
 */
export function loadImage(source: File | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error('Failed to load image: ' + e));

    if (typeof source === 'string') {
      img.src = source;
    } else {
      img.src = URL.createObjectURL(source);
    }
  });
}

/**
 * Perform centered cover crop, rotate, resize and iterative quality compression
 */
export async function resizeAndCompress(
  fileOrImg: File | HTMLImageElement,
  options: ProcessingOptions
): Promise<ProcessingResult> {
  const {
    targetWidth,
    targetHeight,
    minKb,
    maxKb,
    rotation = 0,
    backgroundColor = '#FFFFFF',
  } = options;

  let img: HTMLImageElement;
  if (fileOrImg instanceof HTMLImageElement) {
    img = fileOrImg;
  } else {
    img = await loadImage(fileOrImg);
  }

  // Source dimensions
  let srcWidth = img.naturalWidth || img.width;
  let srcHeight = img.naturalHeight || img.height;

  if (!srcWidth || !srcHeight) {
    throw new Error('Invalid image dimensions');
  }

  // Handle rotation by creating an oriented intermediate canvas if needed
  let sourceCanvas: HTMLCanvasElement | HTMLImageElement = img;

  if (rotation % 360 !== 0) {
    const rotCanvas = document.createElement('canvas');
    const rotCtx = rotCanvas.getContext('2d');
    if (!rotCtx) throw new Error('Could not get 2D canvas context');

    const rad = ((rotation % 360) * Math.PI) / 180;
    const is90or270 = Math.abs(rotation % 180) === 90;

    rotCanvas.width = is90or270 ? srcHeight : srcWidth;
    rotCanvas.height = is90or270 ? srcWidth : srcHeight;

    rotCtx.translate(rotCanvas.width / 2, rotCanvas.height / 2);
    rotCtx.rotate(rad);
    rotCtx.drawImage(img, -srcWidth / 2, -srcHeight / 2);

    sourceCanvas = rotCanvas;
    srcWidth = rotCanvas.width;
    srcHeight = rotCanvas.height;
  }

  // Target canvas
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not create canvas 2d context');
  }

  // Enable high-quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. Fill white background (crucial for transparent signatures to avoid black backgrounds in JPEG)
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  // 2. Calculate aspect ratios for center-crop (cover mode)
  const targetAspect = targetWidth / targetHeight;
  const sourceAspect = srcWidth / srcHeight;

  let cropX = 0;
  let cropY = 0;
  let cropWidth = srcWidth;
  let cropHeight = srcHeight;

  if (sourceAspect > targetAspect) {
    // Source is wider than target: crop left and right
    cropWidth = srcHeight * targetAspect;
    cropHeight = srcHeight;
    cropX = (srcWidth - cropWidth) / 2;
    cropY = 0;
  } else {
    // Source is taller than target: crop top and bottom
    cropWidth = srcWidth;
    cropHeight = srcWidth / targetAspect;
    cropX = 0;
    cropY = (srcHeight - cropHeight) / 2;
  }

  // 3. Draw cropped image onto target canvas
  ctx.drawImage(
    sourceCanvas,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    targetWidth,
    targetHeight
  );

  // 4. Binary search for optimal JPEG quality to match file size constraints
  const minBytes = minKb * 1024;
  const maxBytes = maxKb * 1024;

  let bestBlob: Blob | null = null;
  let bestQuality = 0.92;
  let lowQ = 0.05;
  let highQ = 0.98;

  // Check initial high quality
  let currentBlob = await canvasToBlob(canvas, highQ);

  if (currentBlob.size <= maxBytes && currentBlob.size >= minBytes) {
    bestBlob = currentBlob;
    bestQuality = highQ;
  } else if (currentBlob.size > maxBytes) {
    // Binary search for quality under maxBytes
    for (let iter = 0; iter < 8; iter++) {
      const midQ = (lowQ + highQ) / 2;
      currentBlob = await canvasToBlob(canvas, midQ);

      if (currentBlob.size > maxBytes) {
        highQ = midQ;
      } else {
        bestBlob = currentBlob;
        bestQuality = midQ;
        lowQ = midQ; // Try to get higher quality while still under max
      }
    }
  } else {
    // currentBlob.size < minBytes even at quality 0.98
    // Try absolute maximum quality 1.0
    currentBlob = await canvasToBlob(canvas, 1.0);
    bestBlob = currentBlob;
    bestQuality = 1.0;
  }

  if (!bestBlob) {
    bestBlob = currentBlob;
  }

  let paddedBytes = 0;

  // 5. If file size is still smaller than minKb (e.g. signature on blank white canvas),
  // apply standard JPEG compliant padding to hit minKb + safety margin.
  if (bestBlob.size < minBytes) {
    const targetPaddedBytes = minBytes + 1024; // minKb + 1KB buffer
    const originalSize = bestBlob.size;
    bestBlob = await padJpegBlob(bestBlob, targetPaddedBytes);
    paddedBytes = bestBlob.size - originalSize;
  }

  const finalSizeKb = Math.round((bestBlob.size / 1024) * 10) / 10;
  const isSizeValid = finalSizeKb >= minKb && finalSizeKb <= maxKb;

  const previewUrl = URL.createObjectURL(bestBlob);

  return {
    blob: bestBlob,
    previewUrl,
    width: targetWidth,
    height: targetHeight,
    sizeKb: finalSizeKb,
    quality: Math.round(bestQuality * 100) / 100,
    isSizeValid,
    paddedBytes,
  };
}
