import { redirects } from './assets/config/redirects'

export default defineNuxtConfig({
  // fuck ssr honestly
  ssr: false,

  app: {
    head: {
      title: 'Astro - Temporary Voice Channels for your Discord!',
      meta: [
        { charset: 'utf-8' },
        { hid: 'description', name: 'description', content: 'Astro is a Discord bot that allows you to create temporary voice channels in your server. Perfect for gaming sessions, study groups, or any temporary voice chat needs!' },
        { name: 'og:title', content: 'Astro - Temporary Voice Channels for your Discord!' },
        { name: 'og:description', content: 'Astro is a Discord bot that allows you to create temporary voice channels in your server. Perfect for gaming sessions, study groups, or any temporary voice chat needs!' },
        { name: 'og:image', content: '/og-image.png' },
        { name: 'og:url', content: 'https://astro-bot.space' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      script: [
        { src: "https://js.chargebee.com/v2/chargebee.js", 'data-cb-site': process.env.CHARGEBEE_SITE },
        { src: "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js" }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  content: {
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },

  site: {
    url: 'https://astro-bot.space',
    name: 'Astro - Temporary Voice Channels for your Discord!'
  },

  devtools: {
    enabled: false
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
    'shadcn-nuxt',
    "@nuxtjs/robots",
    "@nuxtjs/sitemap"
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

  vueQuery: {
    queryClientOptions: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false
        }
      }
    }
  }
})