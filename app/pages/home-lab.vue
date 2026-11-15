<script setup lang="ts">
import Lenis from 'lenis'

definePageMeta({ layout: 'lab' })

const { gsap, ScrollTrigger, reducedMotion } = useHomeMotion()

let lenis: Lenis | undefined
let tick: ((time: number) => void) | undefined

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  if (reducedMotion()) return
  lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)
  tick = (time) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (tick) gsap.ticker.remove(tick)
  gsap.ticker.lagSmoothing(500, 33)
  lenis?.destroy()
})
</script>

<template>
  <div
    class="flex w-full flex-col items-center gap-24 overflow-x-clip md:gap-32"
  >
    <div
      class="scroll-cue pointer-events-none fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 text-sm font-medium tracking-widest text-foreground uppercase transition-opacity duration-500 lg:flex"
      :class="scrolled ? 'opacity-0' : 'opacity-100'"
      aria-hidden="true"
    >
      <span class="[writing-mode:vertical-rl]">{{ $t('home.lab.hint') }}</span>
      <span
        class="relative h-24 w-0.5 overflow-hidden rounded bg-purple-500/30"
      >
        <span
          class="scroll-cue-dot absolute top-0 left-0 h-8 w-full rounded bg-purple-400 shadow-[0_0_12px_rgb(192_132_252)]"
        />
      </span>
    </div>
    <HomeHero />
    <HomeLabStage />
  </div>
</template>

<style scoped>
.scroll-cue-dot {
  animation: scroll-cue 1.6s ease-in-out infinite;
}

@keyframes scroll-cue {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(260%);
  }
}
</style>
