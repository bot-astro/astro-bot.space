import { useApiFetch } from '~/composables/useApiFetch'
import type { GuildSettings } from '~/types/guild-settings/guild_settings'
import type {
  DiscordGuild,
  DiscordGuildChannel,
  DiscordPermission,
  DiscordRole,
} from '~/types/discord'
import type { User, UserChargebeeSubscriptions } from '~/types/user'
import type { GSError } from '~/types/guild-settings/error'
import type { GuildSettingsRB } from '~/types/guild-settings/request-bodies/guild_settings_rb'
import type { GSGenerator } from '~/types/guild-settings/generator'
import type { GSVoiceRole } from '~/types/guild-settings/voice_role'
import type { GeneratorCreateRB } from '~/types/guild-settings/request-bodies/generator_create_rb'
import type { GSTemplate } from '~/types/guild-settings/template'
import type { GSInterface } from '~/types/guild-settings/interface'

/**
 * Api client to interact with the Astro APIs
 */
export class AstroApiClient {
  // base url will be injected from env variables on global instance creation
  private readonly base_url
  // local dev only, avoids Discord's rate limits on the user guilds endpoint
  private readonly mock_discord_guilds

  constructor(base_url: string, mock_discord_guilds: boolean = false) {
    this.base_url = base_url
    this.mock_discord_guilds = mock_discord_guilds
  }

  /**
   * Constructs the url for an API call
   *
   * @param path
   * @return the constructed api url with the base_url
   */
  private url = (path: string) =>
    path.startsWith('/')
      ? `${this.base_url}${path}`
      : `${this.base_url}/${path}`

  /// AUTH ///
  public loginViaDiscord = (
    redirect_path: string,
    invite: boolean = false,
    invite_guild_id: string | null = null,
  ) => {
    const query = new URLSearchParams({
      redirect_path,
      invite: String(invite),
    })
    if (invite_guild_id !== null) query.set('invite_guild_id', invite_guild_id)
    return navigateTo(`${this.url('/v2/auth/discord')}?${query}`, {
      external: true,
    })
  }

  public logout = async (): Promise<void> => {
    return useApiFetch(this.url('/v2/auth/logout'), { method: 'POST' })
  }

  /// USER ///
  public get_self_user = async (): Promise<User> => {
    return useApiFetch<User>(this.url('/v2/auth/me'))
  }

  /// DISCORD ///
  public get_discord_permissions = async (): Promise<DiscordPermission[]> => {
    return useApiFetch<DiscordPermission[]>(
      this.url('/v2/discord/constants/permissions'),
    )
  }

  /// CHARGEBEE ///
  public get_chargebee_portal_session_url = async (): Promise<string> => {
    return useApiFetch<string>(this.url('/v2/chargebee/portal-session'))
  }

  public get_chargebee_hosted_page_checkout = async (
    monthly: boolean,
    quantity: number,
  ): Promise<unknown> => {
    return useApiFetch<unknown>(this.url('/v2/chargebee/checkout'), {
      method: 'POST',
      body: {
        monthly,
        quantity,
      },
    })
  }

  public get_user_chargebee_subscriptions =
    async (): Promise<UserChargebeeSubscriptions> => {
      return useApiFetch<UserChargebeeSubscriptions>(
        this.url('/v2/chargebee/subscriptions'),
      )
    }

  /// GUILDS ///
  /**
   * Gets the list of guilds of the logged-in user
   *
   * @throws AError
   * @return the list of guilds of the logged-in user
   */
  public get_guilds = async (): Promise<DiscordGuild[]> => {
    if (this.mock_discord_guilds) {
      return (await import('~/data/astro/mocks/discord-guilds.json'))
        .default as DiscordGuild[]
    }

    return useApiFetch<DiscordGuild[]>(this.url('/v2/discord/guilds'))
  }

  public get_guild_channels = async (
    guild_id: string,
  ): Promise<DiscordGuildChannel[]> => {
    return useApiFetch<DiscordGuildChannel[]>(
      this.url(`/v2/discord/guilds/${guild_id}/channels`),
    )
  }

  public get_guild_roles = async (guild_id: string): Promise<DiscordRole[]> => {
    return useApiFetch<DiscordRole[]>(
      this.url(`/v2/discord/guilds/${guild_id}/roles`),
    )
  }

  /// SETTINGS ///
  public get_guild_settings = async (
    guild_id: string,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/settings`),
    )
  }

  public update_guild_settings = async (
    guild_id: string,
    settings_rb: GuildSettingsRB,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/settings`),
      {
        method: 'POST',
        body: settings_rb,
      },
    )
  }

  /// ULTIMATE ///
  public refresh_entitlements = async (
    guild_id: string,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/premium/entitlements/refresh`),
      {
        method: 'POST',
      },
    )
  }

  public upgrade_guild = async (
    guild_id: string,
    subscription_id: string,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/premium/upgrade`),
      {
        method: 'POST',
        body: { subscription_id },
      },
    )
  }

  public downgrade_guild = async (guild_id: string): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/premium/upgrade`),
      {
        method: 'DELETE',
      },
    )
  }

  /// SETTINGS UTILS ///
  public clear_temporary_vcs_cache = async (
    guild_id: string,
  ): Promise<void> => {
    return useApiFetch(this.url(`/v2/guilds/${guild_id}/settings/vcs/cache`), {
      method: 'DELETE',
    })
  }

  /// ERRORS ///
  public get_guild_errors = async (guild_id: string): Promise<GSError[]> => {
    return useApiFetch<GSError[]>(this.url(`/v2/guilds/${guild_id}/errors`))
  }

  public clear_guild_errors = async (guild_id: string): Promise<void> => {
    return useApiFetch(this.url(`/v2/guilds/${guild_id}/errors`), {
      method: 'DELETE',
    })
  }

  /// GENERATOR ///
  public create_generator = async (
    guild_id: string,
    generator_rb: GeneratorCreateRB,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/settings/generators`),
      {
        method: 'POST',
        body: generator_rb,
      },
    )
  }

  public update_generator = async (
    guild_id: string,
    generator_id: string,
    generator_settings: GSGenerator,
  ): Promise<GuildSettings> => {
    // empty optional texts mean "not set"
    const body: GSGenerator = {
      ...generator_settings,
      default_locked_name: generator_settings.default_locked_name || null,
      default_hidden_name: generator_settings.default_hidden_name || null,
      default_status: generator_settings.default_status || null,
      chat_topic: generator_settings.chat_topic || null,
      default_chat_text: generator_settings.default_chat_text || null,
    }

    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/settings/generators/${generator_id}`),
      {
        method: 'POST',
        body,
      },
    )
  }

  public delete_generator = async (
    guild_id: string,
    generator_id: string,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/settings/generators/${generator_id}`),
      {
        method: 'DELETE',
      },
    )
  }

  /// VOICE ROLE (connections) ///
  public create_voice_role = async (
    guild_id: string,
    voice_role: GSVoiceRole,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/settings/connections`),
      {
        method: 'POST',
        body: voice_role,
      },
    )
  }

  public update_voice_role = async (
    guild_id: string,
    channel_id: string,
    voice_role: GSVoiceRole,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/settings/connections/${channel_id}`),
      {
        method: 'POST',
        body: voice_role,
      },
    )
  }

  public delete_voice_role = async (
    guild_id: string,
    channel_id: string,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/settings/connections/${channel_id}`),
      {
        method: 'DELETE',
      },
    )
  }

  /// TEMPLATES ///
  public create_template = async (
    guild_id: string,
    template: GSTemplate,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/settings/templates`),
      {
        method: 'POST',
        body: template,
      },
    )
  }

  public update_template = async (
    guild_id: string,
    template_id: string,
    template: GSTemplate,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/settings/templates/${template_id}`),
      {
        method: 'POST',
        body: template,
      },
    )
  }

  public delete_template = async (
    guild_id: string,
    template_id: string,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/settings/templates/${template_id}`),
      {
        method: 'DELETE',
      },
    )
  }

  /// INTERFACES ///
  public create_interface = async (
    guild_id: string,
    channel_id: string,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/settings/interfaces`),
      {
        method: 'POST',
        body: { channel_id },
      },
    )
  }

  public update_interface = async (
    guild_id: string,
    message_id: string,
    interface_settings: GSInterface,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/settings/interfaces/${message_id}`),
      {
        method: 'POST',
        body: interface_settings,
      },
    )
  }

  public delete_interface = async (
    guild_id: string,
    message_id: string,
  ): Promise<GuildSettings> => {
    return useApiFetch<GuildSettings>(
      this.url(`/v2/guilds/${guild_id}/settings/interfaces/${message_id}`),
      {
        method: 'DELETE',
      },
    )
  }
}
