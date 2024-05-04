<script setup lang="ts">
import { useLogin } from '~/composables/auth/useLogin'
import { useLogout } from '~/composables/auth/useLogout'

const authStore = useAuthStore()
</script>

<template>
  <div>
    <!-- desktop -->
    <div class="hidden lg:flex">
      <Menu v-if="authStore.data">
        <MenuButton class="flex">
          <ButtonText class="flex items-center gap-2">
            <NuxtImg
              v-if="authStore.data.user.avatar"
              :src="discordUserAvatarUri(authStore.data.user.id, authStore.data.user.avatar)"
              class="rounded-full size-8"
            />
            <span>{{ authStore.data.user.username }}</span>
            <IconDropdown />
          </ButtonText>
        </MenuButton>
        <MenuItems class="right-0 flex flex-col">
          <MenuItem :first="true">
            <NuxtLink to="/guilds">
              Servers
            </NuxtLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <NuxtLink to="/profile">
              Profile
            </NuxtLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <NuxtLink to="/profile">
              Billing
            </NuxtLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem :last="true" class="text-foreground-destructive">
            <div @click="useLogout()">
              Logout
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
      <Button v-else @click="useLogin()">
        Login
      </Button>
    </div>

    <!-- mobile -->
    <div class="flex items-center lg:hidden">
      <Menu v-slot="{ open }">
        <MenuButton class="flex items-center gap-2">
          <ButtonText>
            <Icon
              :name="
                open
                  ? 'fluent:dismiss-20-filled'
                  : 'fluent:line-horizontal-3-20-filled'
              "
              class="z-10 cursor-pointer select-none size-8"
            />
          </ButtonText>
        </MenuButton>
        <MenuItems class="right-0 flex flex-col shadow-lg min-w-56">
          <!-- authenticated items -->
          <MenuItem v-if="authStore.data" class="my-1 px-3 pt-2" :disabled="true">
            <div
              class="flex items-center gap-2"
            >
              <NuxtImg
                v-if="authStore.data.user.avatar"
                :src="discordUserAvatarUri(authStore.data.user.id, authStore.data.user.avatar)"
                class="rounded-full size-6"
              />
              <span class="text-sm text-foreground-secondary">Logged in as {{ authStore.data.user.username }}</span>
            </div>
          </MenuItem>
          <MenuItem v-if="authStore.isAuthenticated">
            <NuxtLink to="/guilds">
              Servers
            </NuxtLink>
          </MenuItem>
          <MenuItem v-if="authStore.isAuthenticated">
            <NuxtLink to="/profile">
              Profile
            </NuxtLink>
          </MenuItem>
          <MenuItem v-if="authStore.isAuthenticated">
            <NuxtLink to="/profile">
              Billing
            </NuxtLink>
          </MenuItem>
          <MenuItem v-if="!authStore.isAuthenticated" :first="true" @click="useLogin()">
            <button class="text-start text-foreground-link-standout">
              Login
            </button>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <NuxtLink to="/guilds">
              Add to server
            </NuxtLink>
          </MenuItem>
          <MenuItem>
            <NuxtLink to="/profile">
              Support
            </NuxtLink>
          </MenuItem>
          <MenuItem>
            <NuxtLink to="/ultimate">
              Ultimate
            </NuxtLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem as="div" class="px-3 pt-2" :disabled="true">
            <span class="text-sm text-foreground-secondary">Features</span>
          </MenuItem>
          <MenuItem>
            <NuxtLink to="/temporary-voice-channels">
              Temporary voice channels
            </NuxtLink>
          </MenuItem>
          <MenuItem :last="!authStore.isAuthenticated">
            <NuxtLink to="/voice-roles">
              Voice roles
            </NuxtLink>
          </MenuItem>
          <MenuDivider v-if="authStore.isAuthenticated" />
          <MenuItem v-if="authStore.isAuthenticated" class="text-foreground-destructive" :last="true">
            <div @click="useLogout()">
              Logout
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  </div>
</template>
