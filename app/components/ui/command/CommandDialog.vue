<script setup lang="ts">
import { useForwardPropsEmits } from 'radix-vue';
import type { DialogRootEmits, DialogRootProps } from 'radix-vue';
import Command from './Command.vue';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <Dialog v-bind="forwarded">
    <DialogContent class="overflow-hidden p-0 shadow-lg">
      <Command
        class="**:[[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-item]_svg]:size-5 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group]]:px-2 **:[[cmdk-input]]:h-12 **:[[cmdk-item]]:px-2 **:[[cmdk-item]]:py-3"
      >
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>
