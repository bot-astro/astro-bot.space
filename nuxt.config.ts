import tailwindcss from '@tailwindcss/vite'
import { redirects } from './app/constants/redirects'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxt/image',
    'shadcn-nuxt',
    '@peterbud/nuxt-query',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      astro_api_base_url: process.env.ASTRO_API_BASE_URL,
      chargebee_site: process.env.CHARGEBEE_SITE,
    },
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
  },

  site: {
    url: 'https://astro-bot.space',
    name: 'Astro - Temporary Voice Channels for your Discord!',
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  shadcn: {
    prefix: '',
  },

  imports: {
    dirs: ['types', 'types/**', 'composables/**', 'data', 'data/**'],
  },

  routeRules: {
    ...Object.assign(
      {},
      ...redirects.map((r) => ({
        [r.path]: {
          redirect: r.target,
        },
      })),
    ),
  },

  nuxtQuery: {
    autoImports: true,
    queryClientOptions: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    },
  },

  app: {
    head: {
      title: 'Astro - Temporary Voice Channels for your Discord!',
      meta: [
        { charset: 'utf-8' },
        { name: 'robots', content: 'noodp,noydir' },
        {
          name: 'description',
          content:
            'Astro is a Discord bot that allows you to create temporary voice channels in your server. Perfect for gaming sessions, study groups, or any temporary voice chat needs!',
        },
        {
          name: 'og:title',
          content: 'Astro - Temporary Voice Channels for your Discord!',
        },
        {
          name: 'og:description',
          content:
            'Astro is a Discord bot that allows you to create temporary voice channels in your server. Perfect for gaming sessions, study groups, or any temporary voice chat needs!',
        },
        {
          name: 'og:image',
          content: 'https://astro-bot.space/img/logo_bg.png',
        },
        { name: 'og:url', content: 'https://astro-bot.space' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        { src: 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js' },
      ],
    },
  },
})
