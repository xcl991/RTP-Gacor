'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig, MaxwinConfig } from '@/types';

interface CustomizableLayout6Props {
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
  footerConfig: FooterConfig;
  maxwinConfig: MaxwinConfig;
}

// Helper function to create darker/lighter colors from hex
function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(255 * percent / 100)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + Math.round(255 * percent / 100)));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + Math.round(255 * percent / 100)));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// Slot symbols
const SlotSymbols = () => (
  <div className="flex items-center gap-1 text-lg">
    <span>🍒</span>
    <span>7️⃣</span>
    <span>💎</span>
    <span>🍀</span>
  </div>
);

// Jackpot Badge
function JackpotBadge({ rtp }: { rtp: number }) {
  const bgColor = rtp >= 95 ? '#22c55e' : rtp >= 90 ? '#eab308' : '#ef4444';

  return (
    <div
      className="px-2 py-1 font-black text-[11px] text-white"
      style={{
        background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)`,
        borderRadius: '4px',
        boxShadow: `0 0 10px ${bgColor}, 0 2px 4px rgba(0,0,0,0.5)`,
        border: '1px solid rgba(255,255,255,0.3)'
      }}
    >
      {rtp}% HOT
    </div>
  );
}

// Vegas Slot Game Card
function VegasGameCard({ game, rtp, cardSize, primaryColor, accentColor }: { game: Game; rtp: number; cardSize: number; primaryColor: string; accentColor: string }) {
  const darkPrimary = adjustColor(primaryColor, -40);
  const darkerPrimary = adjustColor(primaryColor, -60);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: `${cardSize}px`,
        flexShrink: 0,
        background: `linear-gradient(180deg, ${darkPrimary} 0%, ${darkerPrimary} 50%, ${adjustColor(primaryColor, -70)} 100%)`,
        borderRadius: '16px',
        border: '3px solid transparent',
        borderImage: `linear-gradient(180deg, ${primaryColor}, ${accentColor}, ${primaryColor}) 1`,
        boxShadow: `0 0 20px ${primaryColor}60, 0 0 40px ${accentColor}30, inset 0 0 30px rgba(0,0,0,0.5)`
      }}
    >
      {/* Neon corner lights */}
      <div className="absolute top-0 left-0 w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}` }} />
      <div className="absolute top-0 right-0 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}, 0 0 20px ${accentColor}` }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-yellow-400" style={{ boxShadow: '0 0 10px #ffff00, 0 0 20px #ffff00' }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400" style={{ boxShadow: '0 0 10px #00ff00, 0 0 20px #00ff00' }} />

      {/* Game Image */}
      <div className="relative w-full overflow-hidden" style={{ height: `${cardSize}px`, borderRadius: '12px 12px 0 0' }}>
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        {/* RTP Jackpot Badge */}
        <div className="absolute top-1 right-1">
          <JackpotBadge rtp={rtp} />
        </div>
        {/* Slot machine overlay effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${primaryColor}20 0%, transparent 20%, transparent 80%, ${accentColor}20 100%)`
          }}
        />
      </div>

      {/* Game Name */}
      <div
        className="p-2 text-center"
        style={{
          background: `linear-gradient(to bottom, ${darkPrimary}f0, ${darkerPrimary})`
        }}
      >
        <h3
          className="text-[13px] font-bold leading-tight"
          style={{
            color: primaryColor,
            textShadow: `0 0 5px ${primaryColor}, 0 0 10px ${primaryColor}50`,
            overflow: 'hidden',
            height: '28px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {game.name}
        </h3>
      </div>
    </div>
  );
}

// Pattern Display
function PatternDisplay({ pattern, size }: { pattern: string; size: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {pattern.split('').map((char, index) => (
        <span key={index}>
          {char === 'V' ? (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}

// Vegas Trik Panel
function VegasTrikPanel({
  trik,
  providerColor,
  primaryColor,
  accentColor,
  hideFiturGanda = false
}: {
  trik: TrikConfig;
  providerColor: string;
  primaryColor: string;
  accentColor: string;
  hideFiturGanda?: boolean;
}) {
  const itemCount = trik.trikItems?.length || 0;
  const totalRows = itemCount + 4;

  const getFontSize = () => {
    if (totalRows <= 5) return { title: 24, label: 14, depositKode: 36, value: 20, itemName: 20, itemValue: 24, icon: 26, gap: 8, padding: 10 };
    if (totalRows <= 6) return { title: 22, label: 13, depositKode: 32, value: 18, itemName: 18, itemValue: 22, icon: 24, gap: 7, padding: 9 };
    if (totalRows <= 7) return { title: 20, label: 12, depositKode: 28, value: 16, itemName: 16, itemValue: 20, icon: 22, gap: 6, padding: 8 };
    return { title: 18, label: 11, depositKode: 24, value: 14, itemName: 14, itemValue: 18, icon: 20, gap: 5, padding: 7 };
  };

  const sizes = getFontSize();
  const darkPrimary = adjustColor(primaryColor, -40);
  const darkerPrimary = adjustColor(primaryColor, -60);

  return (
    <div
      className="h-full overflow-hidden flex flex-col relative"
      style={{
        background: `linear-gradient(135deg, ${darkPrimary} 0%, ${darkerPrimary} 50%, ${adjustColor(primaryColor, -70)} 100%)`,
        borderRadius: '16px',
        border: `3px solid ${providerColor}`,
        boxShadow: `0 0 20px ${providerColor}60, inset 0 0 30px rgba(0,0,0,0.5)`
      }}
    >
      {/* Animated neon border effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[13px]"
        style={{
          background: `linear-gradient(45deg, transparent 40%, ${providerColor}30 50%, transparent 60%)`,
          backgroundSize: '200% 200%'
        }}
      />

      {/* Header */}
      <div
        className="text-center flex-shrink-0 relative"
        style={{ padding: `${sizes.padding + 2}px ${sizes.padding}px ${sizes.padding}px` }}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg">🎰</span>
          <h3
            className="font-black uppercase tracking-wider"
            style={{
              color: providerColor,
              fontSize: `${sizes.title}px`,
              textShadow: `0 0 10px ${providerColor}, 0 0 20px ${providerColor}`
            }}
          >
            {trik.title || 'TRIK GACOR'}
          </h3>
          <span className="text-lg">🎰</span>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 flex flex-col overflow-hidden relative z-10"
        style={{ padding: `${sizes.padding}px`, gap: `${sizes.gap}px` }}
      >
        {/* Deposit Kode & Putaran Bet */}
        <div
          className="flex items-center gap-2"
          style={{
            background: 'rgba(0,0,0,0.5)',
            padding: `${sizes.padding}px`,
            borderRadius: '12px',
            border: `1px solid ${providerColor}50`
          }}
        >
          <div className="flex-1 text-center">
            <span className="text-gray-400 block leading-tight" style={{ fontSize: `${sizes.label}px` }}>
              DEPOSIT KODE
            </span>
            <span
              className="font-black leading-tight"
              style={{
                color: accentColor,
                fontSize: `${sizes.depositKode}px`,
                textShadow: `0 0 10px ${accentColor}`
              }}
            >
              {trik.depositKode}
            </span>
          </div>
          <div className="text-xl">💎</div>
          <div className="flex-1 text-center">
            <span className="text-gray-400 block leading-tight" style={{ fontSize: `${sizes.label}px` }}>
              PUTARAN BET
            </span>
            <span
              className="font-bold leading-tight"
              style={{ color: primaryColor, fontSize: `${sizes.value}px`, textShadow: `0 0 5px ${primaryColor}` }}
            >
              {trik.putaranBetMin.toLocaleString()} - {trik.putaranBetMax.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Fitur Ganda */}
        {!hideFiturGanda && (
          <div
            className="text-center"
            style={{
              background: 'rgba(0,0,0,0.4)',
              padding: `${sizes.padding}px`,
              borderRadius: '8px'
            }}
          >
            <span className="text-gray-400 block leading-tight" style={{ fontSize: `${sizes.label}px` }}>
              FITUR GANDA
            </span>
            <span
              className="font-bold inline-block"
              style={{
                color: trik.fiturGanda ? '#00ff00' : '#ff0000',
                fontSize: `${sizes.value}px`,
                textShadow: trik.fiturGanda ? '0 0 10px #00ff00' : '0 0 10px #ff0000'
              }}
            >
              {trik.fiturGanda ? '🍀 ON' : '❌ OFF'}
            </span>
          </div>
        )}

        {/* Trik Items */}
        <div className="flex-1 flex flex-col justify-center" style={{ gap: `${sizes.gap}px` }}>
          {trik.trikItems && trik.trikItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center"
              style={{
                background: `linear-gradient(90deg, ${providerColor}15, ${providerColor}25, ${providerColor}15)`,
                padding: `${sizes.padding}px`,
                borderRadius: '8px',
                borderLeft: `3px solid ${providerColor}`
              }}
            >
              <span className="text-white font-semibold flex-1 text-left" style={{ fontSize: `${sizes.itemName}px` }}>
                {item.name}
              </span>
              <span
                className="font-bold flex-1 text-center"
                style={{ color: accentColor, fontSize: `${sizes.itemValue}px`, textShadow: `0 0 5px ${accentColor}50` }}
              >
                {item.value}
              </span>
              <div className="flex-1 flex justify-end">
                {item.pattern && <PatternDisplay pattern={item.pattern} size={sizes.icon} />}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Text */}
        {trik.customText && (
          <div
            className="text-center"
            style={{
              background: `linear-gradient(90deg, transparent, ${providerColor}30, transparent)`,
              padding: `${sizes.padding}px`,
              borderRadius: '8px'
            }}
          >
            <p
              className="font-bold uppercase leading-tight"
              style={{
                color: providerColor,
                fontSize: `${sizes.value}px`,
                textShadow: `0 0 5px ${providerColor}`
              }}
            >
              🎰 {trik.customText} 🎰
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CustomizableLayout6({
  selectedWebsite,
  selectedStyle,
  customTimeLabel,
  selectedPragmaticGames,
  selectedPgSoftGames,
  getCurrentDate,
  pragmaticTrik,
  pgSoftTrik,
  telegramUsername,
  customHeaderText,
  headerFontSize,
  footerConfig,
  maxwinConfig
}: CustomizableLayout6Props) {
  const getFontSizeClass = () => {
    switch (headerFontSize) {
      case 'small': return 'text-lg';
      case 'medium': return 'text-xl';
      case 'large': return 'text-2xl';
      case 'xlarge': return 'text-3xl';
    }
  };

  // Use selectedStyle colors
  const primaryColor = selectedStyle.primaryColor;
  const accentColor = selectedStyle.secondaryColor;
  const darkPrimary = adjustColor(primaryColor, -40);
  const darkerPrimary = adjustColor(primaryColor, -60);

  // Card size untuk 3 game per side
  const cardSize = 145;

  // Generate RTP for games
  const pragmaticGamesWithRtp = selectedPragmaticGames.slice(0, 3).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const pgSoftGamesWithRtp = selectedPgSoftGames.slice(0, 3).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  return (
    <div
      className="relative z-10 flex flex-col"
      style={{
        fontFamily: 'var(--font-orbitron), sans-serif',
        height: '1000px',
        width: '1000px',
        overflow: 'hidden'
      }}
    >
      {/* Header 1 - Vegas Neon Title */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4 relative"
        style={{
          height: '55px',
          background: `linear-gradient(90deg, ${adjustColor(primaryColor, -70)}, ${darkerPrimary}, ${adjustColor(primaryColor, -70)})`,
          borderBottom: `3px solid ${primaryColor}`
        }}
      >
        {/* Neon light decorations */}
        <div className="absolute left-4">
          <SlotSymbols />
        </div>
        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight text-center`}
          style={{
            color: primaryColor,
            textShadow: `0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}, 0 0 40px ${primaryColor}, 0 0 80px ${primaryColor}`
          }}
        >
          {customHeaderText}
        </h1>
        <div className="absolute right-4">
          <SlotSymbols />
        </div>
      </div>

      {/* Header 2 - Logo, Time, Date */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4"
        style={{
          height: '45px',
          background: `linear-gradient(90deg, ${darkerPrimary}, ${darkPrimary}, ${darkerPrimary})`,
          borderBottom: `2px solid ${accentColor}50`
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🎰</span>
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-9 object-contain"
            style={{ filter: `drop-shadow(0 0 5px ${primaryColor})` }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Time & Date */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span
              className="font-bold"
              style={{ fontSize: '20px', color: accentColor, textShadow: `0 0 10px ${accentColor}` }}
            >
              {customTimeLabel}
            </span>
            <span style={{ color: primaryColor }}>|</span>
            <span
              className="font-medium"
              style={{ fontSize: '18px', color: primaryColor, textShadow: `0 0 5px ${primaryColor}50` }}
            >
              {getCurrentDate()}
            </span>
          </div>
          {/* Jackpot indicator */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${adjustColor(primaryColor, 20)})`,
              boxShadow: `0 0 15px ${primaryColor}`
            }}
          >
            <span className="text-xs font-black text-white">🎰 JACKPOT</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-2 p-2 overflow-hidden" style={{ minHeight: 0 }}>
        {/* Game Modal Row */}
        <div className="flex gap-3" style={{ height: '240px' }}>
          {/* Pragmatic Games */}
          <div
            className="flex-1 overflow-hidden p-3 relative"
            style={{
              background: `linear-gradient(135deg, ${darkPrimary} 0%, ${darkerPrimary} 100%)`,
              borderRadius: '20px',
              border: `3px solid ${primaryColor}`,
              boxShadow: `0 0 30px ${primaryColor}50, inset 0 0 40px rgba(0,0,0,0.5)`
            }}
          >
            {/* Neon corner dots */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }} />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />

            <div className="text-center mb-2">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: primaryColor,
                  fontSize: '20px',
                  textShadow: `0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}`
                }}
              >
                🎰 PRAGMATIC PLAY 🎰
              </h2>
            </div>
            <div className="flex gap-2 justify-center">
              {pragmaticGamesWithRtp.map((game, index) => (
                <VegasGameCard key={`pragmatic-${index}`} game={game} rtp={game.rtp} cardSize={cardSize} primaryColor={primaryColor} accentColor={accentColor} />
              ))}
            </div>
          </div>

          {/* PG Soft Games */}
          <div
            className="flex-1 overflow-hidden p-3 relative"
            style={{
              background: `linear-gradient(135deg, ${adjustColor(accentColor, -50)} 0%, ${adjustColor(accentColor, -60)} 100%)`,
              borderRadius: '20px',
              border: `3px solid ${accentColor}`,
              boxShadow: `0 0 30px ${accentColor}50, inset 0 0 40px rgba(0,0,0,0.5)`
            }}
          >
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full" style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }} />

            <div className="text-center mb-2">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: accentColor,
                  fontSize: '20px',
                  textShadow: `0 0 10px ${accentColor}, 0 0 20px ${accentColor}`
                }}
              >
                🎰 PG SOFT 🎰
              </h2>
            </div>
            <div className="flex gap-2 justify-center">
              {pgSoftGamesWithRtp.map((game, index) => (
                <VegasGameCard key={`pgsoft-${index}`} game={game} rtp={game.rtp} cardSize={cardSize} primaryColor={accentColor} accentColor={primaryColor} />
              ))}
            </div>
          </div>
        </div>

        {/* Trik Panel Row */}
        {(pragmaticTrik.enabled || pgSoftTrik.enabled) && (
          <div className="flex gap-3 items-stretch" style={{ height: '400px' }}>
            {pragmaticTrik.enabled && (
              <div className="flex-1">
                <VegasTrikPanel
                  trik={pragmaticTrik}
                  providerColor={primaryColor}
                  primaryColor={primaryColor}
                  accentColor={accentColor}
                />
              </div>
            )}
            {pgSoftTrik.enabled && (
              <div className="flex-1">
                <VegasTrikPanel
                  trik={pgSoftTrik}
                  providerColor={accentColor}
                  primaryColor={primaryColor}
                  accentColor={accentColor}
                  hideFiturGanda={true}
                />
              </div>
            )}
          </div>
        )}

        {/* Maxwin Info Section */}
        {maxwinConfig?.enabled && (
          <div
            className="flex-shrink-0 p-3"
            style={{
              background: `linear-gradient(135deg, ${darkPrimary} 0%, ${darkerPrimary} 100%)`,
              borderRadius: '16px',
              border: `2px solid ${accentColor}`,
              boxShadow: `0 0 20px ${accentColor}50`
            }}
          >
            <div className="text-center mb-2">
              <h3
                className="font-black uppercase"
                style={{
                  color: accentColor,
                  fontSize: '20px',
                  textShadow: `0 0 10px ${accentColor}, 0 0 20px ${accentColor}`
                }}
              >
                🏆 {maxwinConfig.heading1 || 'MAXWIN INFO'} 🏆
              </h3>
              {maxwinConfig.heading2 && (
                <p className="text-sm" style={{ color: `${accentColor}cc`, textShadow: `0 0 5px ${accentColor}50` }}>
                  {maxwinConfig.heading2}
                </p>
              )}
            </div>
            {maxwinConfig.textItems && maxwinConfig.textItems.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {maxwinConfig.textItems.map((item, index) => (
                  <div
                    key={index}
                    className="text-center py-2 px-3 rounded-lg"
                    style={{
                      background: `${accentColor}15`,
                      border: `1px solid ${accentColor}50`
                    }}
                  >
                    <span
                      className="font-bold text-sm"
                      style={{ color: accentColor, textShadow: `0 0 5px ${accentColor}50` }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer - Vegas Style */}
      <div className="flex-shrink-0">
        <div
          className="flex items-center justify-center gap-3 px-4"
          style={{
            height: '40px',
            background: `linear-gradient(90deg, ${adjustColor(primaryColor, -70)}, ${darkerPrimary}, ${adjustColor(primaryColor, -70)})`,
            borderTop: `3px solid ${primaryColor}`
          }}
        >
          <SlotSymbols />
          <svg width="18" height="18" viewBox="0 0 24 24" fill={accentColor} style={{ filter: `drop-shadow(0 0 5px ${accentColor})` }}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span
            className="text-sm font-bold"
            style={{ color: accentColor, textShadow: `0 0 5px ${accentColor}` }}
          >
            {footerConfig.footer1 || `Join: @${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
          <SlotSymbols />
        </div>
      </div>
    </div>
  );
}
