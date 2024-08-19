import { redirects } from './assets/config/redirects'

export default defineNuxtConfig({
  // fuck ssr honestly
  ssr: false,

  app: {
    head: {
      title: '',
      titleTemplate: '%sAstro - Temporary Voice Channels for your Discord!',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'keywords',
          content: 'astro discord bot, astro discord, temporary voice channels, temporary vc, discord, discord Bot, astro, voice Channels, astro commands, astro documentation, astro premium, astro team, astro ultimate'
        },
        {
          name: 'robots',
          content: 'noodp,noydir'
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Astro is the most unique and complete bot for Temporary Voice Channels and Voice Roles! It has handy and unique features and it focuses exclusively on Voice Channels!'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://astro-bot.space/img/logo.png'
        },
        {
          name: 'theme-color',
          content: '#BB4FEE'
        },
        {
          name: 'author',
          content: 'Giulio Pimenoff Verdolin'
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'Astro - Temporary Voice Channels Discord Bot'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        }
      ],
      script: [{ src: "https://js.chargebee.com/v2/chargebee.js", 'data-cb-site': process.env.CHARGEBEE_SITE }]
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
})