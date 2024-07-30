import {useApiFetch} from "~/composables/useApiFetch";
import {AstroApiErrorCode} from "~/data/astro/core/AstroApiErrorCode";
import {AstroApiError} from "~/data/astro/core/AstroApiError";
import type {GuildSettings} from "~/types/guild-settings/guild_settings";
import type {LoginResponse} from "~/types/session";
import type {DiscordGuild, DiscordUser} from "~/types/discord";
import type {UserChargebeeSubscriptions} from "~/types/user";
import type {GSError} from "~/types/guild-settings/error";

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
  private url = (path: string) => path.startsWith('/') ? `${this.base_url}${path}` : `${this.base_url}/${path}`


  /// AUTH ///
  // those are unused because you cannot use useFetch in nuxt api routes //

  public login = async (code: string): Promise<LoginResponse> => {
    const res = await useApiFetch<LoginResponse>(
      this.url(`/dashboard/auth/login/${code}`),
      {
        credentials: 'include'
      },
      false
    )

    console.log(res)

    if (res.data.value !== null) {
      return res.data.value
    }

    if (res.error.value?.status === 400) {
      throw new AstroApiError(AstroApiErrorCode.INVALID_DISCORD_CODE)
    }

    throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
  }

  public logout = async (): Promise<void> => {
    await useApiFetch(this.url('/dashboard/auth/logout'), {}, false)
  }


  /// USER ///
  public get_self_user = async (): Promise<DiscordUser> => {
    const res = await useApiFetch<DiscordUser>(this.url('/dashboard/users/@me'))

    if (res.data.value !== null) {
      return res.data.value
    } else {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }
  }


  /// CHARGEBEE ///
  public get_chargebee_portal_session_url = async (): Promise<string> => {
    const res = await useApiFetch<string>(this.url('/chargebee/portal-session'))

    if (res.data.value !== null) {
      return res.data.value
    } else {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }
  }

  public get_user_chargebee_subscriptions = async (): Promise<UserChargebeeSubscriptions> => {
    const res = await useApiFetch<UserChargebeeSubscriptions>(this.url('/chargebee/subscriptions'))

    if (res.data.value !== null) {
      return res.data.value
    } else {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }
  }



  /// GUILDS ///
  /**
   * Gets the list of guilds of the logged-in user
   *
   * @throws AstroApiError
   * @return the list of guilds of the logged-in user
   */
  public get_guilds = async () : Promise<DiscordGuild[]> => {
    const res = await useApiFetch<DiscordGuild[]>(this.url('dashboard/guilds'))

    if (res.error.value !== null) {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }

    return res.data.value ?? []
  }


  /// SETTINGS ///
  public get_guild_settings = async (guild_id: string) : Promise<GuildSettings> => {
    const res = await useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data`))

    if (res.data.value !== null) {
      return res.data.value
    } else {
      switch (res.error.value?.status ?? 500) {
        case 403: {
          throw new AstroApiError(AstroApiErrorCode.CANNOT_MANAGE_GUILD)
        }
        case 404: {
          throw new AstroApiError(AstroApiErrorCode.GUILD_NOT_FOUND)
        }
        default: {
          throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
        }
      }
    }
  }


  /// ERRORS ///
  public get_guild_errors = async (guild_id: string) : Promise<GSError[]> => {
    const res = await useApiFetch<GSError[]>(this.url(`/dashboard/guilds/${guild_id}/errors`))

    if (res.data.value !== null) {
      return res.data.value
    } else {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }
  }
}