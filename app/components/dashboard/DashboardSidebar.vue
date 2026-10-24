<template>
  <div class="flex min-h-full flex-col">
    <!-- Server indicator -->
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          class="flex min-h-16 w-full items-center bordered bg-background p-4 text-start md:min-h-20"
        >
          <!-- server loaded -->
          <div class="flex size-full items-center gap-2">
            <!-- guild icon -->
            <NuxtImg
              v-if="guild_info?.icon"
              :src="discordGuildIconUri(guild_info.id, guild_info.icon)"
              class="size-6 max-w-none rounded-full bordered md:size-8"
            />
            <p
              v-else-if="guild_info?.name"
              class="flex size-6 items-center justify-center truncate rounded-full bordered font-semibold text-white md:size-8"
            >
              {{
                guild_info.name
                  .split(' ')
                  .map((a) => a.charAt(0).toUpperCase())
                  .join('')
              }}
            </p>
            <Skeleton v-else class="size-6 rounded-full md:size-8" />

            <!-- name & ultimate status -->
            <div class="flex grow flex-col">
              <span v-if="guild_info"> {{ guild_info.name }}</span>
              <Skeleton v-else class="mb-1 h-2" />

              <span v-if="guild_settings" class="text-secondary text-xs">
                {{ isGuildUltimate(guild_settings) ? 'Ultimate' : 'Free' }}
              </span>
            </div>

            <IconDropdown class="size-5 -rotate-90 text-foreground-secondary" />
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        class="max-h-72 overflow-y-auto"
        :side="width > 700 ? 'right' : 'bottom'"
      >
        <DropdownMenuItem
          v-for="_guild in managed_guilds"
          :key="_guild.id"
          @click="set_section_and_guild(undefined, _guild.id)"
        >
          <div class="flex items-center gap-2">
            <NuxtImg
              v-if="_guild.icon"
              :src="discordGuildIconUri(_guild.id, _guild.icon)"
              class="size-4 rounded-full"
            />
            <p
              v-else
              class="flex size-4 items-center justify-center truncate rounded-full bordered text-xs font-semibold text-white"
            >
              {{
                _guild.name
                  .split(' ')
                  .map((a) => a.charAt(0).toUpperCase())
                  .join('')
              }}
            </p>
            <span>{{ _guild.name }}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- settings navigation -->
    <div
      class="flex min-h-full grow flex-col border-r border-border bg-background-container pt-4"
    >
      <div
        v-for="section in sections"
        :key="section.id"
        class="flex cursor-pointer flex-row items-center gap-3 px-4 py-2 transition-colors hover:bg-background"
        :class="current_section.id === section.id ? 'bg-background' : ''"
        @click="set_section_and_guild(section)"
      >
        <IconSettings v-if="section.icon == 'astro:settings'" class="size-4" />
        <IconGenerator
          v-else-if="section.icon == 'astro:generator'"
          class="size-4"
        />
        <IconInterface
          v-else-if="section.icon == 'astro:interface'"
          class="size-4"
        />
        <IconVoiceRole
          v-else-if="section.icon == 'astro:voice-role'"
          class="size-4"
        />
        <IconTemplate
          v-else-if="section.icon == 'astro:template'"
          class="size-4"
        />
        <Icon v-else :name="section.icon" class="size-4" />
        <span>{{ section.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconVoiceRole from '~/components/icon/IconVoiceRole.vue';

const { width } = useWindowSize();

const guild_id = useGuildId();
const { sections, current_section, set_section_and_guild } =
  useDashboardSections();

const { data: guilds } = useGuilds();
const managed_guilds = computed(() =>
  (guilds.value ?? [])
    .filter((g) => g.can_manage)
    .sort((a, b) => a.name.localeCompare(b.name)),
);

const guild_info = useGuildInfo();

const {
  data: guild_settings,
  error: guild_settings_error,
  isPending: guild_settings_pending,
} = useGuildSettings(guild_id);
</script>
