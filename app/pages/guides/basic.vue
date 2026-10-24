<script setup lang="ts">
import { useRouter } from '#imports'
definePageMeta({
  layout: 'guide',
})

useHead({
  title: 'Basics guide - Astro - Temporary Voice Channels for your Discord!',
  meta: [
    {
      name: 'description',
      content: 'Get started using Astro learning the basics',
    },
    {
      property: 'og:title',
      content:
        'Basics guide - Astro - Temporary Voice Channels for your Discord!',
    },
    {
      property: 'og:description',
      content: 'Get started using Astro learning the basics',
    },
    { property: 'og:url', content: 'https://astro-bot.space/guides/basic' },
  ],
})

const { data: page } = await useAsyncData('guide_basic', () =>
  queryCollection('content').path('/guide_basic').first(),
)
</script>

<template>
  <div
    class="prose-th:text-center first:prose-th:text-start prose-td:text-center first:prose-td:text-start"
  >
    <template v-if="page">
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
    </template>
  </div>
</template>
