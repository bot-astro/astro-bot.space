<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import {VueQueryDevtools} from "@tanstack/vue-query-devtools";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}Astro - Temporary Voice Channels for your Discord!` : 'Astro - Temporary Voice Channels for your Discord!';
  },
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ],
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'keywords',
      content: 'astro discord bot, astro discord, temporary voice channels, temporary vc, discord, discord Bot, astro, voice Channels, astro commands, astro documentation, astro premium, astro team, astro ultimate'
    },
    {
      name: 'robots',
      content: 'noodp,noydir'
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'website'
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: 'https://astro-bot.space/img/logo.png'
    },
    {
      name: 'theme-color',
      content: '#BB4FEE'
    },
    {
      name: 'author',
      content: 'Giulio Pimenoff Verdolin'
    },
  ],
})
</script>