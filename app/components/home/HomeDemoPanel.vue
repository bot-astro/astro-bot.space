<script lang="ts" setup>
import { Plus, Volume2 } from 'lucide-vue-next'
import { showcaseYou, type ShowcaseScenario } from '~/constants/homeShowcase'

defineProps<{ scenario: ShowcaseScenario }>()

const { gsap, reducedMotion } = useHomeMotion()

const joined = ref(false)

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
</script>

<template>
  <div class="flex size-full flex-col justify-center gap-4 p-4">
    <div>
      <span class="text-xs tracking-wider text-foreground-secondary uppercase">
        {{ $t('home.demo.channel_name') }}
      </span>
      <div
        class="mt-2 rounded bordered bg-background px-3 py-2 font-mono text-sm wrap-break-word"
      >
        <template
          v-for="(part, i) in scenario.template
            .split(/(\{\w+\})/g)
            .filter(Boolean)"
          :key="i"
        >
          <span
            v-if="/^\{\w+\}$/.test(part)"
            class="rounded bg-purple-500/20 px-1 text-purple-400"
            >{{ part }}</span
          >
          <span v-else>{{ part }}</span>
        </template>
      </div>
    </div>

    <!-- fake discord channel list -->
    <div class="flex flex-col gap-1 rounded bg-background p-2">
      <span
        class="px-2 pb-1 text-xs tracking-wider text-foreground-secondary uppercase"
      >
        {{ $t('home.demo.voice_channels') }}
      </span>

      <button
        class="flex cursor-pointer items-center gap-2 rounded p-2 text-left transition-colors disabled:cursor-default"
        :class="
          joined
            ? 'text-foreground-secondary'
            : 'bg-purple-500/15 text-foreground hover:bg-purple-500/25'
        "
        :disabled="joined"
        @click="joined = true"
      >
        <Plus class="size-4 shrink-0" />
        <span class="text-sm">{{ $t('home.demo.generator') }}</span>
        <span
          v-if="!joined"
          class="ml-auto rounded-full bg-purple-500 px-2.5 py-0.5 text-xs text-white-900"
        >
          {{ $t('home.demo.join') }}
        </span>
      </button>

      <Transition :css="false" @enter="onEnter" @leave="onLeave">
        <div v-if="joined" class="overflow-hidden">
          <div class="flex items-center gap-2 rounded bg-white-500/10 p-2">
            <Volume2 class="size-4 shrink-0 text-foreground-secondary" />
            <span class="truncate text-sm font-medium">{{
              scenario.yourChannel
            }}</span>
            <span
              class="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-black"
              :style="{ background: showcaseYou.color }"
              :title="`${showcaseYou.name} (${$t('home.demo.you')})`"
              >{{ showcaseYou.name[0] }}</span
            >
            <button
              class="cursor-pointer rounded bg-red-500/20 px-2 py-0.5 text-xs text-red-400 transition-colors hover:bg-red-500/30"
              @click="joined = false"
            >
              {{ $t('home.demo.leave') }}
            </button>
          </div>
        </div>
      </Transition>

      <div
        class="pointer-events-none flex flex-col gap-1 opacity-70 select-none"
        aria-hidden="true"
      >
        <div
          v-for="channel in scenario.others"
          :key="channel.name"
          class="flex items-center gap-2 rounded p-2"
        >
          <Volume2 class="size-4 shrink-0 text-foreground-secondary" />
          <span class="truncate text-sm text-foreground-secondary">{{
            channel.name
          }}</span>
          <div class="ml-auto flex shrink-0 -space-x-1.5">
            <span
              v-for="member in channel.members"
              :key="member.name"
              class="flex size-5 items-center justify-center rounded-full border border-background text-[10px] font-semibold text-black"
              :style="{ background: member.color }"
              >{{ member.name[0] }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
