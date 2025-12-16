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

      // Find all images and convert to base64
      const images = element.querySelectorAll('img');
      const originalSrcs: Map<HTMLImageElement, string> = new Map();

      // Convert all external images to base64
      await Promise.all(
        Array.from(images).map(async (img) => {
          const src = img.src;
          if (src && (src.startsWith('http') || src.startsWith('//'))) {
            originalSrcs.set(img, src);
            try {
              const base64 = await imageToBase64(src);
              img.src = base64;
            } catch (e) {
              console.error('Failed to convert image:', src, e);
            }
          }
        })
      );

      // Also handle background images in style
      const elementsWithBg = element.querySelectorAll('[style*="background-image"]');
      const originalBgs: Map<Element, string> = new Map();

      await Promise.all(
        Array.from(elementsWithBg).map(async (el) => {
          const htmlEl = el as HTMLElement;
          const bgImage = htmlEl.style.backgroundImage;
          if (bgImage && bgImage.includes('url(')) {
            const match = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
            if (match && match[1] && (match[1].startsWith('http') || match[1].startsWith('//'))) {
              originalBgs.set(el, bgImage);
              try {
                const base64 = await imageToBase64(match[1]);
                htmlEl.style.backgroundImage = `url("${base64}")`;
              } catch (e) {
                console.error('Failed to convert background:', match[1], e);
              }
            }
          }
        })
      );

      // Small delay to ensure images are loaded
      await new Promise(resolve => setTimeout(resolve, 500));

      // Render with html2canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        imageTimeout: 30000,
        width: element.scrollWidth,
        height: element.scrollHeight,
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
        (el as HTMLElement).style.backgroundImage = bg;
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
            <button
              onClick={prepareImage}
              disabled={isProcessing}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                isProcessing
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

            {downloadStatus === 'idle' && (
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
