<script lang="ts" setup>
import IconVoiceRole from '~/components/icon/IconVoiceRole.vue'
import { IconNames } from '~/constants/IconNames'
import { ChevronDown, Gamepad2, Hash, Plus, Volume2 } from 'lucide-vue-next'

const WORLD_W = 3000
const WORLD_H = 1700
const NAV_HEIGHT = 64

// timeline units, one unit is PX_PER_UNIT pixels of scroll
const PX_PER_UNIT = 105
const INTRO = 1
const STEP_LENGTH = 9
const ZOOM_IN = 3
const ZOOM_OUT = 2.5
const ZOOM_OUT_AT = 6.2
const RING_AT = 2
const PANEL_AT = 2.2
const REVEAL_AT = 3.2
const WORLD_SWAP = 3.6
const WORLD_SWAP_FADE_AT = 2.6
const DASH_GAP = 4
// the last scroll units of the story are trimmed from the one-screen hold
const HOLD_TRIM = 2.5

// share of the stage a world fills when seen from far away
const OVERVIEW_FILL = { discord: 0.97, dash: 0.92 }
const FOCUS_MAX_SCALE = { discord: 1, dash: 2 }
const FOCUS_WIDTH = { discord: 0.46, dash: 0.5 }
const FOCUS_HEIGHT = 0.78
// horizontal position of the focused element, the text panel takes the other side
const FOCUS_ANCHOR = { right: 0.32, left: 0.68 }
const EXIT_SCALE = 0.45
const EXIT_MARGIN = 80
const ENTER_MARGIN = 40
const GRID_PARALLAX = 0.25
const GRID_ZOOM = 0.4
const DASH_NAV_ROW = 36
const DASH_NAV_FIRST = 2

const { gsap, ScrollTrigger, reducedMotion } = useHomeMotion()

const steps = [
  {
    id: 'temp',
    side: 'right',
    interactive: true,
    world: 'discord',
    noLabel: true,
  },
  {
    id: 'numbered',
    side: 'right',
    interactive: true,
    world: 'discord',
    noLabel: true,
  },
  { id: 'interface', side: 'left', interactive: false, world: 'discord' },
  { id: 'voice_role', side: 'left', interactive: false, world: 'discord' },
  {
    id: 'dash_sections',
    side: 'right',
    interactive: false,
    world: 'dash',
    page: 'generators',
    nav: 2,
  },
  {
    id: 'dash_generator',
    side: 'right',
    interactive: false,
    world: 'dash',
    page: 'generators',
    nav: 2,
  },
  {
    id: 'dash_interface',
    side: 'left',
    interactive: false,
    world: 'dash',
    page: 'interfaces',
    nav: 3,
  },
  {
    id: 'dash_errors',
    side: 'right',
    interactive: false,
    world: 'dash',
    page: 'errors',
    nav: 1,
  },
] as const

const DASH_FIRST = 4

const dashNav = [
  { label: 'dashboard.sections.overview', icon: 'settings' },
  { label: 'dashboard.sections.errors', icon: 'errors' },
  { label: 'dashboard.sections.generators', icon: 'generator' },
  { label: 'dashboard.sections.interfaces', icon: 'interface' },
  { label: 'dashboard.sections.voice_roles', icon: 'voice-role' },
  { label: 'dashboard.sections.templates', icon: 'template' },
]

const interfaceButtons = [
  { emoji: 'lock', label: 'Lock', dashLabel: 'Lock' },
  { emoji: 'unlock', label: 'Unlock', dashLabel: 'Unlock' },
  { emoji: 'hide', label: 'Hide', dashLabel: 'Hide' },
  { emoji: 'unhide', label: 'Unhide', dashLabel: 'Unhide' },
  { emoji: 'limit', label: 'Limit', dashLabel: 'User limit' },
  { emoji: 'invite', label: 'Invite', dashLabel: 'Invite' },
  { emoji: 'ban', label: 'Ban', dashLabel: 'Ban' },
  { emoji: 'permit', label: 'Permit', dashLabel: 'Permit' },
  { emoji: 'name', label: 'Rename', dashLabel: 'Name' },
  { emoji: 'bitrate', label: 'Bitrate', dashLabel: 'Bitrate' },
  { emoji: 'region', label: 'Region', dashLabel: 'Region' },
  { emoji: 'template', label: 'Template', dashLabel: 'Template' },
  { emoji: 'chat', label: 'Chat', dashLabel: 'Chat' },
  { emoji: 'waiting', label: 'Waiting', dashLabel: 'Waiting room' },
  { emoji: 'owner', label: 'Claim', dashLabel: 'Claim' },
  {
    emoji: 'transfer_owner',
    label: 'Transfer',
    dashLabel: 'Transfer ownership',
  },
]

// the dashboard editor is a 5 columns grid, the default interface fills the first 4
const dashInterfaceCells = Array.from({ length: 25 }, (_, n) =>
  n % 5 === 4 || n >= 20
    ? null
    : interfaceButtons[Math.floor(n / 5) * 4 + (n % 5)],
)

const dashErrors = [
  'Astro cannot create channels in the category “Squads” because it is missing the Manage Channels permission.',
  'The generator “Join to create” points to a category that no longer exists.',
  'Astro cannot manage the role “In Gaming VC” because it is above Astro’s highest role.',
]

const colors = [
  '#38bdf8',
  '#f59e0b',
  '#34d399',
  '#ec489a',
  '#f87171',
  '#a855f7',
]
const you = { name: 'Nova', color: '#a855f7' }

const categories = [
  {
    id: 'temp',
    title: 'Temporary voice',
    generator: 'Join to create',
    yours: '⛏️ Minecraft | Nova',
    channels: [
      { name: '🎯 Valorant | Luna', members: [3, 4], reveal: false },
      { name: '📚 Mika’s study room', members: [1], reveal: false },
      { name: '🎵 Lofi | Sam', members: [0, 2], reveal: true },
    ],
  },
  {
    id: 'numbered',
    title: 'Squads',
    generator: 'Join to create a squad',
    yours: 'Squad Delta',
    channels: [
      { name: 'Squad Alpha', members: [0, 1, 2], reveal: false },
      { name: 'Squad Bravo', members: [3, 4], reveal: false },
      { name: 'Squad Charlie', members: [5], reveal: true },
    ],
  },
] as const

const textChannels = ['general', 'memes', 'clips', 'off-topic']

const gamers = [
  { name: 'Luna', color: colors[3], reveal: false },
  { name: 'Jax', color: colors[4], reveal: false },
  { name: 'Kai', color: colors[0], reveal: true },
]

const joined = reactive<Record<string, boolean>>({
  temp: false,
  numbered: false,
})

function onEnter(el: Element, done: () => void) {
  if (reducedMotion()) return done()
  gsap.fromTo(
    el,
    { height: 0, autoAlpha: 0 },
    {
      height: 'auto',
      autoAlpha: 1,
      duration: 0.6,
      ease: 'back.out(1.4)',
      onComplete: done,
    },
  )
}

function onLeave(el: Element, done: () => void) {
  if (reducedMotion()) return done()
  gsap.to(el, {
    height: 0,
    autoAlpha: 0,
    scale: 0.95,
    duration: 0.4,
    ease: 'power3.in',
    onComplete: done,
  })
}

const root = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const world = ref<HTMLElement | null>(null)
const dash = ref<HTMLElement | null>(null)
let mm: gsap.MatchMedia | undefined

onMounted(() => {
  mm = gsap.matchMedia()
  mm.add(
    '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
    () => {
      const stageEl = stage.value!
      const worldEl = world.value!
      const q = gsap.utils.selector(root.value!)

      const dashEl = dash.value!
      const worldOf = (index: number) =>
        steps[index]!.world === 'dash' ? dashEl : worldEl

      const overview = (el: HTMLElement) => () => {
        const w = stageEl.clientWidth
        const h = stageEl.clientHeight
        const scale =
          Math.min(w / el.offsetWidth, h / el.offsetHeight) *
          (el === dashEl ? OVERVIEW_FILL.dash : OVERVIEW_FILL.discord)
        return {
          x: (w - el.offsetWidth * scale) / 2,
          y: (h - el.offsetHeight * scale) / 2,
          scale,
        }
      }

      const focus = (index: number) => {
        const step = steps[index]!
        const el0 = worldOf(index)
        const target = el0.querySelector<HTMLElement>(
          `[data-target="${step.id}"]`,
        )!
        let left = 0
        let top = 0
        for (
          let el: HTMLElement | null = target;
          el && el !== el0;
          el = el.offsetParent as HTMLElement | null
        ) {
          left += el.offsetLeft
          top += el.offsetTop
        }
        const w = stageEl.clientWidth
        const h = stageEl.clientHeight
        const scale = Math.min(
          FOCUS_MAX_SCALE[step.world],
          (w * FOCUS_WIDTH[step.world]) / target.offsetWidth,
          (h * FOCUS_HEIGHT) / target.offsetHeight,
        )
        const anchor = FOCUS_ANCHOR[step.side]
        return {
          x: w * anchor - (left + target.offsetWidth / 2) * scale,
          y: h / 2 - (top + target.offsetHeight / 2) * scale,
          scale,
        }
      }

      const exitUp = (el: HTMLElement) => () => {
        const o = overview(el)()
        const scale = o.scale * EXIT_SCALE
        return {
          x: (stageEl.clientWidth - el.offsetWidth * scale) / 2,
          y: -el.offsetHeight * scale - EXIT_MARGIN,
          scale,
        }
      }

      const enterBelow = (el: HTMLElement) => () => ({
        ...overview(el)(),
        y: stageEl.clientHeight + ENTER_MARGIN,
      })

      const lazy = (camera: () => { x: number; y: number; scale: number }) => ({
        x: () => camera().x,
        y: () => camera().y,
        scale: () => camera().scale,
      })

      const SWAP_AT = INTRO + DASH_FIRST * STEP_LENGTH
      const DASH_AT = SWAP_AT + DASH_GAP
      const gridEl = q('.stage-grid')
      // overview scale only changes on resize, reading it every frame forces a layout
      const baseScale = new Map<HTMLElement, number>()

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stageEl,
          start: `top top+=${NAV_HEIGHT}`,
          end: () => `+=${tl.duration() * PX_PER_UNIT}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefreshInit: () => baseScale.clear(),
        },
        onUpdate: () => {
          const time = tl.time()
          const live = time < SWAP_AT + WORLD_SWAP ? worldEl : dashEl
          let base = baseScale.get(live)
          if (base === undefined) {
            base = overview(live)().scale
            baseScale.set(live, base)
          }
          const x = gsap.getProperty(live, 'x') as number
          const y = gsap.getProperty(live, 'y') as number
          const scale = gsap.getProperty(live, 'scale') as number
          gsap.set(gridEl, {
            x: x * GRID_PARALLAX,
            y: y * GRID_PARALLAX,
            scale: 1 + (scale - base) * GRID_ZOOM,
          })
        },
      })

      // both worlds start hidden in the markup so the server render does not flash them unscaled
      gsap.set(worldEl, { autoAlpha: 1 })

      tl.fromTo(
        q('.stage-hint'),
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.8 },
        0.4,
      )

      steps.forEach((step, i) => {
        const t0 =
          step.world === 'dash'
            ? DASH_AT + (i - DASH_FIRST) * STEP_LENGTH
            : INTRO + i * STEP_LENGTH
        if (step.world === 'dash') {
          const prev = steps[i - 1]
          if (!(prev && prev.world === 'dash' && prev.page === step.page)) {
            tl.to(q('.dash-page'), { autoAlpha: 0, duration: 0.3 }, t0)
            tl.to(
              q(`[data-page="${step.page}"]`),
              { autoAlpha: 1, duration: 0.6 },
              t0 + 0.3,
            )
          }
          tl.to(
            q('.dash-nav-active'),
            {
              y: (step.nav - DASH_NAV_FIRST) * DASH_NAV_ROW,
              duration: 0.6,
              ease: 'power2.inOut',
            },
            t0,
          )
        }
        const el = worldOf(i)
        const dir = step.side === 'right' ? 1 : -1
        const panel = q(`[data-panel="${step.id}"]`)
        const ring = q(`[data-ring-id="${step.id}"]`)

        tl.fromTo(
          el,
          lazy(overview(el)),
          {
            ...lazy(() => focus(i)),
            duration: ZOOM_IN,
            ease: 'power2.inOut',
            immediateRender: i === 0,
          },
          t0,
        )
        tl.fromTo(
          el,
          lazy(() => focus(i)),
          {
            ...lazy(overview(el)),
            duration: ZOOM_OUT,
            ease: 'power2.inOut',
            immediateRender: false,
          },
          t0 + ZOOM_OUT_AT,
        )
        tl.fromTo(
          ring,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1 },
          t0 + RING_AT,
        )
        tl.to(ring, { autoAlpha: 0, duration: 0.6 }, t0 + ZOOM_OUT_AT)
        tl.fromTo(
          panel,
          { autoAlpha: 0, x: 80 * dir },
          { autoAlpha: 1, x: 0, duration: 1, ease: 'power3.out' },
          t0 + PANEL_AT,
        )
        tl.to(
          panel,
          { autoAlpha: 0, x: -40 * dir, duration: 0.8, ease: 'power2.in' },
          t0 + ZOOM_OUT_AT,
        )

        const items = q(`[data-reveal="${step.id}"]`)
        if (step.id === 'interface') {
          tl.to(
            items,
            {
              backgroundColor: '#5b5d66',
              scale: 1.06,
              duration: 0.25,
              stagger: 0.12,
              repeat: 1,
              yoyo: true,
              ease: 'power2.out',
            },
            t0 + REVEAL_AT,
          )
        } else {
          tl.fromTo(
            items,
            step.id === 'dash_generator'
              ? { autoAlpha: 0, y: 40 }
              : { autoAlpha: 0, x: -40 },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 1,
              stagger: 0.8,
              ease: 'power3.out',
            },
            t0 + REVEAL_AT,
          )
        }
      })

      tl.fromTo(
        worldEl,
        lazy(overview(worldEl)),
        {
          ...lazy(exitUp(worldEl)),
          duration: WORLD_SWAP,
          ease: 'power2.inOut',
          immediateRender: false,
        },
        SWAP_AT,
      )
      tl.to(
        worldEl,
        { autoAlpha: 0, duration: 1 },
        SWAP_AT + WORLD_SWAP_FADE_AT,
      )
      tl.fromTo(
        dashEl,
        { autoAlpha: 0, ...lazy(enterBelow(dashEl)) },
        {
          autoAlpha: 1,
          ...lazy(overview(dashEl)),
          duration: WORLD_SWAP,
          ease: 'power2.inOut',
        },
        SWAP_AT,
      )

      const dashExitAt = DASH_AT + (steps.length - DASH_FIRST) * STEP_LENGTH - 1
      tl.fromTo(
        dashEl,
        lazy(overview(dashEl)),
        {
          ...lazy(exitUp(dashEl)),
          duration: WORLD_SWAP,
          ease: 'power2.inOut',
          immediateRender: false,
        },
        dashExitAt,
      )
      tl.to(
        dashEl,
        { autoAlpha: 0, duration: 1 },
        dashExitAt + WORLD_SWAP_FADE_AT,
      )

      // the stage ends up empty and the next section is pulled over it, so it has to disappear
      tl.to(
        stageEl,
        { backgroundColor: 'rgba(0, 0, 0, 0)', duration: 3 },
        dashExitAt + 0.6,
      )
      tl.to(
        q('.stage-glow, .stage-grid'),
        { autoAlpha: 0, duration: 3 },
        dashExitAt + 0.6,
      )
      tl.set(stageEl, { pointerEvents: 'none' }, dashExitAt + WORLD_SWAP)

      // the next section is pulled over the stage, it starts entering the viewport one screen
      // before the pin ends, so hold a bit less than one screen of scroll after the demo is gone
      tl.to(
        {},
        { duration: window.innerHeight / PX_PER_UNIT - HOLD_TRIM },
        dashExitAt + WORLD_SWAP,
      )

      return () => {
        gsap.set([q('.stage-grid'), q('.stage-glow'), stageEl], {
          clearProps: 'all',
        })
      }
    },
  )
})

onUnmounted(() => {
  mm?.revert()
  ScrollTrigger.refresh()
})
</script>

<template>
  <section
    id="demo"
    ref="root"
    class="w-full scroll-mt-16 motion-safe:lg:-mb-[calc(100svh-4rem)]"
  >
    <!-- desktop: pinned camera moving around a fake Discord server -->
    <div
      ref="stage"
      class="relative hidden h-[calc(100svh-4rem)] w-full overflow-hidden bg-black/20 motion-reduce:hidden lg:block"
    >
      <div
        class="stage-grid pointer-events-none absolute -inset-1/4"
        aria-hidden="true"
      />
      <div
        class="stage-glow pointer-events-none absolute top-1/4 left-1/4 size-128 rounded-full bg-purple-500/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        class="stage-glow pointer-events-none absolute right-1/4 bottom-0 size-128 rounded-full bg-pink-500/10 blur-[140px]"
        aria-hidden="true"
      />

      <div
        ref="world"
        class="invisible absolute top-0 left-0 flex origin-top-left overflow-hidden rounded-[28px] border border-white/10 bg-[#313338] text-[#dbdee1] shadow-[0_0_120px_rgba(168,85,247,0.25)] will-change-transform"
        :style="{ width: `${WORLD_W}px`, height: `${WORLD_H}px` }"
      >
        <!-- server rail -->
        <div
          class="flex w-35 shrink-0 flex-col items-center gap-5 bg-[#1e1f22] py-6"
          aria-hidden="true"
        >
          <div
            class="flex size-22 items-center justify-center rounded-[28px] bg-[#5865f2]"
          >
            <svg viewBox="0 0 24 24" class="size-12 fill-white">
              <path
                d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
              />
            </svg>
          </div>
          <div class="h-1 w-12 rounded bg-white/10" />
          <NuxtImg
            src="/img/server-icon.webp"
            class="size-22 rounded-[28px]"
            sizes="96px"
            alt=""
            loading="lazy"
          />
          <div
            v-for="n in 6"
            :key="n"
            class="size-22 rounded-full bg-[#313338]"
          />
        </div>

        <!-- channel list -->
        <div class="flex w-175 shrink-0 flex-col bg-[#2b2d31]">
          <div
            class="flex h-22 items-center justify-between border-b border-black/30 px-8 text-[30px] font-semibold text-white"
          >
            Astro Community
            <ChevronDown class="size-8" />
          </div>

          <div class="flex flex-1 flex-col gap-9 px-5 py-6">
            <div class="flex flex-col gap-1" aria-hidden="true">
              <div
                class="flex items-center gap-2 px-3 text-[22px] font-semibold tracking-wide text-[#949ba4] uppercase"
              >
                <ChevronDown class="size-6" /> Welcome
              </div>
              <div
                class="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-[28px] text-white"
              >
                <Hash class="size-7 text-[#949ba4]" /> voice-controls
              </div>
              <div
                class="flex items-center gap-3 px-4 py-3 text-[28px] text-[#949ba4]"
              >
                <Hash class="size-7" /> rules
              </div>
            </div>

            <!-- steps 1 and 2 targets, interactive generators -->
            <div
              v-for="category in categories"
              :key="category.id"
              :data-target="category.id"
              class="relative flex flex-col gap-1"
            >
              <div
                class="flex items-center gap-2 px-3 text-[22px] font-semibold tracking-wide text-[#949ba4] uppercase"
              >
                <ChevronDown class="size-6" /> {{ category.title }}
              </div>

              <button
                class="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-[28px] transition-colors disabled:cursor-default"
                :class="
                  joined[category.id]
                    ? 'text-[#949ba4]'
                    : 'bg-purple-500/15 text-white hover:bg-purple-500/30'
                "
                :disabled="joined[category.id]"
                @click="joined[category.id] = true"
              >
                <Plus class="size-7" /> {{ category.generator }}
                <span
                  v-if="!joined[category.id]"
                  class="ml-auto rounded-full bg-purple-500 px-4 py-0.5 text-[20px] text-white"
                >
                  {{ $t('home.demo.join') }}
                </span>
              </button>

              <div
                v-for="channel in category.channels"
                :key="channel.name"
                :data-reveal="channel.reveal ? category.id : undefined"
                class="pointer-events-none flex items-center gap-3 px-4 py-3 text-[28px] text-[#949ba4]"
                aria-hidden="true"
              >
                <Volume2 class="size-7 shrink-0" />
                <span class="truncate">{{ channel.name }}</span>
                <span class="ml-auto flex -space-x-2">
                  <span
                    v-for="m in channel.members"
                    :key="m"
                    class="size-8 rounded-full border-2 border-[#2b2d31]"
                    :style="{ background: colors[m] }"
                  />
                </span>
              </div>

              <Transition :css="false" @enter="onEnter" @leave="onLeave">
                <div v-if="joined[category.id]" class="overflow-hidden">
                  <div
                    class="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-[28px] text-white"
                  >
                    <Volume2 class="size-7 shrink-0 text-[#949ba4]" />
                    <span class="truncate font-medium">{{
                      category.yours
                    }}</span>
                    <span
                      class="ml-auto flex size-8 shrink-0 items-center justify-center rounded-full text-[18px] font-semibold text-black"
                      :style="{ background: you.color }"
                      >{{ you.name[0] }}</span
                    >
                    <button
                      class="cursor-pointer rounded bg-red-500/20 px-4 py-0.5 text-[20px] text-red-400 transition-colors hover:bg-red-500/30"
                      @click="joined[category.id] = false"
                    >
                      {{ $t('home.demo.leave') }}
                    </button>
                  </div>
                </div>
              </Transition>

              <div class="stage-ring" :data-ring-id="category.id" />
            </div>

            <div class="flex flex-col gap-1" aria-hidden="true">
              <div
                class="flex items-center gap-2 px-3 text-[22px] font-semibold tracking-wide text-[#949ba4] uppercase"
              >
                <ChevronDown class="size-6" /> Gaming
              </div>
              <div
                class="flex items-center gap-3 px-4 py-3 text-[28px] text-[#949ba4]"
              >
                <Gamepad2 class="size-7" /> Gaming VC
                <span class="ml-auto flex -space-x-2">
                  <span
                    v-for="g in gamers.slice(0, 2)"
                    :key="g.name"
                    class="size-8 rounded-full border-2 border-[#2b2d31]"
                    :style="{ background: g.color }"
                  />
                </span>
              </div>
            </div>

            <div class="flex flex-col gap-1" aria-hidden="true">
              <div
                class="flex items-center gap-2 px-3 text-[22px] font-semibold tracking-wide text-[#949ba4] uppercase"
              >
                <ChevronDown class="size-6" /> Community
              </div>
              <div
                v-for="name in textChannels"
                :key="name"
                class="flex items-center gap-3 px-4 py-3 text-[28px] text-[#949ba4]"
              >
                <Hash class="size-7" /> {{ name }}
              </div>
            </div>
          </div>
        </div>

        <!-- chat -->
        <div class="flex flex-1 flex-col" aria-hidden="true">
          <div
            class="flex h-22 items-center gap-3 border-b border-black/30 px-10 text-[30px] font-semibold text-white"
          >
            <Hash class="size-8 text-[#949ba4]" /> voice-controls
          </div>
          <div class="flex flex-1 flex-col justify-end gap-10 p-10 pb-16">
            <div class="flex gap-6 opacity-60">
              <span
                class="size-21 shrink-0 rounded-full"
                :style="{ background: colors[2] }"
              />
              <div>
                <div class="text-[28px] font-semibold text-white">Sam</div>
                <div class="text-[28px]">
                  welcome everyone! make your own channel with the generators on
                  the left 👋
                </div>
              </div>
            </div>
            <div class="flex gap-6 opacity-60">
              <span
                class="size-21 shrink-0 rounded-full"
                :style="{ background: colors[3] }"
              />
              <div>
                <div class="text-[28px] font-semibold text-white">Luna</div>
                <div class="text-[28px]">
                  can someone make the channel bigger? 😅
                </div>
              </div>
            </div>

            <!-- step 3 target: Astro default interface -->
            <div class="flex gap-6">
              <NuxtImg
                src="/img/logo.png"
                class="size-21 shrink-0 rounded-full bg-[#1e1f22] p-3"
                sizes="96px"
                alt=""
                loading="lazy"
              />
              <div>
                <div
                  class="flex items-center gap-3 text-[28px] font-semibold text-white"
                >
                  Astro
                  <span
                    class="rounded bg-[#5865f2] px-2 py-0.5 text-[18px] font-bold"
                    >BOT</span
                  >
                </div>
                <div
                  data-target="interface"
                  class="relative mt-3 flex w-245 flex-col gap-6 rounded-2xl border-l-8 border-l-purple-500 bg-[#2b2d31] p-8"
                >
                  <div class="flex items-center gap-4">
                    <NuxtImg
                      src="/img/logo.png"
                      class="size-14 rounded-full"
                      sizes="64px"
                      alt=""
                      loading="lazy"
                    />
                    <span class="text-[34px] font-bold text-white"
                      >Astro Interface</span
                    >
                  </div>
                  <div class="text-[28px] leading-snug">
                    You can use this interface to manage your voice channel.<br />
                    You can also use
                    <code class="rounded bg-black/30 px-2 py-0.5">/vc</code>
                    slash commands!
                  </div>
                  <div class="grid grid-cols-4 gap-4">
                    <div
                      v-for="button in interfaceButtons"
                      :key="button.label"
                      data-reveal="interface"
                      class="flex items-center gap-3 rounded-lg bg-[#4e5058] px-5 py-4 text-[28px] font-semibold text-white"
                    >
                      <img
                        :src="`/img/emojis/${button.emoji}.png`"
                        class="size-8 shrink-0 object-contain"
                        alt=""
                        loading="lazy"
                      />
                      {{ button.label }}
                    </div>
                  </div>
                  <div class="text-[24px]">
                    Use the buttons below to manage your voice channel
                  </div>
                  <div class="stage-ring" data-ring-id="interface" />
                </div>
              </div>
            </div>
            <div
              class="h-22 rounded-xl bg-[#383a40] px-8 py-6 text-[26px] text-[#949ba4]"
            >
              Message #voice-controls
            </div>
          </div>
        </div>

        <!-- members -->
        <div
          class="flex w-115 shrink-0 flex-col gap-10 bg-[#2b2d31] px-6 py-8"
          aria-hidden="true"
        >
          <div class="flex flex-col gap-2">
            <div
              class="px-2 text-[22px] font-semibold tracking-wide text-[#949ba4] uppercase"
            >
              Admins — 2
            </div>
            <div
              v-for="n in 2"
              :key="n"
              class="flex items-center gap-4 p-2 text-[28px]"
            >
              <span
                class="size-16 rounded-full"
                :style="{ background: colors[n + 1] }"
              />
              <span class="text-[#f0b232]">Admin {{ n }}</span>
            </div>
          </div>

          <!-- step 4 target -->
          <div data-target="voice_role" class="relative flex flex-col gap-2">
            <div
              class="px-2 text-[22px] font-semibold tracking-wide text-[#2ecc71] uppercase"
            >
              In Gaming VC — 3
            </div>
            <div
              v-for="gamer in gamers"
              :key="gamer.name"
              :data-reveal="gamer.reveal ? 'voice_role' : undefined"
              class="flex items-center gap-4 p-2 text-[28px]"
            >
              <span
                class="size-16 rounded-full"
                :style="{ background: gamer.color }"
              />
              <span class="text-[#2ecc71]">{{ gamer.name }}</span>
            </div>
            <div class="stage-ring" data-ring-id="voice_role" />
          </div>

          <div class="flex flex-col gap-2 opacity-60">
            <div
              class="px-2 text-[22px] font-semibold tracking-wide text-[#949ba4] uppercase"
            >
              Online — 8
            </div>
            <div
              v-for="n in 8"
              :key="n"
              class="flex items-center gap-4 p-2 text-[28px]"
            >
              <span class="size-16 rounded-full bg-white/10" />
              <span class="h-5 w-32 rounded bg-white/10" />
            </div>
          </div>
        </div>
      </div>

      <!-- dashboard showcase, built with the real dashboard classes and components -->
      <div
        ref="dash"
        class="pointer-events-none invisible absolute top-0 left-0 flex origin-top-left overflow-hidden rounded-xl border border-white/10 bg-background text-sm shadow-[0_0_120px_rgba(168,85,247,0.25)] select-none"
        :style="{ width: '1400px', height: '820px' }"
        aria-hidden="true"
      >
        <!-- sidebar -->
        <div
          data-target="dash_sections"
          class="relative flex w-62.5 shrink-0 flex-col"
        >
          <div
            class="flex min-h-20 w-full items-center bordered bg-background p-4 text-start"
          >
            <div class="flex size-full items-center gap-2">
              <p
                class="flex size-8 items-center justify-center truncate rounded-full bordered font-semibold text-white"
              >
                AC
              </p>
              <div class="flex grow flex-col">
                <span>Astro Community</span>
                <span class="text-secondary text-xs">{{
                  $t('common.ultimate')
                }}</span>
              </div>
              <IconDropdown
                class="size-5 -rotate-90 text-foreground-secondary"
              />
            </div>
          </div>
          <div
            class="relative flex grow flex-col border-r border-border bg-background-container pt-4"
          >
            <div
              class="dash-nav-active absolute inset-x-0 top-[calc(1rem+72px)] h-9 bg-background"
            />
            <div
              v-for="item in dashNav"
              :key="item.label"
              class="relative flex h-9 flex-row items-center gap-3 px-4 py-2"
            >
              <IconSettings v-if="item.icon === 'settings'" class="size-4" />
              <IconGenerator
                v-else-if="item.icon === 'generator'"
                class="size-4"
              />
              <IconInterface
                v-else-if="item.icon === 'interface'"
                class="size-4"
              />
              <IconVoiceRole
                v-else-if="item.icon === 'voice-role'"
                class="size-4"
              />
              <IconTemplate
                v-else-if="item.icon === 'template'"
                class="size-4"
              />
              <Icon
                v-else
                name="i-lucide-message-square-warning"
                class="size-4"
              />
              <span>{{ $t(item.label) }}</span>
            </div>
          </div>
          <div class="stage-ring" data-ring-id="dash_sections" />
        </div>

        <div class="relative flex flex-1 flex-col">
          <div
            class="flex min-h-20 items-center justify-end border-y border-r border-border bg-background p-3"
          >
            <span
              class="flex size-10 items-center justify-center rounded-full bordered font-semibold text-white"
              >N</span
            >
          </div>

          <div class="relative grow">
            <!-- generator editor -->
            <div
              data-page="generators"
              class="dash-page absolute inset-0 flex flex-col gap-8 p-8"
            >
              <div class="flex items-center gap-4">
                <IconGenerator
                  class="size-10 stroke-foreground-link-standout"
                />
                <div class="flex flex-col">
                  <span class="dashboard-section-title"
                    >➕ Create your channel</span
                  >
                  <span class="dashboard-section-description">{{
                    $t('generators.editor.description')
                  }}</span>
                </div>
                <div class="grow" />
                <ButtonDestructive>{{ $t('common.delete') }}</ButtonDestructive>
              </div>

              <div
                data-target="dash_generator"
                class="relative flex max-w-3xl flex-col gap-8"
              >
                <div
                  class="relative flex max-h-112 flex-col gap-8 overflow-hidden"
                >
                  <div class="groups-wrapper">
                    <span class="text-group-name">{{
                      $t('generators.editor.group_vc_name')
                    }}</span>
                    <div class="groups-container">
                      <GroupSetting
                        :heading="$t('generators.editor.vc_name.title')"
                        :description="
                          $t('generators.editor.vc_name.description')
                        "
                      >
                        <template #bottom-action>
                          <div class="flex gap-2">
                            <input
                              value="{activity_emoji} {activity_name} | {nickname}"
                              type="text"
                              class="grow"
                              readonly
                            />
                            <ButtonSecondary>
                              <IconVariable class="size-6" />
                            </ButtonSecondary>
                          </div>
                        </template>
                      </GroupSetting>
                    </div>
                  </div>

                  <div class="groups-wrapper">
                    <span class="text-group-name">{{
                      $t('generators.editor.group_rename')
                    }}</span>
                    <div class="groups-container">
                      <GroupSetting
                        :heading="$t('generators.editor.state_change.title')"
                        :description="
                          $t('generators.editor.state_change.description')
                        "
                      >
                        <Switch :checked="true" />
                      </GroupSetting>
                      <GroupSetting
                        :heading="$t('generators.editor.owner_change.title')"
                        :description="
                          $t('generators.editor.owner_change.description')
                        "
                      >
                        <Switch :checked="true" />
                      </GroupSetting>
                      <GroupSetting
                        :heading="$t('generators.editor.renaming.title')"
                        :description="
                          $t('generators.editor.renaming.description')
                        "
                      >
                        <Switch :checked="false" />
                      </GroupSetting>
                    </div>
                  </div>

                  <div class="groups-wrapper">
                    <span class="text-group-name">{{
                      $t('generators.editor.group_vc_settings')
                    }}</span>
                    <div class="groups-container">
                      <GroupSetting
                        :heading="$t('generators.editor.user_limit.title')"
                        :description="
                          $t('generators.editor.user_limit.description')
                        "
                      >
                        <Switch :checked="true" />
                      </GroupSetting>
                      <GroupSetting
                        :heading="$t('generators.editor.bitrate.title')"
                        :description="
                          $t('generators.editor.bitrate.description')
                        "
                      >
                        <Switch :checked="true" />
                      </GroupSetting>
                    </div>
                  </div>

                  <div
                    class="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-linear-to-b from-transparent to-background mask-[linear-gradient(to_bottom,transparent,black_70%)] backdrop-blur-md"
                  />
                </div>

                <div
                  data-reveal="dash_generator"
                  class="flex w-fit flex-row items-center gap-32 self-center rounded bordered bg-background-interactive p-4"
                >
                  <span class="text-center">{{
                    $t('dashboard.save_toast.message')
                  }}</span>
                  <div class="flex items-center gap-6">
                    <ButtonText>{{ $t('common.reset') }}</ButtonText>
                    <Button class="bg-[#248046]">{{
                      $t('common.save')
                    }}</Button>
                  </div>
                </div>
                <div class="stage-ring" data-ring-id="dash_generator" />
              </div>
            </div>

            <!-- interface editor -->
            <div
              data-page="interfaces"
              class="dash-page invisible absolute inset-0 flex flex-col gap-8 p-8 opacity-0"
            >
              <div class="flex items-center gap-4">
                <IconInterface
                  class="size-10 stroke-foreground-link-standout"
                />
                <div class="flex flex-col">
                  <span class="dashboard-section-title">voice-controls</span>
                  <span class="dashboard-section-description">{{
                    $t('interfaces.editor.page_description')
                  }}</span>
                </div>
                <div class="flex grow justify-end gap-2">
                  <ButtonSecondary>{{
                    $t('interfaces.editor.move')
                  }}</ButtonSecondary>
                  <ButtonDestructive>{{
                    $t('common.delete')
                  }}</ButtonDestructive>
                </div>
              </div>

              <div data-target="dash_interface" class="relative max-w-3xl">
                <div class="groups-wrapper">
                  <span class="text-group-name">{{
                    $t('interfaces.editor.buttons_layout')
                  }}</span>
                  <GroupSetting
                    :heading="$t('interfaces.editor.buttons.title')"
                    :description="$t('interfaces.editor.buttons.description')"
                  >
                    <template #bottom-action>
                      <div class="grid grid-cols-5 gap-2">
                        <div
                          v-for="(button, n) in dashInterfaceCells"
                          :key="n"
                          class="flex h-10 min-w-0 items-center justify-center gap-1.5 rounded px-1.5 text-sm"
                          :class="
                            button
                              ? 'bg-[#4e5058] text-white'
                              : 'bordered border-dashed text-dimmed'
                          "
                        >
                          <template v-if="button">
                            <img
                              :src="`/img/emojis/${button.emoji}.png`"
                              class="size-4 shrink-0 object-contain"
                              alt=""
                              loading="lazy"
                            />
                            <span class="min-w-0 truncate">{{
                              button.dashLabel
                            }}</span>
                          </template>
                          <Icon v-else name="fluent:add-12-regular" />
                        </div>
                      </div>
                    </template>
                  </GroupSetting>
                </div>
                <div class="stage-ring" data-ring-id="dash_interface" />
              </div>
            </div>

            <!-- errors -->
            <div
              data-page="errors"
              class="dash-page invisible absolute inset-0 flex flex-col gap-8 p-8 opacity-0"
            >
              <div class="flex items-center gap-4">
                <Icon
                  :name="IconNames.ERROR"
                  class="size-10 text-foreground-link-standout"
                />
                <div class="flex flex-col">
                  <span class="dashboard-section-title">{{
                    $t('errors.title')
                  }}</span>
                  <span class="dashboard-section-description">{{
                    $t('errors.description')
                  }}</span>
                </div>
                <div class="grow" />
                <ButtonDestructive>{{ $t('errors.clear') }}</ButtonDestructive>
              </div>

              <div
                data-target="dash_errors"
                class="group-setting relative flex max-w-3xl flex-col p-0"
              >
                <div
                  v-for="(error, n) in dashErrors"
                  :key="n"
                  class="flex flex-col"
                >
                  <div class="flex items-center gap-4 px-4 py-6">
                    <Icon
                      name="i-fluent-error-circle-20-regular"
                      size="1.5rem"
                      class="shrink-0"
                    />
                    <div class="flex flex-col">
                      <span>{{ error }}</span>
                      <p class="text-sm opacity-50">Nov 14, 2026, 6:42 PM</p>
                    </div>
                    <div class="grow" />
                    <Button class="shrink-0">{{ $t('errors.view') }}</Button>
                  </div>
                  <hr
                    v-if="n !== dashErrors.length - 1"
                    class="w-full bordered"
                  />
                </div>
                <div class="stage-ring" data-ring-id="dash_errors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- explanation panels -->
      <div
        v-for="step in steps"
        :key="step.id"
        :data-panel="step.id"
        class="invisible absolute inset-y-0 my-auto h-fit w-104 rounded-md bordered bg-background/80 p-7 backdrop-blur xl:w-120"
        :class="step.side === 'right' ? 'right-[5%]' : 'left-[5%]'"
      >
        <span
          v-if="!('noLabel' in step)"
          class="text-xs tracking-widest text-purple-300 uppercase"
        >
          {{ $t(`home.stage.steps.${step.id}.label`) }}
        </span>
        <h3
          class="font-display text-3xl tracking-wide"
          :class="'noLabel' in step ? '' : 'mt-4'"
        >
          {{ $t(`home.stage.steps.${step.id}.title`) }}
        </h3>
        <p class="mt-3 text-dimmed">
          {{ $t(`home.stage.steps.${step.id}.description`) }}
        </p>
        <ul class="mt-5 flex flex-col gap-2 text-sm">
          <li v-for="p in 3" :key="p" class="flex gap-2">
            <span class="text-purple-400">✓</span>
            {{ $t(`home.stage.steps.${step.id}.p${p}`) }}
          </li>
        </ul>
        <p
          v-if="step.interactive"
          class="mt-5 rounded bg-purple-500/15 px-3 py-2 text-sm text-purple-300"
        >
          {{ $t('home.stage.try') }}
        </p>
      </div>

      <div
        class="stage-hint stage-hint-pill pointer-events-none absolute bottom-24 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-purple-400/70 bg-purple-500/25 px-6 py-3 text-sm font-medium tracking-widest text-foreground uppercase backdrop-blur"
      >
        {{ $t('home.stage.hint') }}
        <ChevronDown class="stage-bounce size-4" />
      </div>
    </div>

    <!-- mobile / tablet / reduced motion: feature cards with their image -->
    <div
      class="mx-auto flex w-full flex-col items-center gap-8 px-4 motion-reduce:flex lg:hidden"
    >
      <CoreFeatureBox
        illustration-src="illustration/temp_vc.gif"
        :description="$t('home.temp_vc.description')"
        :reverse="false"
      >
        <i18n-t
          keypath="home.temp_vc.title"
          tag="span"
          class="font-display text-2xl font-medium tracking-wide"
        >
          <template #animated>
            <span class="animate-dissolve">{{
              $t('home.temp_vc.animated')
            }}</span>
          </template>
        </i18n-t>
      </CoreFeatureBox>

      <CoreFeatureBox
        :title="$t('home.default_interface.title')"
        :description="$t('home.default_interface.description')"
        illustration-src="guides/default_interface.png"
        :reverse="true"
      />

      <CoreFeatureBox
        :title="$t('home.custom_interface.title')"
        :description="$t('home.custom_interface.description')"
        illustration-src="illustration/custom_interface.png"
        :reverse="false"
      />

      <CoreFeatureBox
        illustration-src="illustration/voice_role.gif"
        :description="$t('home.voice_role.description')"
        :reverse="true"
      >
        <span
          class="animate-light font-display text-2xl font-medium tracking-wide"
          >{{ $t('home.voice_role.title') }}</span
        >
      </CoreFeatureBox>
    </div>
  </section>
</template>

<style scoped>
.stage-grid {
  background-image:
    linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
}

/* the huge spread shadow darkens everything in the world except the target */
.stage-ring {
  position: absolute;
  inset: -18px;
  z-index: 10;
  border-radius: 18px;
  border: 3px solid rgb(168 85 247);
  box-shadow:
    0 0 0 4000px rgb(0 0 0 / 0.62),
    0 0 40px rgb(168 85 247 / 0.5);
  pointer-events: none;
  visibility: hidden;
}

.stage-bounce {
  animation: stage-bounce 1.2s ease-in-out infinite;
}

@keyframes stage-bounce {
  50% {
    transform: translateY(4px);
  }
}

.stage-hint-pill {
  animation: stage-glow 1.8s ease-in-out infinite;
}

@keyframes stage-glow {
  50% {
    box-shadow: 0 0 28px rgb(168 85 247 / 0.7);
  }
}

.animate-dissolve {
  animation: dissolve 4s steps(1, end) infinite;
}

.animate-light {
  animation: light 4s steps(1, end) infinite;
}

@keyframes dissolve {
  0%,
  20%,
  80%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes light {
  0%,
  25%,
  70%,
  80%,
  100% {
    opacity: 1;
  }
  23%,
  68%,
  79%,
  85% {
    opacity: 0.2;
  }
}
</style>
