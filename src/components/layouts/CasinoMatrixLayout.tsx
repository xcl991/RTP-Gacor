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

interface MatrixGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  secondaryColor: string;
  index: number;
  darkBackground: string;
}

function MatrixGameCard({ game, rtp, primaryColor, secondaryColor, index, darkBackground }: MatrixGameCardProps) {
  return (
    <div
      className="relative overflow-hidden group cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${darkBackground}, ${darkBackground}f5)`,
        border: `1px solid ${primaryColor}40`,
        borderRadius: '4px',
        boxShadow: `0 0 20px ${primaryColor}20`,
        fontFamily: 'monospace'
      }}
    >
      {/* Matrix Rain Effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}10 2px, ${primaryColor}10 4px)`
        }}
      />

      <div className="relative z-10 p-3">
        <div className="w-full aspect-square mb-1.5 relative overflow-hidden bg-black/50 rounded">
          <img
            src={game.src}
            alt={game.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23000'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%230f0' font-family='monospace' font-size='12'%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>

        <div className="text-center">
          <div className="text-xs font-bold truncate" style={{ color: primaryColor }}>
            {game.name.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${primaryColor}20, transparent 70%)`,
          border: `1px solid ${primaryColor}`
        }}
      />
    </div>
  );
}

interface CasinoMatrixLayoutProps {
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

export default function CasinoMatrixLayout({
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
}: CasinoMatrixLayoutProps) {
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

  const darkPrimary = adjustColor(primaryColor, -85);
  const darkerPrimary = adjustColor(primaryColor, -95);
  const darkSecondary = adjustColor(secondaryColor, -85);

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
      {/* Matrix Background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}10 2px, ${primaryColor}10 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, ${primaryColor}10 2px, ${primaryColor}10 4px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center p-3 mb-3" style={{ borderBottom: `1px solid ${primaryColor}30` }}>
        <div className="mb-4">
          <img
            src={selectedWebsite.logo}
            alt={selectedWebsite.name}
            className="h-20 mx-auto mb-1.5"
            style={{ filter: `drop-shadow(0 0 15px ${primaryColor}80)`, transform: 'scale(1.3)' }}
          />
          {/* Header Text Container with Background */}
          <div
            className={`relative inline-block px-6 py-4 rounded-lg ${getBlurClass()}`}
            style={{
              background: selectedCardStyle?.background || `linear-gradient(135deg, ${darkerPrimary}d9, ${darkPrimary}e6)`,
              border: selectedCardStyle?.border ? `${selectedCardStyle.border} ${primaryColor}` : `2px solid ${primaryColor}60`,
              boxShadow: selectedCardStyle?.shadow ? (selectedCardStyle.shadow.includes('0 0 20px') ? `${selectedCardStyle.shadow} ${primaryColor}` : selectedCardStyle.shadow) : `0 0 30px ${primaryColor}40, inset 0 0 20px ${primaryColor}15`,
              opacity: selectedCardStyle?.opacity || 1,
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* Pattern Overlay */}
            {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
              />
            )}
            <h1 className="relative z-10 text-3xl font-bold mb-1.5 tracking-wider" style={{ color: primaryColor, textShadow: `0 0 20px ${primaryColor}` }}>
              {customHeaderText}
            </h1>
            <div className="relative z-10 text-xl" style={{ color: secondaryColor, textShadow: `0 0 10px ${secondaryColor}80` }}>
              DATE: {getCurrentDate()} | TIME: {customTimeLabel}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid - 2 Columns with 3-column game grids */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1">
        {/* Pragmatic Play Section */}
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
              className="absolute inset-0 pointer-events-none rounded"
              style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
            />
          )}
          <div className="relative z-10 flex items-center justify-center mb-1.5" style={{ overflow: 'visible' }}>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              className="h-12"
              style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80)`, transform: 'scale(2.5)' }}
              alt="Pragmatic Play"
            />
          </div>
          <div className="relative z-10 flex flex-wrap justify-center gap-2">
            {pragmaticGamesWithRTP.map((game, index) => (
              <div key={`pragmatic-${index}`} className={getCardWidthClass(pragmaticGamesWithRTP.length)}>
                <MatrixGameCard
                  game={game}
                  rtp={game.rtp}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  index={index}
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
                variant="cyberpunk"
              />
            </div>
          )}
          </div>
        </div>

        {/* PG Soft Section */}
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
                className="absolute inset-0 pointer-events-none rounded"
                style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat' }}
              />
            )}
            <div className="relative z-10 flex items-center justify-center mb-1.5" style={{ overflow: 'visible' }}>
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
                className="h-12"
                style={{ filter: `drop-shadow(0 0 10px ${secondaryColor}80)`, transform: 'scale(2.5)' }}
                alt="PG Soft"
              />
            </div>
            <div className="relative z-10 flex flex-wrap justify-center gap-2">
              {pgSoftGamesWithRTP.map((game, index) => (
                <div key={`pgsoft-${index}`} className={getCardWidthClass(pgSoftGamesWithRTP.length)}>
                  <MatrixGameCard
                    game={game}
                    rtp={game.rtp}
                    primaryColor={secondaryColor}
                    secondaryColor={primaryColor}
                    index={index + 10}
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
                  variant="cyberpunk"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-3 text-center p-3" style={{ borderTop: `1px solid ${primaryColor}30` }}>
        <div className="inline-flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill={primaryColor}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span className="text-xl" style={{ color: primaryColor }}>
            @{telegramUsername || selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
          </span>
        </div>
      </div>
    </div>
  );
}
