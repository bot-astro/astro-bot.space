<script lang="ts" setup>
const { gsap, ScrollTrigger, reducedMotion } = useHomeMotion()

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

function onPointerMove(e: PointerEvent) {
  const rect = root.value!.getBoundingClientRect()
  root.value!.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  root.value!.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

onMounted(() => {
  if (!root.value || reducedMotion()) return
  ctx = gsap.context(() => {
    gsap.from('.wordmark-letter', {
      yPercent: 100,
      duration: 1.2,
      stagger: 0.08,
      ease: 'power4.out',
      scrollTrigger: { trigger: root.value, start: 'top 85%' },
    })
  }, root.value)
})

onUnmounted(() => {
  ctx?.revert()
  ScrollTrigger.refresh()
})
</script>

<template>
  <section
    ref="root"
    class="wordmark relative flex w-full justify-center overflow-hidden border-t border-neutral-900 bg-neutral-950 select-none"
    aria-hidden="true"
    @pointermove="onPointerMove"
  >
    <div class="leading-0.85 relative flex font-display text-[25vw]">
      <span
        v-for="letter in 'ASTRO'"
        :key="letter"
        class="overflow-hidden px-[0.03em] pt-[0.06em] pb-[0.1em]"
      >
        <span
          class="wordmark-letter inline-block text-transparent [-webkit-text-stroke:1px_hsl(var(--foreground-secondary)/0.35)]"
          >{{ letter }}</span
        >
      </span>

      <div
        class="wordmark-spot pointer-events-none absolute inset-0 flex"
        aria-hidden="true"
      >
        <span
          v-for="letter in 'ASTRO'"
          :key="letter"
          class="px-[0.03em] pt-[0.06em] pb-[0.1em]"
        >
          <span
            class="inline-block bg-linear-to-b from-purple-400 to-pink-500 bg-clip-text text-transparent"
            >{{ letter }}</span
          >
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wordmark {
  --mx: 50%;
  --my: 50%;
}

.wordmark-spot {
  mask-image: radial-gradient(
    380px circle at var(--mx) var(--my),
    black,
    transparent 70%
  );
}
</style>
