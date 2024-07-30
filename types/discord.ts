export interface DiscordUser {
  id: string
  username: string
  avatar?: string
  discriminator: string
}

/**
 * Guild obtained when fetching the list of guilds of a user
 *
 * @property id
 * @property name
 * @property icon can be undefined if the guild has no icon
 * @property can_manage whether the logged-in user has permissions to manage the Astro guild settings
 */
export interface DiscordGuild {
  id: string
  name: string
  icon?: string
  can_manage: boolean
}

export interface DiscordGuildChannel {
  id: string;
  name: string | null;
  /**
   * 0: text channel
   * 2: voice channel
   * 4: category
   * 13: stage channel
   */
  type: number;
  parent_id: string | null;
  parent_name: string | null;
}

export interface DiscordRole {
  id: string;
  name: string;
  color: number;
  position: number;
}