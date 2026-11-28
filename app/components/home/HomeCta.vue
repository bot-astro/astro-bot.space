<script lang="ts" setup>
const { gsap, ScrollTrigger, reducedMotion } = useHomeMotion()
const { invite_from } = useInvite()

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

onMounted(() => {
  if (!root.value || reducedMotion()) return
  ctx = gsap.context(() => {
    const title = root.value!.querySelector<HTMLElement>('.cta-title')!
    gsap.to(title, {
      duration: 1.4,
      scrambleText: {
        text: title.textContent ?? '',
        chars: 'upperAndLowerCase',
        speed: 0.5,
      },
      scrollTrigger: { trigger: title, start: 'top 85%', once: true },
    })
    gsap.fromTo(
      '.cta-card',
      {
        rotationX: 20,
        scale: 0.9,
        transformPerspective: 1200,
        transformOrigin: 'center top',
      },
      {
        rotationX: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.value,
          start: 'top 100%',
          end: 'top 40%',
          scrub: 1,
        },
      },
    )
    gsap.to('.cta-glow', {
      scale: 1.4,
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
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
      class="cta-card backlit-box relative flex flex-col items-center justify-center overflow-hidden rounded-md bordered bg-background/80 p-8 text-center backdrop-blur md:p-14"
      @mousemove="onBacklitBoxMouseMove"
    >
      <div
        class="cta-glow pointer-events-none absolute -bottom-40 left-1/2 size-96 -translate-x-1/2 rounded-full bg-purple-500/30 blur-[100px]"
        aria-hidden="true"
      />
      <h2
        class="cta-title font-display text-3xl font-medium tracking-wide md:text-5xl"
      >
        {{ $t('home.exclusive.title') }}
      </h2>
      <p class="mt-4 max-w-xl text-dimmed">
        {{ $t('home.exclusive.description') }}
      </p>
      <ButtonStandout
        class="mt-8 w-full text-lg md:w-fit md:px-10"
        @click="invite_from('website-cta')"
      >
        {{ $t('home.hero.invite') }}
      </ButtonStandout>
    </div>
  </section>
</template>
