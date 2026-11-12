<template>
  <div
    :class="
      cn(
        props.open ? 'visible' : 'invisible',
        'fixed bottom-10 z-50 flex w-full max-w-[calc(100%-50px-4rem)] justify-center md:max-w-[calc(100%-250px-4rem)]',
      )
    "
  >
    <div
      class="flex w-fit flex-col items-center gap-4 rounded bordered bg-background-interactive p-2 xsm:p-4 md:flex-row md:gap-32"
    >
      <span class="text-center">{{ $t('dashboard.save_toast.message') }}</span>

      <div class="flex items-center gap-6">
        <ButtonText class="hover:underline" @click="$emit('reset')">
          {{ $t('common.reset') }}
        </ButtonText>
        <Button
          class="bg-[#248046] hover:bg-discord-green"
          :loading="props.loading"
          @click="$emit('save')"
        >
          {{ $t('common.save') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ open: boolean; loading: boolean }>()
defineEmits(['reset', 'save'])
</script>
