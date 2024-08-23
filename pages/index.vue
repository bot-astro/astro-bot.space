<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <!-- first section with get started button -->
    <div
      class="flex min-h-screen max-w-prose flex-col items-center justify-center p-4"
    >
      <NuxtImg
        src="/img/logo.png"
        class="select-none h-48 w-48"
        sizes="200px"
      />
      <p class="mt-5 font-display text-7xl tracking-widest">
        ASTRO
      </p>
      <p class="mt-4 text-center text-xl text-gray-400">
        The most unique and complete discord bot for temporary voice channels
        and voice roles!
      </p>
      <ButtonStandout
        to="/guilds"
        class="mt-6 text-xl"
      >
        Get started
      </ButtonStandout>
    </div>

    <!-- features section -->
    <div class="mx-12 flex w-3/4 flex-col gap-32 md:w-auto">
      <CoreFeatureBox
        illustration-src="illustration/temp_vc.gif"
        description="Astro generates fully customisable temporary voice channels on prompt and deletes them when they get empty. Ships with extreme customisation so that you can create the perfect system for your server!"
        :reverse="false"
      >
        <span class="font-display text-2xl font-medium tracking-wide"><span class="animate-dissolve">Temporary </span>Voice Channels</span>
      </CoreFeatureBox>

      <CoreFeatureBox
        title="Beautiful interface"
        description="Astro ships with a beautiful default interface which makes it easy for mobile users to manage their private channel!"
        illustration-src="guides/default_interface.png"
        :reverse="true"
      />

      <CoreFeatureBox
        title="But also customisable"
        description="Astro interfaces are fully customisable down to the last pixel, make it look exactly how you need, imagination is your only limit!"
        illustration-src="illustration/custom_interface.png"
        :reverse="false"
      />

      <CoreFeatureBox
        illustration-src="illustration/voice_role.gif"
        description="Astro can assign or remove a role when a user joins a specific voice channel! This way you can, for example, let people see gaming text chats only while they are in a gaming VC, imagination is your only limit!"
        :reverse="true"
      >
        <span class="animate-light font-display text-2xl font-medium tracking-wide">Voice Roles</span>
      </CoreFeatureBox>

      <div
        class="backlit-box bordered flex flex-col items-center justify-center rounded-md bg-background p-6 md:max-w-screen-lg"
        @mousemove="onBacklitBoxMouseMove"
      >
        <span class="font-display text-2xl font-medium tracking-wide">Voice Channels Exclusive</span>
        <span class="text-dimmed mt-4">
          Focusing only on voice channels makes Astro the best bot of its kind, try it now!
        </span>
        <ButtonStandout
          to="/guilds"
          class="mt-6 w-full md:w-fit"
        >
          Get started
        </ButtonStandout>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
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
