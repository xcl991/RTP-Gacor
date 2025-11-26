'use client';

import DefaultLayout from './layouts/DefaultLayout';
import ClassicLayout from './layouts/ClassicLayout';
import FuturisticLayout from './layouts/FuturisticLayout';
import NeonLayout from './layouts/NeonLayout';
import ElegantLayout from './layouts/ElegantLayout';
import CyberLayout from './layouts/CyberLayout';
import GalaxyLayout2 from './layouts/GalaxyLayout2';
import CasinoLuxuryLayout from './layouts/CasinoLuxuryLayout';
import CyberpunkLayout2 from './layouts/CyberpunkLayout2';
import SteampunkLayout from './layouts/SteampunkLayout';
import { RTPStyle, WebsiteOption, Game, LayoutOption, TextureOption, CardStyleOption } from '@/types';

interface RTPPreviewProps {
  selectedWebsite: WebsiteOption;
  selectedStyle: RTPStyle;
  customTimeLabel: string;
  selectedBackground: string;
  selectedTexture: TextureOption;
  pragmaticCount: number;
  pgSoftCount: number;
  selectedPragmaticGames: Game[];
  selectedPgSoftGames: Game[];
  selectedLayout: LayoutOption;
  selectedCardStyle: CardStyleOption;
}

export default function RTPPreview({
  selectedWebsite,
  selectedStyle,
  customTimeLabel,
  selectedBackground,
  selectedTexture,
  pragmaticCount,
  pgSoftCount,
  selectedPragmaticGames,
  selectedPgSoftGames,
  selectedLayout,
  selectedCardStyle
}: RTPPreviewProps) {
  const getCurrentDate = () => {
    const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
    const months = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];

    const now = new Date();
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();

    return `${dayName}, ${date} ${monthName} ${year}`;
  };

  const layoutProps = {
    selectedWebsite,
    selectedStyle,
    customTimeLabel,
    selectedPragmaticGames,
    selectedPgSoftGames,
    pragmaticCount,
    pgSoftCount,
    getCurrentDate,
    selectedCardStyle
  };

  return (
    <div className="space-y-4">
      {/* Preview Container */}
      <div
        className="relative overflow-hidden rounded-lg shadow-2xl"
        style={{
          width: '1200px',
          minHeight: '1600px',
          height: 'auto',
          backgroundColor: selectedStyle.backgroundColor,
          backgroundImage: `url(${selectedBackground})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          margin: '0 auto'
        }}
      >
        {/* Color Overlay based on style */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, ${selectedStyle.primaryColor}30 0%, transparent 50%), radial-gradient(ellipse at 50% 70%, ${selectedStyle.secondaryColor}20 0%, transparent 50%), radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.8) 100%)`
          }}
        />

        {/* Texture Overlay */}
        {selectedTexture.pattern !== 'none' && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: selectedTexture.pattern.replace(/%23ffffff/g, encodeURIComponent(selectedStyle.primaryColor)),
              backgroundRepeat: 'repeat'
            }}
          />
        )}

        {/* Content - Render based on selected layout */}
        {selectedLayout.id === 'default' && <DefaultLayout {...layoutProps} />}
        {selectedLayout.id === 'classic' && <ClassicLayout {...layoutProps} />}
        {selectedLayout.id === 'futuristic' && <FuturisticLayout {...layoutProps} />}
        {selectedLayout.id === 'neon' && <NeonLayout {...layoutProps} />}
        {selectedLayout.id === 'elegant' && <ElegantLayout {...layoutProps} />}
        {selectedLayout.id === 'cyber' && <CyberLayout {...layoutProps} />}
        {selectedLayout.id === 'galaxy2' && <GalaxyLayout2 {...layoutProps} />}
        {selectedLayout.id === 'casinoluxury' && <CasinoLuxuryLayout {...layoutProps} />}
        {selectedLayout.id === 'cyberpunk2' && <CyberpunkLayout2 {...layoutProps} />}
        {selectedLayout.id === 'steampunk' && <SteampunkLayout {...layoutProps} />}
      </div>
    </div>
  );
}
