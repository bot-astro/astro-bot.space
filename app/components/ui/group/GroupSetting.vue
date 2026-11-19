<script lang="ts" setup>
import type { HTMLAttributes, Ref } from 'vue'
import { AI_CHANGED_FIELDS_KEY } from '~/composables/dashboard/useAiChangedFields'

interface GroupSettingProps {
  heading: string
  description?: string
  class?: HTMLAttributes['class']
  compact?: boolean
  ultimate?: boolean
  hideUltimateBadge?: boolean
  /**
   * form field this setting edits, highlighted when the AI fill changed it
   */
  field?: string
}

const props = defineProps<GroupSettingProps>()
defineEmits(['upgrade'])

const ai_changed_fields = inject<Ref<string[]>>(AI_CHANGED_FIELDS_KEY, ref([]))
const ai_changed = computed(
  () =>
    props.field !== undefined &&
    ai_changed_fields.value.some(
      (f) =>
        f === props.field ||
        f.startsWith(`${props.field}.`) ||
        props.field!.startsWith(`${f}.`),
    ),
)
</script>

<template>
  <div
    :class="
      cn(
        props.class,
        props.compact && 'max-w-64',
        props.ultimate && 'relative',
        ai_changed && 'border-pink-500/80 bg-pink-500/5',
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
