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

// Slot symbols
const SlotSymbols = () => (
  <div className="flex items-center gap-1 text-lg">
    <span>🍒</span>
    <span>7️⃣</span>
    <span>💎</span>
    <span>🍀</span>
  </div>
);

// Vegas Neon Text
function NeonText({ children, color = '#ff00ff' }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      style={{
        color: color,
        textShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`
      }}
    >
      {children}
    </span>
  );
}

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
function VegasGameCard({ game, rtp, cardSize }: { game: Game; rtp: number; cardSize: number }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: `${cardSize}px`,
        flexShrink: 0,
        background: 'linear-gradient(180deg, #2a0845 0%, #1a0530 50%, #0d0118 100%)',
        borderRadius: '16px',
        border: '3px solid transparent',
        borderImage: 'linear-gradient(180deg, #ff00ff, #00ffff, #ff00ff) 1',
        boxShadow: '0 0 20px rgba(255,0,255,0.4), 0 0 40px rgba(0,255,255,0.2), inset 0 0 30px rgba(0,0,0,0.5)'
      }}
    >
      {/* Neon corner lights */}
      <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-pink-500" style={{ boxShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff' }} />
      <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff' }} />
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
            background: 'linear-gradient(180deg, rgba(255,0,255,0.1) 0%, transparent 20%, transparent 80%, rgba(0,255,255,0.1) 100%)'
          }}
        />
      </div>

      {/* Game Name */}
      <div
        className="p-2 text-center"
        style={{
          background: 'linear-gradient(to bottom, rgba(42,8,69,0.95), rgba(13,1,24,1))'
        }}
      >
        <h3
          className="text-[13px] font-bold leading-tight"
          style={{
            color: '#ff00ff',
            textShadow: '0 0 5px #ff00ff, 0 0 10px #ff00ff50',
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
  providerName,
  hideFiturGanda = false
}: {
  trik: TrikConfig;
  providerColor: string;
  providerName: string;
  hideFiturGanda?: boolean;
}) {
  const itemCount = trik.trikItems?.length || 0;
  const totalRows = itemCount + 4;

  const getFontSize = () => {
    if (totalRows <= 5) return { title: 24, label: 14, depositKode: 36, value: 20, itemName: 20, itemValue: 26, icon: 26, gap: 8, padding: 10 };
    if (totalRows <= 6) return { title: 22, label: 13, depositKode: 32, value: 18, itemName: 18, itemValue: 24, icon: 24, gap: 7, padding: 9 };
    if (totalRows <= 7) return { title: 20, label: 12, depositKode: 28, value: 16, itemName: 16, itemValue: 22, icon: 22, gap: 6, padding: 8 };
    return { title: 18, label: 11, depositKode: 24, value: 14, itemName: 14, itemValue: 20, icon: 20, gap: 5, padding: 7 };
  };

  const sizes = getFontSize();

  return (
    <div
      className="h-full overflow-hidden flex flex-col relative"
      style={{
        background: 'linear-gradient(135deg, #2a0845 0%, #1a0530 50%, #0d0118 100%)',
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
        <div className="text-[12px] text-gray-400 mt-1">{providerName}</div>
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
                color: '#ffff00',
                fontSize: `${sizes.depositKode}px`,
                textShadow: '0 0 10px #ffff00'
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
              style={{ color: '#00ffff', fontSize: `${sizes.value}px`, textShadow: '0 0 5px #00ffff' }}
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
                style={{ color: '#ffff00', fontSize: `${sizes.itemValue}px`, textShadow: '0 0 5px #ffff0050' }}
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
          background: 'linear-gradient(90deg, #0d0118, #2a0845, #0d0118)',
          borderBottom: '3px solid #ff00ff'
        }}
      >
        {/* Neon light decorations */}
        <div className="absolute left-4">
          <SlotSymbols />
        </div>
        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight text-center`}
          style={{
            color: '#ff00ff',
            textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 80px #ff00ff'
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
          background: 'linear-gradient(90deg, #1a0530, #2a0845, #1a0530)',
          borderBottom: '2px solid #00ffff50'
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🎰</span>
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-9 object-contain"
            style={{ filter: 'drop-shadow(0 0 5px #ff00ff)' }}
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
              style={{ fontSize: '20px', color: '#00ffff', textShadow: '0 0 10px #00ffff' }}
            >
              {customTimeLabel}
            </span>
            <span style={{ color: '#ff00ff' }}>|</span>
            <span
              className="font-medium"
              style={{ fontSize: '18px', color: '#ff00ff', textShadow: '0 0 5px #ff00ff50' }}
            >
              {getCurrentDate()}
            </span>
          </div>
          {/* Jackpot indicator */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #ff00ff, #ff66ff)',
              boxShadow: '0 0 15px #ff00ff'
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
              background: 'linear-gradient(135deg, #2a0845 0%, #1a0530 100%)',
              borderRadius: '20px',
              border: '3px solid #ff00ff',
              boxShadow: '0 0 30px rgba(255,0,255,0.3), inset 0 0 40px rgba(0,0,0,0.5)'
            }}
          >
            {/* Neon corner dots */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-pink-500" style={{ boxShadow: '0 0 10px #ff00ff' }} />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 10px #00ffff' }} />

            <div className="text-center mb-2">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: '#ff00ff',
                  fontSize: '20px',
                  textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff'
                }}
              >
                🎰 PRAGMATIC PLAY 🎰
              </h2>
            </div>
            <div className="flex gap-2 justify-center">
              {pragmaticGamesWithRtp.map((game, index) => (
                <VegasGameCard key={`pragmatic-${index}`} game={game} rtp={game.rtp} cardSize={cardSize} />
              ))}
            </div>
          </div>

          {/* PG Soft Games */}
          <div
            className="flex-1 overflow-hidden p-3 relative"
            style={{
              background: 'linear-gradient(135deg, #0d4d4d 0%, #0a3333 100%)',
              borderRadius: '20px',
              border: '3px solid #00ffff',
              boxShadow: '0 0 30px rgba(0,255,255,0.3), inset 0 0 40px rgba(0,0,0,0.5)'
            }}
          >
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 10px #00ffff' }} />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-500" style={{ boxShadow: '0 0 10px #ff00ff' }} />

            <div className="text-center mb-2">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: '#00ffff',
                  fontSize: '20px',
                  textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff'
                }}
              >
                🎰 PG SOFT 🎰
              </h2>
            </div>
            <div className="flex gap-2 justify-center">
              {pgSoftGamesWithRtp.map((game, index) => (
                <VegasGameCard key={`pgsoft-${index}`} game={game} rtp={game.rtp} cardSize={cardSize} />
              ))}
            </div>
          </div>
        </div>

        {/* Trik Panel Row */}
        {(pragmaticTrik.enabled || pgSoftTrik.enabled) && (
          <div className="flex gap-3 items-stretch" style={{ height: '320px' }}>
            {pragmaticTrik.enabled && (
              <div className="flex-1">
                <VegasTrikPanel
                  trik={pragmaticTrik}
                  providerColor="#ff00ff"
                  providerName="PRAGMATIC PLAY"
                />
              </div>
            )}
            {pgSoftTrik.enabled && (
              <div className="flex-1">
                <VegasTrikPanel
                  trik={pgSoftTrik}
                  providerColor="#00ffff"
                  providerName="PG SOFT"
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
              background: 'linear-gradient(135deg, #2a0845 0%, #1a0530 100%)',
              borderRadius: '16px',
              border: '2px solid #ffff00',
              boxShadow: '0 0 20px rgba(255,255,0,0.3)'
            }}
          >
            <div className="text-center mb-2">
              <h3
                className="font-black uppercase"
                style={{
                  color: '#ffff00',
                  fontSize: '20px',
                  textShadow: '0 0 10px #ffff00, 0 0 20px #ffff00'
                }}
              >
                🏆 {maxwinConfig.heading1 || 'MAXWIN INFO'} 🏆
              </h3>
              {maxwinConfig.heading2 && (
                <p className="text-sm text-yellow-300" style={{ textShadow: '0 0 5px #ffff0050' }}>
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
                      background: 'rgba(255,255,0,0.1)',
                      border: '1px solid #ffff0050'
                    }}
                  >
                    <span
                      className="font-bold text-sm"
                      style={{ color: '#ffff00', textShadow: '0 0 5px #ffff0050' }}
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
            background: 'linear-gradient(90deg, #0d0118, #2a0845, #0d0118)',
            borderTop: '3px solid #ff00ff'
          }}
        >
          <SlotSymbols />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#00ffff" style={{ filter: 'drop-shadow(0 0 5px #00ffff)' }}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span
            className="text-sm font-bold"
            style={{ color: '#00ffff', textShadow: '0 0 5px #00ffff' }}
          >
            {footerConfig.footer1 || `Join: @${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
          <SlotSymbols />
        </div>
      </div>
    </div>
  );
}
