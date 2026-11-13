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
    '@nuxtjs/i18n',
    '@sentry/nuxt/module',
  ],

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en-US',
    // same locale codes as the backend (shared/core/src/main/resources/i18n)
    locales: [
      { code: 'en-US', language: 'en-US', name: 'English', file: 'en-US.json' },
      { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'es-ES', language: 'es-ES', name: 'Español', file: 'es-ES.json' },
      {
        code: 'pt-BR',
        language: 'pt-BR',
        name: 'Português (Brasil)',
        file: 'pt-BR.json',
      },
      {
        code: 'id',
        language: 'id-ID',
        name: 'Bahasa Indonesia',
        file: 'id.json',
      },
      { code: 'ko', language: 'ko-KR', name: '한국어', file: 'ko.json' },
      { code: 'th', language: 'th-TH', name: 'ไทย', file: 'th.json' },
      { code: 'ar', language: 'ar-SA', name: 'العربية', file: 'ar.json' },
      { code: 'fil', language: 'fil-PH', name: 'Filipino', file: 'fil.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'en-US',
    },
  },

  // client only, the ssr runs on cloudflare workers
  sentry: {
    org: 'bot-astro',
    project: 'website',
  },

  css: ['~/assets/css/tailwind.css'],

  icon: {
    // need to have classes work with tailwind
    cssLayer: 'base',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      astro_api_base_url: process.env.ASTRO_API_BASE_URL,
      chargebee_site: process.env.CHARGEBEE_SITE,
      // local dev only, serves app/data/astro/mocks/discord-guilds.json instead of calling the API (see `pnpm dev:mock`)
      mock_discord_guilds: process.env.MOCK_DISCORD_GUILDS === 'true',
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
      meta: [
        { charset: 'utf-8' },
        { name: 'robots', content: 'noodp,noydir' },
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
