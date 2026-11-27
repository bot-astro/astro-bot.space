# Updating the homepage server list

`home-showcase.ts` is a hand-picked list of servers, not live data.

1. **Pick servers.** Query BigQuery (`astro-405113.astro_bot.GUILD_SNAPSHOT`, latest snapshot per `guild_id`, with a `timestamp` filter) for the top ~300 by `member_count`. Keep famous servers of famous things (games, creators, brands), skip 18+ and personal servers.
2. **Fetch icons and check NSFW.** `GET https://discord.com/api/v10/guilds/{id}` with `Authorization: Bot <token>`. The token is `BOT__DISCORD_APPLICATION_TOKEN` in the backend Infisical project (`astro/.infisical.json`, env `prod`). Skip servers with `nsfw_level` above 0 or that return "Unknown Guild" (the bot left).
3. **Download icons** as static webp: `https://cdn.discordapp.com/icons/{id}/{icon}.webp?size=128` into `public/img/servers/{id}.webp`.
4. **Update the list** in `home-showcase.ts` (`name`, `members`, `guildId`, `icon`).
