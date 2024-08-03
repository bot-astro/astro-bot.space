import type {Ref} from "vue";

export const user_subscriptions_qk: any[] = ['user', 'subscriptions']

export const guilds_qk: any[] = ['guilds']
export const guild_settings_qk = (guild_id: Ref<string | undefined> | string) => guilds_qk.concat(guild_id)