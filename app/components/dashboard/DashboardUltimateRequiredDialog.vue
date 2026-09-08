<template>
  <Dialog v-model:open="open">
    <DialogContent>
      <div class="flex flex-col gap-2">
        <p class="text-center text-xl">Ultimate required</p>
        <div class="text-description">
          <slot />
        </div>

        <div class="mt-8 flex flex-col justify-end gap-2 sm:flex-row">
          <ButtonUltimate @click="emit('upgrade')">
            Upgrade server
          </ButtonUltimate>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
const open = defineModel<boolean>();
const emit = defineEmits(['upgrade']);
</script>
