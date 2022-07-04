<script>
  import Player from "./lib/Player.svelte";
  import { touches, playerCount, winner, commitPlayers, state } from "./lib/touches.js";
  import './lib/reset';

  state.subscribe((value) => {
    console.log(value)
  })

  playerCount.subscribe((value) => {
    console.log('player changed ', value)
  })

  commitPlayers.subscribe((value) => {
    console.log('players committed', value)
  })

  winner.subscribe((value) => {
    console.log('winner chosen', value)
  })
  </script>

<main>
  {#each $touches as touch, i}
    <Player x={touch.x} y={touch.y} state={state} winner={winner} playerNumber={i} />
  {/each}
</main>

<style>
  main {
    background-color: black;
    width: 100vw;
    height: 100vh;
  }
</style>
