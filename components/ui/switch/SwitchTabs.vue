<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  SwitchRoot,
  type SwitchRootEmits,
  type SwitchRootProps,
  SwitchThumb,
  useForwardPropsEmits,
} from 'radix-vue'

const props = defineProps<SwitchRootProps & { class?: HTMLAttributes['class'], first: string, second: string }>()

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    :class="cn(
      'peer grid grid-cols-2 bg-background-interactive gap-2 border border-border rounded-full p-1 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
    v-slot="{ checked }"
    @click="emits('update:checked', !props.checked)"
  >

    <span
      class="select-none text-center rounded-full px-2 py-1 text-sm transition-all bg-opacity-70"
      :class="checked ? 'bg-background-button' : 'hover:bg-gray-300 hover:bg-opacity-30'"
    >{{ first }}</span>
    <span
      class="select-none text-center rounded-full px-2 py-1 text-sm transition-all bg-opacity-70"
      :class="!checked ? 'bg-background-button' : 'hover:bg-gray-300 hover:bg-opacity-30'"
    >{{ second }}</span>
  </SwitchRoot>
</template>
