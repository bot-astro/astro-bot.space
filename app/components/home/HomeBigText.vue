<script lang="ts" setup>
const { gsap, ScrollTrigger, reducedMotion } = useHomeMotion()

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

onMounted(() => {
  if (!root.value || reducedMotion()) return
  ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('.big-row').forEach((row, i) => {
      gsap.fromTo(
        row,
        { xPercent: i % 2 ? -35 : 0 },
        {
          xPercent: i % 2 ? 0 : -35,
          ease: 'none',
          scrollTrigger: {
            trigger: root.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        },
      )
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
    class="flex w-full flex-col gap-2 overflow-hidden select-none"
    aria-hidden="true"
  >
    <div
      v-for="row in 2"
      :key="row"
      class="big-row flex w-max gap-8 font-display text-6xl tracking-widest whitespace-nowrap uppercase md:text-9xl"
    >
      <template v-for="n in 4" :key="n">
        <span
          :class="
            row === 1
              ? 'text-transparent [-webkit-text-stroke:1px_hsl(var(--foreground-secondary))]'
              : 'bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'
          "
        >
          {{ $t(row === 1 ? 'home.big_text.first' : 'home.big_text.second') }}
        </span>
        <span class="text-purple-500">✦</span>
      </template>
    </div>
  </section>
</template>
