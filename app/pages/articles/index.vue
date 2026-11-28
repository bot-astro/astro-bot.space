<script setup lang="ts">
const { t } = useI18n()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.articles.title') }),
  meta: [
    { name: 'description', content: t('meta.articles.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: t('meta.articles.title') }),
    },
    { property: 'og:description', content: t('meta.articles.description') },
    { property: 'og:url', content: 'https://astro-bot.space/articles' },
  ],
}))

const { data: articles } = await useAsyncData('articles', () =>
  queryCollection('articles')
    .select('path', 'title', 'description', 'date')
    .order('date', 'DESC')
    .all(),
)
</script>

<template>
  <div class="mx-12 mt-16 flex w-3/4 flex-col items-center gap-16 md:w-auto">
    <div class="flex flex-col gap-4">
      <h1 class="text-title text-center">{{ $t('articles.title') }}</h1>
      <p class="text-subtitle text-center">{{ $t('articles.subtitle') }}</p>
    </div>

    <div class="flex w-full max-w-2xl flex-col gap-2">
      <NuxtLink
        v-for="article in articles ?? []"
        :key="article.path"
        :to="article.path"
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:bg-background-container/90"
      >
        <div class="flex flex-col">
          <h2 class="text-heading group-hover:text-foreground-link-standout">
            {{ article.title }}
          </h2>
          <span class="text-description">{{ article.description }}</span>
        </div>
        <div class="grow" />
        <IconDropdown
          class="size-5 shrink-0 -rotate-90 group-hover:text-foreground-link-standout"
        />
      </NuxtLink>
    </div>
  </div>
</template>
