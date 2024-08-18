import {useApiFetch} from "~/composables/useApiFetch";
import {AstroApiErrorCode} from "~/data/astro/core/AstroApiErrorCode";
import {AstroApiError} from "~/data/astro/core/AstroApiError";
import type {GuildSettings} from "~/types/guild-settings/guild_settings";
import type {LoginResponse} from "~/types/session";
import type {DiscordGuild, DiscordGuildChannel, DiscordRole, DiscordUser} from "~/types/discord";
import type {UserChargebeeSubscriptions} from "~/types/user";
import type {GSError} from "~/types/guild-settings/error";
import type {GuildSettingsRB} from "~/types/guild-settings/request-bodies/guild_settings_rb";
import type {GSGenerator} from "~/types/guild-settings/generator";
import type {GSVoiceRole} from "~/types/guild-settings/voice_role";
import type {GSTemplate} from "~/types/guild-settings/template";

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

    if (res.data) {
      return res.data
    } else {
      switch (res.error.statusCode) {
        case 400: {
          throw new AstroApiError(AstroApiErrorCode.INVALID_DISCORD_CODE)
        }
        default: {
          throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
        }
      }
    }
  }

  public logout = async (): Promise<void> => {
    await useApiFetch(this.url('/dashboard/auth/logout'), {}, false)
  }


  /// USER ///
  public get_self_user = async (): Promise<DiscordUser> => {
    const res = await useApiFetch<DiscordUser>(this.url('/dashboard/users/@me'))

    if (res.data) {
      return res.data
    } else {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }
  }


    /// CHARGEBEE ///
  public get_chargebee_portal_session_url = async (): Promise<string> => {
    const res = await useApiFetch<string>(this.url('/chargebee/portal-session'))

    if (res.data) {
      return res.data
    } else {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }
  }

  public get_chargebee_hosted_page_checkout = async (monthly: boolean, quantity: number): Promise<any> => {
    const res = await useApiFetch<any>(this.url('/chargebee/checkout'), {
      method: 'POST',
      body: {
        monthly,
        quantity
      }
    })

    if (res.data) {
      return res.data
    } else {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }
  }

  public get_user_chargebee_subscriptions = async (): Promise<UserChargebeeSubscriptions> => {
    const res = await useApiFetch<UserChargebeeSubscriptions>(this.url(`/chargebee/subscriptions`))

    if (res.data) {
      return res.data
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

    if (res.error) {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }

    return res.data ?? []
  }

  public get_guild_channels = async (guild_id: string) : Promise<DiscordGuildChannel[]> => {
    const res = await useApiFetch<DiscordGuildChannel[]>(this.url(`/dashboard/guilds/${guild_id}/channels`))

    if (res.data) {
      return res.data
    } else {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }
  }

  public get_guild_roles = async (guild_id: string) : Promise<DiscordRole[]> => {
    const res = await useApiFetch<DiscordRole[]>(this.url(`/dashboard/guilds/${guild_id}/roles`))

    if (res.data) {
      return res.data
    } else {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }
  }


  /// SETTINGS ///
  public get_guild_settings = async (guild_id: string) : Promise<GuildSettings> => {
    const res = await useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data`))

    if (res.data) {
      return res.data
    } else {
      switch (res.error.status ?? 500) {
        case 403: {
          throw new AstroApiError(AstroApiErrorCode.CANNOT_MANAGE_GUILD)
        }
        case 404: {
          throw new AstroApiError(AstroApiErrorCode.GUILD_NOT_FOUND)
        }
        case 405: {
          throw new AstroApiError(AstroApiErrorCode.ASTRO_NOT_IN_GUILD)
        }
        default: {
          throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
        }
      }
    }
  }

  public update_guild_settings = async (guild_id: string, settings_rb: GuildSettingsRB): Promise<GuildSettings> => {
    const res = await useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data`), {
      method: 'POST',
      body: settings_rb,
    })

    if (res.data) {
      return res.data
    } else {
      switch (res.error.status ?? 500) {
        case 400: {
          throw new AstroApiError(AstroApiErrorCode.INVALID_SETTINGS)
        }
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

  /// ULTIMATE ///
  public upgrade_guild = async (guild_id: string, subscription_id: string): Promise<void> => {
    const res = await useApiFetch(this.url(`dashboard/guilds/${guild_id}/upgrade/${subscription_id}`))

    if (res.error) {
      switch (res.error.status ?? 500) {
        case 404: {
          throw new AstroApiError(AstroApiErrorCode.GUILD_NOT_FOUND)
        }
        case 405: {
          throw new AstroApiError(AstroApiErrorCode.SUBSCRIPTION_USED)
        }
        case 409: {
          throw new AstroApiError(AstroApiErrorCode.GUILD_ALREADY_ULTIMATE)
        }
        default: {
          throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
        }
      }
    }
  }

  public downgrade_guild = async (guild_id: string): Promise<void> => {
    const res = await useApiFetch(this.url(`dashboard/guilds/${guild_id}/downgrade`))

    if (res.error) {
      switch (res.error.status ?? 500) {
        case 403: {
          throw new AstroApiError(AstroApiErrorCode.GUILD_UPGRADED_BY_OTHER)
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

  /// SETTINGS UTILS ///
  public clear_temporary_vcs_cache = async (guild_id: string): Promise<void> => {
    const res = await useApiFetch(this.url(`/dashboard/guilds/${guild_id}/vc/cache`), {
      method: 'DELETE'
    })

    if (res.error) {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }
  }


  /// ERRORS ///
  public get_guild_errors = async (guild_id: string) : Promise<GSError[]> => {
    const res = await useApiFetch<GSError[]>(this.url(`/dashboard/guilds/${guild_id}/errors`))

    if (res.data) {
      return res.data
    } else {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }
  }

  public clear_guild_errors = async (guild_id: string) : Promise<void> => {
    const res = await useApiFetch(this.url(`/dashboard/guilds/${guild_id}/errors`), {
      method: 'DELETE'
    })

    if (res.error) {
      throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
    }
  }


  /// GENERATOR ///
  public create_generator = async (guild_id: string): Promise<GuildSettings> => {
    const res = await useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/generator`), {
      method: 'POST'
    })

    if (res.data) {
      return res.data
    } else {
      switch (res.error.status ?? 500) {
        case 402: {
          throw new AstroApiError(AstroApiErrorCode.ULTIMATE_REQUIRED_TO_CREATE_GENERATOR)
        }
        case 403: {
          throw new AstroApiError(AstroApiErrorCode.CANNOT_MANAGE_GUILD)
        }
        case 404: {
          throw new AstroApiError(AstroApiErrorCode.GUILD_NOT_FOUND)
        }
        case 405: {
          throw new AstroApiError(AstroApiErrorCode.ASTRO_MISSING_PERMISSIONS)
        }
        default: {
          throw new AstroApiError(AstroApiErrorCode.UNKNOWN)
        }
      }
    }
  }

  public update_generator = async (guild_id: string, generator_id: string, generator_settings: GSGenerator): Promise<GuildSettings> => {
    const res = await useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/generator/${generator_id}`), {
      method: 'POST',
      body: generator_settings
    })

    if (res.data) {
      return res.data
    } else {
      switch (res.error.status ?? 500) {
        case 400: {
          throw new AstroApiError(AstroApiErrorCode.INVALID_SETTINGS)
        }
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

  public delete_generator = async (guild_id: string, generator_id: string): Promise<GuildSettings> => {
    const res = await useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/generator/${generator_id}`), {
      method: 'DELETE'
    })

    if (res.data) {
      return res.data
    } else {
      switch (res.error.status ?? 500) {
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

  /// VOICE ROLE ///
  public create_voice_role = async (guild_id: string, voice_role: GSVoiceRole): Promise<GuildSettings> => {
    const res = await useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/voice-role`), {
      method: 'POST',
      body: voice_role
    })

    if (res.data) {
      return res.data
    } else {
      switch (res.error.status ?? 500) {
        case 400: {
          throw new AstroApiError(AstroApiErrorCode.INVALID_SETTINGS)
        }
        case 402: {
          throw new AstroApiError(AstroApiErrorCode.ULTIMATE_REQUIRED_TO_CREATE_VOICE_ROLE)
        }
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

  public update_voice_role = async (guild_id: string, channel_id: string, voice_role: GSVoiceRole): Promise<GuildSettings> => {
    const res = await useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/voice-role/${channel_id}`), {
      method: 'POST',
      body: voice_role
    })

    if (res.data) {
      return res.data
    } else {
      switch (res.error.status ?? 500) {
        case 400: {
          throw new AstroApiError(AstroApiErrorCode.INVALID_SETTINGS)
        }
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

  public delete_voice_role = async (guild_id: string, channel_id: string): Promise<GuildSettings> => {
    const res = await useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/voice-role/${channel_id}`), {
      method: 'DELETE'
    })

    if (res.data) {
      return res.data
    } else {
      switch (res.error.status ?? 500) {
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


  /// TEMPLATES ///
  public create_template = async (guild_id: string, template: GSTemplate): Promise<GuildSettings> => {
    const res = await useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/template`), {
      method: 'POST',
      body: template
    })

    if (res.data) {
      return res.data
    } else {
      switch (res.error.status ?? 500) {
        case 400: {
          throw new AstroApiError(AstroApiErrorCode.INVALID_SETTINGS)
        }
        case 402: {
          throw new AstroApiError(AstroApiErrorCode.ULTIMATE_REQUIRED_TO_CREATE_TEMPLATE)
        }
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

  public update_template = async (guild_id: string, template_id: string, template: GSTemplate): Promise<GuildSettings> => {
    const res = await useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/template/${template_id}`), {
      method: 'POST',
      body: template
    })

    if (res.data) {
      return res.data
    } else {
      switch (res.error.status ?? 500) {
        case 400: {
          throw new AstroApiError(AstroApiErrorCode.INVALID_SETTINGS)
        }
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

  public delete_template = async (guild_id: string, template_id: string): Promise<GuildSettings> => {
    const res = await useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/template/${template_id}`), {
      method: 'DELETE'
    })

    if (res.data) {
      return res.data
    } else {
      switch (res.error.status ?? 500) {
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
}