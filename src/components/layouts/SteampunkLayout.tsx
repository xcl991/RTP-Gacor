'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig } from '@/types';
import TrikPanel from '../TrikPanel';

// Helper function to create darker/lighter colors from hex
function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(255 * percent / 100)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + Math.round(255 * percent / 100)));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + Math.round(255 * percent / 100)));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

interface SteampunkGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  secondaryColor: string;
  rotation?: number;
  darkBackground: string;
}

function SteampunkGameCard({ game, rtp, primaryColor, secondaryColor, rotation = 0, darkBackground }: SteampunkGameCardProps) {
  return (
    <div className="relative w-[120px]">
      {/* Shadow layer with rotation */}
      <div
        className="absolute inset-0"
        style={{
          transform: `rotate(${rotation}deg)`,
          background: `${darkBackground}cc`,
          border: `2px solid ${primaryColor}60`,
          borderRadius: '12px',
          boxShadow: `0 10px 25px rgba(0,0,0,0.4)`
        }}
      />
      {/* Main card */}
      <div
        className="relative p-3"
        style={{
          transform: `rotate(${-rotation / 2}deg)`,
          background: `linear-gradient(145deg, ${darkBackground}f2, ${darkBackground})`,
          border: `2px solid ${primaryColor}`,
          borderRadius: '10px',
          boxShadow: `0 5px 20px rgba(0,0,0,0.3), inset 0 0 20px ${secondaryColor}20`
        }}
      >
        <div className="relative w-full aspect-square overflow-hidden rounded-lg mb-3" style={{ border: `1px solid ${primaryColor}50` }}>
          <img
            src={game.src}
            alt={game.name}
            className="w-full h-full object-contain bg-black/30"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        <div className="text-center">
          <h3
            className="font-bold text-sm truncate mb-1.5"
            style={{ color: primaryColor }}
          >
            {game.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

interface SteampunkLayoutProps {
  selectedWebsite: WebsiteOption;
  selectedStyle: RTPStyle;
  customTimeLabel: string;
  selectedPragmaticGames: Game[];
  selectedPgSoftGames: Game[];
  pragmaticCount: number;
  pgSoftCount: number;
  getCurrentDate: () => string;
  selectedCardStyle: CardStyleOption;
  pragmaticTrik: TrikConfig;
  pgSoftTrik: TrikConfig;
  telegramUsername: string;
  customHeaderText: string;
  headerFontSize: 'small' | 'medium' | 'large' | 'xlarge';
  defaultLayoutSize: DefaultLayoutSizeConfig;
}

export default function SteampunkLayout({
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
  defaultLayoutSize
}: SteampunkLayoutProps) {
  const getFontSizeClass = () => {
    switch (headerFontSize) {
      case 'small': return 'text-base';
      case 'medium': return 'text-base';
      case 'large': return 'text-base';
      case 'xlarge': return 'text-base';
    }
  };

  const primaryColor = selectedStyle.primaryColor;
  const secondaryColor = selectedStyle.secondaryColor;

  const darkPrimary = adjustColor(primaryColor, -65);
  const darkerPrimary = adjustColor(primaryColor, -80);
  const darkSecondary = adjustColor(secondaryColor, -65);

  const getBlurClass = () => {
    if (!selectedCardStyle?.blur || selectedCardStyle.blur === 'none') return '';
    return selectedCardStyle.blur;
  };

  const getSectionStyle = (color: string) => ({
    background: selectedCardStyle?.background || `linear-gradient(45deg, ${color}30, rgba(45,35,25,0.9))`,
    border: selectedCardStyle?.border ? `${selectedCardStyle.border} ${color}` : `3px solid ${color}`,
    opacity: selectedCardStyle?.opacity || 1,
    boxShadow: selectedCardStyle?.shadow ? (selectedCardStyle.shadow.includes('0 0 20px') ? `${selectedCardStyle.shadow} ${color}` : selectedCardStyle.shadow) : `inset 0 0 20px ${color}30`
  });

  const pragmaticGamesWithRTP = selectedPragmaticGames.slice(0, pragmaticCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const pgSoftGamesWithRTP = selectedPgSoftGames.slice(0, pgSoftCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  return (
    <div className="relative z-10 flex flex-col min-h-full p-3" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
      {/* Steampunk Pattern Background */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${primaryColor} 0px, ${primaryColor} 2px, transparent 2px, transparent 15px)`
        }}
      />

      {/* Decorative Gears */}
      <div
        className="absolute top-10 left-10 w-32 h-20 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${primaryColor}, transparent)`,
          border: `3px solid ${primaryColor}`
        }}
      />
      <div
        className="absolute top-20 right-20 w-24 h-24 rounded-full opacity-15"
        style={{
          background: `radial-gradient(circle, ${secondaryColor}, transparent)`,
          border: `3px solid ${secondaryColor}`
        }}
      />
      <div
        className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${primaryColor}, transparent)`,
          border: `3px solid ${primaryColor}`
        }}
      />

      {/* Header */}
      <div
        className="relative z-10 text-center mb-1.5 p-3 rounded-2xl"
        style={{
          background: `linear-gradient(145deg, ${darkPrimary}f2, ${darkerPrimary})`,
          border: `4px solid ${primaryColor}`,
          boxShadow: `inset 0 0 40px ${secondaryColor}30, 0 10px 30px rgba(0,0,0,0.5)`
        }}
      >
        {/* Victorian stripe pattern */}
        <div
          className="absolute inset-0 opacity-10 rounded-2xl overflow-hidden"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${primaryColor} 0px, ${primaryColor} 2px, transparent 2px, transparent 12px)`
          }}
        />

        <div className="relative">
          <img
            src={selectedWebsite.logo}
            alt={selectedWebsite.name}
            className="h-24 mx-auto mb-1.5"
            style={{ filter: `drop-shadow(0 0 15px ${primaryColor}80)` }}
          />
          <h1
            className={`${getFontSizeClass()} font-bold mb-1.5`}
            style={{
              color: primaryColor,
              textShadow: `2px 2px 4px rgba(0,0,0,0.8)`
            }}
          >
            {customHeaderText}
          </h1>
          <div className="text-base mb-1.5" style={{ color: secondaryColor }}>
            {getCurrentDate()}
          </div>
          <div
            className="text-base font-bold mb-1.5"
            style={{ color: primaryColor }}
          >
            Jam Gacor: {customTimeLabel}
          </div>
        </div>
      </div>

      {/* Pragmatic Section with Grid */}
      <div
        className="grid items-stretch gap-2 mb-1.5"
        style={{
          gridTemplateColumns: pragmaticTrik.enabled ? `1fr ${defaultLayoutSize.trikPanelWidth}px` : '1fr'
        }}
      >
        <div
          className={`relative p-3 rounded-xl ${getBlurClass()}`}
          style={getSectionStyle(primaryColor)}
        >
          {/* Pattern Overlay */}
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{
                backgroundImage: selectedCardStyle.pattern,
                backgroundRepeat: 'repeat'
              }}
            />
          )}
          <div
            className="relative z-10 text-center p-3 mb-3 rounded-xl"
          >
            <div className="flex items-center justify-center gap-2">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
                className="h-20"
                style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80)`, transform: 'scale(1.3)' }}
                alt="Pragmatic Play"
              />
              <h3
                className="text-base font-bold"
                style={{ color: primaryColor }}
              >
                PRAGMATIC PLAY
              </h3>
            </div>
          </div>
          <div className="relative z-10 grid grid-cols-2 justify-items-center gap-2">
            {pragmaticGamesWithRTP.map((game, index) => (
              <SteampunkGameCard
                key={`pragmatic-${index}`}
                game={game}
                rtp={game.rtp}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                rotation={index % 2 === 0 ? 2 : -2}
                darkBackground={darkPrimary}
              />
            ))}
          </div>
        </div>
        {pragmaticTrik.enabled && (
          <TrikPanel
            trik={pragmaticTrik}
            providerColor={primaryColor}
            fontFamily="var(--font-cinzel), serif"
            cardStyle={selectedCardStyle}
            variant="steampunk"
          />
        )}
      </div>

      {/* PG Soft Section with Grid */}
      <div
        className="grid items-stretch gap-2 mb-1.5"
        style={{
          gridTemplateColumns: pgSoftTrik.enabled ? `1fr ${defaultLayoutSize.trikPanelWidth}px` : '1fr'
        }}
      >
        <div
          className={`relative p-3 rounded-xl ${getBlurClass()}`}
          style={getSectionStyle(secondaryColor)}
        >
          {/* Pattern Overlay */}
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{
                backgroundImage: selectedCardStyle.pattern,
                backgroundRepeat: 'repeat'
              }}
            />
          )}
          <div
            className="relative z-10 text-center p-3 mb-3 rounded-xl"
          >
            <div className="flex items-center justify-center gap-2">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
                className="h-20"
                style={{ filter: `drop-shadow(0 0 10px ${secondaryColor}80)`, transform: 'scale(1.3)' }}
                alt="PG Soft"
              />
              <h3
                className="text-base font-bold"
                style={{ color: secondaryColor }}
              >
                PG SOFT
              </h3>
            </div>
          </div>
          <div className="relative z-10 grid grid-cols-2 justify-items-center gap-2">
            {pgSoftGamesWithRTP.map((game, index) => (
              <SteampunkGameCard
                key={`pgsoft-${index}`}
                game={game}
                rtp={game.rtp}
                primaryColor={secondaryColor}
                secondaryColor={primaryColor}
                rotation={index % 2 === 0 ? -2 : 2}
                darkBackground={darkSecondary}
              />
            ))}
          </div>
        </div>
        {pgSoftTrik.enabled && (
          <TrikPanel
            trik={pgSoftTrik}
                hideFiturGanda={true}
            providerColor={secondaryColor}
            fontFamily="var(--font-cinzel), serif"
            cardStyle={selectedCardStyle}
            variant="steampunk"
          />
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-4 rounded-full"
          style={{
            background: `linear-gradient(145deg, ${darkPrimary}f2, ${darkerPrimary})`,
            border: `3px solid ${primaryColor}`,
            boxShadow: `inset 0 0 20px ${secondaryColor}30`
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill={primaryColor}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span className="text-base font-semibold" style={{ color: primaryColor }}>
            @{telegramUsername || selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
          </span>
        </div>
      </div>
    </div>
  );
}
