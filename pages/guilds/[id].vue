<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})
const route = useRoute()
const guildId = route.params.id
const guildsStore = useGuildsStore()
const guildStore = useGuildStore()

guildsStore.fetchIfOutdated()

const guild = computed(() => {
  return guildsStore.guilds.find(g => g.id === guildId)
})

watch(guild, (newGuild) => {
  if (newGuild !== undefined) 
    guildStore.set(newGuild)
})
</script>

<template>
  <div>
    <span>Single guild</span>
  </div>
</template>

<style>

</style>
