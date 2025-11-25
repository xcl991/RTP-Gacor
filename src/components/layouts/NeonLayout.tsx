'use client';

import { RTPStyle, TimeSlot, WebsiteOption, Game } from '@/types';

interface NeonGameCardProps {
  game: Game;
  rtp: number;
  glowColor: string;
}

function NeonGameCard({ game, rtp, glowColor }: NeonGameCardProps) {
  return (
    <div
      className="rounded-xl overflow-hidden relative group"
      style={{
        background: 'linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)',
        border: `2px solid ${glowColor}`,
        boxShadow: `0 0 20px ${glowColor}40, inset 0 0 20px ${glowColor}10`
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
        {/* Neon RTP Badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-lg font-black text-xl"
          style={{
            background: 'rgba(0,0,0,0.9)',
            color: glowColor,
            border: `2px solid ${glowColor}`,
            boxShadow: `0 0 15px ${glowColor}, inset 0 0 10px ${glowColor}30`,
            textShadow: `0 0 10px ${glowColor}`
          }}
        >
          {rtp}%
        </div>
      </div>
      <div className="p-3" style={{ background: 'linear-gradient(to bottom, #1a1a2e, #0f0f1a)' }}>
        <h3
          className="font-bold text-base text-center truncate mb-2"
          style={{ color: glowColor, textShadow: `0 0 5px ${glowColor}` }}
        >
          {game.name}
        </h3>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: '#0a0a15', border: '1px solid #333' }}>
          <div
            className="h-full rounded-full relative"
            style={{
              width: `${rtp}%`,
              background: `linear-gradient(90deg, ${glowColor}80, ${glowColor})`,
              boxShadow: `0 0 15px ${glowColor}`
            }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full" style={{ boxShadow: '0 0 10px white' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface NeonLayoutProps {
  selectedWebsite: WebsiteOption;
  selectedStyle: RTPStyle;
  selectedTimeSlot: TimeSlot;
  selectedPragmaticGames: Game[];
  selectedPgSoftGames: Game[];
  pragmaticCount: number;
  pgSoftCount: number;
  getCurrentDate: () => string;
}

export default function NeonLayout({
  selectedWebsite,
  selectedStyle,
  selectedTimeSlot,
  selectedPragmaticGames,
  selectedPgSoftGames,
  pragmaticCount,
  pgSoftCount,
  getCurrentDate
}: NeonLayoutProps) {
  const pragmaticGamesWithRTP = selectedPragmaticGames.slice(0, pragmaticCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const pgSoftGamesWithRTP = selectedPgSoftGames.slice(0, pgSoftCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  return (
    <div className="relative z-10 flex flex-col min-h-full p-6">
      {/* Neon Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,0,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,0,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <div
        className="relative z-10 text-center mb-6 p-6 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,0,255,0.1), rgba(0,255,255,0.1))',
          border: '2px solid #ff00ff',
          boxShadow: '0 0 30px rgba(255,0,255,0.3), inset 0 0 30px rgba(255,0,255,0.1)'
        }}
      >
        <img
          src={selectedWebsite.logo}
          alt={selectedWebsite.name}
          className="h-16 mx-auto mb-4"
          style={{ filter: 'drop-shadow(0 0 20px rgba(255,0,255,0.8))' }}
        />
        <h1
          className="text-4xl font-black uppercase tracking-wider mb-2"
          style={{
            background: 'linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(255,0,255,0.5)'
          }}
        >
          NEON RTP LIVE
        </h1>
        <div className="flex items-center justify-center gap-4">
          <span className="text-white/80 text-lg">{getCurrentDate()}</span>
          <span
            className="text-xl font-bold px-4 py-1 rounded-full"
            style={{
              background: 'rgba(0,255,255,0.2)',
              border: '1px solid #00ffff',
              color: '#00ffff',
              textShadow: '0 0 10px #00ffff'
            }}
          >
            {selectedTimeSlot.label}
          </span>
        </div>
      </div>

      {/* Pragmatic Section */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
            className="h-12"
            style={{ filter: 'drop-shadow(0 0 15px rgba(255,0,255,0.8))' }}
            alt="Pragmatic Play"
          />
          <div className="flex-1 h-1 rounded" style={{ background: 'linear-gradient(90deg, #ff00ff, transparent)' }} />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {pragmaticGamesWithRTP.map((game, index) => (
            <NeonGameCard key={`pragmatic-${index}`} game={game} rtp={game.rtp} glowColor="#ff00ff" />
          ))}
        </div>
      </div>

      {/* PG Soft Section */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
            className="h-12"
            style={{ filter: 'drop-shadow(0 0 15px rgba(0,255,255,0.8))' }}
            alt="PG Soft"
          />
          <div className="flex-1 h-1 rounded" style={{ background: 'linear-gradient(90deg, #00ffff, transparent)' }} />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {pgSoftGamesWithRTP.map((game, index) => (
            <NeonGameCard key={`pgsoft-${index}`} game={game} rtp={game.rtp} glowColor="#00ffff" />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto text-center">
        <div
          className="inline-flex items-center gap-4 px-8 py-4 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,0,255,0.2), rgba(0,255,255,0.2))',
            border: '2px solid',
            borderImage: 'linear-gradient(90deg, #ff00ff, #00ffff) 1',
            boxShadow: '0 0 30px rgba(255,0,255,0.3)'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#00ffff" style={{ filter: 'drop-shadow(0 0 10px #00ffff)' }}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span
            className="text-xl font-bold"
            style={{
              background: 'linear-gradient(90deg, #ff00ff, #00ffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(255,0,255,0.5)'
            }}
          >
            @{selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
          </span>
        </div>
      </div>
    </div>
  );
}
