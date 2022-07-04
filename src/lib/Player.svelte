<script>
    export let x;
    export let y;
    export let playerNumber = 1;
    export let state;
    export let winner;
    let color = getColor();
    $: {
        if ($state === 'show' && $winner !== playerNumber) {
            color = 'grey'
        }
    }

    function getColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }

</script>

<div style="--color: {color}; --x: {x + '%'}; --y: {y + '%'}">
<svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 500 500"
        class="s-E9_ygDPpv--5"
        transform="translate(-100, -100)"
    >
        <title class="s-E9_ygDPpv--5">Player {playerNumber} </title>
        <circle cx="250" cy="250" r="250" />
        <defs class="s-E9_ygDPpv--5">
            <path
                d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
                id="textcircle"
                class="s-E9_ygDPpv--5"
            >
                <animateTransform
                    attributeName="transform"
                    begin="0s"
                    dur="30s"
                    type="rotate"
                    from="0 250 250"
                    to="360 250 250"
                    repeatCount="indefinite"
                    class="s-E9_ygDPpv--5"
                />
            </path>
        </defs>
        <text dy="0" textLength="1201" class="s-E9_ygDPpv--5">
            <textPath xlink:href="#textcircle" class="s-E9_ygDPpv--5">
                Player {playerNumber} • Player {playerNumber} •
            </textPath>
        </text>
        <text dy="80" textLength="1200" class="s-E9_ygDPpv--5">
            <textPath xlink:href="#textcircle" class="s-E9_ygDPpv--5">
                State {$state} • Winner {$winner}
            </textPath>
        </text>
    </svg>
</div>

<style>
    div {
        left: var(--x);
        top: var(--y);
        position: absolute;
        width: 35vw;
    }
    circle {
        fill: var(--color);
    }

    svg {
        width: 100%;
        user-select: none;
        transform: translate(-50%, -50%); 

    }
    svg textPath {
        font-size: 63px;
        font-family: sans-serif;
        text-transform: uppercase;
        letter-spacing: 20px;
        fill: white;
        background: white;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    svg text {
        user-select: none;
    }
</style>
