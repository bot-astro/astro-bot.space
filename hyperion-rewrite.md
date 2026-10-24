# Hyperion rewrite

Port everything still missing from `../astro-bot.space-old` into this Nuxt 4 app (`app/` dir layout, docs: https://nuxt.com/docs/4.x/getting-started/introduction).

## Rules

- Port code only: no logic changes, no string changes (copy, toasts, meta titles/descriptions stay verbatim), no new features.
- Modernize where the old code is outdated for Nuxt 4 (paths under `app/`, `useHead` / `definePageMeta`, Tailwind v4 classes, explicit imports where auto-import no longer applies, `useAsyncData` / query composables already in `app/data/astro`).
- Fix obvious bugs found while porting only if the fix is behavior-preserving (e.g. a missing import).
- One page / endpoint at a time. All API calls go through `app/data/astro/AstroApiClient.ts` (already V2).

## Env vars (Infisical)

Env vars are managed with Infisical (project linked via `.infisical.yaml`), not committed `.env` files. Whenever a step needs a new env var, add it with the CLI (`infisical secrets set KEY=value --env=<env>`) to **all** environments: `dev`, `staging`, `prod` (use `CHANGE_ME` if the value is unknown), and expose it in `nuxt.config.ts` `runtimeConfig`.

Auth changed in V2: the frontend only navigates to `{ASTRO_API_BASE_URL}/v2/auth/discord?redirect_path=...&invite=...&invite_guild_id=...` (`AstroApiClient.loginViaDiscord`), the backend builds the Discord OAuth URL. So `LOGIN_OAUTH_URL`, `INVITE_OAUTH_URL` and `INVITE_GUILD_OAUTH_URL` are **not needed** anymore, and `useAuth` / `useInvite` are already ported.

Needed vars:

- `ASTRO_API_BASE_URL`: added to dev (copied from the old `API_BASE_URL`), staging and prod (`CHANGE_ME`, set the real value)
- `CHARGEBEE_SITE`: added to dev, staging, prod as `CHANGE_ME`, set the real value. Feeds `runtimeConfig.public.chargebee_site` for `Chargebee.init` (step 2)

Leftovers in dev Infisical that can be deleted once the rewrite ships: `API_BASE_URL`, `LOGIN_OAUTH_URL`, `INVITE_OAUTH_URL`, `INVITE_GUILD_OAUTH_URL`.

## Port steps

1. **Config + assets** (DONE)
   - Copy `content/` (5 guides + 3 legal `.md`), `public/guides`, `public/img`, `public/new-interface-image.png`.
   - `nuxt.config.ts`: re-add SEO `head` meta (title, description, og), `content.markdown.toc` (depth 3), `@nuxtjs/robots` + `@nuxtjs/sitemap` + `site` config.
   - Runtime config: add `chargebee_site` only (OAuth URLs are obsolete, see Env vars). `StorageKeys.ts` is unreferenced in the old repo, not ported.
   - Note: `nuxt prepare` warns `nuxt-site-config` (used by robots/sitemap/`site`) is disabled since it requires Nuxt ^4.6.0 and the app is on 4.5.2. Fixed by upgrading to Nuxt 4.6.2. That pulls `@vue/*` 3.5.44, so `vue` is pinned to 3.5.44 too: two Vue versions in the tree made every SSR page 500 (`Cannot read properties of null (reading 'ce')`).
2. **Chargebee.js** (DONE) (checked against https://www.chargebee.com/docs/billing/2.0/hosted-capabilities/checkout-integration)
   - Old code loaded the script via `head.script` with `data-cb-site` and called `Chargebee.getInstance()`. Docs say to call `Chargebee.init({ site })` once, then `getInstance()` elsewhere.
   - Add a client-only plugin (`app/plugins/chargebee.client.ts`) that loads `https://js.chargebee.com/v2/chargebee.js` and calls `Chargebee.init({ site: runtimeConfig.public.chargebee_site })`. Remove the old `head.script` entry rather than adding it.
   - `openCheckout` must run from a user click (mobile browsers block the window otherwise). Old `subscribe()` is already click-triggered, keep it that way.
   - Hosted page URLs expire after 3 hours and must not go in a custom iframe. The `hostedPage` callback must return a fresh page each call (it does).
   - Add a global type for `Chargebee` (`app/types/chargebee.d.ts`) so `nuxt typecheck` passes.
3. **Layouts** (DONE): `layouts/dashboard.vue`, `layouts/guide.vue` (new `default.vue` already exists).
4. **Static pages** (DONE): `privacy`, `terms`, `refund-policy` (render `@nuxt/content` via `queryCollection`, Nuxt Content v3 API, add `content.config.ts`).
5. **Guides** (DONE): `guides/index`, `basic`, `generator`, `interface`, `template`, `voice-role`.
6. **Simple flows** (DONE): `invite.vue`, `billing.vue` (portal session redirect; import `toast` explicitly), `ultimate.vue` (checkout; old file used `toast` without importing it).
7. **Guild dashboard** (PORTED, needs click-through + decisions below), in this order, replacing the 3-line `app/pages/guilds.vue` stub with `guilds/index.vue`:
   1. `guilds/index.vue` (guild picker)
   2. `guilds/[guild_id]/index.vue` (guild settings)
   3. `guilds/[guild_id]/errors/index.vue`
   4. `guilds/[guild_id]/interfaces/index.vue`
   5. `guilds/[guild_id]/voice-roles/index.vue` + `[voice_role_id].vue`
   6. `guilds/[guild_id]/templates/index.vue` + `[template_id].vue`
   7. `guilds/[guild_id]/generators/index.vue` + `[generator_id].vue` (1320 lines, port last; split only if it improves the port without changing behavior)
      Port notes: all guild pages are copied from the old repo and build/lint clean. `const enum` -> `enum` in `app/types/guild-settings/*` and `AstroApiErrorCode` (Vite does not inline const enums across files; the templates use them as values). Prettier turns multi-statement inline handlers into invalid code, use arrow functions with a block.
      Decisions made: generator create now opens a dialog (name + category select), the badwords toggle was removed (gone in V2), and the three pages that used `isError` now use `error` so the "invite the bot" redirect fires.
      `nuxt typecheck` and lint are clean (0 errors).
8. **Verify**: `nuxt typecheck` and lint pass, click through every route, check all internal links and redirects.

## New V2 features (do NOT implement during the port, separate task afterwards)

- interfaces: client methods exist (`create_interface` with `{ channel_id }`, `update_interface`, `delete_interface` keyed by message id), no UI / mutation / query yet
- `GET /v2/discord/users/@me` (not in client)
- `/v2/guilds/{guildId}/media` (create takes `{ media_type }`) (not in client)
- `POST /v2/guilds/{guildId}/settings/profile` (`nickname`, `bio`, `avatar_url`, `banner_url`; null resets to default) (not in client)
- `GET /v2/guilds/{guildId}/errors` query params `from_timestamp` and `locale`
- premium-gated settings now rejected by the backend (`APremiumRequiredException`): fallback generator, VC name templates, owner role, auto chat/waiting, chat message, interface embed/button order. The UI should surface these
