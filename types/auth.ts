interface AuthStore {
  sessionToken: string;
  discordUser: DiscordUser;
}

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
}
