'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption } from '@/types';

interface ElegantGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  secondaryColor: string;
}

function ElegantGameCard({ game, rtp, primaryColor, secondaryColor }: ElegantGameCardProps) {
  return (
    <div
      className="rounded-lg overflow-hidden w-[180px]"
      style={{
        background: 'linear-gradient(145deg, #2a2215 0%, #1a1508 100%)',
        border: `1px solid ${primaryColor}`,
        boxShadow: `0 4px 20px ${primaryColor}30`
      }}
    >
      <div className="relative w-full aspect-square overflow-hidden" style={{ borderBottom: `1px solid ${primaryColor}` }}>
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-contain bg-black/30"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        <div
          className="absolute top-2 right-2 px-3 py-1 rounded font-bold text-lg"
          style={{
            background: `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`,
            color: '#1a1508',
            boxShadow: `0 2px 10px ${primaryColor}80`
          }}
        >
          {rtp}%
        </div>
      </div>
      <div className="p-3">
        <h3
          className="font-semibold text-sm text-center truncate mb-2"
          style={{ color: primaryColor }}
        >
          {game.name}
        </h3>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#0d0a04', border: `1px solid ${primaryColor}50` }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${rtp}%`,
              background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface ElegantLayoutProps {
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

export default function ElegantLayout({
  selectedWebsite,
  selectedStyle,
  customTimeLabel,
  selectedPragmaticGames,
  selectedPgSoftGames,
  pragmaticCount,
  pgSoftCount,
  getCurrentDate,
  selectedCardStyle
}: ElegantLayoutProps) {
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
    <div className="relative z-10 flex flex-col min-h-full p-8" style={{ fontFamily: 'var(--font-exo2), sans-serif' }}>
      {/* Decorative Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='${encodeURIComponent(primaryColor)}' fill-opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <div
          className="inline-block px-12 py-6 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}15, rgba(0,0,0,0.8))`,
            border: `2px solid ${primaryColor}`,
            boxShadow: `0 0 30px ${primaryColor}30`
          }}
        >
          <img
            src={selectedWebsite.logo}
            alt={selectedWebsite.name}
            className="h-20 mx-auto mb-4"
            style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80)` }}
          />
          <h1
            className="text-4xl font-bold uppercase tracking-widest mb-3"
            style={{
              background: `linear-gradient(to bottom, ${secondaryColor} 0%, ${primaryColor} 50%, ${primaryColor}aa 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            GAME GACOR PILIHAN
          </h1>
          <div className="flex items-center justify-center gap-6">
            <span style={{ color: primaryColor }}>{getCurrentDate()}</span>
            <span className="w-px h-4" style={{ background: primaryColor }} />
            <span style={{ color: secondaryColor }}>{customTimeLabel}</span>
          </div>
        </div>
      </div>

      {/* Pragmatic Section */}
      <div
        className={`relative z-10 mb-8 p-4 rounded-xl ${getBlurClass()}`}
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
          className="relative z-10 flex items-center gap-4 mb-4 pb-2"
          style={{ borderBottom: `1px solid ${primaryColor}50` }}
        >
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
            className="h-16"
            style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80)`, transform: 'scale(1.3)' }}
            alt="Pragmatic Play"
          />
          <span className="text-lg font-semibold tracking-wider" style={{ color: primaryColor }}>PRAGMATIC PLAY</span>
        </div>
        <div className="relative z-10 flex flex-wrap justify-center gap-4">
          {pragmaticGamesWithRTP.map((game, index) => (
            <ElegantGameCard key={`pragmatic-${index}`} game={game} rtp={game.rtp} primaryColor={primaryColor} secondaryColor={secondaryColor} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-4">
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }} />
        <div className="w-3 h-3 rotate-45" style={{ background: primaryColor }} />
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }} />
      </div>

      {/* PG Soft Section */}
      <div
        className={`relative z-10 mb-8 p-4 rounded-xl ${getBlurClass()}`}
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
          className="relative z-10 flex items-center gap-4 mb-4 pb-2"
          style={{ borderBottom: `1px solid ${primaryColor}50` }}
        >
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
            className="h-16"
            style={{ filter: `drop-shadow(0 0 10px ${secondaryColor}80)`, transform: 'scale(1.3)' }}
            alt="PG Soft"
          />
          <span className="text-lg font-semibold tracking-wider" style={{ color: primaryColor }}>PG SOFT</span>
        </div>
        <div className="relative z-10 flex flex-wrap justify-center gap-4">
          {pgSoftGamesWithRTP.map((game, index) => (
            <ElegantGameCard key={`pgsoft-${index}`} game={game} rtp={game.rtp} primaryColor={primaryColor} secondaryColor={secondaryColor} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto text-center">
        <div
          className="inline-flex items-center gap-4 px-8 py-3 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.9))',
            border: `1px solid ${primaryColor}`
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
