<template>
  <div class="flex flex-col p-8">
    <div v-if="status === 'success'" class="">
      <div v-if="errors && errors.length" class="flex flex-col gap-8">

        <!-- intro -->
        <div class="flex items-center gap-4">
          <Icon name="lucide:server" class="size-10" />
          <div class="flex flex-col">
            <span class="text-title-no-font font-bold">Errors</span>
            <span>Manage your server's errors</span>
          </div>
          <div class="flex-grow" />
          <Button @click="dashboard.clearErrors()">
            Clear
          </Button>
        </div>

        <!-- errors -->
        <div v-for="error in errors" class="flex items-center gap-4 p-4 group">
          <Icon name="i-fluent-error-circle-20-regular" size="1.5rem" class="flex-shrink-0" />
          <div class="flex flex-col overflow-hidden">
            <p class="text-ellipsis overflow-hidden text-nowrap">
              {{ error.description }}
            </p>
            <p class="text-sm opacity-50">
              {{ error.instant }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Button @click="openModal(error)">
              View
            </Button>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col items-center p-8 gap-2">
        <p class="text-2xl font-bold">
          No errors encountered so far!
        </p>
        <p class="text-lg opacity-75">
          If anything bad occurs it will show up here ;)
        </p>
      </div>
    </div>
    <div v-else-if="status === 'error'">
      Something went wrong, please try again later
    </div>
    <div v-else>
      loading...
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { components } from '#nuxt-api-party/api'

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

const dashboard = useDashboardStore()
const modal = useModalStore()

const { data: errors, status } = useAsyncData('errors', () => dashboard.currentErrors)

function openModal(error: components['schemas']['GuildError']) {
  modal.push({
    component: resolveComponent('ModalError'),
    data: error
  })
}
</script>
