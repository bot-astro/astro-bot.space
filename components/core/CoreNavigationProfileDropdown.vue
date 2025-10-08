<script setup lang="ts">
import useUserSession from "~/composables/useUserSession";
import {useToast} from "~/components/ui/toast";

const { $astroApiClient } = useNuxtApp()
const { toast } = useToast()
const session = useUserSession().data
const user = computed(() => session.value?.user)
const is_logged_in = computed(() => session.value?.user !== undefined)

let is_mobile_dropdown_open = ref(false)

const on_billing_clicked = async () => {
  try {
    const url = await $astroApiClient.get_chargebee_portal_session_url()
    navigateTo(url, { external: true, open: { target: '_blank' } })
  } catch (e) {
    console.log(e)

    toast({
      description: 'Something went wrong when opening the billing portal, try again later',
      variant: 'destructive'
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
            class="rounded-full size-8"
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
            @click="useAuth().logout()"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button v-else @click="useAuth().login(useRoute().fullPath)">
        Login
      </Button>
    </div>

    <!--  Mobile navbar  -->
    <div class="flex items-center lg:hidden">
        <DropdownMenu v-model:open="is_mobile_dropdown_open">
          <DropdownMenuTrigger>
            <ButtonText>
              <Icon
                :name="is_mobile_dropdown_open ? 'fluent:dismiss-20-filled' : 'fluent:line-horizontal-3-20-filled'"
                class="z-10 cursor-pointer select-none size-8 pointer-events-auto"
              />
            </ButtonText>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem v-if="user" class="my-1 px-3 pt-2" disabled>
              <div class="flex items-center gap-2">
                <NuxtImg
                  v-if="user.avatar"
                  :src="discordUserAvatarUri(user.id, user.avatar)"
                  class="rounded-full size-6"
                />
                <span class="text-sm text-foreground-secondary">Logged in as {{ user.username }}</span>
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
              @click="useAuth().login(useRoute().fullPath)"
              class="text-foreground-link-standout"
            >
              Login
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem @click="useInvite().invite()">
              Add to server
            </DropdownMenuItem>
            <DropdownMenuItem @click="navigateTo('/guides')">
              Guides
            </DropdownMenuItem>
            <DropdownMenuItem @click="navigateTo('/ultimate')">
              Ultimate
            </DropdownMenuItem>
						<DropdownMenuItem @click="navigateTo('https://github.com/bot-astro/astro', { external: true, open: { target: '_blank' } })">
							GitHub
						</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              v-if="is_logged_in"
              class="text-foreground-destructive"
              @click="useAuth().logout()"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  </div>
</template>
