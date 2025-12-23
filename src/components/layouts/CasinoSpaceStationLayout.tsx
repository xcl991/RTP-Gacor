'use client';

import { useEffect, useRef, useState } from 'react';
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

interface SpaceGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  secondaryColor: string;
  bayNumber: number;
  darkBackground: string;
}

function SpaceGameCard({ game, rtp, primaryColor, secondaryColor, bayNumber, darkBackground }: SpaceGameCardProps) {
  return (
    <div
      className="relative group cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${darkBackground}e6, ${darkBackground}f2)`,
        border: `1px solid ${primaryColor}60`,
        borderRadius: '8px',
        boxShadow: `0 0 30px ${primaryColor}40, inset 0 0 20px rgba(0,50,100,0.3)`
      }}
    >
      {/* Hexagonal Grid Overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5L30 10L30 20L20 25L10 20L10 10Z' fill='none' stroke='${encodeURIComponent(primaryColor)}' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
          borderRadius: '8px'
        }}
      />

      {/* Status Indicators */}
      <div className="absolute top-2 left-2 flex gap-1 z-20">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primaryColor, animationDelay: '0.5s' }} />
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: secondaryColor, animationDelay: '1s' }} />
      </div>

      {/* Bay Number */}
      <div
        className="absolute top-2 right-2 px-2 py-1 text-xs font-mono font-bold z-20"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          color: '#000',
          borderRadius: '4px',
          boxShadow: `0 0 10px ${primaryColor}`
        }}
      >
        BAY-{bayNumber.toString().padStart(3, '0')}
      </div>

      <div className="relative z-10 p-3">
        <div className="w-full aspect-square mb-1.5 relative overflow-hidden bg-black/60" style={{ borderRadius: '8px' }}>
          <img
            src={game.src}
            alt={game.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23001428'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%234da6ff' font-family='monospace' font-size='10'%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E";
            }}
          />

        </div>

        <div className="text-center">
          <div className="text-xs font-bold mb-1 truncate" style={{
            color: primaryColor,
            fontFamily: 'monospace',
            textShadow: `0 0 6px ${primaryColor}`
          }}>
            {game.name.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Hover Frame */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          border: `2px solid ${primaryColor}`,
          boxShadow: `0 0 30px ${primaryColor} inset`,
          borderRadius: '8px'
        }}
      />
    </div>
  );
}

interface CasinoSpaceStationLayoutProps {
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

export default function CasinoSpaceStationLayout({
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
}: CasinoSpaceStationLayoutProps) {
  // Refs untuk trik panel containers
  const pragmaticTrikRef = useRef<HTMLDivElement>(null);
  const pgSoftTrikRef = useRef<HTMLDivElement>(null);
  const [trikMinHeight, setTrikMinHeight] = useState<number>(0);

  // Sync trik panel heights
  useEffect(() => {
    if (!pragmaticTrik.enabled || !pgSoftTrik.enabled) {
      // Only sync if both panels are enabled
      return;
    }

    const syncTrikHeights = () => {
      if (pragmaticTrikRef.current && pgSoftTrikRef.current) {
        // Reset min-height to measure natural heights
        pragmaticTrikRef.current.style.minHeight = 'auto';
        pgSoftTrikRef.current.style.minHeight = 'auto';

        // Force reflow to ensure accurate measurements
        void pragmaticTrikRef.current.offsetHeight;
        void pgSoftTrikRef.current.offsetHeight;

        // Use requestAnimationFrame for accurate measurements after render
        requestAnimationFrame(() => {
          if (pragmaticTrikRef.current && pgSoftTrikRef.current) {
            const pragmaticHeight = pragmaticTrikRef.current.offsetHeight;
            const pgSoftHeight = pgSoftTrikRef.current.offsetHeight;

            // Set min-height to the maximum of both
            const maxHeight = Math.max(pragmaticHeight, pgSoftHeight);

            if (maxHeight > 0) {
              setTrikMinHeight(maxHeight);
            }
          }
        });
      }
    };

    // Initial sync with delay
    const timeoutId = setTimeout(syncTrikHeights, 200);

    // Setup ResizeObserver for continuous monitoring
    const resizeObserver = new ResizeObserver(() => {
      syncTrikHeights();
    });

    if (pragmaticTrikRef.current) {
      resizeObserver.observe(pragmaticTrikRef.current);
    }
    if (pgSoftTrikRef.current) {
      resizeObserver.observe(pgSoftTrikRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [pragmaticTrik, pgSoftTrik]);

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
  const darkSecondary = adjustColor(secondaryColor, -80);

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
      {/* Space Nebula Effect */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${primaryColor}40 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${secondaryColor}40 0%, transparent 50%)`,
          filter: 'blur(60px)'
        }}
      />

      {/* Station Header */}
      <div className="relative z-10 mb-3">
        <div
          className="p-3"
          style={{
            background: `${darkPrimary}99`,
            backdropFilter: 'blur(5px)',
            border: `1px solid ${primaryColor}50`,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div className="flex items-center justify-between w-full">
            <img
              src={selectedWebsite.logo}
              alt={selectedWebsite.name}
              style={{ height: '60px', filter: `drop-shadow(0 0 20px ${primaryColor}80)` }}
            />
            <h1 className="text-lg font-bold tracking-wider" style={{
              color: primaryColor,
              textShadow: `0 0 20px ${primaryColor}, 0 0 40px ${primaryColor}50`
            }}>
              {customHeaderText}
            </h1>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <span style={{ color: secondaryColor }}>{getCurrentDate()}</span>
              <span style={{ color: primaryColor }}>{customTimeLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Docking Bays - 2 Column Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1">
        {/* Pragmatic Play - Alpha Wing */}
        <div>
          <div
            className={`relative p-3 ${getBlurClass()}`}
            style={{
              ...getSectionStyle(primaryColor),
              border: `1px solid ${primaryColor}30`,
              background: `${darkPrimary}99`,
              borderRadius: '8px'
            }}
          >
          {/* Pattern Overlay */}
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: selectedCardStyle.pattern,
                backgroundRepeat: 'repeat',
                borderRadius: '8px'
              }}
            />
          )}
          <div className="relative z-10 flex items-center justify-center mb-3" style={{ overflow: 'visible' }}>
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
                <SpaceGameCard
                  game={game}
                  rtp={game.rtp}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  bayNumber={index + 1}
                  darkBackground={darkerPrimary}
                />
              </div>
            ))}
          </div>
          {pragmaticTrik.enabled && (
            <div
              ref={pragmaticTrikRef}
              className="relative z-10 mt-3"
              style={{
                minHeight: pragmaticTrik.enabled && pgSoftTrik.enabled ? `${trikMinHeight}px` : 'auto'
              }}
            >
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

        {/* PG Soft - Beta Wing */}
        <div>
          <div
            className={`relative p-3 ${getBlurClass()}`}
            style={{
              ...getSectionStyle(secondaryColor),
              border: `1px solid ${secondaryColor}30`,
              background: `${darkSecondary}99`,
              borderRadius: '8px'
            }}
          >
            {/* Pattern Overlay */}
            {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: selectedCardStyle.pattern,
                  backgroundRepeat: 'repeat',
                  borderRadius: '8px'
                }}
              />
            )}
            <div className="relative z-10 flex items-center justify-center mb-3" style={{ overflow: 'visible' }}>
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
                  <SpaceGameCard
                    game={game}
                    rtp={game.rtp}
                    primaryColor={secondaryColor}
                    secondaryColor={primaryColor}
                    bayNumber={index + 101}
                    darkBackground={adjustColor(secondaryColor, -90)}
                  />
                </div>
              ))}
            </div>
            {pgSoftTrik.enabled && (
              <div
                ref={pgSoftTrikRef}
                className="relative z-10 mt-3"
                style={{
                  minHeight: pragmaticTrik.enabled && pgSoftTrik.enabled ? `${trikMinHeight}px` : 'auto'
                }}
              >
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
