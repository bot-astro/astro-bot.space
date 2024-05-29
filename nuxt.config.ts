/* eslint-disable node/prefer-global/process */
export default defineNuxtConfig({
  imports: {
    dirs: ['types/*.ts', 'types/**/*.ts', 'stores/*.ts', 'stores/**/*.ts'],
  },

  css: ['~/assets/css/tailwind.css'],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      oauthUrl: process.env.OAUTH_URL,
      applicationId: process.env.APPLICATION_ID,
    },
  },

  devtools: {
    enabled: true,
  },

  modules: [
    'nuxt-icon',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/content',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-headlessui',
    'shadcn-nuxt',
    'nuxt-api-party',
    "nuxt-auth-utils"
  ],

  headlessui: {
    prefix: 'H',
  },

  apiParty: {
    endpoints: {
      api: {
        url: process.env.API_BASE_URL!,
        schema: './schemas/openapi3_0.yaml',
      },
    },
  },
})