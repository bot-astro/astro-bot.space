import { redirects } from './assets/config/redirects'
import { resolve } from 'path'

export default defineNuxtConfig({
  // fuck ssr honestly
  ssr: false,

  app: {
    head: {
      script: [{ src: "https://js.chargebee.com/v2/chargebee.js", 'data-cb-site': process.env.CHARGEBEE_SITE}]
    }
  },

  devtools: {
    enabled: true
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

  modules: [
    "@nuxt/icon",
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@hebilicious/vue-query-nuxt',
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
    },
  },
})