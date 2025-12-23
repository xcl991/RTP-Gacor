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

// Provider Section dengan 3x1 Grid - Game dikecilkan 10%, Trik Panel diperlebar
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
  // Base: availableWidth / 3, lalu dikurangi 10%
  const baseAvailableWidth = trik.enabled ? (980 - trikPanelWidth - 16) : 980;
  const baseCardSize = Math.floor(baseAvailableWidth / 3.2); // Lebih kecil untuk menyisakan space
  const cardSize = Math.floor(baseCardSize * 0.9); // Kurangi 10%

  return (
    <div
      className="flex-1 flex gap-3 overflow-hidden"
      style={{ minHeight: 0 }}
    >
      {/* Games Grid 3x1 - Lebih sempit */}
      <div
        className="rounded-lg overflow-hidden p-2 flex flex-col"
        style={{
          background: cardStyle?.background || `${style.backgroundColor}dd`,
          border: cardStyle?.border ? `${cardStyle.border} ${providerColor}` : `1px solid ${providerColor}40`,
          width: trik.enabled ? `${(cardSize * 3) + 24}px` : '100%', // Fixed width when trik enabled
          flexShrink: 0
        }}
      >
        {/* Provider Title */}
        <div className="text-center mb-1.5 flex-shrink-0">
          <h2
            className="font-bold text-sm"
            style={{
              color: providerColor,
              textShadow: `0 0 10px ${providerColor}80`
            }}
          >
            {title}
          </h2>
        </div>

        {/* 3x1 Game Grid - Vertical Middle Align */}
        <div className="flex-1 flex items-center justify-center">
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
      </div>

      {/* Trik Panel - Mengisi sisa space */}
      {trik.enabled && (
        <div
          className="flex-1 overflow-hidden min-w-0"
          style={{ minWidth: `${trikPanelWidth}px` }}
        >
          <TrikPanel
            trik={trik}
            providerColor={providerColor}
            fontFamily="var(--font-orbitron), sans-serif"
            cardStyle={cardStyle}
            variant="default"
            horizontalItems={true}
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

      {/* Header 2 - Logo, Time, Date (Height: 45px) */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4"
        style={{
          height: '45px',
          background: `linear-gradient(90deg, ${selectedStyle.backgroundColor}90 0%, ${selectedStyle.primaryColor}20 50%, ${selectedStyle.backgroundColor}90 100%)`,
          borderBottom: `1px solid ${selectedStyle.primaryColor}40`
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-8 object-contain"
            style={{
              filter: `drop-shadow(0 0 6px ${selectedStyle.primaryColor}60)`
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
            }}
          />
          <span
            className="text-sm font-bold uppercase"
            style={{ color: selectedStyle.primaryColor }}
          >
            {selectedWebsite.name}
          </span>
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

      {/* Games Container (Height: ~820px) */}
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

      {/* Footer Section (Height: ~85px total) */}
      <div className="flex-shrink-0">
        {/* Footer 1 - Main Footer with Telegram (Height: 35px) */}
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

        {/* Sub Footer 1 (Height: 24px) */}
        {footerConfig.subFooter1 && (
          <div
            className="flex items-center justify-center px-4"
            style={{
              height: '24px',
              background: `${selectedStyle.backgroundColor}60`
            }}
          >
            <span
              className="text-[11px]"
              style={{ color: selectedStyle.secondaryColor, opacity: 0.9 }}
            >
              {footerConfig.subFooter1}
            </span>
          </div>
        )}

        {/* Footer 2 (Height: 26px) */}
        {footerConfig.footer2 && (
          <div
            className="flex items-center justify-center px-4"
            style={{
              height: '26px',
              background: `linear-gradient(90deg, ${selectedStyle.secondaryColor}20 0%, ${selectedStyle.primaryColor}20 100%)`,
              borderTop: `1px solid ${selectedStyle.primaryColor}20`
            }}
          >
            <span
              className="text-[11px] font-medium"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {footerConfig.footer2}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
