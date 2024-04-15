<script setup lang="ts">
import { useLogin } from '~/composables/auth/useLogin'
import { useLogout } from '~/composables/auth/useLogout'

const authStore = useAuthStore()
</script>

<template>
  <div>
    <!-- desktop -->
    <div class="hidden lg:flex">
      <HMenu v-if="authStore.data" as="div" class="relative inline-block">
        <HMenuButton class="flex">
          <button
            class="flex items-center gap-2 button-text-primary"
          >
            <NuxtImg
              v-if="authStore.data.user.avatar"
              :src="discordUserAvatarUri(authStore.data.user.id, authStore.data.user.avatar)"
              class="rounded-full size-8"
            />
            <span>{{ authStore.data.user.username }}</span>
            <IconDropdown />
          </button>
        </HMenuButton>
        <HMenuItems class="absolute right-0 flex w-full flex-col menu">
          <HMenuItem class="menu-item menu-item-first">
            <NuxtLink to="/guilds">
              Servers
            </NuxtLink>
          </HMenuItem>
          <DefaultMenuDivider />
          <HMenuItem class="menu-item">
            <NuxtLink to="/profile">
              Profile
            </NuxtLink>
          </HMenuItem>
          <DefaultMenuDivider />
          <HMenuItem class="menu-item">
            <NuxtLink to="/profile">
              Billing
            </NuxtLink>
          </HMenuItem>
          <DefaultMenuDivider />
          <HMenuItem class="menu-item danger menu-item-last">
            <div @click="useLogout()">
              Logout
            </div>
          </HMenuItem>
        </HMenuItems>
      </HMenu>
      <div v-else>
        <button
          class="button menu-item-last"
          @click="useLogin()"
        >
          Login
        </button>
      </div>
    </div>

    <!-- mobile -->
    <div class="flex items-center lg:hidden">
      <HMenu v-slot="{ open }" as="div" class="relative inline-block">
        <HMenuButton class="flex items-center gap-2 button-text">
          <Icon
            :name="
              open
                ? 'fluent:dismiss-20-filled'
                : 'fluent:line-horizontal-3-20-filled'
            "
            class="z-10 cursor-pointer select-none size-8"
          />
        </HMenuButton>
        <HMenuItems class="absolute right-0 flex flex-col shadow-lg menu min-w-56">
          <!-- authenticated items -->
          <HMenuItem v-if="authStore.data" as="div" class="my-1 px-3 pt-2">
            <div
              class="flex items-center gap-2"
            >
              <NuxtImg
                v-if="authStore.data.user.avatar"
                :src="discordUserAvatarUri(authStore.data.user.id, authStore.data.user.avatar)"
                class="rounded-full size-6"
              />
              <span class="text-sm text-secondary">Logged in as {{ authStore.data.user.username }}</span>
            </div>
          </HMenuItem>
          <HMenuItem v-if="authStore.isAuthenticated" class="menu-item">
            <NuxtLink to="/guilds">
              Servers
            </NuxtLink>
          </HMenuItem>
          <HMenuItem v-if="authStore.isAuthenticated" class="menu-item">
            <NuxtLink to="/profile">
              Profile
            </NuxtLink>
          </HMenuItem>
          <HMenuItem v-if="authStore.isAuthenticated" class="menu-item">
            <NuxtLink to="/profile">
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
            <NuxtLink to="/guilds">
              Add to server
            </NuxtLink>
          </HMenuItem>
          <HMenuItem class="menu-item">
            <NuxtLink to="/profile">
              Support
            </NuxtLink>
          </HMenuItem>
          <HMenuItem class="menu-item">
            <NuxtLink to="/premium">
              Premium
            </NuxtLink>
          </HMenuItem>
          <DefaultMenuDivider />
          <HMenuItem as="div" class="px-3 pt-2">
            <span class="text-sm text-secondary">Features</span>
          </HMenuItem>
          <HMenuItem class="menu-item">
            <NuxtLink to="/temporary-voice-channels">
              Temporary voice channels
            </NuxtLink>
          </HMenuItem>
          <HMenuItem class="menu-item" :class="!authStore.isAuthenticated ? 'menu-item-last' : ''">
            <NuxtLink to="/voice-roles">
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
</template>
