<script lang="ts" setup>
import { RouterQueryKeys } from '~/constants/RouterQueryKeys'

useHead({ meta: [{ name: 'robots', content: 'noindex' }] })

const route = useRoute()
const guild_id = route.query[RouterQueryKeys.GUILD_ID]

// the OAuth code is ignored on purpose: the dashboard authenticates through its own login flow
await navigateTo(
  typeof guild_id === 'string' && /^\d{15,25}$/.test(guild_id)
    ? `/guilds/${guild_id}`
    : '/guilds',
  { replace: true },
)
</script>

<template>
  <div />
</template>
