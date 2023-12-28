<template>
  <div
    class="w-full border-t border-neutral-800 bg-neutral-950 px-4 pb-4 pt-12"
  >
    <!-- footer links section -->
    <div class="flex justify-around md:justify-evenly">
      <div class="flex flex-col gap-y-3">
        <p class="text-lg">Resources</p>
        <div class="flex flex-col gap-y-2">
          <NuxtLink to="/support"> Support </NuxtLink>
          <NuxtLink to="/premium"> Premium </NuxtLink>
          <NuxtLink to="/support"> Status </NuxtLink>
        </div>
      </div>
      <div class="flex flex-col gap-y-3">
        <p class="text-lg">Company</p>
        <div class="flex flex-col gap-y-2">
          <NuxtLink to="/"> Home </NuxtLink>
          <a href="mailto:hi@astro-bot.space"> Contact us </a>
        </div>
      </div>
      <div class="flex flex-col gap-y-3">
        <p class="text-lg">Legal</p>
        <div class="flex flex-col gap-y-2">
          <NuxtLink to="/privacy"> Privacy policy </NuxtLink>
          <NuxtLink to="/terms"> Terms of Service </NuxtLink>
          <NuxtLink href="mailto:hi@astro-bot.space"> Refund policy </NuxtLink>
        </div>
      </div>
    </div>

    <!-- footer socials and developed by text -->
    <div class="mt-6 flex items-center justify-between">
      <div>
        <NuxtLink to="/github">
          <Icon name="pajamas:github" class="h-5 w-5 text-white" />
        </NuxtLink>
      </div>
      <div class="flex items-center">
        <Icon name="fluent:code-16-filled" class="h-6 w-6" />
        &nbsp;by&nbsp;<a
          href="https://giuliopime.dev"
          target="_blank"
          class="text-purple-400"
          >Giuliopime</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
