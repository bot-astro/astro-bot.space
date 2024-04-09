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

/*
MOBILE: NAVBAR OPEN STATE
*/
const navbarOpened = ref(false)

function toggleMobileNavbarOpenState() {
  navbarOpened.value = !navbarOpened.value
}

/*
AUTH STATUS
*/
const authStore = useAuthStore()
const isLoggedIn = computed(() => {
  return authStore.data !== undefined
})

function logout() {
  authStore.logout()
}

/*
ROUTE CHANGE HANDLING
*/
const route = useRoute()

watch(() => route.fullPath, () => {
  navbarOpened.value = false
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
      <div class="hidden items-center gap-8 whitespace-nowrap lg:flex w-full">
        <NuxtLink to="/invite">
          Add to server
        </NuxtLink>
        <NuxtLink to="/support">
          Support
        </NuxtLink>
        <HMenu as="div" class="relative inline-block">
          <HMenuButton class="flex gap-2 items-center text-button">
            <span>Features</span>
            <IconDropdown />
          </HMenuButton>
          <HMenuItems class="flex flex-col absolute menu">
            <HMenuItem class="menu-item">
              <NuxtLink to="temporary-voice-channels">
                Temporary Voice Channels
              </NuxtLink>
            </HMenuItem>
            <CoreMenuDivider />
            <HMenuItem class="menu-item">
              <NuxtLink to="voice-roles">
                Voice roles
              </NuxtLink>
            </HMenuItem>
          </HMenuItems>
        </HMenu>
      </div>

      <!-- spacer -->
      <div
        class="flex flex-grow"
      />

      <!-- auth indicator -->
      <div class="flex items-center">
        <!-- desktop -->
        <div class="hidden lg:flex">
          <HMenu v-if="authStore.data" as="div" class="relative inline-block">
            <HMenuButton class="flex gap-2 items-center text-button">
              <button
                class="flex items-center gap-2 text-button-primary"
              >
                <NuxtImg
                  :src="`https://cdn.discordapp.com/avatars/${authStore.data.user.id}/${authStore.data.user.avatar}.png`"
                  class="rounded-full size-8"
                />
                <span>{{ authStore.data.user.username }}</span>
                <IconDropdown />
              </button>
            </HMenuButton>
            <HMenuItems class="flex flex-col absolute menu right-0">
              <HMenuItem class="menu-item">
                <NuxtLink to="guilds">
                  Servers
                </NuxtLink>
              </HMenuItem>
              <CoreMenuDivider />
              <HMenuItem class="menu-item">
                <NuxtLink to="profile">
                  Profile
                </NuxtLink>
              </HMenuItem>
              <CoreMenuDivider />
              <HMenuItem class="menu-item">
                <NuxtLink to="profile">
                  Billing
                </NuxtLink>
              </HMenuItem>
              <CoreMenuDivider />
              <HMenuItem class="menu-item danger">
                <div @click="logout()">
                  Logout
                </div>
              </HMenuItem>
            </HMenuItems>
          </HMenu>
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
          <HMenu v-slot="{ open }" as="div" class="relative inline-block">
            <HMenuButton class="flex gap-2 items-center text-button">
              <Icon
                :name="
                  open
                    ? 'fluent:dismiss-20-filled'
                    : 'fluent:line-horizontal-3-20-filled'
                "
                class="z-10 size-8 cursor-pointer select-none "
                @click="toggleMobileNavbarOpenState"
              />
            </HMenuButton>
            <HMenuItems class="flex flex-col absolute menu right-0 min-w-48 shadow-lg">
              <!-- authenticated items -->
              <HMenuItem v-if="authStore.data" as="div" class="px-3 pt-2 my-1">
                <div
                  class="flex items-center gap-2"
                >
                  <NuxtImg
                    :src="`https://cdn.discordapp.com/avatars/${authStore.data.user.id}/${authStore.data.user.avatar}.png`"
                    class="rounded-full size-6"
                  />
                  <span class="text-sm text-grey-300">Logged in as {{ authStore.data.user.username }}</span>
                </div>
              </HMenuItem>
              <HMenuItem v-if="isLoggedIn" class="menu-item">
                <NuxtLink to="guilds">
                  Servers
                </NuxtLink>
              </HMenuItem>
              <HMenuItem v-if="isLoggedIn" class="menu-item">
                <NuxtLink to="profile">
                  Profile
                </NuxtLink>
              </HMenuItem>
              <HMenuItem v-if="isLoggedIn" class="menu-item">
                <NuxtLink to="profile">
                  Billing
                </NuxtLink>
              </HMenuItem>
              <CoreMenuDivider v-if="isLoggedIn" />
              <HMenuItem class="menu-item">
                <NuxtLink to="guilds">
                  Add to server
                </NuxtLink>
              </HMenuItem>
              <HMenuItem class="menu-item">
                <NuxtLink to="profile">
                  Support
                </NuxtLink>
              </HMenuItem>
              <HMenuItem class="menu-item">
                <NuxtLink to="profile">
                  Features
                </NuxtLink>
              </HMenuItem>
              <CoreMenuDivider />
              <HMenuItem v-if="isLoggedIn" class="menu-item danger">
                <div @click="logout()">
                  Logout
                </div>
              </HMenuItem>
              <HMenuItem v-else class="menu-item">
                <NuxtLink to="login">
                  Login
                </NuxtLink>
              </HMenuItem>
            </HMenuItems>
          </HMenu>
        </div>
      </div>
    </header>
  </div>
</template>
