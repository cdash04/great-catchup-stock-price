<script lang="ts">
    import { onMount } from 'svelte';
    import client from '../client/game-price';
    import Chart from './price-chart.svelte';
    import type { GamePriceResponse } from '../model/game-price-response';

    export let name: 'Josni' | 'Will';

    let chartData: GamePriceResponse = undefined;

    onMount(() => {
        client.getGamePrices(name).then(({data}) => {
            console.log(data);
            chartData = data;
        });
    });
</script>

<style>
    .game-price-chart {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>

<div class="game-price-chart">
    {#if chartData}
         {#each chartData.games as game}
              <div>{game.game}</div>
              <Chart data={game.prices} />
         {/each}
    {/if}
</div>
