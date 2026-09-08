<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import type { ComboboxGroupProps } from 'radix-vue';
import { ComboboxGroup, ComboboxLabel } from 'radix-vue';

const props = defineProps<
  ComboboxGroupProps & {
    class?: HTMLAttributes['class'];
    heading?: string;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ComboboxGroup
    v-bind="delegatedProps"
    :class="
      cn(
        '**:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium',
        props.class,
      )
    "
  >
    <ComboboxLabel
      v-if="heading"
      class="text-muted-foreground px-2 py-1.5 text-xs font-medium"
    >
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>
