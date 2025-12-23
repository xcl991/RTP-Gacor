'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig } from '@/types';

interface CustomizableLayout3Props {
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

// Neon Game Card dengan glow effect
function NeonGameCard({ game, rtp, style, cardSize }: { game: Game; rtp: number; style: RTPStyle; cardSize: number }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: `${cardSize}px`,
        flexShrink: 0,
        background: 'linear-gradient(145deg, rgba(0,0,0,0.9), rgba(20,20,30,0.95))',
        border: `3px solid transparent`,
        borderImage: `linear-gradient(135deg, ${style.primaryColor}, ${style.secondaryColor}, ${style.primaryColor}) 1`,
        boxShadow: `0 0 20px ${style.primaryColor}40, inset 0 0 30px rgba(0,0,0,0.5)`
      }}
    >
      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: style.secondaryColor }} />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: style.secondaryColor }} />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: style.secondaryColor }} />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: style.secondaryColor }} />

      {/* Game Image */}
      <div className="relative w-full overflow-hidden" style={{ height: `${cardSize}px` }}>
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        {/* RTP Badge with glow */}
        <div
          className="absolute top-1 right-1 px-2 py-0.5 text-[10px] font-bold"
          style={{
            backgroundColor: rtp >= 95 ? '#22c55e' : rtp >= 90 ? '#eab308' : '#ef4444',
            color: 'white',
            boxShadow: `0 0 10px ${rtp >= 95 ? '#22c55e' : rtp >= 90 ? '#eab308' : '#ef4444'}`,
            clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
          }}
        >
          {rtp}%
        </div>
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
          }}
        />
      </div>

      {/* Game Name with neon text */}
      <div
        className="p-1.5 text-center"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(10,10,20,0.95))`
        }}
      >
        <h3
          className="text-[10px] font-bold leading-tight"
          style={{
            color: style.secondaryColor,
            textShadow: `0 0 5px ${style.secondaryColor}, 0 0 10px ${style.secondaryColor}50`,
            overflow: 'hidden',
            height: '22px',
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

// Pattern Display - Centang (V) dan Silang (X) dengan glow
function PatternDisplay({ pattern, size }: { pattern: string; size: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {pattern.split('').map((char, index) => (
        <span key={index} style={{ filter: `drop-shadow(0 0 3px ${char === 'V' ? '#4ade80' : '#f87171'})` }}>
          {char === 'V' ? (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}

// Cyberpunk Trik Panel dengan holographic effect
function CyberpunkTrikPanel({
  trik,
  providerColor,
  hideFiturGanda = false
}: {
  trik: TrikConfig;
  providerColor: string;
  hideFiturGanda?: boolean;
}) {
  const itemCount = trik.trikItems?.length || 0;
  const totalRows = itemCount + 4;

  const getFontSize = () => {
    if (totalRows <= 5) return { title: 24, label: 14, depositKode: 36, value: 20, itemName: 20, itemValue: 25, icon: 26, gap: 8, padding: 10 };
    if (totalRows <= 6) return { title: 22, label: 13, depositKode: 32, value: 18, itemName: 18, itemValue: 23, icon: 24, gap: 7, padding: 8 };
    if (totalRows <= 7) return { title: 20, label: 12, depositKode: 28, value: 16, itemName: 16, itemValue: 21, icon: 22, gap: 6, padding: 7 };
    if (totalRows <= 8) return { title: 18, label: 11, depositKode: 24, value: 14, itemName: 14, itemValue: 19, icon: 20, gap: 5, padding: 6 };
    return { title: 16, label: 10, depositKode: 20, value: 12, itemName: 12, itemValue: 17, icon: 18, gap: 4, padding: 5 };
  };

  const sizes = getFontSize();

  return (
    <div
      className="h-full overflow-hidden flex flex-col relative"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(10,10,30,0.98) 100%)',
        border: `2px solid ${providerColor}`,
        boxShadow: `0 0 30px ${providerColor}30, inset 0 0 50px rgba(0,0,0,0.8)`,
        clipPath: 'polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))'
      }}
    >
      {/* Holographic top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${providerColor}, transparent)`
        }}
      />

      {/* Header */}
      <div
        className="text-center flex-shrink-0 relative"
        style={{
          padding: `${sizes.padding + 4}px ${sizes.padding * 2}px ${sizes.padding}px`,
          background: `linear-gradient(180deg, ${providerColor}20, transparent)`
        }}
      >
        <h3
          className="font-black uppercase tracking-widest"
          style={{
            color: providerColor,
            fontSize: `${sizes.title}px`,
            textShadow: `0 0 10px ${providerColor}, 0 0 20px ${providerColor}, 0 0 40px ${providerColor}50`,
            letterSpacing: '0.2em'
          }}
        >
          {trik.title || 'TRIK GACOR'}
        </h3>
        {/* Underline accent */}
        <div
          className="mx-auto mt-1"
          style={{
            width: '60%',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${providerColor}, transparent)`
          }}
        />
      </div>

      {/* Content */}
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{ padding: `${sizes.padding}px`, gap: `${sizes.gap}px` }}
      >
        {/* Deposit Kode & Putaran Bet */}
        <div
          className="flex items-center gap-3"
          style={{
            background: `linear-gradient(90deg, ${providerColor}10, ${providerColor}20, ${providerColor}10)`,
            padding: `${sizes.padding}px`,
            border: `1px solid ${providerColor}40`,
            clipPath: 'polygon(5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px), 0 5px)'
          }}
        >
          <div className="flex-1 text-center">
            <span className="text-gray-500 block leading-tight" style={{ fontSize: `${sizes.label}px` }}>
              DEPOSIT KODE
            </span>
            <span
              className="font-black leading-tight"
              style={{
                color: providerColor,
                fontSize: `${sizes.depositKode}px`,
                textShadow: `0 0 15px ${providerColor}`
              }}
            >
              {trik.depositKode}
            </span>
          </div>
          <div style={{ width: '2px', height: '40px', background: `linear-gradient(180deg, transparent, ${providerColor}, transparent)` }} />
          <div className="flex-1 text-center">
            <span className="text-gray-500 block leading-tight" style={{ fontSize: `${sizes.label}px` }}>
              PUTARAN BET
            </span>
            <span className="font-bold leading-tight" style={{ color: providerColor, fontSize: `${sizes.value}px` }}>
              {trik.putaranBetMin.toLocaleString()} - {trik.putaranBetMax.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Fitur Ganda */}
        {!hideFiturGanda && (
          <div
            className="text-center"
            style={{
              background: `linear-gradient(90deg, transparent, ${providerColor}15, transparent)`,
              padding: `${sizes.padding}px`,
              border: `1px solid ${providerColor}30`
            }}
          >
            <span className="text-gray-500 block leading-tight" style={{ fontSize: `${sizes.label}px` }}>
              FITUR GANDA
            </span>
            <span
              className={`font-bold px-3 py-1 inline-block ${
                trik.fiturGanda ? 'text-green-400' : 'text-red-400'
              }`}
              style={{
                fontSize: `${sizes.value}px`,
                textShadow: trik.fiturGanda ? '0 0 10px #4ade80' : '0 0 10px #f87171'
              }}
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
                background: `linear-gradient(90deg, ${providerColor}08, ${providerColor}15, ${providerColor}08)`,
                padding: `${sizes.padding}px ${sizes.padding * 1.5}px`,
                borderLeft: `3px solid ${providerColor}`,
                borderRight: `3px solid ${providerColor}`
              }}
            >
              <span className="text-white font-semibold flex-1 text-left" style={{ fontSize: `${sizes.itemName}px` }}>
                {item.name}
              </span>
              <span className="font-bold flex-1 text-center" style={{ color: providerColor, fontSize: `${sizes.itemValue}px` }}>
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
              background: `linear-gradient(135deg, ${providerColor}10, ${providerColor}20)`,
              border: `1px solid ${providerColor}50`,
              padding: `${sizes.padding}px`,
              clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0 50%)'
            }}
          >
            <p
              className="font-bold uppercase leading-tight"
              style={{
                color: providerColor,
                textShadow: `0 0 10px ${providerColor}80`,
                fontSize: `${sizes.value}px`
              }}
            >
              {trik.customText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Neon Provider Section
function NeonProviderSection({
  title,
  games,
  providerColor,
  style,
  trik,
  trikPanelWidth,
  hideFiturGanda = false
}: {
  title: string;
  games: Game[];
  providerColor: string;
  style: RTPStyle;
  trik: TrikConfig;
  trikPanelWidth: number;
  hideFiturGanda?: boolean;
}) {
  const displayGames = games.slice(0, 3).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  // Trik panel 100px lebih kecil, provider modal lebih besar
  const adjustedTrikWidth = trikPanelWidth - 100;
  const baseAvailableWidth = trik.enabled ? (980 - adjustedTrikWidth - 16) : 980;
  const baseCardSize = Math.floor(baseAvailableWidth / 3.2);
  const cardSize = Math.floor(baseCardSize * 0.9);

  return (
    <div className="flex-1 flex gap-3 overflow-hidden items-center" style={{ minHeight: 0 }}>
      {/* Games Grid - Neon Frame */}
      <div
        className="overflow-hidden p-3 self-center relative"
        style={{
          background: 'linear-gradient(145deg, rgba(0,0,0,0.95), rgba(15,15,25,0.98))',
          border: `2px solid ${providerColor}`,
          boxShadow: `0 0 25px ${providerColor}40, inset 0 0 40px rgba(0,0,0,0.8)`,
          width: trik.enabled ? `${(cardSize * 3) + 32}px` : '100%',
          flexShrink: 0
        }}
      >
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: providerColor }} />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: providerColor }} />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: providerColor }} />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: providerColor }} />

        {/* Provider Title */}
        <div className="text-center mb-2">
          <h2
            className="font-black tracking-wider"
            style={{
              color: providerColor,
              fontSize: '18px',
              textShadow: `0 0 10px ${providerColor}, 0 0 20px ${providerColor}, 0 0 30px ${providerColor}50`
            }}
          >
            {title}
          </h2>
        </div>

        {/* Game Grid */}
        <div className="flex gap-2 justify-center">
          {displayGames.map((game, index) => (
            <NeonGameCard
              key={`${game.name}-${index}`}
              game={game}
              rtp={game.rtp}
              style={style}
              cardSize={cardSize}
            />
          ))}
        </div>
      </div>

      {/* Trik Panel */}
      {trik.enabled && (
        <div className="flex-1 overflow-hidden min-w-0 h-full" style={{ minWidth: `${adjustedTrikWidth}px` }}>
          <CyberpunkTrikPanel
            trik={trik}
            providerColor={providerColor}
            hideFiturGanda={hideFiturGanda}
          />
        </div>
      )}
    </div>
  );
}

export default function CustomizableLayout3({
  selectedWebsite,
  selectedStyle,
  customTimeLabel,
  selectedPragmaticGames,
  selectedPgSoftGames,
  getCurrentDate,
  selectedCardStyle,
  pragmaticTrik,
  pgSoftTrik,
  telegramUsername,
  customHeaderText,
  headerFontSize,
  defaultLayoutSize,
  footerConfig
}: CustomizableLayout3Props) {
  const getFontSizeClass = () => {
    switch (headerFontSize) {
      case 'small': return 'text-lg';
      case 'medium': return 'text-xl';
      case 'large': return 'text-2xl';
      case 'xlarge': return 'text-3xl';
    }
  };

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
      {/* Header 1 - Cyberpunk Style */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4 relative"
        style={{
          height: '50px',
          background: `linear-gradient(90deg, transparent, ${selectedStyle.primaryColor}30, ${selectedStyle.secondaryColor}30, transparent)`,
          borderBottom: `2px solid ${selectedStyle.primaryColor}`
        }}
      >
        {/* Animated scan line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${selectedStyle.primaryColor} 50%, transparent 100%)`
          }}
        />
        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-widest leading-tight text-center`}
          style={{
            color: selectedStyle.primaryColor,
            textShadow: `0 0 10px ${selectedStyle.primaryColor}, 0 0 20px ${selectedStyle.primaryColor}, 0 0 40px ${selectedStyle.primaryColor}50`
          }}
        >
          {customHeaderText}
        </h1>
      </div>

      {/* Header 2 - Logo, Time, Date */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4"
        style={{
          height: '45px',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.8), rgba(20,20,40,0.9), rgba(0,0,0,0.8))',
          borderBottom: `1px solid ${selectedStyle.primaryColor}40`
        }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-9 object-contain"
            style={{
              filter: `drop-shadow(0 0 10px ${selectedStyle.primaryColor})`
            }}
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
              style={{
                fontSize: '21px',
                color: selectedStyle.secondaryColor,
                textShadow: `0 0 10px ${selectedStyle.secondaryColor}`
              }}
            >
              {customTimeLabel}
            </span>
            <span style={{ color: selectedStyle.primaryColor }}>|</span>
            <span
              className="font-medium"
              style={{
                fontSize: '19px',
                color: selectedStyle.secondaryColor,
                textShadow: `0 0 5px ${selectedStyle.secondaryColor}50`
              }}
            >
              {getCurrentDate()}
            </span>
          </div>
          {/* Live Indicator with pulse */}
          <div
            className="flex items-center gap-1.5 px-3 py-1"
            style={{
              background: 'rgba(0,255,0,0.1)',
              border: '1px solid #22c55e',
              boxShadow: '0 0 10px #22c55e40',
              clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)'
            }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
            <span className="text-xs font-bold text-green-400">LIVE</span>
          </div>
        </div>
      </div>

      {/* Games Container */}
      <div className="flex-1 flex flex-col gap-3 p-2 overflow-hidden" style={{ minHeight: 0 }}>
        <NeonProviderSection
          title="PRAGMATIC PLAY"
          games={selectedPragmaticGames}
          providerColor="#ffd700"
          style={selectedStyle}
          trik={pragmaticTrik}
          trikPanelWidth={defaultLayoutSize.trikPanelWidth}
        />

        <NeonProviderSection
          title="PG SOFT"
          games={selectedPgSoftGames}
          providerColor="#00f0ff"
          style={selectedStyle}
          trik={pgSoftTrik}
          trikPanelWidth={defaultLayoutSize.trikPanelWidth}
          hideFiturGanda={true}
        />
      </div>

      {/* Footer - Cyberpunk Style */}
      <div className="flex-shrink-0">
        <div
          className="flex items-center justify-center gap-3 px-4"
          style={{
            height: '35px',
            background: `linear-gradient(90deg, transparent, ${selectedStyle.primaryColor}20, transparent)`,
            borderTop: `1px solid ${selectedStyle.primaryColor}`
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={selectedStyle.primaryColor} style={{ filter: `drop-shadow(0 0 5px ${selectedStyle.primaryColor})` }}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span
            className="text-sm font-bold"
            style={{
              color: selectedStyle.primaryColor,
              textShadow: `0 0 5px ${selectedStyle.primaryColor}`
            }}
          >
            {footerConfig.footer1 || `Join Telegram: @${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
        </div>
      </div>
    </div>
  );
}
