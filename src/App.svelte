<script>
  import { onMount } from "svelte";
  import Player from "./lib/Player.svelte";
  import { touches, winner, state } from "./lib/touches.js";
  import './lib/reset';

  let showWelcome = true;
  let showDesktopWarning = false;

  onMount(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    showDesktopWarning = !hasTouch && !hasCoarsePointer;
  });
</script>

<main>
  {#each $touches as touch, i}
    <Player x={touch.x} y={touch.y} state={$state} winner={$winner} playerNumber={i} />
  {/each}

  {#if showWelcome}
    <section class="modal-backdrop" aria-labelledby="welcome-title" aria-modal="true" role="dialog">
      <div class="modal">
        {#if showDesktopWarning}
          <p class="alert" role="alert">This needs a touch screen. It will not work with a mouse on desktop.</p>
        {/if}

        <div class="modal-topline">
          <span>touch selector</span>
          <span>2+ players</span>
        </div>

        <div class="touch-demo" aria-hidden="true">
          <span class="demo-orb demo-orb-one">1</span>
          <span class="demo-orb demo-orb-two">2</span>
          <span class="demo-orb demo-orb-three">3</span>
          <span class="demo-ring"></span>
        </div>

        <h1 id="welcome-title">Start Player</h1>
        <p class="lede">Settle the first turn without debate.</p>
        <div class="steps">
          <p><strong>Press.</strong> Everyone places a finger on the screen.</p>
          <p><strong>Hold.</strong> After a short pause, one player stays lit and starts.</p>
        </div>

        <button type="button" on:click={() => showWelcome = false}>
          Start choosing
        </button>
      </div>
    </section>
  {:else if showDesktopWarning}
    <div class="desktop-alert" role="alert">
      Touch screen required. Desktop mouse input is not supported.
    </div>
  {/if}
</main>

<style>
  main {
    background-color: black;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    touch-action: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .modal-backdrop {
    align-items: center;
    background: rgba(0, 0, 0, 0.72);
    display: flex;
    inset: 0;
    justify-content: center;
    padding: 24px;
    position: fixed;
    z-index: 10;
  }

  .modal {
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(246, 249, 255, 0.94)),
      #ffffff;
    border-radius: 8px;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
    color: #151515;
    max-width: 420px;
    overflow: hidden;
    padding: 26px;
    position: relative;
    width: min(100%, 420px);
  }

  .modal,
  .modal * {
    box-sizing: border-box;
  }

  .modal::before {
    background: linear-gradient(90deg, #3cf0d0, #ff4fd8, #ffe66d);
    content: "";
    height: 5px;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  .modal-topline {
    align-items: center;
    color: #4d5565;
    display: flex;
    font-size: 12px;
    font-weight: 800;
    justify-content: space-between;
    letter-spacing: 0.12em;
    margin-bottom: 16px;
    text-transform: uppercase;
  }

  .modal-topline span:last-child {
    background: #151515;
    border-radius: 999px;
    color: #ffffff;
    letter-spacing: 0.04em;
    padding: 6px 10px;
  }

  .touch-demo {
    background:
      radial-gradient(circle at 50% 50%, rgba(60, 240, 208, 0.22), transparent 42%),
      linear-gradient(135deg, #151515, #202536);
    border-radius: 8px;
    height: 142px;
    margin-bottom: 22px;
    overflow: hidden;
    position: relative;
  }

  .touch-demo::after {
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
    background-size: 28px 28px;
    content: "";
    inset: 0;
    opacity: 0.55;
    position: absolute;
  }

  .demo-orb {
    align-items: center;
    border: 2px solid rgba(255, 255, 255, 0.76);
    border-radius: 50%;
    color: #151515;
    display: flex;
    font-size: 16px;
    font-weight: 900;
    height: 54px;
    justify-content: center;
    position: absolute;
    width: 54px;
    z-index: 2;
  }

  .demo-orb-one {
    animation: pulse 1800ms ease-in-out infinite;
    background: #3cf0d0;
    left: 54px;
    top: 42px;
  }

  .demo-orb-two {
    animation: pulse 1800ms ease-in-out 180ms infinite;
    background: #ff4fd8;
    left: 164px;
    top: 28px;
  }

  .demo-orb-three {
    animation: pulse 1800ms ease-in-out 360ms infinite;
    background: #ffe66d;
    right: 54px;
    top: 58px;
  }

  .demo-ring {
    animation: rotate 9s linear infinite;
    border: 1px dashed rgba(255, 255, 255, 0.48);
    border-radius: 50%;
    height: 118px;
    left: calc(50% - 59px);
    position: absolute;
    top: 12px;
    width: 118px;
    z-index: 1;
  }

  h1 {
    font-size: 38px;
    line-height: 0.95;
    margin: 0 0 12px;
  }

  p {
    font-size: 16px;
    line-height: 1.45;
    margin: 0 0 14px;
  }

  .lede {
    color: #3a4352;
    font-size: 18px;
    margin-bottom: 18px;
  }

  .steps {
    border-left: 3px solid #3cf0d0;
    margin-bottom: 18px;
    padding-left: 14px;
  }

  .steps p {
    margin-bottom: 10px;
  }

  button {
    background: #151515;
    border: 0;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font: inherit;
    font-weight: 700;
    margin-top: 8px;
    min-height: 48px;
    padding: 0 18px;
    width: 100%;
  }

  button:focus-visible {
    outline: 3px solid #3cf0d0;
    outline-offset: 3px;
  }

  .alert,
  .desktop-alert {
    background: #fff3cd;
    border: 1px solid #f4ce66;
    border-radius: 8px;
    color: #4f3900;
  }

  .alert {
    margin-bottom: 18px;
    padding: 12px;
  }

  .desktop-alert {
    left: 50%;
    max-width: calc(100vw - 32px);
    padding: 10px 14px;
    position: fixed;
    top: 16px;
    transform: translateX(-50%);
    z-index: 5;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.08);
    }
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .demo-orb,
    .demo-ring {
      animation: none;
    }
  }
</style>
