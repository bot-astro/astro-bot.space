// eslint-disable-next-line unused-imports/no-unused-vars
interface AuthData {
  token: string
  user: DiscordUser,
}

interface AuthDataWithGuild {
  token: string
  user: DiscordUser,
  guild?: DiscordOAuthGuild
}

interface DiscordUser {
  id: string
  username: string
  avatar?: string
}

interface DiscordOAuthGuild {
  id: string,
  name: string,
  icon?: string
}
