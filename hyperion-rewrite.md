# Hyperion rewrite

## V2 migration progress

Source of truth for routes: `../astro/shared/core/.../CentralApiEndpoint.kt`.
All client calls live in `app/data/astro/AstroApiClient.ts`. `nuxt typecheck` matches the pre-migration baseline (11 pre-existing errors, none from this work).

Migrated:

- [x] auth: `/v2/auth/discord`, `/v2/auth/logout`, `/v2/auth/me` (`User.avatar` is now `string | null`)
- [x] discord: permissions, guilds, channels, roles (`DiscordGuild` gained `permissions`, `preferred_locale`, `icon` is nullable)
- [x] chargebee: portal-session, checkout, subscriptions
- [x] guild settings: `GET/POST /v2/guilds/{id}/settings`. The update body is now `{ allow_missing_admin_perms, locale }` (note the plural, and `locale` is required). `GuildSettings` gained `locale`, `nickname`, `bio`, `avatar_url`, `banner_url`
- [x] premium: `POST/DELETE /v2/guilds/{id}/premium/upgrade`. Upgrade body is `{ subscription_id }`, both return `GuildSettings`
- [x] VC cache: `DELETE /v2/guilds/{id}/settings/vcs/cache`
- [x] errors: `GET /v2/guilds/{id}/errors`. `GSError` gained `id`, `code`, and `guide` is `null` instead of undefined
- [x] generators: `/v2/guilds/{id}/settings/generators[/{generatorId}]`. Create now takes `{ name, category_id }` (`GeneratorCreateRB`). `GSGenerator`: added `default_status`, several numeric fields are now nullable, `badwords_allowed` removed
- [x] voice roles -> connections: `/v2/guilds/{id}/settings/connections[/{connectionId}]`. `GSVoiceRole.permanent_dashboard` renamed to `permanent`

## Previously missing endpoints, now migrated

- [x] `POST /v2/guilds/{id}/premium/entitlements/refresh`
- [x] `DELETE /v2/guilds/{id}/errors`
- [x] templates: `/v2/guilds/{id}/settings/templates[/{templateId}]` (create ignores the sent `id`, the backend generates it)

## New V2 features to implement in the frontend

Client methods already exist for interfaces, there is no UI/mutation/query for them yet:

- interfaces: `create_interface` (`{ channel_id }`), `update_interface`, `delete_interface` (keyed by message id)

Not in the client yet:

- `GET /v2/discord/users/@me`
- `/v2/guilds/{guildId}/media` (create takes `{ media_type }`)
- `POST /v2/guilds/{guildId}/settings/profile` (`nickname`, `bio`, `avatar_url`, `banner_url`; null resets to default)
- `GET /v2/guilds/{guildId}/errors` query params `from_timestamp` and `locale`
- premium-gated settings now rejected by the backend (`APremiumRequiredException`): fallback generator, VC name templates, owner role, auto chat/waiting, chat message, interface embed/button order. The UI should surface these
