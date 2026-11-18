export default function useInvite() {
  const { $astroApiClient } = useNuxtApp()
  return {
    invite: (source: string | null = null) =>
      $astroApiClient.loginViaDiscord('/guilds/{guild_id}', true, null, source),
    invite_to_guild: (guildId: string) =>
      $astroApiClient.loginViaDiscord(`/guilds/${guildId}`, true, guildId),
  }
}
