<template>
  <div class="flex flex-col p-8">
    <!-- intro -->
    <div class="flex items-center gap-4">
      <Icon name="lucide:server" class="size-10" />
      <div class="flex flex-col">
        <span v-if="currentGuild" class="text-title-no-font font-bold">{{ currentGuild.name }}</span>
        <Skeleton v-else class="h-10 w-72" />

        <span>Manage your server's most important settings</span>
      </div>
    </div>

    <!-- interactive content -->
    <div class="flex flex-col gap-6 mt-12">
      <div class="flex flex-col gap-1">
        <span class="text-group-name">SETTINGS</span>
        <div class="flex flex-col gap-2">
          <GroupSetting heading="Require Admin permission">
            <template #description>
              <span>Disabling this will make Astro ignore permission issues. <span class="text-destructive">It's
                  recommended to keep this on!</span></span>
            </template>

            <Switch v-model:enabled="requireAdminPerm" />
          </GroupSetting>
          <GroupSetting heading="Slash command permissions"
            description="You can restrict access to Astro slash commands using Discord permissions directly!">
            <Button to="https://support.discord.com/hc/en-us/articles/4644915651095-Command-Permissions" external>
              Manage on Discord
            </Button>
          </GroupSetting>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-group-name">ULTIMATE</span>
        <div class="flex flex-col gap-2">
          <GroupSetting
            heading="Ultimate server"
            :description="`Your server is currently ${currentSettingsMutable?.upgraded_by_user_id ? 'upgraded' : 'not upgraded'} to ultimate`"
          >
            <Button>
              Upgrade
            </Button>
          </GroupSetting>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-group-name">DANGEROUS</span>
        <div class="flex flex-col gap-2">
          <GroupSetting heading="Reset temporary voice channels cache"
            description="If you are encountering weird issues with temporary voice channels, expecially when the incremental names for the channels start with a wrong number or skip some, hit this button, otherwise try to avoid this!">
            <ButtonDestructive>Clear cache</ButtonDestructive>
          </GroupSetting>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 1,
    name: 'Overview',
    icon: 'i-lucide-home',
    description: 'Overview Description',
  } as DashboardSection
})

const dashboard = useDashboardStore()

const { currentGuild, currentSettingsMutable } = storeToRefs(dashboard)

const requireAdminPerm = computed({
  get() {
    return !(currentSettingsMutable.value?.allow_missing_admin_perm || false)
  },
  set(newValue) {
    currentSettingsMutable.value!.allow_missing_admin_perm = !newValue
  },
})
</script>
