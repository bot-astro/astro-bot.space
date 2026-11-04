<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <!-- first section with get started button -->
    <div
      class="flex min-h-screen max-w-prose flex-col items-center justify-center p-4"
    >
      <NuxtImg src="/img/logo.png" class="size-48 select-none" sizes="200px" />
      <p class="mt-5 font-display text-7xl tracking-widest">ASTRO</p>
      <p class="mt-4 text-center text-xl text-gray-400">
        {{ $t('home.tagline') }}
      </p>
      <ButtonStandout to="/guilds" class="mt-6 text-xl">
        {{ $t('home.get_started') }}
      </ButtonStandout>
    </div>

    <!-- features section -->
    <div class="mx-12 flex w-3/4 flex-col gap-32 md:w-auto">
      <CoreFeatureBox
        illustration-src="illustration/temp_vc.gif"
        :description="$t('home.temp_vc.description')"
        :reverse="false"
      >
        <i18n-t
          keypath="home.temp_vc.title"
          tag="span"
          class="font-display text-2xl font-medium tracking-wide"
        >
          <template #animated>
            <span class="animate-dissolve">{{
              $t('home.temp_vc.animated')
            }}</span>
          </template>
        </i18n-t>
      </CoreFeatureBox>

      <CoreFeatureBox
        :title="$t('home.default_interface.title')"
        :description="$t('home.default_interface.description')"
        illustration-src="guides/default_interface.png"
        :reverse="true"
      />

      <CoreFeatureBox
        :title="$t('home.custom_interface.title')"
        :description="$t('home.custom_interface.description')"
        illustration-src="illustration/custom_interface.png"
        :reverse="false"
      />

      <CoreFeatureBox
        illustration-src="illustration/voice_role.gif"
        :description="$t('home.voice_role.description')"
        :reverse="true"
      >
        <span
          class="animate-light font-display text-2xl font-medium tracking-wide"
          >{{ $t('home.voice_role.title') }}</span
        >
      </CoreFeatureBox>

      <div
        class="backlit-box flex flex-col items-center justify-center rounded-md bordered bg-background p-6 md:max-w-5xl"
        @mousemove="onBacklitBoxMouseMove"
      >
        <span class="font-display text-2xl font-medium tracking-wide">{{
          $t('home.exclusive.title')
        }}</span>
        <span class="mt-4 text-dimmed">
          {{ $t('home.exclusive.description') }}
        </span>
        <ButtonStandout to="/guilds" class="mt-6 w-full md:w-fit">
          {{ $t('home.get_started') }}
        </ButtonStandout>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.animate-dissolve {
  animation: dissolve 4s steps(1, end) infinite;
}

.animate-light {
  animation: light 4s steps(1, end) infinite;
}

@keyframes dissolve {
  0%,
  20%,
  80%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes light {
  0%,
  25%,
  70%,
  80%,
  100% {
    opacity: 1;
  }
  23%,
  68%,
  79%,
  85% {
    opacity: 0.2;
  }
}
</style>
