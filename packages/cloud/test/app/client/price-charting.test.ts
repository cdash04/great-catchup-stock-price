import { getPriceChartingPrice } from '../../../app/client/price-charting';

describe('Client Price Charting', () => {
  describe('getPriceChartingPrice', () => {
    it('should get prices from price charting', async () => {
      const anyConsole = 'nintendo-ds';
      const anyGame = 'honeycomb-beat';

      const data = await getPriceChartingPrice(anyConsole, anyGame, 'cib');
      console.log({ data });
      expect(data).toHaveProperty('length');
    });
  });
});
