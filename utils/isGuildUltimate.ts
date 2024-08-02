import type {GuildSettings} from "~/types/guild-settings/guild_settings";

export default function(guild_settings: GuildSettings) {
  const curr_date_millis = new Date().getTime()

  return guild_settings.upgraded_by_user_id
    || guild_settings.entitlements.find(e => {
      return e.ends_at === null || e.ends_at > curr_date_millis
    }) !== undefined
}