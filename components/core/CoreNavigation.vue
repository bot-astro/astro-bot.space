<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'

const route = useRoute()

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

// mobile: navbar open state
const navbarOpened = ref(false)

function toggleMobileNavbarOpenState() {
  navbarOpened.value = !navbarOpened.value
}

// navbar auth status
const authStore = useAuthStore()

function logout() {
  authStore.logout()
}

const profilePopupShown = ref(false)

function toggleProfilePopup() {
  profilePopupShown.value = !profilePopupShown.value
}

watch(() => route.fullPath, () => {
  navbarOpened.value = false
  profilePopupShown.value = false
})
</script>

<template>
  <!-- full navbar container -->
  <div
    ref="navbarContainer"
    class="transition-[background box-shadow] sticky top-0 z-50 min-w-full duration-100"
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
      <div class="hidden items-center gap-8 whitespace-nowrap lg:flex">
        <NuxtLink to="/invite">
          Add to server
        </NuxtLink>
        <NuxtLink to="/support">
          Support
        </NuxtLink>
      </div>

      <!-- spacer -->
      <div
        class="flex flex-grow"
        data-v-044af020=""
      />

      <!-- auth indicator -->
      <div class="flex items-center">
        <!-- desktop -->
        <div class="hidden lg:flex">
          <div v-if="authStore.data" class="relative">
            <button
              class="flex items-center gap-2 text-button"
              @click="toggleProfilePopup()"
            >
              <NuxtImg
                :src="`https://cdn.discordapp.com/avatars/${authStore.data.user.id}/${authStore.data.user.avatar}.png`"
                class="rounded-full size-8"
              />
              <span>{{ authStore.data.user.username }}</span>
              <Icon
                name="fluent:chevron-down-12-regular"
              />
            </button>

            <div v-if="profilePopupShown" class="absolute z-10 mt-8 -left-1/2 bg-black p-6 border-gray-800 border-2 rounded-lg shadow-lg">
              <div class="flex flex-col justify-center items-center gap-2">
                <Icon
                  name="fluent:dismiss-12-filled"
                  class="size-6 self-end text-button"
                  @click="toggleProfilePopup()"
                />

                <NuxtImg
                  :src="`https://cdn.discordapp.com/avatars/${authStore.data.user.id}/${authStore.data.user.avatar}.png`"
                  class="rounded-full size-24"
                />

                <span class="text-xl">{{ authStore.data.user.username }}</span>

                <div class="flex gap-8">
                  <div class="flex flex-col">
                    <NuxtLink to="/guilds" class="text-2xl font-bold">
                      Servers
                    </NuxtLink>
                    <NuxtLink to="/billing" class="text-2xl font-bold">
                      Billing
                    </NuxtLink>
                  </div>
                  <Icon
                    name="material-symbols:logout"
                    class="size-8 self-end text-button"
                    role="button"
                    @click="logout()"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <button
              class="button"
              @click="navigateTo('/login')"
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
          />
          <Icon
            :name="
              navbarOpened
                ? 'fluent:dismiss-20-filled'
                : 'fluent:line-horizontal-3-20-filled'
            "
            class="z-10 size-8 cursor-pointer select-none"
            @click="toggleMobileNavbarOpenState"
          />

          <!-- mobile navbar drawer backdrop -->
          <div v-if="navbarOpened" class="fixed left-0 top-0 w-full h-full backdrop-blur-sm" />

          <!-- mobile navbar drawer -->
          <div
            v-if="navbarOpened"
            class="fixed left-0 top-0 flex h-screen w-4/5 flex-col justify-between bg-black"
          >
            <div class="flex flex-col px-6 py-4 gap-1">
              <NuxtLink to="/invite" class="text-2xl font-bold">
                Invite
              </NuxtLink>
              <NuxtLink to="/premium" class="text-2xl font-bold">
                Premium
              </NuxtLink>
              <NuxtLink to="/support" class="text-2xl font-bold">
                Support
              </NuxtLink>

              <hr class="my-2 opacity-25">

              <div v-if="authStore.data" class="flex flex-col gap-1">
                <NuxtLink to="/guilds" class="text-2xl font-bold">
                  Servers
                </NuxtLink>
                <NuxtLink to="/billing" class="text-2xl font-bold">
                  Billing
                </NuxtLink>
                <div class="flex items-center gap-4 mt-2">
                  <NuxtImg
                    :src="`https://cdn.discordapp.com/avatars/${authStore.data.user.id}/${authStore.data.user.avatar}.png`"
                    class="rounded-full size-12"
                  />

                  <span class="text-xl font-bold text-gray-300">{{ authStore.data.user.username }}</span>
                </div>

                <button
                  class="button mt-2"
                  @click="logout()"
                >
                  Logout
                </button>
              </div>
              <div v-else>
                <button
                  class="button"
                  @click="navigateTo('/login')"
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
