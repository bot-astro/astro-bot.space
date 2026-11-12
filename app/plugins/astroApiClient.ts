import { AstroApiClient } from '~/data/astro/AstroApiClient'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const astroApiClient = new AstroApiClient(
    config.public.astro_api_base_url,
    config.public.mock_discord_guilds,
  )

  return {
    provide: {
      astroApiClient,
    },
  }
})
