'use client';

import { RTPStyle, TimeSlot, WebsiteOption, Game } from '@/types';

interface CyberGameCardProps {
  game: Game;
  rtp: number;
  index: number;
}

function CyberGameCard({ game, rtp, index }: CyberGameCardProps) {
  const isHot = rtp >= 95;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: '#0a0a0a',
        clipPath: 'polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)',
        border: '1px solid #39ff14'
      }}
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: '2px solid #39ff14', borderLeft: '2px solid #39ff14' }} />
      <div className="absolute bottom-0 right-0 w-4 h-4" style={{ borderBottom: '2px solid #39ff14', borderRight: '2px solid #39ff14' }} />

      {isHot && (
        <div
          className="absolute top-2 left-2 px-2 py-0.5 text-xs font-bold uppercase z-20"
          style={{ background: '#ff0040', color: 'white' }}
        >
          HOT
        </div>
      )}

      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-contain bg-black/50"
          style={{ filter: 'contrast(1.1)' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        {/* Scan Line Effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.1) 2px, rgba(57, 255, 20, 0.1) 4px)'
          }}
        />
        <div
          className="absolute top-2 right-2 px-3 py-1 font-mono font-bold text-lg"
          style={{
            background: 'rgba(0,0,0,0.9)',
            border: '1px solid #39ff14',
            color: '#39ff14',
            textShadow: '0 0 5px #39ff14'
          }}
        >
          {rtp}%
        </div>
      </div>
      <div className="p-2" style={{ background: 'linear-gradient(to bottom, #111, #0a0a0a)' }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono" style={{ color: '#39ff14' }}>#{String(index + 1).padStart(2, '0')}</span>
          <h3 className="font-bold text-sm truncate text-white flex-1">{game.name}</h3>
        </div>
        <div className="h-1.5 rounded-sm overflow-hidden" style={{ background: '#1a1a1a' }}>
          <div
            className="h-full"
            style={{
              width: `${rtp}%`,
              background: `linear-gradient(90deg, #39ff14, ${isHot ? '#ff0040' : '#39ff14'})`,
              boxShadow: `0 0 10px ${isHot ? '#ff0040' : '#39ff14'}`
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface CyberLayoutProps {
  selectedWebsite: WebsiteOption;
  selectedStyle: RTPStyle;
  selectedTimeSlot: TimeSlot;
  selectedPragmaticGames: Game[];
  selectedPgSoftGames: Game[];
  pragmaticCount: number;
  pgSoftCount: number;
  getCurrentDate: () => string;
}

export default function CyberLayout({
  selectedWebsite,
  selectedStyle,
  selectedTimeSlot,
  selectedPragmaticGames,
  selectedPgSoftGames,
  pragmaticCount,
  pgSoftCount,
  getCurrentDate
}: CyberLayoutProps) {
  const pragmaticGamesWithRTP = selectedPragmaticGames.slice(0, pragmaticCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const pgSoftGamesWithRTP = selectedPgSoftGames.slice(0, pgSoftCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  return (
    <div className="relative z-10 flex flex-col min-h-full p-6" style={{ background: '#050505' }}>
      {/* Matrix Rain Effect Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ctext x='0' y='15' font-size='15' fill='%2339ff14'%3E0%3C/text%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div
          className="p-4"
          style={{
            background: 'linear-gradient(90deg, rgba(57,255,20,0.1), transparent, rgba(57,255,20,0.1))',
            borderTop: '2px solid #39ff14',
            borderBottom: '2px solid #39ff14'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={selectedWebsite.logo}
                alt={selectedWebsite.name}
                className="h-14"
                style={{ filter: 'drop-shadow(0 0 10px rgba(57, 255, 20, 0.5))' }}
              />
              <div>
                <div className="text-xs font-mono" style={{ color: '#39ff14' }}>SYSTEM://RTP_LIVE</div>
                <h1 className="text-2xl font-bold font-mono text-white">CYBER<span style={{ color: '#39ff14' }}>_</span>SLOT</h1>
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="text-sm" style={{ color: '#39ff14' }}>[{getCurrentDate()}]</div>
              <div className="text-xl font-bold text-white">{selectedTimeSlot.label}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="relative z-10 flex items-center gap-4 mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#39ff14', boxShadow: '0 0 10px #39ff14' }} />
          <span className="text-xs font-mono" style={{ color: '#39ff14' }}>LIVE</span>
        </div>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #39ff14, transparent)' }} />
        <span className="text-xs font-mono text-gray-500">v2.0.25</span>
      </div>

      {/* Pragmatic Section */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="px-3 py-1" style={{ background: '#39ff14', color: '#000' }}>
            <span className="font-mono font-bold text-sm">PRAGMATIC_PLAY</span>
          </div>
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
            className="h-8"
            style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 5px rgba(57, 255, 20, 0.5))' }}
            alt="Pragmatic Play"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {pragmaticGamesWithRTP.map((game, index) => (
            <CyberGameCard key={`pragmatic-${index}`} game={game} rtp={game.rtp} index={index} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2 my-4">
        <div className="flex-1 h-px" style={{ background: '#39ff14' }} />
        <div className="font-mono text-xs" style={{ color: '#39ff14' }}>//NEXT_PROVIDER</div>
        <div className="flex-1 h-px" style={{ background: '#39ff14' }} />
      </div>

      {/* PG Soft Section */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="px-3 py-1" style={{ background: '#ff0040', color: '#fff' }}>
            <span className="font-mono font-bold text-sm">PG_SOFT</span>
          </div>
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
            className="h-8"
            style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 5px rgba(255, 0, 64, 0.5))' }}
            alt="PG Soft"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {pgSoftGamesWithRTP.map((game, index) => (
            <CyberGameCard key={`pgsoft-${index}`} game={game} rtp={game.rtp} index={index} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto">
        <div
          className="flex items-center justify-center gap-4 p-3"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(57,255,20,0.1), transparent)',
            borderTop: '1px solid #39ff14'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#39ff14">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span className="font-mono text-lg" style={{ color: '#39ff14' }}>
            JOIN: @{selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
          </span>
        </div>
      </div>
    </div>
  );
}
