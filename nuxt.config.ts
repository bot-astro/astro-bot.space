import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      inviteUrl: process.env.INVITE_URL,
      supportUrl: process.env.SUPPORT_URL
    }
  }
})
