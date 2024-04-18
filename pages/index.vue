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
      <CoreFeatureBox
        illustration-src="illustration/temp_vc.gif"
        description="Astro generates fully customisable temporary voice channels on prompt and deletes them when they get empty. Ships with extreme customisation so that you can create the perfect system for your server!"
        button-text="Explore"
        button-to="/temporary-voice-channels"
        :reverse="false"
      >
        <span class="text-2xl font-medium tracking-wide font-display"><span class="animate-dissolve">Temporary </span>Voice Channels</span>
      </CoreFeatureBox>

      <CoreFeatureBox
        illustration-src="illustration/voice_role.gif"
        description="Astro can assign or remove a role when a user joins a specific voice channel! This way you can, for example, let people see gaming text chats only while they are in a gaming VC, imagination is your only limit!"
        button-text="Explore"
        button-to="/voice-roles"
        :reverse="true"
      >
        <span class="text-2xl font-medium tracking-wide font-display animate-light">Voice Roles</span>
      </CoreFeatureBox>

      <div
        class="flex flex-col items-center justify-center rounded-md p-6 backlit-box border-box-border bg-background md:max-w-screen-lg"
        @mousemove="onBacklitBoxMouseMove"
      >
        <span class="text-2xl font-medium tracking-wide font-display">Voice Channels Exclusive</span>
        <span class="mt-4 text-secondary">
          Focusing only on voice channels makes Astro the best bot of its kind, try it now!
        </span>
        <NuxtLink to="/guilds" class="mt-6 w-full button-primary-bordered md:w-fit">
          Get started
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

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
