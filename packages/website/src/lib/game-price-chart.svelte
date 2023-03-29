<script lang="ts">
    import client from '../client/game-price';
    import Chart from './price-chart.svelte';

    const chartDataPromise = Promise.all(
        [
            client.getGamePrices('Josni').then(response => response.data),
            client.getGamePrices('Will').then(response => response.data)
        ]
    );
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
    {#await chartDataPromise then chartData}
        <Chart responses={chartData} />
    {/await}
</div>
