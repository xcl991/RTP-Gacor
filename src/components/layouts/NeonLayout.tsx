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

interface NeonGameCardProps {
  game: Game;
  rtp: number;
  glowColor: string;
  cardSize: number;
  darkBackground: string;
}

function NeonGameCard({ game, rtp, glowColor, cardSize, darkBackground }: NeonGameCardProps) {
  return (
    <div
      className="rounded-xl overflow-hidden relative group"
      style={{
        background: `linear-gradient(145deg, ${darkBackground}f2 0%, ${darkBackground} 100%)`,
        border: `2px solid ${glowColor}`,
        boxShadow: `0 0 20px ${glowColor}40, inset 0 0 20px ${glowColor}10`,
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
      <div className="p-3" style={{ background: `linear-gradient(to bottom, ${darkBackground}f2, ${darkBackground})` }}>
        <h3
          className="font-bold text-xs text-center truncate"
          style={{ color: glowColor }}
        >
          {game.name}
        </h3>
      </div>
    </div>
  );
}

interface NeonLayoutProps {
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

export default function NeonLayout({
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
}: NeonLayoutProps) {
  const getFontSizeClass = () => {
    switch (headerFontSize) {
      case 'small': return 'text-base';
      case 'medium': return 'text-base';
      case 'large': return 'text-base';
      case 'xlarge': return 'text-base';
    }
  };

  const primaryColor = selectedStyle.primaryColor;
  const secondaryColor = selectedStyle.secondaryColor;

  const darkPrimary = adjustColor(primaryColor, -70);
  const darkerPrimary = adjustColor(primaryColor, -85);
  const darkSecondary = adjustColor(secondaryColor, -70);
  const darkerSecondary = adjustColor(secondaryColor, -85);

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
    <div className="relative z-10 flex flex-col min-h-full p-3" style={{ fontFamily: 'var(--font-russo), sans-serif' }}>
      {/* Neon Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${primaryColor}20 1px, transparent 1px),
            linear-gradient(90deg, ${primaryColor}20 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <div
        className="relative z-10 text-center mb-2 p-2 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`,
          border: `2px solid ${primaryColor}`,
          boxShadow: `0 0 30px ${primaryColor}50, inset 0 0 30px ${primaryColor}15`
        }}
      >
        <img
          src={selectedWebsite.logo}
          alt={selectedWebsite.name}
          className="h-14 mx-auto mb-1"
          style={{ filter: 'none' }}
        />
        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider mb-1.5`}
          style={{
            background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`,
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {customHeaderText}
        </h1>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-white/80 text-base">{getCurrentDate()}</span>
          <span
            className="text-base font-bold px-4 py-1 rounded-full"
            style={{
              background: `${secondaryColor}30`,
              border: `1px solid ${secondaryColor}`,
              color: secondaryColor
            }}
          >
            {customTimeLabel}
          </span>
          <span className="text-white/60 text-sm">|</span>
          <div className="inline-flex items-center gap-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill={secondaryColor}>
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <span className="text-sm font-bold" style={{ color: secondaryColor }}>
              @{telegramUsername || selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
            </span>
          </div>
        </div>
      </div>

      {/* Pragmatic Section with Grid */}
      <div
        className="grid items-stretch mb-3"
        style={{
          gridTemplateColumns: pragmaticTrik.enabled ? `1fr ${defaultLayoutSize.trikPanelWidth}px` : '1fr',
          gap: `${defaultLayoutSize.gameGap}px`
        }}
      >
        <div
          className={`relative rounded-xl ${getBlurClass()}`}
          style={{...getSectionStyle(primaryColor), padding: `${defaultLayoutSize.modalPadding}px`, overflow: 'visible'}}
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
          <div className="relative z-10 flex items-center justify-center mb-1.5 pb-1" style={{ borderBottom: `1px solid ${primaryColor}30`, overflow: 'visible' }}>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              className="h-14"
              style={{ filter: 'none', transform: 'scale(1.4)' }}
              alt="Pragmatic Play"
            />
          </div>
          <div className="relative z-10 flex flex-wrap justify-center" style={{ gap: `${defaultLayoutSize.gameGap}px` }}>
            {pragmaticGamesWithRTP.map((game, index) => (
              <NeonGameCard key={`pragmatic-${index}`} game={game} rtp={game.rtp} glowColor={primaryColor} cardSize={defaultLayoutSize.gameCardSize} darkBackground={darkerPrimary} />
            ))}
          </div>
        </div>
        {pragmaticTrik.enabled && (
          <TrikPanel
            trik={pragmaticTrik}
            providerColor={primaryColor}
            fontFamily="var(--font-russo), sans-serif"
            cardStyle={selectedCardStyle}
            variant="neon"
            horizontalItems={true}
          />
        )}
      </div>

      {/* PG Soft Section with Grid */}
      <div
        className="grid items-stretch mb-3"
        style={{
          gridTemplateColumns: pgSoftTrik.enabled ? `1fr ${defaultLayoutSize.trikPanelWidth}px` : '1fr',
          gap: `${defaultLayoutSize.gameGap}px`
        }}
      >
        <div
          className={`relative rounded-xl ${getBlurClass()}`}
          style={{...getSectionStyle(secondaryColor), padding: `${defaultLayoutSize.modalPadding}px`, overflow: 'visible'}}
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
          <div className="relative z-10 flex items-center justify-center mb-1.5 pb-1" style={{ borderBottom: `1px solid ${secondaryColor}30`, overflow: 'visible' }}>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
              className="h-14"
              style={{ filter: 'none', transform: 'scale(1.4)' }}
              alt="PG Soft"
            />
          </div>
          <div className="relative z-10 flex flex-wrap justify-center" style={{ gap: `${defaultLayoutSize.gameGap}px` }}>
            {pgSoftGamesWithRTP.map((game, index) => (
              <NeonGameCard key={`pgsoft-${index}`} game={game} rtp={game.rtp} glowColor={secondaryColor} cardSize={defaultLayoutSize.gameCardSize} darkBackground={darkerSecondary} />
            ))}
          </div>
        </div>
        {pgSoftTrik.enabled && (
          <TrikPanel
            trik={pgSoftTrik}
            hideFiturGanda={true}
            providerColor={secondaryColor}
            fontFamily="var(--font-russo), sans-serif"
            cardStyle={selectedCardStyle}
            variant="neon"
            horizontalItems={true}
          />
        )}
      </div>
    </div>
  );
}
