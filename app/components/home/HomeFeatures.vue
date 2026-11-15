<script lang="ts" setup>
import {
  Gamepad2,
  Hash,
  LayoutGrid,
  Shield,
  Sparkles,
  UserRound,
  Users,
} from 'lucide-vue-next'
import { showcaseScenarios } from '~/constants/homeShowcase'

const { gsap, ScrollTrigger, reducedMotion } = useHomeMotion()

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined
let media: gsap.MatchMedia | undefined

const scenarioIcons = {
  gaming: Gamepad2,
  incremental: Hash,
  squad: Users,
  personal: UserRound,
}

const steps = [
  ...showcaseScenarios.map((scenario) => ({
    key: scenario.id,
    icon: scenarioIcons[scenario.id as keyof typeof scenarioIcons],
    scenario,
    image: undefined as string | undefined,
    ultimate: scenario.ultimate,
  })),
  {
    key: 'interface',
    icon: LayoutGrid,
    scenario: undefined,
    image: 'guides/default_interface.png',
    ultimate: false,
  },
  {
    key: 'custom_interface',
    icon: Sparkles,
    scenario: undefined,
    image: 'illustration/custom_interface.png',
    ultimate: false,
  },
  {
    key: 'voice_role',
    icon: Shield,
    scenario: undefined,
    image: 'illustration/voice_role.gif',
    ultimate: false,
  },
]

onMounted(() => {
  if (!root.value || reducedMotion()) return

  ctx = gsap.context(() => {
    gsap.from('.features-title', {
      y: 40,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.features-title',
        start: 'top 85%',
        once: true,
      },
    })

    media = gsap.matchMedia()

    media.add('(min-width: 1024px)', () => {
      const texts = gsap.utils.toArray<HTMLElement>('.stage-text')
      const panels = gsap.utils.toArray<HTMLElement>('.stage-panel')
      const count = steps.length

      gsap.set(texts.slice(1), { autoAlpha: 0, y: 40 })
      gsap.set(panels.slice(1), { autoAlpha: 0, scale: 0.9, rotationY: -25 })
      gsap.set('.stage-frame', { transformPerspective: 1400 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: '.stage',
          start: 'center center',
          end: `+=${count * 55}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })

      tl.fromTo(
        '.stage-progress',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', duration: count },
        0,
      )
      for (let i = 1; i < count; i++) {
        tl.to(texts[i - 1]!, { autoAlpha: 0, y: -40, duration: 0.5 }, i - 0.5)
          .to(
            panels[i - 1]!,
            { autoAlpha: 0, scale: 0.9, rotationY: 25, duration: 0.5 },
            i - 0.5,
          )
          .to(texts[i]!, { autoAlpha: 1, y: 0, duration: 0.5 }, i - 0.35)
          .to(
            panels[i]!,
            { autoAlpha: 1, scale: 1, rotationY: 0, duration: 0.5 },
            i - 0.35,
          )
      }
      tl.to({}, { duration: 0.5 })
    })

    media.add('(max-width: 1023px)', () => {
      gsap.set('.mobile-card', { autoAlpha: 0, y: 50 })
      ScrollTrigger.batch('.mobile-card', {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
          }),
      })
    })
  }, root.value)
})

onUnmounted(() => {
  media?.revert()
  ctx?.revert()
  ScrollTrigger.refresh()
})
</script>

<template>
  <section ref="root" class="w-full max-w-6xl px-4">
    <div class="features-title flex flex-col items-center text-center">
      <h2 class="font-display text-3xl tracking-wide md:text-4xl">
        {{ $t('home.features.title') }}
      </h2>
      <p class="mt-3 max-w-xl text-dimmed">
        {{ $t('home.features.subtitle') }}
      </p>
    </div>

    <!-- desktop: pinned scrollytelling stage -->
    <div class="stage mt-16 hidden grid-cols-2 items-center gap-16 lg:grid">
      <div class="flex gap-8">
        <div class="relative w-1 shrink-0 self-stretch rounded-full bg-border">
          <div
            class="stage-progress absolute inset-0 origin-top rounded-full bg-linear-to-b from-purple-500 to-pink-500"
          />
        </div>
        <div class="grid flex-1">
          <div
            v-for="step in steps"
            :key="step.key"
            class="stage-text col-start-1 row-start-1 self-center"
          >
            <div class="flex items-center gap-3">
              <component
                :is="step.icon"
                class="size-10 rounded-md bg-purple-500/20 p-2 text-purple-400"
              />
              <Badge v-if="step.ultimate" variant="ultimate">{{
                $t('common.ultimate')
              }}</Badge>
            </div>
            <h3 class="mt-5 font-display text-4xl tracking-wide">
              {{ $t(`home.showcase.${step.key}.title`) }}
            </h3>
            <p class="mt-4 text-lg text-dimmed">
              {{ $t(`home.showcase.${step.key}.description`) }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="stage-frame relative mx-auto aspect-square w-full max-w-md rounded-xl bordered bg-background-container/80 shadow-2xl shadow-purple-500/10"
      >
        <div
          v-for="step in steps"
          :key="step.key"
          class="stage-panel absolute inset-0"
        >
          <HomeDemoPanel v-if="step.scenario" :scenario="step.scenario" />
          <NuxtImg
            v-else
            :src="step.image"
            alt=""
            loading="lazy"
            draggable="false"
            class="size-full rounded-xl object-contain p-4 select-none"
          />
        </div>
      </div>
    </div>

    <!-- mobile / tablet: stacked cards -->
    <div class="mt-10 flex flex-col gap-4 lg:hidden">
      <div
        v-for="step in steps"
        :key="step.key"
        class="mobile-card overflow-hidden rounded-md bordered bg-background/80 backdrop-blur"
      >
        <div class="p-5">
          <div class="flex items-center gap-3">
            <component
              :is="step.icon"
              class="size-8 rounded-md bg-purple-500/20 p-1.5 text-purple-400"
            />
            <Badge v-if="step.ultimate" variant="ultimate">{{
              $t('common.ultimate')
            }}</Badge>
          </div>
          <h3 class="mt-4 font-display text-2xl tracking-wide">
            {{ $t(`home.showcase.${step.key}.title`) }}
          </h3>
          <p class="mt-3 text-dimmed">
            {{ $t(`home.showcase.${step.key}.description`) }}
          </p>
        </div>
        <div class="bg-background-container/60">
          <HomeDemoPanel v-if="step.scenario" :scenario="step.scenario" />
          <div v-else class="p-4">
            <NuxtImg
              :src="step.image"
              alt=""
              loading="lazy"
              draggable="false"
              class="mx-auto aspect-square w-full max-w-sm rounded-md object-contain select-none"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
