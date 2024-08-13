<template>
  <div class="flex flex-col gap-8">
<!--     intro-->
    <div class="flex items-center gap-4">
      <Icon :name="IconNames.ERROR" class="size-10" />
      <div class="flex flex-col">
        <span class="dashboard-section-title">Errors</span>
        <span class="dashboard-section-description">View and clear your server's errors</span>
      </div>
      <div class="flex-grow" />
      <ButtonDestructive @click="clear_errors({ guild_id: guild_id! })">
        Clear
      </ButtonDestructive>
    </div>

    <div v-if="errors">
      <div v-if="errors.length > 0" class="flex flex-col group p-0">
        <!-- errors -->
        <div v-for="(error, i) in errors" class="flex flex-col">
          <div class="flex items-center gap-4 px-4 py-6">
            <Icon name="i-fluent-error-circle-20-regular" size="1.5rem" class="flex-shrink-0" />
            <div class="flex flex-col">
              <span class="text-ellipsis overflow-hidden">
                {{ error.description }}
              </span>
              <p v-if="error.timestamp" class="text-sm opacity-50">
                {{ new Date(error.timestamp).toDateString() }} at {{ new Date(error.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
              </p>
            </div>
            <div class="flex-grow"></div>
            <Dialog>
              <DialogTrigger class="flex-shrink-0">
                <Button>
                  View
                </Button>
              </DialogTrigger>

              <DialogContent>
                <div class="flex flex-col text-sm">
                  <p class="text-lg font-bold">
                    Error Details
                  </p>
                  <p class="mt-2">
                    {{ error.description }}
                  </p>
                  <p class="text-sm opacity-50 mt-1">
                    {{ new Date(error.timestamp).toDateString() }} at {{ new Date(error.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                  </p>
                  <div class="w-full flex items-center justify-end gap-2 mt-2">
                    <ButtonSecondary
                      @click="navigateToGuide(error.guide ?? GSErrorGuide.TEMPLATE)"
                    >
                      See guide
                    </ButtonSecondary>

                    <ButtonUltimate @click="navigateTo(`/guilds/${guild_id}/`)">
                      Upgrade server
                    </ButtonUltimate>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <hr class="w-full bordered" v-if="i !== (errors.length - 1)">
        </div>
      </div>
      <div v-else class="flex flex-col items-center p-8 gap-2 text-center">
        <p class="text-2xl font-bold">
          No errors encountered so far!
        </p>
        <p class="text-lg opacity-75">
          If anything bad occurs it will show up here ;)
        </p>
      </div>
    </div>
    <div v-else-if="errors_error" class="center text-foreground-destructive">
      Something went wrong, please try again later
    </div>
    <div v-else class="center">
      <IconLoading />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useGuildErrors} from "~/data/astro/query/useGuildErrors";
import {useClearGuildErrorsMutation} from "~/data/astro/mutations/useClearGuildErrors";
import type { DashboardSection } from "~/types/dashboard";
import {GSErrorGuide} from "~/types/guild-settings/error";
import {IconNames} from "assets/config/IconNames";

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 2,
    name: 'Errors',
    icon: 'i-lucide-message-square-warning',
    description: 'Errors Description',
  } as DashboardSection
})

const guild_id = useGuildId()
const { data: errors, isPending: errors_pending, isError: errors_error } = useGuildErrors(guild_id);
const { mutate: clear_errors, isPending: clear_pending } = useClearGuildErrorsMutation()

function navigateToGuide(guide: GSErrorGuide) {
  let guide_uri = "/guides"

  switch (guide) {
    case GSErrorGuide.BASIC:
      guide_uri += "/basic"
      break;
    case GSErrorGuide.GENERATOR:
      guide_uri += "/generator"
      break;
    case GSErrorGuide.TEMPLATE:
      guide_uri += "/template"
      break;
    case GSErrorGuide.INTERFACE:
      guide_uri += "/interface"
      break;
    case GSErrorGuide.VOICE_ROLE:
      guide_uri += "/voice-role"
      break;
  }

  navigateTo(guide_uri, { open: { target: "_blank" } })
}
</script>