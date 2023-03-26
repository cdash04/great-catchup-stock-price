<script lang="ts">
  import type { GamePrice } from '../model/game-price-response';
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

  export let data: GamePrice[];

  $: chartData = {
  labels: data.map(({ time }) => (dayjs(time))),
  datasets: [{
    fill: true,
    lineTension: 0.3,
    backgroundColor: 'rgba(225, 204,230, .3)',
    borderColor: 'rgb(205, 130, 158)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgb(205, 130,1 58)',
    pointBackgroundColor: 'rgb(255, 255, 255)',
    pointBorderWidth: 10,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgb(0, 0, 0)',
    pointHoverBorderColor: 'rgba(220, 220, 220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: data.map(({ price }) => (price)),
  }]
};
</script>

<Line data={chartData} />

