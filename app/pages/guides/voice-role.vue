<script setup lang="ts">
import { useRouter } from '#imports'
definePageMeta({
  layout: 'guide',
})

useHead({
  title:
    'Voice Role guide - Astro - Temporary Voice Channels for your Discord!',
  meta: [
    {
      name: 'description',
      content:
        'Learn how to configure voice role to make your server look extra slick',
    },
    {
      property: 'og:title',
      content:
        'Voice Role guide - Astro - Temporary Voice Channels for your Discord!',
    },
    {
      property: 'og:description',
      content:
        'Learn how to configure voice role to make your server look extra slick',
    },
    {
      property: 'og:url',
      content: 'https://astro-bot.space/guides/voice-role',
    },
  ],
})

const { data: page } = await useAsyncData('guide_voice_role', () =>
  queryCollection('content').path('/guide_voice_role').first(),
)
</script>

<template>
  <div v-if="page">
    <!-- Post title -->
    <div class="mb-4 flex items-center gap-4">
      <IconBack
        class="size-8 shrink-0 hover:cursor-pointer hover:text-foreground-link-standout"
        @click="useRouter().back()"
      />
      <h1 class="mb-0">{{ page.title }}</h1>
    </div>

    <!-- Table of contents -->
    <ul>
      <li v-for="link of page.body?.toc?.links ?? []" :key="link.id">
        <a :href="`#${link.id}`">{{ link.text }}</a>
      </li>
    </ul>

    <!-- Main post content -->
    <ContentRenderer :value="page" />
  </div>
</template>
