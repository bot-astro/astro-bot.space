<script setup lang="ts">
definePageMeta({
  layout: 'guide',
})

useHead({
  title: "Generator guide - "
})

useSeoMeta({
  title: 'Generator guide - Astro - Temporary Voice Channels for your Discord!',
  ogTitle: 'Generator guide - Astro - Temporary Voice Channels for your Discord!',
  description: 'Learn how to configure and use temporary voice channel generators',
  ogDescription: 'Learn how to configure and use temporary voice channel generators',
  ogUrl: 'https://astro-bot.space/guides/generator'
})

</script>

<template>
  <ContentDoc path="guide_generator" v-slot="{ doc }">
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
</template>