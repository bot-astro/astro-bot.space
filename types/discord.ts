export interface DiscordUser {
  id: string
  username: string
  avatar?: string
  email?: string
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

export interface DiscordRegion {
  key: string;
  name: string;
  emoji: string | null;
}

export const discord_regions: DiscordRegion[] = [
  { key: "brazil", name: "Brazil", emoji: "\ud83c\udde7\ud83c\uddf7" },
  { key: "hongkong", name: "Hong Kong", emoji: "\ud83c\udded\ud83c\uddf0" },
  { key: "india", name: "India", emoji: "\ud83c\uddee\ud83c\uddf3" },
  { key: "japan", name: "Japan", emoji: "\ud83c\uddef\ud83c\uddf5" },
  { key: "milan", name: "Milan", emoji: "\ud83c\uddee\ud83c\uddf9" },
  { key: "rotterdam", name: "Rotterdam", emoji: "\ud83c\uddf3\ud83c\uddf1" },
  { key: "russia", name: "Russia", emoji: "\ud83c\uddf7\ud83c\uddfa" },
  { key: "singapore", name: "Singapore", emoji: "\ud83c\uddf8\ud83c\uddec" },
  { key: "southafrica", name: "South Africa", emoji: "\ud83c\uddff\ud83c\udde6" },
  { key: "south-korea", name: "South Korea", emoji: "\ud83c\uddf0\ud83c\uddf7" },
  { key: "sydney", name: "Sydney", emoji: "\ud83c\udde6\ud83c\uddfa" },
  { key: "us-central", name: "US Central", emoji: "\ud83c\uddfa\ud83c\uddf8" },
  { key: "us-east", name: "US East", emoji: "\ud83c\uddfa\ud83c\uddf8" },
  { key: "us-south", name: "US South", emoji: "\ud83c\uddfa\ud83c\uddf8" },
  { key: "us-west", name: "US West", emoji: "\ud83c\uddfa\ud83c\uddf8" },
  { key: "automatic", name: "Automatic", emoji: null }
];
