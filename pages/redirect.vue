<template>
  <div />
</template>

<script lang="ts" setup>
import { StorageKeys } from 'assets/config/StorageKeys';
import {RouterQueryKeys} from "assets/config/RouterQueryKeys";

onMounted(() => {
  const route = useRoute()

  const previous_route = sessionStorage.getItem(StorageKeys.AUTH_REDIRECT)

  const guild_id = route.query[RouterQueryKeys.GUILD_ID]
  const finalRoute = guild_id ? `/guilds/${guild_id}` : previous_route ?? '/guilds'

  navigateTo(finalRoute, { replace: true })
})
</script>
