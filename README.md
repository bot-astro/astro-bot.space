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

## Deploy (Cloudflare Pages)

SSR on Cloudflare Pages (Nitro preset `cloudflare_pages`, picked automatically when building on Cloudflare), `@nuxt/content` stored in D1 (binding `DB`, switched on by Nuxt Content itself). There is deliberately **no `wrangler.jsonc`**: with one, Pages would ignore the dashboard bindings. Project settings (build command, env vars, D1 binding, `nodejs_compat`) live in the Pages project. `ASTRO_API_BASE_URL` and `CHARGEBEE_SITE` are read at **build time** (`nuxt.config.ts`), so each environment is its own Pages project with its own variables.

|                      | Production                                     | Staging                                              |
| -------------------- | ---------------------------------------------- | ---------------------------------------------------- |
| Pages project        | `astro-bot-space`                              | `astro-bot-space-staging`                            |
| Production branch    | `main`                                         | `hyperion-rewrite`                                   |
| Domain               | `astro-bot.space`                              | `staging.astro-bot.space`                            |
| Build command        | `pnpm install --frozen-lockfile && pnpm build` | same                                                 |
| Output directory     | `dist`                                         | `dist`                                               |
| D1 binding `DB`      | `astro-bot-space-prod`                         | `astro-bot-space-staging`                            |
| `ASTRO_API_BASE_URL` | `https://api.astro-bot.space`                  | `https://api-staging.astro-bot.space`                |
| `CHARGEBEE_SITE`     | `astro-bot`                                    | `astro-bot-test`                                     |
| `NUXT_SITE_ENV`      | `production`                                   | `staging` (makes `@nuxtjs/robots` disallow indexing) |
| `NUXT_SITE_URL`      | `https://astro-bot.space`                      | `https://staging.astro-bot.space`                    |
| `NODE_VERSION`       | `24`                                           | `24`                                                 |

Compatibility: date `2025-07-15`, flag `nodejs_compat`. Backend CORS and cookies only accept the exact frontend origin of the environment.
