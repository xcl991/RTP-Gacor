import { Game } from '@/types';

/**
 * Generate random RTP value between min and max (inclusive)
 * Default range: 86-98%
 */
export function generateRTP(min: number = 86, max: number = 98): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Game with RTP value
 */
export interface GameWithRTP extends Game {
  rtp: number;
}

/**
 * Generate RTP values for a list of games
 * RTP values are stable per game session (no re-render changes)
 */
export function generateGamesWithRTP(
  games: Game[],
  count: number,
  min: number = 86,
  max: number = 98
): GameWithRTP[] {
  return games.slice(0, count).map(game => ({
    ...game,
    rtp: generateRTP(min, max)
  }));
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate shuffled games with RTP values
 */
export function generateShuffledGamesWithRTP(
  games: Game[],
  count: number,
  min: number = 86,
  max: number = 98
): GameWithRTP[] {
  const shuffled = shuffleArray(games);
  return generateGamesWithRTP(shuffled, count, min, max);
}
