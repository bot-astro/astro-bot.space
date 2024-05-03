export class ApiEndpoints {
  public static STATUS = 'status'
  public static CHARGEBEE_PORTAL_SESSION = '/chargebee/portal-session'

  public static LOGIN = (code: string) => `/dashboard/auth/login/${code}`
  public static LOGOUT = '/dashboard/auth/logout'

  public static USERS_ME = '/dashboard/users/@me'

  public static GUILDS = '/dashboard/guilds'
  public static GUILD_CHANNELS = (guildID: string) => `/dashboard/guilds/${guildID}/channels`
  public static GUILD_ROLES = (guildID: string) => `/dashboard/guilds/${guildID}/roles`
  public static GUILD_SETTINGS = (guildID: string) => `/dashboard/guilds/${guildID}/data`
}
