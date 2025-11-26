'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption } from '@/types';

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
          <div className="w-full aspect-square mb-2 relative overflow-hidden rounded-xl bg-black/40">
            <img
              src={game.src}
              alt={game.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23001a33'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2300ffff' font-family='monospace' font-size='10'%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E";
              }}
            />

            {/* RTP Holographic Display */}
            <div
              className="absolute bottom-2 left-2 right-2 py-2 text-center"
              style={{
                background: `linear-gradient(90deg, rgba(0,0,0,0.8), ${primaryColor}20, rgba(0,0,0,0.8))`,
                border: `1px solid ${primaryColor}60`,
                borderRadius: '8px',
                backdropFilter: 'blur(5px)'
              }}
            >
              <div className="text-xs font-bold" style={{
                color: primaryColor,
                textShadow: `0 0 10px ${primaryColor}`,
                fontFamily: 'monospace'
              }}>
                RTP: {rtp}%
              </div>
              <div className="h-1 mt-1 bg-black/50 rounded-full overflow-hidden mx-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${rtp}%`,
                    background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
                    boxShadow: `0 0 10px ${primaryColor}`
                  }}
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs font-bold mb-2 truncate" style={{
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
  selectedCardStyle
}: CasinoHolographicLayoutProps) {
  const primaryColor = selectedStyle.primaryColor;
  const secondaryColor = selectedStyle.secondaryColor;

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

  return (
    <div className="relative z-10 flex flex-col min-h-full p-6" style={{ fontFamily: 'monospace' }}>
      {/* Grid Mesh */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${primaryColor}20 1px, transparent 1px), linear-gradient(90deg, ${secondaryColor}20 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Holographic Header */}
      <div className="relative z-10 mb-6">
        <div
          className="p-6 rounded-2xl"
          style={{
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${primaryColor}40`
          }}
        >
          <div className="text-center space-y-3">
            <div className="text-xs tracking-widest opacity-80" style={{ color: primaryColor }}>
              HOLOGRAPHIC RTP INTERFACE
            </div>
            <div className="flex items-center justify-center gap-4">
              <img
                src={selectedWebsite.logo}
                alt={selectedWebsite.name}
                className="h-20"
                style={{ filter: `drop-shadow(0 0 20px ${primaryColor}cc)`, transform: 'scale(1.3)' }}
              />
            </div>
            <h1 className="text-4xl font-black tracking-wider" style={{
              background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {selectedWebsite.name.toUpperCase()}
            </h1>
            <div className="flex items-center justify-center gap-6 text-xs">
              <span style={{ color: secondaryColor }}>DATE: {getCurrentDate()}</span>
              <span style={{ color: primaryColor }}>TIME: {customTimeLabel}</span>
              <span className="text-green-400">STATUS: ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - 2 Column Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Pragmatic Play - Alpha Matrix */}
        <div className="space-y-4">
          <div
            className={`relative p-4 rounded-2xl ${getBlurClass()}`}
            style={{
              ...getSectionStyle(primaryColor),
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(5px)',
              border: `1px solid ${primaryColor}30`
            }}
          >
            {/* Pattern Overlay */}
            {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
              />
            )}
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 15px ${primaryColor}` }} />
                <img
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
                  className="h-10"
                  style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80)`, transform: 'scale(1.3)' }}
                  alt="Pragmatic Play"
                />
              </div>
              <div className="text-xs font-mono opacity-60" style={{ color: primaryColor }}>
                MODULES: {pragmaticGamesWithRTP.length}
              </div>
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-4">
              {pragmaticGamesWithRTP.map((game, index) => (
                <HolographicGameCard
                  key={`pragmatic-${index}`}
                  game={game}
                  rtp={game.rtp}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  moduleId={`PRG-${(index + 1).toString().padStart(3, '0')}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* PG Soft - Beta Matrix */}
        <div className="space-y-4">
          <div
            className={`relative p-4 rounded-2xl ${getBlurClass()}`}
            style={{
              ...getSectionStyle(secondaryColor),
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(5px)',
              border: `1px solid ${secondaryColor}30`
            }}
          >
            {/* Pattern Overlay */}
            {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
              />
            )}
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: secondaryColor, boxShadow: `0 0 15px ${secondaryColor}` }} />
                <img
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
                  className="h-10"
                  style={{ filter: `drop-shadow(0 0 10px ${secondaryColor}80)`, transform: 'scale(1.3)' }}
                  alt="PG Soft"
                />
              </div>
              <div className="text-xs font-mono opacity-60" style={{ color: secondaryColor }}>
                MODULES: {pgSoftGamesWithRTP.length}
              </div>
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-4">
              {pgSoftGamesWithRTP.map((game, index) => (
                <HolographicGameCard
                  key={`pgsoft-${index}`}
                  game={game}
                  rtp={game.rtp}
                  primaryColor={secondaryColor}
                  secondaryColor={primaryColor}
                  moduleId={`PGS-${(index + 1).toString().padStart(3, '0')}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-6 text-center">
        <div
          className="inline-flex items-center gap-4 px-8 py-4 rounded-full"
          style={{
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${primaryColor}40`
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill={primaryColor}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span className="text-lg font-semibold" style={{ color: primaryColor }}>
            @{selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
          </span>
        </div>
      </div>
    </div>
  );
}
