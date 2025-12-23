'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig } from '@/types';

interface CustomizableLayout5Props {
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
}

// Helper function to create darker/lighter colors from hex
function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(255 * percent / 100)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + Math.round(255 * percent / 100)));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + Math.round(255 * percent / 100)));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// Card Suits untuk dekorasi
const CardSuits = ({ color = '#ffd700', size = 16 }: { color?: string; size?: number }) => (
  <div className="flex items-center gap-1">
    <span style={{ color: '#ef4444', fontSize: size }}>♥</span>
    <span style={{ color, fontSize: size }}>♠</span>
    <span style={{ color: '#ef4444', fontSize: size }}>♦</span>
    <span style={{ color, fontSize: size }}>♣</span>
  </div>
);

// Poker Chip Badge
function PokerChipBadge({ value, color }: { value: string; color: string }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: `conic-gradient(${color} 0deg, #fff 30deg, ${color} 60deg, #fff 90deg, ${color} 120deg, #fff 150deg, ${color} 180deg, #fff 210deg, ${color} 240deg, #fff 270deg, ${color} 300deg, #fff 330deg, ${color} 360deg)`,
        boxShadow: `0 2px 8px rgba(0,0,0,0.5), inset 0 0 10px rgba(255,255,255,0.3)`
      }}
    >
      <div
        className="absolute flex items-center justify-center font-bold text-[10px]"
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          backgroundColor: color,
          color: '#fff',
          border: '2px solid #fff'
        }}
      >
        {value}
      </div>
    </div>
  );
}

// Poker Game Card
function PokerGameCard({ game, rtp, cardSize, accentColor }: { game: Game; rtp: number; cardSize: number; accentColor: string }) {
  const rtpColor = rtp >= 95 ? '#22c55e' : rtp >= 90 ? '#eab308' : '#ef4444';

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: `${cardSize}px`,
        flexShrink: 0,
        background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
        borderRadius: '12px',
        border: `3px solid ${accentColor}`,
        boxShadow: `0 4px 15px ${accentColor}50, inset 0 0 20px rgba(0,0,0,0.5)`
      }}
    >
      {/* Corner suits */}
      <div className="absolute top-1 left-1 text-red-500 text-[10px] font-bold">♥</div>
      <div className="absolute top-1 right-1" style={{ color: accentColor, fontSize: '10px', fontWeight: 'bold' }}>♠</div>
      <div className="absolute bottom-1 left-1" style={{ color: accentColor, fontSize: '10px', fontWeight: 'bold' }}>♣</div>
      <div className="absolute bottom-1 right-1 text-red-500 text-[10px] font-bold">♦</div>

      {/* Game Image */}
      <div className="relative w-full overflow-hidden" style={{ height: `${cardSize}px` }}>
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-cover"
          style={{ borderRadius: '8px 8px 0 0' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        {/* RTP Poker Chip */}
        <div className="absolute top-1 right-1">
          <PokerChipBadge value={`${rtp}`} color={rtpColor} />
        </div>
        {/* Overlay gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${accentColor}20 0%, transparent 30%, transparent 70%, ${accentColor}25 100%)`
          }}
        />
      </div>

      {/* Game Name */}
      <div
        className="p-2 text-center"
        style={{
          background: 'linear-gradient(to bottom, rgba(22,33,62,0.95), rgba(15,15,35,1))',
          borderTop: `2px solid ${accentColor}50`
        }}
      >
        <h3
          className="text-[13px] font-bold leading-tight"
          style={{
            color: accentColor,
            overflow: 'hidden',
            height: '28px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textShadow: `0 0 10px ${accentColor}80`
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
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}

// Poker Trik Panel
function PokerTrikPanel({
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
    if (totalRows <= 5) return { title: 22, label: 13, depositKode: 34, value: 18, itemName: 21, itemValue: 23, icon: 24, gap: 8, padding: 10 };
    if (totalRows <= 6) return { title: 20, label: 12, depositKode: 30, value: 16, itemName: 19, itemValue: 21, icon: 22, gap: 7, padding: 8 };
    if (totalRows <= 7) return { title: 18, label: 11, depositKode: 26, value: 14, itemName: 17, itemValue: 19, icon: 20, gap: 6, padding: 7 };
    if (totalRows <= 8) return { title: 16, label: 10, depositKode: 22, value: 12, itemName: 15, itemValue: 17, icon: 18, gap: 5, padding: 6 };
    return { title: 14, label: 9, depositKode: 18, value: 11, itemName: 14, itemValue: 15, icon: 16, gap: 4, padding: 5 };
  };

  const sizes = getFontSize();
  const darkPrimary = adjustColor(primaryColor, -30);
  const darkerPrimary = adjustColor(primaryColor, -50);

  return (
    <div
      className="h-full overflow-hidden flex flex-col relative"
      style={{
        background: `linear-gradient(135deg, ${darkerPrimary} 0%, ${darkPrimary} 50%, ${darkerPrimary} 100%)`,
        borderRadius: '16px',
        border: `4px solid ${accentColor}`,
        boxShadow: `0 0 20px ${accentColor}60, inset 0 0 30px rgba(0,0,0,0.5)`
      }}
    >
      {/* Felt texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
        }}
      />

      {/* Header with card suits */}
      <div
        className="text-center flex-shrink-0 relative"
        style={{ padding: `${sizes.padding + 4}px ${sizes.padding * 2}px ${sizes.padding}px` }}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-red-500 text-lg">♥</span>
          <h3
            className="font-black uppercase tracking-wider"
            style={{
              color: accentColor,
              fontSize: `${sizes.title}px`,
              textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000'
            }}
          >
            {trik.title || 'TRIK GACOR'}
          </h3>
          <span className="text-red-500 text-lg">♦</span>
        </div>
        <div className="flex justify-center">
          <CardSuits color={accentColor} size={14} />
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 flex flex-col overflow-hidden relative z-10"
        style={{ padding: `${sizes.padding}px`, gap: `${sizes.gap}px` }}
      >
        {/* Deposit Kode & Putaran Bet */}
        <div
          className="flex items-center gap-3"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(0,0,0,0.4))',
            padding: `${sizes.padding}px`,
            borderRadius: '12px',
            border: `2px solid ${accentColor}80`
          }}
        >
          <div className="flex-1 text-center">
            <span className="block leading-tight font-semibold" style={{ fontSize: `${sizes.label}px`, color: `${accentColor}cc` }}>
              DEPOSIT KODE
            </span>
            <span
              className="font-black leading-tight"
              style={{
                color: '#fff',
                fontSize: `${sizes.depositKode}px`,
                textShadow: '2px 2px 0 #000'
              }}
            >
              {trik.depositKode}
            </span>
          </div>
          <div className="text-2xl" style={{ color: accentColor }}>♠</div>
          <div className="flex-1 text-center">
            <span className="block leading-tight font-semibold" style={{ fontSize: `${sizes.label}px`, color: `${accentColor}cc` }}>
              PUTARAN BET
            </span>
            <span className="font-bold leading-tight text-white" style={{ fontSize: `${sizes.value}px`, textShadow: '1px 1px 0 #000' }}>
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
              borderRadius: '8px',
              border: `1px solid ${accentColor}50`
            }}
          >
            <span className="block leading-tight font-semibold" style={{ fontSize: `${sizes.label}px`, color: `${accentColor}cc` }}>
              FITUR GANDA
            </span>
            <span
              className={`font-bold px-3 py-1 inline-block rounded-full ${
                trik.fiturGanda ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}
              style={{ fontSize: `${sizes.value}px` }}
            >
              MODE {trik.fiturGanda ? 'ON' : 'OFF'}
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
                background: 'rgba(0,0,0,0.4)',
                padding: `${sizes.padding}px ${sizes.padding * 1.5}px`,
                borderRadius: '8px',
                borderLeft: `4px solid ${accentColor}`
              }}
            >
              <span className="text-white font-semibold flex-1 text-left" style={{ fontSize: `${sizes.itemName}px` }}>
                {item.name}
              </span>
              <span className="font-bold flex-1 text-center" style={{ fontSize: `${sizes.itemValue}px`, color: accentColor }}>
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
              background: `linear-gradient(90deg, ${accentColor}20, ${accentColor}40, ${accentColor}20)`,
              border: `2px solid ${accentColor}`,
              padding: `${sizes.padding}px`,
              borderRadius: '12px'
            }}
          >
            <p
              className="font-bold uppercase leading-tight"
              style={{ fontSize: `${sizes.value}px`, textShadow: '1px 1px 0 #000', color: accentColor }}
            >
              {trik.customText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Poker Provider Section
function PokerProviderSection({
  title,
  games,
  providerColor,
  primaryColor,
  accentColor,
  trik,
  trikPanelWidth,
  hideFiturGanda = false
}: {
  title: string;
  games: Game[];
  providerColor: string;
  primaryColor: string;
  accentColor: string;
  trik: TrikConfig;
  trikPanelWidth: number;
  hideFiturGanda?: boolean;
}) {
  const displayGames = games.slice(0, 3).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const adjustedTrikWidth = trikPanelWidth - 150;
  const baseAvailableWidth = trik.enabled ? (980 - adjustedTrikWidth - 16) : 980;
  const baseCardSize = Math.floor(baseAvailableWidth / 3.2);
  const cardSize = Math.floor(baseCardSize * 0.9);

  const darkPrimary = adjustColor(primaryColor, -30);
  const darkerPrimary = adjustColor(primaryColor, -50);

  return (
    <div className="flex-1 flex gap-3 overflow-hidden items-center" style={{ minHeight: 0 }}>
      {/* Games Grid - Casino Table Style */}
      <div
        className="overflow-hidden p-3 self-center relative"
        style={{
          background: `linear-gradient(145deg, ${darkerPrimary} 0%, ${darkPrimary} 50%, ${darkerPrimary} 100%)`,
          borderRadius: '20px',
          border: `4px solid ${adjustColor(accentColor, -20)}`,
          boxShadow: `0 0 30px ${accentColor}40, inset 0 0 50px rgba(0,0,0,0.3)`,
          width: trik.enabled ? `${(cardSize * 3) + 40}px` : '100%',
          flexShrink: 0
        }}
      >
        {/* Frame corners */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-4 border-l-4 rounded-tl-lg" style={{ borderColor: accentColor }} />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-4 border-r-4 rounded-tr-lg" style={{ borderColor: accentColor }} />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-4 border-l-4 rounded-bl-lg" style={{ borderColor: accentColor }} />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-4 border-r-4 rounded-br-lg" style={{ borderColor: accentColor }} />

        {/* Provider Title */}
        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-red-500 text-lg">♥</span>
            <h2
              className="font-black tracking-wider"
              style={{
                color: accentColor,
                fontSize: '22px',
                textShadow: '2px 2px 0 #000, -1px -1px 0 #000'
              }}
            >
              {title}
            </h2>
            <span className="text-red-500 text-lg">♦</span>
          </div>
        </div>

        {/* Game Grid */}
        <div className="flex gap-2 justify-center">
          {displayGames.map((game, index) => (
            <PokerGameCard
              key={`${game.name}-${index}`}
              game={game}
              rtp={game.rtp}
              cardSize={cardSize}
              accentColor={accentColor}
            />
          ))}
        </div>
      </div>

      {/* Trik Panel */}
      {trik.enabled && (
        <div className="flex-1 overflow-hidden min-w-0 h-full" style={{ minWidth: `${adjustedTrikWidth}px` }}>
          <PokerTrikPanel
            trik={trik}
            providerColor={providerColor}
            primaryColor={primaryColor}
            accentColor={accentColor}
            hideFiturGanda={hideFiturGanda}
          />
        </div>
      )}
    </div>
  );
}

export default function CustomizableLayout5({
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
  defaultLayoutSize,
  footerConfig
}: CustomizableLayout5Props) {
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
  const darkPrimary = adjustColor(primaryColor, -30);
  const darkerPrimary = adjustColor(primaryColor, -50);

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
      {/* Header 1 - Casino Royal Style */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4 relative"
        style={{
          height: '55px',
          background: 'linear-gradient(90deg, #1a1a2e, #16213e, #1a1a2e)',
          borderBottom: `3px solid ${accentColor}`
        }}
      >
        {/* Card suits decoration */}
        <div className="absolute left-4 flex items-center gap-1">
          <span className="text-red-500 text-2xl">♥</span>
          <span style={{ color: accentColor }} className="text-2xl">♠</span>
        </div>
        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight text-center`}
          style={{
            color: accentColor,
            textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000'
          }}
        >
          {customHeaderText}
        </h1>
        <div className="absolute right-4 flex items-center gap-1">
          <span className="text-red-500 text-2xl">♦</span>
          <span style={{ color: accentColor }} className="text-2xl">♣</span>
        </div>
      </div>

      {/* Header 2 - Logo, Time, Date */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4"
        style={{
          height: '45px',
          background: `linear-gradient(90deg, ${darkerPrimary}, ${darkPrimary}, ${darkerPrimary})`,
          borderBottom: `2px solid ${accentColor}80`
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span style={{ color: accentColor }}>♠</span>
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-9 object-contain"
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
              style={{ fontSize: '20px', textShadow: '1px 1px 0 #000', color: accentColor }}
            >
              {customTimeLabel}
            </span>
            <span style={{ color: `${accentColor}80` }}>|</span>
            <span
              className="font-medium"
              style={{ fontSize: '18px', textShadow: '1px 1px 0 #000', color: `${accentColor}cc` }}
            >
              {getCurrentDate()}
            </span>
          </div>
          {/* VIP Badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${adjustColor(accentColor, 20)})`,
              boxShadow: `0 2px 10px ${accentColor}80`
            }}
          >
            <span className="text-xs font-black text-black">♣ VIP ♠</span>
          </div>
        </div>
      </div>

      {/* Games Container */}
      <div className="flex-1 flex flex-col gap-3 p-2 overflow-hidden" style={{ minHeight: 0 }}>
        <PokerProviderSection
          title="PRAGMATIC PLAY"
          games={selectedPragmaticGames}
          providerColor={accentColor}
          primaryColor={primaryColor}
          accentColor={accentColor}
          trik={pragmaticTrik}
          trikPanelWidth={defaultLayoutSize.trikPanelWidth}
        />

        <PokerProviderSection
          title="PG SOFT"
          games={selectedPgSoftGames}
          providerColor={accentColor}
          primaryColor={primaryColor}
          accentColor={accentColor}
          trik={pgSoftTrik}
          trikPanelWidth={defaultLayoutSize.trikPanelWidth}
          hideFiturGanda={true}
        />
      </div>

      {/* Footer - Casino Style */}
      <div className="flex-shrink-0">
        <div
          className="flex items-center justify-center gap-3 px-4"
          style={{
            height: '40px',
            background: 'linear-gradient(90deg, #1a1a2e, #16213e, #1a1a2e)',
            borderTop: `3px solid ${accentColor}`
          }}
        >
          <CardSuits color={accentColor} size={18} />
          <svg width="20" height="20" viewBox="0 0 24 24" fill={accentColor}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span
            className="text-sm font-bold"
            style={{ textShadow: '1px 1px 0 #000', color: accentColor }}
          >
            {footerConfig.footer1 || `Join: @${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
          <CardSuits color={accentColor} size={18} />
        </div>
      </div>
    </div>
  );
}
