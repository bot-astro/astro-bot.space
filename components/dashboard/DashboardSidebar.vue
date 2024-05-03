<script setup lang="ts">
const guildsStore = useGuildsStore()

const { selectedGuild, selectedGuildSettings } = storeToRefs(guildsStore)
</script>

<template>
  <div class="flex flex-col min-w-64">
    <!-- Server indicator -->
    <div class="border-box-border bg-grey-900 h-20 w-full p-4">
      <!-- server loaded -->
      <div v-if="false" class="flex items-center h-full gap-2 w-full">
        <NuxtImg
          v-if="selectedGuild.icon !== undefined"
          :src="discordGuildIconUri(selectedGuild.id, selectedGuild.icon)"
          class="rounded-full max-w-none w-6 h-6 md:w-8 md:h-8 border-box-border"
        />
        <!-- name & ultimate status -->
        <div class="flex flex-col">
          <span> {{ selectedGuild.name }}</span>
          <span class="text-secondary text-xs">{{ selectedGuildSettings?.upgradedByUserID !== undefined ? 'Ultimate' : 'Free' }}</span>
        </div>

        <div class="grow" />

        <IconDropdown class="-rotate-90" />
      </div>
      <!-- server loading -->
      <div v-else class="flex items-center h-full w-full">
        <Skeleton class="w-full h-4" />
      </div>
    </div>

    <div />
  </div>
</template>
