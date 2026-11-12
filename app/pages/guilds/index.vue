<script setup lang="ts">
import discordGuildIconUri from '~/utils/discordGuildIconUri'
import { useGuilds } from '~/data/astro/query/useGuilds'
import IconQuestion from '~/components/icon/IconQuestion.vue'

definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.dashboard.title') }),
  meta: [
    { name: 'description', content: t('meta.dashboard.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: t('meta.dashboard.title') }),
    },
    { property: 'og:description', content: t('meta.dashboard.description') },
    { property: 'og:url', content: 'https://astro-bot.space/guilds' },
  ],
}))

const search = ref('')
const permission_dialog_open = ref(false)

const { data, error, isPending: is_pending, refetch } = useGuilds()

const guilds = computed(() => {
  return (data.value || [])
    .filter((guild) => guild.can_manage)
    .filter((guild) =>
      search.value.length > 0
        ? guild.name?.toLowerCase().includes(search.value.toLowerCase())
        : true,
    )
})
</script>

<template>
  <div class="container mt-4 flex flex-col items-center px-4">
    <!--  permissions required dialog  -->
    <Dialog v-model:open="permission_dialog_open">
      <DialogContent>
        <DialogHeader>
          <DialogTitle class="vertical-center gap-2">
            <IconQuestion class="size-6" />
            <span> {{ $t('guilds.required_permissions') }} </span>
          </DialogTitle>
          <DialogDescription>
            <i18n-t
              keypath="guilds.required_permissions_description"
              tag="span"
            >
              <template #manage_channels>
                <Badge variant="discord">{{
                  $t('guilds.permissions.manage_channels')
                }}</Badge>
              </template>
              <template #manage_server>
                <Badge variant="discord">{{
                  $t('guilds.permissions.manage_server')
                }}</Badge>
              </template>
              <template #administrator>
                <Badge variant="discord">{{
                  $t('guilds.permissions.administrator')
                }}</Badge>
              </template>
            </i18n-t>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

    <div
      class="group-setting flex w-full flex-col items-center justify-between gap-2 md:flex-row md:gap-0"
    >
      <div class="flex w-full flex-col text-center md:text-start">
        <span class="text-xl font-semibold">{{ $t('guilds.title') }}</span>
        <span class="text-secondary text-sm">{{ $t('guilds.subtitle') }}</span>
      </div>

      <div class="flex items-center gap-2">
        <DashboardInfoButton
          :title="$t('guilds.required_permissions')"
          guide-button-uri="/guides/basic"
        >
          <span>
            <i18n-t
              keypath="guilds.required_permissions_description"
              tag="span"
            >
              <template #manage_channels>
                <Badge variant="discord">{{
                  $t('guilds.permissions.manage_channels')
                }}</Badge>
              </template>
              <template #manage_server>
                <Badge variant="discord">{{
                  $t('guilds.permissions.manage_server')
                }}</Badge>
              </template>
              <template #administrator>
                <Badge variant="discord">{{
                  $t('guilds.permissions.administrator')
                }}</Badge>
              </template>
            </i18n-t>
          </span>
        </DashboardInfoButton>

        <ButtonText destructive>
          <Icon
            name="fluent:arrow-sync-12-regular"
            class="size-6"
            @click="refetch"
          />
        </ButtonText>

        <input
          v-model="search"
          class="w-full md:w-auto"
          type="text"
          :placeholder="$t('guilds.search_placeholder')"
        />
      </div>
    </div>

    <div v-if="is_pending" class="mt-4 flex w-full justify-center">
      <IconLoading />
    </div>
    <div
      v-else-if="error"
      class="bordered-destructive text-destructive mt-4 flex w-full justify-center rounded-md p-4"
    >
      {{ $t('common.error_generic') }}
    </div>
    <div v-else>
      <div
        class="mt-4 grid w-full grid-flow-row-dense grid-cols-1 gap-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      >
        <div
          v-for="guild in guilds"
          :key="guild.id"
          class="group-setting flex flex-col gap-4 select-none"
        >
          <div class="flex items-center gap-4">
            <div class="relative">
              <NuxtImg
                v-if="guild.id && guild.icon"
                :src="discordGuildIconUri(guild.id, guild.icon)"
                class="size-12 max-w-none rounded-full bordered md:size-14"
              />
              <p
                v-else
                class="flex size-14 items-center justify-center truncate rounded-full bordered font-semibold text-white hover:opacity-80"
              >
                {{
                  guild.name
                    ?.split(' ')
                    .map((a) => a.charAt(0).toUpperCase())
                    .join('')
                }}
              </p>
            </div>

            <span>{{ guild.name }}</span>
          </div>
          <Button
            class="flex w-full items-center justify-center"
            :to="`/guilds/${guild.id}`"
          >
            {{ $t('guilds.manage') }}
          </Button>
        </div>
      </div>

      <!-- empty guilds -->
      <div
        v-if="guilds.length === 0"
        class="mt-32 flex flex-col items-center gap-2"
      >
        <span class="text-center">{{ $t('guilds.none_manageable') }}</span>
        <ButtonText
          class="gap-2"
          @click="() => (permission_dialog_open = true)"
        >
          <IconQuestion class="size-6" />
          {{ $t('guilds.see_required_permissions') }}
        </ButtonText>
      </div>
    </div>
  </div>
</template>
