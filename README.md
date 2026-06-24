# Start Player

Svelte/Vite app configured for Cloudflare Pages.

This repo pins Node.js `22.16.0` in `.node-version` for Cloudflare Pages and Wrangler compatibility.

## Local Development

```sh
npm ci
npm run dev
```

## Production Build

```sh
npm run build
npm run preview
```

The production build writes static assets to `dist`.

## Cloudflare Pages

Create or connect a Cloudflare Pages project named `start-player` with these build settings:

- Root directory: repository root
- Install command: `npm ci`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `22.16.0`, read from `.node-version`

Cloudflare Pages can deploy automatically from the connected Git branch. For a manual deploy from this machine, authenticate Wrangler first and run:

```sh
npm run deploy
```

The Pages output directory is also recorded in `wrangler.jsonc`.
