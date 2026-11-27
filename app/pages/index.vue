<script setup lang="ts">
import Lenis from 'lenis'

const { t } = useI18n()
const { url: siteUrl } = useSiteConfig()

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
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: siteUrl,
            name: 'Astro',
          },
          {
            '@type': 'SoftwareApplication',
            '@id': `${siteUrl}/#app`,
            name: 'Astro',
            description: t('meta.site.description'),
            url: siteUrl,
            image: `${siteUrl}/img/logo_bg.png`,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Discord',
            offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
            sameAs: ['https://github.com/bot-astro/astro'],
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
  </div>
</template>
