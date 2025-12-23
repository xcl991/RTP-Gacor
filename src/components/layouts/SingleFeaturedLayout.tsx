'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, MaxwinConfig } from '@/types';
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
}

function CompactGameCard({ game, rtp, primaryColor, secondaryColor, label }: CasinoGameCardProps & { label: string }) {
  return (
    <div className="relative" style={{ width: "210px", background: "linear-gradient(145deg, rgba(30,20,10,0.95), rgba(15,10,5,0.98))", border: "2px solid " + primaryColor, borderRadius: "8px", boxShadow: "0 0 10px " + primaryColor + "30" }}>
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl" style={{ borderColor: secondaryColor }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 rounded-tr" style={{ borderColor: secondaryColor }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 rounded-bl" style={{ borderColor: secondaryColor }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br" style={{ borderColor: secondaryColor }} />

      <div className="p-1 flex flex-col items-center">
        <div className="text-[9px] font-bold mb-0.5 px-1 text-center leading-tight" style={{ color: secondaryColor, width: "200px" }}>{label}</div>
        <div className="relative flex items-center justify-center bg-black/30 rounded" style={{ width: "200px", height: "200px" }}>
          <img
            src={game.src}
            alt={game.name}
            className="object-contain"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27200%27%3E%3Crect width=%27200%27 height=%27200%27 fill=%27%23333%27/%3E%3Ctext x=%2750%%25%27 y=%2750%%25%27 text-anchor=%27middle%27 dy=%27.3em%27 fill=%27white%27 font-family=%27Arial%27 font-size=%2714%27%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        <h3 className="font-semibold text-[9px] text-center truncate mt-0.5 px-1 leading-tight" style={{ color: primaryColor, width: "200px" }}>{game.name}</h3>
      </div>
    </div>
  );
}

interface SingleFeaturedLayoutProps {
  selectedWebsite: WebsiteOption;
  selectedStyle: RTPStyle;
  customTimeLabel: string;
  featuredGame: Game | null;
  featuredPosition: 'left' | 'center' | 'right';
  getCurrentDate: () => string;
  selectedCardStyle: CardStyleOption;
  featuredTrik: TrikConfig;
  maxwinConfig: MaxwinConfig;
  telegramUsername: string;
  customHeaderText: string;
  headerFontSize: 'small' | 'medium' | 'large' | 'xlarge';
  // New props for 2 games and 2 triks
  selectedPragmaticGames: Game[];
  selectedPgSoftGames: Game[];
  pragmaticTrik: TrikConfig;
  pgSoftTrik: TrikConfig;
}

export default function SingleFeaturedLayout({
  selectedWebsite,
  selectedStyle,
  customTimeLabel,
  featuredGame,
  featuredPosition,
  getCurrentDate,
  selectedCardStyle,
  featuredTrik,
  maxwinConfig,
  telegramUsername,
  customHeaderText,
  headerFontSize,
  selectedPragmaticGames,
  selectedPgSoftGames,
  pragmaticTrik,
  pgSoftTrik
}: SingleFeaturedLayoutProps) {
  const getFontSizeClass = () => {
    switch (headerFontSize) {
      case 'small': return 'text-2xl';
      case 'medium': return 'text-3xl';
      case 'large': return 'text-4xl';
      case 'xlarge': return 'text-5xl';
    }
  };

  const primaryColor = selectedStyle.primaryColor;
  const secondaryColor = selectedStyle.secondaryColor;
  const darkPrimary = adjustColor(primaryColor, -70);
  const darkerPrimary = adjustColor(primaryColor, -85);

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

  // Combine all selected games with provider info
  const allGamesWithProvider = [
    ...selectedPragmaticGames.map(g => ({
      ...g,
      provider: 'pragmatic' as const,
      providerLabel: 'PRAGMATIC PLAY',
      rtp: Math.floor(Math.random() * 13) + 86
    })),
    ...selectedPgSoftGames.map(g => ({
      ...g,
      provider: 'pgsoft' as const,
      providerLabel: 'PG SOFT',
      rtp: Math.floor(Math.random() * 13) + 86
    }))
  ];

  // Take first 2 games (or 1 if only 1 selected)
  const firstGame = allGamesWithProvider.length > 0 ? allGamesWithProvider[0] : null;
  const secondGame = allGamesWithProvider.length > 1 ? allGamesWithProvider[1] : null;

  // For Event-1, use provider-specific trik first, then fallback to featuredTrik
  // This allows different triks for Pragmatic and PG Soft games
  const getGameTrik = (game: typeof firstGame) => {
    if (!game) return featuredTrik;

    // Priority 1: Use provider-specific trik if enabled
    const providerTrik = game.provider === 'pragmatic' ? pragmaticTrik : pgSoftTrik;
    if (providerTrik.enabled) return providerTrik;

    // Priority 2: Use featuredTrik if enabled
    if (featuredTrik.enabled) return featuredTrik;

    // Priority 3: Return provider trik even if not enabled (for consistent structure)
    return providerTrik;
  };

  const firstTrik = getGameTrik(firstGame);
  const secondTrik = getGameTrik(secondGame);

  return (
    <div className="relative z-10 flex flex-col h-full p-2" style={{ fontFamily: "var(--font-cinzel), serif" }}>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2780%27 height=%2780%27 viewBox=%270 0 80 80%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M40 0L80 40L40 80L0 40z%27 fill=%27" + encodeURIComponent(primaryColor) + "%27 fill-opacity=%270.3%27/%3E%3C/svg%3E')",
          backgroundSize: "80px 80px"
        }}
      />

      {/* Compact Header */}
      <div className="relative z-10 text-center mb-1.5 p-1.5 rounded-lg" style={{ background: `linear-gradient(135deg, ${darkerPrimary}cc, ${darkPrimary}e6)`, border: "1.5px solid " + primaryColor }}>
        <img
          src={selectedWebsite.logo}
          alt={selectedWebsite.name}
          className="mx-auto mb-0.5"
          style={{ height: "47px", filter: "drop-shadow(0 0 8px " + primaryColor + "cc)" }}
        />
        <h1 className="font-bold uppercase tracking-wide mb-0.5" style={{ fontSize: "18.4px", background: "linear-gradient(to bottom, " + secondaryColor + ", " + primaryColor + ")", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {customHeaderText}
        </h1>
        <div className="flex items-center justify-center gap-2 text-xs">
          <span style={{ color: primaryColor }}>{getCurrentDate()}</span>
          <span style={{ color: secondaryColor }}>{customTimeLabel}</span>
        </div>
      </div>

      {/* Main Content - 3 Rows */}
      <div className="flex flex-col gap-2 mb-2 relative z-10">
        {/* Row 1: Game Cards - Adaptive Grid */}
        {(firstGame || secondGame) && (
          <div className={firstGame && secondGame ? "grid grid-cols-2 gap-2" : "flex justify-center"}>
            {/* First Game Card */}
            {firstGame && (
              <div className="flex justify-center">
                <div
                  className={"relative inline-flex rounded-lg " + getBlurClass()}
                  style={getSectionStyle(firstGame.provider === 'pragmatic' ? primaryColor : secondaryColor)}
                >
                  {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
                    <div
                      className="absolute inset-0 pointer-events-none rounded-lg"
                      style={{
                        backgroundImage: selectedCardStyle.pattern,
                        backgroundRepeat: 'repeat'
                      }}
                    />
                  )}
                  <div className="relative z-10">
                    <CompactGameCard
                      game={firstGame}
                      rtp={firstGame.rtp}
                      primaryColor={firstGame.provider === 'pragmatic' ? primaryColor : secondaryColor}
                      secondaryColor={firstGame.provider === 'pragmatic' ? secondaryColor : primaryColor}
                      label={firstGame.providerLabel}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Second Game Card */}
            {secondGame && (
              <div className="flex justify-center">
                <div
                  className={"relative inline-flex rounded-lg " + getBlurClass()}
                  style={getSectionStyle(secondGame.provider === 'pragmatic' ? primaryColor : secondaryColor)}
                >
                  {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
                    <div
                      className="absolute inset-0 pointer-events-none rounded-lg"
                      style={{
                        backgroundImage: selectedCardStyle.pattern,
                        backgroundRepeat: 'repeat'
                      }}
                    />
                  )}
                  <div className="relative z-10">
                    <CompactGameCard
                      game={secondGame}
                      rtp={secondGame.rtp}
                      primaryColor={secondGame.provider === 'pragmatic' ? primaryColor : secondaryColor}
                      secondaryColor={secondGame.provider === 'pragmatic' ? secondaryColor : primaryColor}
                      label={secondGame.providerLabel}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State if no games selected */}
        {!firstGame && !secondGame && (
          <div className="p-4 text-center">
            <div className="border-2 border-dashed rounded-lg p-8" style={{ borderColor: primaryColor + "40" }}>
              <p className="text-gray-400 text-sm mb-2">Belum ada game dipilih</p>
              <p className="text-xs text-gray-500">Pilih game dari tombol Pragmatic atau PG Soft di header</p>
            </div>
          </div>
        )}

        {/* Row 2: Trik Panels - Adaptive Grid */}
        {((firstGame && firstTrik.enabled) || (secondGame && secondTrik.enabled)) && (
          <div className={(firstGame && firstTrik.enabled) && (secondGame && secondTrik.enabled) ? "grid grid-cols-2 gap-2" : "flex justify-center"}>
            {/* First Game Trik Panel */}
            {firstGame && firstTrik.enabled && (
              <div className="flex justify-center">
                <TrikPanel
                  trik={{ ...firstTrik, fontSize: 'xs' }}
                  providerColor={firstGame.provider === 'pragmatic' ? primaryColor : secondaryColor}
                  fontFamily="var(--font-cinzel), serif"
                  cardStyle={selectedCardStyle}
                  variant="elegant"
                  horizontalItems={true}
                  hideFiturGanda={firstGame.provider === 'pgsoft'}
                />
              </div>
            )}

            {/* Second Game Trik Panel */}
            {secondGame && secondTrik.enabled && (
              <div className="flex justify-center">
                <TrikPanel
                  trik={{ ...secondTrik, fontSize: 'xs' }}
                  providerColor={secondGame.provider === 'pragmatic' ? primaryColor : secondaryColor}
                  fontFamily="var(--font-cinzel), serif"
                  cardStyle={selectedCardStyle}
                  variant="elegant"
                  horizontalItems={true}
                  hideFiturGanda={secondGame.provider === 'pgsoft'}
                />
              </div>
            )}
          </div>
        )}

        {/* Row 3: Maxwin Info Full Width */}
        {maxwinConfig.enabled && (
          <div
            className={"relative p-1 rounded " + getBlurClass()}
            style={getSectionStyle(primaryColor)}
          >
            {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
              <div
                className="absolute inset-0 pointer-events-none rounded"
                style={{
                  backgroundImage: selectedCardStyle.pattern,
                  backgroundRepeat: 'repeat'
                }}
              />
            )}
            <div className="relative z-10">
              {/* Heading 1 */}
              <div
                className="text-center mb-0.5 p-1 rounded"
                style={{
                  background: "linear-gradient(135deg, " + primaryColor + "20, " + secondaryColor + "20)",
                  border: "1px solid " + secondaryColor,
                  boxShadow: "0 0 8px " + secondaryColor + "20"
                }}
              >
                <h2
                  className="text-xl font-black uppercase tracking-tight leading-tight"
                  style={{
                    background: "linear-gradient(to bottom, " + secondaryColor + " 0%, " + primaryColor + " 50%, " + primaryColor + "aa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  {maxwinConfig.heading1 || 'KODE MAXWIN GACOR MALAM INI 6.917'}
                </h2>
              </div>

              {/* Heading 2 */}
              {maxwinConfig.heading2 && (
                <div className="text-center mb-0.5">
                  <h3 className="text-base font-bold uppercase tracking-tight leading-tight" style={{ color: secondaryColor }}>
                    {maxwinConfig.heading2}
                  </h3>
                </div>
              )}

              {/* Text Items - Horizontal Grid */}
              <div className="grid grid-cols-2 gap-1">
                {maxwinConfig.textItems.map((text, index) => (
                  text && (
                    <div
                      key={index}
                      className="p-1.5 rounded text-center"
                      style={{
                        background: "linear-gradient(145deg, rgba(30,20,10,0.95), rgba(15,10,5,0.98))",
                        border: "1px solid " + secondaryColor + "50",
                        boxShadow: "0 0 4px " + secondaryColor + "20"
                      }}
                    >
                      <p className="text-white font-semibold text-sm leading-tight">{text}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="relative z-10 mt-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${darkerPrimary}cc, ${darkPrimary}e6)`,
            border: "1.5px solid " + primaryColor,
            boxShadow: "0 0 20px " + primaryColor + "30"
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={primaryColor}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span className="text-sm font-semibold" style={{ color: primaryColor }}>
            @{telegramUsername || selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
          </span>
        </div>
      </div>
    </div>
  );
}
