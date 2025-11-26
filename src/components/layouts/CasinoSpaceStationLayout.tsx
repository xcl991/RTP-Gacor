'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption } from '@/types';

interface SpaceGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  secondaryColor: string;
  bayNumber: number;
}

function SpaceGameCard({ game, rtp, primaryColor, secondaryColor, bayNumber }: SpaceGameCardProps) {
  return (
    <div
      className="relative group cursor-pointer"
      style={{
        background: `linear-gradient(135deg, rgba(0,20,40,0.9), rgba(0,10,30,0.95))`,
        border: `1px solid ${primaryColor}60`,
        borderRadius: '12px',
        boxShadow: `0 0 30px ${primaryColor}40, inset 0 0 20px rgba(0,50,100,0.3)`
      }}
    >
      {/* Hexagonal Grid Overlay */}
      <div
        className="absolute inset-0 opacity-20 rounded-xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5L30 10L30 20L20 25L10 20L10 10Z' fill='none' stroke='${encodeURIComponent(primaryColor)}' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
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
        <div className="w-full aspect-square mb-2 relative overflow-hidden bg-black/50 rounded-lg">
          <img
            src={game.src}
            alt={game.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23001428'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%234da6ff' font-family='monospace' font-size='10'%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E";
            }}
          />

          {/* RTP Display */}
          <div
            className="absolute bottom-2 left-2 right-2 py-1 px-2 text-center text-xs font-bold"
            style={{
              background: `linear-gradient(90deg, rgba(0,0,0,0.8), ${primaryColor}40, rgba(0,0,0,0.8))`,
              color: primaryColor,
              border: `1px solid ${primaryColor}`,
              borderRadius: '4px',
              textShadow: `0 0 5px ${primaryColor}`
            }}
          >
            RTP: {rtp}%
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs font-bold mb-2 truncate" style={{
            color: primaryColor,
            fontFamily: 'monospace',
            textShadow: `0 0 8px ${primaryColor}`
          }}>
            {game.name.toUpperCase()}
          </div>

          {/* Power Bar */}
          <div className="h-2 bg-black/50 rounded-full overflow-hidden" style={{ border: `1px solid ${primaryColor}30` }}>
            <div
              className="h-full rounded-full relative"
              style={{
                width: `${rtp}%`,
                background: `linear-gradient(90deg, ${secondaryColor}, ${primaryColor})`,
                boxShadow: `0 0 10px ${primaryColor}`
              }}
            />
          </div>
        </div>
      </div>

      {/* Hover Frame */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{
          border: `2px solid ${primaryColor}`,
          boxShadow: `0 0 30px ${primaryColor} inset`
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
  selectedCardStyle
}: CasinoSpaceStationLayoutProps) {
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
      {/* Space Nebula Effect */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${primaryColor}40 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${secondaryColor}40 0%, transparent 50%)`,
          filter: 'blur(60px)'
        }}
      />

      {/* Station Header */}
      <div className="relative z-10 mb-6">
        <div
          className="p-6 rounded-xl"
          style={{
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(5px)',
            border: `1px solid ${primaryColor}50`
          }}
        >
          <div className="text-center space-y-2">
            <div className="text-xs tracking-widest opacity-80" style={{ color: primaryColor }}>
              SPACE STATION RTP CONTROL
            </div>
            <img
              src={selectedWebsite.logo}
              alt={selectedWebsite.name}
              className="h-20 mx-auto"
              style={{ filter: `drop-shadow(0 0 20px ${primaryColor}80)`, transform: 'scale(1.3)' }}
            />
            <h1 className="text-3xl font-bold tracking-wider" style={{
              color: primaryColor,
              textShadow: `0 0 20px ${primaryColor}, 0 0 40px ${primaryColor}50`
            }}>
              {selectedWebsite.name.toUpperCase()}
            </h1>
            <div className="flex items-center justify-center gap-6 text-xs opacity-80">
              <span style={{ color: secondaryColor }}>STARDATE: {getCurrentDate()}</span>
              <span style={{ color: primaryColor }}>CYCLE: {customTimeLabel}</span>
              <span className="text-green-400">STATUS: ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Docking Bays - 2 Column Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Pragmatic Play - Alpha Wing */}
        <div
          className={`relative p-4 rounded-xl ${getBlurClass()}`}
          style={{
            ...getSectionStyle(primaryColor),
            background: 'rgba(0,0,0,0.3)',
            border: `1px solid ${primaryColor}30`
          }}
        >
          {/* Pattern Overlay */}
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
            />
          )}
          <div className="relative z-10 flex items-center gap-3 mb-4 p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${primaryColor}30` }}>
            <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              className="h-10"
              style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80)`, transform: 'scale(1.3)' }}
              alt="Pragmatic Play"
            />
            <div className="flex-1 text-right text-xs opacity-60" style={{ color: primaryColor }}>
              {pragmaticGamesWithRTP.length} BAYS ACTIVE
            </div>
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-4">
            {pragmaticGamesWithRTP.map((game, index) => (
              <SpaceGameCard
                key={`pragmatic-${index}`}
                game={game}
                rtp={game.rtp}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                bayNumber={index + 1}
              />
            ))}
          </div>
        </div>

        {/* PG Soft - Beta Wing */}
        <div
          className={`relative p-4 rounded-xl ${getBlurClass()}`}
          style={{
            ...getSectionStyle(secondaryColor),
            background: 'rgba(0,0,0,0.3)',
            border: `1px solid ${secondaryColor}30`
          }}
        >
          {/* Pattern Overlay */}
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
            />
          )}
          <div className="relative z-10 flex items-center gap-3 mb-4 p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${secondaryColor}30` }}>
            <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: secondaryColor }} />
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
              className="h-10"
              style={{ filter: `drop-shadow(0 0 10px ${secondaryColor}80)`, transform: 'scale(1.3)' }}
              alt="PG Soft"
            />
            <div className="flex-1 text-right text-xs opacity-60" style={{ color: secondaryColor }}>
              {pgSoftGamesWithRTP.length} BAYS ACTIVE
            </div>
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-4">
            {pgSoftGamesWithRTP.map((game, index) => (
              <SpaceGameCard
                key={`pgsoft-${index}`}
                game={game}
                rtp={game.rtp}
                primaryColor={secondaryColor}
                secondaryColor={primaryColor}
                bayNumber={index + 101}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Station Footer */}
      <div className="relative z-10 mt-6 text-center">
        <div
          className="inline-flex items-center gap-4 px-6 py-3 rounded-lg"
          style={{
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(5px)',
            border: `1px solid ${primaryColor}30`
          }}
        >
          <span className="text-green-400 text-xs">LIFE_SUPPORT: ONLINE</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={primaryColor}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span className="text-sm" style={{ color: primaryColor }}>
            @{selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
          </span>
        </div>
      </div>
    </div>
  );
}
