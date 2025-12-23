'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig, MaxwinConfig } from '@/types';

interface CustomizableLayout2Props {
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
  maxwinConfig?: MaxwinConfig;
}

// Game Card untuk layout 2 - ukuran lebih kecil untuk 3 game per provider
function GameCard({ game, rtp, style, cardSize }: { game: Game; rtp: number; style: RTPStyle; cardSize: number }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg"
      style={{
        backgroundColor: style.backgroundColor,
        border: `2px solid ${style.primaryColor}`,
        width: `${cardSize}px`,
        flexShrink: 0
      }}
    >
      {/* Game Image - tinggi +5px */}
      <div className="relative w-full overflow-hidden" style={{ height: `${cardSize + 5}px` }}>
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        {/* RTP Badge */}
        <div
          className="absolute top-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-bold"
          style={{
            backgroundColor: rtp >= 95 ? '#22c55e' : rtp >= 90 ? '#eab308' : '#ef4444',
            color: 'white',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          {rtp}%
        </div>
      </div>

      {/* Game Name */}
      <div
        className="p-1 text-center"
        style={{
          background: `linear-gradient(to bottom, ${style.backgroundColor}ee, ${style.backgroundColor})`
        }}
      >
        <h3
          className="text-white font-bold text-[11px] leading-tight"
          style={{
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

// Pattern Display - Centang (V) dan Silang (X)
function PatternDisplay({ pattern, size }: { pattern: string; size: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {pattern.split('').map((char, index) => (
        <span key={index}>
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

// Compact Trik Panel untuk Layout 2
function CompactTrikPanel({
  trik,
  providerColor,
  cardStyle,
  hideFiturGanda = false
}: {
  trik: TrikConfig;
  providerColor: string;
  cardStyle: CardStyleOption;
  hideFiturGanda?: boolean;
}) {
  const itemCount = trik.trikItems?.length || 0;
  const totalRows = itemCount + 3;

  // Font sizes untuk compact panel - DIPERBESAR +5px
  const getFontSize = () => {
    if (totalRows <= 4) return { title: 23, label: 16, depositKode: 31, value: 19, itemName: 19, itemValue: 23, icon: 23, gap: 5, padding: 6 };
    if (totalRows <= 5) return { title: 21, label: 15, depositKode: 27, value: 17, itemName: 17, itemValue: 21, icon: 21, gap: 4, padding: 5 };
    if (totalRows <= 6) return { title: 19, label: 14, depositKode: 23, value: 16, itemName: 16, itemValue: 19, icon: 19, gap: 3, padding: 4 };
    return { title: 17, label: 13, depositKode: 21, value: 15, itemName: 15, itemValue: 17, icon: 17, gap: 2, padding: 3 };
  };

  const sizes = getFontSize();

  return (
    <div
      className="h-full rounded-xl overflow-hidden flex flex-col"
      style={{
        background: cardStyle?.background || 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,40,0.95) 100%)',
        border: `2px solid ${providerColor}`,
        boxShadow: `0 0 15px ${providerColor}30, inset 0 0 20px rgba(0,0,0,0.5)`
      }}
    >
      {/* Header */}
      <div
        className="text-center flex-shrink-0"
        style={{
          padding: `${sizes.padding}px`,
          background: `linear-gradient(90deg, transparent, ${providerColor}30, transparent)`,
          borderBottom: `1px solid ${providerColor}50`
        }}
      >
        <h3
          className="font-black uppercase tracking-wider"
          style={{
            color: providerColor,
            fontSize: `${sizes.title}px`,
            textShadow: `0 0 10px ${providerColor}, 0 0 20px ${providerColor}50`
          }}
        >
          {trik.title || 'TRIK GACOR'}
        </h3>
      </div>

      {/* Content - tidak pakai justify-between agar tidak spread */}
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{ padding: `${sizes.padding}px`, gap: `${sizes.gap}px` }}
      >
        {/* Deposit Kode & Putaran Bet - 1 Row */}
        <div
          className="flex items-center gap-2 rounded-lg"
          style={{ background: 'rgba(0,0,0,0.5)', padding: `${sizes.padding}px` }}
        >
          <div className="flex-1 text-center">
            <span className="text-gray-400 block leading-tight" style={{ fontSize: `${sizes.label}px` }}>
              DEPOSIT KODE
            </span>
            <span
              className="font-black leading-tight"
              style={{
                color: providerColor,
                fontSize: `${sizes.depositKode}px`,
                textShadow: `0 0 10px ${providerColor}`
              }}
            >
              {trik.depositKode}
            </span>
          </div>
          <div className="text-gray-600 text-xl">|</div>
          <div className="flex-1 text-center">
            <span className="text-gray-400 block leading-tight" style={{ fontSize: `${sizes.label}px` }}>
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
            className="rounded-lg text-center"
            style={{ background: 'rgba(0,0,0,0.5)', padding: `${sizes.padding}px` }}
          >
            <span className="text-gray-400 block leading-tight" style={{ fontSize: `${sizes.label}px` }}>
              FITUR GANDA
            </span>
            <span
              className={`font-bold px-2 py-0.5 rounded-full inline-block ${
                trik.fiturGanda ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
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
              className="flex items-center rounded"
              style={{ background: 'rgba(0,0,0,0.5)', padding: `${sizes.padding}px ${sizes.padding * 1.5}px` }}
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
            className="text-center rounded-lg"
            style={{
              background: `linear-gradient(90deg, transparent, ${providerColor}20, transparent)`,
              border: `1px solid ${providerColor}30`,
              padding: `${sizes.padding}px`
            }}
          >
            <p
              className="font-bold uppercase leading-tight"
              style={{
                color: providerColor,
                textShadow: `0 0 5px ${providerColor}50`,
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

// Game Modal - Container untuk 3 game
function GameModal({
  title,
  games,
  providerColor,
  style,
  cardStyle,
  cardSize
}: {
  title: string;
  games: Game[];
  providerColor: string;
  style: RTPStyle;
  cardStyle: CardStyleOption;
  cardSize: number;
}) {
  const displayGames = games.slice(0, 3).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  return (
    <div
      className="flex-1 rounded-lg overflow-hidden p-2"
      style={{
        background: cardStyle?.background || `${style.backgroundColor}dd`,
        border: cardStyle?.border ? `${cardStyle.border} ${providerColor}` : `2px solid ${providerColor}40`
      }}
    >
      {/* Provider Title */}
      <div className="text-center mb-2">
        <h2
          className="font-bold"
          style={{
            color: providerColor,
            fontSize: '18px',
            textShadow: `0 0 15px ${providerColor}80`
          }}
        >
          {title}
        </h2>
      </div>

      {/* 3 Game Grid */}
      <div className="flex gap-2 justify-center">
        {displayGames.map((game, index) => (
          <GameCard
            key={`${game.name}-${index}`}
            game={game}
            rtp={game.rtp}
            style={style}
            cardSize={cardSize}
          />
        ))}
      </div>
    </div>
  );
}

export default function CustomizableLayout2({
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
  footerConfig,
  maxwinConfig
}: CustomizableLayout2Props) {
  const getFontSizeClass = () => {
    switch (headerFontSize) {
      case 'small': return 'text-lg';
      case 'medium': return 'text-xl';
      case 'large': return 'text-2xl';
      case 'xlarge': return 'text-3xl';
    }
  };

  // Card size untuk 3 game per side (total 6 games dalam 1 row)
  const cardSize = 140;

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
      {/* Header 1 - Logo + Title (Height: 60px) */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-6"
        style={{
          height: '60px',
          background: `linear-gradient(135deg, ${selectedStyle.primaryColor}40 0%, ${selectedStyle.backgroundColor}80 50%, ${selectedStyle.secondaryColor}40 100%)`,
          borderBottom: `2px solid ${selectedStyle.primaryColor}60`
        }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-10 object-contain"
            style={{
              filter: `drop-shadow(0 0 8px ${selectedStyle.primaryColor}60)`
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Title */}
        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight text-center flex-1`}
          style={{
            color: selectedStyle.primaryColor,
            textShadow: `0 0 20px ${selectedStyle.primaryColor}, 0 0 40px ${selectedStyle.primaryColor}50, 0 2px 4px rgba(0,0,0,0.8)`
          }}
        >
          {customHeaderText}
        </h1>

        {/* Spacer for balance */}
        <div className="w-24"></div>
      </div>

      {/* Header 2 - Time & Date (Height: 40px) */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4"
        style={{
          height: '40px',
          background: `linear-gradient(90deg, ${selectedStyle.backgroundColor}90 0%, ${selectedStyle.primaryColor}20 50%, ${selectedStyle.backgroundColor}90 100%)`,
          borderBottom: `1px solid ${selectedStyle.primaryColor}40`
        }}
      >
        <div className="flex items-center gap-4">
          <span
            className="font-bold text-white"
            style={{
              fontSize: '20px',
              textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
            }}
          >
            {customTimeLabel}
          </span>
          <span className="text-gray-400 text-xl">|</span>
          <span
            className="text-white font-medium"
            style={{
              fontSize: '18px',
              textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
            }}
          >
            {getCurrentDate()}
          </span>
          {/* Live Indicator */}
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-full ml-2"
            style={{
              background: `linear-gradient(135deg, #22c55e40, #16a34a40)`,
              border: '1px solid #22c55e60'
            }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#22c55e' }} />
            <span className="text-xs font-bold text-green-400">LIVE</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-3 p-3 overflow-hidden" style={{ minHeight: 0 }}>
        {/* Row 1: Game Modals - Pragmatic | PG Soft */}
        <div className="flex gap-3" style={{ height: '240px' }}>
          <GameModal
            title="PRAGMATIC PLAY"
            games={selectedPragmaticGames}
            providerColor="#ffd700"
            style={selectedStyle}
            cardStyle={selectedCardStyle}
            cardSize={cardSize}
          />
          <GameModal
            title="PG SOFT"
            games={selectedPgSoftGames}
            providerColor="#00f0ff"
            style={selectedStyle}
            cardStyle={selectedCardStyle}
            cardSize={cardSize}
          />
        </div>

        {/* Row 2: Trik Gacor Panels - Pragmatic | PG Soft (shrink-to-fit, same height) */}
        <div className="flex gap-3 items-stretch">
          {pragmaticTrik.enabled && (
            <div className="flex-1">
              <CompactTrikPanel
                trik={pragmaticTrik}
                providerColor="#ffd700"
                cardStyle={selectedCardStyle}
                hideFiturGanda={false}
              />
            </div>
          )}
          {pgSoftTrik.enabled && (
            <div className="flex-1">
              <CompactTrikPanel
                trik={pgSoftTrik}
                providerColor="#00f0ff"
                cardStyle={selectedCardStyle}
                hideFiturGanda={true}
              />
            </div>
          )}
        </div>

        {/* Row 3: Maxwin Info Full Width */}
        {maxwinConfig?.enabled && (
          <div
            className="rounded-xl p-3"
            style={{
              background: selectedCardStyle?.background || 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,40,0.95) 100%)',
              border: `2px solid ${selectedStyle.secondaryColor}`,
              boxShadow: `0 0 15px ${selectedStyle.secondaryColor}30`
            }}
          >
            {/* Heading 1 */}
            <div
              className="text-center mb-2 p-2 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${selectedStyle.primaryColor}20, ${selectedStyle.secondaryColor}20)`,
                border: `1px solid ${selectedStyle.secondaryColor}`,
                boxShadow: `0 0 8px ${selectedStyle.secondaryColor}20`
              }}
            >
              <h2
                className="text-xl font-black uppercase tracking-tight leading-tight"
                style={{
                  background: `linear-gradient(to bottom, ${selectedStyle.secondaryColor} 0%, ${selectedStyle.primaryColor} 50%, ${selectedStyle.primaryColor}aa 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {maxwinConfig.heading1 || 'KODE MAXWIN GACOR MALAM INI'}
              </h2>
            </div>

            {/* Heading 2 */}
            {maxwinConfig.heading2 && (
              <div className="text-center mb-2">
                <h3
                  className="text-base font-bold uppercase tracking-tight leading-tight"
                  style={{ color: selectedStyle.secondaryColor }}
                >
                  {maxwinConfig.heading2}
                </h3>
              </div>
            )}

            {/* Text Items - Horizontal Grid */}
            {maxwinConfig.textItems && maxwinConfig.textItems.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {maxwinConfig.textItems.map((text, index) => (
                  text && (
                    <div
                      key={index}
                      className="p-2 rounded-lg text-center"
                      style={{
                        background: 'rgba(0,0,0,0.5)',
                        border: `1px solid ${selectedStyle.secondaryColor}50`,
                        boxShadow: `0 0 4px ${selectedStyle.secondaryColor}20`
                      }}
                    >
                      <p className="text-white font-semibold text-sm leading-tight">{text}</p>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer - Telegram (Height: 40px) */}
      <div className="flex-shrink-0">
        <div
          className="flex items-center justify-center gap-2 px-4"
          style={{
            height: '40px',
            background: `linear-gradient(90deg, ${selectedStyle.primaryColor}30 0%, ${selectedStyle.backgroundColor}80 50%, ${selectedStyle.primaryColor}30 100%)`,
            borderTop: `1px solid ${selectedStyle.primaryColor}40`
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={selectedStyle.primaryColor}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span
            className="text-base font-bold"
            style={{ color: selectedStyle.primaryColor }}
          >
            {footerConfig.footer1 || `Join Telegram: @${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
        </div>
      </div>
    </div>
  );
}
