import {useApiFetch} from "~/composables/useApiFetch";
import {AstroApiErrorCode} from "~/data/astro/core/AstroApiErrorCode";
import {AstroApiError} from "~/data/astro/core/AstroApiError";
import type {DashboardGuild} from "~/types/dashboard";
import type {GuildSettings} from "~/types/guild-settings/guild_settings";

/**
 * Api client to interact with the Astro APIs
 */
export class AstroApiClient {
  // base url will be injected from env variables on global instance creation
  private readonly base_url

  constructor(base_url: string) {
    this.base_url = base_url
  }

  /**
   * Constructs the url for an API call
   *
   * @param path
   * @return the constructed api url with the base_url
   */
  private url = (path: string) => `${this.base_url}/${path}`

  /**
   * Gets the list of guilds of the logged-in user
   *
   * @throws AstroApiError
   * @return the list of guilds of the logged-in user
   */
  public get_guilds = async () : Promise<DashboardGuild[]> => {
    const res = await useApiFetch<DashboardGuild[]>(this.url('dashboard/guilds'))

    if (res.error.value !== null) {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }

    return res.data.value ?? []
  }

  public get_guild_settings = async () : Promise<GuildSettings> => {
    return Promise.reject('todo')
  }
}