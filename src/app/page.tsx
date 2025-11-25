'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import RTPPreview from '@/components/RTPPreview';
import { WEBSITES, RTP_STYLES, TIME_SLOTS, BACKGROUNDS, GAMES_PRAGMATIC, GAMES_PGSOFT, LAYOUT_OPTIONS, TEXTURE_OPTIONS } from '@/data/games';
import { WebsiteOption, RTPStyle, TimeSlot, Game, LayoutOption, TextureOption } from '@/types';

export default function Home() {
  const [selectedWebsite, setSelectedWebsite] = useState<WebsiteOption>(WEBSITES[0]);
  const [selectedStyle, setSelectedStyle] = useState<RTPStyle>(RTP_STYLES[0]);
  const [customTimeLabel, setCustomTimeLabel] = useState<string>('18:00 - 00:00 WIB');
  const [selectedBackground, setSelectedBackground] = useState<string>(BACKGROUNDS[0]);
  const [selectedTexture, setSelectedTexture] = useState<TextureOption>(TEXTURE_OPTIONS[0]);
  const [pragmaticCount, setPragmaticCount] = useState<number>(8);
  const [pgSoftCount, setPgSoftCount] = useState<number>(8);
  const [selectedLayout, setSelectedLayout] = useState<LayoutOption>(LAYOUT_OPTIONS[0]);

  // States untuk menyimpan game yang sudah terpilih
  const [selectedPragmaticGames, setSelectedPragmaticGames] = useState<Game[]>([]);
  const [selectedPgSoftGames, setSelectedPgSoftGames] = useState<Game[]>([]);

  // Generate random games saat pertama kali atau saat count berubah
  const generateRandomGames = () => {
    const shuffledPragmatic = [...GAMES_PRAGMATIC].sort(() => Math.random() - 0.5);
    const shuffledPgSoft = [...GAMES_PGSOFT].sort(() => Math.random() - 0.5);
    
    setSelectedPragmaticGames(shuffledPragmatic.slice(0, pragmaticCount));
    setSelectedPgSoftGames(shuffledPgSoft.slice(0, pgSoftCount));
  };

  // Generate games saat pertama kali load
  useEffect(() => {
    generateRandomGames();
  }, []);

  // Generate games ulang hanya saat count berubah
  useEffect(() => {
    generateRandomGames();
  }, [pragmaticCount, pgSoftCount]);

  // Shuffle functions
  const shuffleGames = () => {
    generateRandomGames();
  };

  const shuffleBackground = () => {
    const randomIndex = Math.floor(Math.random() * BACKGROUNDS.length);
    setSelectedBackground(BACKGROUNDS[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Header
          selectedWebsite={selectedWebsite}
          onWebsiteChange={setSelectedWebsite}
          onShuffleGames={shuffleGames}
          onShuffleBackground={shuffleBackground}
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
        />

        {/* Main Content */}
        <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">
            RTP Live Generator
          </h1>
          
          <p className="text-gray-300 text-center mb-8 max-w-3xl mx-auto">
            Generate gambar RTP Live untuk website Anda. Pilih website, atur jumlah game, 
            pilih waktu, background, dan style yang sesuai. Klik "Generate & Download Image" 
            untuk mengunduh gambar RTP.
          </p>

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