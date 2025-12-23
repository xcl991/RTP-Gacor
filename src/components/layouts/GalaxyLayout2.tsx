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

interface GalaxyGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  secondaryColor: string;
  cardSize: number;
  darkBackground: string;
}

function GalaxyGameCard({ game, rtp, primaryColor, secondaryColor, cardSize, darkBackground }: GalaxyGameCardProps) {
  const isHot = rtp >= 95;

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
      style={{
        width: `${cardSize}px`,
        minWidth: `${cardSize}px`,
        maxWidth: `${cardSize}px`,
        backgroundColor: darkBackground,
        border: '2px solid ' + primaryColor,
        flexShrink: 0
      }}
    >
      {isHot && (
        <div
          className="absolute top-2 left-2 px-2 py-0.5 text-xs font-bold uppercase z-20 rounded"
          style={{ background: secondaryColor, color: "white" }}
        >
          GACOR
        </div>
      )}

      <div className="relative w-full overflow-hidden" style={{ height: '126px', position: 'relative' }}>
        <img
          alt={game.name + " game preview"}
          className="w-full h-full object-contain bg-black/50"
          src={game.src}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27200%27%3E%3Crect width=%27200%27 height=%27200%27 fill=%27%23333%27/%3E%3Ctext x=%2750%%25%27 y=%2750%%25%27 text-anchor=%27middle%27 dy=%27.3em%27 fill=%27white%27 font-family=%27Arial%27 font-size=%2714%27%3ENo Image%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>
      <div className="p-3" style={{ background: `linear-gradient(${darkBackground}dd, ${darkBackground})` }}>
        <h3
          data-game-title="true"
          className="text-white font-bold text-sm text-center mb-1.5"
          style={{
            overflow: 'hidden',
            height: '42px',
            lineHeight: '14px',
            whiteSpace: 'normal',
            overflowWrap: 'break-word'
          }}
        >
          {game.name}
        </h3>
      </div>
    </div>
  );
}

interface GalaxyLayout2Props {
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

export default function GalaxyLayout2({
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
}: GalaxyLayout2Props) {
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

  const darkPrimary = adjustColor(primaryColor, -75);
  const darkerPrimary = adjustColor(primaryColor, -85);
  const darkSecondary = adjustColor(secondaryColor, -75);
  const darkerSecondary = adjustColor(secondaryColor, -85);

  const getBlurClass = () => {
    if (!selectedCardStyle?.blur || selectedCardStyle.blur === 'none') return '';
    return selectedCardStyle.blur;
  };

  const getSectionStyle = (color: string) => {
    const darkColor = adjustColor(color, -80);
    const darkerColor = adjustColor(color, -88);
    return {
      background: selectedCardStyle?.background || `linear-gradient(145deg, ${darkColor}f2, ${darkerColor}fa)`,
      border: selectedCardStyle?.border ? selectedCardStyle.border + " " + color : "2px solid " + color + "60",
      opacity: selectedCardStyle?.opacity || 1,
      boxShadow: selectedCardStyle?.shadow ? (selectedCardStyle.shadow.includes('0 0 20px') ? selectedCardStyle.shadow + " " + color : selectedCardStyle.shadow) : "0 0 20px " + color + "30, inset 0 0 30px rgba(0,0,0,0.5)"
    };
  };

  const pragmaticGamesWithRTP = selectedPragmaticGames.slice(0, pragmaticCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const pgSoftGamesWithRTP = selectedPgSoftGames.slice(0, pgSoftCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  return (
    <div className="relative z-10 flex flex-col min-h-full p-3" style={{ fontFamily: "var(--font-orbitron), sans-serif" }}>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(2px 2px at 20px 30px, " + primaryColor + ", transparent), radial-gradient(2px 2px at 40px 70px, " + secondaryColor + ", transparent), radial-gradient(1px 1px at 90px 40px, white, transparent)",
          backgroundSize: "200px 150px"
        }}
      />

      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, " + primaryColor + "40, transparent 70%)",
          filter: "blur(40px)"
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, " + secondaryColor + "40, transparent 70%)",
          filter: "blur(40px)"
        }}
      />

      <div
        className="relative z-10 text-center mb-1.5 p-2 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${darkPrimary}e6, ${darkerPrimary}f2)`,
          border: "2px solid " + primaryColor + "60",
          boxShadow: "0 0 40px " + primaryColor + "30, inset 0 0 60px rgba(0,0,0,0.5)"
        }}
      >
        <img
          src={selectedWebsite.logo}
          alt={selectedWebsite.name}
          className="h-16 mx-auto mb-2"
          style={{ filter: 'none' }}
        />
        <h1
          className={getFontSizeClass() + " font-bold uppercase tracking-widest mb-1"}
          style={{
            background: "linear-gradient(90deg, " + primaryColor + ", " + secondaryColor + ", " + primaryColor + ")",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          {customHeaderText}
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span className="text-base" style={{ color: primaryColor }}>{getCurrentDate()}</span>
          <span className="text-base" style={{ color: secondaryColor }}>{customTimeLabel}</span>
        </div>
      </div>

      {/* Pragmatic Section with Grid */}
      <div
        className="grid items-stretch mb-1.5"
        style={{
          gridTemplateColumns: pragmaticTrik.enabled ? `1fr ${defaultLayoutSize.trikPanelWidth}px` : '1fr',
          gap: `${defaultLayoutSize.gameGap}px`
        }}
      >
        <div
          className={"relative rounded-xl " + getBlurClass()}
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
              alt="PRAGMATIC PLAY provider logo"
              className="h-14 object-contain"
              style={{ filter: 'none', transform: 'scale(1.4)' }}
            />
          </div>
          <div
            className="relative z-10"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: `${defaultLayoutSize.gameGap}px`,
              width: '100%'
            }}
          >
            {pragmaticGamesWithRTP.map((game, index) => (
              <GalaxyGameCard
                key={"pragmatic-" + index}
                game={game}
                rtp={game.rtp}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                cardSize={defaultLayoutSize.gameCardSize}
                darkBackground={darkerPrimary}
              />
            ))}
          </div>
        </div>
        {pragmaticTrik.enabled && (
          <TrikPanel
            trik={pragmaticTrik}
            providerColor={primaryColor}
            fontFamily="var(--font-orbitron), sans-serif"
            cardStyle={selectedCardStyle}
            variant="galaxy"
            horizontalItems={true}
          />
        )}
      </div>

      {/* PG Soft Section with Grid */}
      <div
        className="grid items-stretch mb-1.5"
        style={{
          gridTemplateColumns: pgSoftTrik.enabled ? `1fr ${defaultLayoutSize.trikPanelWidth}px` : '1fr',
          gap: `${defaultLayoutSize.gameGap}px`
        }}
      >
        <div
          className={"relative rounded-xl " + getBlurClass()}
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
              alt="PG SOFT provider logo"
              className="h-14 object-contain"
              style={{ filter: 'none', transform: 'scale(1.4)' }}
            />
          </div>
          <div
            className="relative z-10"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: `${defaultLayoutSize.gameGap}px`,
              width: '100%'
            }}
          >
            {pgSoftGamesWithRTP.map((game, index) => (
              <GalaxyGameCard
                key={"pgsoft-" + index}
                game={game}
                rtp={game.rtp}
                primaryColor={secondaryColor}
                secondaryColor={primaryColor}
                cardSize={defaultLayoutSize.gameCardSize}
                darkBackground={darkerSecondary}
              />
            ))}
          </div>
        </div>
        {pgSoftTrik.enabled && (
          <TrikPanel
            trik={pgSoftTrik}
            hideFiturGanda={true}
            providerColor={secondaryColor}
            fontFamily="var(--font-orbitron), sans-serif"
            cardStyle={selectedCardStyle}
            variant="galaxy"
            horizontalItems={true}
          />
        )}
      </div>

      <div className="relative z-10 mt-4 text-center">
        <div
          style={{
            display: 'inline-table',
            background: 'rgba(0,0,0,0.8)',
            border: '2px solid ' + primaryColor,
            borderRadius: '9999px',
            padding: '0'
          }}
        >
          <div
            style={{
              display: 'table-cell',
              verticalAlign: 'middle',
              textAlign: 'center',
              padding: '12px 32px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill={primaryColor}>
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '24px',
                  fontWeight: 700,
                  lineHeight: '24px',
                  color: primaryColor,
                  whiteSpace: 'nowrap'
                }}
              >
                Join Komunitas Telegram : @{telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
