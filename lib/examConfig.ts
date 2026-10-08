import { Language } from './types';

export interface ExamSpecialRequirements {
  background: string;
  faceCoverage: string;
  clothingGlasses: string;
  signatureRules: string;
  photoDateRules: string;
  otherNotes: string;
}

export interface ExamFAQ {
  question: string;
  answer: string;
}

export interface ExamHowToStep {
  name: string;
  text: string;
}

export interface ExamLocaleContent {
  title: string;
  description: string;
  keywords: string[];
  name: string;
  shortName: string;
  officialOrg: string;
  photoDims: string;
  photoKb: string;
  sigDims: string;
  sigKb: string;
  specialRequirements: ExamSpecialRequirements;
  tips: string[];
  howToSteps: ExamHowToStep[];
  faqs: ExamFAQ[];
}

export interface ExamConfig {
  slug: string;
  shortName: string;
  defaultPresetId: string;
  photoWidth: number;
  photoHeight: number;
  photoMinKb: number;
  photoMaxKb: number;
  sigWidth: number;
  sigHeight: number;
  sigMinKb: number;
  sigMaxKb: number;
  format: string;
  aspectRatio: string;
  locales: Record<Language, ExamLocaleContent>;
}

export const EXAM_CONFIGS: Record<string, ExamConfig> = {
  upsc: {
    slug: 'upsc',
    shortName: 'UPSC',
    defaultPresetId: 'upsc-photo',
    photoWidth: 413,
    photoHeight: 531,
    photoMinKb: 20,
    photoMaxKb: 300,
    sigWidth: 140,
    sigHeight: 60,
    sigMinKb: 20,
    sigMaxKb: 300,
    format: 'JPG / JPEG only',
    aspectRatio: 'Photo: ~3:4 | Signature: ~7:3',
    locales: {
      en: {
        title: 'UPSC Photo Resizer 413x531 Pixels (20KB-300KB) – Free & Private',
        description:
          'Official UPSC photo resizer and signature compressor. Crop and resize photo to 413x531 pixels and signature to 140x60 pixels within 20KB - 300KB. 100% private in-browser tool.',
        keywords: [
          'UPSC photo resizer',
          'UPSC 413x531',
          'UPSC signature 140x60',
          'UPSC photo 20kb to 300kb',
          'UPSC signature padding',
          'compress UPSC photo',
          'UPSC CSE application photo resize',
        ],
        name: 'UPSC Civil Services, NDA & CDS',
        shortName: 'UPSC',
        officialOrg: 'Union Public Service Commission',
        photoDims: '413 × 531 pixels (Aspect Ratio ~3:4)',
        photoKb: '20 KB to 300 KB',
        sigDims: '140 × 60 pixels (Aspect Ratio ~7:3)',
        sigKb: '20 KB to 300 KB',
        specialRequirements: {
          background: 'Plain white or light grey background',
          faceCoverage: 'Candidate face must cover at least 3/4th (75%) of the frame',
          clothingGlasses: 'No caps or dark glasses; clear frontal pose with neutral expression',
          signatureRules: 'Black ink pen on clean white unruled paper; no CAPITAL letters',
          photoDateRules: 'Taken not older than 10 days from online application date',
          otherNotes: 'Automatic padding applied if signature file compresses to less than 20 KB',
        },
        tips: [
          'Ensure the face occupies at least 75% of the total photograph space without tilting.',
          'Always sign with a black ink pen on white paper—blue ink can cause portal OCR issues.',
          'Portals strictly reject signature files under 20 KB; our engine automatically injects standard JPEG padding if needed.',
          'Do not wear tinted glasses or caps; both ears must be clearly visible in frontal view.',
        ],
        howToSteps: [
          {
            name: 'Upload UPSC Photo or Scanned Signature',
            text: 'Select your photo or signature file from your smartphone camera or scanner.',
          },
          {
            name: 'Apply UPSC Preset (413x531 or 140x60)',
            text: 'The tool automatically assigns 413x531 pixels for photo or 140x60 pixels for signature.',
          },
          {
            name: 'Automated 20KB-300KB Local Compression',
            text: 'In-browser HTML5 Canvas crops to cover aspect ratio without distortion and iteratively checks file size.',
          },
          {
            name: 'Download Compliant JPEG',
            text: 'Save the official UPSC-ready JPEG directly to your device with zero server latency.',
          },
        ],
        faqs: [
          {
            question: 'What are the official dimensions and file size for UPSC photos in 2026?',
            answer:
              'The official recommended dimension is 413 pixels in width by 531 pixels in height (within 350x350 to 1000x1000 pixel range). The file size must be strictly between 20 KB and 300 KB in JPEG format.',
          },
          {
            question: 'Why does the UPSC portal reject my signature with "File size must be between 20 KB and 300 KB"?',
            answer:
              'Scanned signatures on white paper compress very efficiently, often resulting in small files between 5 KB and 15 KB. Since the UPSC server checks for a minimum of 20 KB, it rejects the file. Our resizer adds valid, standard-compliant JPEG metadata padding to ensure the final file size is safe and accepted.',
          },
          {
            question: 'Does the UPSC photo require candidate name and date printed on it?',
            answer:
              'Recent UPSC notifications advise that the photo must be taken within 10 days of the online application form submission. Crisp, clear passport-style photos without distortion are accepted on the One Time Registration (OTR) portal.',
          },
          {
            question: 'Can I upload a signature signed in capital letters for UPSC?',
            answer:
              'No. All government examination boards including UPSC disqualify applications if the signature is written in block/capital letters. Always upload your normal running handwriting signature.',
          },
          {
            question: 'Is it safe to resize my UPSC documents on this website?',
            answer:
              'Yes, 100% safe. This is a purely client-side tool running in your local browser memory. No photos, signatures, or personal records are ever transmitted across the internet or stored on any server.',
          },
        ],
      },
      hi: {
        title: 'UPSC फोटो रीसाइज़र 413x531 पिक्सल (20KB-300KB) – मुफ्त और निजी',
        description:
          'मुफ्त UPSC फोटो रीसाइज़र और हस्ताक्षर रीसाइज़ टूल। फोटो 413x531 पिक्सल और हस्ताक्षर 140x60 पिक्सल (20KB - 300KB) में बदलें। 100% सुरक्षित और स्थानीय ब्राउज़र प्रोसेसिंग।',
        keywords: [
          'UPSC फोटो रीसाइज़र',
          'UPSC हस्ताक्षर रीसाइज़र',
          '413x531',
          '20KB-300KB',
          'फोटो कंप्रेस',
          'UPSC फॉर्म फोटो',
          'हस्ताक्षर आकार 140x60',
        ],
        name: 'UPSC सिविल सेवा, NDA और CDS',
        shortName: 'UPSC',
        officialOrg: 'संघ लोक सेवा आयोग (UPSC)',
        photoDims: '413 × 531 पिक्सल (अनुपात ~3:4)',
        photoKb: '20 KB से 300 KB',
        sigDims: '140 × 60 पिक्सल (अनुपात ~7:3)',
        sigKb: '20 KB से 300 KB',
        specialRequirements: {
          background: 'सफेद या हल्की पृष्ठभूमि',
          faceCoverage: 'चेहरा फ्रेम के कम से कम 75% हिस्से को कवर करे',
          clothingGlasses: 'टोपी या चश्मा न पहनें; सामने का स्पष्ट दृश्य',
          signatureRules: 'सफेद सादे कागज पर काली स्याही का पेन; बड़े अक्षर (CAPITAL) वर्जित',
          photoDateRules: 'आवेदन की तारीख से 10 दिनों से अधिक पुरानी न हो',
          otherNotes: '20 KB से कम होने पर स्वचालित पैडिंग द्वारा आकार बढ़ाया जाता है',
        },
        tips: [
          'चेहरा बिना झुकाए फोटो के कम से कम 75% हिस्से में होना चाहिए।',
          'हस्ताक्षर हमेशा सफेद कागज पर काली स्याही से करें, नीली स्याही से बचें।',
          'पोर्टल 20 KB से छोटी फाइलें खारिज करता है; हमारा टूल जरूरत पड़ने पर ऑटो-पैडिंग करता है।',
          'चश्मा या टोपी न पहनें; दोनों कान साफ दिखाई देने चाहिए।',
        ],
        howToSteps: [
          {
            name: 'UPSC फोटो या हस्ताक्षर अपलोड करें',
            text: 'अपने फोन या कंप्यूटर से JPG, PNG या WEBP इमेज चुनें।',
          },
          {
            name: 'UPSC प्रीसेट चुनें (413x531 या 140x60)',
            text: 'टूल स्वचालित रूप से आधिकारिक आयाम और 20KB-300KB सीमा लागू कर देता है।',
          },
          {
            name: 'ब्राउज़र में तुरंत कंप्रेस करें',
            text: 'HTML5 Canvas बिना विकृति के आकार बदलता है और सटीक आकार तैयार करता है।',
          },
          {
            name: 'तैयार JPEG डाउनलोड करें',
            text: 'UPSC ऑनलाइन पोर्टल पर अपलोड करने के लिए तुरंत डाउनलोड करें।',
          },
        ],
        faqs: [
          {
            question: 'UPSC 2026 के लिए फोटो का आधिकारिक आकार और फाइल साइज क्या है?',
            answer:
              'फोटो का अनुशंसित आकार 413x531 पिक्सल (350x350 से 1000x1000 सीमा) और फाइल साइज 20 KB से 300 KB के बीच (JPEG प्रारूप में) होना अनिवार्य है।',
          },
          {
            question: 'UPSC पोर्टल हस्ताक्षर को "File size less than 20 KB" कहकर क्यों खारिज करता है?',
            answer:
              'सादे सफेद कागज पर हस्ताक्षर कंप्रेस होकर 5-15 KB तक छोटे हो जाते हैं। UPSC को न्यूनतम 20 KB चाहिए। हमारा टूल सुरक्षित मानक JPEG पैडिंग जोड़कर फाइल को 20 KB से अधिक का बनाता है।',
          },
          {
            question: 'क्या हस्ताक्षर बड़े अक्षरों (CAPITAL) में किए जा सकते हैं?',
            answer:
              'नहीं। सरकारी नियमों के अनुसार केवल सामान्य हस्तलिपि (Running hand) में हस्ताक्षर मान्य हैं। ब्लॉक लेटर्स खारिज हो जाते हैं।',
          },
          {
            question: 'क्या मेरी फोटो सर्वर पर अपलोड होती है?',
            answer:
              'बिल्कुल नहीं। सभी कार्य 100% आपके डिवाइस के ब्राउज़र में स्थानीय रूप से होते हैं। कोई डेटा सर्वर पर नहीं भेजा जाता।',
          },
          {
            question: 'क्या मैं मोबाइल फोन से फोटो रीसाइज़ कर सकता हूँ?',
            answer:
              'हाँ, यह टूल मोबाइल सफारी और क्रोम पर पूरी तरह काम करता है। आप फोन से फोटो खींचकर सीधे तैयार फाइल डाउनलोड कर सकते हैं।',
          },
        ],
      },
    },
  },
  ssc: {
    slug: 'ssc',
    shortName: 'SSC',
    defaultPresetId: 'ssc-photo',
    photoWidth: 100,
    photoHeight: 120,
    photoMinKb: 20,
    photoMaxKb: 50,
    sigWidth: 140,
    sigHeight: 60,
    sigMinKb: 10,
    sigMaxKb: 20,
    format: 'JPG / JPEG only',
    aspectRatio: 'Photo: ~5:6 | Signature: ~7:3',
    locales: {
      en: {
        title: 'SSC Photo Resizer 100x120 Pixels (20KB-50KB) – Free & Private',
        description:
          'Fast online tool to resize photos (100x120 px, 20-50 KB) and signatures (140x60 px, 10-20 KB) for SSC CGL, CHSL, MTS, and GD online application portals. 100% private.',
        keywords: [
          'SSC photo resizer',
          'SSC 100x120 pixels',
          'SSC signature 140x60',
          'SSC photo 20kb to 50kb',
          'SSC signature 10kb to 20kb',
          'compress SSC photo',
          'SSC CGL photo size converter',
        ],
        name: 'SSC (CGL, CHSL, MTS, GD Constable)',
        shortName: 'SSC',
        officialOrg: 'Staff Selection Commission',
        photoDims: '100 × 120 pixels (~3.5 cm width × 4.5 cm height)',
        photoKb: '20 KB to 50 KB',
        sigDims: '140 × 60 pixels (~4.0 cm width × 2.0 cm height)',
        sigKb: '10 KB to 20 KB',
        specialRequirements: {
          background: 'Light-colored or plain white background',
          faceCoverage: 'Clear frontal view without shadows; both ears distinctly visible',
          clothingGlasses: 'Strictly NO spectacles/glasses (glare issues) and NO caps/hats',
          signatureRules: 'Black or blue ink on white paper; signature must not be cropped',
          photoDateRules: 'Taken within the last 3 months with a neutral facial expression',
          otherNotes: 'Files exceeding 50 KB (photo) or 20 KB (signature) are rejected by SSC portal',
        },
        tips: [
          'SSC strictly rejects photographs taken with eye spectacles or sunglasses due to reflection glare.',
          'Keep the photo file strictly between 20 KB and 50 KB; outside this range causes immediate upload rejection.',
          'Sign within a horizontal rectangular box on white paper and scan without dark shadows.',
          'Ensure the aspect ratio matches 100x120 px without squishing or stretching your head.',
        ],
        howToSteps: [
          {
            name: 'Upload SSC Photograph or Signature',
            text: 'Upload your photo or signature scan directly from your device.',
          },
          {
            name: 'Select SSC Preset',
            text: 'Choose "SSC Photo" (100x120 px, 20-50 KB) or "SSC Signature" (140x60 px, 10-20 KB).',
          },
          {
            name: 'Automatic Resizing & KB Compression',
            text: 'The Canvas engine centers your image, crops without distortion, and adjusts JPEG quality into the legal KB limit.',
          },
          {
            name: 'Download Compliant JPEG',
            text: 'Download your ready-to-upload JPEG file and submit it into the SSC portal without errors.',
          },
        ],
        faqs: [
          {
            question: 'What are the required dimensions and file size for SSC photo?',
            answer:
              'For SSC examinations (CGL, CHSL, MTS, GD), photographs must be 100 pixels in width by 120 pixels in height (~3.5 cm x 4.5 cm), with a file size between 20 KB and 50 KB in JPEG format.',
          },
          {
            question: 'What is the SSC signature size in pixels and KB?',
            answer:
              'SSC requires signature images to be 140 pixels wide by 60 pixels high (~4.0 cm x 2.0 cm), with a file size strictly between 10 KB and 20 KB in JPEG format.',
          },
          {
            question: 'Can I wear eye glasses in the SSC examination photo?',
            answer:
              'No! Recent SSC recruitment notifications explicitly state that photographs of candidates wearing spectacles/glasses will be rejected outright, as glare can prevent facial recognition matching.',
          },
          {
            question: 'Why does the SSC portal reject candidate photos so often?',
            answer:
              'The most common reasons for SSC photo rejection are: wearing spectacles, wearing caps or masks, blurry selfies, background with scenery, and file size smaller than 20 KB or larger than 50 KB.',
          },
          {
            question: 'How do I compress my SSC photo to under 50 KB without losing clarity?',
            answer:
              'Our tool uses automated iterative compression. It starts with high quality and performs a binary search between 0.05 and 1.0 until the file lands exactly between 20 KB and 50 KB with maximum possible clarity.',
          },
        ],
      },
      hi: {
        title: 'SSC फोटो रीसाइज़र 100x120 पिक्सल (20KB-50KB) – मुफ्त और निजी',
        description:
          'SSC CGL, CHSL, MTS और GD के लिए फोटो (100x120 px, 20-50 KB) और हस्ताक्षर (140x60 px, 10-20 KB) को तुरंत रीसाइज़ और कंप्रेस करें। 100% सुरक्षित और मुफ्त।',
        keywords: [
          'SSC फोटो रीसाइज़र',
          'SSC 100x120 पिक्सल',
          'SSC हस्ताक्षर 140x60',
          'SSC फोटो 20kb से 50kb',
          'SSC हस्ताक्षर 10kb से 20kb',
          'SSC CGL फोटो साइज',
        ],
        name: 'SSC (CGL, CHSL, MTS, GD कांस्टेबल)',
        shortName: 'SSC',
        officialOrg: 'कर्मचारी चयन आयोग (SSC)',
        photoDims: '100 × 120 पिक्सल (~3.5 cm × 4.5 cm)',
        photoKb: '20 KB से 50 KB',
        sigDims: '140 × 60 पिक्सल (~4.0 cm × 2.0 cm)',
        sigKb: '10 KB से 20 KB',
        specialRequirements: {
          background: 'हल्की या सफेद पृष्ठभूमि',
          faceCoverage: 'चेहरे पर कोई छाया न हो; दोनों कान स्पष्ट दिखें',
          clothingGlasses: 'चश्मा और टोपी पूरी तरह प्रतिबंधित',
          signatureRules: 'सफेद कागज पर काली या नीली स्याही से साफ हस्ताक्षर',
          photoDateRules: 'पिछले 3 महीने के भीतर खींची गई हो',
          otherNotes: '50 KB (फोटो) या 20 KB (हस्ताक्षर) से बड़ी फाइलें अस्वीकार होती हैं',
        },
        tips: [
          'SSC चश्मे वाली तस्वीरों को तुरंत अस्वीकार कर देता है, बिना चश्मे के फोटो लें।',
          'फोटो का साइज 20 KB से 50 KB के बीच ही रखें।',
          'सफेद कागज पर साफ हस्ताक्षर करें और बिना छाया के स्कैन करें।',
          'चेहरा खिंचा हुआ या संकुचित नहीं होना चाहिए।',
        ],
        howToSteps: [
          {
            name: 'SSC फोटो या हस्ताक्षर अपलोड करें',
            text: 'अपने फोन या कंप्यूटर से फाइल चुनें।',
          },
          {
            name: 'SSC प्रीसेट चुनें',
            text: 'SSC Photo (100x120 px) या SSC Signature (140x60 px) चुनें।',
          },
          {
            name: 'स्वचालित रीसाइज़ और कम्प्रेशन',
            text: 'टूल आकार और KB सीमा को स्वचालित रूप से समायोजित करता है।',
          },
          {
            name: 'तैयार JPEG डाउनलोड करें',
            text: 'SSC पोर्टल पर अपलोड करने के लिए तुरंत डाउनलोड करें।',
          },
        ],
        faqs: [
          {
            question: 'SSC फोटो के लिए आवश्यक आकार क्या है?',
            answer:
              'SSC परीक्षाओं के लिए फोटो का आकार 100 x 120 पिक्सल और फाइल साइज 20 KB से 50 KB के बीच (JPEG) होना चाहिए।',
          },
          {
            question: 'SSC हस्ताक्षर का आकार क्या होना चाहिए?',
            answer:
              'हस्ताक्षर का आकार 140 x 60 पिक्सल और फाइल साइज 10 KB से 20 KB के बीच (JPEG) होना चाहिए।',
          },
          {
            question: 'क्या SSC फोटो में चश्मा पहन सकते हैं?',
            answer:
              'नहीं! SSC के नए नियमों के तहत चश्मा पहने हुए तस्वीरें सीधे खारिज कर दी जाती हैं।',
          },
          {
            question: 'SSC फॉर्म में फोटो क्यों खारिज होती है?',
            answer:
              'चश्मा पहनना, धुंधली सेल्फी, टोपी पहनना और गलत फाइल साइज (20-50 KB से बाहर) फोटो खारिज होने के मुख्य कारण हैं।',
          },
          {
            question: 'क्या मोबाइल से SSC फोटो रीसाइज़ कर सकते हैं?',
            answer:
              'हाँ, यह टूल मोबाइल ब्राउज़र पर पूरी तरह सुरक्षित और तुरंत काम करता है।',
          },
        ],
      },
    },
  },
  ibps: {
    slug: 'ibps',
    shortName: 'IBPS',
    defaultPresetId: 'ibps-photo',
    photoWidth: 200,
    photoHeight: 230,
    photoMinKb: 20,
    photoMaxKb: 50,
    sigWidth: 140,
    sigHeight: 60,
    sigMinKb: 10,
    sigMaxKb: 20,
    format: 'JPG / JPEG only',
    aspectRatio: 'Photo: ~20:23 | Signature: ~7:3',
    locales: {
      en: {
        title: 'IBPS Photo Resizer 200x230 Pixels (20KB-50KB) – Free & Private',
        description:
          'Resize photograph (200x230 px, 20-50 KB) and signature (140x60 px, 10-20 KB) for IBPS PO, Clerk, SO, RRB, and SBI online applications. 100% private, free tool.',
        keywords: [
          'IBPS photo resizer',
          'IBPS 200x230 pixels',
          'IBPS signature 140x60',
          'IBPS photo 20kb to 50kb',
          'SBI PO photo resizer',
          'Bank exam photo resize online',
          'compress IBPS photo',
        ],
        name: 'IBPS & SBI Banking Exams',
        shortName: 'IBPS',
        officialOrg: 'Institute of Banking Personnel Selection',
        photoDims: '200 × 230 pixels (~4.5 cm height × 3.5 cm width)',
        photoKb: '20 KB to 50 KB',
        sigDims: '140 × 60 pixels',
        sigKb: '10 KB to 20 KB',
        specialRequirements: {
          background: 'Preferably light or white background',
          faceCoverage: 'Clear frontal view looking directly at the camera with neutral face',
          clothingGlasses: 'No dark sunglasses; normal prescription glasses permitted if no flash reflection',
          signatureRules: 'Black ink on white paper; signature in CAPITAL LETTERS is strictly rejected',
          photoDateRules: 'Recent photograph taken in natural lighting',
          otherNotes: 'Thumb impression (240x240 px, 20-50 KB) also required during registration',
        },
        tips: [
          'IBPS strictly rejects signatures written in BLOCK / CAPITAL letters. Always use your running script.',
          'Ensure the photo file size does not exceed 50 KB, and signature does not exceed 20 KB.',
          'Look straight into the camera lens to avoid angled facial portraits.',
          'Use black ink pen for signature and left-hand thumb impression uploads.',
        ],
        howToSteps: [
          {
            name: 'Upload Banking Exam Photo or Signature',
            text: 'Select your photo or signature scan on desktop or mobile.',
          },
          {
            name: 'Select IBPS Preset',
            text: 'Pick "IBPS Photo" (200x230 px, 20-50 KB) or "IBPS Signature" (140x60 px, 10-20 KB).',
          },
          {
            name: 'Instant Aspect-Ratio Crop & Compression',
            text: 'The tool resizes the image to 200x230 or 140x60 without stretching and compresses into the legal KB limit.',
          },
          {
            name: 'Download Compliant JPEG',
            text: 'Download the optimized JPEG and upload directly into IBPS or SBI registration portals.',
          },
        ],
        faqs: [
          {
            question: 'What is the exact photo size required for IBPS PO, Clerk and SBI recruitment?',
            answer:
              'IBPS and SBI banking portals require photographs with dimensions of 200 pixels by 230 pixels (~4.5 cm x 3.5 cm), with a file size between 20 KB and 50 KB in JPEG format.',
          },
          {
            question: 'What are the signature requirements for IBPS examinations?',
            answer:
              'Signature dimensions must be 140 pixels wide by 60 pixels high, with a file size strictly between 10 KB and 20 KB in JPEG format, signed in black ink on white paper.',
          },
          {
            question: 'Can I upload a signature in all CAPITAL LETTERS for IBPS?',
            answer:
              'No! IBPS notifications explicitly state: "Signatures in CAPITAL LETTERS will NOT be accepted." Applications with block-letter signatures are disqualified.',
          },
          {
            question: 'What other documents must be uploaded for IBPS registration?',
            answer:
              'In addition to the photograph (200x230 px, 20-50 KB) and signature (140x60 px, 10-20 KB), banking portals require a Left Thumb Impression (240x240 px, 20-50 KB) and a handwritten declaration.',
          },
          {
            question: 'Can I resize photos directly from my smartphone for IBPS?',
            answer:
              'Yes, our tool is 100% mobile-friendly and runs locally on Safari and Chrome on mobile phones. You can snap or select photos from your gallery and download compliant JPEGs immediately.',
          },
        ],
      },
      hi: {
        title: 'IBPS फोटो रीसाइज़र 200x230 पिक्सल (20KB-50KB) – मुफ्त और निजी',
        description:
          'IBPS PO, क्लर्क, SO, RRB और SBI भर्ती के लिए फोटो (200x230 px, 20-50 KB) और हस्ताक्षर (140x60 px, 10-20 KB) को तुरंत रीसाइज़ करें। 100% मुफ्त और निजी।',
        keywords: [
          'IBPS फोटो रीसाइज़र',
          'IBPS 200x230 पिक्सल',
          'IBPS हस्ताक्षर 140x60',
          'IBPS फोटो 20kb से 50kb',
          'SBI PO फोटो साइज',
          'बैंक परीक्षा फोटो रीसाइज़',
        ],
        name: 'IBPS और SBI बैंक परीक्षाएं',
        shortName: 'IBPS',
        officialOrg: 'बैंकिंग कार्मिक चयन संस्थान (IBPS)',
        photoDims: '200 × 230 पिक्सल (~4.5 cm × 3.5 cm)',
        photoKb: '20 KB से 50 KB',
        sigDims: '140 × 60 पिक्सल',
        sigKb: '10 KB से 20 KB',
        specialRequirements: {
          background: 'सफेद या हल्की पृष्ठभूमि',
          faceCoverage: 'कैमरे की ओर सीधा मुख; तटस्थ भाव',
          clothingGlasses: 'काले चश्मे प्रतिबंधित; नजर का चश्मा बिना चमक के मान्य',
          signatureRules: 'सफेद कागज पर काली स्याही; बड़े अक्षर (CAPITAL) पूरी तरह वर्जित',
          photoDateRules: 'प्राकृतिक रोशनी में खींची गई हालिया फोटो',
          otherNotes: 'अंगूठे का निशान (240x240 px, 20-50 KB) भी आवश्यक है',
        },
        tips: [
          'IBPS बड़े अक्षरों (CAPITAL) में किए गए हस्ताक्षर सीधे खारिज करता है; सामान्य हस्तलिपि में ही हस्ताक्षर करें।',
          'फोटो का आकार 50 KB और हस्ताक्षर का आकार 20 KB से अधिक नहीं होना चाहिए।',
          'चेहरे की स्पष्टता बनाए रखें और साइड पोज़ से बचें।',
          'हस्ताक्षर और अंगूठे के निशान के लिए काली स्याही का ही उपयोग करें।',
        ],
        howToSteps: [
          {
            name: 'बैंक परीक्षा फोटो या हस्ताक्षर अपलोड करें',
            text: 'अपने फोन या कंप्यूटर से फाइल चुनें।',
          },
          {
            name: 'IBPS प्रीसेट चुनें',
            text: 'IBPS Photo (200x230 px) या IBPS Signature (140x60 px) चुनें।',
          },
          {
            name: 'स्वचालित अनुपात और कम्प्रेशन',
            text: 'बिना चेहरे को खींचे सही अनुपात और 20-50 KB सीमा में कंप्रेस होता है।',
          },
          {
            name: 'तैयार JPEG डाउनलोड करें',
            text: 'IBPS या SBI पंजीकरण पोर्टल पर सीधे अपलोड करें।',
          },
        ],
        faqs: [
          {
            question: 'IBPS PO और बैंक क्लर्क के लिए फोटो का आकार क्या है?',
            answer:
              'IBPS और SBI के लिए फोटो का आकार 200 x 230 पिक्सल और फाइल साइज 20 KB से 50 KB के बीच (JPEG) होना चाहिए।',
          },
          {
            question: 'IBPS हस्ताक्षर के नियम क्या हैं?',
            answer:
              'हस्ताक्षर 140 x 60 पिक्सल और 10 KB से 20 KB के बीच होने चाहिए। सफेद कागज पर काली स्याही से सामान्य लिखावट में साइन करें।',
          },
          {
            question: 'क्या IBPS में CAPITAL LETTERS में हस्ताक्षर कर सकते हैं?',
            answer:
              'नहीं! IBPS अधिसूचना में स्पष्ट लिखा है कि बड़े अक्षरों (CAPITAL) में हस्ताक्षर अस्वीकार्य हैं।',
          },
          {
            question: 'IBPS फॉर्म में और कौन से दस्तावेज अपलोड होते हैं?',
            answer:
              'फोटो और हस्ताक्षर के अलावा बाएं हाथ का अंगूठे का निशान (240x240 px, 20-50 KB) और हस्तलिखित घोषणा पत्र (Declaration) अपलोड करना होता है।',
          },
          {
            question: 'क्या यह टूल बैंक परीक्षाओं के लिए पूरी तरह मुफ्त है?',
            answer:
              'हाँ, यह 100% मुफ्त, सुरक्षित और बिना सर्वर अपलोड के सीधे आपके ब्राउज़र में काम करता है।',
          },
        ],
      },
    },
  },
};

export const SUPPORTED_LOCALES: Language[] = ['en', 'hi'];

export function getAllExamSlugs(): string[] {
  return Object.keys(EXAM_CONFIGS);
}

export function getExamConfig(slug: string): ExamConfig | undefined {
  return EXAM_CONFIGS[slug.toLowerCase()];
}

export function getExamLocaleContent(
  slug: string,
  locale: Language = 'en'
): ExamLocaleContent | undefined {
  const config = getExamConfig(slug);
  if (!config) return undefined;
  return config.locales[locale] || config.locales.en;
}

export function getOtherExams(
  currentSlug: string,
  locale: Language = 'en'
): Array<{ slug: string; content: ExamLocaleContent; config: ExamConfig }> {
  return Object.values(EXAM_CONFIGS)
    .filter((exam) => exam.slug.toLowerCase() !== currentSlug.toLowerCase())
    .map((exam) => ({
      slug: exam.slug,
      config: exam,
      content: exam.locales[locale] || exam.locales.en,
    }));
}
