import { APIGatewayEvent, Context } from 'aws-lambda';
import createAPI, { Request, Response } from 'lambda-api';
import { corsMiddleware } from '../middlewares/cors';
import { gamePriceRepository } from '../repository/repository';

const api = createAPI();

api.get('/game-price/:user', async (req: Request, res: Response) => {
  const { user } = req.params;
  try {
    const gamePrices = await gamePriceRepository.find(
      { user },
      { fields: ['console', 'game', 'condition', 'prices'] },
    );
    if (gamePrices) {
      return res.status(200).json({ data: { user, games: gamePrices } });
    }
    return res.status(404).json({ error: 'Not found' });
  } catch (error) {
    return res.status(404).json({ error: 'Not found' });
  }
});

api.get(
  '/game-price/:user/:console/:game',
  async (req: Request, res: Response) => {
    const { user, console, game } = req.params;
    try {
      const response = await gamePriceRepository.get(
        { user, console, game },
        { fields: ['condition', 'prices'] },
      );

      if (response) {
        const { condition, prices } = response;
        return res
          .status(200)
          .json({ data: { user, console, game, condition, prices } });
      }
    } catch (error) {
      return res.status(404).json({ error: 'Not found' });
    }
  },
);

api.use(corsMiddleware);

export const handler = async (event: APIGatewayEvent, context: Context) => {
  return api.run(event, context);
};
