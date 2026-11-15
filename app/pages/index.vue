<script setup lang="ts">
import Lenis from 'lenis'

const { gsap, ScrollTrigger, reducedMotion } = useHomeMotion()

let lenis: Lenis | undefined
let tick: ((time: number) => void) | undefined

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
    class="flex w-full flex-col items-center gap-32 overflow-x-clip md:gap-44"
  >
    <HomeHero />
    <HomeStatement />
    <HomeFeatures />
    <HomeBigText />
    <HomeOpenSource />
    <HomeCta />
  </div>
</template>
