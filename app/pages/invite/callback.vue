<script lang="ts" setup>
import { RouterQueryKeys } from '~/constants/RouterQueryKeys'

useHead({ meta: [{ name: 'robots', content: 'noindex' }] })

const route = useRoute()
const code = route.query.code
const state = route.query.state
const guild_id = route.query[RouterQueryKeys.GUILD_ID]

// the bot install links opened from Discord land here with the OAuth code: the backend exchanges it to record where
// the install came from (the source travels in the state) and then redirects to the dashboard of the guild
if (typeof code === 'string') {
  await useNuxtApp().$astroApiClient.completeInstall(
    code,
    typeof state === 'string' ? state : null,
  )
} else {
  await navigateTo(
    typeof guild_id === 'string' && /^\d{15,25}$/.test(guild_id)
      ? `/guilds/${guild_id}`
      : '/guilds',
    { replace: true },
  )
}
</script>

<template>
  <div />
</template>
