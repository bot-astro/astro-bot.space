<script setup lang="ts">
definePageMeta({
  layout: 'guide',
})

const { t, locale } = useI18n()
const route = useRoute()
const { url: siteUrl } = useSiteConfig()

const { data: article } = await useAsyncData(route.path, () =>
  queryCollection('articles').path(route.path).first(),
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useHead(() => ({
  title: t('meta.page_title', { page: article.value?.title }),
  meta: [
    { name: 'description', content: article.value?.description },
    { property: 'og:type', content: 'article' },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: article.value?.title }),
    },
    { property: 'og:description', content: article.value?.description },
    { property: 'og:url', content: `${siteUrl}${route.path}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.value?.title,
        description: article.value?.description,
        datePublished: article.value?.date,
        inLanguage: 'en-US',
        url: `${siteUrl}${route.path}`,
        image: `${siteUrl}/img/logo_bg.png`,
        author: { '@type': 'Person', name: 'Giuliopime' },
        publisher: { '@type': 'Organization', name: 'Astro Bot', url: siteUrl },
        about: {
          '@type': 'SoftwareApplication',
          name: 'Astro Discord Bot',
          url: siteUrl,
        },
      }),
    },
  ],
}))

const formattedDate = computed(() =>
  article.value
    ? new Date(article.value.date).toLocaleDateString(locale.value, {
        dateStyle: 'long',
        timeZone: 'UTC',
      })
    : '',
)
</script>

<template>
  <article v-if="article">
    <h1 class="mb-2">{{ article.title }}</h1>
    <p class="mt-0 text-sm text-dimmed">
      {{ $t('articles.updated', { date: formattedDate }) }}
    </p>
    <ContentRenderer :value="article" />
  </article>
</template>
