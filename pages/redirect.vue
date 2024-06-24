<template>
  <div />
</template>

<script lang="ts" setup>
import { StorageKeys } from '~/assets/config/storage';

onMounted(() => {
  const route = useRoute()

  const previousRoute = sessionStorage.getItem(StorageKeys.AUTH_REDIRECT)

  const guildId = route.query.guildId
  const finalRoute = guildId ? `/guilds/${guildId}` : previousRoute ?? '/dashboard'

  navigateTo(finalRoute, { replace: true })
})
</script>
