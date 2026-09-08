<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import {
  DropdownMenuItem,
  type DropdownMenuItemProps,
  useForwardProps,
} from 'radix-vue';

const props = defineProps<
  DropdownMenuItemProps & { class?: HTMLAttributes['class']; inset?: boolean }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="
      cn(
        'menu-item',
        'text-opacity-80 focus:bg-accent relative flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm text-foreground transition-colors outline-none select-none hover:bg-background data-disabled:pointer-events-none',
        inset && 'pl-8',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuItem>
</template>
