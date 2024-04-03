export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      oauthUrl: process.env.OAUTH_URL
    },
  },

  devtools: {
    enabled: false
  },

  modules: [
    "nuxt-icon",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxt/content"
  ],
});