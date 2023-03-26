import { CloudWatchLogsEvent, Context } from 'aws-lambda';
import gameList from '../data/game-list.json';
import { gamePriceRepository } from '../repository/repository';
import { getPriceChartingPrice } from '../client/price-charting';
import { GameCondition } from '../model/game';

export const handler = async (
  _event: CloudWatchLogsEvent,
  _context: Context,
) => {
  const { josni, will } = gameList;
  await Promise.all(
    josni.map(({ console, game, condition }) =>
      getPriceChartingPrice(console, game, condition as GameCondition).then(
        (prices) => {
          gamePriceRepository.upsert(
            { user: 'Josni', console, game, condition, prices },
          );
        },
      ),
    ),
  );
  await Promise.all(
    will.map(({ console, game, condition }) =>
      getPriceChartingPrice(console, game, condition as GameCondition).then(
        (prices) => {
          gamePriceRepository.upsert(
            { user: 'Will', console, game, condition, prices },
            { exists: null },
          );
        },
      ),
    ),
  );
};
