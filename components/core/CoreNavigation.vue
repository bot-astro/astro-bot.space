<template>
  <!-- full navbar container -->
  <div
    ref="navbarContainer"
    class="transition-[background box-shadow] sticky top-0 z-50 min-w-full duration-100"
  >
    <!-- navbar content container -->
    <header class="container mx-auto flex h-16 px-4">
      <!-- astro logo -->
      <div class="flex items-center px-2">
        <NuxtLink to="/" aria-label="home" class="flex items-center">
          <NuxtImg
            src="/img/logo.png"
            class="mr-4 h-8 w-8"
            alt="Astro-s logo"
            draggable="false"
          />
          <p>Astro</p>
        </NuxtLink>
      </div>

      <!-- desktop: navbar items -->
      <div class="hidden items-center gap-4 whitespace-nowrap lg:flex">
        <NuxtLink to="/invite"> Invite </NuxtLink>
        <NuxtLink to="/premium"> Premium </NuxtLink>
        <NuxtLink to="/support"> Support </NuxtLink>
      </div>

      <!-- spacer -->
      <div class="flex flex-grow" data-v-044af020=""></div>

      <!-- auth indicator -->
      <div class="flex items-center">
        <!-- desktop -->
        <div class="hidden lg:flex">
          <div v-if="authStore.data"></div>
          <div v-else>
            <button
              @click="navigateTo('/login')"
              class="flex items-center justify-center rounded bg-purple-500 bg-opacity-80 px-3 py-1.5 hover:bg-opacity-100"
            >
              Login
            </button>
          </div>
        </div>

        <!-- mobile -->
        <div class="flex items-center lg:hidden">
          <!-- background shadow -->
          <div
            v-if="navbarOpened"
            class="bg-gray-darker fixed left-0 top-0 h-screen w-screen opacity-50"
          ></div>
          <Icon
            :name="
              navbarOpened
                ? 'fluent:dismiss-20-filled'
                : 'fluent:line-horizontal-3-20-filled'
            "
            @click="toggleMobileNavbarOpenState"
            class="z-10"
          />

          <!-- mobile navbar drawer -->
          <div
            v-if="navbarOpened"
            class="fixed left-0 top-0 flex h-screen w-3/4 flex-col justify-between bg-black"
          >
            <div class="flex flex-col px-4">
              <NuxtLink to="/invite"> Invite </NuxtLink>
              <NuxtLink to="/premium"> Premium </NuxtLink>
              <NuxtLink to="/support"> Support </NuxtLink>

              <hr class="my-2 opacity-25" />

              <div v-if="authStore.data"></div>
              <div v-else>
                <button
                  @click="navigateTo('/login')"
                  class="flex items-center justify-center rounded bg-purple-500 bg-opacity-80 px-3 py-1.5 hover:bg-opacity-100"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
import { useWindowScroll } from "@vueuse/core";

// Navbar border toggling
const navbarContainer = ref<HTMLElement | null>(null);
const { y } = useWindowScroll();
const scrolledClasses = [
  "bg-black",
  "md:bg-opacity-50",
  "md:backdrop-saturate-150",
  "shadow-[inset_0_-1px_0_0_hsla(0,0%,100%,0.1)]",
  "md:backdrop-blur-sm",
];

watch(y, () => {
  if (y.value > 0) {
    navbarContainer.value?.classList.add(...scrolledClasses);
  } else {
    navbarContainer.value?.classList.remove(...scrolledClasses);
  }
});

// mobile: navbar open state
let navbarOpened = ref(false);

function toggleMobileNavbarOpenState() {
  navbarOpened.value = !navbarOpened.value;
}

// navbar auth status
const authStore = useAuthStore();
</script>
