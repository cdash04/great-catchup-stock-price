import type { GamePriceResponse } from '../model/game-price-response';

async function getGamePrices(name: 'Josni' | 'Will') {
  return fetch(`https://3mb6g4wde7.execute-api.ca-central-1.amazonaws.com/prod/game-price/${name}`).then((response) => response.json() as Promise<{ data: GamePriceResponse}>);
}

export default {
  getGamePrices,
};
