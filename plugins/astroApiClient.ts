import {AstroApiClient} from "~/data/astro/AstroApiClient";

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const astroApiClient = new AstroApiClient(config.public.astro_api_base_url)

  return {
    provide: {
      astroApiClient
    }
  }
})