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

interface CasinoGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  secondaryColor: string;
  isShowcase?: boolean;
  darkBackground: string;
}

function CasinoGameCard({ game, rtp, primaryColor, secondaryColor, isShowcase = false, darkBackground }: CasinoGameCardProps) {
  const cardSize = isShowcase ? 220 : 150;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: cardSize + 'px',
        height: cardSize + 'px',
        background: `linear-gradient(145deg, ${darkBackground}f2, ${darkBackground})`,
        border: "2px solid " + primaryColor,
        borderRadius: "12px",
        boxShadow: "0 0 20px " + primaryColor + "40, inset 0 0 30px rgba(0,0,0,0.5)"
      }}
    >
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: secondaryColor }} />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: secondaryColor }} />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: secondaryColor }} />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: secondaryColor }} />

      <div className="relative w-full overflow-hidden" style={{ height: cardSize - (isShowcase ? 60 : 50) + 'px' }}>
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-contain bg-black/30"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27200%27%3E%3Crect width=%27200%27 height=%27200%27 fill=%27%23333%27/%3E%3Ctext x=%2750%%25%27 y=%2750%%25%27 text-anchor=%27middle%27 dy=%27.3em%27 fill=%27white%27 font-family=%27Arial%27 font-size=%2714%27%3ENo Image%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-center truncate" style={{ color: primaryColor }}>
          {game.name}
        </h3>
      </div>
    </div>
  );
}

interface CasinoLuxuryLayoutProps {
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
}

export default function CasinoLuxuryLayout({
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
  headerFontSize
}: CasinoLuxuryLayoutProps) {
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

  const getBlurClass = () => {
    if (!selectedCardStyle?.blur || selectedCardStyle.blur === 'none') return '';
    return selectedCardStyle.blur;
  };

  const getSectionStyle = (color: string) => ({
    background: selectedCardStyle?.background || undefined,
    border: selectedCardStyle?.border ? selectedCardStyle.border + " " + color : undefined,
    opacity: selectedCardStyle?.opacity || 1,
    boxShadow: selectedCardStyle?.shadow ? (selectedCardStyle.shadow.includes('0 0 20px') ? selectedCardStyle.shadow + " " + color : selectedCardStyle.shadow) : undefined
  });

  const pragmaticGamesWithRTP = selectedPragmaticGames.slice(0, pragmaticCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const pgSoftGamesWithRTP = selectedPgSoftGames.slice(0, pgSoftCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const featuredPragmatic = pragmaticGamesWithRTP[0];
  const featuredPgSoft = pgSoftGamesWithRTP[0];

  return (
    <div className="relative z-10 flex flex-col min-h-full p-3" style={{ fontFamily: "var(--font-cinzel), serif" }}>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2780%27 height=%2780%27 viewBox=%270 0 80 80%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M40 0L80 40L40 80L0 40z%27 fill=%27" + encodeURIComponent(primaryColor) + "%27 fill-opacity=%270.3%27/%3E%3C/svg%3E')",
          backgroundSize: "80px 80px"
        }}
      />

      <div
        className="relative z-10 text-center mb-1.5 p-3 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${darkerPrimary}cc, ${darkPrimary}e6)`,
          border: "3px solid " + primaryColor,
          boxShadow: "0 0 40px " + primaryColor + "30, inset 0 0 60px rgba(0,0,0,0.5)"
        }}
      >
        <img
          src={selectedWebsite.logo}
          alt={selectedWebsite.name}
          className="h-24 mx-auto mb-3"
          style={{ filter: "drop-shadow(0 0 20px " + primaryColor + "cc)" }}
        />
        <div className="text-lg mb-1.5" style={{ color: secondaryColor, letterSpacing: "4px" }}>
          {customHeaderText}
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-base" style={{ color: primaryColor }}>{getCurrentDate()}</span>
          <span className="text-base" style={{ color: secondaryColor }}>{customTimeLabel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-1.5 relative z-10">
        <div
          className={"relative lg:col-span-1 p-3 rounded-xl " + getBlurClass()}
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
            className="relative z-10 flex items-center justify-center gap-2 mb-1.5 p-3 rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(90deg, transparent, " + primaryColor + "20, transparent)",
              borderTop: "1px solid " + primaryColor + "50",
              borderBottom: "1px solid " + primaryColor + "50"
            }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 z-0"
              style={{
                background: "linear-gradient(135deg, " + primaryColor + "15, transparent)",
                opacity: 0.6
              }}
            />
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              className="relative z-10"
              style={{ height: '67.2px', filter: "drop-shadow(0 0 10px " + primaryColor + "80)", transform: "scale(1.3)" }}
              alt="Pragmatic Play"
            />
          </div>
          <div className="relative z-10 flex flex-wrap justify-center gap-2">
            {pragmaticGamesWithRTP.slice(1).map((game, index) => (
              <CasinoGameCard
                key={"pragmatic-" + index}
                game={game}
                rtp={game.rtp}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                darkBackground={darkPrimary}
              />
            ))}
          </div>
          {pragmaticTrik.enabled && (
            <div className="relative z-10 mt-4" style={{ minHeight: '500px' }}>
              <TrikPanel
                trik={pragmaticTrik}
                providerColor={primaryColor}
                fontFamily="var(--font-cinzel), serif"
                cardStyle={selectedCardStyle}
                variant="elegant"
              />
            </div>
          )}
        </div>

        <div
          className={"relative lg:col-span-1 p-3 rounded-xl " + getBlurClass()}
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
            className="relative z-10 text-center mb-1.5 p-3 rounded-xl"
            style={{
              background: "linear-gradient(135deg, " + primaryColor + "20, " + secondaryColor + "20)",
              border: "2px solid " + primaryColor,
              boxShadow: "0 0 20px " + primaryColor + "30"
            }}
          >
            <span className="text-base font-bold tracking-widest" style={{ color: primaryColor }}>
              FEATURED
            </span>
          </div>

          {featuredPragmatic && (
            <div className="relative z-10 mb-1.5">
              <div
                className="text-center text-sm font-bold mb-1.5 py-1 rounded"
                style={{ background: primaryColor, color: "#000" }}
              >
                HOTTEST GAME
              </div>
              <div className="flex justify-center">
                <CasinoGameCard
                  game={featuredPragmatic}
                  rtp={featuredPragmatic.rtp}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  isShowcase={true}
                  darkBackground={darkPrimary}
                />
              </div>
            </div>
          )}

          {featuredPgSoft && (
            <div className="relative z-10">
              <div
                className="text-center text-sm font-bold mb-1.5 py-1 rounded"
                style={{ background: secondaryColor, color: "#fff" }}
              >
                TRENDING
              </div>
              <div className="flex justify-center">
                <CasinoGameCard
                  game={featuredPgSoft}
                  rtp={featuredPgSoft.rtp}
                  primaryColor={secondaryColor}
                  secondaryColor={primaryColor}
                  isShowcase={true}
                  darkBackground={darkSecondary}
                />
              </div>
            </div>
          )}
        </div>

        <div
          className={"relative lg:col-span-1 p-3 rounded-xl " + getBlurClass()}
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
            className="relative z-10 flex items-center justify-center gap-2 mb-1.5 p-3 rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(90deg, transparent, " + secondaryColor + "20, transparent)",
              borderTop: "1px solid " + secondaryColor + "50",
              borderBottom: "1px solid " + secondaryColor + "50"
            }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 z-0"
              style={{
                background: "linear-gradient(135deg, " + secondaryColor + "15, transparent)",
                opacity: 0.6
              }}
            />
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
              className="relative z-10"
              style={{ height: '67.2px', filter: "drop-shadow(0 0 10px " + secondaryColor + "80)", transform: "scale(1.3)" }}
              alt="PG Soft"
            />
          </div>
          <div className="relative z-10 flex flex-wrap justify-center gap-2">
            {pgSoftGamesWithRTP.slice(1).map((game, index) => (
              <CasinoGameCard
                key={"pgsoft-" + index}
                game={game}
                rtp={game.rtp}
                primaryColor={secondaryColor}
                secondaryColor={primaryColor}
                darkBackground={darkSecondary}
              />
            ))}
          </div>
          {pgSoftTrik.enabled && (
            <div className="relative z-10 mt-4" style={{ minHeight: '500px' }}>
              <TrikPanel
                trik={pgSoftTrik}
                hideFiturGanda={true}
                providerColor={secondaryColor}
                fontFamily="var(--font-cinzel), serif"
                cardStyle={selectedCardStyle}
                variant="elegant"
              />
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 mt-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-4 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${darkerPrimary}cc, ${darkPrimary}e6)`,
            border: "2px solid " + primaryColor,
            boxShadow: "0 0 30px " + primaryColor + "30"
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill={primaryColor}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span className="text-base font-semibold" style={{ color: primaryColor }}>
            @{telegramUsername || selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
          </span>
        </div>
      </div>
    </div>
  );
}
