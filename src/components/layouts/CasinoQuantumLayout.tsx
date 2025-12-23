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

interface QuantumGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  secondaryColor: string;
  quantumId: string;
  darkBackground: string;
}

function QuantumGameCard({ game, rtp, primaryColor, secondaryColor, quantumId, darkBackground }: QuantumGameCardProps) {
  return (
    <div
      className="relative group cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${darkBackground}e6, ${primaryColor}15)`,
        border: `1px solid ${primaryColor}60`,
        borderRadius: '8px',
        boxShadow: `0 0 20px ${primaryColor}40, inset 0 0 15px rgba(0,0,0,0.5)`
      }}
    >
      {/* Circuit Board Pattern */}
      <div
        className="absolute inset-0 opacity-20 rounded-lg"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 15h10m10 0h10M15 0v10m0 10v10' stroke='${encodeURIComponent(primaryColor)}' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='5' cy='5' r='1' fill='${encodeURIComponent(primaryColor)}'/%3E%3Ccircle cx='25' cy='25' r='1' fill='${encodeURIComponent(primaryColor)}'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Quantum ID Badge */}
      <div
        className="absolute top-2 left-2 px-2 py-1 text-xs font-mono font-black z-20"
        style={{
          background: primaryColor,
          color: '#000',
          borderRadius: '2px',
          boxShadow: `0 0 10px ${primaryColor}`
        }}
      >
        {quantumId}
      </div>

      {/* Status LED */}
      <div className="absolute top-2 right-2 z-20">
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: secondaryColor, boxShadow: `0 0 10px ${secondaryColor}` }}
        />
      </div>

      <div className="relative z-10 p-3">
        <div className="w-full aspect-square mb-1.5 relative overflow-hidden bg-black/60 rounded">
          <img
            src={game.src}
            alt={game.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23000'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%234da6ff' font-family='monospace' font-size='10'%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E";
            }}
          />

        </div>

        <div className="text-center">
          <div className="text-xs font-bold mb-1 truncate" style={{
            color: primaryColor,
            fontFamily: 'monospace',
            textShadow: `0 0 6px ${primaryColor}`
          }}>
            {game.name.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Circuit Connections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-px h-2" style={{ background: primaryColor, transform: 'translateX(-50%)' }} />
        <div className="absolute bottom-0 left-1/2 w-px h-2" style={{ background: primaryColor, transform: 'translateX(-50%)' }} />
        <div className="absolute left-0 top-1/2 h-px w-2" style={{ background: primaryColor, transform: 'translateY(-50%)' }} />
        <div className="absolute right-0 top-1/2 h-px w-2" style={{ background: primaryColor, transform: 'translateY(-50%)' }} />
      </div>

      {/* Hover Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
        style={{
          border: `1px solid ${primaryColor}`,
          boxShadow: `0 0 20px ${primaryColor} inset`
        }}
      />
    </div>
  );
}

interface CasinoQuantumLayoutProps {
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

export default function CasinoQuantumLayout({
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
}: CasinoQuantumLayoutProps) {
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
  const darkPrimary = adjustColor(primaryColor, -80);
  const darkerPrimary = adjustColor(primaryColor, -90);
  const darkSecondary = adjustColor(secondaryColor, -80);

  const getBlurClass = () => {
    if (!selectedCardStyle?.blur || selectedCardStyle.blur === 'none') return '';
    return selectedCardStyle.blur;
  };

  const getSectionStyle = (color: string) => ({
    background: selectedCardStyle?.background || undefined,
    border: selectedCardStyle?.border ? `${selectedCardStyle.border} ${color}` : undefined,
    opacity: selectedCardStyle?.opacity || 1,
    boxShadow: selectedCardStyle?.shadow ? (selectedCardStyle.shadow.includes('0 0 20px') ? `${selectedCardStyle.shadow} ${color}` : selectedCardStyle.shadow) : undefined
  });

  const pragmaticGamesWithRTP = selectedPragmaticGames.slice(0, pragmaticCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const pgSoftGamesWithRTP = selectedPgSoftGames.slice(0, pgSoftCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const getCardWidthClass = (count: number) => {
    if (count === 1) return 'w-[calc(50%-0.25rem)] md:w-[calc(50%-0.25rem)]';
    if (count === 2) return 'w-[calc(50%-0.25rem)] md:w-[calc(45%-0.25rem)]';
    return 'w-[calc(50%-0.25rem)] md:w-[calc(33.333%-0.34rem)]';
  };

  return (
    <div className="relative z-10 flex flex-col min-h-full p-3" style={{ fontFamily: 'monospace' }}>
      {/* Quantum Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${primaryColor}20 1px, transparent 1px), linear-gradient(90deg, ${secondaryColor}20 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Quantum Header */}
      <div className="relative z-10 mb-2">
        <div
          className="p-3 rounded-lg"
          style={{
            background: `${darkerPrimary}cc`,
            backdropFilter: 'blur(5px)',
            border: `1px solid ${primaryColor}50`,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div className="flex items-center justify-between w-full">
            <img
              src={selectedWebsite.logo}
              alt={selectedWebsite.name}
              style={{ height: '60px', filter: `drop-shadow(0 0 15px ${primaryColor}cc)` }}
            />
            <h1 className="text-lg font-black tracking-wider" style={{
              color: primaryColor,
              textShadow: `0 0 15px ${primaryColor}, 0 0 30px ${primaryColor}60`
            }}>
              {customHeaderText}
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: secondaryColor }}>{getCurrentDate()}</span>
              <span style={{ color: primaryColor }}>{customTimeLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quantum Circuit Board - 2 Column Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1">
        {/* Primary Circuit - Pragmatic */}
        <div>
          <div
            className={`relative rounded p-3 ${getBlurClass()}`}
            style={{
              ...getSectionStyle(primaryColor),
              border: `1px solid ${primaryColor}30`,
              background: `${darkPrimary}99`
            }}
          >
          {/* Pattern Overlay */}
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
            />
          )}
          <div className="relative z-10 flex items-center justify-center mb-1.5" style={{ overflow: 'visible' }}>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              className="h-10"
              style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80)`, transform: 'scale(2.5)' }}
              alt="Pragmatic Play"
            />
          </div>
          <div className="relative z-10 flex flex-wrap justify-center gap-2">
            {pragmaticGamesWithRTP.map((game, index) => (
              <div key={`pragmatic-${index}`} className={getCardWidthClass(pragmaticGamesWithRTP.length)}>
                <QuantumGameCard
                  game={game}
                  rtp={game.rtp}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  quantumId={`Q${(index + 1).toString().padStart(3, '0')}`}
                  darkBackground={darkPrimary}
                />
              </div>
            ))}
          </div>
          {pragmaticTrik.enabled && (
            <div className="relative z-10 mt-4">
              <TrikPanel
                trik={pragmaticTrik}
                providerColor={primaryColor}
                fontFamily="monospace"
                cardStyle={selectedCardStyle}
                variant="futuristic"
              />
            </div>
          )}
          </div>
        </div>

        {/* Secondary Circuit - PG Soft */}
        <div>
          <div
            className={`relative rounded p-3 ${getBlurClass()}`}
            style={{
              ...getSectionStyle(secondaryColor),
              border: `1px solid ${secondaryColor}30`,
              background: `${darkSecondary}99`
            }}
          >
            {/* Pattern Overlay */}
            {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
              />
            )}
            <div className="relative z-10 flex items-center justify-center mb-1.5" style={{ overflow: 'visible' }}>
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
                className="h-10"
                style={{ filter: `drop-shadow(0 0 10px ${secondaryColor}80)`, transform: 'scale(2.5)' }}
                alt="PG Soft"
              />
            </div>
            <div className="relative z-10 flex flex-wrap justify-center gap-2">
              {pgSoftGamesWithRTP.map((game, index) => (
                <div key={`pgsoft-${index}`} className={getCardWidthClass(pgSoftGamesWithRTP.length)}>
                  <QuantumGameCard
                    game={game}
                    rtp={game.rtp}
                    primaryColor={secondaryColor}
                    secondaryColor={primaryColor}
                    quantumId={`Q${(index + 101).toString().padStart(3, '0')}`}
                    darkBackground={darkSecondary}
                  />
                </div>
              ))}
            </div>
            {pgSoftTrik.enabled && (
              <div className="relative z-10 mt-4">
                <TrikPanel
                  trik={pgSoftTrik}
                  hideFiturGanda={true}
                  providerColor={secondaryColor}
                  fontFamily="monospace"
                  cardStyle={selectedCardStyle}
                  variant="futuristic"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
