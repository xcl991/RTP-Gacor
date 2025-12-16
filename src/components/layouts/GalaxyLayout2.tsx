'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig } from '@/types';
import TrikPanel from '../TrikPanel';

interface GalaxyGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  secondaryColor: string;
}

function GalaxyGameCard({ game, rtp, primaryColor, secondaryColor }: GalaxyGameCardProps) {
  const isHot = rtp >= 95;

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 w-[180px]"
      style={{
        backgroundColor: 'rgb(5, 11, 20)',
        border: '2px solid ' + primaryColor
      }}
    >
      {isHot && (
        <div
          className="absolute top-2 left-2 px-2 py-0.5 text-xs font-bold uppercase z-20 rounded"
          style={{ background: secondaryColor, color: "white" }}
        >
          GACOR
        </div>
      )}

      <div className="relative w-full overflow-hidden" style={{ height: '180px', position: 'relative' }}>
        <img
          alt={game.name + " game preview"}
          className="w-full h-full object-contain bg-black/50"
          src={game.src}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27200%27%3E%3Crect width=%27200%27 height=%27200%27 fill=%27%23333%27/%3E%3Ctext x=%2750%%25%27 y=%2750%%25%27 text-anchor=%27middle%27 dy=%27.3em%27 fill=%27white%27 font-family=%27Arial%27 font-size=%2714%27%3ENo Image%3C/text%3E%3C/svg%3E";
          }}
        />
        <div
          className="absolute rounded-full font-bold text-sm shadow-lg"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: '#ffd700',
            color: '#000',
            boxShadow: '0 0 10px #ffd700',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '45px',
            height: '24px',
            padding: '0 10px',
            lineHeight: '1'
          }}
        >
          {rtp}%
        </div>
      </div>
      <div className="p-3" style={{ background: 'linear-gradient(rgba(5, 11, 20, 0.867), rgb(5, 11, 20))' }}>
        <h3
          data-game-title="true"
          className="text-white font-bold text-sm text-center mb-2"
          style={{
            overflow: 'hidden',
            height: '42px',
            lineHeight: '14px',
            whiteSpace: 'normal',
            overflowWrap: 'break-word'
          }}
        >
          {game.name}
        </h3>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500 relative"
            style={{
              width: rtp + '%',
              background: 'linear-gradient(90deg, rgb(0, 240, 255), rgb(255, 215, 0))',
              boxShadow: '0 0 10px rgb(255, 215, 0)'
            }}
          >
            <div className="absolute right-0 top-0 w-1 h-full bg-white animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface GalaxyLayout2Props {
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
}

export default function GalaxyLayout2({
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
  pgSoftTrik
}: GalaxyLayout2Props) {
  const primaryColor = selectedStyle.primaryColor;
  const secondaryColor = selectedStyle.secondaryColor;

  const getBlurClass = () => {
    if (!selectedCardStyle?.blur || selectedCardStyle.blur === 'none') return '';
    return selectedCardStyle.blur;
  };

  const getSectionStyle = (color: string) => ({
    background: selectedCardStyle?.background || "linear-gradient(145deg, rgba(15,15,35,0.95), rgba(5,5,20,0.98))",
    border: selectedCardStyle?.border ? selectedCardStyle.border + " " + color : "2px solid " + color + "60",
    opacity: selectedCardStyle?.opacity || 1,
    boxShadow: selectedCardStyle?.shadow ? (selectedCardStyle.shadow.includes('0 0 20px') ? selectedCardStyle.shadow + " " + color : selectedCardStyle.shadow) : "0 0 20px " + color + "30, inset 0 0 30px rgba(0,0,0,0.5)"
  });

  const pragmaticGamesWithRTP = selectedPragmaticGames.slice(0, pragmaticCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const pgSoftGamesWithRTP = selectedPgSoftGames.slice(0, pgSoftCount).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  return (
    <div className="relative z-10 flex flex-col min-h-full p-6" style={{ fontFamily: "var(--font-orbitron), sans-serif" }}>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(2px 2px at 20px 30px, " + primaryColor + ", transparent), radial-gradient(2px 2px at 40px 70px, " + secondaryColor + ", transparent), radial-gradient(1px 1px at 90px 40px, white, transparent)",
          backgroundSize: "200px 150px"
        }}
      />

      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, " + primaryColor + "40, transparent 70%)",
          filter: "blur(40px)"
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, " + secondaryColor + "40, transparent 70%)",
          filter: "blur(40px)"
        }}
      />

      <div
        className="relative z-10 text-center mb-8 p-8 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(10,10,30,0.9), rgba(20,10,40,0.95))",
          border: "2px solid " + primaryColor + "60",
          boxShadow: "0 0 40px " + primaryColor + "30, inset 0 0 60px rgba(0,0,0,0.5)"
        }}
      >
        <img
          src={selectedWebsite.logo}
          alt={selectedWebsite.name}
          className="h-24 mx-auto mb-6"
          style={{ filter: "drop-shadow(0 0 20px " + primaryColor + "cc)" }}
        />
        <h1
          className="text-4xl font-bold uppercase tracking-widest mb-4"
          style={{
            background: "linear-gradient(90deg, " + primaryColor + ", " + secondaryColor + ", " + primaryColor + ")",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          PILIHAN GAME SUPER GACOR
        </h1>
        <div className="flex items-center justify-center gap-6">
          <span style={{ color: primaryColor }}>{getCurrentDate()}</span>
          <span style={{ color: secondaryColor }}>{customTimeLabel}</span>
        </div>
      </div>

      {/* Pragmatic Section with Grid */}
      <div
        className="grid items-stretch gap-4 mb-8"
        style={{
          gridTemplateColumns: pragmaticTrik.enabled ? '1fr 256px' : '1fr'
        }}
      >
        <div
          className={"relative p-4 rounded-xl " + getBlurClass()}
          style={getSectionStyle(primaryColor)}
        >
          {/* Pattern Overlay */}
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{
                backgroundImage: selectedCardStyle.pattern,
                backgroundRepeat: 'repeat'
              }}
            />
          )}
          <div className="relative z-10 flex flex-col items-center mb-4 p-4 rounded-lg">
            <div className="flex items-center gap-4 mb-2">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
                alt="PRAGMATIC PLAY provider logo"
                className="h-20 object-contain"
                style={{ transform: 'scale(1.3)' }}
              />
            </div>
            <h2 className="text-2xl font-bold text-center" style={{ color: '#ffd700' }}>
              PRAGMATIC PLAY
            </h2>
            <div
              className="rounded-full text-sm font-bold mt-2"
              style={{
                backgroundColor: '#ffd700',
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '28px',
                padding: '0 16px',
                lineHeight: '1'
              }}
            >
              {pragmaticCount} Games
            </div>
          </div>
          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            {pragmaticGamesWithRTP.map((game, index) => (
              <GalaxyGameCard
                key={"pragmatic-" + index}
                game={game}
                rtp={game.rtp}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            ))}
          </div>
        </div>
        {pragmaticTrik.enabled && (
          <TrikPanel
            trik={pragmaticTrik}
            providerColor={primaryColor}
            fontFamily="var(--font-orbitron), sans-serif"
            cardStyle={selectedCardStyle}
            variant="galaxy"
          />
        )}
      </div>

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, " + primaryColor + ", transparent)" }} />
        <div className="flex gap-2">
          <span style={{ color: primaryColor }}>*</span>
          <span style={{ color: secondaryColor }}>+</span>
          <span style={{ color: primaryColor }}>*</span>
        </div>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, " + primaryColor + ", transparent)" }} />
      </div>

      {/* PG Soft Section with Grid */}
      <div
        className="grid items-stretch gap-4 mb-8"
        style={{
          gridTemplateColumns: pgSoftTrik.enabled ? '1fr 256px' : '1fr'
        }}
      >
        <div
          className={"relative p-4 rounded-xl " + getBlurClass()}
          style={getSectionStyle(secondaryColor)}
        >
          {/* Pattern Overlay */}
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{
                backgroundImage: selectedCardStyle.pattern,
                backgroundRepeat: 'repeat'
              }}
            />
          )}
          <div className="relative z-10 flex flex-col items-center mb-4 p-4 rounded-lg">
            <div className="flex items-center gap-4 mb-2">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
                alt="PG SOFT provider logo"
                className="h-20 object-contain"
                style={{ transform: 'scale(1.3)' }}
              />
            </div>
            <h2 className="text-2xl font-bold text-center" style={{ color: '#00f0ff' }}>
              PG SOFT
            </h2>
            <div
              className="rounded-full text-sm font-bold mt-2"
              style={{
                backgroundColor: '#00f0ff',
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '28px',
                padding: '0 16px',
                lineHeight: '1'
              }}
            >
              {pgSoftCount} Games
            </div>
          </div>
          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            {pgSoftGamesWithRTP.map((game, index) => (
              <GalaxyGameCard
                key={"pgsoft-" + index}
                game={game}
                rtp={game.rtp}
                primaryColor={secondaryColor}
                secondaryColor={primaryColor}
              />
            ))}
          </div>
        </div>
        {pgSoftTrik.enabled && (
          <TrikPanel
            trik={pgSoftTrik}
            providerColor={secondaryColor}
            fontFamily="var(--font-orbitron), sans-serif"
            cardStyle={selectedCardStyle}
            variant="galaxy"
          />
        )}
      </div>

      <div className="relative z-10 mt-auto text-center">
        <div
          className="inline-flex items-center gap-4 px-8 py-4 rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(10,10,30,0.9), rgba(20,10,40,0.95))",
            border: "2px solid " + primaryColor + "60",
            boxShadow: "0 0 30px " + primaryColor + "30"
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill={primaryColor}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span className="text-lg font-semibold" style={{ color: primaryColor }}>
            @{selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
          </span>
        </div>
      </div>
    </div>
  );
}
