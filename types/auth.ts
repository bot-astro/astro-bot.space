// eslint-disable-next-line unused-imports/no-unused-vars
interface AuthData {
  token: string
  user: DiscordUser
}

interface DiscordUser {
  id: string
  username: string
  avatar?: string
}
