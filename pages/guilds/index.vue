<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const search = ref('')

const { data, pending, error, refresh } = useApiData('/dashboard/guilds')

const guilds = computed(() => {
  return (data.value || [])
    .filter(guild => guild.can_manage)
    .filter(guild => search.value.length > 0 ? guild.name?.toLowerCase().includes(search.value.toLowerCase()) : true)
})
</script>

<template>
  <div class="container mt-4 flex flex-col items-center px-4">
    <div class="flex flex-col md:flex-row gap-2 md:gap-0 w-full justify-between items-center group">
      <div class="flex flex-col w-full text-center md:text-start">
        <span class="text-xl font-semibold">Servers</span>
        <span class="text-sm text-secondary">Select a server to manage</span>
      </div>

      <div class="flex items-center gap-2">
        <ButtonText destructive>
          <Icon name="fluent:arrow-sync-12-regular" class="size-6" @click="refresh" />
        </ButtonText>

        <input v-model="search" class="w-full md:w-auto" type="text" placeholder="Search by name">
      </div>
    </div>

    <div v-if="pending" class="w-full mt-4 flex justify-center">
      <UtilCircularLoading />
    </div>
    <div v-else-if="error" class="w-full mt-4 flex justify-center bordered-destructive rounded-md p-4 text-destructive">
      Something went wrong, please try again later
    </div>
    <div
      class="mt-4 w-full grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-4">
      <div v-for="guild in guilds" :key="guild.id" class="flex select-none flex-col group gap-4">
        <div class="flex items-center gap-4">
          <div class="relative">
            <NuxtImg
              v-if="guild.id && guild.icon" :src="discordGuildIconUri(guild.id, guild.icon)"
              class="rounded-full max-w-none w-12 h-12 md:w-14 md:h-14 bordered" />
            <p
              v-else
              class="flex items-center justify-center truncate rounded-full font-semibold text-white size-14 bordered hover:opacity-80">
              {{ guild.name?.split(" ").map((a) => a.charAt(0).toUpperCase()).join("") }}
            </p>
          </div>

          <span>{{ guild.name }}</span>
        </div>
        <Button class="w-full flex items-center justify-center" :to="`/guilds/${guild.id}`">
          Manage
        </Button>
      </div>
    </div>
  </div>
</template>
