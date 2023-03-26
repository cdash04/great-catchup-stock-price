import got from 'got';
import { GameCondition, GamePrice } from '../model/game';

type GamePricesResponse = Record<GameCondition, [number, number][]>;

function convertResponseToGamePrices(
  condition: GameCondition,
): (response: GamePricesResponse) => GamePrice[] {
  return function getPrices(response: GamePricesResponse): GamePrice[] {
    return response[condition]?.map(([time, price]) => ({ time, price }));
  };
}

export async function getPriceChartingPrice(
  console: string,
  game: string,
  condition: GameCondition = 'used',
) {

  return await got(
    `https://www.pricecharting.com/game/${console}/${game}`,
  ).then((response) => response.body.match(/VGPC\.chart_data = (.*);/)?.[1] ?? '[]')
  .then(JSON.parse)
  .then(convertResponseToGamePrices(condition));

}
