'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Download, Loader2, Camera, CheckCircle, Share2, Copy, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import RTPPreview from '@/components/RTPPreview';
import { WEBSITES, RTP_STYLES, BACKGROUND_CATEGORIES, GAMES_PRAGMATIC, GAMES_PGSOFT, LAYOUT_OPTIONS, TEXTURE_OPTIONS, CARD_STYLE_OPTIONS } from '@/data/games';
import { WebsiteOption, RTPStyle, Game, LayoutOption, TextureOption, CardStyleOption, TrikConfig } from '@/types';

export default function Home() {
  const [selectedWebsite, setSelectedWebsite] = useState<WebsiteOption>(WEBSITES[0]);
  const [selectedStyle, setSelectedStyle] = useState<RTPStyle>(RTP_STYLES[0]);
  const [customTimeLabel, setCustomTimeLabel] = useState<string>('18:00 - 00:00 WIB');
  const [selectedBackground, setSelectedBackground] = useState<string>(BACKGROUND_CATEGORIES[0].backgrounds[0]);
  const [selectedTexture, setSelectedTexture] = useState<TextureOption>(TEXTURE_OPTIONS[0]);
  const [pragmaticCount, setPragmaticCount] = useState<number>(8);
  const [pgSoftCount, setPgSoftCount] = useState<number>(8);
  const [selectedLayout, setSelectedLayout] = useState<LayoutOption>(LAYOUT_OPTIONS[0]);
  const [selectedCardStyle, setSelectedCardStyle] = useState<CardStyleOption>(CARD_STYLE_OPTIONS[0]);

  // Download states
  const previewRef = useRef<HTMLDivElement>(null);
  const [cachedImage, setCachedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'processing' | 'ready'>('idle');

  // Modern screenshot features - Browser capabilities
  const [browserCapabilities, setBrowserCapabilities] = useState({
    clipboard: false,
    webShare: false,
    html2canvas: true, // assumed available via npm
  });

  // Notification state
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Check browser capabilities on mount
  useEffect(() => {
    const checkCapabilities = () => {
      // Check Clipboard API support
      const hasClipboard = !!(navigator.clipboard && navigator.clipboard.write);

      // Check Web Share API support
      const hasWebShare = !!(navigator.share && navigator.canShare);

      setBrowserCapabilities({
        clipboard: hasClipboard,
        webShare: hasWebShare,
        html2canvas: true,
      });
    };

    checkCapabilities();
  }, []);

  // Show notification helper
  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // States untuk Trik Modal
  const defaultTrikConfig: TrikConfig = {
    enabled: false,
    title: 'TRIK GACOR',
    fontSize: 'md',
    depositKode: '7777',
    putaranBetMin: 100,
    putaranBetMax: 2000,
    fiturGanda: true,
    trikItems: [
      { name: 'Otomatis Cepat', value: '10x', pattern: 'XVV' },
      { name: 'Manual Spin', value: '33x', pattern: 'VXV' },
      { name: 'Otomatis Turbo', value: '30x', pattern: 'VVX' },
      { name: 'Buyspin', value: 'Sesuai Betting', pattern: 'VVV' },
    ],
    customText: 'IKUTI TRIK & KODE UNIK UNTUK MENCAPAI JACKPOT MAXIMAL!'
  };

  const [pragmaticTrik, setPragmaticTrik] = useState<TrikConfig>(defaultTrikConfig);
  const [pgSoftTrik, setPgSoftTrik] = useState<TrikConfig>(defaultTrikConfig);

  // States untuk menyimpan game yang sudah terpilih
  const [selectedPragmaticGames, setSelectedPragmaticGames] = useState<Game[]>([]);
  const [selectedPgSoftGames, setSelectedPgSoftGames] = useState<Game[]>([]);

  // Generate random games saat pertama kali atau saat count berubah
  const generateRandomGames = useCallback(() => {
    const shuffledPragmatic = [...GAMES_PRAGMATIC].sort(() => Math.random() - 0.5);
    const shuffledPgSoft = [...GAMES_PGSOFT].sort(() => Math.random() - 0.5);

    setSelectedPragmaticGames(shuffledPragmatic.slice(0, pragmaticCount));
    setSelectedPgSoftGames(shuffledPgSoft.slice(0, pgSoftCount));
  }, [pragmaticCount, pgSoftCount]);

  // Generate games saat pertama kali load
  useEffect(() => {
    generateRandomGames();
  }, [generateRandomGames]);

  // Shuffle functions
  const shuffleGames = () => {
    generateRandomGames();
  };

  // Reset cached image when settings change
  useEffect(() => {
    setCachedImage(null);
    setDownloadStatus('idle');
  }, [selectedWebsite, selectedStyle, selectedBackground, selectedTexture, selectedLayout, selectedCardStyle, pragmaticCount, pgSoftCount, selectedPragmaticGames, selectedPgSoftGames, customTimeLabel, pragmaticTrik, pgSoftTrik]);

  // Convert image URL to base64 via proxy
  const imageToBase64 = async (url: string): Promise<string> => {
    try {
      const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('Failed to fetch image');
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image:', error);
      return url; // Return original URL as fallback
    }
  };

  // State for converted background
  const [convertedBackground, setConvertedBackground] = useState<string | null>(null);
  const [isBackgroundConverting, setIsBackgroundConverting] = useState(false);

  // Pre-convert background when it changes
  useEffect(() => {
    const convertBackground = async () => {
      if (selectedBackground && (selectedBackground.startsWith('http') || selectedBackground.startsWith('//'))) {
        setIsBackgroundConverting(true);
        try {
          const base64 = await imageToBase64(selectedBackground);
          setConvertedBackground(base64);
        } catch (e) {
          console.error('Failed to pre-convert background:', e);
          setConvertedBackground(null);
        } finally {
          setIsBackgroundConverting(false);
        }
      } else {
        setConvertedBackground(selectedBackground);
      }
    };
    convertBackground();
  }, [selectedBackground]);

  // Prepare image for download
  const prepareImage = async () => {
    if (!previewRef.current) return;

    setIsProcessing(true);
    setDownloadStatus('processing');

    try {
      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default;

      // Get the preview element
      const element = previewRef.current;

      // Store original values for restoration
      const originalSrcs: Map<HTMLImageElement, string> = new Map();
      const originalBgs: Map<HTMLElement, string> = new Map();
      const originalTransforms: Map<HTMLElement, string> = new Map();
      const originalZooms: Map<HTMLElement, string> = new Map();

      // Helper function to extract URL from background-image
      const extractBgUrl = (bgImage: string): string | null => {
        const match = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
        return match ? match[1] : null;
      };

      // Helper function to check if URL is external
      const isExternalUrl = (url: string): boolean => {
        return url.startsWith('http') || url.startsWith('//');
      };

      // ANTI-WARPING FIX #1: Reset transform and zoom on main element
      const originalMainTransform = element.style.transform;
      const originalMainZoom = element.style.zoom;
      element.style.transform = 'none';
      element.style.zoom = '1';
      originalTransforms.set(element, originalMainTransform);
      originalZooms.set(element, originalMainZoom);

      // ANTI-WARPING FIX #2: Reset transform and zoom on ALL child elements
      const allElements = element.querySelectorAll('*');
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const computedStyle = window.getComputedStyle(htmlEl);

        // Only reset if transform is not 'none'
        if (computedStyle.transform && computedStyle.transform !== 'none') {
          originalTransforms.set(htmlEl, htmlEl.style.transform || '');
          htmlEl.style.transform = 'none';
        }

        // Reset zoom if it exists
        const zoomValue = (htmlEl.style as { zoom?: string }).zoom;
        if (zoomValue && zoomValue !== '1' && zoomValue !== '') {
          originalZooms.set(htmlEl, zoomValue);
          (htmlEl.style as { zoom: string }).zoom = '1';
        }
      });

      // 1. Set the main background to converted base64 version
      const originalMainBg = element.style.backgroundImage;
      if (convertedBackground) {
        element.style.backgroundImage = `url("${convertedBackground}")`;
        originalBgs.set(element, originalMainBg);
      }

      // 2. Find ALL elements with background images (including nested ones)
      await Promise.all(
        Array.from(allElements).map(async (el) => {
          const htmlEl = el as HTMLElement;

          // Check inline style
          const inlineBg = htmlEl.style.backgroundImage;
          if (inlineBg && inlineBg !== 'none' && inlineBg !== '') {
            const url = extractBgUrl(inlineBg);
            if (url && isExternalUrl(url)) {
              if (!originalBgs.has(htmlEl)) {
                originalBgs.set(htmlEl, inlineBg);
              }
              try {
                const base64 = await imageToBase64(url);
                htmlEl.style.backgroundImage = `url("${base64}")`;
              } catch (e) {
                console.error('Failed to convert background:', url, e);
              }
            }
          }

          // Check computed style (for backgrounds set via CSS classes)
          const computedStyle = window.getComputedStyle(htmlEl);
          const computedBg = computedStyle.backgroundImage;
          if (computedBg && computedBg !== 'none' && !originalBgs.has(htmlEl)) {
            const url = extractBgUrl(computedBg);
            if (url && isExternalUrl(url)) {
              originalBgs.set(htmlEl, htmlEl.style.backgroundImage || '');
              try {
                const base64 = await imageToBase64(url);
                htmlEl.style.backgroundImage = `url("${base64}")`;
              } catch (e) {
                console.error('Failed to convert computed background:', url, e);
              }
            }
          }
        })
      );

      // 3. Convert all img elements
      const images = element.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(async (img) => {
          const src = img.src;
          if (src && isExternalUrl(src)) {
            originalSrcs.set(img, src);
            try {
              const base64 = await imageToBase64(src);
              img.src = base64;
              // Wait for image to load
              await new Promise<void>((resolve) => {
                if (img.complete) {
                  resolve();
                } else {
                  img.onload = () => resolve();
                  img.onerror = () => resolve();
                }
              });
            } catch (e) {
              console.error('Failed to convert image:', src, e);
            }
          }
        })
      );

      // Wait for fonts to be ready
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      // CRITICAL FIX: Validate all images before html2canvas
      // This prevents "canvas with width/height 0" error
      const allImages = element.querySelectorAll('img');
      await Promise.all(
        Array.from(allImages).map(async (img) => {
          // Wait for image to load
          if (!img.complete) {
            await new Promise<void>((resolve) => {
              img.onload = () => resolve();
              img.onerror = () => resolve(); // Resolve even on error
            });
          }

          // Validate image dimensions
          if (img.naturalWidth === 0 || img.naturalHeight === 0) {
            console.warn('Invalid image dimension:', img.src);
            // Set minimum dimension to prevent canvas error
            img.style.minWidth = '1px';
            img.style.minHeight = '1px';
          }
        })
      );

      // Validate all canvas elements
      const allCanvases = element.querySelectorAll('canvas');
      allCanvases.forEach((canvas) => {
        if (canvas.width === 0 || canvas.height === 0) {
          console.warn('Invalid canvas dimension');
          canvas.width = 1;
          canvas.height = 1;
        }
      });

      // Wait for all images to be fully loaded
      await new Promise(resolve => setTimeout(resolve, 1500));

      // ANTI-WARPING FIX #3: Use devicePixelRatio for better quality
      const optimalScale = window.devicePixelRatio || 2;

      // Render with html2canvas (MOST STABLE CONFIG from warping.txt)
      const canvas = await html2canvas(element, {
        scale: optimalScale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: selectedStyle.backgroundColor || '#000000',
        logging: false,
        imageTimeout: 60000,
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: -window.scrollY,
        removeContainer: true,
        // CRITICAL: Ignore elements that might cause canvas error
        ignoreElements: (element) => {
          // Ignore floating action buttons
          if (element instanceof HTMLElement) {
            if (element.getAttribute('data-screenshot-ignore') === 'true') {
              return true;
            }
            // Also ignore if parent has data-screenshot-ignore
            if (element.closest('[data-screenshot-ignore="true"]')) {
              return true;
            }
          }

          // Ignore any element with 0 dimensions
          if (element instanceof HTMLElement) {
            const rect = element.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) {
              console.warn('Ignoring element with 0 dimension:', element);
              return true;
            }
          }
          // Ignore canvas elements with 0 dimension
          if (element instanceof HTMLCanvasElement) {
            if (element.width === 0 || element.height === 0) {
              console.warn('Ignoring canvas with 0 dimension');
              return true;
            }
          }
          return false;
        },
        onclone: (clonedDoc) => {
          // ANTI-WARPING FIX #4: Reset transform and zoom in cloned doc
          const allClonedElements = clonedDoc.querySelectorAll('*');
          allClonedElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.transform = 'none';
            (htmlEl.style as { zoom: string }).zoom = '1';
          });

          // Ensure cloned element has correct background
          const clonedElement = clonedDoc.querySelector('[data-preview-container]') as HTMLElement;
          if (clonedElement && convertedBackground) {
            clonedElement.style.backgroundImage = `url("${convertedBackground}")`;
            clonedElement.style.backgroundSize = '100% 100%';
            clonedElement.style.backgroundPosition = 'center';
            clonedElement.style.backgroundRepeat = 'no-repeat';
          }

          // Fix text overflow issues - apply explicit styles to all truncate elements
          const allTextElements = clonedDoc.querySelectorAll('.truncate, [class*="truncate"]');
          allTextElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.whiteSpace = 'nowrap';
            htmlEl.style.overflow = 'hidden';
            htmlEl.style.textOverflow = 'ellipsis';
          });

          // Fix game title h3 elements only (with data-game-title attribute)
          const gameTitles = clonedDoc.querySelectorAll('[data-game-title="true"]');
          gameTitles.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.overflow = 'hidden';
            htmlEl.style.height = '42px';
            htmlEl.style.lineHeight = '14px';
            htmlEl.style.whiteSpace = 'normal';
            htmlEl.style.wordWrap = 'break-word';
          });

          // Fix absolute positioned elements (RTP badges, etc)
          const absoluteElements = clonedDoc.querySelectorAll('.absolute');
          absoluteElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const computedStyle = window.getComputedStyle(htmlEl);
            // Ensure absolute positioning is preserved
            if (computedStyle.position === 'absolute') {
              htmlEl.style.position = 'absolute';
              // Preserve top/right positioning for badges
              if (computedStyle.top) htmlEl.style.top = computedStyle.top;
              if (computedStyle.right) htmlEl.style.right = computedStyle.right;
            }
          });

          // Fix relative containers
          const relativeElements = clonedDoc.querySelectorAll('.relative');
          relativeElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.position = 'relative';
          });

          // Ensure monospace font is applied
          const monoElements = clonedDoc.querySelectorAll('.font-mono, [class*="font-mono"]');
          monoElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.fontFamily = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';
          });

          // CRITICAL FIX: Validate and fix images in cloned document
          // This prevents "canvas with width/height 0" error
          const clonedImages = clonedDoc.querySelectorAll('img');
          clonedImages.forEach((img) => {
            const htmlImg = img as HTMLImageElement;
            // Validate image dimensions
            if (htmlImg.naturalWidth === 0 || htmlImg.naturalHeight === 0) {
              console.warn('Cloned image has 0 dimension, fixing:', htmlImg.src);
              // Set minimum dimension
              htmlImg.style.minWidth = '1px';
              htmlImg.style.minHeight = '1px';
              htmlImg.style.width = '100px'; // Fallback dimension
              htmlImg.style.height = '100px';
            }
          });

          // CRITICAL FIX: Validate canvas elements in cloned document
          const clonedCanvases = clonedDoc.querySelectorAll('canvas');
          clonedCanvases.forEach((canvas) => {
            const htmlCanvas = canvas as HTMLCanvasElement;
            if (htmlCanvas.width === 0 || htmlCanvas.height === 0) {
              console.warn('Cloned canvas has 0 dimension, fixing');
              htmlCanvas.width = 1;
              htmlCanvas.height = 1;
            }
          });

          // CRITICAL FIX: Preserve CSS Grid and Flexbox layouts
          // This prevents layout collapse in screenshot
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const computedStyle = window.getComputedStyle(htmlEl);

            // Preserve FLEX layout (critical for game grid)
            if (computedStyle.display === 'flex' || computedStyle.display === 'inline-flex') {
              htmlEl.style.display = computedStyle.display;
              htmlEl.style.flexDirection = computedStyle.flexDirection;
              htmlEl.style.flexWrap = computedStyle.flexWrap;
              htmlEl.style.justifyContent = computedStyle.justifyContent;
              htmlEl.style.alignItems = computedStyle.alignItems;
              htmlEl.style.gap = computedStyle.gap;
            }

            // Preserve GRID layout
            if (computedStyle.display === 'grid' || computedStyle.display === 'inline-grid') {
              htmlEl.style.display = computedStyle.display;
              htmlEl.style.gridTemplateColumns = computedStyle.gridTemplateColumns;
              htmlEl.style.gridTemplateRows = computedStyle.gridTemplateRows;
              htmlEl.style.gap = computedStyle.gap;
            }

            // Force game card dimensions (prevent collapse)
            // Game cards typically have fixed width
            if (htmlEl.classList.contains('w-[180px]') ||
                computedStyle.width === '180px' ||
                (htmlEl.parentElement && htmlEl.parentElement.classList.contains('gap-4'))) {
              const width = computedStyle.width;
              const height = computedStyle.height;
              if (width && width !== 'auto') htmlEl.style.width = width;
              if (height && height !== 'auto') htmlEl.style.height = height;
              htmlEl.style.minWidth = width || '180px';
              htmlEl.style.flexShrink = '0'; // Prevent flex shrinking
            }
          });

          // ANTI-WARPING FIX #5: Force perfect centering for ALL badge-like elements
          // This ensures RTP badges and "X Games" badges are perfectly centered
          const allDivs = clonedDoc.querySelectorAll('div');
          allDivs.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const computedStyle = window.getComputedStyle(htmlEl);

            // Special handling for rounded-full elements (likely badges)
            if (computedStyle.borderRadius &&
                (computedStyle.borderRadius === '9999px' ||
                 parseFloat(computedStyle.borderRadius) > 50)) {
              // Don't override if already set above
              if (!htmlEl.style.display) {
                htmlEl.style.display = 'inline-flex';
                htmlEl.style.alignItems = 'center';
                htmlEl.style.justifyContent = 'center';
              }
              htmlEl.style.lineHeight = '1';
              htmlEl.style.textAlign = 'center';
              htmlEl.style.verticalAlign = 'middle';
              htmlEl.style.whiteSpace = 'nowrap';
            }
          });
        }
      });

      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      setCachedImage(dataUrl);
      setDownloadStatus('ready');

      // Restore original sources
      originalSrcs.forEach((src, img) => {
        img.src = src;
      });
      originalBgs.forEach((bg, el) => {
        el.style.backgroundImage = bg;
      });

      // Restore original transforms and zooms (ANTI-WARPING)
      originalTransforms.forEach((transform, el) => {
        el.style.transform = transform;
      });
      originalZooms.forEach((zoom, el) => {
        (el.style as { zoom: string }).zoom = zoom;
      });

    } catch (error) {
      console.error('Error preparing image:', error);
      setDownloadStatus('idle');

      // Provide more helpful error message
      let errorMessage = 'Gagal memproses gambar. ';
      if (error instanceof Error) {
        if (error.message.includes('canvas') && error.message.includes('width or height of 0')) {
          errorMessage += 'Ada elemen dengan ukuran 0. Coba refresh halaman dan tunggu semua gambar selesai load sebelum klik "Prepare Image".';
        } else if (error.message.includes('tainted')) {
          errorMessage += 'Ada gambar dari domain external yang tidak bisa diakses. Coba pilih background lain.';
        } else {
          errorMessage += error.message;
        }
      } else {
        errorMessage += 'Silakan coba lagi.';
      }

      showNotification('error', errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Download the cached image
  const downloadImage = () => {
    if (!cachedImage) return;

    const link = document.createElement('a');
    link.download = `RTP-${selectedWebsite.name}-${new Date().toISOString().split('T')[0]}.png`;
    link.href = cachedImage;
    link.click();
    showNotification('success', 'Gambar berhasil didownload!');
  };

  // Modern Feature: Copy to Clipboard
  const copyToClipboard = async () => {
    if (!cachedImage) {
      showNotification('error', 'Silakan prepare image terlebih dahulu');
      return;
    }

    if (!browserCapabilities.clipboard) {
      showNotification('error', 'Browser Anda tidak mendukung fitur copy to clipboard');
      return;
    }

    try {
      // Convert base64 to blob
      const response = await fetch(cachedImage);
      const blob = await response.blob();

      // Create ClipboardItem
      const clipboardItem = new ClipboardItem({ 'image/png': blob });

      // Write to clipboard
      await navigator.clipboard.write([clipboardItem]);
      showNotification('success', 'Gambar berhasil dicopy ke clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      showNotification('error', 'Gagal copy ke clipboard. Coba gunakan download.');
    }
  };

  // Modern Feature: Share via Web Share API
  const shareImage = async () => {
    if (!cachedImage) {
      showNotification('error', 'Silakan prepare image terlebih dahulu');
      return;
    }

    if (!browserCapabilities.webShare) {
      showNotification('error', 'Browser Anda tidak mendukung fitur share');
      return;
    }

    try {
      // Convert base64 to blob
      const response = await fetch(cachedImage);
      const blob = await response.blob();

      // Create File object
      const file = new File(
        [blob],
        `RTP-${selectedWebsite.name}-${new Date().toISOString().split('T')[0]}.png`,
        { type: 'image/png' }
      );

      // Check if we can share this
      if (navigator.canShare && !navigator.canShare({ files: [file] })) {
        showNotification('error', 'Browser Anda tidak dapat share file gambar');
        return;
      }

      // Share the file
      await navigator.share({
        title: `RTP Live ${selectedWebsite.name}`,
        text: `RTP Live untuk ${selectedWebsite.name}`,
        files: [file],
      });

      showNotification('success', 'Gambar berhasil dishare!');
    } catch (error: unknown) {
      // Check if user cancelled the share
      if (error instanceof Error && error.name === 'AbortError') {
        showNotification('info', 'Share dibatalkan');
      } else {
        console.error('Error sharing:', error);
        showNotification('error', 'Gagal share gambar. Coba gunakan download.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl animate-slide-in-right flex items-center gap-3 max-w-md ${
          notification.type === 'success' ? 'bg-green-600 text-white' :
          notification.type === 'error' ? 'bg-red-600 text-white' :
          'bg-blue-600 text-white'
        }`}>
          {notification.type === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
          {notification.type === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          {notification.type === 'info' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Header
          selectedWebsite={selectedWebsite}
          onWebsiteChange={setSelectedWebsite}
          onShuffleGames={shuffleGames}
          selectedBackground={selectedBackground}
          onBackgroundChange={setSelectedBackground}
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          selectedTexture={selectedTexture}
          onTextureChange={setSelectedTexture}
          pragmaticCount={pragmaticCount}
          pgSoftCount={pgSoftCount}
          onPragmaticCountChange={setPragmaticCount}
          onPgSoftCountChange={setPgSoftCount}
          selectedLayout={selectedLayout}
          onLayoutChange={setSelectedLayout}
          customTimeLabel={customTimeLabel}
          onCustomTimeLabelChange={setCustomTimeLabel}
          selectedCardStyle={selectedCardStyle}
          onCardStyleChange={setSelectedCardStyle}
          pragmaticTrik={pragmaticTrik}
          onPragmaticTrikChange={setPragmaticTrik}
          pgSoftTrik={pgSoftTrik}
          onPgSoftTrikChange={setPgSoftTrik}
        />

        {/* Main Content */}
        <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-400">
              RTP Live Generator
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Generate gambar RTP Live untuk website Anda
            </p>
          </div>

          {/* Browser Compatibility Status */}
          <div className="mb-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Status Kompatibilitas Browser
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${browserCapabilities.html2canvas ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-gray-300">Screenshot (html2canvas): </span>
                <span className={browserCapabilities.html2canvas ? 'text-green-400' : 'text-red-400'}>
                  {browserCapabilities.html2canvas ? '✓ Supported' : '✗ Not Supported'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${browserCapabilities.clipboard ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <span className="text-gray-300">Copy to Clipboard: </span>
                <span className={browserCapabilities.clipboard ? 'text-green-400' : 'text-yellow-400'}>
                  {browserCapabilities.clipboard ? '✓ Supported' : '✗ Not Supported'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${browserCapabilities.webShare ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <span className="text-gray-300">Web Share API: </span>
                <span className={browserCapabilities.webShare ? 'text-green-400' : 'text-yellow-400'}>
                  {browserCapabilities.webShare ? '✓ Supported' : '✗ Not Supported'}
                </span>
              </div>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            {/* Background conversion status */}
            {isBackgroundConverting && (
              <div className="flex items-center gap-2 text-yellow-400 text-sm mb-4">
                <Loader2 className="w-4 h-4 animate-spin" />
                Memuat background...
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <button
                onClick={prepareImage}
                disabled={isProcessing || isBackgroundConverting}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  isProcessing || isBackgroundConverting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : downloadStatus === 'ready'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Memproses...
                  </>
                ) : downloadStatus === 'ready' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Siap Download
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    Prepare Image
                  </>
                )}
              </button>

              <button
                onClick={downloadImage}
                disabled={!cachedImage || isProcessing}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  cachedImage && !isProcessing
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Download className="w-5 h-5" />
                Download PNG
              </button>

              {/* Modern Screenshot Features */}
              <button
                onClick={copyToClipboard}
                disabled={!cachedImage || isProcessing || !browserCapabilities.clipboard}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  cachedImage && !isProcessing && browserCapabilities.clipboard
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
                title={!browserCapabilities.clipboard ? 'Browser tidak mendukung copy to clipboard' : 'Copy gambar ke clipboard'}
              >
                <Copy className="w-5 h-5" />
                Copy to Clipboard
              </button>

              <button
                onClick={shareImage}
                disabled={!cachedImage || isProcessing || !browserCapabilities.webShare}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  cachedImage && !isProcessing && browserCapabilities.webShare
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
                title={!browserCapabilities.webShare ? 'Browser tidak mendukung Web Share API' : 'Share gambar via Web Share API'}
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Status Messages */}
            <div className="space-y-2">
              {downloadStatus === 'ready' && (
                <div className="text-green-400 text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Gambar siap didownload, dicopy, atau dishare
                </div>
              )}

              {downloadStatus === 'idle' && !isBackgroundConverting && (
                <div className="text-gray-400 text-sm">
                  Klik "Prepare Image" untuk menyiapkan gambar
                </div>
              )}

              {!browserCapabilities.clipboard && !browserCapabilities.webShare && (
                <div className="text-yellow-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Beberapa fitur modern tidak tersedia di browser Anda. Gunakan browser terbaru untuk pengalaman terbaik.
                </div>
              )}
            </div>
          </div>

          {/* Cached Image Preview */}
          {cachedImage && (
            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-green-400 mb-3">Preview Hasil:</h3>
              <div className="max-h-96 overflow-auto rounded-lg border border-gray-700">
                <img src={cachedImage} alt="Preview" className="w-full" />
              </div>
            </div>
          )}

          {/* RTP Preview */}
          <div className="overflow-x-auto">
            <RTPPreview
              ref={previewRef}
              selectedWebsite={selectedWebsite}
              selectedStyle={selectedStyle}
              customTimeLabel={customTimeLabel}
              selectedBackground={selectedBackground}
              selectedTexture={selectedTexture}
              pragmaticCount={pragmaticCount}
              pgSoftCount={pgSoftCount}
              selectedPragmaticGames={selectedPragmaticGames}
              selectedPgSoftGames={selectedPgSoftGames}
              selectedLayout={selectedLayout}
              selectedCardStyle={selectedCardStyle}
              pragmaticTrik={pragmaticTrik}
              pgSoftTrik={pgSoftTrik}
              onPrepareImage={prepareImage}
              onDownload={downloadImage}
              onCopy={copyToClipboard}
              onShare={shareImage}
              browserCapabilities={browserCapabilities}
              isImageReady={!!cachedImage}
              isProcessing={isProcessing}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">Cara Penggunaan:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Pilih website dari dropdown di bagian header</li>
            <li>Atur jumlah game yang ingin ditampilkan untuk Pragmatic Play dan PG Soft</li>
            <li>Klik tombol "Acak" untuk mengacak games, jam, background, atau style</li>
            <li>Preview RTP akan otomatis diperbarui sesuai pilihan Anda</li>
            <li>Klik <strong className="text-blue-400">"Prepare Image"</strong> untuk memproses gambar</li>
            <li>Setelah siap, pilih salah satu opsi:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li><strong className="text-emerald-400">"Download PNG"</strong> - Download gambar ke komputer</li>
                <li><strong className="text-purple-400">"Copy to Clipboard"</strong> - Copy gambar ke clipboard untuk paste langsung</li>
                <li><strong className="text-indigo-400">"Share"</strong> - Share gambar via aplikasi lain (mobile/desktop)</li>
              </ul>
            </li>
          </ol>

          <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-yellow-600">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Fitur Modern Screenshot
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <strong className="text-purple-400">Copy to Clipboard:</strong> Fitur ini menggunakan Clipboard API modern.
                Didukung di Chrome 76+, Edge 79+, Safari 13.1+, Firefox 90+
              </li>
              <li>
                <strong className="text-indigo-400">Web Share API:</strong> Fitur ini memungkinkan sharing langsung ke aplikasi lain.
                Didukung di Chrome 89+, Edge 93+, Safari 12.1+ (iOS/macOS)
              </li>
              <li>
                <strong className="text-gray-400">Compatibility Check:</strong> Status kompatibilitas browser ditampilkan di bagian atas.
                Jika fitur tidak tersedia, tombol akan di-disable.
              </li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-green-600">
            <h3 className="text-lg font-semibold text-green-400 mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Anti-Warping Technology
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <strong className="text-green-400">Transform & Zoom Reset:</strong> Otomatis reset CSS transform dan zoom sebelum screenshot untuk mencegah distorsi.
              </li>
              <li>
                <strong className="text-green-400">Device Pixel Ratio:</strong> Menggunakan devicePixelRatio untuk kualitas optimal sesuai layar device.
              </li>
              <li>
                <strong className="text-green-400">Scroll Position Handling:</strong> Menangani scroll position untuk hasil screenshot yang konsisten.
              </li>
              <li>
                <strong className="text-green-400">Font Loading Wait:</strong> Menunggu semua font selesai load sebelum capture untuk mencegah font fallback.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
