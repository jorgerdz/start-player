// svelte.config.js
import adapter from '@sveltejs/adapter-static';
const dev = process.env.NODE_ENV === 'development';

export default {
    kit: {
        adapter: adapter({
            pages: 'dist',
            assets: 'dist',
            fallback: null,
            precompress: false,
            paths: {
                base: dev ? '' : '/start-player'
            }
        })
    }
};