<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface GroupSettingProps {
  heading: string
  description?: string
  class?: HTMLAttributes['class']
  compact?: boolean
  ultimate?: boolean
}

const props = defineProps<GroupSettingProps>()
defineEmits(['upgrade'])
</script>

<template>
  <div :class="cn(props.class, props.compact && 'max-w-64', props.ultimate && 'relative', 'group-setting flex flex-col gap-2 min-w-full md:min-w-0')">
    <div class="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
      <div class="flex flex-col gap-1 md:gap-0">
        <div class="vertical-center gap-2">
          <span class="text-heading">{{ props.heading }}</span>
          <Badge variant="ultimate" v-if="props.ultimate">Ultimate</Badge>
        </div>
        <span v-if="props.description" class="text-description">{{ props.description }}</span>
        <slot name="description" class="text-description"/>
      </div>
      <div class="grow" />
      <slot />
    </div>
    <div v-if="props.compact" class="grow" />
    <slot name="bottom-action" />

    <DashboardUltimateOverlay v-if="props.ultimate" @click="$emit('upgrade')" />
  </div>
</template>
