import type {DiscordUser} from "~/types/discord";

export interface SessionData {
  token: string
  user: DiscordUser
}

export interface LoginResponse {
  token: string
  user: DiscordUser
  guild?: LoginGuildResponse;
}

export interface LoginGuildResponse {
  id: string;
  name: string;
  icon?: string;
}