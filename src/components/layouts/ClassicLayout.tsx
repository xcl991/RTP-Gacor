'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption } from '@/types';

interface ClassicGameCardProps {
  game: Game;
  rtp: number;
  style: RTPStyle;
}

function ClassicGameCard({ game, rtp, style }: ClassicGameCardProps) {
  const primaryColor = style.primaryColor;
  const secondaryColor = style.secondaryColor;

  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg w-[180px]"
      style={{
        background: 'rgba(0,0,0,0.7)',
        border: `1px solid ${primaryColor}`
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
          className="absolute top-2 right-2 px-2 py-1 rounded font-bold text-sm"
          style={{
            background: `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`,
            color: '#000'
          }}
        >
          {rtp}%
        </div>
      </div>
      <div className="p-2">
        <h3 className="text-white text-xs font-semibold text-center truncate mb-2">{game.name}</h3>
        <div
          className="h-2 rounded overflow-hidden"
          style={{ background: '#222' }}
        >
          <div
            className="h-full rounded"
            style={{
              width: `${rtp}%`,
              background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
              boxShadow: `0 0 10px ${secondaryColor}`
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface ClassicLayoutProps {
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

export default function ClassicLayout({
  selectedWebsite,
  selectedStyle,
  customTimeLabel,
  selectedPragmaticGames,
  selectedPgSoftGames,
  pragmaticCount,
  pgSoftCount,
  getCurrentDate,
  selectedCardStyle
}: ClassicLayoutProps) {
  const primaryColor = selectedStyle.primaryColor;
  const secondaryColor = selectedStyle.secondaryColor;
  const backgroundColor = selectedStyle.backgroundColor;

  const getBlurClass = () => {
    if (!selectedCardStyle?.blur || selectedCardStyle.blur === 'none') return '';
    return selectedCardStyle.blur;
  };

  const getSectionStyle = (color: string) => ({
    background: selectedCardStyle?.background || `linear-gradient(to bottom, ${color}20, rgba(0,0,0,0.8))`,
    border: selectedCardStyle?.border ? `${selectedCardStyle.border} ${color}` : `1px solid ${color}30`,
    opacity: selectedCardStyle?.opacity || 1,
    boxShadow: selectedCardStyle?.shadow ? (selectedCardStyle.shadow.includes('0 0 20px') ? `${selectedCardStyle.shadow} ${color}` : selectedCardStyle.shadow) : undefined
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
    <div className="relative z-10 flex flex-col min-h-full" style={{ fontFamily: 'var(--font-rajdhani), sans-serif' }}>
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-50 mix-blend-overlay"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwaDIwdjIwSDIwVjIwek0wIDIwaDIwdjIwSDBWMjB6Ii8+PC9nPjwvZz48L3N2Zz4=')`
        }}
      />

      {/* Header */}
      <div className="relative z-10 pt-10 pb-2 text-center">
        <div className="text-white font-bold text-2xl tracking-widest mb-1 drop-shadow-md">
          {getCurrentDate()}
        </div>
        <h1
          className="text-6xl font-bold px-4 leading-none mb-4"
          style={{
            fontFamily: "'Anton', sans-serif",
            letterSpacing: '2px',
            background: `linear-gradient(to bottom, ${secondaryColor} 0%, ${primaryColor} 50%, ${primaryColor}aa 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.8))'
          }}
        >
          INFO SLOT GACOR
        </h1>

        <div className="inline-block relative">
          <div className="absolute inset-0 blur-lg opacity-30" style={{ background: primaryColor }}></div>
          <div
            className="relative px-10 py-2 rounded-full shadow-2xl"
            style={{
              background: `linear-gradient(90deg, ${backgroundColor} 0%, ${primaryColor}40 50%, ${backgroundColor} 100%)`,
              border: `1px solid ${primaryColor}80`
            }}
          >
            <span className="text-3xl font-black text-white tracking-widest">
              {customTimeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-8 py-4 flex flex-col justify-center gap-6">
        {/* Pragmatic Section */}
        <div
          className={`relative rounded-xl p-4 shadow-xl ${getBlurClass()}`}
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
          <div className="relative z-10 flex items-center justify-center mb-4 pb-2" style={{ borderBottom: `1px solid ${primaryColor}30` }}>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              className="h-24"
              style={{ filter: `drop-shadow(0 0 5px ${primaryColor}80)`, transform: 'scale(1.3)' }}
              alt="Pragmatic Play"
            />
          </div>
          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            {pragmaticGamesWithRTP.map((game, index) => (
              <ClassicGameCard
                key={`pragmatic-${index}`}
                game={game}
                rtp={game.rtp}
                style={selectedStyle}
              />
            ))}
          </div>
        </div>

        {/* PG Soft Section */}
        <div
          className={`relative rounded-xl p-4 shadow-xl ${getBlurClass()}`}
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
          <div className="relative z-10 flex items-center justify-center mb-4 pb-2" style={{ borderBottom: `1px solid ${secondaryColor}30` }}>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
              className="h-24"
              style={{ filter: `drop-shadow(0 0 5px ${secondaryColor}80)`, transform: 'scale(1.3)' }}
              alt="PG Soft"
            />
          </div>
          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            {pgSoftGamesWithRTP.map((game, index) => (
              <ClassicGameCard
                key={`pgsoft-${index}`}
                game={game}
                rtp={game.rtp}
                style={selectedStyle}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 mt-auto pt-4 pb-4 text-center"
        style={{
          borderTop: `2px solid ${primaryColor}`,
          borderBottom: `2px solid ${primaryColor}`,
          background: `linear-gradient(90deg, ${backgroundColor} 0%, ${primaryColor}40 50%, ${backgroundColor} 100%)`
        }}
      >
        <img
          src={selectedWebsite.logo}
          alt={selectedWebsite.name}
          className="h-12 mx-auto mb-2"
          style={{ filter: `drop-shadow(0 0 5px ${primaryColor}80)` }}
        />
        <p className="font-bold tracking-widest text-xs mb-4 uppercase" style={{ color: primaryColor }}>
          Situs Slot Terpercaya
        </p>
        <div
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-white font-bold text-sm shadow-lg mx-auto"
          style={{
            background: `linear-gradient(to bottom, ${primaryColor}, ${secondaryColor})`,
            border: `1px solid ${secondaryColor}80`
          }}
        >
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          HTTPS://T.ME/{selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
        </div>
      </div>
    </div>
  );
}
