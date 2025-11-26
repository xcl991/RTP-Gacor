'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption } from '@/types';

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
        <div className="w-full aspect-square mb-2 relative overflow-hidden bg-black/70 rounded">
          <img
            src={game.src}
            alt={game.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23000'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23f0f' font-family='monospace' font-size='10'%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E";
            }}
          />

          {/* RTP Badge */}
          <div
            className="absolute top-2 right-2 px-2 py-1 text-xs font-black"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              color: '#000',
              clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))',
              boxShadow: `0 0 15px ${primaryColor}`
            }}
          >
            {rtp}%
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs font-black mb-1 tracking-wider truncate" style={{
            color: primaryColor,
            textShadow: `0 0 10px ${primaryColor}`,
            fontFamily: 'monospace'
          }}>
            {game.name.toUpperCase()}
          </div>
          <div className="h-1 bg-black/50 rounded-full overflow-hidden mb-1">
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
  selectedCardStyle
}: CasinoCyberpunkLayoutProps) {
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
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${primaryColor}20 1px, transparent 1px), linear-gradient(90deg, ${primaryColor}20 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div
          className="p-4 border-b-2"
          style={{ borderColor: primaryColor, background: 'rgba(0,0,0,0.8)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <img
                src={selectedWebsite.logo}
                alt={selectedWebsite.name}
                className="h-16"
                style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80)`, transform: 'scale(1.3)' }}
              />
            </div>
            <h1 className="text-2xl font-black tracking-wider" style={{
              color: primaryColor,
              textShadow: `0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}`
            }}>
              {selectedWebsite.name.toUpperCase()}
            </h1>
            <div className="text-xs font-mono opacity-80" style={{ color: secondaryColor }}>
              {getCurrentDate()} | {customTimeLabel}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - 2 Column Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Pragmatic Play Section */}
        <div
          className={`relative p-6 rounded-lg ${getBlurClass()}`}
          style={{
            ...getSectionStyle(primaryColor),
            border: `2px solid ${primaryColor}`,
            background: 'rgba(0,0,0,0.9)'
          }}
        >
          {/* Pattern Overlay */}
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
            />
          )}
          <div className="relative z-10 flex items-center gap-3 mb-6">
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              className="h-12"
              style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80)`, transform: 'scale(1.3)' }}
              alt="Pragmatic Play"
            />
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }} />
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-4">
            {pragmaticGamesWithRTP.map((game, index) => (
              <CyberpunkGameCard
                key={`pragmatic-${index}`}
                game={game}
                rtp={game.rtp}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            ))}
          </div>
        </div>

        {/* PG Soft Section */}
        <div
          className={`relative p-6 rounded-lg ${getBlurClass()}`}
          style={{
            ...getSectionStyle(secondaryColor),
            border: `2px solid ${secondaryColor}`,
            background: 'rgba(0,0,0,0.9)'
          }}
        >
          {/* Pattern Overlay */}
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
            />
          )}
          <div className="relative z-10 flex items-center gap-3 mb-6">
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
              className="h-12"
              style={{ filter: `drop-shadow(0 0 10px ${secondaryColor}80)`, transform: 'scale(1.3)' }}
              alt="PG Soft"
            />
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${secondaryColor}, transparent)` }} />
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-4">
            {pgSoftGamesWithRTP.map((game, index) => (
              <CyberpunkGameCard
                key={`pgsoft-${index}`}
                game={game}
                rtp={game.rtp}
                primaryColor={secondaryColor}
                secondaryColor={primaryColor}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-6 text-center">
        <div
          className="inline-flex items-center gap-4 px-6 py-3"
          style={{
            background: 'rgba(0,0,0,0.8)',
            border: `1px solid ${primaryColor}`,
            boxShadow: `0 0 20px ${primaryColor}30`
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={primaryColor}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span className="text-sm font-mono" style={{ color: primaryColor }}>
            @{selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
          </span>
        </div>
      </div>
    </div>
  );
}
