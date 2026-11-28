<script setup lang="ts">
import Lenis from 'lenis'
import { UltimatePrices } from '~/constants/UltimatePrices'

const { t } = useI18n()
const { url: siteUrl } = useSiteConfig()
const { formattedServerCount } = useHomeShowcase()

useHead({
  link: [
    {
      rel: 'preload',
      href: '/fonts/Evolve-Regular.otf',
      as: 'font',
      type: 'font/otf',
      crossorigin: 'anonymous',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            name: 'Astro Bot',
            url: siteUrl,
            logo: `${siteUrl}/img/logo_bg.png`,
            email: 'hi@astro-bot.space',
            sameAs: [
              'https://github.com/bot-astro',
              'https://discord.com/invite/yeXwVhg',
            ],
          },
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: siteUrl,
            name: 'Astro Discord Bot',
            publisher: { '@id': `${siteUrl}/#organization` },
          },
          {
            '@type': 'SoftwareApplication',
            '@id': `${siteUrl}/#app`,
            name: 'Astro Discord Bot',
            alternateName: 'Astro',
            description: t('meta.site.description', {
              count: formattedServerCount,
            }),
            url: siteUrl,
            image: `${siteUrl}/img/logo_bg.png`,
            applicationCategory: 'CommunicationApplication',
            operatingSystem: 'Discord',
            publisher: { '@id': `${siteUrl}/#organization` },
            offers: [
              {
                '@type': 'Offer',
                name: 'Free',
                price: 0,
                priceCurrency: 'USD',
              },
              {
                '@type': 'Offer',
                name: 'Astro Ultimate (monthly, per server)',
                price: UltimatePrices.MONTHLY,
                priceCurrency: 'USD',
                url: `${siteUrl}/ultimate`,
              },
              {
                '@type': 'Offer',
                name: 'Astro Ultimate (yearly, per server)',
                price: UltimatePrices.YEARLY,
                priceCurrency: 'USD',
                url: `${siteUrl}/ultimate`,
              },
            ],
            sameAs: [
              'https://github.com/bot-astro/astro',
              'https://discord.com/application-directory/715621848489918495',
            ],
          },
        ],
      }),
    },
    {
      innerHTML:
        "if (!matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('motion-ok')",
      tagPosition: 'head',
    },
  ],
})

const { gsap, ScrollTrigger, reducedMotion } = useHomeMotion()

let lenis: Lenis | undefined
let tick: ((time: number) => void) | undefined

// the pinned stage starts when its top reaches the navigation bar height
function scrollToDemo() {
  const demo = document.getElementById('demo')
  if (!demo) return
  if (lenis) lenis.scrollTo(demo, { offset: -64 })
  else demo.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  if (reducedMotion()) return
  lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)
  tick = (time) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
})

onUnmounted(() => {
  if (tick) gsap.ticker.remove(tick)
  gsap.ticker.lagSmoothing(500, 33)
  lenis?.destroy()
})
</script>

<template>
  <div
    class="flex w-full flex-col items-center gap-24 overflow-x-clip md:gap-32"
  >
    <HomeHero @explore="scrollToDemo" />
    <HomeStage />
    <HomeOpenSource />
    <HomeCta />
    <HomeFaq />
  </div>
</template>
