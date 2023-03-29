<script lang="ts">
  import type { GamePriceResponse } from '../model/game-price-response';
  import * as dayjs from 'dayjs';
  import { Line } from 'svelte-chartjs';

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  export let responses: GamePriceResponse[];

  const today = dayjs();

  const userOptions = {
    Josni: {
      color: 'rgb(243, 165, 005)',
    },
    Will: {
      color: 'rgb(000, 143, 057)',
    },
  }


  const defaultDatasets = {
    lineTension: 0.3,
    backgroundColor: 'rgba(225, 204,230, .3)',
    borderDash: [],
    borderDashOffset: 0.0,
    pointBorderColor: 'rgb(205, 130,1 58)',
    pointHoverBorderColor: 'rgba(220, 220, 220,1)',
    pointHoverBorderWidth: 2,
    pointHitRadius: 10,
  }

  $: getChartData = () => {
    console.log({responses});

    let timeFrame = dayjs().subtract(10, 'year');
    let chartLabelsDates: dayjs.Dayjs[] = [];

    while (!timeFrame.isAfter(today)) {
      chartLabelsDates.push(timeFrame.clone());

      timeFrame = timeFrame.add(1, 'month');
    }

    const getPriceByDate = (data: GamePriceResponse) => {

      const priceByDate: Record<string, Record<string, number>> = {};

      console.log(data.games.map(game => game.prices));
    
      const flattenGamePrices = data.games.flatMap(({ console, condition, game, prices }) => {
        return prices.map((price) => ({ console, condition, game, ...price }))
      });

      flattenGamePrices.sort((a, b) => a.time - b.time);

      console.log({flattenGamePrices});

      chartLabelsDates?.forEach((date) => {
        flattenGamePrices?.forEach(({ game, price, time }, i) => {
          if (!dayjs(time).isAfter(date)) {
            // init price if doesn't exist
            priceByDate[date.format('MMM YYYY')] ??= {};
            priceByDate[date.format('MMM YYYY')]['total'] ??= 0;

            // add price to date
            priceByDate[date.format('MMM YYYY')][game] = (price/100);
            priceByDate[date.format('MMM YYYY')]['total'] += (price/100);

            // remove price from array
            flattenGamePrices.splice(i, 1);
          }
        });
      });

      console.log({priceByDate});
      

      return {
          ...defaultDatasets,
          borderColor: userOptions[data.user].color,
          data: Object.values(priceByDate).map((price) => price.total),
          label: data.user,
        };
    }

    const datasets = responses?.map(getPriceByDate);
    const labels = chartLabelsDates.map(date => date.format('MMM YYYY'));

    return {
      labels,
      datasets,
    };
  }
</script>

<div></div>
<Line data={getChartData()} />

