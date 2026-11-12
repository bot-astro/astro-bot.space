<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface GroupSettingProps {
  heading: string
  description?: string
  class?: HTMLAttributes['class']
  compact?: boolean
  ultimate?: boolean
  hideUltimateBadge?: boolean
}

const props = defineProps<GroupSettingProps>()
defineEmits(['upgrade'])
</script>

<template>
  <div
    :class="
      cn(
        props.class,
        props.compact && 'max-w-64',
        props.ultimate && 'relative',
        'group-setting flex min-w-full flex-col gap-2 md:min-w-0',
      )
    "
  >
    <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
      <div class="flex flex-col gap-1 md:gap-0">
        <div class="vertical-center gap-2">
          <span class="text-heading">{{ props.heading }}</span>
          <slot name="heading-action" />
          <Badge
            v-if="props.ultimate && !props.hideUltimateBadge"
            variant="ultimate"
            >{{ $t('common.ultimate') }}</Badge
          >
        </div>
        <span v-if="props.description" class="text-description">{{
          props.description
        }}</span>
        <slot name="description" class="text-description" />
      </div>
      <div class="grow" />
      <slot />
    </div>
    <div v-if="props.compact" class="grow" />
    <slot name="bottom-action" />

    <DashboardUltimateOverlay v-if="props.ultimate" @click="$emit('upgrade')" />
  </div>
</template>
