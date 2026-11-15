<script lang="ts" setup>
const { gsap, ScrollTrigger, SplitText, reducedMotion } = useHomeMotion()

const root = ref<HTMLElement | null>(null)
const text = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined
let split: SplitText | undefined

onMounted(() => {
  if (!root.value || !text.value || reducedMotion()) return

  ctx = gsap.context(() => {
    split = new SplitText(text.value!, { type: 'words' })
    gsap.fromTo(
      split.words,
      { opacity: 0.12 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          trigger: root.value,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: true,
        },
      },
    )
  }, root.value)
})

onUnmounted(() => {
  ctx?.revert()
  split?.revert()
  ScrollTrigger.refresh()
})
</script>

<template>
  <section ref="root" class="w-full max-w-4xl px-4">
    <p
      ref="text"
      class="text-center font-display text-3xl leading-tight tracking-wide md:text-5xl"
    >
      {{ $t('home.statement') }}
    </p>
  </section>
</template>
