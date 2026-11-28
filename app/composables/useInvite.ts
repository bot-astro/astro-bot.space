import { AI_REFERRER_KEY } from '~/plugins/aiReferrer.client'

function withAiReferrer(source: string) {
  try {
    const assistant = sessionStorage.getItem(AI_REFERRER_KEY)
    return assistant ? `${source}-via-${assistant}` : source
  } catch {
    return source
  }
}

export default function useInvite() {
  const { $astroApiClient } = useNuxtApp()
  return {
    invite_from: (source: string) =>
      $astroApiClient.loginViaDiscord(
        '/guilds/{guild_id}',
        true,
        null,
        withAiReferrer(source),
      ),
    invite_to_guild: (guildId: string) =>
      $astroApiClient.loginViaDiscord(
        `/guilds/${guildId}`,
        true,
        guildId,
        'dashboard-guild',
      ),
  }
}
