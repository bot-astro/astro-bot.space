<template>
  <SelectItem v-for="role in selectable_roles" :key="role.id" :value="role.id">
    <div class="vertical-center gap-2">
      <span
        class="size-3 min-h-3 min-w-3 rounded-full"
        :style="`background-color: #${role.color.toString(16)}`"
      />
      {{ role.name }}
    </div>
  </SelectItem>
  <div
    v-for="role in unmanageable_roles"
    :key="role.id"
    :title="$t('dashboard.role.unmanageable')"
  >
    <SelectItem :value="role.id" disabled>
      <div class="vertical-center text-muted-foreground gap-2">
        <span
          class="size-3 min-h-3 min-w-3 rounded-full"
          :style="`background-color: #${role.color.toString(16)}`"
        />
        {{ role.name }}
      </div>
    </SelectItem>
  </div>
</template>

<script setup lang="ts">
import type { DiscordRole } from '~/types/discord'

const props = defineProps<{
  roles: DiscordRole[]
  guild_id: string | undefined
}>()

// the @everyone role has the same id as the guild
const sorted_roles = computed(() =>
  props.roles
    .filter((r) => r.id !== props.guild_id)
    .sort((a, b) => b.position - a.position),
)
const selectable_roles = computed(() =>
  sorted_roles.value.filter((r) => r.manageable),
)
const unmanageable_roles = computed(() =>
  sorted_roles.value.filter((r) => !r.manageable),
)
</script>
