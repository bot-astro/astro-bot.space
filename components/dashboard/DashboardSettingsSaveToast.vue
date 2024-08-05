<template>
  <div :class="cn(props.open ? 'visible' : 'invisible', 'fixed bottom-10 max-w-[calc(100%-50px-4rem)] md:max-w-[calc(100%-250px-4rem)] w-full flex justify-center')">
    <div class="w-fit flex flex-col md:flex-row items-center bg-background-interactive bordered rounded p-2 xsm:p-4 gap-4 md:gap-32">
      <span class="text-center">Careful - you have unsaved changes!</span>

      <div class="flex items-center gap-6">
        <ButtonText class="hover:underline" @click="$emit('reset')">
          Reset
        </ButtonText>
        <Button class="bg-[#248046] hover:bg-[#1A6334]" @click="$emit('save')">
          Save
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ open: boolean }>()
const emit = defineEmits(['reset', 'save'])
</script>
