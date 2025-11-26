'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption } from '@/types';

interface FuturisticGameCardProps {
  game: Game;
  rtp: number;
  style: RTPStyle;
}

function FuturisticGameCard({ game, rtp, style }: FuturisticGameCardProps) {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg w-[180px]"
      style={{
        background: '#0f172a',
        border: '1px solid #334155'
      }}
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-contain bg-black/50"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        <div
          className="absolute top-2 right-2 px-2 py-1 rounded font-bold text-lg"
          style={{
            background: 'rgba(0,0,0,0.8)',
            border: '1px solid #ffd700',
            color: '#ffd700',
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
          }}
        >
          {rtp}%
        </div>
      </div>
      <div
        className="p-2"
        style={{ background: 'linear-gradient(to bottom, #1e293b, #0f172a)' }}
      >
        <h3 className="text-white font-bold text-base text-center truncate mb-2">
          {game.name}
        </h3>
        <div
          className="h-2 rounded overflow-hidden"
          style={{ background: '#334155' }}
        >
          <div
            className="h-full relative"
            style={{
              width: `${rtp}%`,
              background: `linear-gradient(90deg, ${style.primaryColor}, ${style.secondaryColor})`,
              boxShadow: `0 0 10px ${style.secondaryColor}`
            }}
          >
            <div
              className="absolute top-0 right-0 bottom-0 w-1"
              style={{ background: 'white', boxShadow: '0 0 5px white' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface FuturisticLayoutProps {
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

export default function FuturisticLayout({
  selectedWebsite,
  selectedStyle,
  customTimeLabel,
  selectedPragmaticGames,
  selectedPgSoftGames,
  pragmaticCount,
  pgSoftCount,
  getCurrentDate,
  selectedCardStyle
}: FuturisticLayoutProps) {
  const getBlurClass = () => {
    if (!selectedCardStyle?.blur || selectedCardStyle.blur === 'none') return '';
    return selectedCardStyle.blur;
  };

  const getSectionStyle = () => ({
    background: selectedCardStyle?.background || 'rgba(0, 0, 0, 0.4)',
    border: selectedCardStyle?.border ? `${selectedCardStyle.border} ${selectedStyle.primaryColor}` : '3px solid rgba(255,255,255,0.05)',
    opacity: selectedCardStyle?.opacity || 1,
    boxShadow: selectedCardStyle?.shadow || undefined
  });

  const pragmaticGamesWithRTP = selectedPragmaticGames.slice(0, pragmaticCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86 // 86-98%
  }));

  const pgSoftGamesWithRTP = selectedPgSoftGames.slice(0, pgSoftCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86 // 86-98%
  }));

  return (
    <div className="relative z-10 flex flex-col min-h-full p-8" style={{ fontFamily: 'var(--font-teko), sans-serif' }}>
      {/* Overlay Mesh */}
      <div
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 0%, #02040a 100%)'
        }}
      />

      {/* Header Box */}
      <div
        className="relative z-10 flex justify-between items-center mb-8 p-4 rounded-xl backdrop-blur-md"
        style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: `4px solid ${selectedStyle.primaryColor}`
        }}
      >
        <img
          src={selectedWebsite.logo}
          alt={selectedWebsite.name}
          className="h-20"
          style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}
        />

        <div className="text-right">
          <h1
            className="text-4xl font-bold uppercase tracking-wide mb-1"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(to right, #ffffff, #e2e8f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(255,255,255,0.3)'
            }}
          >
            INFO TOP GAMES GACOR HARI INI
          </h1>
          <div
            className="inline-flex items-center gap-4 px-4 py-1"
            style={{
              background: `linear-gradient(90deg, rgba(${selectedStyle.primaryColor === '#00f0ff' ? '0,240,255' : '255,215,0'},0.1), rgba(0,0,0,0))`,
              borderLeft: `4px solid ${selectedStyle.secondaryColor}`
            }}
          >
            <span className="text-2xl text-gray-400 font-semibold">
              {getCurrentDate()}
            </span>
            <span className="text-2xl font-bold" style={{ color: selectedStyle.primaryColor, textShadow: `0 0 10px ${selectedStyle.primaryColor}` }}>
              {customTimeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Pragmatic Section */}
      <div
        className={`relative z-10 flex items-stretch gap-2 mb-4 p-3 rounded-2xl ${getBlurClass()}`}
        style={getSectionStyle()}
      >
        {/* Pattern Overlay */}
        {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              backgroundImage: selectedCardStyle.pattern,
              backgroundRepeat: 'repeat'
            }}
          />
        )}
        <div className="relative z-10 flex-1 flex flex-wrap justify-center gap-2">
          {pragmaticGamesWithRTP.map((game, index) => (
            <FuturisticGameCard
              key={`pragmatic-${index}`}
              game={game}
              rtp={game.rtp}
              style={selectedStyle}
            />
          ))}
        </div>

        <div
          className="relative z-10 w-56 flex flex-col items-center justify-center rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: '#ffd700' }} />
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
            className="w-52 mb-2"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}
            alt="Pragmatic Play"
          />
          <span
            className="text-sm tracking-widest uppercase mt-2"
            style={{ fontFamily: "'Orbitron', sans-serif", color: '#ffd700' }}
          >
            Pragmatic Play
          </span>
        </div>
      </div>

      {/* Decorative Line */}
      <div
        className="w-full h-px my-4"
        style={{ background: 'linear-gradient(90deg, transparent, #334155, transparent)' }}
      />

      {/* PG Soft Section */}
      <div
        className={`relative z-10 flex items-stretch gap-2 mb-4 p-3 rounded-2xl ${getBlurClass()}`}
        style={getSectionStyle()}
      >
        {/* Pattern Overlay */}
        {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              backgroundImage: selectedCardStyle.pattern,
              backgroundRepeat: 'repeat'
            }}
          />
        )}
        <div className="relative z-10 flex-1 flex flex-wrap justify-center gap-2">
          {pgSoftGamesWithRTP.map((game, index) => (
            <FuturisticGameCard
              key={`pgsoft-${index}`}
              game={game}
              rtp={game.rtp}
              style={selectedStyle}
            />
          ))}
        </div>

        <div
          className="relative z-10 w-56 flex flex-col items-center justify-center rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: selectedStyle.primaryColor }} />
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
            className="w-52 mb-2"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))', transform: 'scale(1.1)' }}
            alt="PG Soft"
          />
          <span
            className="text-sm tracking-widest uppercase mt-2"
            style={{ fontFamily: "'Orbitron', sans-serif", color: selectedStyle.primaryColor }}
          >
            PG Soft
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto flex justify-center pt-4">
        <div
          className="flex items-center gap-4 px-10 py-3 rounded-full"
          style={{
            background: 'rgba(2, 6, 23, 0.8)',
            border: `2px solid ${selectedStyle.primaryColor}`,
            boxShadow: `0 0 20px rgba(${selectedStyle.primaryColor === '#00f0ff' ? '0,240,255' : '255,215,0'}, 0.3)`
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill={selectedStyle.primaryColor}
          >
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span
            className="text-2xl font-bold tracking-wide"
            style={{
              color: 'white',
              textShadow: '0 0 10px rgba(255,255,255,0.5)'
            }}
          >
            Join Komunitas Telegram : @{selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
          </span>
        </div>
      </div>
    </div>
  );
}
