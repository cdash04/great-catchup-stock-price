import type { GamePrice } from '@app/model/game';

export { GamePrice };

export interface GamePriceResponse {
    user: 'Josni' | 'Will';
    games: {
      console: string;
      game: string;
      condition: string;
      prices: GamePrice[];
    }[];
  }
