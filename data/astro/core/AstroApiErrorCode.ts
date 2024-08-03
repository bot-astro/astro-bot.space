export const enum AstroApiErrorCode {
  UNKNOWN = 'Something went wrong, please try again later',

  /// AUTH ///
  INVALID_DISCORD_CODE = 'Invalid Discord authentication',
  UNAUTHENTICATED = 'You are not logged in',

  /// CHARGEBEE ///
  SUBSCRIPTION_USED = 'You have already used all upgrades available for this subscription',

  CANNOT_MANAGE_GUILD = 'You do not have permissions to manage this server',
  GUILD_NOT_FOUND = 'Server not found',
  GUILD_ALREADY_ULTIMATE = 'This server is already upgraded to Ultimate',
  GUILD_UPGRADED_BY_OTHER = 'This server was upgraded by another user',

  INVALID_GUILD_SETTINGS = 'The new settings cannot be saved because they are malformed'
}