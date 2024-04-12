<script lang="ts" setup>
/*
SCROLLING ANIMATION
*/
import { useWindowScroll } from '@vueuse/core'
import { useLogin } from '~/composables/auth/useLogin'
import { useLogout } from '~/composables/auth/useLogout'

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
      <div class="hidden w-full items-center gap-8 whitespace-nowrap lg:flex">
        <NuxtLink to="/invite">
          Add to server
        </NuxtLink>
        <NuxtLink to="/support">
          Support
        </NuxtLink>
        <HMenu as="div" class="relative inline-block">
          <HMenuButton class="button-text flex items-center gap-2">
            <span>Features</span>
            <IconDropdown />
          </HMenuButton>
          <HMenuItems class="menu absolute flex flex-col">
            <HMenuItem class="menu-item">
              <NuxtLink to="temporary-voice-channels">
                Temporary Voice Channels
              </NuxtLink>
            </HMenuItem>
            <DefaultMenuDivider />
            <HMenuItem class="menu-item">
              <NuxtLink to="voice-roles">
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
        <!-- desktop -->
        <div class="hidden lg:flex">
          <HMenu v-if="authStore.data" as="div" class="relative inline-block">
            <HMenuButton class="flex">
              <button
                class="button-text-primary flex items-center gap-2"
              >
                <NuxtImg
                  v-if="authStore.data.user.avatar"
                  :src="discordUserAvatarUri(authStore.data.user.id, authStore.data.user.avatar)"
                  class="size-8 rounded-full"
                />
                <span>{{ authStore.data.user.username }}</span>
                <IconDropdown />
              </button>
            </HMenuButton>
            <HMenuItems class="menu absolute right-0 flex w-full flex-col">
              <HMenuItem class="menu-item">
                <NuxtLink to="guilds">
                  Servers
                </NuxtLink>
              </HMenuItem>
              <DefaultMenuDivider />
              <HMenuItem class="menu-item">
                <NuxtLink to="profile">
                  Profile
                </NuxtLink>
              </HMenuItem>
              <DefaultMenuDivider />
              <HMenuItem class="menu-item">
                <NuxtLink to="profile">
                  Billing
                </NuxtLink>
              </HMenuItem>
              <DefaultMenuDivider />
              <HMenuItem class="menu-item danger">
                <div @click="useLogout()">
                  Logout
                </div>
              </HMenuItem>
            </HMenuItems>
          </HMenu>
          <div v-else>
            <button
              class="button"
              @click="useLogin()"
            >
              Login
            </button>
          </div>
        </div>

        <!-- mobile -->
        <div class="flex items-center lg:hidden">
          <HMenu v-slot="{ open }" as="div" class="relative inline-block">
            <HMenuButton class="button-text flex items-center gap-2">
              <Icon
                :name="
                  open
                    ? 'fluent:dismiss-20-filled'
                    : 'fluent:line-horizontal-3-20-filled'
                "
                class="size-8 z-10 cursor-pointer select-none"
                @click="toggleMobileNavbarOpenState"
              />
            </HMenuButton>
            <HMenuItems class="menu min-w-56 absolute right-0 flex flex-col shadow-lg">
              <!-- authenticated items -->
              <HMenuItem v-if="authStore.data" as="div" class="my-1 px-3 pt-2">
                <div
                  class="flex items-center gap-2"
                >
                  <NuxtImg
                    v-if="authStore.data.user.avatar"
                    :src="discordUserAvatarUri(authStore.data.user.id, authStore.data.user.avatar)"
                    class="size-6 rounded-full"
                  />
                  <span class="text-secondary text-sm">Logged in as {{ authStore.data.user.username }}</span>
                </div>
              </HMenuItem>
              <HMenuItem v-if="authStore.isAuthenticated" class="menu-item">
                <NuxtLink to="guilds">
                  Servers
                </NuxtLink>
              </HMenuItem>
              <HMenuItem v-if="authStore.isAuthenticated" class="menu-item">
                <NuxtLink to="profile">
                  Profile
                </NuxtLink>
              </HMenuItem>
              <HMenuItem v-if="authStore.isAuthenticated" class="menu-item">
                <NuxtLink to="profile">
                  Billing
                </NuxtLink>
              </HMenuItem>
              <HMenuItem v-if="!authStore.isAuthenticated" class="menu-item menu-item-first">
                <button class="text-start text-purple-500 hover:text-purple-400" @click="useLogin()">
                  Login
                </button>
              </HMenuItem>
              <DefaultMenuDivider />
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
                <NuxtLink to="premium">
                  Premium
                </NuxtLink>
              </HMenuItem>
              <DefaultMenuDivider />
              <HMenuItem as="div" class="px-3 pt-2">
                <span class="text-secondary text-sm">Features</span>
              </HMenuItem>
              <HMenuItem class="menu-item">
                <NuxtLink to="temporary-voice-channels">
                  Temporary voice channels
                </NuxtLink>
              </HMenuItem>
              <HMenuItem class="menu-item" :class="!authStore.isAuthenticated ? 'menu-item-last' : ''">
                <NuxtLink to="voice-roles">
                  Voice roles
                </NuxtLink>
              </HMenuItem>
              <DefaultMenuDivider v-if="authStore.isAuthenticated" />
              <HMenuItem v-if="authStore.isAuthenticated" class="menu-item danger menu-item-last">
                <div @click="useLogout()">
                  Logout
                </div>
              </HMenuItem>
            </HMenuItems>
          </HMenu>
        </div>
      </div>
    </header>
  </div>
</template>
