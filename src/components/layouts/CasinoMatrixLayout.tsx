'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption } from '@/types';

interface MatrixGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  secondaryColor: string;
  index: number;
}

function MatrixGameCard({ game, rtp, primaryColor, secondaryColor, index }: MatrixGameCardProps) {
  return (
    <div
      className="relative overflow-hidden group cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #000000, #0a0f0a)',
        border: `1px solid ${primaryColor}40`,
        borderRadius: '4px',
        boxShadow: `0 0 20px ${primaryColor}20`,
        fontFamily: 'monospace'
      }}
    >
      {/* Matrix Rain Effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}10 2px, ${primaryColor}10 4px)`
        }}
      />

      <div className="relative z-10 p-3">
        <div className="w-full aspect-square mb-2 relative overflow-hidden bg-black/50 rounded">
          <img
            src={game.src}
            alt={game.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23000'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%230f0' font-family='monospace' font-size='12'%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E";
            }}
          />
          <div
            className="absolute top-1 right-1 px-2 py-1 text-xs font-bold"
            style={{
              background: primaryColor,
              color: '#000',
              boxShadow: `0 0 10px ${primaryColor}`,
              textShadow: '0 0 5px currentColor'
            }}
          >
            {rtp}%
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs font-bold mb-1 truncate" style={{ color: primaryColor }}>
            {game.name.toUpperCase()}
          </div>
          <div className="h-1 bg-black/50 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-1000"
              style={{
                width: `${rtp}%`,
                background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
                boxShadow: `0 0 10px ${primaryColor}`
              }}
            />
          </div>
          <div className="text-xs mt-1" style={{ color: secondaryColor }}>
            RTP: {rtp}%
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${primaryColor}20, transparent 70%)`,
          border: `1px solid ${primaryColor}`
        }}
      />
    </div>
  );
}

interface CasinoMatrixLayoutProps {
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

export default function CasinoMatrixLayout({
  selectedWebsite,
  selectedStyle,
  customTimeLabel,
  selectedPragmaticGames,
  selectedPgSoftGames,
  pragmaticCount,
  pgSoftCount,
  getCurrentDate,
  selectedCardStyle
}: CasinoMatrixLayoutProps) {
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
      {/* Matrix Background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}10 2px, ${primaryColor}10 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, ${primaryColor}10 2px, ${primaryColor}10 4px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center p-6 mb-6" style={{ borderBottom: `1px solid ${primaryColor}30` }}>
        <div className="mb-4">
          <div className="text-xs mb-2 tracking-widest" style={{ color: secondaryColor }}>
            [SYSTEM INITIALIZED]
          </div>
          <img
            src={selectedWebsite.logo}
            alt={selectedWebsite.name}
            className="h-20 mx-auto mb-4"
            style={{ filter: `drop-shadow(0 0 15px ${primaryColor}80)`, transform: 'scale(1.3)' }}
          />
          <h1 className="text-3xl font-bold mb-2 tracking-wider" style={{ color: primaryColor, textShadow: `0 0 20px ${primaryColor}` }}>
            {selectedWebsite.name.toUpperCase()}
          </h1>
          <div className="text-xs opacity-80" style={{ color: secondaryColor }}>
            DATE: {getCurrentDate()} | TIME: {customTimeLabel}
          </div>
        </div>
      </div>

      {/* Main Grid - 2 Columns with 3-column game grids */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Pragmatic Play Section */}
        <div
          className={`relative rounded p-4 ${getBlurClass()}`}
          style={{
            ...getSectionStyle(primaryColor),
            border: `1px solid ${primaryColor}30`,
            background: 'rgba(0,0,0,0.6)'
          }}
        >
          {/* Pattern Overlay */}
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none rounded"
              style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
            />
          )}
          <div className="relative z-10 flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: primaryColor }} />
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              className="h-12"
              style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80)`, transform: 'scale(1.3)' }}
              alt="Pragmatic Play"
            />
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: primaryColor }} />
          </div>
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-3">
            {pragmaticGamesWithRTP.map((game, index) => (
              <MatrixGameCard
                key={`pragmatic-${index}`}
                game={game}
                rtp={game.rtp}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* PG Soft Section */}
        <div
          className={`relative rounded p-4 ${getBlurClass()}`}
          style={{
            ...getSectionStyle(secondaryColor),
            border: `1px solid ${secondaryColor}30`,
            background: 'rgba(0,0,0,0.6)'
          }}
        >
          {/* Pattern Overlay */}
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none rounded"
              style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
            />
          )}
          <div className="relative z-10 flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: secondaryColor }} />
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
              className="h-12"
              style={{ filter: `drop-shadow(0 0 10px ${secondaryColor}80)`, transform: 'scale(1.3)' }}
              alt="PG Soft"
            />
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: secondaryColor }} />
          </div>
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-3">
            {pgSoftGamesWithRTP.map((game, index) => (
              <MatrixGameCard
                key={`pgsoft-${index}`}
                game={game}
                rtp={game.rtp}
                primaryColor={secondaryColor}
                secondaryColor={primaryColor}
                index={index + 10}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-6 text-center p-4" style={{ borderTop: `1px solid ${primaryColor}30` }}>
        <div className="inline-flex items-center gap-4">
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
