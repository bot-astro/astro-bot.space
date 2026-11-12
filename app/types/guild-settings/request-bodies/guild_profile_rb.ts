/**
 * Any null value resets the corresponding field to the default one
 */
export interface GuildProfileRB {
  nickname: string | null
  bio: string | null
  avatar_url: string | null
  banner_url: string | null
}
