<script setup lang="ts">
import { useRouter } from '#imports'
definePageMeta({
  layout: 'guide',
})

const { t } = useI18n()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.compare_voicemaster.title') }),
  meta: [
    { name: 'description', content: t('meta.compare_voicemaster.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', {
        page: t('meta.compare_voicemaster.title'),
      }),
    },
    {
      property: 'og:description',
      content: t('meta.compare_voicemaster.description'),
    },
    { property: 'og:type', content: 'article' },
    {
      property: 'og:url',
      content: 'https://astro-bot.space/compare/astro-vs-voicemaster',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://astro-bot.space/compare/astro-vs-voicemaster',
    },
  ],
}))

const { data: page } = await useGuideContent('compare_voicemaster')
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

      <div class="mt-12 flex justify-center">
        <ButtonStandout to="/invite?src=web-guide" class="no-underline">
          {{ $t('nav.add_to_server') }}
        </ButtonStandout>
      </div>
    </template>
  </div>
</template>
