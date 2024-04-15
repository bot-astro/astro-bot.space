<script lang="ts" setup>
defineProps<{
  illustrationSrc: string
  title?: string
  description: string
  buttonText?: string
  buttonTo?: string
  reverse: boolean
}>()

const isIllustrationDialogOpened = ref(false)

function showIllustration() {
  isIllustrationDialogOpened.value = true
}

function setIsIllustrationDialogOpen(value: boolean) {
  isIllustrationDialogOpened.value = value
}
</script>

<template>
  <div
    class="flex flex-col rounded-md backlit-box border-box-border bg-background md:max-w-screen-lg"
    :class="reverse ? 'md:flex-row-reverse' : 'md:flex-row'"
    @mousemove="onBacklitBoxMouseMove"
  >
    <!-- illustration popup -->
    <HDialog
      :open="isIllustrationDialogOpened"
      class="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center"
      @close="setIsIllustrationDialogOpen"
    >
      <HDialogPanel class="flex h-full w-full cursor-zoom-out items-center justify-center" @click="setIsIllustrationDialogOpen(false)">
        <NuxtImg
          v-if="illustrationSrc"
          :src="illustrationSrc"
          class="z-10 w-4/5 select-none rounded-xl md:h-1/2 md:w-auto"
          draggable="false"
        />
        <div class="fixed h-full w-full bg-opacity-50 backdrop-blur bg-background" />
      </HDialogPanel>
    </HDialog>

    <!-- feature box -->
    <NuxtImg
      :src="illustrationSrc"
      class="z-10 cursor-zoom-in select-none rounded-r hover:border-2 md:h-64"
      draggable="false"
      @click="showIllustration()"
    />
    <div class="flex flex-col p-4">
      <slot>
        <span v-if="title" class="text-2xl font-medium tracking-wide font-display">{{ title }}</span>
      </slot>
      <span class="mt-4 text-secondary">
        {{ description }}
      </span>
      <div v-if="buttonText" class="grow" />
      <NuxtLink v-if="buttonTo && buttonText" :to="buttonTo" class="mt-4 w-full button md:w-fit">
        {{ buttonText }}
      </NuxtLink>
    </div>
  </div>
</template>
