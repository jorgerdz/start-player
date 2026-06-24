import { derived, readable, writable } from 'svelte/store';

const STATES = ['await', 'decide', 'show'];
const MIN_PLAYERS = 2;

export const state = writable(STATES[0]);

export const touches = readable([], function start(set) {
    function getTouchPosition(touchEvent) {
        return {
            x: (touchEvent.clientX / window.innerWidth) * 100,
            y: (touchEvent.clientY / window.innerHeight) * 100
        };
    }

    function update(touches) {
        set(touches.map(getTouchPosition));
    }

    const handleTouch = (event) => {
        update([...event.touches]);
    };

    document.addEventListener('touchstart', handleTouch);
    document.addEventListener('touchmove', handleTouch);
    document.addEventListener('touchend', handleTouch);
    document.addEventListener('touchcancel', handleTouch);

    return () => {
        document.removeEventListener('touchstart', handleTouch);
        document.removeEventListener('touchmove', handleTouch);
        document.removeEventListener('touchend', handleTouch);
        document.removeEventListener('touchcancel', handleTouch);
    };
});

export const playerCount = derived(touches, $players => $players.length);

let commitTimeoutId;
export const commitPlayers = derived(playerCount, ($playerCount, set) => {
    clearTimeout(commitTimeoutId);
    state.set(STATES[0]);
    set(0);

    if ($playerCount < MIN_PLAYERS) {
        return;
    }

    commitTimeoutId = setTimeout(() => {
        state.set(STATES[1]);
        set($playerCount);
    }, 2000);

    return () => {
        clearTimeout(commitTimeoutId);
    };
}, 0);

let winnerTimeoutId;
export const winner = derived(commitPlayers, ($totalPlayers, set) => {
    clearTimeout(winnerTimeoutId);
    set(null);

    if (!$totalPlayers) {
        return;
    }

    winnerTimeoutId = setTimeout(() => {
        const player = Math.floor(Math.random() * $totalPlayers);
        state.set(STATES[2]);
        set(player);
    }, 1000);

    return () => {
        clearTimeout(winnerTimeoutId);
    };
}, null);
