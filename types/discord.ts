export interface DiscordUser {
  id: string
  username: string
  avatar?: string
  discriminator: string
}

export interface DiscordGuild {
  id: string
  name: string
  icon?: string
  can_manage: boolean
}
