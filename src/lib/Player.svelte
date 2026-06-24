<script>
    export let x;
    export let y;
    export let playerNumber = 1;
    export let state = 'await';
    export let winner = null;

    function getColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    }

    const color = getColor();
    const ringId = `player-ring-${Math.random().toString(36).slice(2)}`;
    const gradientId = `sphere-glow-${Math.random().toString(36).slice(2)}`;
    $: displayColor = state === 'show' && winner !== playerNumber
        ? 'rgba(255, 255, 255, 0.16)'
        : color;
</script>

<div class="marker" style="--color: {displayColor}; --x: {x + '%'}; --y: {y + '%'}">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        aria-hidden="true"
    >
        <title>Player {playerNumber + 1}</title>
        <defs>
            <path
                id={ringId}
                d="M250,55a195,195 0 1,1 0,390a195,195 0 1,1 0,-390"
            />
            <radialGradient id={gradientId} cx="35%" cy="28%" r="72%">
                <stop offset="0%" stop-color="rgba(255,255,255,0.82)" />
                <stop offset="18%" stop-color="rgba(255,255,255,0.18)" />
                <stop offset="100%" stop-color="rgba(0,0,0,0.18)" />
            </radialGradient>
        </defs>

        <circle class="sphere" cx="250" cy="250" r="178" />
        <circle class="shine" cx="250" cy="250" r="178" fill={'url(#' + gradientId + ')'} />

        <g class="spin">
            <text>
                <textPath href={'#' + ringId} textLength="1220">
                    Player {playerNumber + 1} - hold steady - Player {playerNumber + 1} - hold steady -
                </textPath>
            </text>
        </g>
    </svg>
</div>

<style>
    .marker {
        left: var(--x);
        position: absolute;
        top: var(--y);
        transform: translate(-50%, -50%);
        width: clamp(132px, 36vmin, 260px);
        aspect-ratio: 1;
        pointer-events: none;
    }

    .sphere {
        fill: var(--color);
        transition: fill 180ms ease;
    }

    .shine {
        mix-blend-mode: screen;
        opacity: 0.82;
    }

    .spin {
        animation: spin 18s linear infinite;
        transform-origin: 250px 250px;
    }

    text {
        fill: rgba(255, 255, 255, 0.9);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 28px;
        font-weight: 800;
        letter-spacing: 4px;
        text-transform: uppercase;
        user-select: none;
    }

    svg {
        display: block;
        height: 100%;
        width: 100%;
        overflow: visible;
        user-select: none;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .spin {
            animation: none;
        }
    }
</style>
