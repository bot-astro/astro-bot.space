<script setup lang="ts">
const guildsStore = useGuildsStore()
const { selectedGuild, selectedGuildSettings, isSelectedGuildSettingsLoading } = storeToRefs(guildsStore)

const dashboardSectionStore = useDashboardSectionStore()
const { selectedSection } = storeToRefs(dashboardSectionStore)
</script>

<template>
  <div class="flex flex-col min-w-64 min-h-full">
    <!-- Server indicator -->
    <div class="bordered bg-gray-900 h-20 w-full p-4">
      <!-- server loaded -->
      <div class="flex items-center h-full gap-2 w-full">
        <!-- guild icon -->
        <NuxtImg
          v-if="selectedGuild?.icon !== undefined"
          :src="discordGuildIconUri(selectedGuild.id, selectedGuild.icon)"
          class="rounded-full max-w-none w-6 h-6 md:w-8 md:h-8 bordered"
        />
        <p v-else-if="selectedGuild?.name !== undefined" class="flex items-center justify-center truncate rounded-full font-semibold text-white w-6 h-6 md:w-8 md:h-8 bordered">
          {{ selectedGuild.name.split(" ").map((a) => a.charAt(0).toUpperCase()).join("") }}
        </p>
        <Skeleton v-else class="rounded-full w-6 h-6 md:w-8 md:h-8" />

        <!-- name & ultimate status -->
        <div class="flex flex-col grow">
          <span v-if="selectedGuild?.name !== undefined"> {{ selectedGuild.name }}</span>
          <Skeleton v-else class="h-2" />

          <span v-if="!isSelectedGuildSettingsLoading" class="text-secondary text-xs">
            {{ selectedGuildSettings?.upgradedByUserID !== undefined ? 'Ultimate' : 'Free' }}
          </span>
        </div>

        <div class="grow" />

        <IconDropdown class="-rotate-90" />
      </div>
    </div>

    <!-- settings navigation -->
    <div class="flex flex-col grow bg-gray-800 py-4 border-r bordered">
      <div
        class="flex flex-row items-center gap-3 px-4 py-2 hover:bg-gray-900 cursor-pointer transition-colors"
        :class="selectedSection === DashboardSection.OVERVIEW ? 'bg-gray-900' : ''"
        @click="dashboardSectionStore.selectSection(DashboardSection.OVERVIEW)"
      >
        <Icon
          name="lucide:server"
          class="size-4"
        />
        <span>Overview</span>
      </div>

      <div
        class="flex flex-row items-center gap-3 px-4 py-2 hover:bg-gray-900 cursor-pointer transition-colors"
        :class="selectedSection === DashboardSection.ERRORS ? 'bg-gray-900' : ''"
        @click="dashboardSectionStore.selectSection(DashboardSection.ERRORS)"
      >
        <Icon
          name="fluent:warning-24-regular"
          class="size-4"
        />
        <span>Errors</span>
      </div>
    </div>
  </div>
</template>
