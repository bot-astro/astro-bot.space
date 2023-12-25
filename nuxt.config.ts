export default defineNuxtConfig({
  modules: ["nuxt-icon", "@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/nuxt"],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      inviteUrl: process.env.INVITE_URL,
      supportUrl: process.env.SUPPORT_URL,
      premiumUrl: process.env.PREMIUM_URL,
    },
  },
});
