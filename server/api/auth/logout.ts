import {AstroApiClient} from "~/data/astro/AstroApiClient";

export default eventHandler(async (event) => {
  const config = useRuntimeConfig()
  const session = await getUserSession(event)

  if (session.user) {
    try {
      $fetch(`${config.public.astro_api_base_url}/dashboard/auth/logout`, {
        credentials: 'include'
      })
        .then(() => console.log('logged out'))
    } catch (e) {
      console.error('Failed logging out', e);
    }
  }

  await clearUserSession(event)
})
