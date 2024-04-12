<script setup lang="ts">
const isIllustrationDialogOpened = ref(false)
const illustrationSrc = ref<string | null>(null)

function onMouseMove(payload: MouseEvent) {
  const target = payload.currentTarget as HTMLElement | null

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
      class="flex min-h-screen max-w-prose flex-col items-center justify-center p-4"
    >
      <NuxtImg
        src="/img/logo.png"
        class="h-48 w-48 select-none"
      />
      <p class="mt-5 text-7xl tracking-widest font-display">
        ASTRO
      </p>
      <p class="mt-4 text-center text-xl text-gray-400">
        The most unique and complete discord bot for temporary voice channels
        and voice roles!
      </p>
      <NuxtLink
        class="mt-6 text-xl button-primary"
        to="/guilds"
      >
        Get started
      </NuxtLink>
    </div>

    <!-- features section -->
    <div class="mx-12 flex w-3/4 flex-col gap-32 md:w-auto">
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

      <div class="flex flex-col rounded-md feature-box border-box-border bg-background md:max-w-screen-lg md:flex-row" @mousemove="onMouseMove">
        <NuxtImg
          src="illustration/temp_vc.gif"
          class="z-10 cursor-zoom-in select-none rounded-l hover:border-2 md:h-64"
          draggable="false"
          @click="showIllustration('illustration/temp_vc.gif')"
        />
        <div class="flex flex-col p-4">
          <span class="text-2xl font-medium tracking-wide font-display"><span class="animate-dissolve">Temporary </span>Voice Channels</span>
          <span class="mt-4 text-secondary">
            Astro generates fully customisable temporary voice channels on prompt and deletes them when they get empty.
            Ships with extreme customisation so that you can create the perfect system for your server!
          </span>
          <div class="grow" />
          <NuxtLink to="temporary-voice-channels" class="mt-4 w-full button md:w-fit">
            Explore
          </NuxtLink>
        </div>
      </div>

      <div class="flex flex-col rounded-md feature-box border-box-border bg-background md:max-w-screen-lg md:flex-row-reverse" @mousemove="onMouseMove">
        <NuxtImg
          src="illustration/voice_role.gif"
          class="z-10 cursor-zoom-in select-none rounded-r hover:border-2 md:h-64"
          draggable="false"
          @click="showIllustration('illustration/voice_role.gif')"
        />
        <div class="flex flex-col p-4">
          <span class="text-2xl font-medium tracking-wide font-display animate-light">Voice Roles</span>
          <span class="mt-4 text-secondary">
            Astro can assign or remove a role when a user joins a specific voice channel!
            This way you can, for example, let people see gaming text chats only while they are in a gaming VC, imagination is your only limit!
          </span>
          <div class="grow" />
          <NuxtLink to="temporary-voice-channels" class="mt-4 w-full button md:w-fit">
            Explore
          </NuxtLink>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center rounded-md p-6 feature-box border-box-border bg-background md:max-w-screen-lg" @mousemove="onMouseMove">
        <span class="text-2xl font-medium tracking-wide font-display">Voice Channels Exclusive</span>
        <span class="mt-4 text-secondary">
          Focusing only on voice channels makes Astro the best bot of its kind, try it now!
        </span>
        <NuxtLink to="guilds" class="mt-6 w-full button-primary md:w-fit">
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
  /*noinspection CssUnresolvedCustomProperty*/
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

.animate-dissolve {
  animation: dissolve 4s steps(1, end) infinite;
}

.animate-light {
  animation: light 4s steps(1, end) infinite;
}

@keyframes dissolve {
  0%, 20%, 80%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes light {
  0%, 25%, 70%, 80%, 100% {
    opacity: 1;
  }
  23%, 68%, 79%, 85% {
    opacity: 0.2;
  }
}
</style>
