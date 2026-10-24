<script setup lang="ts">
import { useToast } from '~/components/ui/toast'
import { useUser } from '~/data/astro/query/useUser'

const { $astroApiClient } = useNuxtApp()
const { invite } = useInvite()
const { toast } = useToast()
const { data: user } = useUser()
const auth = useAuth()
const route = useRoute()
const is_logged_in = computed(() => !!user.value)

const is_mobile_dropdown_open = ref(false)

const on_billing_clicked = async () => {
  try {
    const url = await $astroApiClient.get_chargebee_portal_session_url()
    navigateTo(url, { external: true, open: { target: '_blank' } })
  } catch (e) {
    console.log(e)

    toast({
      description:
        'Something went wrong when opening the billing portal, try again later',
      variant: 'destructive',
    })
  }
}
</script>

<template>
  <div>
    <!-- desktop -->
    <div class="hidden lg:flex">
      <DropdownMenu v-if="user">
        <DropdownMenuTrigger class="flex items-center gap-2">
          <NuxtImg
            v-if="user.avatar"
            :src="discordUserAvatarUri(user.id, user.avatar)"
            class="size-8 rounded-full"
          />
          <span>{{ user.username }}</span>
          <IconDropdown />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem @click="navigateTo('/guilds')">
            Servers
          </DropdownMenuItem>
          <DropdownMenuItem @click="on_billing_clicked">
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem
            class="text-foreground-destructive"
            @click="auth.logout()"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button v-else @click="auth.login(route.fullPath)"> Login </Button>
    </div>

    <!--  Mobile navbar  -->
    <div class="flex items-center lg:hidden">
      <DropdownMenu v-model:open="is_mobile_dropdown_open">
        <DropdownMenuTrigger>
          <ButtonText>
            <Icon
              :name="
                is_mobile_dropdown_open
                  ? 'fluent:dismiss-20-filled'
                  : 'fluent:line-horizontal-3-20-filled'
              "
              class="pointer-events-auto z-10 size-8 cursor-pointer select-none"
            />
          </ButtonText>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem v-if="user" class="my-1 px-3 pt-2" disabled>
            <div class="flex items-center gap-2">
              <NuxtImg
                v-if="user.avatar"
                :src="discordUserAvatarUri(user.id, user.avatar)"
                class="size-6 rounded-full"
              />
              <span class="text-sm text-foreground-secondary"
                >Logged in as {{ user.username }}</span
              >
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem v-if="is_logged_in" @click="navigateTo('/guilds')">
            Servers
          </DropdownMenuItem>
          <DropdownMenuItem v-if="is_logged_in" @click="on_billing_clicked">
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem
            v-if="!is_logged_in"
            class="text-foreground-link-standout"
            @click="auth.login(route.fullPath)"
          >
            Login
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem @click="invite"> Add to server </DropdownMenuItem>
          <DropdownMenuItem @click="navigateTo('/guides')">
            Guides
          </DropdownMenuItem>
          <DropdownMenuItem @click="navigateTo('/ultimate')">
            Ultimate
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="
              navigateTo('https://github.com/bot-astro/astro', {
                external: true,
                open: { target: '_blank' },
              })
            "
          >
            GitHub
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            v-if="is_logged_in"
            class="text-foreground-destructive"
            @click="auth.logout()"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
