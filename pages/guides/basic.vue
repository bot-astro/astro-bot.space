<script setup lang="ts">
definePageMeta({
  layout: 'guide',
})

useHead({
  title: "Basics guide - Astro - Temporary Voice Channels for your Discord!",
  meta: [
    { name: 'description', content: 'Get started using Astro learning the basics' },
    { property: 'og:title', content: 'Basics guide - Astro - Temporary Voice Channels for your Discord!' },
    { property: 'og:description', content: 'Get started using Astro learning the basics' },
    { property: 'og:url', content: 'https://astro-bot.space/guides/basic' }
  ]
})

</script>

<template>
  <div class="prose-td:text-center first:prose-td:text-start prose-th:text-center first:prose-th:text-start">
    <ContentDoc path="guide_basic" v-slot="{ doc }">
      <!-- Post title -->
      <div class="flex gap-4 items-center mb-4">
        <IconBack class="size-8 shrink-0 hover:text-foreground-link-standout hover:cursor-pointer" @click="useRouter().back()"/>
        <h1 class="mb-0">{{ doc.title }}</h1>
      </div>

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