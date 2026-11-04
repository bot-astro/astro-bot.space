<script setup lang="ts">
import discordGuildIconUri from '~/utils/discordGuildIconUri'
import { useGuilds } from '~/data/astro/query/useGuilds'
import IconQuestion from '~/components/icon/IconQuestion.vue'

definePageMeta({
  middleware: 'auth',
})

useHead({
  title: 'Dashboard - Astro - Temporary Voice Channels for your Discord!',
  meta: [
    {
      name: 'description',
      content:
        'Configure all Astro settings with the powerful and intuitive dashboard',
    },
    {
      property: 'og:title',
      content: 'Dashboard - Astro - Temporary Voice Channels for your Discord!',
    },
    {
      property: 'og:description',
      content:
        'Configure all Astro settings with the powerful and intuitive dashboard',
    },
    { property: 'og:url', content: 'https://astro-bot.space/guilds' },
  ],
})

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
            <span> Required permissions </span>
          </DialogTitle>
          <DialogDescription>
            In order to manage Astro's settings for a server, you need to have
            either <Badge variant="discord">Manage channels</Badge>,
            <Badge variant="discord">Manage server</Badge> or
            <Badge variant="discord">Administrator</Badge> permissions.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

    <div
      class="group-setting flex w-full flex-col items-center justify-between gap-2 md:flex-row md:gap-0"
    >
      <div class="flex w-full flex-col text-center md:text-start">
        <span class="text-xl font-semibold">Servers</span>
        <span class="text-secondary text-sm">Select a server to manage</span>
      </div>

      <div class="flex items-center gap-2">
        <DashboardInfoButton
          title="Required permissions"
          guide-button-uri="/guides/basic"
        >
          <span>
            In order to manage Astro's settings for a server, you need to have
            either <Badge variant="discord">Manage channels</Badge>,
            <Badge variant="discord">Manage server</Badge> or
            <Badge variant="discord">Administrator</Badge> permissions.
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
          placeholder="Search by name"
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
      Something went wrong, please try again later
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
            Manage
          </Button>
        </div>
      </div>

      <!-- empty guilds -->
      <div
        v-if="guilds.length === 0"
        class="mt-32 flex flex-col items-center gap-2"
      >
        <span class="text-center"
          >You cannot manage the settings of any server you are in!</span
        >
        <ButtonText
          class="gap-2"
          @click="() => (permission_dialog_open = true)"
        >
          <IconQuestion class="size-6" />
          See required permissions
        </ButtonText>
      </div>
    </div>
  </div>
</template>
