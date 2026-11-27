<script lang="ts" setup>
import { Github } from 'lucide-vue-next'

const { gsap, ScrollTrigger, reducedMotion } = useHomeMotion()

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

onMounted(() => {
  if (!root.value || reducedMotion()) return
  ctx = gsap.context(() => {
    gsap.fromTo(
      '.os-card',
      { clipPath: 'inset(22% 14% 22% 14% round 28px)', autoAlpha: 0.3 },
      {
        clipPath: 'inset(0% 0% 0% 0% round 6px)',
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.value,
          start: 'top 95%',
          end: 'top 50%',
          scrub: 0.6,
        },
      },
    )
    gsap.to('.os-icon', {
      rotate: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 95%',
        end: 'top 50%',
        scrub: 0.6,
      },
    })
  }, root.value)
})

onUnmounted(() => {
  ctx?.revert()
  ScrollTrigger.refresh()
})
</script>

<template>
  <section ref="root" class="w-full max-w-5xl px-4">
    <div
      class="os-card backlit-box flex flex-col items-center gap-4 rounded-md bordered bg-background/80 p-8 text-center backdrop-blur md:flex-row md:text-left"
      @mousemove="onBacklitBoxMouseMove"
    >
      <Github class="os-icon size-12 shrink-0 text-foreground" />
      <div>
        <h2 class="font-display text-2xl tracking-wide">
          {{ $t('home.open_source.title') }}
        </h2>
        <p class="mt-2 text-dimmed">{{ $t('home.open_source.description') }}</p>
      </div>
      <ButtonSecondary
        to="https://github.com/bot-astro/astro"
        target="_blank"
        class="w-full shrink-0 justify-center py-2 md:ml-auto md:w-fit"
      >
        {{ $t('home.open_source.button') }}
      </ButtonSecondary>
    </div>
  </section>
</template>
