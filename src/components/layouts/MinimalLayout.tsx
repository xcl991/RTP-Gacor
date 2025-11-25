'use client';

import { RTPStyle, TimeSlot, WebsiteOption, Game } from '@/types';

interface MinimalGameCardProps {
  game: Game;
  rtp: number;
}

function MinimalGameCard({ game, rtp }: MinimalGameCardProps) {
  const getStatusColor = (rtp: number) => {
    if (rtp >= 95) return '#10b981';
    if (rtp >= 90) return '#f59e0b';
    return '#6b7280';
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-sm truncate mb-3">{game.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-3">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${rtp}%`, background: getStatusColor(rtp) }}
              />
            </div>
          </div>
          <span
            className="text-sm font-semibold"
            style={{ color: getStatusColor(rtp) }}
          >
            {rtp}%
          </span>
        </div>
      </div>
    </div>
  );
}

interface MinimalLayoutProps {
  selectedWebsite: WebsiteOption;
  selectedStyle: RTPStyle;
  selectedTimeSlot: TimeSlot;
  selectedPragmaticGames: Game[];
  selectedPgSoftGames: Game[];
  pragmaticCount: number;
  pgSoftCount: number;
  getCurrentDate: () => string;
}

export default function MinimalLayout({
  selectedWebsite,
  selectedStyle,
  selectedTimeSlot,
  selectedPragmaticGames,
  selectedPgSoftGames,
  pragmaticCount,
  pgSoftCount,
  getCurrentDate
}: MinimalLayoutProps) {
  const pragmaticGamesWithRTP = selectedPragmaticGames.slice(0, pragmaticCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const pgSoftGamesWithRTP = selectedPgSoftGames.slice(0, pgSoftCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  return (
    <div className="relative z-10 flex flex-col min-h-full p-8 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-10">
        <img
          src={selectedWebsite.logo}
          alt={selectedWebsite.name}
          className="h-12 mx-auto mb-6"
        />
        <h1 className="text-3xl font-light text-gray-900 mb-2">
          RTP Live Update
        </h1>
        <div className="flex items-center justify-center gap-3 text-gray-500">
          <span>{getCurrentDate()}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{selectedTimeSlot.label}</span>
        </div>
      </div>

      {/* Pragmatic Section */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
            className="h-8"
            alt="Pragmatic Play"
          />
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {pragmaticGamesWithRTP.map((game, index) => (
            <MinimalGameCard key={`pragmatic-${index}`} game={game} rtp={game.rtp} />
          ))}
        </div>
      </div>

      {/* PG Soft Section */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
            className="h-8"
            alt="PG Soft"
          />
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {pgSoftGamesWithRTP.map((game, index) => (
            <MinimalGameCard key={`pgsoft-${index}`} game={game} rtp={game.rtp} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#0088cc">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span className="text-gray-600 text-sm">
            @{selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}
          </span>
        </div>
      </div>
    </div>
  );
}
