import { redirects } from './assets/config/redirects'

export default defineNuxtConfig({
  devtools: {
    enabled: true
  },

  imports: {
    dirs: ['types']
  },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-api-party',
    'nuxt-auth-utils',
    'nuxt-headlessui',
    'nuxt-icon',
    'shadcn-nuxt'
  ],

  routeRules: {
    ...Object.assign({}, ...redirects.map((r) => ({
      [r.path]: { redirect: r.target }
    })))
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      oauthUrl: process.env.OAUTH_URL,
      applicationId: process.env.APPLICATION_ID,
    },
    session: {
      name: 'astro-session'
    }
  },

  apiParty: {
    endpoints: {
      api: {
        url: process.env.API_BASE_URL!,
        schema: './schemas/openapi3_0.yaml',
        cookies: true
      },
    },
  },

  headlessui: {
    prefix: 'H',
  },
})
