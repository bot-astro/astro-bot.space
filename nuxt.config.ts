import tailwindcss from '@tailwindcss/vite';

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

  app: {
    head: {
      script: [
        { src: 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js' },
      ],
    },
  },
});
