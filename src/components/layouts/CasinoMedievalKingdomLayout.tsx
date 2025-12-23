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

interface MedievalGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  secondaryColor: string;
  sealNumber: number;
  darkBackground: string;
}

function MedievalGameCard({ game, rtp, primaryColor, secondaryColor, sealNumber, darkBackground }: MedievalGameCardProps) {
  return (
    <div
      className="relative group cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${darkBackground}f2, ${darkBackground}e6)`,
        border: `2px solid ${primaryColor}`,
        borderRadius: '4px',
        boxShadow: `0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,215,0,0.3), 0 0 20px ${primaryColor}40`,
        position: 'relative'
      }}
    >
      {/* Medieval Stone Texture Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0zm50 0h40v40H50zM0 50h40v40H0zm50 0h40v40H50z' fill='%23000' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px',
          borderRadius: '4px'
        }}
      />

      {/* Ornamental Corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 opacity-60" style={{ borderColor: secondaryColor }} />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 opacity-60" style={{ borderColor: secondaryColor }} />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 opacity-60" style={{ borderColor: secondaryColor }} />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 opacity-60" style={{ borderColor: secondaryColor }} />

      {/* Crown Status Badge */}
      <div
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs font-bold z-20"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          color: '#1a0a00',
          borderRadius: '12px',
          border: '2px solid rgba(255,215,0,0.5)',
          boxShadow: `0 4px 8px rgba(0,0,0,0.4), 0 0 15px ${primaryColor}80`,
          fontFamily: 'serif',
          letterSpacing: '1px'
        }}
      >
        👑 {rtp}%
      </div>

      {/* Royal Seal Number */}
      <div
        className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-20"
        style={{
          background: `radial-gradient(circle, ${secondaryColor}, ${primaryColor})`,
          color: '#000',
          border: `2px solid rgba(255,215,0,0.6)`,
          boxShadow: `0 0 10px ${secondaryColor}, inset 0 1px 2px rgba(255,255,255,0.3)`,
          fontFamily: 'serif'
        }}
      >
        {sealNumber}
      </div>

      <div className="relative z-10 p-3 pt-4">
        <div
          className="w-full aspect-square mb-2 relative overflow-hidden"
          style={{
            borderRadius: '4px',
            border: `1px solid ${primaryColor}60`,
            background: 'rgba(0,0,0,0.5)',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6)'
          }}
        >
          <img
            src={game.src}
            alt={game.name}
            className="w-full h-full object-contain"
            style={{
              filter: 'contrast(1.1) brightness(0.95)'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23261a0d'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d4af37' font-family='serif' font-size='12'%3E[MISSING]%3C/text%3E%3C/svg%3E";
            }}
          />
          {/* Inner Frame */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              border: `1px solid ${secondaryColor}30`,
              boxShadow: `inset 0 0 10px ${primaryColor}20`
            }}
          />
        </div>

        <div className="text-center">
          <div
            className="text-xs font-bold mb-1 truncate px-1"
            style={{
              color: primaryColor,
              fontFamily: 'serif',
              textShadow: `0 2px 4px rgba(0,0,0,0.8), 0 0 8px ${primaryColor}60`,
              letterSpacing: '0.5px'
            }}
          >
            {game.name.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${primaryColor}20, transparent 70%)`,
          boxShadow: `inset 0 0 20px ${primaryColor}60`,
          borderRadius: '4px'
        }}
      />
    </div>
  );
}

interface CasinoMedievalKingdomLayoutProps {
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

export default function CasinoMedievalKingdomLayout({
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
}: CasinoMedievalKingdomLayoutProps) {
  // Refs untuk trik panel containers
  const pragmaticTrikRef = useRef<HTMLDivElement>(null);
  const pgSoftTrikRef = useRef<HTMLDivElement>(null);
  const [trikMinHeight, setTrikMinHeight] = useState<number>(0);

  // Sync trik panel heights
  useEffect(() => {
    if (!pragmaticTrik.enabled || !pgSoftTrik.enabled) {
      return;
    }

    const syncTrikHeights = () => {
      if (pragmaticTrikRef.current && pgSoftTrikRef.current) {
        pragmaticTrikRef.current.style.minHeight = 'auto';
        pgSoftTrikRef.current.style.minHeight = 'auto';

        void pragmaticTrikRef.current.offsetHeight;
        void pgSoftTrikRef.current.offsetHeight;

        requestAnimationFrame(() => {
          if (pragmaticTrikRef.current && pgSoftTrikRef.current) {
            const pragmaticHeight = pragmaticTrikRef.current.offsetHeight;
            const pgSoftHeight = pgSoftTrikRef.current.offsetHeight;
            const maxHeight = Math.max(pragmaticHeight, pgSoftHeight);

            if (maxHeight > 0) {
              setTrikMinHeight(maxHeight);
            }
          }
        });
      }
    };

    const timeoutId = setTimeout(syncTrikHeights, 200);
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

  const primaryColor = selectedStyle.primaryColor;
  const secondaryColor = selectedStyle.secondaryColor;

  const darkPrimary = adjustColor(primaryColor, -60);
  const darkerPrimary = adjustColor(primaryColor, -75);
  const darkSecondary = adjustColor(secondaryColor, -60);

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
    <div
      className="relative z-10 flex flex-col min-h-full p-4"
      style={{
        fontFamily: 'serif',
        background: 'radial-gradient(ellipse at top, rgba(60,30,15,0.3), transparent 60%)'
      }}
    >
      {/* Parchment Texture Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* Royal Castle Header */}
      <div className="relative z-10 mb-4">
        <div
          className="relative p-4"
          style={{
            background: `linear-gradient(180deg, ${darkPrimary}e6, ${darkerPrimary}f2)`,
            border: `3px solid ${primaryColor}`,
            borderRadius: '8px',
            boxShadow: `0 10px 30px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,215,0,0.2), 0 0 40px ${primaryColor}30`
          }}
        >
          {/* Decorative Banner Top */}
          <div
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-6 py-1 text-xs font-bold"
            style={{
              background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`,
              color: '#1a0a00',
              clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
              boxShadow: `0 4px 8px rgba(0,0,0,0.6)`,
              letterSpacing: '2px'
            }}
          >
            ⚜️ ROYAL DECREE ⚜️
          </div>

          {/* Ornamental Border Pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5 L25 15 L20 25 L15 15 Z' fill='none' stroke='${encodeURIComponent(secondaryColor)}' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
              borderRadius: '8px'
            }}
          />

          <div className="relative flex items-center justify-between">
            <div
              className="flex-shrink-0 p-2 rounded"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: `2px solid ${primaryColor}60`,
                boxShadow: `0 0 20px ${primaryColor}40`
              }}
            >
              <img
                src={selectedWebsite.logo}
                alt={selectedWebsite.name}
                style={{
                  height: '60px',
                  filter: `drop-shadow(0 4px 8px ${primaryColor}80) contrast(1.1)`
                }}
              />
            </div>

            <div className="text-center flex-1 px-4">
              <h1
                className="text-xl font-bold tracking-wider mb-1"
                style={{
                  color: primaryColor,
                  textShadow: `0 0 20px ${primaryColor}, 0 4px 8px rgba(0,0,0,0.8), 0 0 40px ${secondaryColor}`,
                  letterSpacing: '3px'
                }}
              >
                {customHeaderText}
              </h1>
              <div className="flex items-center justify-center gap-3 text-sm">
                <span
                  className="px-3 py-1 rounded"
                  style={{
                    color: secondaryColor,
                    background: 'rgba(0,0,0,0.5)',
                    border: `1px solid ${secondaryColor}40`,
                    fontFamily: 'serif',
                    letterSpacing: '1px'
                  }}
                >
                  📅 {getCurrentDate()}
                </span>
                <span
                  className="px-3 py-1 rounded"
                  style={{
                    color: primaryColor,
                    background: 'rgba(0,0,0,0.5)',
                    border: `1px solid ${primaryColor}40`,
                    fontFamily: 'serif',
                    letterSpacing: '1px'
                  }}
                >
                  ⏰ {customTimeLabel}
                </span>
              </div>
            </div>

            <div
              className="flex-shrink-0 p-3 rounded"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: `2px solid ${secondaryColor}60`,
                boxShadow: `0 0 20px ${secondaryColor}40`
              }}
            >
              <div className="text-4xl">🏰</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Kingdom Halls - 2 Column Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        {/* Pragmatic Play - Royal Court */}
        <div>
          <div
            className={`relative p-4 ${getBlurClass()}`}
            style={{
              ...getSectionStyle(primaryColor),
              border: `3px double ${primaryColor}`,
              background: `linear-gradient(135deg, ${darkPrimary}d9, ${darkerPrimary}e6)`,
              borderRadius: '8px',
              boxShadow: `0 8px 24px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,215,0,0.15), 0 0 30px ${primaryColor}20`
            }}
          >
            {/* Pattern Overlay */}
            {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: selectedCardStyle.pattern,
                  backgroundRepeat: 'repeat',
                  borderRadius: '8px',
                  opacity: 0.3
                }}
              />
            )}

            {/* Banner Ribbon for Provider */}
            <div className="relative z-10 mb-4">
              <div
                className="relative py-3 px-4 mx-auto"
                style={{
                  background: `linear-gradient(90deg, transparent, ${primaryColor}40, ${secondaryColor}40, ${primaryColor}40, transparent)`,
                  border: `2px solid ${primaryColor}`,
                  borderLeft: 'none',
                  borderRight: 'none',
                  boxShadow: `0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,215,0,0.3)`
                }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-8"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, transparent)`,
                    clipPath: 'polygon(0 0, 100% 0, 0 100%)'
                  }}
                />
                <div
                  className="absolute right-0 top-0 bottom-0 w-8"
                  style={{
                    background: `linear-gradient(225deg, ${primaryColor}, transparent)`,
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
                  }}
                />

                <div className="flex items-center justify-center relative" style={{ overflow: 'visible' }}>
                  <div
                    className="absolute left-0 text-2xl"
                    style={{ textShadow: `0 0 10px ${primaryColor}` }}
                  >
                    ⚔️
                  </div>
                  <img
                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
                    className="h-12"
                    style={{
                      filter: `drop-shadow(0 4px 6px ${primaryColor}80) brightness(1.1)`,
                      transform: 'scale(1.3)',
                      transformOrigin: 'center'
                    }}
                    alt="Pragmatic Play"
                  />
                  <div
                    className="absolute right-0 text-2xl"
                    style={{ textShadow: `0 0 10px ${primaryColor}` }}
                  >
                    ⚔️
                  </div>
                </div>

                <div
                  className="text-center text-xs font-bold mt-1 tracking-widest"
                  style={{
                    color: primaryColor,
                    textShadow: `0 2px 4px rgba(0,0,0,0.8), 0 0 10px ${primaryColor}60`
                  }}
                >
                  👑 ROYAL COURT 👑
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap justify-center gap-3">
              {pragmaticGamesWithRTP.map((game, index) => (
                <div key={`pragmatic-${index}`} className={getCardWidthClass(pragmaticGamesWithRTP.length)}>
                  <MedievalGameCard
                    game={game}
                    rtp={game.rtp}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    sealNumber={index + 1}
                    darkBackground={darkerPrimary}
                  />
                </div>
              ))}
            </div>

            {pragmaticTrik.enabled && (
              <div
                ref={pragmaticTrikRef}
                className="relative z-10 mt-4"
                style={{
                  minHeight: pragmaticTrik.enabled && pgSoftTrik.enabled ? `${trikMinHeight}px` : 'auto'
                }}
              >
                <TrikPanel
                  trik={pragmaticTrik}
                  providerColor={primaryColor}
                  fontFamily="serif"
                  cardStyle={selectedCardStyle}
                  variant="royal"
                />
              </div>
            )}
          </div>
        </div>

        {/* PG Soft - Knight's Hall */}
        <div>
          <div
            className={`relative p-4 ${getBlurClass()}`}
            style={{
              ...getSectionStyle(secondaryColor),
              border: `3px double ${secondaryColor}`,
              background: `linear-gradient(135deg, ${darkSecondary}d9, ${darkSecondary}e6)`,
              borderRadius: '8px',
              boxShadow: `0 8px 24px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,215,0,0.15), 0 0 30px ${secondaryColor}20`
            }}
          >
            {/* Pattern Overlay */}
            {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: selectedCardStyle.pattern,
                  backgroundRepeat: 'repeat',
                  borderRadius: '8px',
                  opacity: 0.3
                }}
              />
            )}

            {/* Banner Ribbon for Provider */}
            <div className="relative z-10 mb-4">
              <div
                className="relative py-3 px-4 mx-auto"
                style={{
                  background: `linear-gradient(90deg, transparent, ${secondaryColor}40, ${primaryColor}40, ${secondaryColor}40, transparent)`,
                  border: `2px solid ${secondaryColor}`,
                  borderLeft: 'none',
                  borderRight: 'none',
                  boxShadow: `0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,215,0,0.3)`
                }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-8"
                  style={{
                    background: `linear-gradient(135deg, ${secondaryColor}, transparent)`,
                    clipPath: 'polygon(0 0, 100% 0, 0 100%)'
                  }}
                />
                <div
                  className="absolute right-0 top-0 bottom-0 w-8"
                  style={{
                    background: `linear-gradient(225deg, ${secondaryColor}, transparent)`,
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
                  }}
                />

                <div className="flex items-center justify-center relative" style={{ overflow: 'visible' }}>
                  <div
                    className="absolute left-0 text-2xl"
                    style={{ textShadow: `0 0 10px ${secondaryColor}` }}
                  >
                    🛡️
                  </div>
                  <img
                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
                    className="h-12"
                    style={{
                      filter: `drop-shadow(0 4px 6px ${secondaryColor}80) brightness(1.1)`,
                      transform: 'scale(1.3)',
                      transformOrigin: 'center'
                    }}
                    alt="PG Soft"
                  />
                  <div
                    className="absolute right-0 text-2xl"
                    style={{ textShadow: `0 0 10px ${secondaryColor}` }}
                  >
                    🛡️
                  </div>
                </div>

                <div
                  className="text-center text-xs font-bold mt-1 tracking-widest"
                  style={{
                    color: secondaryColor,
                    textShadow: `0 2px 4px rgba(0,0,0,0.8), 0 0 10px ${secondaryColor}60`
                  }}
                >
                  🗡️ KNIGHT&apos;S HALL 🗡️
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap justify-center gap-3">
              {pgSoftGamesWithRTP.map((game, index) => (
                <div key={`pgsoft-${index}`} className={getCardWidthClass(pgSoftGamesWithRTP.length)}>
                  <MedievalGameCard
                    game={game}
                    rtp={game.rtp}
                    primaryColor={secondaryColor}
                    secondaryColor={primaryColor}
                    sealNumber={index + 100}
                    darkBackground={darkSecondary}
                  />
                </div>
              ))}
            </div>

            {pgSoftTrik.enabled && (
              <div
                ref={pgSoftTrikRef}
                className="relative z-10 mt-4"
                style={{
                  minHeight: pragmaticTrik.enabled && pgSoftTrik.enabled ? `${trikMinHeight}px` : 'auto'
                }}
              >
                <TrikPanel
                  trik={pgSoftTrik}
                  hideFiturGanda={true}
                  providerColor={secondaryColor}
                  fontFamily="serif"
                  cardStyle={selectedCardStyle}
                  variant="royal"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Royal Telegram Scroll - Medieval Telegram Section */}
      <div className="relative z-10 mt-4">
        <div
          className="relative p-4 flex items-center justify-center gap-3"
          style={{
            background: `linear-gradient(135deg, ${darkPrimary}d9, ${darkerPrimary}e6)`,
            border: `3px double ${primaryColor}`,
            borderRadius: '8px',
            boxShadow: `0 8px 24px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,215,0,0.15), 0 0 30px ${primaryColor}20`
          }}
        >
          {/* Decorative Scroll Top */}
          <div
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-6 py-1 text-xs font-bold"
            style={{
              background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`,
              color: '#1a0a00',
              clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
              boxShadow: `0 4px 8px rgba(0,0,0,0.6)`,
              letterSpacing: '2px'
            }}
          >
            ⚜️ ROYAL MESSENGER ⚜️
          </div>

          {/* Parchment Texture */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0zm50 0h40v40H50zM0 50h40v40H0zm50 0h40v40H50z' fill='%23000' opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '50px 50px',
              borderRadius: '8px'
            }}
          />

          {/* Ornamental Corners */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 opacity-60" style={{ borderColor: secondaryColor }} />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 opacity-60" style={{ borderColor: secondaryColor }} />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 opacity-60" style={{ borderColor: secondaryColor }} />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 opacity-60" style={{ borderColor: secondaryColor }} />

          {/* Telegram Icon with Royal Seal */}
          <div className="relative z-10 flex-shrink-0">
            <div
              className="relative w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle, ${secondaryColor}, ${primaryColor})`,
                border: `2px solid rgba(255,215,0,0.6)`,
                boxShadow: `0 0 20px ${secondaryColor}, inset 0 2px 4px rgba(255,255,255,0.3)`
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7"
                fill="#1a0a00"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.49-.82-.27-1.47-.42-1.42-.88.03-.24.37-.48 1.02-.73 3.99-1.74 6.66-2.89 8-3.45 3.82-1.66 4.61-1.95 5.13-1.96.11 0 .37.03.54.17.14.11.18.26.2.37.01.08.03.29.01.45z"/>
              </svg>
            </div>
            {/* Corner ornaments on seal */}
            <div className="absolute -top-1 -right-1 text-xs" style={{ color: secondaryColor }}>⚜</div>
            <div className="absolute -bottom-1 -left-1 text-xs" style={{ color: primaryColor }}>⚜</div>
          </div>

          {/* Telegram Text with Medieval Styling */}
          <div className="relative z-10">
            <span
              className="text-xl font-bold tracking-wider"
              style={{
                color: primaryColor,
                textShadow: `0 0 15px ${primaryColor}, 0 2px 4px rgba(0,0,0,0.8)`,
                fontFamily: 'serif',
                letterSpacing: '2px'
              }}
            >
              Join Komunitas Telegram : @{telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}
            </span>
          </div>

          {/* Decorative Flourish */}
          <div
            className="absolute top-2 right-4 text-2xl opacity-40"
            style={{ color: secondaryColor }}
          >
            🏰
          </div>
        </div>
      </div>
    </div>
  );
}
