<script setup lang="ts">
const guildStore = useGuildStore()
</script>

<template>
  <div class="flex flex-col min-w-64">
    <!-- Server indicator -->
    <div class="border-box-border bg-grey-900 h-20 w-full p-4">
      <!-- server loaded -->
      <div v-if="guildStore.guild" class="flex items-center h-full gap-2 w-full">
        <NuxtImg
          v-if="guildStore.guild.icon !== undefined"
          :src="discordGuildIconUri(guildStore.guild.id, guildStore.guild.icon)"
          class="rounded-full max-w-none w-6 h-6 md:w-8 md:h-8 border-box-border"
        />
        <!-- name & ultimate status -->
        <div class="flex flex-col">
          <span> {{ guildStore.guild.name }}</span>
          <span class="text-secondary text-xs">Free</span>
        </div>

        <div class="grow" />

        <IconDropdown class="-rotate-90" />
      </div>
      <!-- server loading -->
      <UtilCircularLoading
        v-else
        class="max-h-6"
      />
    </div>

    <div />
  </div>
</template>
