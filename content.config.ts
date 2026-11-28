import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
  collections: {
    // legal pages, English only
    content: defineCollection({
      type: 'page',
      source: '*.md',
    }),
    // one folder per locale, translated on Crowdin from guides/en-US
    guides: defineCollection({
      type: 'page',
      source: 'guides/**/*.md',
    }),
    // English only, written for search engines and AI assistants, the path matches the /articles/[slug] route
    articles: defineCollection({
      type: 'page',
      source: 'articles/*.md',
      schema: z.object({
        date: z.string(),
        sitemap: defineSitemapSchema(),
      }),
    }),
  },
})
