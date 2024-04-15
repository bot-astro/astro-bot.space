<script lang="ts" setup>
/*
SCROLLING ANIMATION
*/
import { useWindowScroll } from '@vueuse/core'

// Navbar border toggling
const navbarContainer = ref<HTMLElement | null>(null)
const { y } = useWindowScroll()
const scrolledClasses = [
  'bg-black',
  'md:bg-opacity-50',
  'md:backdrop-saturate-150',
  'shadow-[inset_0_-1px_0_0_hsla(0,0%,100%,0.1)]',
  'md:backdrop-blur-sm',
]

watch(y, () => {
  if (y.value > 0)
    navbarContainer.value?.classList.add(...scrolledClasses)
  else
    navbarContainer.value?.classList.remove(...scrolledClasses)
})
</script>

<template>
  <!-- full navbar container -->
  <div
    ref="navbarContainer"
    class="sticky top-0 z-50 min-w-full duration-100 transition-[background box-shadow]"
  >
    <!-- navbar content container -->
    <header class="container mx-auto flex h-16 gap-4 px-4">
      <!-- astro logo -->
      <div class="flex items-center">
        <NuxtLink
          to="/"
          aria-label="home"
          class="flex items-center"
        >
          <NuxtImg
            src="/img/logo.png"
            class="mr-4 h-10 w-10 select-none"
            alt="Astro-s logo"
            draggable="false"
          />
        </NuxtLink>
      </div>

      <!-- desktop: navbar items -->
      <div class="hidden w-full items-center gap-8 whitespace-nowrap lg:flex">
        <NuxtLink to="/invite">
          Add to server
        </NuxtLink>
        <NuxtLink to="/support">
          Support
        </NuxtLink>
        <HMenu as="div" class="relative inline-block">
          <HMenuButton class="flex items-center gap-2 button-text">
            <span>Features</span>
            <IconDropdown />
          </HMenuButton>
          <HMenuItems class="absolute flex flex-col menu">
            <HMenuItem class="menu-item menu-item-first">
              <NuxtLink to="/temporary-voice-channels">
                Temporary Voice Channels
              </NuxtLink>
            </HMenuItem>
            <DefaultMenuDivider />
            <HMenuItem class="menu-item menu-item-last">
              <NuxtLink to="/voice-roles">
                Voice roles
              </NuxtLink>
            </HMenuItem>
          </HMenuItems>
        </HMenu>
        <NuxtLink to="/premium">
          Premium
        </NuxtLink>
      </div>

      <!-- spacer -->
      <div
        class="flex flex-grow"
      />

      <!-- auth indicator -->
      <div class="flex shrink-0 items-center">
        <CoreNavigationProfileDropdown />
      </div>
    </header>
  </div>
</template>
