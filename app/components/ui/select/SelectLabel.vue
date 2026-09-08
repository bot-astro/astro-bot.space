<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { SelectLabel, type SelectLabelProps } from 'radix-vue';

const props = defineProps<
  SelectLabelProps & { class?: HTMLAttributes['class'] }
>();
</script>

<template>
  <SelectLabel
    :class="cn('py-1.5 pr-2 pl-8 text-sm font-semibold', props.class)"
  >
    <slot />
  </SelectLabel>
</template>
