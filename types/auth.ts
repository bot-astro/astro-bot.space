interface AuthData {
  sessionToken: string;
  discordUser: DiscordUser;
}

interface DiscordUser {
  id: string;
  username: string;
  avatar?: string;
}

const authSessionStorageKeys = {
  authPreviousRoute: "auth-previous-route",
};
