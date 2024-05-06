<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface SwitchProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<SwitchProps>()

const enabled = defineModel<boolean>()

function toggle() {
  enabled.value = !enabled.value
}
</script>

<template>
  <HSwitch
    v-model="enabled"
    :class="cn('relative bg-gray-900 bordered flex w-14 shrink-0 items-center rounded-full border p-1 shadow-lg cursor-pointer h-min', props.class)"
    @click="toggle"
  >
    <span
      :class="enabled ? 'bg-purple-500 ring-purple-500 translate-x-6' : 'bg-gray-900 translate-x-0.5 ring-gray-400 ring-4 ring-inset'"
      class="inline-block h-5 w-5 transform rounded-full transition"
    />
  </HSwitch>
</template>
