<script lang="ts" setup>
import { Github } from 'lucide-vue-next'

const emit = defineEmits<{ explore: [] }>()

const { gsap, ScrollTrigger, reducedMotion } = useHomeMotion()
const { serverCount, formattedServerCount } = useHomeShowcase()
const { invite_from } = useInvite()

const root = ref<HTMLElement | null>(null)
const counter = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined
let onPointerMove: ((e: PointerEvent) => void) | undefined

onMounted(() => {
  if (!root.value || reducedMotion()) return

  ctx = gsap.context(() => {
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

    const count = { value: 0 }
    gsap.to(count, {
      value: serverCount,
      duration: 2.4,
      delay: 0.8,
      ease: 'power3.out',
      onUpdate: () => {
        if (counter.value)
          counter.value.textContent = `${Math.floor(count.value / 1000)}k+`
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
    <div
      class="pointer-events-none absolute inset-0 mask-[linear-gradient(to_bottom,black_45%,transparent_95%)]"
      aria-hidden="true"
    >
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
      <div class="hero-logo-tilt">
        <NuxtImg
          src="/img/logo.png"
          class="hero-logo size-20 select-none md:size-28"
          sizes="160px"
          alt=""
          draggable="false"
        />
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

      <p class="hero-fade hero-tagline mt-4 text-lg text-gray-400 md:text-xl">
        {{ $t('home.tagline') }}
      </p>

      <div
        class="hero-fade mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
      >
        <ButtonStandout
          class="w-full text-lg sm:w-auto sm:px-8"
          @click="invite_from('website-nav')"
        >
          {{ $t('home.hero.invite') }}
        </ButtonStandout>
        <ButtonSecondary
          class="w-full justify-center py-2 text-lg sm:w-auto sm:px-8"
          @click="emit('explore')"
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
                formattedServerCount
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

<style>
/* hidden before hydration so the server render does not flash before the intro animation, html.motion-ok is set by an inline script in the page head */
html.motion-ok .hero-logo,
html.motion-ok .hero-letter {
  visibility: hidden;
}

/* css instead of gsap so the buttons show without waiting for the js bundle, the tagline is the LCP element so it starts earlier than the rest */
html.motion-ok .hero-fade {
  animation: hero-fade-in 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1.1s backwards;
}

html.motion-ok .hero-tagline {
  animation-delay: 0.5s;
}

@keyframes hero-fade-in {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
}
</style>
