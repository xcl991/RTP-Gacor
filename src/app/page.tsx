'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Download, Loader2, Camera, CheckCircle } from 'lucide-react';
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

      // Helper function to extract URL from background-image
      const extractBgUrl = (bgImage: string): string | null => {
        const match = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
        return match ? match[1] : null;
      };

      // Helper function to check if URL is external
      const isExternalUrl = (url: string): boolean => {
        return url.startsWith('http') || url.startsWith('//');
      };

      // 1. Set the main background to converted base64 version
      const originalMainBg = element.style.backgroundImage;
      if (convertedBackground) {
        element.style.backgroundImage = `url("${convertedBackground}")`;
        originalBgs.set(element, originalMainBg);
      }

      // 2. Find ALL elements with background images (including nested ones)
      const allElements = element.querySelectorAll('*');
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

      // Wait for all images to be fully loaded
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Render with html2canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: selectedStyle.backgroundColor || '#000000',
        logging: true, // Enable logging for debugging
        imageTimeout: 60000,
        width: element.scrollWidth,
        height: element.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure cloned element has correct background
          const clonedElement = clonedDoc.querySelector('[data-preview-container]') as HTMLElement;
          if (clonedElement && convertedBackground) {
            clonedElement.style.backgroundImage = `url("${convertedBackground}")`;
            clonedElement.style.backgroundSize = '100% 100%';
            clonedElement.style.backgroundPosition = 'center';
            clonedElement.style.backgroundRepeat = 'no-repeat';
          }
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

    } catch (error) {
      console.error('Error preparing image:', error);
      setDownloadStatus('idle');
      alert('Gagal memproses gambar. Silakan coba lagi.');
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
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
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

          {/* Download Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-800 rounded-lg">
            {/* Background conversion status */}
            {isBackgroundConverting && (
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Memuat background...
              </div>
            )}

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

            {downloadStatus === 'ready' && (
              <span className="text-green-400 text-sm">
                ✓ Gambar siap didownload
              </span>
            )}

            {downloadStatus === 'idle' && !isBackgroundConverting && (
              <span className="text-gray-400 text-sm">
                Klik "Prepare Image" untuk menyiapkan gambar
              </span>
            )}
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
            <li>Setelah siap, klik <strong className="text-emerald-400">"Download PNG"</strong> untuk mengunduh</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
