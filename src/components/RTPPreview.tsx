'use client';

import { forwardRef } from 'react';
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
import CasinoCyberpunkLayout from './layouts/CasinoCyberpunkLayout';
import CasinoHolographicLayout from './layouts/CasinoHolographicLayout';
import CasinoMatrixLayout from './layouts/CasinoMatrixLayout';
import CasinoQuantumLayout from './layouts/CasinoQuantumLayout';
import CasinoSpaceStationLayout from './layouts/CasinoSpaceStationLayout';
import CasinoMedievalKingdomLayout from './layouts/CasinoMedievalKingdomLayout';
import SingleFeaturedLayout from './layouts/SingleFeaturedLayout';
import CustomizableLayout from './layouts/CustomizableLayout';
import CustomizableLayout2 from './layouts/CustomizableLayout2';
import { RTPStyle, WebsiteOption, Game, LayoutOption, TextureOption, CardStyleOption, TrikConfig, MaxwinConfig, DefaultLayoutSizeConfig, FooterConfig } from '@/types';

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
  pragmaticTrik: TrikConfig;
  pgSoftTrik: TrikConfig;
  featuredGame: Game | null;
  featuredPosition: 'left' | 'center' | 'right';
  featuredTrik: TrikConfig;
  maxwinConfig: MaxwinConfig;
  telegramUsername: string;
  customDateEnabled: boolean;
  customDate: Date;
  customHeaderText: string;
  headerFontSize: 'small' | 'medium' | 'large' | 'xlarge';
  defaultLayoutSize: DefaultLayoutSizeConfig;
  footerConfig: FooterConfig;
  // Screenshot actions
  onPrepareImage?: () => void;
  onDownload?: () => void;
  onCopy?: () => void;
  onShare?: () => void;
  browserCapabilities?: {
    clipboard: boolean;
    webShare: boolean;
  };
  isImageReady?: boolean;
  isProcessing?: boolean;
}

const RTPPreview = forwardRef<HTMLDivElement, RTPPreviewProps>(({
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
  selectedCardStyle,
  pragmaticTrik,
  pgSoftTrik,
  featuredGame,
  featuredPosition,
  featuredTrik,
  maxwinConfig,
  telegramUsername,
  customDateEnabled,
  customDate,
  customHeaderText,
  headerFontSize,
  defaultLayoutSize,
  footerConfig,
  onPrepareImage,
  onDownload,
  onCopy,
  onShare,
  browserCapabilities,
  isImageReady = false,
  isProcessing = false
}, ref) => {
  const getCurrentDate = () => {
    const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
    const months = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];

    const dateToUse = customDateEnabled ? customDate : new Date();
    const dayName = days[dateToUse.getDay()];
    const date = dateToUse.getDate();
    const monthName = months[dateToUse.getMonth()];
    const year = dateToUse.getFullYear();

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
    selectedCardStyle,
    pragmaticTrik,
    pgSoftTrik,
    telegramUsername,
    customHeaderText,
    headerFontSize,
    defaultLayoutSize,
    footerConfig
  };

  // All layouts now use 1000x1000 (1:1 ratio)
  const containerSize = '1000px';
  const containerHeight = '1000px';

  return (
    <div className="space-y-4">
      {/* Preview Container */}
      <div
        ref={ref}
        data-preview-container="true"
        className="relative overflow-hidden rounded-lg shadow-2xl"
        style={{
          width: containerSize,
          height: containerHeight,
          backgroundColor: selectedStyle.backgroundColor,
          backgroundImage: `url("${selectedBackground}")`,
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
        {selectedLayout.id === 'singlefeatured' && (
          <SingleFeaturedLayout
            selectedWebsite={selectedWebsite}
            selectedStyle={selectedStyle}
            customTimeLabel={customTimeLabel}
            featuredGame={featuredGame}
            featuredPosition={featuredPosition}
            getCurrentDate={getCurrentDate}
            selectedCardStyle={selectedCardStyle}
            featuredTrik={featuredTrik}
            maxwinConfig={maxwinConfig}
            telegramUsername={telegramUsername}
            customHeaderText={customHeaderText}
            headerFontSize={headerFontSize}
            selectedPragmaticGames={selectedPragmaticGames}
            selectedPgSoftGames={selectedPgSoftGames}
            pragmaticTrik={pragmaticTrik}
            pgSoftTrik={pgSoftTrik}
          />
        )}
        {selectedLayout.id === 'cyberpunk2' && <CyberpunkLayout2 {...layoutProps} />}
        {selectedLayout.id === 'steampunk' && <SteampunkLayout {...layoutProps} />}
        {selectedLayout.id === 'casinocyberpunk' && <CasinoCyberpunkLayout {...layoutProps} />}
        {selectedLayout.id === 'casinoholographic' && <CasinoHolographicLayout {...layoutProps} />}
        {selectedLayout.id === 'casinomatrix' && <CasinoMatrixLayout {...layoutProps} />}
        {selectedLayout.id === 'casinoquantum' && <CasinoQuantumLayout {...layoutProps} />}
        {selectedLayout.id === 'casinospacestation' && <CasinoSpaceStationLayout {...layoutProps} />}
        {selectedLayout.id === 'casinomedieval' && <CasinoMedievalKingdomLayout {...layoutProps} />}
        {selectedLayout.id === 'customizable' && <CustomizableLayout {...layoutProps} />}
        {selectedLayout.id === 'customizable2' && <CustomizableLayout2 {...layoutProps} />}

        {/* Floating Action Buttons */}
        <div
          data-screenshot-ignore="true"
          className="absolute bottom-8 right-8 flex flex-col gap-3 z-50"
        >
          {/* Screenshot Button */}
          {onPrepareImage && (
            <button
              onClick={onPrepareImage}
              disabled={isProcessing}
              className="group flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isProcessing ? 'rgba(100, 100, 100, 0.3)' : 'rgba(59, 130, 246, 0.2)',
                border: isProcessing ? '2px solid rgba(100, 100, 100, 0.5)' : '2px solid rgba(59, 130, 246, 0.6)',
                boxShadow: isProcessing ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.4)'
              }}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="8" />
                  </svg>
                  <span className="text-white font-bold">Processing...</span>
                </>
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                  <span className="text-white font-bold">Screenshot</span>
                </>
              )}
            </button>
          )}

          {/* Download/Copy/Share buttons - Only after image ready */}
          {isImageReady && (
            <>
            {/* Download Button */}
            {onDownload && (
              <button
                onClick={onDownload}
                className="group flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(0, 240, 255, 0.15)',
                  border: '2px solid rgba(0, 240, 255, 0.5)',
                  boxShadow: '0 4px 12px rgba(0, 240, 255, 0.3)'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                <span className="text-white font-bold">Download</span>
              </button>
            )}

            {/* Copy to Clipboard Button */}
            {onCopy && browserCapabilities?.clipboard && (
              <button
                onClick={onCopy}
                className="group flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(255, 215, 0, 0.15)',
                  border: '2px solid rgba(255, 215, 0, 0.5)',
                  boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                <span className="text-white font-bold">Copy</span>
              </button>
            )}

            {/* Share Button */}
            {onShare && browserCapabilities?.webShare && (
              <button
                onClick={onShare}
                className="group flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(147, 51, 234, 0.15)',
                  border: '2px solid rgba(147, 51, 234, 0.5)',
                  boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
                </svg>
                <span className="text-white font-bold">Share</span>
              </button>
            )}
            </>
          )}
        </div>
      </div>
    </div>
  );
});

RTPPreview.displayName = 'RTPPreview';

export default RTPPreview;
