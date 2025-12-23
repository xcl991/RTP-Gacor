'use client';

import TrikPanel from '../TrikPanel';
import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig } from '@/types';

interface CustomizableLayoutProps {
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

// Custom Game Card untuk layout 3x1 - Dikecilkan 10%
function GameCard3x1({ game, rtp, style, cardSize }: { game: Game; rtp: number; style: RTPStyle; cardSize: number }) {
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
        className="p-1.5 text-center"
        style={{
          background: `linear-gradient(to bottom, ${style.backgroundColor}ee, ${style.backgroundColor})`
        }}
      >
        <h3
          className="text-white font-bold text-[10px] leading-tight"
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

// Adaptive Trik Panel - Font mengecil jika item banyak, items per row
function AdaptiveTrikPanel({
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
  // Hitung total rows untuk menentukan font size
  const itemCount = trik.trikItems?.length || 0;
  const hasDepositKode = !!trik.depositKode;
  const hasPutaranBet = trik.putaranBetMin > 0 || trik.putaranBetMax > 0;
  const hasCustomText = !!trik.customText;
  const totalRows = itemCount + (hasDepositKode ? 1 : 0) + (hasPutaranBet ? 1 : 0) + (hasCustomText ? 1 : 0) + 2;

  // Adaptive font sizes berdasarkan jumlah rows
  const getFontSize = () => {
    if (totalRows <= 5) return { title: '13px', item: '11px', label: '9px', value: '18px' };
    if (totalRows <= 6) return { title: '12px', item: '10px', label: '8px', value: '16px' };
    if (totalRows <= 7) return { title: '11px', item: '9px', label: '7px', value: '14px' };
    if (totalRows <= 8) return { title: '10px', item: '8px', label: '7px', value: '12px' };
    return { title: '9px', item: '7px', label: '6px', value: '11px' };
  };

  const fontSize = getFontSize();

  return (
    <div
      className="h-full rounded-lg overflow-hidden p-2 flex flex-col"
      style={{
        background: cardStyle?.background || `rgba(0,0,0,0.7)`,
        border: `1px solid ${providerColor}50`,
      }}
    >
      {/* Title */}
      <div
        className="text-center font-bold mb-1 flex-shrink-0 py-1"
        style={{
          color: providerColor,
          fontSize: fontSize.title,
          textShadow: `0 0 10px ${providerColor}80`,
          borderBottom: `1px solid ${providerColor}30`
        }}
      >
        {trik.title || 'TRIK GACOR'}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center gap-1 overflow-hidden py-1">
        {/* Deposit Kode */}
        {trik.depositKode && (
          <div
            className="text-center py-1 rounded"
            style={{ background: `${providerColor}15` }}
          >
            <span style={{ color: '#9ca3af', fontSize: fontSize.label }}>DEPOSIT KODE UNIK</span>
            <div className="font-bold" style={{ color: providerColor, fontSize: fontSize.value }}>
              {trik.depositKode}
            </div>
          </div>
        )}

        {/* Putaran Bet */}
        {hasPutaranBet && (
          <div
            className="text-center py-1 rounded"
            style={{ background: `${providerColor}15` }}
          >
            <span style={{ color: '#9ca3af', fontSize: fontSize.label }}>PUTARAN BET</span>
            <div className="font-bold" style={{ color: providerColor, fontSize: fontSize.item }}>
              {trik.putaranBetMin.toLocaleString()} - {trik.putaranBetMax.toLocaleString()}
            </div>
          </div>
        )}

        {/* Fitur Ganda */}
        {!hideFiturGanda && (
          <div
            className="text-center py-1 rounded"
            style={{ background: `${providerColor}15` }}
          >
            <span style={{ color: '#9ca3af', fontSize: fontSize.label }}>FITUR GANDA</span>
            <div
              className="font-bold"
              style={{
                color: trik.fiturGanda ? '#22c55e' : '#ef4444',
                fontSize: fontSize.item
              }}
            >
              MODE {trik.fiturGanda ? 'ON' : 'OFF'}
            </div>
          </div>
        )}

        {/* Trik Items - VERTICAL per row */}
        {trik.trikItems && trik.trikItems.length > 0 && (
          <div className="flex flex-col gap-0.5">
            {trik.trikItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-2 py-0.5 rounded"
                style={{
                  background: `${providerColor}15`,
                  border: `1px solid ${providerColor}30`
                }}
              >
                <span style={{ fontSize: fontSize.item, color: '#fff' }}>{item.name}</span>
                <span
                  className="font-bold"
                  style={{ color: providerColor, fontSize: fontSize.item }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Custom Text */}
        {trik.customText && (
          <div
            className="text-center py-1 rounded mt-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${providerColor}20, transparent)`,
              border: `1px solid ${providerColor}30`
            }}
          >
            <span
              className="font-bold uppercase"
              style={{
                color: providerColor,
                fontSize: fontSize.item,
                textShadow: `0 0 5px ${providerColor}50`
              }}
            >
              {trik.customText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// Provider Section dengan 3x1 Grid - Modal game shrink-to-fit, vertical center dengan Trik
function ProviderSection3x1({
  title,
  games,
  providerColor,
  style,
  cardStyle,
  trik,
  trikPanelWidth,
  hideFiturGanda = false
}: {
  title: string;
  games: Game[];
  providerColor: string;
  style: RTPStyle;
  cardStyle: CardStyleOption;
  trik: TrikConfig;
  trikPanelWidth: number;
  hideFiturGanda?: boolean;
}) {
  // Ambil hanya 3 game untuk grid 3x1
  const displayGames = games.slice(0, 3).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  // Hitung card size - dikurangi 10% dan modal game dipersempit
  const baseAvailableWidth = trik.enabled ? (980 - trikPanelWidth - 16) : 980;
  const baseCardSize = Math.floor(baseAvailableWidth / 3.2);
  const cardSize = Math.floor(baseCardSize * 0.9);

  return (
    <div
      className="flex-1 flex gap-3 overflow-hidden items-center"
      style={{ minHeight: 0 }}
    >
      {/* Games Grid 3x1 - Shrink to fit, vertical center (levitating) */}
      <div
        className="rounded-lg overflow-hidden p-2 self-center"
        style={{
          background: cardStyle?.background || `${style.backgroundColor}dd`,
          border: cardStyle?.border ? `${cardStyle.border} ${providerColor}` : `1px solid ${providerColor}40`,
          width: trik.enabled ? `${(cardSize * 3) + 24}px` : '100%',
          flexShrink: 0
        }}
      >
        {/* Provider Title - Diperbesar 30% */}
        <div className="text-center mb-1">
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

        {/* 3x1 Game Grid */}
        <div className="flex gap-2 justify-center">
          {displayGames.map((game, index) => (
            <GameCard3x1
              key={`${game.name}-${index}`}
              game={game}
              rtp={game.rtp}
              style={style}
              cardSize={cardSize}
            />
          ))}
        </div>
      </div>

      {/* Adaptive Trik Panel - Full height */}
      {trik.enabled && (
        <div
          className="flex-1 overflow-hidden min-w-0 h-full"
          style={{ minWidth: `${trikPanelWidth}px` }}
        >
          <AdaptiveTrikPanel
            trik={trik}
            providerColor={providerColor}
            cardStyle={cardStyle}
            hideFiturGanda={hideFiturGanda}
          />
        </div>
      )}
    </div>
  );
}

export default function CustomizableLayout({
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
}: CustomizableLayoutProps) {
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
      {/* Header 1 - Custom Title (Height: 50px) */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4"
        style={{
          height: '50px',
          background: `linear-gradient(135deg, ${selectedStyle.primaryColor}40 0%, ${selectedStyle.backgroundColor}80 50%, ${selectedStyle.secondaryColor}40 100%)`,
          borderBottom: `2px solid ${selectedStyle.primaryColor}60`
        }}
      >
        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight text-center`}
          style={{
            color: selectedStyle.primaryColor,
            textShadow: `0 0 20px ${selectedStyle.primaryColor}, 0 0 40px ${selectedStyle.primaryColor}50, 0 2px 4px rgba(0,0,0,0.8)`
          }}
        >
          {customHeaderText}
        </h1>
      </div>

      {/* Header 2 - Logo, Time, Date (Height: 45px) - Website text dihilangkan */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4"
        style={{
          height: '45px',
          background: `linear-gradient(90deg, ${selectedStyle.backgroundColor}90 0%, ${selectedStyle.primaryColor}20 50%, ${selectedStyle.backgroundColor}90 100%)`,
          borderBottom: `1px solid ${selectedStyle.primaryColor}40`
        }}
      >
        {/* Logo Only - Text website dihilangkan */}
        <div className="flex items-center">
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-9 object-contain"
            style={{
              filter: `drop-shadow(0 0 8px ${selectedStyle.primaryColor}60)`
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Time & Date */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end leading-tight">
            <span
              className="text-sm font-bold"
              style={{
                color: selectedStyle.secondaryColor,
                textShadow: `0 0 10px ${selectedStyle.secondaryColor}`
              }}
            >
              {customTimeLabel}
            </span>
            <span className="text-white text-xs opacity-80">
              {getCurrentDate()}
            </span>
          </div>
          {/* Live Indicator */}
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-full"
            style={{
              background: `linear-gradient(135deg, #22c55e40, #16a34a40)`,
              border: '1px solid #22c55e60'
            }}
          >
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: '#22c55e' }}
            />
            <span className="text-xs font-bold text-green-400">LIVE</span>
          </div>
        </div>
      </div>

      {/* Games Container (Height: ~870px - lebih tinggi karena footer dikurangi) */}
      <div
        className="flex-1 flex flex-col gap-3 p-2 overflow-hidden"
        style={{ minHeight: 0 }}
      >
        {/* Pragmatic Play Section */}
        <ProviderSection3x1
          title="PRAGMATIC PLAY"
          games={selectedPragmaticGames}
          providerColor="#ffd700"
          style={selectedStyle}
          cardStyle={selectedCardStyle}
          trik={pragmaticTrik}
          trikPanelWidth={defaultLayoutSize.trikPanelWidth}
        />

        {/* PG Soft Section */}
        <ProviderSection3x1
          title="PG SOFT"
          games={selectedPgSoftGames}
          providerColor="#00f0ff"
          style={selectedStyle}
          cardStyle={selectedCardStyle}
          trik={pgSoftTrik}
          trikPanelWidth={defaultLayoutSize.trikPanelWidth}
          hideFiturGanda={true}
        />
      </div>

      {/* Footer - Hanya Telegram (Height: 35px) */}
      <div className="flex-shrink-0">
        <div
          className="flex items-center justify-center gap-2 px-4"
          style={{
            height: '35px',
            background: `linear-gradient(90deg, ${selectedStyle.primaryColor}30 0%, ${selectedStyle.backgroundColor}80 50%, ${selectedStyle.primaryColor}30 100%)`,
            borderTop: `1px solid ${selectedStyle.primaryColor}40`
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={selectedStyle.primaryColor}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span
            className="text-sm font-bold"
            style={{ color: selectedStyle.primaryColor }}
          >
            {footerConfig.footer1 || `Join Telegram: @${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
        </div>
      </div>
    </div>
  );
}
