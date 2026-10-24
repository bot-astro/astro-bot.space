<script setup lang="ts">
import { navigateTo } from '#imports'
useHead({
  title: 'Guides - Astro - Temporary Voice Channels for your Discord!',
  meta: [
    {
      name: 'description',
      content: 'Need help with Astro, check out these beginner friendly guides',
    },
    {
      property: 'og:title',
      content: 'Guides - Astro - Temporary Voice Channels for your Discord!',
    },
    {
      property: 'og:description',
      content: 'Need help with Astro, check out these beginner friendly guides',
    },
    { property: 'og:url', content: 'https://astro-bot.space/guides' },
  ],
})
</script>

<template>
  <div class="mx-12 mt-16 flex w-3/4 flex-col items-center gap-16 md:w-auto">
    <div class="flex flex-col gap-4">
      <span class="text-title text-center">Guides</span>
      <span class="text-subtitle text-center"
        >Here are some handy guides that will help you get started using Astro
        and creating the perfect setup for your server!</span
      >
    </div>

    <div class="flex w-full flex-col gap-2">
      <div
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:cursor-pointer hover:bg-background-container/90"
        @click="navigateTo('/guides/basic')"
      >
        <IconQuestion
          class="size-5 shrink-0 group-hover:stroke-foreground-link-standout"
        />
        <div class="flex flex-col">
          <span class="text-heading group-hover:text-foreground-link-standout"
            >Getting started</span
          >
          <span class="text-description"
            >Get started using Astro learning the basics</span
          >
        </div>
        <div class="grow" />
        <IconDropdown
          class="size-5 shrink-0 -rotate-90 group-hover:text-foreground-link-standout"
        />
      </div>

      <div
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:cursor-pointer hover:bg-background-container/90"
        @click="navigateTo('/guides/generator')"
      >
        <IconGenerator
          class="size-5 shrink-0 group-hover:stroke-foreground-link-standout"
        />
        <div class="flex flex-col">
          <span class="text-heading group-hover:text-foreground-link-standout"
            >Generators</span
          >
          <span class="text-description"
            >Learn how to configure and use temporary voice channel
            generators</span
          >
        </div>
        <div class="grow" />
        <IconDropdown
          class="size-5 shrink-0 -rotate-90 group-hover:text-foreground-link-standout"
        />
      </div>

      <div
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:cursor-pointer hover:bg-background-container/90"
        @click="navigateTo('/guides/interface')"
      >
        <IconInterface
          class="size-5 shrink-0 group-hover:stroke-foreground-link-standout"
        />
        <div class="flex flex-col">
          <span class="text-heading group-hover:text-foreground-link-standout"
            >Interfaces</span
          >
          <span class="text-description"
            >Learn how to make your interface look amazing and unique with this
            guide</span
          >
        </div>
        <div class="grow" />
        <IconDropdown
          class="size-5 shrink-0 -rotate-90 group-hover:text-foreground-link-standout"
        />
      </div>

      <div
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:cursor-pointer hover:bg-background-container/90"
        @click="navigateTo('/guides/template')"
      >
        <IconTemplate
          class="size-5 shrink-0 group-hover:stroke-foreground-link-standout"
        />
        <div class="flex flex-col">
          <span class="text-heading group-hover:text-foreground-link-standout"
            >Templates</span
          >
          <span class="text-description"
            >Discover templates and learn how to configure them, your users will
            love them</span
          >
        </div>
        <div class="grow" />
        <IconDropdown
          class="size-5 shrink-0 -rotate-90 group-hover:text-foreground-link-standout"
        />
      </div>

      <div
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:cursor-pointer hover:bg-background-container/90"
        @click="navigateTo('/guides/voice-role')"
      >
        <IconVoiceRole
          class="size-5 shrink-0 group-hover:stroke-foreground-link-standout"
        />
        <div class="flex flex-col">
          <span class="text-heading group-hover:text-foreground-link-standout"
            >Voice roles</span
          >
          <span class="text-description"
            >Learn how to configure voice role to make your server look extra
            slick</span
          >
        </div>
        <div class="grow" />
        <IconDropdown
          class="size-5 shrink-0 -rotate-90 group-hover:text-foreground-link-standout"
        />
      </div>
    </div>
  </div>
</template>
