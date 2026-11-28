import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: { include: '**/*.md', exclude: ['articles/**'] },
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
