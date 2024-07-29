<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface SwitchDoubleTextProps {
  first: string
  second: string
  class?: HTMLAttributes['class']
}

const props = defineProps<SwitchDoubleTextProps>()

const enabled = defineModel<boolean>()

function toggle() {
  enabled.value = !enabled.value
}
</script>

<template>
  <HSwitch
    v-model="enabled"
    :class="cn('relative grid grid-cols-2 bg-bg-interactive gap-2 bordered rounded-full p-1 cursor-pointer', props.class)"
    @click="toggle"
  >
    <!-- <span
      :class="enabled ? 'bg-purple-500 ring-purple-500 translate-x-6' : 'bg-gray-900 translate-x-0.5 ring-gray-400 ring-4 ring-inset'"
      class="absolute select-none flex-grow flex-shrink basis-0 h-5 w-5 transform rounded-full transition"
    /> -->
    <span
      class="select-none text-center rounded-full px-2 py-1 text-sm transition-all bg-opacity-70"
      :class="enabled ? 'bg-bg-button' : 'hover:bg-gray-300 hover:bg-opacity-30'"
    >{{ first }}</span>
    <span
      class="select-none text-center rounded-full px-2 py-1 text-sm transition-all bg-opacity-70"
      :class="!enabled ? 'bg-bg-button' : 'hover:bg-gray-300 hover:bg-opacity-30'"
    >{{ second }}</span>
  </HSwitch>
</template>
