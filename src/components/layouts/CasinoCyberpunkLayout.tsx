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

interface CyberpunkGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  secondaryColor: string;
}

function CyberpunkGameCard({ game, rtp, primaryColor, secondaryColor }: CyberpunkGameCardProps) {
  return (
    <div
      className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
      style={{
        background: `linear-gradient(135deg, rgba(0,0,0,0.9), ${primaryColor}15)`,
        border: `2px solid ${primaryColor}`,
        borderRadius: '8px',
        boxShadow: `0 0 20px ${primaryColor}60, inset 0 0 20px rgba(0,0,0,0.5)`,
        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
      }}
    >
      {/* Scanning Lines */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${primaryColor}20 3px, ${primaryColor}20 6px)`
        }}
      />

      <div className="relative z-10 p-3">
        <div className="w-full aspect-square mb-1.5 relative overflow-hidden bg-black/70 rounded">
          <img
            src={game.src}
            alt={game.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23000'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23f0f' font-family='monospace' font-size='10'%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E";
            }}
          />

        </div>

        <div className="text-center">
          <div className="text-xs font-black tracking-wider truncate" style={{
            color: primaryColor,
            textShadow: `0 0 10px ${primaryColor}`,
            fontFamily: 'monospace'
          }}>
            {game.name.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: primaryColor }} />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: secondaryColor }} />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: secondaryColor }} />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: primaryColor }} />
    </div>
  );
}

interface CasinoCyberpunkLayoutProps {
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

export default function CasinoCyberpunkLayout({
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
}: CasinoCyberpunkLayoutProps) {
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
  const darkPrimary = adjustColor(primaryColor, -80);
  const darkerPrimary = adjustColor(primaryColor, -90);

  const getBlurClass = () => {
    if (!selectedCardStyle?.blur || selectedCardStyle.blur === 'none') return '';
    return selectedCardStyle.blur;
  };

  const getSectionStyle = (color: string) => ({
    background: selectedCardStyle?.background || undefined,
    border: selectedCardStyle?.border ? `${selectedCardStyle.border} ${color}` : undefined,
    opacity: selectedCardStyle?.opacity || 1,
    boxShadow: selectedCardStyle?.shadow ? (selectedCardStyle.shadow.includes('0 0 20px') ? `${selectedCardStyle.shadow} ${color}` : selectedCardStyle.shadow) : undefined
  });

  const pragmaticGamesWithRTP = selectedPragmaticGames.slice(0, pragmaticCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const pgSoftGamesWithRTP = selectedPgSoftGames.slice(0, pgSoftCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const getCardWidthClass = (count: number) => {
    if (count === 1) return 'w-[calc(50%-0.25rem)] md:w-[calc(50%-0.25rem)]';
    if (count === 2) return 'w-[calc(50%-0.25rem)] md:w-[calc(45%-0.25rem)]';
    return 'w-[calc(50%-0.25rem)] md:w-[calc(33.333%-0.34rem)]';
  };

  return (
    <div className="relative z-10 flex flex-col min-h-full p-3" style={{ fontFamily: 'monospace' }}>
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${primaryColor}20 1px, transparent 1px), linear-gradient(90deg, ${primaryColor}20 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-3">
        <div
          className="p-3 border-b-2"
          style={{ borderColor: primaryColor, background: `${darkerPrimary}cc`, display: 'flex', alignItems: 'center' }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <img
                src={selectedWebsite.logo}
                alt={selectedWebsite.name}
                style={{ height: '60px', filter: `drop-shadow(0 0 10px ${primaryColor}80)` }}
              />
            </div>
            <h1 className="text-lg font-black tracking-wider" style={{
              color: primaryColor,
              textShadow: `0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}`
            }}>
              {customHeaderText}
            </h1>
            <div className="text-sm font-mono opacity-80" style={{ color: secondaryColor }}>
              {getCurrentDate()} | {customTimeLabel}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - 2 Column Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1">
        {/* Pragmatic Play Section */}
        <div>
          <div
            className={`relative rounded p-3 ${getBlurClass()}`}
            style={{
              ...getSectionStyle(primaryColor),
              border: `1px solid ${primaryColor}30`,
              background: `${darkPrimary}99`
            }}
          >
          {/* Pattern Overlay */}
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
            />
          )}
          <div className="relative z-10 flex items-center justify-center mb-3" style={{ overflow: 'visible' }}>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              className="h-12"
              style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80)`, transform: 'scale(2.5)' }}
              alt="Pragmatic Play"
            />
          </div>
          <div className="relative z-10 flex flex-wrap justify-center gap-2">
            {pragmaticGamesWithRTP.map((game, index) => (
              <div key={`pragmatic-${index}`} className={getCardWidthClass(pragmaticGamesWithRTP.length)}>
                <CyberpunkGameCard
                  game={game}
                  rtp={game.rtp}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                />
              </div>
            ))}
          </div>
          {pragmaticTrik.enabled && (
            <div className="relative z-10 mt-4">
              <TrikPanel
                trik={pragmaticTrik}
                providerColor={primaryColor}
                fontFamily="monospace"
                cardStyle={selectedCardStyle}
                variant="cyberpunk"
              />
            </div>
          )}
          </div>
        </div>

        {/* PG Soft Section */}
        <div>
          <div
            className={`relative rounded p-3 ${getBlurClass()}`}
            style={{
              ...getSectionStyle(secondaryColor),
              border: `1px solid ${secondaryColor}30`,
              background: `${darkPrimary}99`
            }}
          >
          {/* Pattern Overlay */}
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
            />
          )}
          <div className="relative z-10 flex items-center justify-center mb-3" style={{ overflow: 'visible' }}>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
              className="h-12"
              style={{ filter: `drop-shadow(0 0 10px ${secondaryColor}80)`, transform: 'scale(2.5)' }}
              alt="PG Soft"
            />
          </div>
          <div className="relative z-10 flex flex-wrap justify-center gap-2">
            {pgSoftGamesWithRTP.map((game, index) => (
              <div key={`pgsoft-${index}`} className={getCardWidthClass(pgSoftGamesWithRTP.length)}>
                <CyberpunkGameCard
                  game={game}
                  rtp={game.rtp}
                  primaryColor={secondaryColor}
                  secondaryColor={primaryColor}
                />
              </div>
            ))}
          </div>
          {pgSoftTrik.enabled && (
            <div className="relative z-10 mt-4">
              <TrikPanel
                trik={pgSoftTrik}
                hideFiturGanda={true}
                providerColor={secondaryColor}
                fontFamily="monospace"
                cardStyle={selectedCardStyle}
                variant="cyberpunk"
              />
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
