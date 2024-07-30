export const enum AstroApiErrorCode {
  UNKNOWN = 'Something went wrong, please try again later',

  /// AUTH ///
  INVALID_DISCORD_CODE = 'Invalid Discord authentication',
  UNAUTHENTICATED = 'You are not logged in',

  CANNOT_MANAGE_GUILD = 'You do not have permissions to manage this server',
  GUILD_NOT_FOUND = 'Server not found',
}