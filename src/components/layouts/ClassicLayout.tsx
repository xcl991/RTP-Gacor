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

interface ClassicGameCardProps {
  game: Game;
  rtp: number;
  style: RTPStyle;
  cardSize: number;
}

function ClassicGameCard({ game, rtp, style, cardSize }: ClassicGameCardProps) {
  const primaryColor = style.primaryColor;
  const secondaryColor = style.secondaryColor;
  const darkerPrimary = adjustColor(primaryColor, -80);

  return (
    <div
      className="rounded overflow-hidden shadow-lg"
      style={{
        background: `${darkerPrimary}b3`,
        border: `1px solid ${primaryColor}`,
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
      <div className="p-1">
        <h3 className="text-white font-semibold text-center truncate" style={{ fontSize: '14px' }}>{game.name}</h3>
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
  pragmaticTrik: TrikConfig;
  pgSoftTrik: TrikConfig;
  telegramUsername: string;
  customHeaderText: string;
  headerFontSize: 'small' | 'medium' | 'large' | 'xlarge';
  defaultLayoutSize: DefaultLayoutSizeConfig;
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
  selectedCardStyle,
  pragmaticTrik,
  pgSoftTrik,
  telegramUsername,
  customHeaderText,
  headerFontSize,
  defaultLayoutSize
}: ClassicLayoutProps) {
  const getFontSizeClass = () => {
    switch (headerFontSize) {
      case 'small': return 'text-base';
      case 'medium': return 'text-base';
      case 'large': return 'text-4xl';
      case 'xlarge': return 'text-5xl';
    }
  };

  const primaryColor = selectedStyle.primaryColor;
  const secondaryColor = selectedStyle.secondaryColor;
  const backgroundColor = selectedStyle.backgroundColor;
  const darkPrimary = adjustColor(primaryColor, -70);
  const darkerPrimary = adjustColor(primaryColor, -80);

  const getBlurClass = () => {
    if (!selectedCardStyle?.blur || selectedCardStyle.blur === 'none') return '';
    return selectedCardStyle.blur;
  };

  const getSectionStyle = (color: string) => ({
    background: selectedCardStyle?.background || `linear-gradient(to bottom, ${primaryColor}20, ${darkerPrimary}cc)`,
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
      <div className="relative z-10 pt-4 pb-2 text-center">
        <div className="text-white font-bold text-base tracking-widest mb-1 drop-shadow-md">
          {getCurrentDate()}
        </div>
        <h1
          className={`${getFontSizeClass()} font-bold px-4 leading-none mb-1.5`}
          style={{
            fontFamily: "'Anton', sans-serif",
            letterSpacing: '2px',
            background: `linear-gradient(to bottom, ${secondaryColor} 0%, ${primaryColor} 50%, ${primaryColor}aa 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.8))'
          }}
        >
          {customHeaderText}
        </h1>

        <div className="inline-block relative">
          <div className="absolute inset-0 blur-lg opacity-30" style={{ background: primaryColor }}></div>
          <div
            className="relative px-6 py-1 rounded-full shadow-2xl"
            style={{
              background: `linear-gradient(90deg, ${backgroundColor} 0%, ${primaryColor}40 50%, ${backgroundColor} 100%)`,
              border: `1px solid ${primaryColor}80`
            }}
          >
            <span className="text-base font-black text-white tracking-widest">
              {customTimeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-4 py-2 flex flex-col justify-center gap-2">
        {/* Pragmatic Section with Grid */}
        <div
          className="grid items-stretch"
          style={{
            gridTemplateColumns: pragmaticTrik.enabled ? `1fr ${defaultLayoutSize.trikPanelWidth}px` : '1fr',
            gap: `${defaultLayoutSize.gameGap}px`
          }}
        >
          <div
            className={`relative rounded-xl p-0.5 shadow-xl ${getBlurClass()}`}
            style={{...getSectionStyle(primaryColor), overflow: 'visible'}}
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
            <div className="relative z-10 flex items-center justify-center mb-0.5 pb-0.5" style={{ borderBottom: `1px solid ${primaryColor}30`, overflow: 'visible' }}>
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
                className="h-14"
                style={{ filter: `drop-shadow(0 0 5px ${primaryColor}80)`, transform: 'scale(1.69)' }}
                alt="Pragmatic Play"
              />
            </div>
            <div className="relative z-10 flex flex-wrap justify-center" style={{ gap: `${defaultLayoutSize.gameGap}px` }}>
              {pragmaticGamesWithRTP.map((game, index) => (
                <ClassicGameCard
                  key={`pragmatic-${index}`}
                  game={game}
                  rtp={game.rtp}
                  style={selectedStyle}
                  cardSize={defaultLayoutSize.gameCardSize}
                />
              ))}
            </div>
          </div>
          {pragmaticTrik.enabled && (
            <TrikPanel
              trik={pragmaticTrik}
              providerColor={primaryColor}
              fontFamily="var(--font-rajdhani), sans-serif"
              cardStyle={selectedCardStyle}
              variant="classic"
              horizontalItems={true}
            />
          )}
        </div>

        {/* PG Soft Section with Grid */}
        <div
          className="grid items-stretch"
          style={{
            gridTemplateColumns: pgSoftTrik.enabled ? `1fr ${defaultLayoutSize.trikPanelWidth}px` : '1fr',
            gap: `${defaultLayoutSize.gameGap}px`
          }}
        >
          <div
            className={`relative rounded-xl p-0.5 shadow-xl ${getBlurClass()}`}
            style={{...getSectionStyle(secondaryColor), overflow: 'visible'}}
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
            <div className="relative z-10 flex items-center justify-center mb-0.5 pb-0.5" style={{ borderBottom: `1px solid ${secondaryColor}30`, overflow: 'visible' }}>
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
                className="h-14"
                style={{ filter: `drop-shadow(0 0 5px ${secondaryColor}80)`, transform: 'scale(1.69)' }}
                alt="PG Soft"
              />
            </div>
            <div className="relative z-10 flex flex-wrap justify-center" style={{ gap: `${defaultLayoutSize.gameGap}px` }}>
              {pgSoftGamesWithRTP.map((game, index) => (
                <ClassicGameCard
                  key={`pgsoft-${index}`}
                  game={game}
                  rtp={game.rtp}
                  style={selectedStyle}
                  cardSize={defaultLayoutSize.gameCardSize}
                />
              ))}
            </div>
          </div>
          {pgSoftTrik.enabled && (
            <TrikPanel
              trik={pgSoftTrik}
              hideFiturGanda={true}
              providerColor={secondaryColor}
              fontFamily="var(--font-rajdhani), sans-serif"
              cardStyle={selectedCardStyle}
              variant="classic"
              horizontalItems={true}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 mt-auto pt-2 pb-2 flex justify-center items-center gap-4"
        style={{
          borderTop: `1px solid ${primaryColor}`,
          borderBottom: `1px solid ${primaryColor}`,
          background: `linear-gradient(90deg, ${darkerPrimary} 0%, ${primaryColor}40 50%, ${darkerPrimary} 100%)`
        }}
      >
        <img
          src={selectedWebsite.logo}
          alt={selectedWebsite.name}
          className="h-8"
          style={{ filter: `drop-shadow(0 0 5px ${primaryColor}80)` }}
        />
        <div
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-black font-bold shadow-lg"
          style={{
            background: `linear-gradient(to bottom, ${primaryColor}, ${secondaryColor})`,
            border: `1px solid ${secondaryColor}80`,
            fontSize: '13px'
          }}
        >
          <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          HTTPS://T.ME/{telegramUsername || selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
        </div>
      </div>
    </div>
  );
}
