# Astro website

The website and dashboard of [Astro](https://github.com/bot-astro/astro), built with Nuxt 4.  
The dashboard talks to `api-central` of the backend, guides and legal pages are markdown files in `content`.  
Translations are managed on Crowdin (`i18n` folder), the language of the guides is english only.

## Development

- Node 24 and pnpm
- [Infisical CLI](https://infisical.com/docs/cli/overview), the env variables (`ASTRO_API_BASE_URL`, `CHARGEBEE_SITE`) come from there

```bash
pnpm install
pnpm env        # exports the Infisical secrets in .env
pnpm dev        # http://localhost:3000
pnpm dev:mock   # same, but serves a fake guilds list instead of calling the API
```

Before committing run `pnpm format:lint`.

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
