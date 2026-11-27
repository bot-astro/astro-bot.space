<script lang="ts" setup>
const { gsap, reducedMotion } = useHomeMotion()

const SCROLL_SPEED = 0.35
const OVERSCROLL_SPEED = 1.2
const OVERSCROLL_SMOOTHING = 0.9
// deltaMode 1 reports lines, not pixels
const LINE_HEIGHT = 16
// tolerance in px for subpixel scroll positions at the end of the page
const BOTTOM_EPSILON = 2

const rows: HTMLElement[] = []
const units: HTMLElement[] = []

// distance travelled because of overscroll at the bottom of the page, smoothed
const overscroll = { target: 0, value: 0 }
let unitWidths = [0, 0]
let setX: ((x: number) => void)[] = []
let lastTouchY = 0

function render() {
  const [first, second] = unitWidths
  if (!first || !second) return
  const distance = window.scrollY * SCROLL_SPEED + overscroll.value
  setX[0]!(-(distance % first))
  setX[1]!((distance % second) - second)
}

function measure() {
  unitWidths = units.map((el) => el.offsetWidth)
  render()
}

function atBottom() {
  return (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - BOTTOM_EPSILON
  )
}

function push(delta: number): boolean {
  // only downward input is captured, scrolling up always moves the page right away
  if (delta <= 0 || !atBottom()) return false
  overscroll.target += delta * OVERSCROLL_SPEED
  gsap.to(overscroll, {
    value: overscroll.target,
    duration: OVERSCROLL_SMOOTHING,
    ease: 'power3.out',
    overwrite: true,
    onUpdate: render,
  })
  return true
}

// capture phase on window runs before Lenis, which listens on bubble
function onWheel(e: WheelEvent) {
  const delta = e.deltaMode === 1 ? e.deltaY * LINE_HEIGHT : e.deltaY
  if (!push(delta)) return
  e.preventDefault()
  e.stopPropagation()
}

function onTouchStart(e: TouchEvent) {
  lastTouchY = e.touches[0]!.clientY
}

function onTouchMove(e: TouchEvent) {
  const y = e.touches[0]!.clientY
  const delta = lastTouchY - y
  lastTouchY = y
  if (!push(delta)) return
  e.preventDefault()
  e.stopPropagation()
}

onMounted(() => {
  setX = rows.map(
    (row) => gsap.quickSetter(row, 'x', 'px') as (x: number) => void,
  )
  measure()
  // the display font changes the width of the units once it is loaded
  document.fonts.ready.then(measure)
  if (reducedMotion()) return
  window.addEventListener('resize', measure)
  window.addEventListener('scroll', render, { passive: true })
  window.addEventListener('wheel', onWheel, { passive: false, capture: true })
  window.addEventListener('touchstart', onTouchStart, {
    passive: true,
    capture: true,
  })
  window.addEventListener('touchmove', onTouchMove, {
    passive: false,
    capture: true,
  })
})

onUnmounted(() => {
  gsap.killTweensOf(overscroll)
  window.removeEventListener('resize', measure)
  window.removeEventListener('scroll', render)
  window.removeEventListener('wheel', onWheel, { capture: true })
  window.removeEventListener('touchstart', onTouchStart, { capture: true })
  window.removeEventListener('touchmove', onTouchMove, { capture: true })
})
</script>

<template>
  <section
    class="flex w-full flex-col gap-2 overflow-hidden border-t border-neutral-900 bg-neutral-950 py-6 select-none"
    aria-hidden="true"
  >
    <div
      v-for="row in 2"
      :key="row"
      :ref="(el) => (rows[row - 1] = el as HTMLElement)"
      class="flex w-max font-display text-6xl tracking-widest whitespace-nowrap uppercase md:text-9xl"
    >
      <div
        v-for="n in 6"
        :key="n"
        :ref="
          (el) => {
            if (n === 1) units[row - 1] = el as HTMLElement
          }
        "
        class="flex shrink-0 items-center gap-8 pr-8"
      >
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
      </div>
    </div>
  </section>
</template>
