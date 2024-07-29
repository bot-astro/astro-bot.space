export default function () {
  return {
    invite: () => {
      const config = useRuntimeConfig()
      navigateTo(config.public.invite_oauth_url, { replace: false, external: true })
    },
    invite_to_guild: (guild_id: string) => {
      const config = useRuntimeConfig()
      const url = config.public.invite_guild_oauth_url.replace('{GUILD_ID}', guild_id)
      navigateTo(url, { replace: false, external: true })
    }
  }
}
