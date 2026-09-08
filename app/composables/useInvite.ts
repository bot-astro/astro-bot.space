export default function useInvite() {
  const { $astroApiClient } = useNuxtApp()
  return {
    invite: () => $astroApiClient.loginViaDiscord('/guilds/{guild_id}', true),
    invite_to_guild: (guildId: string) =>
      $astroApiClient.loginViaDiscord(`/guilds/${guildId}`, true, guildId),
  }
}
