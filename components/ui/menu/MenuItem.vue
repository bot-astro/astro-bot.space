<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface MenuItemProps {
  first?: boolean
  last?: boolean
  disabled?: boolean
  class?: HTMLAttributes['class']
}

const props = defineProps<MenuItemProps>()
</script>

<template>
  <HMenuItem
    :class="cn(props.disabled ? 'menu-item-disabled' : 'menu-item', props.class, props.first ? 'menu-item-first' : '', props.last ? 'menu-item-last' : '')"
  >
    <slot />
  </HMenuItem>
</template>
