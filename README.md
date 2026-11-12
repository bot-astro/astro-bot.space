# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Deploy (Cloudflare Workers)

SSR on Cloudflare Workers (Nitro preset `cloudflare_module`, picked automatically when building on Cloudflare), static files served as Workers assets, `@nuxt/content` stored in D1 (binding `DB`, see `wrangler.jsonc`). `ASTRO_API_BASE_URL` and `CHARGEBEE_SITE` are read at **build time** (`nuxt.config.ts`), so each environment needs its own build with its own variables.

|                      | Production                    | Staging                                              |
| -------------------- | ----------------------------- | ---------------------------------------------------- |
| Branch               | `main`                        | `hyperion-rewrite`                                   |
| Worker               | `astro-bot-space`             | `astro-bot-space-staging`                            |
| Domain               | `astro-bot.space`             | `staging.astro-bot.space`                            |
| Build command        | `pnpm build`                  | `pnpm build`                                         |
| Deploy command       | `npx wrangler deploy`         | `npx wrangler deploy --env staging`                  |
| `ASTRO_API_BASE_URL` | `https://api.astro-bot.space` | `https://api-staging.astro-bot.space`                |
| `CHARGEBEE_SITE`     | `astro-bot`                   | `astro-bot-test`                                     |
| `NUXT_SITE_ENV`      | `production`                  | `staging` (makes `@nuxtjs/robots` disallow indexing) |
| `NUXT_SITE_URL`      | `https://astro-bot.space`     | `https://staging.astro-bot.space`                    |

Build settings: Node 24 (`.node-version`), pnpm 10, root directory `/`. Backend CORS and cookies only accept the exact frontend origin of the environment.
