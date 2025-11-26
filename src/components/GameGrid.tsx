'use client';

import { Game, CardStyleOption } from '@/types';

interface GameCardProps {
  game: Game;
  rtp: number;
  style: any;
  cardStyle?: CardStyleOption;
}

function GameCard({ game, rtp, style, cardStyle }: GameCardProps) {
  const getBlurClass = () => {
    if (!cardStyle?.blur || cardStyle.blur === 'none') return '';
    return cardStyle.blur;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 w-[180px] ${getBlurClass()}`}
      style={{
        background: cardStyle?.background || style.backgroundColor,
        border: cardStyle?.border ? `${cardStyle.border} ${style.primaryColor}` : `2px solid ${style.primaryColor}`,
        opacity: cardStyle?.opacity || 1,
        boxShadow: cardStyle?.shadow ? (cardStyle.shadow.includes('0 0 20px') ? `${cardStyle.shadow} ${style.primaryColor}` : cardStyle.shadow) : '0 4px 6px rgba(0,0,0,0.3)'
      }}
    >
      {/* Game Image */}
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={game.src}
          alt={`${game.name} game preview`}
          className="w-full h-full object-contain bg-black/50"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />

        {/* RTP Badge */}
        <div
          className="absolute top-2 right-2 px-3 py-1 rounded-full font-bold text-sm shadow-lg"
          style={{
            backgroundColor: style.secondaryColor,
            color: '#000',
            boxShadow: `0 0 10px ${style.secondaryColor}`
          }}
        >
          {rtp}%
        </div>
      </div>

      {/* Game Info */}
      <div
        className="p-3"
        style={{
          background: `linear-gradient(to bottom, ${style.backgroundColor}dd, ${style.backgroundColor})`
        }}
      >
        <h3 className="text-white font-bold text-sm text-center mb-2 line-clamp-2">
          {game.name}
        </h3>

        {/* RTP Bar */}
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500 relative"
            style={{
              width: `${rtp}%`,
              background: `linear-gradient(90deg, ${style.primaryColor}, ${style.secondaryColor})`,
              boxShadow: `0 0 10px ${style.secondaryColor}`
            }}
          >
            <div className="absolute right-0 top-0 w-1 h-full bg-white animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface GameGridProps {
  title: string;
  games: Game[];
  gameCount: number;
  providerLogo: string;
  providerColor: string;
  style: any;
  cardStyle?: CardStyleOption;
}

export default function GameGrid({
  title,
  games,
  gameCount,
  providerLogo,
  providerColor,
  style,
  cardStyle
}: GameGridProps) {
  const selectedGames = games.slice(0, gameCount);

  const gamesWithRTP = selectedGames.map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  return (
    <div className="mb-8">
      {/* Provider Header */}
      <div className="flex flex-col items-center mb-4 p-4 rounded-lg"
        style={{
          backgroundColor: `${style.backgroundColor}dd`,
          border: `1px solid ${style.primaryColor}`
        }}
      >
        <div className="flex items-center gap-4 mb-2">
          <img
            src={providerLogo}
            alt={`${title} provider logo`}
            className="h-20 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="40"%3E%3Crect width="120" height="40" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="12"%3EProvider%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>
        <h2
          className="text-2xl font-bold text-center"
          style={{ color: providerColor }}
        >
          {title}
        </h2>
        <div
          className="px-4 py-2 rounded-full text-sm font-bold mt-2"
          style={{
            backgroundColor: providerColor,
            color: '#000'
          }}
        >
          {gameCount} Games
        </div>
      </div>

      {/* Games Grid */}
      <div className="flex flex-wrap justify-center gap-4">
        {gamesWithRTP.map((game, index) => (
          <GameCard
            key={`${game.name}-${index}`}
            game={game}
            rtp={game.rtp}
            style={style}
            cardStyle={cardStyle}
          />
        ))}
      </div>
    </div>
  );
}
