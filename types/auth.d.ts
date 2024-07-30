import type {DiscordUser} from "~/types/discord";

export interface UserSession {
  token: string;
  user: DiscordUser;
}