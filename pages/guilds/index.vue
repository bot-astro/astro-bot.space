<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const search = ref('')

const guildsStore = useGuildsStore()
await guildsStore.fetchIfOutdated()
const guilds = computed(() => {
  return guildsStore.guilds
    .filter(guild => guild.can_manage)
    .filter(guild => search.value.length > 0 ? guild.name.toLowerCase().includes(search.value.toLowerCase()) : true)
    .sort((a, b) => {
      return a.settings === b.settings ? 0 : a.settings !== undefined ? -1 : 1;
    })
})
</script>

<template>
  <div class="container mt-4 flex flex-col items-center px-4">
    <div class="flex flex-col md:flex-row gap-2 md:gap-0 w-full justify-between items-center group">
      <div class="flex flex-col w-full text-center md:text-start">
        <span class="text-xl font-semibold">Servers</span>
        <span class="text-sm text-secondary">Select a server to manage</span>
      </div>

      <input
        class="w-full md:w-auto"
        type="text"
        placeholder="Search by name"
        :value="search"
        @input="event => search = event.target?.value ?? ''">
    </div>
    <div class="mt-4 w-full grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-4">
      <div
        v-for="guild in guilds"
        class="flex select-none flex-col group gap-4"
      >
        <div class="flex items-center gap-4">
          <div class="relative">
            <NuxtImg
              v-if="guild.icon !== undefined"
              :src="discordGuildIconUri(guild.id, guild.icon)"
              class="rounded-full max-w-none w-12 h-12 md:w-14 md:h-14 border-box-border"
            />
            <p v-else class="flex items-center justify-center truncate rounded-full font-semibold text-white size-14 border-box-border hover:opacity-80">
              {{ guild.name.split(" ").map((a) => a.charAt(0).toUpperCase()).join("")}}
            </p>
          </div>

          <span>{{ guild.name }}</span>
        </div>
        <NuxtLink
          class="button w-full flex items-center justify-center"
          :to="`/guilds/${guild.id}`"
        >
          <Icon
            v-if="guild.settings === undefined"
            name="fluent:add-12-filled"
            class="flex items-center justify-center text-center text-white"
          />
          {{ guild.settings !== undefined ? 'Manage' : 'Add Astro' }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
