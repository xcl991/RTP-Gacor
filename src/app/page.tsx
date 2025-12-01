'use client';

import { useState, useEffect, useCallback } from 'react';
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

          {/* RTP Preview */}
          <div className="overflow-x-auto">
            <RTPPreview
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
            <li>Gunakan screenshot tool bawaan browser atau OS untuk capture gambar</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
