<script setup lang="ts">
import { useRouter } from '#imports'
definePageMeta({
  layout: 'guide',
})

const { t } = useI18n()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.guide_voice_role.title') }),
  meta: [
    { name: 'description', content: t('meta.guide_voice_role.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: t('meta.guide_voice_role.title') }),
    },
    {
      property: 'og:description',
      content: t('meta.guide_voice_role.description'),
    },
    {
      property: 'og:url',
      content: 'https://astro-bot.space/guides/voice-role',
    },
  ],
}))

const { data: page } = await useGuideContent('guide_voice_role')
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
