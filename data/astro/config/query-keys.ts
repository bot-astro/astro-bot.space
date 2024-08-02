import type {Ref} from "vue";

export const user_session_qk = ['user_session']

export const guilds_qk: any[] = ['guilds']
export const guild_settings_qk = (guild_id: Ref<string | undefined>) => guilds_qk.concat(guild_id)