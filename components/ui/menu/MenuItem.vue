<template>
  <HMenuItem :class="cn('menu-item', props.class, props.first ? 'menu-item-first' : '', props.last ? 'menu-item-last' : '')">
    <slot />
  </HMenuItem>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface MenuItemProps {
  first?: boolean,
  last?: boolean,
  class?: HTMLAttributes['class']
}

const props = defineProps<MenuItemProps>()
</script>