<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  SwitchRoot,
  type SwitchRootEmits,
  type SwitchRootProps,
  useForwardPropsEmits,
} from 'radix-vue'

const props = defineProps<
  SwitchRootProps & {
    class?: HTMLAttributes['class']
    first: string
    second: string
  }
>()

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SwitchRoot
    v-slot="{ checked }"
    v-bind="forwarded"
    :class="
      cn(
        'peer grid cursor-pointer grid-cols-2 gap-2 rounded-full border border-border bg-background-interactive p-1 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <span
      class="bg-opacity-70 rounded-full px-2 py-1 text-center text-sm transition-all select-none"
      :class="
        checked
          ? 'bg-background-button'
          : 'hover:bg-opacity-30 hover:bg-gray-300'
      "
    >
      <span v-if="props.first">{{ first }}</span>
      <slot name="first" />
    </span>
    <span
      class="bg-opacity-70 rounded-full px-2 py-1 text-center text-sm transition-all select-none"
      :class="
        !checked
          ? 'bg-background-button'
          : 'hover:bg-opacity-30 hover:bg-gray-300'
      "
    >
      <span v-if="props.second">{{ second }}</span>
      <slot name="second" />
    </span>
  </SwitchRoot>
</template>
