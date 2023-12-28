<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <!-- first section with get started button -->
    <div
      class="-mt-36 flex max-w-prose flex-col items-center justify-center p-4"
    >
      <NuxtImg src="/img/logo.png" class="h-48 w-48 select-none" />
      <p class="mt-5 font-display text-7xl tracking-widest">ASTRO</p>
      <p class="mt-4 text-center text-xl text-gray-400">
        The most unique and complete discord bot for temporary voice channels
        and voice roles!
      </p>
      <button
        @click="navigateTo('/dashboard')"
        class="primary-button mt-6 text-xl"
      >
        Get started
      </button>
    </div>

    <!-- features section -->
    <div class="flex flex-col">
      <!-- TODO: explanation of temporary voice channels (with interface) -->
      <!-- TODO: explanation of voice roles -->
    </div>

    <!-- TODO: get started section -->
  </div>
</template>
