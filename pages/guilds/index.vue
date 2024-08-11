<script setup lang="ts">
import {useGuilds} from "~/data/astro/query/useGuilds";
import IconQuestion from "~/components/icon/IconQuestion.vue";

definePageMeta({
  middleware: 'auth',
})

const search = ref('')
const permission_dialog_open = ref(false)

const { data, error, isPending: is_pending, refetch } = useGuilds()

const guilds = computed(() => {
  return (data.value || [])
    .filter(guild => guild.can_manage)
    .filter(guild => search.value.length > 0 ? guild.name?.toLowerCase().includes(search.value.toLowerCase()) : true)
})
</script>

<template>
  <div class="container mt-4 flex flex-col items-center px-4">
<!--  permissions required dialog  -->
    <Dialog v-model:open="permission_dialog_open">
      <DialogContent>
        <DialogHeader>
          <DialogTitle class="vertical-center gap-2">
            <IconQuestion class="size-6"/>
            <span>
              Required permissions
            </span>
          </DialogTitle>
          <DialogDescription>
            In order to manage Astro's settings for a server, you need to have either <Badge variant="discord">Manage channels</Badge>, <Badge variant="discord">Manage server</Badge> or <Badge variant="discord">Administrator</Badge> permissions.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

    <div class="flex flex-col md:flex-row gap-2 md:gap-0 w-full justify-between items-center group">
      <div class="flex flex-col w-full text-center md:text-start">
        <span class="text-xl font-semibold">Servers</span>
        <span class="text-sm text-secondary">Select a server to manage</span>
      </div>

      <div class="flex items-center gap-2">
        <ButtonText @click="() => permission_dialog_open = true">
          <IconQuestion class="size-6" />
        </ButtonText>

        <ButtonText destructive>
          <Icon name="fluent:arrow-sync-12-regular" class="size-6" @click="refetch" />
        </ButtonText>

        <input v-model="search" class="w-full md:w-auto" type="text" placeholder="Search by name">
      </div>
    </div>

    <div v-if="is_pending" class="w-full mt-4 flex justify-center">
      <IconLoading />
    </div>
    <div v-else-if="error" class="w-full mt-4 flex justify-center bordered-destructive rounded-md p-4 text-destructive">
      Something went wrong, please try again later
    </div>
    <div v-else>
      <div
        class="mt-4 w-full grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-4">
        <div v-for="guild in guilds" :key="guild.id" class="flex select-none flex-col group gap-4">
          <div class="flex items-center gap-4">
            <div class="relative">
              <NuxtImg
                v-if="guild.id && guild.icon" :src="discordGuildIconUri(guild.id, guild.icon)"
                class="rounded-full max-w-none w-12 h-12 md:w-14 md:h-14 bordered" />
              <p
                v-else
                class="flex items-center justify-center truncate rounded-full font-semibold text-white size-14 bordered hover:opacity-80">
                {{ guild.name?.split(" ").map((a) => a.charAt(0).toUpperCase()).join("") }}
              </p>
            </div>

            <span>{{ guild.name }}</span>
          </div>
          <Button class="w-full flex items-center justify-center" :to="`/guilds/${guild.id}`">
            Manage
          </Button>
        </div>
      </div>

      <!-- empty guilds -->
      <div v-if="guilds.length === 0" class="flex flex-col gap-2 mt-32 items-center">
        <span class="text-center">You cannot manage the settings of any server you are in!</span>
        <ButtonText class="gap-2" @click="() => permission_dialog_open = true">
          <Icon name="fluent:question-circle-32-regular" class="size-6" />
          See required permissions
        </ButtonText>
      </div>
    </div>
  </div>
</template>
