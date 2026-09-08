import tailwindcss from '@tailwindcss/vite';
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
    '@nuxt/image',
    'shadcn-nuxt',
    '@peterbud/nuxt-query',
  ],

  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      astro_api_base_url: process.env.ASTRO_API_BASE_URL,
    },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  imports: {
    dirs: [
      'types',
      'types/**',
      'composables/**',
      'data',
      'data/**',
    ]
  },

  routeRules: {
    ...Object.assign({}, ...redirects.map((r) => ({
      [r.path]: {
        redirect: r.target
      }
    })))
  },

  nuxtQuery: {
    autoImports: true,
    queryClientOptions: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false
        }
      }
    }
  },

  app: {
    head: {
      script: [
        { src: 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js' },
      ],
    },
  },
});
