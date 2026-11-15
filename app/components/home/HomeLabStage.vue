<script lang="ts" setup>
import IconVoiceRole from '~/components/icon/IconVoiceRole.vue'
import { IconNames } from '~/constants/IconNames'
import {
  ChevronDown,
  Clock,
  Copy,
  Crown,
  Eye,
  EyeOff,
  Gamepad2,
  Headphones,
  Hash,
  Lock,
  LockOpen,
  MessageSquare,
  Pencil,
  Plus,
  Server,
  UserCheck,
  UserPlus,
  Users,
  UserX,
  Volume2,
} from 'lucide-vue-next'

const WORLD_W = 3000
const WORLD_H = 1700
const STEP_LENGTH = 9

const { gsap, ScrollTrigger, reducedMotion } = useHomeMotion()
const { invite } = useInvite()

const steps = [
  { id: 'temp', side: 'right', interactive: true, world: 'discord' },
  { id: 'numbered', side: 'right', interactive: true, world: 'discord' },
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

const interfaceEmojis = [
  '🔒',
  '🔓',
  '🙈',
  '👁️',
  null,
  '👥',
  '➕',
  '🚫',
  '✅',
  null,
  '✏️',
  '🎧',
  '🌍',
  '📋',
  null,
  '💬',
  '🕒',
  '👑',
  '🔄',
  null,
  null,
  null,
  null,
  null,
  null,
]
const interfaceLabels = [
  'Lock',
  'Unlock',
  'Hide',
  'Unhide',
  '',
  'User limit',
  'Invite',
  'Ban',
  'Permit',
  '',
  'Name',
  'Bitrate',
  'Region',
  'Template',
  '',
  'Chat',
  'Waiting room',
  'Claim',
  'Transfer ownership',
  '',
  '',
  '',
  '',
  '',
  '',
]

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
const you = { name: 'Nova', color: colors[5] }

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
    yours: 'Squad Echo',
    channels: [
      { name: 'Squad Alpha', members: [0, 1, 2], reveal: false },
      { name: 'Squad Bravo', members: [3, 4], reveal: false },
      { name: 'Squad Charlie', members: [5], reveal: true },
      { name: 'Squad Delta', members: [], reveal: true },
    ],
  },
] as const

const textChannels = ['general', 'memes', 'clips', 'off-topic']

const interfaceButtons = [
  { label: 'Lock', icon: Lock },
  { label: 'Unlock', icon: LockOpen },
  { label: 'Hide', icon: EyeOff },
  { label: 'Unhide', icon: Eye },
  { label: 'Limit', icon: Users },
  { label: 'Invite', icon: UserPlus },
  { label: 'Ban', icon: UserX },
  { label: 'Permit', icon: UserCheck },
  { label: 'Rename', icon: Pencil },
  { label: 'Bitrate', icon: Headphones },
  { label: 'Region', icon: Server },
  { label: 'Template', icon: Copy },
  { label: 'Chat', icon: MessageSquare },
  { label: 'Waiting', icon: Clock },
  { label: 'Claim', icon: Crown, gold: true },
  { label: 'Transfer', icon: Crown, gold: true, slash: true },
]

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
const activeStep = ref(-1)
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
          (el === dashEl ? 0.92 : 0.97)
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
          step.world === 'dash' ? 2 : 1,
          (w * (step.world === 'dash' ? 0.5 : 0.46)) / target.offsetWidth,
          (h * 0.78) / target.offsetHeight,
        )
        const anchor = step.side === 'right' ? 0.32 : 0.68
        return {
          x: w * anchor - (left + target.offsetWidth / 2) * scale,
          y: h / 2 - (top + target.offsetHeight / 2) * scale,
          scale,
        }
      }

      const exitUp = (el: HTMLElement) => () => {
        const o = overview(el)()
        const scale = o.scale * 0.45
        return {
          x: (stageEl.clientWidth - el.offsetWidth * scale) / 2,
          y: -el.offsetHeight * scale - 80,
          scale,
        }
      }

      const enterBelow = (el: HTMLElement) => () => ({
        ...overview(el)(),
        y: stageEl.clientHeight + 40,
      })

      const lazy = (camera: () => { x: number; y: number; scale: number }) => ({
        x: () => camera().x,
        y: () => camera().y,
        scale: () => camera().scale,
      })

      const starts: number[] = []
      const DASH_AT = 1 + 4 * STEP_LENGTH + 4

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stageEl,
          start: 'top top+=64',
          end: () => `+=${tl.duration() * 105}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const time = tl.time()
          activeStep.value = starts.filter((t) => time >= t - 0.5).length - 1
          const live = time < DASH_AT - 0.5 ? worldEl : dashEl
          const x = gsap.getProperty(live, 'x') as number
          const y = gsap.getProperty(live, 'y') as number
          const scale = gsap.getProperty(live, 'scale') as number
          gsap.set(q('.lab-grid'), {
            x: x * 0.25,
            y: y * 0.25,
            scale: 1 + (scale - overview(live)().scale) * 0.4,
          })
        },
      })

      tl.fromTo(
        q('.lab-hint'),
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.8 },
        0.4,
      )

      steps.forEach((step, i) => {
        const t0 =
          step.world === 'dash'
            ? DASH_AT + (i - DASH_FIRST) * STEP_LENGTH
            : 1 + i * STEP_LENGTH
        starts.push(t0)
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
            { y: (step.nav - 2) * 36, duration: 0.6, ease: 'power2.inOut' },
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
            duration: 3,
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
            duration: 2.5,
            ease: 'power2.inOut',
            immediateRender: false,
          },
          t0 + 6.2,
        )
        tl.fromTo(ring, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, t0 + 2)
        tl.to(ring, { autoAlpha: 0, duration: 0.6 }, t0 + 6.2)
        tl.fromTo(
          panel,
          { autoAlpha: 0, x: 80 * dir },
          { autoAlpha: 1, x: 0, duration: 1, ease: 'power3.out' },
          t0 + 2.2,
        )
        tl.to(
          panel,
          { autoAlpha: 0, x: -40 * dir, duration: 0.8, ease: 'power2.in' },
          t0 + 6.2,
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
            t0 + 3.2,
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
            t0 + 3.2,
          )
        }
      })

      tl.fromTo(
        worldEl,
        lazy(overview(worldEl)),
        {
          ...lazy(exitUp(worldEl)),
          duration: 3.6,
          ease: 'power2.inOut',
          immediateRender: false,
        },
        1 + 4 * STEP_LENGTH,
      )
      tl.to(worldEl, { autoAlpha: 0, duration: 1 }, 1 + 4 * STEP_LENGTH + 2.6)
      tl.fromTo(
        dashEl,
        { autoAlpha: 0, ...lazy(enterBelow(dashEl)) },
        {
          autoAlpha: 1,
          ...lazy(overview(dashEl)),
          duration: 3.6,
          ease: 'power2.inOut',
        },
        1 + 4 * STEP_LENGTH,
      )

      const finaleAt = DASH_AT + (steps.length - DASH_FIRST) * STEP_LENGTH - 1
      tl.to(
        dashEl,
        { autoAlpha: 0, duration: 1.6, ease: 'power2.in' },
        finaleAt,
      )
      tl.fromTo(
        q('.lab-finale'),
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.6 },
        finaleAt + 0.6,
      )
      tl.fromTo(
        q('.lab-finale-content'),
        { y: 120, scale: 0.94 },
        { y: 0, scale: 1, duration: 2, ease: 'power3.out' },
        finaleAt + 0.8,
      )
      tl.to({}, { duration: 2.5 }, finaleAt + 2.8)

      tl.fromTo(
        q('.lab-progress'),
        { scaleX: 0 },
        { scaleX: 1, duration: tl.duration() },
        0,
      )

      return () => {
        gsap.set(q('.lab-grid'), { clearProps: 'all' })
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
  <section ref="root" class="w-full">
    <!-- desktop: pinned camera moving around a fake Discord server -->
    <div
      ref="stage"
      class="relative hidden h-[calc(100svh-4rem)] w-full overflow-hidden bg-black/20 motion-reduce:hidden lg:block"
    >
      <div
        class="lab-grid pointer-events-none absolute -inset-1/4"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute top-1/4 left-1/4 size-128 rounded-full bg-purple-500/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute right-1/4 bottom-0 size-128 rounded-full bg-pink-500/10 blur-[140px]"
        aria-hidden="true"
      />

      <div
        ref="world"
        class="absolute top-0 left-0 flex origin-top-left overflow-hidden rounded-[28px] border border-white/10 bg-[#313338] text-[#dbdee1] shadow-[0_0_120px_rgba(168,85,247,0.25)] will-change-transform"
        :style="{ width: `${WORLD_W}px`, height: `${WORLD_H}px` }"
      >
        <svg width="0" height="0" class="absolute" aria-hidden="true">
          <defs>
            <linearGradient id="lab-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#c084fc" />
              <stop offset="1" stop-color="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        <!-- server rail -->
        <div
          class="flex w-35 shrink-0 flex-col items-center gap-5 bg-[#1e1f22] py-6"
          aria-hidden="true"
        >
          <NuxtImg
            src="/img/logo.png"
            class="size-22 rounded-[28px] bg-[#313338] p-3"
            sizes="96px"
            alt=""
          />
          <div class="h-1 w-12 rounded bg-white/10" />
          <div
            v-for="n in 7"
            :key="n"
            class="size-22 rounded-full bg-[#313338]"
          />
        </div>

        <!-- channel list -->
        <div class="flex w-175 shrink-0 flex-col bg-[#2b2d31]">
          <div
            class="flex h-22 items-center justify-between border-b border-black/30 px-8 text-[30px] font-semibold text-white"
          >
            Astro Lounge
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

              <div class="lab-ring" :data-ring-id="category.id" />
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
                      class="relative flex items-center gap-3 rounded-lg bg-[#4e5058] px-5 py-4 text-[28px] font-semibold text-white"
                    >
                      <component
                        :is="button.icon"
                        class="size-8 shrink-0"
                        :style="{
                          stroke: button.gold ? '#f59e0b' : 'url(#lab-grad)',
                        }"
                      />
                      {{ button.label }}
                      <span
                        v-if="button.slash"
                        class="absolute top-1/2 left-4 h-0.5 w-10 -rotate-45 bg-white"
                      />
                    </div>
                  </div>
                  <div class="text-[24px]">
                    Use the buttons below to manage your voice channel
                  </div>
                  <div class="lab-ring" data-ring-id="interface" />
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
            <div class="lab-ring" data-ring-id="voice_role" />
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
        class="pointer-events-none absolute top-0 left-0 flex origin-top-left overflow-hidden rounded-xl border border-white/10 bg-background text-sm shadow-[0_0_120px_rgba(168,85,247,0.25)] select-none"
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
                AL
              </p>
              <div class="flex grow flex-col">
                <span>Astro Lounge</span>
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
          <div class="lab-ring" data-ring-id="dash_sections" />
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
                <div class="groups-wrapper">
                  <span class="text-group-name">{{
                    $t('generators.editor.group_vc_name')
                  }}</span>
                  <div class="groups-container">
                    <GroupSetting
                      :heading="$t('generators.editor.vc_name.title')"
                      :description="$t('generators.editor.vc_name.description')"
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
                <div class="lab-ring" data-ring-id="dash_generator" />
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
                          v-for="(emoji, n) in interfaceEmojis"
                          :key="n"
                          class="flex h-10 min-w-0 items-center justify-center gap-1.5 rounded px-1.5 text-sm"
                          :class="
                            emoji
                              ? 'bg-[#4e5058] text-white'
                              : 'bordered border-dashed text-dimmed'
                          "
                        >
                          <template v-if="emoji">
                            <span class="shrink-0">{{ emoji }}</span>
                            <span class="min-w-0 truncate">{{
                              interfaceLabels[n]
                            }}</span>
                          </template>
                          <Icon v-else name="fluent:add-12-regular" />
                        </div>
                      </div>
                    </template>
                  </GroupSetting>
                </div>
                <div class="lab-ring" data-ring-id="dash_interface" />
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
                <div class="lab-ring" data-ring-id="dash_errors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- explanation panels -->
      <div
        v-for="(step, i) in steps"
        :key="step.id"
        :data-panel="step.id"
        class="invisible absolute inset-y-0 my-auto h-fit w-104 rounded-md bordered bg-background/80 p-7 backdrop-blur xl:w-120"
        :class="step.side === 'right' ? 'right-[5%]' : 'left-[5%]'"
      >
        <div
          class="flex items-center justify-between text-xs tracking-widest uppercase"
        >
          <span class="text-purple-300">
            {{ $t(`home.lab.steps.${step.id}.label`) }}
          </span>
          <span class="text-foreground-secondary"
            >0{{ i + 1 }} / 0{{ steps.length }}</span
          >
        </div>
        <h3 class="mt-4 font-display text-3xl tracking-wide">
          {{ $t(`home.lab.steps.${step.id}.title`) }}
        </h3>
        <p class="mt-3 text-dimmed">
          {{ $t(`home.lab.steps.${step.id}.description`) }}
        </p>
        <ul class="mt-5 flex flex-col gap-2 text-sm">
          <li v-for="p in 3" :key="p" class="flex gap-2">
            <span class="text-purple-400">✓</span>
            {{ $t(`home.lab.steps.${step.id}.p${p}`) }}
          </li>
        </ul>
        <p
          v-if="step.interactive"
          class="mt-5 rounded bg-purple-500/15 px-3 py-2 text-sm text-purple-300"
        >
          {{ $t('home.lab.try') }}
        </p>
      </div>

      <div
        class="lab-finale invisible absolute inset-0 flex items-center justify-center bg-black/80 p-4"
      >
        <div
          class="pointer-events-none absolute top-1/2 left-1/2 size-176 -translate-1/2 rounded-full bg-purple-500/25 blur-[140px]"
          aria-hidden="true"
        />
        <div
          class="lab-finale-content relative flex max-w-3xl flex-col items-center text-center"
        >
          <NuxtImg
            src="/img/logo.png"
            class="size-32 select-none"
            sizes="160px"
            alt=""
          />
          <h3 class="mt-6 font-display text-5xl tracking-wide md:text-6xl">
            {{ $t('home.lab.finale.title') }}
          </h3>
          <p class="mt-4 max-w-xl text-lg text-dimmed">
            {{ $t('home.lab.finale.description') }}
          </p>
          <div class="mt-10 flex gap-3">
            <ButtonStandout class="px-10 text-lg" @click="invite">
              {{ $t('home.hero.invite') }}
            </ButtonStandout>
            <ButtonSecondary to="/guides" class="px-8 py-2 text-lg">
              {{ $t('home.hero.how_it_works') }}
            </ButtonSecondary>
          </div>
        </div>
      </div>

      <div
        class="lab-hint lab-hint-pill pointer-events-none absolute bottom-24 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-purple-400/70 bg-purple-500/25 px-6 py-3 text-sm font-medium tracking-widest text-foreground uppercase backdrop-blur"
      >
        {{ $t('home.lab.hint') }}
        <ChevronDown class="lab-bounce size-4" />
      </div>
      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 pb-5"
      >
        <div class="flex gap-6 text-xs tracking-widest uppercase">
          <span
            v-for="(step, i) in steps"
            :key="step.id"
            class="transition-colors duration-300"
            :class="activeStep === i ? 'text-purple-300' : 'text-white/30'"
          >
            0{{ i + 1 }}
          </span>
        </div>
        <div class="h-px w-72 bg-white/10">
          <div
            class="lab-progress h-full origin-left bg-linear-to-r from-purple-500 to-pink-500"
          />
        </div>
      </div>
    </div>

    <!-- mobile / tablet / reduced motion: plain cards -->
    <div
      class="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 motion-reduce:flex lg:hidden"
    >
      <article
        v-for="step in steps"
        :key="step.id"
        class="rounded-md bordered bg-background/80 p-6"
      >
        <span class="text-xs tracking-widest text-purple-300 uppercase">
          {{ $t(`home.lab.steps.${step.id}.label`) }}
        </span>
        <h3 class="mt-3 font-display text-2xl tracking-wide">
          {{ $t(`home.lab.steps.${step.id}.title`) }}
        </h3>
        <p class="mt-2 text-dimmed">
          {{ $t(`home.lab.steps.${step.id}.description`) }}
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.lab-grid {
  background-image:
    linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
}

/* the huge spread shadow darkens everything in the world except the target */
.lab-ring {
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

.lab-bounce {
  animation: lab-bounce 1.2s ease-in-out infinite;
}

@keyframes lab-bounce {
  50% {
    transform: translateY(4px);
  }
}

.lab-hint-pill {
  animation: lab-glow 1.8s ease-in-out infinite;
}

@keyframes lab-glow {
  50% {
    box-shadow: 0 0 28px rgb(168 85 247 / 0.7);
  }
}
</style>
