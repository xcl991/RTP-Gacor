'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption } from '@/types';

interface SteampunkGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  secondaryColor: string;
  rotation?: number;
}

function SteampunkGameCard({ game, rtp, primaryColor, secondaryColor, rotation = 0 }: SteampunkGameCardProps) {
  return (
    <div className="relative w-[180px]">
      {/* Shadow layer with rotation */}
      <div
        className="absolute inset-0"
        style={{
          transform: `rotate(${rotation}deg)`,
          background: 'rgba(30,20,10,0.8)',
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
          background: `linear-gradient(145deg, rgba(45,35,25,0.95), rgba(25,18,12,0.98))`,
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
          {/* RTP Badge */}
          <div
            className="absolute top-2 right-2 px-3 py-1 rounded font-bold text-lg"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              color: '#1a1208',
              boxShadow: `0 0 15px ${primaryColor}80`,
              textShadow: '0 1px 2px rgba(255,255,255,0.2)'
            }}
          >
            {rtp}%
          </div>
        </div>

        <div className="text-center">
          <h3
            className="font-bold text-sm truncate mb-2"
            style={{ color: primaryColor }}
          >
            {game.name}
          </h3>
          {/* Progress bar with Victorian style */}
          <div
            className="h-3 rounded-full overflow-hidden"
            style={{
              background: 'rgba(0,0,0,0.5)',
              border: `1px solid ${primaryColor}50`
            }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${rtp}%`,
                background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
                boxShadow: `inset 0 1px 2px rgba(255,255,255,0.3)`
              }}
            />
          </div>
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
  selectedCardStyle
}: SteampunkLayoutProps) {
  const primaryColor = selectedStyle.primaryColor;
  const secondaryColor = selectedStyle.secondaryColor;

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
    <div className="relative z-10 flex flex-col min-h-full p-6" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
      {/* Steampunk Pattern Background */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${primaryColor} 0px, ${primaryColor} 2px, transparent 2px, transparent 15px)`
        }}
      />

      {/* Decorative Gears */}
      <div
        className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-20"
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
        className="relative z-10 text-center mb-8 p-8 rounded-2xl"
        style={{
          background: `linear-gradient(145deg, rgba(45,35,25,0.95), rgba(25,18,12,0.98))`,
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
            className="h-24 mx-auto mb-4"
            style={{ filter: `drop-shadow(0 0 15px ${primaryColor}80)` }}
          />
          <h1
            className="text-4xl font-bold mb-4"
            style={{
              color: primaryColor,
              textShadow: `2px 2px 4px rgba(0,0,0,0.8)`
            }}
          >
            ♔ SYSTEM LIVE RTP GACOR ♔
          </h1>
          <div className="text-lg mb-2" style={{ color: secondaryColor }}>
            {getCurrentDate()}
          </div>
          <div
            className="text-xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Working Hours: {customTimeLabel}
          </div>
          <div
            className="text-2xl font-bold"
            style={{ color: secondaryColor }}
          >
            ~ {selectedWebsite.name} ESTABLISHMENT ~
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
          className="relative z-10 text-center p-4 mb-6 rounded-xl"
        >
          <div className="flex items-center justify-center gap-4">
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              className="h-20"
              style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80)`, transform: 'scale(1.3)' }}
              alt="Pragmatic Play"
            />
            <h3
              className="text-xl font-bold"
              style={{ color: primaryColor }}
            >
              PRAGMATIC PLAY
            </h3>
          </div>
        </div>
        <div className="relative z-10 flex flex-wrap justify-center gap-6">
          {pragmaticGamesWithRTP.map((game, index) => (
            <SteampunkGameCard
              key={`pragmatic-${index}`}
              game={game}
              rtp={game.rtp}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              rotation={index % 2 === 0 ? 2 : -2}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-1 rounded" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }} />
        <div className="w-4 h-4 rounded-full" style={{ background: primaryColor }} />
        <div className="flex-1 h-1 rounded" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }} />
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
          className="relative z-10 text-center p-4 mb-6 rounded-xl"
        >
          <div className="flex items-center justify-center gap-4">
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
              className="h-20"
              style={{ filter: `drop-shadow(0 0 10px ${secondaryColor}80)`, transform: 'scale(1.3)' }}
              alt="PG Soft"
            />
            <h3
              className="text-xl font-bold"
              style={{ color: secondaryColor }}
            >
              PG SOFT
            </h3>
          </div>
        </div>
        <div className="relative z-10 flex flex-wrap justify-center gap-6">
          {pgSoftGamesWithRTP.map((game, index) => (
            <SteampunkGameCard
              key={`pgsoft-${index}`}
              game={game}
              rtp={game.rtp}
              primaryColor={secondaryColor}
              secondaryColor={primaryColor}
              rotation={index % 2 === 0 ? -2 : 2}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto text-center">
        <div
          className="inline-flex items-center gap-4 px-8 py-4 rounded-full"
          style={{
            background: `linear-gradient(145deg, rgba(45,35,25,0.95), rgba(25,18,12,0.98))`,
            border: `3px solid ${primaryColor}`,
            boxShadow: `inset 0 0 20px ${secondaryColor}30`
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
