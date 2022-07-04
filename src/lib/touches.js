import { derived, readable, writable } from 'svelte/store';
const STATES = ['await', 'decide', 'show']
const MIN_PLAYERS = 0;

export const state = writable(STATES[0])

export const touches = readable([], function start(set) {
    function getTouchPosition(touchEvent) {
        return {
            x: (touchEvent.clientX / window.screen.width) * 100,
            y: (touchEvent.clientY / window.screen.height) * 100
        }
    }
    
    function update(touches) {
        set(touches.map(getTouchPosition))
    }

    document.addEventListener("touchstart", (event) => {
        update([...event.touches])
    });

    document.addEventListener("touchmove", (event) => {
        update([...event.touches])
    });

    document.addEventListener("touchend", (event) => {
        update([...event.touches])
    });
});

export const playerCount = derived(touches, $players => $players.length)

let timeoutId1;
export const commitPlayers = derived(playerCount, ($playerCount, set) => {
    state.set(STATES[0])
    if ($playerCount < MIN_PLAYERS) {
        return;
    }
        
    clearTimeout(timeoutId1);
    timeoutId1 = setTimeout(() => {
        state.set(STATES[1])
        set($playerCount);
    }, 2000);
}, 0);

let timeoutId2;
export const winner = derived(commitPlayers, ($totalPlayers, set) => {
    let player = Math.floor(Math.random() * ($totalPlayers + 1))
    clearTimeout(timeoutId2);
    timeoutId2 = setTimeout(() => {
        state.set(STATES[2])
        set(player);
    }, 1000);
}, 0);
