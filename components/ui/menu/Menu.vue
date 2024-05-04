<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface MenuProps {
  open?: boolean
  class?: HTMLAttributes['class']
}

const props = defineProps<MenuProps>()
</script>

<template>
  <HMenu as="div" :class="cn('relative inline-block', props.class)">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </HMenu>
</template>
