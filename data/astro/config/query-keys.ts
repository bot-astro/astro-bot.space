import type {Ref} from "vue";

export const user_subscriptions_qk: any[] = ['user', 'subscriptions']

export const guilds_qk: any[] = ['guilds']
export const guild_settings_qk = (guild_id: Ref<string | undefined> | string) => guilds_qk.concat(guild_id)
export const guild_errors_qk = (guild_id: Ref<string | undefined> | string) => guild_settings_qk(guild_id).concat('errors')
export const guild_channels_qk = (guild_id: Ref<string | undefined> | string) => guild_settings_qk(guild_id).concat('channels')
export const guild_roles_qk = (guild_id: Ref<string | undefined> | string) => guild_settings_qk(guild_id).concat('roles')
