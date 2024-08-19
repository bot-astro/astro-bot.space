<script setup lang="ts">
definePageMeta({
  layout: 'guide',
})

useHead({
  title: "Basics guide - "
})

useSeoMeta({
  title: 'Basics guide - Astro - Temporary Voice Channels for your Discord!',
  ogTitle: 'Basics guide - Astro - Temporary Voice Channels for your Discord!',
  description: 'Get started using Astro learning the basics',
  ogDescription: 'Get started using Astro learning the basics',
  ogUrl: 'https://astro-bot.space/guides/basic'
})
</script>

<template>
  <div class="prose-td:text-center first:prose-td:text-start prose-th:text-center first:prose-th:text-start">
    <ContentDoc path="guide_basic" v-slot="{ doc }">
      <!-- Post title -->
      <h1 class="mb-4">{{ doc.title }}</h1>

      <!-- Table of contents -->
      <ul>
        <li v-for="link of doc.body?.toc?.links ?? []" :key="link.id">
          <a :href="`#${link.id}`">{{ link.text }}</a>
        </li>
      </ul>

      <!-- Main post content -->
      <ContentRenderer :value="doc" />
    </ContentDoc>
  </div>
</template>