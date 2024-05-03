<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})
const route = useRoute()
const guildId = route.params.id as string
const guildsStore = useGuildsStore()

guildsStore.fetchIfOutdated()
guildsStore.select(guildId)
</script>

<template>
  <div>
    <span>Single guild {{ guildsStore.selectedGuild?.id }}</span>
  </div>
</template>

<style>

</style>
