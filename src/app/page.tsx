'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { Download, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import RTPPreview from '@/components/RTPPreview';
import { WEBSITES, RTP_STYLES, BACKGROUND_CATEGORIES, GAMES_PRAGMATIC, GAMES_PGSOFT, LAYOUT_OPTIONS, TEXTURE_OPTIONS, CARD_STYLE_OPTIONS } from '@/data/games';
import { WebsiteOption, RTPStyle, Game, LayoutOption, TextureOption, CardStyleOption } from '@/types';

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

  // States untuk menyimpan game yang sudah terpilih
  const [selectedPragmaticGames, setSelectedPragmaticGames] = useState<Game[]>([]);
  const [selectedPgSoftGames, setSelectedPgSoftGames] = useState<Game[]>([]);

  // Download state
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);

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

  // Convert image to base64 via proxy
  const convertImageToBase64 = async (url: string): Promise<string> => {
    try {
      const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('Failed to fetch');
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch {
      return url;
    }
  };

  // Download image function
  const handleDownload = async () => {
    if (!previewRef.current || isDownloading) return;

    setIsDownloading(true);
    try {
      const clone = previewRef.current.cloneNode(true) as HTMLElement;
      const images = clone.querySelectorAll('img');

      await Promise.all(
        Array.from(images).map(async (img) => {
          const src = img.src;
          if (src && (src.startsWith('http://') || src.startsWith('https://'))) {
            try {
              const base64 = await convertImageToBase64(src);
              img.src = base64;
            } catch {
              // Keep original src
            }
          }
        })
      );

      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      document.body.appendChild(clone);

      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        logging: false,
      });

      document.body.removeChild(clone);

      const link = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 10);
      link.download = `RTP-${selectedWebsite.name}-${selectedLayout.name}-${timestamp}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Gagal mengunduh gambar. Silakan coba lagi.');
    } finally {
      setIsDownloading(false);
    }
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
        />

        {/* Main Content */}
        <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-blue-400">
                RTP Live Generator
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Generate dan download gambar RTP Live untuk website Anda
              </p>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-green-500/25 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download Image
                </>
              )}
            </button>
          </div>

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
            <li>Klik "Generate & Download Image" untuk mengunduh gambar RTP</li>
          </ol>
        </div>
      </div>
    </div>
  );
}