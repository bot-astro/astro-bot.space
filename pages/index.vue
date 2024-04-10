<script setup lang="ts">
const isIllustrationDialogOpened = ref(false)
const illustrationSrc = ref<string | null>(null)

function onMouseMove(payload: MouseEvent) {
  const target = payload.currentTarget as HTMLElement

  if (target !== null) {
    const rect = target.getBoundingClientRect()
    const x = payload.clientX - rect.left
    const y = payload.clientY - rect.top

    target.style.setProperty('--mouse-x', `${x}px`)
    target.style.setProperty('--mouse-y', `${y}px`)
  }
}

function showIllustration(src: string) {
  illustrationSrc.value = src
  isIllustrationDialogOpened.value = true
  // eslint-disable-next-line no-console
  console.log(isIllustrationDialogOpened)
}

function setIsIllustrationDialogOpen(value: boolean) {
  isIllustrationDialogOpened.value = value
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <!-- first section with get started button -->
    <div
      class="min-h-screen flex max-w-prose flex-col items-center justify-center p-4"
    >
      <NuxtImg
        src="/img/logo.png"
        class="h-48 w-48 select-none"
      />
      <p class="mt-5 font-display text-7xl tracking-widest">
        ASTRO
      </p>
      <p class="mt-4 text-center text-xl text-gray-400">
        The most unique and complete discord bot for temporary voice channels
        and voice roles!
      </p>
      <button
        class="button-primary mt-6 text-xl"
        @click="navigateTo('/dashboard')"
      >
        Get started
      </button>
    </div>

    <!-- features section -->
    <div class="flex flex-col mx-12 w-3/4 md:w-auto gap-32">
      <!-- illustration popup -->
      <HDialog
        :open="isIllustrationDialogOpened"
        class="fixed top-0 left-0 h-full w-full flex items-center justify-center  z-50"
        @close="setIsIllustrationDialogOpen"
      >
        <HDialogPanel class="flex items-center justify-center w-full h-full cursor-pointer cursor-zoom-out" @click="setIsIllustrationDialogOpen(false)">
          <NuxtImg
            v-if="illustrationSrc"
            :src="illustrationSrc"
            class="rounded-xl w-4/5 md:w-auto md:h-1/2 z-10 select-none"
            draggable="false"
          />
          <div class="fixed bg-background backdrop-blur bg-opacity-50 w-full h-full" />
        </HDialogPanel>
      </HDialog>

      <div class="flex flex-col md:max-w-screen-lg md:flex-row feature-box border-box-border rounded-md bg-background" @mousemove="onMouseMove">
        <NuxtImg
          src="illustration/temp_vc.gif"
          class="rounded-l md:h-64 z-10 select-none cursor-zoom-in hover:border-2"
          draggable="false"
          @click="showIllustration('illustration/temp_vc.gif')"
        />
        <div class="flex flex-col p-4">
          <span class="font-display text-2xl font-medium tracking-wide">Temporary Voice Channels</span>
          <span class="mt-4 text-secondary">
            Astro generates fully customisable temporary voice channels on prompt and deletes them when they get empty.
            Ships with extreme customisation so that you can create the perfect system for your server!
          </span>
          <div class="grow" />
          <NuxtLink to="temporary-voice-channels" class="button mt-4 w-full md:w-fit">
            Explore
          </NuxtLink>
        </div>
      </div>

      <div class="flex flex-col md:flex-row-reverse md:max-w-screen-lg feature-box border-box-border rounded-md bg-background" @mousemove="onMouseMove">
        <NuxtImg
          src="illustration/voice_role.gif"
          class="md:h-64 z-10 select-none rounded-r cursor-zoom-in hover:border-2"
          draggable="false"
          @click="showIllustration('illustration/voice_role.gif')"
        />
        <div class="flex flex-col p-4">
          <span class="font-display text-2xl font-medium tracking-wide">Voice Roles</span>
          <span class="mt-4 text-secondary">
            Astro can assign or remove a role when a user joins a specific voice channel!
            This way you can, for example, let people see gaming text chats only while they are in a gaming VC, imagination is your only limit!
          </span>
          <div class="grow" />
          <NuxtLink to="temporary-voice-channels" class="button mt-4 w-full md:w-fit">
            Explore
          </NuxtLink>
        </div>
      </div>

      <div class="flex flex-col md:max-w-screen-lg feature-box border-box-border rounded-md bg-background p-6 justify-center items-center" @mousemove="onMouseMove">
        <span class="font-display text-2xl font-medium tracking-wide">Voice Channels Exclusive</span>
        <span class="mt-4 text-secondary">
          Focusing only on voice channels makes Astro the best bot of its kind, try it now!
        </span>
        <NuxtLink to="guilds" class="button-primary mt-6 w-full md:w-fit">
          Get started
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
.feature-box {
  position: relative;
}
.feature-box * {
  z-index: 4;
}

.feature-box::before {
  background: radial-gradient(
    800px circle at var(--mouse-x) var(--mouse-y),
    /* #A855F799, */
    #ec489a99,
    transparent 30%
  );
  border-radius: inherit;
  content: "";
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  opacity: 0;
  transition: opacity 500ms;
}

.feature-box:hover::before {
    opacity: 1;
}
</style>
