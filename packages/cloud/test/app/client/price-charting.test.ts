import { getPriceChartingPrice } from '../../../app/client/price-charting';

describe('Client Price Charting', () => {
  describe('getPriceChartingPrice', () => {
    it('should get prices from price charting', async () => {
      const anyConsole = 'gameboy';
      const anyGame = 'play-action-football';

      const data = await getPriceChartingPrice(anyConsole, anyGame, 'cib');
      console.log({ data });
      expect(data).toHaveProperty('length');
    });
  });
});
