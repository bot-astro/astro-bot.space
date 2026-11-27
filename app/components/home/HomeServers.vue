<script lang="ts" setup>
const { gsap, ScrollTrigger, reducedMotion } = useHomeMotion()
const { servers } = useHomeShowcase()

const formatMembers = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const rowCount = 3
// scroll velocity (px/s) that adds one unit of marquee speed, up to MAX_SPEED_BOOST
const VELOCITY_PER_BOOST = 150
const MAX_SPEED_BOOST = 10
const rows = Array.from({ length: rowCount }, (_, row) =>
  servers.filter((_, i) => i % rowCount === row),
)

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined
let onScrollEnd: (() => void) | undefined

function hueOf(name: string) {
  let hash = 0
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 360
  return hash
}

function initialsOf(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
}

onMounted(() => {
  if (!root.value || reducedMotion()) return

  ctx = gsap.context(() => {
    const tweens = gsap.utils
      .toArray<HTMLElement>('.marquee-row')
      .map((row, i) =>
        gsap.fromTo(
          row,
          { xPercent: i % 2 ? -50 : 0 },
          {
            xPercent: i % 2 ? 0 : -50,
            duration: 60 + i * 14,
            ease: 'none',
            repeat: -1,
          },
        ),
      )

    const state = { speed: 1 }
    const setSpeed = gsap.quickTo(state, 'speed', {
      duration: 0.5,
      ease: 'power3.out',
      onUpdate: () => tweens.forEach((t) => t.timeScale(state.speed)),
    })

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) =>
        setSpeed(
          1 +
            Math.min(
              Math.abs(self.getVelocity()) / VELOCITY_PER_BOOST,
              MAX_SPEED_BOOST,
            ),
        ),
    })
    onScrollEnd = () => setSpeed(1)
    ScrollTrigger.addEventListener('scrollEnd', onScrollEnd)

    gsap.from('.marquee-title, .marquee-row', {
      autoAlpha: 0,
      y: 30,
      duration: 1,
      stagger: 0.15,
      delay: 1.4,
      ease: 'power3.out',
    })
  }, root.value)
})

onUnmounted(() => {
  if (onScrollEnd) ScrollTrigger.removeEventListener('scrollEnd', onScrollEnd)
  ctx?.revert()
})
</script>

<template>
  <div ref="root" class="w-full overflow-hidden">
    <p class="marquee-title px-4 text-center text-sm text-foreground-secondary">
      {{ $t('home.servers.title') }}
    </p>

    <div
      class="marquee-mask mt-4 flex flex-col gap-3"
      role="list"
      :aria-label="$t('home.servers.title')"
    >
      <div
        v-for="(row, index) in rows"
        :key="index"
        class="marquee-row flex w-max gap-3 pr-3"
        :class="index === 2 ? 'hidden [@media(min-height:900px)]:flex' : ''"
      >
        <template v-for="copy in 2" :key="copy">
          <div
            v-for="server in row"
            :key="`${copy}-${server.name}`"
            class="flex w-56 shrink-0 items-center gap-3 rounded-md bordered bg-background/80 p-2.5 backdrop-blur"
            :role="copy === 1 ? 'listitem' : undefined"
            :aria-hidden="copy === 2 ? 'true' : undefined"
          >
            <NuxtImg
              v-if="server.icon"
              :src="server.icon"
              alt=""
              class="size-10 rounded-full"
              loading="lazy"
            />
            <div
              v-else
              class="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white-900"
              :style="{
                background: `linear-gradient(135deg, hsl(${hueOf(server.name)} 70% 55%), hsl(${(hueOf(server.name) + 50) % 360} 70% 40%))`,
              }"
            >
              {{ initialsOf(server.name) }}
            </div>
            <div class="min-w-0">
              <p class="truncate text-sm font-medium">{{ server.name }}</p>
              <p class="text-xs text-foreground-secondary">
                {{
                  $t('home.servers.members', {
                    count: formatMembers.format(server.members),
                  })
                }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-mask {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 8%,
    black 92%,
    transparent
  );
}
</style>

<style>
/* hidden before hydration, the intro fade-in shows them (see HomeHero) */
html.motion-ok .marquee-title,
html.motion-ok .marquee-row {
  visibility: hidden;
}
</style>
