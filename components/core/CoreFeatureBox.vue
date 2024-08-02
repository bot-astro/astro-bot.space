<script lang="ts" setup>
defineProps<{
  illustrationSrc: string
  title?: string
  description: string
  buttonText?: string
  buttonTo?: string
  buttonStyleClasses?: string
  reverse: boolean
}>()

const is_illustration_open = ref(false)

function setIsIllustrationDialogOpen(value: boolean) {
  is_illustration_open.value = value
}
</script>

<template>
  <div
    class="flex flex-col rounded-md backlit-box bordered bg-background md:max-w-screen-lg"
    :class="reverse ? 'md:flex-row-reverse' : 'md:flex-row'"
    @mousemove="onBacklitBoxMouseMove"
  >
    <!-- feature box -->
    <Dialog v-model:open="is_illustration_open">
      <NuxtImg
        :src="illustrationSrc"
        class="z-10 cursor-zoom-in select-none border-white-500 hover:border-2 md:h-64"
        :class="reverse ? 'rounded-r' : 'rounded-l'"
        draggable="false"
        @click="setIsIllustrationDialogOpen(true)"
      />
      <DialogContent class="cursor-zoom-out border-0 p-0" as-child>
        <NuxtImg
          v-if="illustrationSrc"
          :src="illustrationSrc"
          class="z-10 w-4/5 select-none rounded-xl md:h-1/2 md:w-auto"
          draggable="false"
          @click="setIsIllustrationDialogOpen(false)"
        />
        <div class="fixed h-full w-full bg-opacity-50 backdrop-blur bg-background" />
      </DialogContent>
    </Dialog>

    <div class="flex flex-col p-4">
      <slot>
        <span v-if="title" class="text-2xl font-medium tracking-wide font-display">{{ title }}</span>
      </slot>
      <span class="mt-4 text-dimmed">
        {{ description }}
      </span>
      <div v-if="buttonText" class="grow" />
      <Button
        v-if="buttonTo && buttonText"
        :to="buttonTo"
        class="mt-4 w-full md:w-fit" :class="buttonStyleClasses ? buttonStyleClasses : ''"
      >
        {{ buttonText }}
      </Button>
    </div>
  </div>
</template>
