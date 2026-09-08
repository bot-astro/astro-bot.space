import {useApiFetch} from "~/composables/useApiFetch";
import type {GuildSettings} from "~/types/guild-settings/guild_settings";
import type {DiscordGuild, DiscordGuildChannel, DiscordPermission, DiscordRole} from "~/types/discord";
import type {User, UserChargebeeSubscriptions} from "~/types/user";
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

  constructor(
    base_url: string
  ) {
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
  public loginViaDiscord = (
    redirect_path: string,
    invite: boolean = false,
    invite_guild_id: string | null = null
  ) => {
    const query = new URLSearchParams({ redirect_path, invite: String(invite) })
    if (invite_guild_id !== null) query.set('invite_guild_id', invite_guild_id)
    return navigateTo(`${this.url('/auth/discord')}?${query}`, { external: true })
  }

  public logout = async (): Promise<void> => {
    return useApiFetch<void>(this.url('/auth/logout'), { method: 'POST' })
  }

  /// USER ///
  public get_self_user = async(): Promise<User> => {
    return useApiFetch<User>(this.url('/auth/me'))
  }

  /// DISCORD ///
  public get_discord_permissions = async (): Promise<DiscordPermission[]> => {
    return useApiFetch<DiscordPermission[]>(this.url('/v2/discord/constants/permissions'))
  }


    /// CHARGEBEE ///
  public get_chargebee_portal_session_url = async (): Promise<string> => {
    return useApiFetch<string>(this.url('/chargebee/portal-session'))
  }

  public get_chargebee_hosted_page_checkout = async (monthly: boolean, quantity: number): Promise<any> => {
    return useApiFetch<any>(this.url('/chargebee/checkout'), {
      method: 'POST',
      body: {
        monthly,
        quantity
      }
    })
  }

  public get_user_chargebee_subscriptions = async (): Promise<UserChargebeeSubscriptions> => {
    return useApiFetch<UserChargebeeSubscriptions>(this.url(`/chargebee/subscriptions`))
  }


  /// GUILDS ///
  /**
   * Gets the list of guilds of the logged-in user
   *
   * @throws AError
   * @return the list of guilds of the logged-in user
   */
  public get_guilds = async () : Promise<DiscordGuild[]> => {
    return useApiFetch<DiscordGuild[]>(this.url('/v2/discord/guilds'))
  }

  public get_guild_channels = async (guild_id: string) : Promise<DiscordGuildChannel[]> => {
    return useApiFetch<DiscordGuildChannel[]>(this.url(`/v2/discord/guilds/${guild_id}/channels`))
  }

  public get_guild_roles = async (guild_id: string) : Promise<DiscordRole[]> => {
    return useApiFetch<DiscordRole[]>(this.url(`/dashboard/guilds/${guild_id}/roles`))
  }


  /// SETTINGS ///
  public get_guild_settings = async (guild_id: string) : Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data`))
  }

  public update_guild_settings = async (guild_id: string, settings_rb: GuildSettingsRB): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data`), {
      method: 'POST',
      body: settings_rb,
    })
  }

  /// ULTIMATE ///
  public refresh_entitlements = async (guild_id: string): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/entitlements/refresh`))
  }

  public upgrade_guild = async (guild_id: string, subscription_id: string): Promise<void> => {
    return useApiFetch<void>(this.url(`dashboard/guilds/${guild_id}/upgrade/${subscription_id}`))
  }

  public downgrade_guild = async (guild_id: string): Promise<void> => {
    return useApiFetch<void>(this.url(`dashboard/guilds/${guild_id}/downgrade`))
  }

  /// SETTINGS UTILS ///
  public clear_temporary_vcs_cache = async (guild_id: string): Promise<void> => {
    return useApiFetch<void>(this.url(`/dashboard/guilds/${guild_id}/vc/cache`), {
      method: 'DELETE'
    })
  }


  /// ERRORS ///
  public get_guild_errors = async (guild_id: string) : Promise<GSError[]> => {
    return useApiFetch<GSError[]>(this.url(`/dashboard/guilds/${guild_id}/errors`))
  }

  public clear_guild_errors = async (guild_id: string) : Promise<void> => {
    return useApiFetch<void>(this.url(`/dashboard/guilds/${guild_id}/errors`), {
      method: 'DELETE'
    })
  }


  /// GENERATOR ///
  public create_generator = async (guild_id: string): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/generator`), {
      method: 'POST'
    })
  }

  public update_generator = async (guild_id: string, generator_id: string, generator_settings: GSGenerator): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/generator/${generator_id}`), {
      method: 'POST',
      body: generator_settings
    })
  }

  public delete_generator = async (guild_id: string, generator_id: string): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/generator/${generator_id}`), {
      method: 'DELETE'
    })
  }

  /// VOICE ROLE ///
  public create_voice_role = async (guild_id: string, voice_role: GSVoiceRole): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/voice-role`), {
      method: 'POST',
      body: voice_role
    })
  }

  public update_voice_role = async (guild_id: string, channel_id: string, voice_role: GSVoiceRole): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/voice-role/${channel_id}`), {
      method: 'POST',
      body: voice_role
    })
  }

  public delete_voice_role = async (guild_id: string, channel_id: string): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/voice-role/${channel_id}`), {
      method: 'DELETE'
    })
  }


  /// TEMPLATES ///
  public create_template = async (guild_id: string, template: GSTemplate): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/template`), {
      method: 'POST',
      body: template
    })
  }

  public update_template = async (guild_id: string, template_id: string, template: GSTemplate): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/template/${template_id}`), {
      method: 'POST',
      body: template
    })
  }

  public delete_template = async (guild_id: string, template_id: string): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(this.url(`/dashboard/guilds/${guild_id}/data/template/${template_id}`), {
      method: 'DELETE'
    })
  }
}
