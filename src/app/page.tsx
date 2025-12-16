'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Download, Loader2, Camera, CheckCircle, Share2, Copy, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import RTPPreview from '@/components/RTPPreview';
import { WEBSITES, RTP_STYLES, BACKGROUND_CATEGORIES, GAMES_PRAGMATIC, GAMES_PGSOFT, LAYOUT_OPTIONS, TEXTURE_OPTIONS, CARD_STYLE_OPTIONS } from '@/data/games';
import { WebsiteOption, RTPStyle, Game, LayoutOption, TextureOption, CardStyleOption, TrikConfig } from '@/types';

// Gold Tier Games - WAJIB muncul minimal 1 setiap acak
const GOLD_TIER_PRAGMATIC = [
  'Gates of Olympus',
  'Gates of Olympus Super Scatter',
  'Gates of Olympus 1000',
  'Mahjong Wins 3 - Black Scatter',
  'Starlight Princess',
  'Starlight Princess 1000',
  'Starlight Princess Super Scatter',
  'Sweet Bonanza 1000',
  'Sweet Bonanza',
  'Sweet Bonanza Super Scatter',
  'Gates of Gatot Kaca 1000',
  'Gates of Gatot Kaca Super Scatter',
];

const GOLD_TIER_PGSOFT = [
  'Mahjong Ways',
  'Mahjong Ways 2',
  'Lucky Neko',
  'Wild Bounty Showdown',
  'Wild Bandito',
  'Treasures of Aztec',
  'Ways of the Qilin',
  'Gemstones Gold',
  'Asgardian Rising',
  'Lucky Piggy',
  'Mafia Mayhem',
  'Cai Shen Wins',
  'Phoenix Rises',
  'The Great Icescape',
];

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
  // WAJIB include 1 gold tier game setiap acak
  const generateRandomGames = useCallback(() => {
    // === PRAGMATIC PLAY ===
    // 1. Pilih 1 random gold tier game
    const goldTierPragmaticGames = GAMES_PRAGMATIC.filter(game =>
      GOLD_TIER_PRAGMATIC.includes(game.name)
    );
    const randomGoldPragmatic = goldTierPragmaticGames[Math.floor(Math.random() * goldTierPragmaticGames.length)];

    // 2. Shuffle remaining games untuk fill sisanya
    const remainingPragmatic = GAMES_PRAGMATIC.filter(game => game.name !== randomGoldPragmatic.name);
    const shuffledRemainingPragmatic = [...remainingPragmatic].sort(() => Math.random() - 0.5);

    // 3. Combine: 1 gold tier + (pragmaticCount - 1) random games
    const selectedPragmatic = [
      randomGoldPragmatic,
      ...shuffledRemainingPragmatic.slice(0, pragmaticCount - 1)
    ];

    // 4. Shuffle final placement (acak urutan)
    const finalPragmatic = [...selectedPragmatic].sort(() => Math.random() - 0.5);

    // === PG SOFT ===
    // 1. Pilih 1 random gold tier game dengan WEIGHTED PROBABILITY
    // Mahjong Ways & Mahjong Ways 2 = 70% chance
    // 12 games lainnya = 30% chance
    const goldTierPgSoftGames = GAMES_PGSOFT.filter(game =>
      GOLD_TIER_PGSOFT.includes(game.name)
    );

    let randomGoldPgSoft: Game;
    const randomChance = Math.random() * 100; // 0-100

    if (randomChance <= 70) {
      // 70% chance: Pilih antara Mahjong Ways atau Mahjong Ways 2
      const mahjongGames = goldTierPgSoftGames.filter(game =>
        game.name === 'Mahjong Ways' || game.name === 'Mahjong Ways 2'
      );
      randomGoldPgSoft = mahjongGames[Math.floor(Math.random() * mahjongGames.length)];
    } else {
      // 30% chance: Pilih dari 12 gold tier lainnya
      const otherGoldGames = goldTierPgSoftGames.filter(game =>
        game.name !== 'Mahjong Ways' && game.name !== 'Mahjong Ways 2'
      );
      randomGoldPgSoft = otherGoldGames[Math.floor(Math.random() * otherGoldGames.length)];
    }

    // 2. Shuffle remaining games untuk fill sisanya
    const remainingPgSoft = GAMES_PGSOFT.filter(game => game.name !== randomGoldPgSoft.name);
    const shuffledRemainingPgSoft = [...remainingPgSoft].sort(() => Math.random() - 0.5);

    // 3. Combine: 1 gold tier + (pgSoftCount - 1) random games
    const selectedPgSoft = [
      randomGoldPgSoft,
      ...shuffledRemainingPgSoft.slice(0, pgSoftCount - 1)
    ];

    // 4. Shuffle final placement (acak urutan)
    const finalPgSoft = [...selectedPgSoft].sort(() => Math.random() - 0.5);

    setSelectedPragmaticGames(finalPragmatic);
    setSelectedPgSoftGames(finalPgSoft);
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
      // Dynamically import html-to-image
      const { toPng } = await import('html-to-image');

      // Get the preview element
      const element = previewRef.current;

      // Store original image sources for restoration
      const originalSrcs: Map<HTMLImageElement, string> = new Map();

      // Helper to check if URL is external
      const isExternalUrl = (url: string): boolean => {
        return url && (url.startsWith('http') || url.startsWith('//'));
      };

      // CRITICAL FIX FOR CORS: Convert ALL external images to base64 before screenshot
      const allImages = element.querySelectorAll('img');
      await Promise.all(
        Array.from(allImages).map(async (img) => {
          const src = img.src;
          if (isExternalUrl(src)) {
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

      // Wait a bit for any pending renders
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use html-to-image to convert element to PNG
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: window.devicePixelRatio || 2,
        backgroundColor: selectedStyle.backgroundColor || '#000000',
        filter: (node) => {
          // Ignore floating action buttons
          if (node instanceof HTMLElement) {
            return node.getAttribute('data-screenshot-ignore') !== 'true';
          }
          return true;
        },
        style: {
          // Ensure background is applied
          backgroundImage: convertedBackground ? `url("${convertedBackground}")` : undefined,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      });

      setCachedImage(dataUrl);
      setDownloadStatus('ready');

      // Restore original image sources
      originalSrcs.forEach((src, img) => {
        img.src = src;
      });

    } catch (error) {
      console.error('Error preparing image:', error);
      setDownloadStatus('idle');

      // Provide more helpful error message
      let errorMessage = 'Gagal memproses gambar. ';
      if (error instanceof Error) {
        errorMessage += error.message;
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

              {!cachedImage && !isBackgroundConverting && (
                <div className="text-cyan-400 text-sm font-semibold">
                  👇 Klik tombol "Screenshot" di pojok kanan bawah preview untuk mulai
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

          {/* Screenshot Result */}
          {cachedImage && (
            <div className="mb-6 p-6 bg-gray-800 rounded-lg border-2 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-green-400">✓ Screenshot Berhasil!</h3>
                <div className="flex gap-3">
                  <button
                    onClick={downloadImage}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  {browserCapabilities.clipboard && (
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
                    >
                      <Copy className="w-5 h-5" />
                      Copy
                    </button>
                  )}
                  {browserCapabilities.webShare && (
                    <button
                      onClick={shareImage}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                  )}
                </div>
              </div>
              <div className="overflow-auto rounded-lg border-2 border-gray-700 bg-black">
                <img src={cachedImage} alt="Screenshot Result" className="w-full" />
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
            <li>Klik tombol <strong className="text-cyan-400">"Screenshot"</strong> (camera icon) di pojok kanan bawah preview</li>
            <li>Tunggu proses screenshot selesai, lalu pilih:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li><strong className="text-emerald-400">"Download"</strong> - Download gambar PNG ke komputer</li>
                <li><strong className="text-purple-400">"Copy"</strong> - Copy gambar ke clipboard untuk paste langsung</li>
                <li><strong className="text-indigo-400">"Share"</strong> - Share gambar via aplikasi lain</li>
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
