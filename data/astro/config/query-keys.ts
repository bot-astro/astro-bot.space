export const user_session_qk = ['user_session']

export const guilds_qk = ['guilds']
export const guild_settings_qk = (guild_id: string) => guilds_qk.concat(guild_id)