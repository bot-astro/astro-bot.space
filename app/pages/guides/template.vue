<script setup lang="ts">
import { useRouter } from '#imports'
definePageMeta({
  layout: 'guide',
})

useHead({
  title: 'Template guide - Astro - Temporary Voice Channels for your Discord!',
  meta: [
    {
      name: 'description',
      content:
        'Discover templates and learn how to configure them, your users will love them',
    },
    {
      property: 'og:title',
      content:
        'Template guide - Astro - Temporary Voice Channels for your Discord!',
    },
    {
      property: 'og:description',
      content:
        'Discover templates and learn how to configure them, your users will love them',
    },
    { property: 'og:url', content: 'https://astro-bot.space/guides/template' },
  ],
})

const { data: page } = await useAsyncData('guide_template', () =>
  queryCollection('content').path('/guide_template').first(),
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
