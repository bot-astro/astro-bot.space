import { redirects } from './assets/config/redirects'

export default defineNuxtConfig({
  // fuck ssr honestly
  ssr: false,

  devtools: {
    enabled: true
  },

  imports: {
    dirs: ['types', 'data']
  },

  modules: [
    "@nuxt/icon",
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@hebilicious/vue-query-nuxt',
    'nuxt-api-party',
    'shadcn-nuxt'
  ],

  routeRules: {
    ...Object.assign({}, ...redirects.map((r) => ({
      [r.path]: {
        redirect: r.target
      }
    })))
  },

  runtimeConfig: {
    public: {
      astro_api_base_url: process.env.API_BASE_URL,
      login_oauth_url: process.env.LOGIN_OAUTH_URL,
      invite_oauth_url: process.env.INVITE_OAUTH_URL,
      invite_guild_oauth_url: process.env.INVITE_GUILD_OAUTH_URL,
    }
  },

  // apiParty: {
  //   endpoints: {
  //     api: {
  //       url: process.env.API_BASE_URL!,
  //       schema: './schemas/openapi3_0.yaml',
  //       cookies: true
  //     },
  //   },
  // }
})