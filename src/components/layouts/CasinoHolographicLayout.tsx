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

interface HolographicGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  secondaryColor: string;
  moduleId: string;
}

function HolographicGameCard({ game, rtp, primaryColor, secondaryColor, moduleId }: HolographicGameCardProps) {
  return (
    <div className="relative group cursor-pointer transform-gpu transition-all duration-500 hover:scale-105">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10, ${primaryColor}10)`,
          border: `1px solid ${primaryColor}40`,
          boxShadow: `0 0 30px ${primaryColor}30, 0 0 60px ${secondaryColor}20, inset 0 0 30px rgba(255,255,255,0.05)`,
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Module ID */}
        <div
          className="absolute top-2 left-2 px-2 py-1 text-xs font-mono font-bold z-20"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            color: '#000',
            borderRadius: '4px',
            boxShadow: `0 0 15px ${primaryColor}`
          }}
        >
          {moduleId}
        </div>

        {/* Connection Points */}
        <div className="absolute top-2 right-2 flex gap-1 z-20">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }} />
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: secondaryColor, boxShadow: `0 0 10px ${secondaryColor}`, animationDelay: '0.5s' }} />
        </div>

        <div className="relative p-3">
          <div className="w-full aspect-square mb-1.5 relative overflow-hidden rounded-xl bg-black/40">
            <img
              src={game.src}
              alt={game.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23001a33'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2300ffff' font-family='monospace' font-size='10'%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E";
              }}
            />

          </div>

          <div className="text-center">
            <div className="text-xs font-bold mb-1.5 truncate" style={{
              color: primaryColor,
              fontFamily: 'monospace',
              textShadow: `0 0 8px ${primaryColor}`,
              letterSpacing: '1px'
            }}>
              {game.name.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Hover Frame */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            border: `2px solid ${primaryColor}`,
            boxShadow: `0 0 20px ${primaryColor} inset, 0 0 40px ${secondaryColor} inset`
          }}
        />
      </div>
    </div>
  );
}

interface CasinoHolographicLayoutProps {
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

export default function CasinoHolographicLayout({
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
}: CasinoHolographicLayoutProps) {
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
      {/* Grid Mesh */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${primaryColor}20 1px, transparent 1px), linear-gradient(90deg, ${secondaryColor}20 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Holographic Header */}
      <div className="relative z-10 mb-2">
        <div
          className="p-3 rounded-2xl"
          style={{
            background: `${darkPrimary}66`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${primaryColor}40`,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div className="flex items-center justify-between w-full">
            <img
              src={selectedWebsite.logo}
              alt={selectedWebsite.name}
              style={{ height: '60px', filter: `drop-shadow(0 0 20px ${primaryColor}cc)` }}
            />
            <h1 className="text-lg font-black tracking-wider" style={{
              background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {customHeaderText}
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: secondaryColor }}>{getCurrentDate()}</span>
              <span style={{ color: primaryColor }}>{customTimeLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - 2 Column Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1">
        {/* Pragmatic Play - Alpha Matrix */}
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
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
              />
            )}
            <div className="relative z-10 flex items-center justify-center mb-1.5" style={{ overflow: 'visible' }}>
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
                className="h-10"
                style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80)`, transform: 'scale(2.5)' }}
                alt="Pragmatic Play"
              />
            </div>
            <div className="relative z-10 flex flex-wrap justify-center gap-2">
              {pragmaticGamesWithRTP.map((game, index) => (
                <div key={`pragmatic-${index}`} className={getCardWidthClass(pragmaticGamesWithRTP.length)}>
                  <HolographicGameCard
                    game={game}
                    rtp={game.rtp}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    moduleId={`PRG-${(index + 1).toString().padStart(3, '0')}`}
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
                  variant="galaxy"
                />
              </div>
            )}
          </div>
        </div>

        {/* PG Soft - Beta Matrix */}
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
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
              />
            )}
            <div className="relative z-10 flex items-center justify-center mb-1.5" style={{ overflow: 'visible' }}>
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
                className="h-10"
                style={{ filter: `drop-shadow(0 0 10px ${secondaryColor}80)`, transform: 'scale(2.5)' }}
                alt="PG Soft"
              />
            </div>
            <div className="relative z-10 flex flex-wrap justify-center gap-2">
              {pgSoftGamesWithRTP.map((game, index) => (
                <div key={`pgsoft-${index}`} className={getCardWidthClass(pgSoftGamesWithRTP.length)}>
                  <HolographicGameCard
                    game={game}
                    rtp={game.rtp}
                    primaryColor={secondaryColor}
                    secondaryColor={primaryColor}
                    moduleId={`PGS-${(index + 1).toString().padStart(3, '0')}`}
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
                  variant="galaxy"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
