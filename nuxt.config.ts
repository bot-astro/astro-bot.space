import { redirects } from './assets/config/redirects'

export default defineNuxtConfig({
  devtools: {
    enabled: true
  },

  imports: {
    dirs: ['types']
  },

  modules: [
    "@nuxt/icon",
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-api-party',
    'nuxt-auth-utils',
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
      apiBaseUrl: process.env.API_BASE_URL,
      login_oauth_url: process.env.LOGIN_OAUTH_URL,
      invite_oauth_url: process.env.INVITE_OAUTH_URL,
      invite_guild_oauth_url: process.env.INVITE_GUILD_OAUTH_URL,
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
  }
})