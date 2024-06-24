<template>
  <div class="flex flex-col min-w-64 min-h-full">
    <!-- Server indicator -->
    <div class="bordered bg-gray-900 h-20 w-full p-4">
      <!-- server loaded -->
      <div v-if="currentGuild" class="flex items-center h-full gap-2 w-full">
        <!-- guild icon -->
        <NuxtImg v-if="currentGuild.icon !== undefined" :src="discordGuildIconUri(currentGuild.id!, currentGuild.icon!)"
          class="rounded-full max-w-none w-6 h-6 md:w-8 md:h-8 bordered" />
        <p v-else-if="currentGuild.name !== undefined"
          class="flex items-center justify-center truncate rounded-full font-semibold text-white w-6 h-6 md:w-8 md:h-8 bordered">
          {{ currentGuild.name.split(" ").map((a) => a.charAt(0).toUpperCase()).join("") }}
        </p>
        <Skeleton v-else class="rounded-full w-6 h-6 md:w-8 md:h-8" />

        <!-- name & ultimate status -->
        <div class="flex flex-col grow">
          <span v-if="currentGuild?.name !== undefined"> {{ currentGuild.name }}</span>
          <Skeleton v-else class="h-2" />

          <span v-if="data && status === 'success'" class="text-secondary text-xs">
            {{ data.upgraded_by_user_id !== undefined ? 'Ultimate' : 'Free' }}
          </span>
        </div>
      </div>
    </div>

    <!-- settings navigation -->
    <div class="flex flex-col grow bg-gray-800 border-r border-border">
      <div class="p-4">
        <Menu v-if="guilds?.length && currentGuild" class="w-full">
          <MenuButton class="flex bg-black shadow rounded border-1 border-purple-900 px-4 py-2 w-full">
            <ButtonText class="flex items-center gap-2 w-full text-sm">
              <NuxtImg :src="discordGuildIconUri(currentGuild.id!, currentGuild.icon!)" class="rounded-full size-4" />
              <span>{{ currentGuild.name }}</span>
              <div class="flex-grow" />
              <IconDropdown />
            </ButtonText>
          </MenuButton>
          <MenuItems class="right-0 flex flex-col max-h-[320px] overflow-auto overscroll-contain">
            <MenuItem v-for="_guild in guildsCanManage">
            <NuxtLink class="flex gap-2 items-center" @click="dashboard.setContext(undefined, _guild.id)">
              <NuxtImg :src="discordGuildIconUri(_guild.id!, _guild.icon!)" class="rounded-full size-4" />
              <span class="">{{ _guild.name }}</span>
            </NuxtLink>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <div v-for="section in sections"
        class="flex flex-row items-center gap-3 px-4 py-2 hover:bg-gray-900 cursor-pointer transition-colors"
        :class="currentSection.id === section.id ? 'bg-gray-900' : ''" @click="dashboard.setContext(section)">
        <Icon :name="section.icon" class="size-4" />
        <span>{{ section.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const dashboard = useDashboardStore()

const { currentGuild, guilds } = storeToRefs(dashboard)

const guildsCanManage = computed(() => guilds.value.filter(g => g.can_manage).sort((a, b) => a.name!.localeCompare(b.name!)))

const { data, status } = useAsyncData('settings', () => dashboard.currentSettings)

const { sections, currentSection } = storeToRefs(dashboard)
</script>
