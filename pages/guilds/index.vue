<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const guildsStore = useGuildsStore()

onMounted(async () => {
  await nextTick()
  await guildsStore.fetch()
})
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <span class="text-xl font-semibold">Servers</span>
    <span class="text-secondary text-sm">Select a server to manage</span>
    <div class="flex">
      <div
          v-for="guild in guildsStore.guilds"
          >
        {{ guild.name }}
      </div>
    </div>
  </div>
</template>
