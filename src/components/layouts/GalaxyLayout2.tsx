'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption } from '@/types';

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
      className="relative overflow-hidden w-full rounded-xl"
      style={{
        background: "linear-gradient(145deg, rgba(15,15,35,0.95), rgba(5,5,20,0.98))",
        border: "2px solid " + primaryColor + "60",
        boxShadow: "0 0 20px " + primaryColor + "30, inset 0 0 30px rgba(0,0,0,0.5)"
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

      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-contain bg-black/30"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27200%27%3E%3Crect width=%27200%27 height=%27200%27 fill=%27%23333%27/%3E%3Ctext x=%2750%%25%27 y=%2750%%25%27 text-anchor=%27middle%27 dy=%27.3em%27 fill=%27white%27 font-family=%27Arial%27 font-size=%2714%27%3ENo Image%3C/text%3E%3C/svg%3E";
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: "radial-gradient(ellipse at center, " + primaryColor + "40, transparent 70%)"
          }}
        />
        <div
          className="absolute top-2 right-2 px-3 py-1 rounded-lg font-bold text-lg"
          style={{
            background: "rgba(0,0,0,0.8)",
            border: "2px solid " + primaryColor,
            color: primaryColor,
            boxShadow: "0 0 15px " + primaryColor + "80",
            textShadow: "0 0 10px " + primaryColor
          }}
        >
          {rtp}%
        </div>
      </div>
      <div className="p-3">
        <h3
          className="font-semibold text-sm text-center truncate mb-2"
          style={{ color: primaryColor, textShadow: "0 0 5px " + primaryColor + "50" }}
        >
          {game.name}
        </h3>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid " + primaryColor + "30" }}>
          <div
            className="h-full rounded-full"
            style={{
              width: rtp + "%",
              background: "linear-gradient(90deg, " + primaryColor + ", " + secondaryColor + ")",
              boxShadow: "0 0 10px " + primaryColor
            }}
          />
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
  selectedCardStyle
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

      <div
        className={"relative z-10 mb-8 p-4 rounded-xl " + getBlurClass()}
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
        <div className="relative z-10 flex items-stretch gap-4">
          <div
            className="w-32 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(145deg, rgba(15,15,35,0.95), rgba(5,5,20,0.98))",
              border: "2px solid " + primaryColor + "60", boxShadow: "0 0 20px " + primaryColor + "30, inset 0 0 30px rgba(0,0,0,0.5)"
            }}
          >
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              className="h-16"
              style={{ filter: "drop-shadow(0 0 10px " + primaryColor + "cc)" }}
              alt="Pragmatic Play"
            />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
        </div>
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

      <div
        className={"relative z-10 mb-8 p-4 rounded-xl " + getBlurClass()}
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
        <div className="relative z-10 flex items-stretch gap-4">
          <div
            className="w-32 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(145deg, rgba(15,15,35,0.95), rgba(5,5,20,0.98))",
              border: "2px solid " + secondaryColor + "60", boxShadow: "0 0 20px " + secondaryColor + "30, inset 0 0 30px rgba(0,0,0,0.5)"
            }}
          >
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
              className="h-16"
              style={{ filter: "drop-shadow(0 0 10px " + secondaryColor + "cc)" }}
              alt="PG Soft"
            />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
        </div>
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
