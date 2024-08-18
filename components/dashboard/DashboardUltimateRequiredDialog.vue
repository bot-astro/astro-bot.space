<template>
  <Dialog v-model:open="open">
    <DialogContent>
      <div class="flex flex-col gap-2">
        <p class="text-xl text-center">
          Ultimate required
        </p>
        <div class="text-description">
          <slot />
        </div>

        <div class="flex flex-col sm:flex-row justify-end mt-8 gap-2">
          <ButtonUltimate @click="emit('upgrade')">
            Upgrade server
          </ButtonUltimate>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
const open = defineModel<boolean>()
const emit = defineEmits(['upgrade'])
</script>