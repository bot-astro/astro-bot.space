<template>
  <div class="flex-col">
    <div class="flex flex-col grow">
      <div class="flex items-center justify-center p-2 bordered bg-background min-h-16">
        <!-- guild icon -->
        <NuxtImg v-if="guild_info?.icon" :src="discordGuildIconUri(guild_info.id, guild_info.icon)"
                 class="h-6 w-6 max-w-none rounded-full bordered md:h-8 md:w-8" />
        <p
          v-else-if="guild_info?.name"
          class="flex h-6 w-6 items-center justify-center truncate rounded-full font-semibold text-white bordered md:h-8 md:w-8">
          {{ guild_info.name.split(" ").map((a) => a.charAt(0).toUpperCase()).join("") }}
        </p>
        <Skeleton v-else class="h-6 w-6 rounded-full md:h-8 md:w-8" />
      </div>

      <!-- settings navigation -->
      <div class="flex min-h-full grow flex-col gap-2 border-r pt-4 bg-background-container border-border">
        <div v-for="section in sections"
             class="flex cursor-pointer flex-row items-center justify-center py-2 transition-colors hover:bg-background"
             :class="current_section.id === section.id ? 'bg-background' : ''" @click="set_section_and_guild(section)">
          <Icon :name="section.icon" class="size-4" />
        </div>
      </div>
    </div>

    <ButtonText
      class="flex items-center justify-center py-4 bg-background border-t border-r border-border text-foreground-link-standout"
      @click="$emit('onExpand')"
    >
      <Icon name="fluent:chevron-double-right-16-regular" class="size-6" />
    </ButtonText>
  </div>
</template>

<script lang="ts" setup>
const { sections, current_section, set_section_and_guild } = useDashboardSections()
const guild_info = useGuildInfo()
</script>
