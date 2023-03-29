<script lang="ts">
  import GamePriceChart from './lib/game-price-chart.svelte';
</script>

<main>
  <div class="App">
    <div class="game-prices">
      <div class="game-price">
        <GamePriceChart />
      </div>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .App {
    width: 100%;
  }
</style>
