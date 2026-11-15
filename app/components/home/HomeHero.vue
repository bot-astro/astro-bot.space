<script lang="ts" setup>
import { Github } from 'lucide-vue-next'

const { gsap, ScrollTrigger, reducedMotion } = useHomeMotion()
const { serverCount } = useHomeShowcase()
const { invite } = useInvite()

const root = ref<HTMLElement | null>(null)
const counter = ref<HTMLElement | null>(null)
const formattedCount = new Intl.NumberFormat('en-US').format(serverCount)
let ctx: gsap.Context | undefined
const magnetic = useHomeMagnetic(root)
let onPointerMove: ((e: PointerEvent) => void) | undefined

onMounted(() => {
  if (!root.value || reducedMotion()) return

  magnetic.attach()

  ctx = gsap.context(() => {
    gsap.to('.hero-logo-float', {
      y: -10,
      duration: 2.6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const rotateY = gsap.quickTo('.hero-logo-tilt', 'rotationY', {
        duration: 0.8,
        ease: 'power3.out',
      })
      const rotateX = gsap.quickTo('.hero-logo-tilt', 'rotationX', {
        duration: 0.8,
        ease: 'power3.out',
      })
      gsap.set('.hero-logo-tilt', { transformPerspective: 600 })
      onPointerMove = (e) => {
        rotateY((e.clientX / window.innerWidth - 0.5) * 50)
        rotateX(-(e.clientY / window.innerHeight - 0.5) * 40)
      }
      window.addEventListener('pointermove', onPointerMove)
    }

    gsap
      .timeline({ defaults: { ease: 'power4.out' } })
      .from('.hero-logo', { scale: 0.6, autoAlpha: 0, duration: 1.2 })
      .from(
        '.hero-letter',
        { yPercent: 110, rotate: 6, autoAlpha: 0, duration: 1, stagger: 0.07 },
        '-=0.8',
      )
      .from(
        '.hero-fade',
        { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.12 },
        '-=0.6',
      )

    const count = { value: 0 }
    gsap.to(count, {
      value: serverCount,
      duration: 2.4,
      delay: 0.8,
      ease: 'power3.out',
      onUpdate: () => {
        if (counter.value)
          counter.value.textContent = new Intl.NumberFormat('en-US').format(
            Math.round(count.value),
          )
      },
    })

    gsap.to('.hero-content', {
      yPercent: -12,
      autoAlpha: 0.2,
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    gsap.to('.hero-orb', {
      yPercent: (i) => (i % 2 ? -30 : 30),
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, root.value)
})

onUnmounted(() => {
  magnetic.detach()
  if (onPointerMove) window.removeEventListener('pointermove', onPointerMove)
  ctx?.revert()
  ScrollTrigger.refresh()
})
</script>

<template>
  <section
    ref="root"
    class="relative flex min-h-[calc(100svh-4rem)] w-full flex-col items-center overflow-hidden"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        class="hero-orb absolute top-1/4 left-1/2 size-144 translate-x-[-90%] rounded-full bg-purple-500/25 blur-[120px]"
      />
      <div
        class="hero-orb absolute top-1/3 left-1/2 size-128 translate-x-[-10%] rounded-full bg-pink-500/20 blur-[120px]"
      />
    </div>

    <div
      class="hero-content relative flex max-w-3xl flex-1 flex-col items-center justify-center p-4 text-center"
    >
      <div class="hero-logo-float">
        <div class="hero-logo-tilt">
          <NuxtImg
            src="/img/logo.png"
            class="hero-logo size-20 select-none md:size-28"
            sizes="160px"
            alt=""
            draggable="false"
          />
        </div>
      </div>

      <h1
        class="mt-4 flex font-display text-6xl tracking-widest md:text-8xl"
        aria-label="ASTRO"
      >
        <span
          v-for="letter in 'ASTRO'"
          :key="letter"
          class="overflow-hidden pb-2"
          aria-hidden="true"
        >
          <span class="hero-letter inline-block">{{ letter }}</span>
        </span>
      </h1>

      <p class="hero-fade mt-4 text-lg text-gray-400 md:text-xl">
        {{ $t('home.tagline') }}
      </p>

      <div
        class="hero-fade mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
      >
        <ButtonStandout
          class="magnetic w-full text-lg sm:w-auto sm:px-8"
          @click="invite"
        >
          {{ $t('home.hero.invite') }}
        </ButtonStandout>
        <ButtonSecondary
          to="/guides"
          class="magnetic w-full justify-center py-2 text-lg sm:w-auto sm:px-8"
        >
          {{ $t('home.hero.how_it_works') }}
        </ButtonSecondary>
      </div>

      <div
        class="hero-fade mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-foreground-secondary"
      >
        <span
          class="flex items-center gap-2 rounded-full bordered bg-background/60 px-3 py-1 backdrop-blur"
        >
          <span class="relative flex size-2">
            <span
              class="absolute inline-flex size-full animate-ping rounded-full bg-discord-green opacity-75"
            />
            <span
              class="relative inline-flex size-2 rounded-full bg-discord-green"
            />
          </span>
          <i18n-t keypath="home.hero.servers" tag="span">
            <template #count>
              <span ref="counter" class="font-semibold text-foreground">{{
                formattedCount
              }}</span>
            </template>
          </i18n-t>
        </span>
        <NuxtLink
          to="https://github.com/bot-astro/astro"
          target="_blank"
          class="flex items-center gap-2 rounded-full bordered bg-background/60 px-3 py-1 backdrop-blur transition-colors hover:text-foreground"
        >
          <Github class="size-4" />
          {{ $t('home.hero.open_source') }}
        </NuxtLink>
      </div>
    </div>
    <HomeServers class="relative pb-6" />
  </section>
</template>
