import type { DiscordGuildChannel } from '~/types/discord'
import type { GuildSettings } from '~/types/guild-settings/guild_settings'

export interface GuildSetupResult {
  guild_settings: GuildSettings
  category: DiscordGuildChannel
  interface_channel: DiscordGuildChannel
  generator_channel: DiscordGuildChannel
  updates_channel?: DiscordGuildChannel | null
}
