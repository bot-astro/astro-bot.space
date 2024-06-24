<script setup lang="ts">
const session = useUserSession()
const user = session.user
const loggedIn = session.loggedIn
</script>

<template>
  <div>
    <!-- desktop -->
    <div class="hidden lg:flex">
      <Menu v-if="user">
        <MenuButton class="flex">
          <ButtonText class="flex items-center gap-2">
            <NuxtImg
              v-if="user.avatar"
              :src="discordUserAvatarUri(user.id, user.avatar)"
              class="rounded-full size-8"
            />
            <span>{{ user.username }}</span>
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
            <div @click="useAuth().logout()">
              Logout
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
      <Button v-else @click="useAuth().login(useRoute().fullPath)">
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
        <MenuItems class="right-0 flex flex-col shadow-lg min-w-56 z-20">
          <!-- authenticated items -->
          <MenuItem v-if="user" class="my-1 px-3 pt-2" :disabled="true">
            <div
              class="flex items-center gap-2"
            >
              <NuxtImg
                v-if="user.avatar"
                :src="discordUserAvatarUri(user.id, user.avatar)"
                class="rounded-full size-6"
              />
              <span class="text-sm text-foreground-secondary">Logged in as {{ user.username }}</span>
            </div>
          </MenuItem>
          <MenuItem v-if="loggedIn">
            <NuxtLink to="/guilds">
              Servers
            </NuxtLink>
          </MenuItem>
          <MenuItem v-if="loggedIn">
            <NuxtLink to="/profile">
              Profile
            </NuxtLink>
          </MenuItem>
          <MenuItem v-if="loggedIn">
            <NuxtLink to="/profile">
              Billing
            </NuxtLink>
          </MenuItem>
          <MenuItem v-if="!loggedIn" :first="true" @click="useAuth().login()">
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
          <MenuItem :last="!loggedIn">
            <NuxtLink to="/voice-roles">
              Voice roles
            </NuxtLink>
          </MenuItem>
          <MenuDivider v-if="loggedIn" />
          <MenuItem v-if="loggedIn" class="text-foreground-destructive" :last="true">
            <div @click="useAuth().logout()">
              Logout
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  </div>
</template>
