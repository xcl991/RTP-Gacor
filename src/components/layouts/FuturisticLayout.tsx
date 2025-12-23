'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig } from '@/types';
import TrikPanel from '../TrikPanel';

// Helper function to create darker/lighter colors from hex
function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(255 * percent / 100)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + Math.round(255 * percent / 100)));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + Math.round(255 * percent / 100)));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

interface FuturisticGameCardProps {
  game: Game;
  rtp: number;
  style: RTPStyle;
  cardSize: number;
  darkPrimary: string;
  darkerPrimary: string;
  primaryColor: string;
}

function FuturisticGameCard({ game, rtp, style, cardSize, darkPrimary, darkerPrimary, primaryColor }: FuturisticGameCardProps) {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg"
      style={{
        background: darkerPrimary,
        border: `1px solid ${primaryColor}40`,
        width: `${cardSize}px`
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
      </div>
      <div
        className="p-2"
        style={{ background: `linear-gradient(to bottom, ${darkPrimary}, ${darkerPrimary})` }}
      >
        <h3 className="text-white font-bold text-base text-center truncate">
          {game.name}
        </h3>
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
  pragmaticTrik: TrikConfig;
  pgSoftTrik: TrikConfig;
  telegramUsername: string;
  customHeaderText: string;
  headerFontSize: 'small' | 'medium' | 'large' | 'xlarge';
  defaultLayoutSize: DefaultLayoutSizeConfig;
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
  selectedCardStyle,
  pragmaticTrik,
  pgSoftTrik,
  telegramUsername,
  customHeaderText,
  headerFontSize,
  defaultLayoutSize
}: FuturisticLayoutProps) {
  const primaryColor = selectedStyle.primaryColor;
  const secondaryColor = selectedStyle.secondaryColor;
  const darkPrimary = adjustColor(primaryColor, -70);
  const darkerPrimary = adjustColor(primaryColor, -80);

  const getFontSizeClass = () => {
    switch (headerFontSize) {
      case 'small': return 'text-base';
      case 'medium': return 'text-base';
      case 'large': return 'text-base';
      case 'xlarge': return 'text-base';
    }
  };

  const getBlurClass = () => {
    if (!selectedCardStyle?.blur || selectedCardStyle.blur === 'none') return '';
    return selectedCardStyle.blur;
  };

  const getSectionStyle = () => ({
    background: selectedCardStyle?.background || `${darkerPrimary}66`,
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
    <div className="relative z-10 flex flex-col min-h-full p-3" style={{ fontFamily: 'var(--font-teko), sans-serif' }}>
      {/* Overlay Mesh */}
      <div
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 0%, #02040a 100%)'
        }}
      />

      {/* Header Box */}
      <div
        className="relative z-10 flex justify-between items-center mb-1.5 p-3 rounded-xl backdrop-blur-md"
        style={{
          background: `${darkerPrimary}99`,
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
            className="font-bold uppercase tracking-wide mb-1"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(to right, #ffffff, #e2e8f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(255,255,255,0.3)',
              fontSize: '21px'  // text-base (16px) + 5px = 21px
            }}
          >
            {customHeaderText}
          </h1>
          <div
            className="inline-flex items-center gap-2 px-4 py-1"
            style={{
              background: `linear-gradient(90deg, rgba(${selectedStyle.primaryColor === '#00f0ff' ? '0,240,255' : '255,215,0'},0.1), rgba(0,0,0,0))`,
              borderLeft: `4px solid ${selectedStyle.secondaryColor}`
            }}
          >
            <span className="text-base text-gray-400 font-semibold">
              {getCurrentDate()}
            </span>
            <span className="text-base font-bold" style={{ color: selectedStyle.primaryColor, textShadow: `0 0 10px ${selectedStyle.primaryColor}` }}>
              {customTimeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Pragmatic Section */}
      <div
        className="grid items-stretch mb-1.5"
        style={{
          gridTemplateColumns: pragmaticTrik.enabled ? `1fr ${defaultLayoutSize.trikPanelWidth}px` : '1fr',
          gap: `${defaultLayoutSize.gameGap}px`
        }}
      >
        <div
          className={`relative rounded-2xl ${getBlurClass()}`}
          style={{...getSectionStyle(), padding: `${defaultLayoutSize.modalPadding}px`, overflow: 'visible'}}
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
          <div className="relative z-10 flex items-center justify-center mb-1.5 pb-1" style={{ borderBottom: '1px solid rgba(255, 215, 0, 0.3)', overflow: 'visible' }}>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              className="h-14"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))', transform: 'scale(1.4)' }}
              alt="Pragmatic Play"
            />
          </div>
          <div className="relative z-10 flex flex-wrap justify-center" style={{ gap: `${defaultLayoutSize.gameGap}px` }}>
            {pragmaticGamesWithRTP.map((game, index) => (
              <FuturisticGameCard
                key={`pragmatic-${index}`}
                game={game}
                rtp={game.rtp}
                style={selectedStyle}
                cardSize={defaultLayoutSize.gameCardSize}
                darkPrimary={darkPrimary}
                darkerPrimary={darkerPrimary}
                primaryColor={primaryColor}
              />
            ))}
          </div>
        </div>
        {pragmaticTrik.enabled && (
          <TrikPanel
            trik={pragmaticTrik}
            providerColor={selectedStyle.primaryColor}
            fontFamily="var(--font-teko), sans-serif"
            cardStyle={selectedCardStyle}
            variant="futuristic"
            horizontalItems={true}
          />
        )}
      </div>

      {/* PG Soft Section */}
      <div
        className="grid items-stretch mb-1.5"
        style={{
          gridTemplateColumns: pgSoftTrik.enabled ? `1fr ${defaultLayoutSize.trikPanelWidth}px` : '1fr',
          gap: `${defaultLayoutSize.gameGap}px`
        }}
      >
        <div
          className={`relative rounded-2xl ${getBlurClass()}`}
          style={{...getSectionStyle(), padding: `${defaultLayoutSize.modalPadding}px`, overflow: 'visible'}}
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
          <div className="relative z-10 flex items-center justify-center mb-1.5 pb-1" style={{ borderBottom: `1px solid ${selectedStyle.primaryColor}30`, overflow: 'visible' }}>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
              className="h-14"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))', transform: 'scale(1.4)' }}
              alt="PG Soft"
            />
          </div>
          <div className="relative z-10 flex flex-wrap justify-center" style={{ gap: `${defaultLayoutSize.gameGap}px` }}>
            {pgSoftGamesWithRTP.map((game, index) => (
              <FuturisticGameCard
                key={`pgsoft-${index}`}
                game={game}
                rtp={game.rtp}
                style={selectedStyle}
                cardSize={defaultLayoutSize.gameCardSize}
                darkPrimary={darkPrimary}
                darkerPrimary={darkerPrimary}
                primaryColor={primaryColor}
              />
            ))}
          </div>
        </div>
        {pgSoftTrik.enabled && (
          <TrikPanel
            trik={pgSoftTrik}
            hideFiturGanda={true}
            providerColor={selectedStyle.secondaryColor}
            fontFamily="var(--font-teko), sans-serif"
            cardStyle={selectedCardStyle}
            variant="futuristic"
            horizontalItems={true}
          />
        )}
      </div>

    </div>
  );
}
