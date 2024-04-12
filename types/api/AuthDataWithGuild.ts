export interface AuthDataWithGuild {
  token: string
  user: DiscordUser
  guild?: DiscordGuildFromOAuth
}
