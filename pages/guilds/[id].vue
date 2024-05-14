<script lang="ts" setup>
import DashboardOverviewPage from '~/components/dashboard/sections/DashboardOverviewPage.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})
const route = useRoute()
const guildId = route.params.id as string
const guildsStore = useGuildsStore()

guildsStore.fetchIfOutdated()
guildsStore.select(guildId)

const dashboardSectionStore = useDashboardSectionStore()
</script>

<template>
  <div class="min-h-full w-full">
    <DashboardOverviewPage v-if="dashboardSectionStore.selectedSection === DashboardSection.OVERVIEW" />
    <DashboardErrorPage v-if="dashboardSectionStore.selectedSection === DashboardSection.ERRORS" />
  </div>
</template>

<style>

</style>
