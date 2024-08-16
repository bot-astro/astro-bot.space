<template>
  <div class="flex flex-col min-h-full">
    <!-- Server indicator -->
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div class="bordered bg-background min-h-16 md:min-h-20 w-full p-4 flex items-center text-start">
          <!-- server loaded -->
          <div class="flex items-center h-full gap-2 w-full">
            <!-- guild icon -->
            <NuxtImg v-if="guild_info?.icon" :src="discordGuildIconUri(guild_info.id, guild_info.icon)"
                     class="rounded-full max-w-none w-6 h-6 md:w-8 md:h-8 bordered" />
            <p
              v-else-if="guild_info?.name"
              class="flex items-center justify-center truncate rounded-full font-semibold text-white w-6 h-6 md:w-8 md:h-8 bordered">
              {{ guild_info.name.split(" ").map((a) => a.charAt(0).toUpperCase()).join("") }}
            </p>
            <Skeleton v-else class="rounded-full w-6 h-6 md:w-8 md:h-8" />

            <!-- name & ultimate status -->
            <div class="flex flex-col grow">
              <span v-if="guild_info"> {{ guild_info.name }}</span>
              <Skeleton v-else class="h-2 mb-1" />

              <span v-if="guild_settings" class="text-secondary text-xs">
                {{ isGuildUltimate(guild_settings) ? 'Ultimate' : 'Free' }}
              </span>
            </div>

            <IconDropdown class="size-5 text-foreground-secondary -rotate-90" />
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="max-h-72 overflow-y-auto" :side="width > 700 ? 'right' : 'bottom'">
        <DropdownMenuItem
          v-for="_guild in managed_guilds"
          :key="_guild.id"
          @click="set_section_and_guild(undefined, _guild.id)"
        >
          <div class="flex items-center gap-2">
            <NuxtImg v-if="_guild.icon" :src="discordGuildIconUri(_guild.id, _guild.icon)" class="rounded-full size-4" />
            <p
              v-else
              class="flex items-center justify-center truncate rounded-full font-semibold text-white size-4 text-xs bordered">
              {{ _guild.name.split(" ").map((a) => a.charAt(0).toUpperCase()).join("") }}
            </p>
            <span>{{ _guild.name }}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>



    <!-- settings navigation -->
    <div class="flex flex-col grow bg-background-container border-r border-border pt-4 min-h-full">
      <div v-for="section in sections"
        class="flex flex-row items-center gap-3 px-4 py-2 hover:bg-background cursor-pointer transition-colors"
        :class="current_section.id === section.id ? 'bg-background' : ''" @click="set_section_and_guild(section)">
        <IconGenerator v-if="section.icon == 'astro:generator'" class="size-4" />
        <IconInterface v-else-if="section.icon == 'astro:interface'" class="size-4" />
        <IconVoiceRole v-else-if="section.icon == 'astro:voice-role'" class="size-4" />
        <IconTemplate v-else-if="section.icon == 'astro:template'" class="size-4" />
        <Icon v-else :name="section.icon" class="size-4" />
        <span>{{ section.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconVoiceRole from "~/components/icon/IconVoiceRole.vue";

const { width } = useWindowSize()

const guild_id = useGuildId()
const { sections, current_section, set_section_and_guild } = useDashboardSections()

const { data: guilds } = useGuilds()
const managed_guilds = computed(() =>
  (guilds.value ?? [])
    .filter(g => g.can_manage)
    .sort((a, b) => a.name.localeCompare(b.name))
)

const guild_info = useGuildInfo()

const { data: guild_settings, error: guild_settings_error, isPending: guild_settings_pending } = useGuildSettings(guild_id)
</script>
