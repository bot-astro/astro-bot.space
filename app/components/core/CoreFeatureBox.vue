<script lang="ts" setup>
defineProps<{
  illustrationSrc?: string;
  title?: string;
  description: string;
  buttonText?: string;
  buttonTo?: string;
  buttonStyleClasses?: string;
  reverse: boolean;
}>();

const is_illustration_open = ref(false);

function setIsIllustrationDialogOpen(value: boolean) {
  is_illustration_open.value = value;
}
</script>

<template>
  <div
    class="backlit-box flex flex-col rounded-md bordered bg-background md:h-64 md:max-w-5xl"
    :class="reverse ? 'md:flex-row-reverse' : 'md:flex-row'"
    @mousemove="onBacklitBoxMouseMove"
  >
    <!-- feature box -->
    <Dialog v-model:open="is_illustration_open">
      <NuxtImg
        v-if="illustrationSrc"
        :src="illustrationSrc"
        class="z-10 cursor-zoom-in border-white-500 select-none hover:border-2 md:h-64"
        :class="reverse ? 'rounded-r' : 'rounded-l'"
        draggable="false"
        @click="setIsIllustrationDialogOpen(true)"
      />
      <DialogContent class="cursor-zoom-out border-0 p-0" as-child>
        <NuxtImg
          v-if="illustrationSrc"
          :src="illustrationSrc"
          class="z-10 w-4/5 rounded-xl select-none md:h-1/2 md:w-auto"
          draggable="false"
          @click="setIsIllustrationDialogOpen(false)"
        />
        <div
          class="bg-opacity-50 fixed size-full bg-background backdrop-blur"
        />
      </DialogContent>
    </Dialog>

    <div class="flex flex-col p-4">
      <slot>
        <span
          v-if="title"
          class="font-display text-2xl font-medium tracking-wide"
          >{{ title }}</span
        >
      </slot>
      <span class="mt-4 text-dimmed">
        {{ description }}
      </span>
      <div v-if="buttonText" class="grow" />
      <Button
        v-if="buttonTo && buttonText"
        :to="buttonTo"
        class="mt-4 w-full md:w-fit"
        :class="buttonStyleClasses ? buttonStyleClasses : ''"
      >
        {{ buttonText }}
      </Button>
    </div>
  </div>
</template>
