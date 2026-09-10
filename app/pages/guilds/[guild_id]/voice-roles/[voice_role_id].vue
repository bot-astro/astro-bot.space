<template>
  <div class="flex flex-col gap-8 mb-64">
    <DashboardSettingsSaveToast
      :open="voice_role_settings_edited"
      :loading="update_voice_role_pending"
      @save="update_voice_role({ guild_id: guild_id!, channel_id: voice_role_id!, voice_role_settings: m_voice_role_settings! })"
      @reset="m_voice_role_settings = useClone(voice_role_settings)"
    />

    <div class="flex items-center gap-4">
      <IconVoiceRole class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span v-if="guild_channels && guild_roles && voice_role_settings" class="dashboard-section-title">
          {{ guild_channels.find(c => c.id == voice_role_id)?.name ?? "Deleted channel" }} <span class="text-foreground-secondary">x</span> @{{ guild_roles.find(r => r.id == voice_role_settings.role_id)?.name ?? "Deleted role" }}
        </span>
        <Skeleton v-else class="h-10 w-72" />
        <span class="dashboard-section-description">Manage the settings of this voice role!</span>
      </div>
      <div class="flex-grow" />
      <AlertDialog>
        <AlertDialogTrigger>
          <ButtonDestructive
            :loading="delete_voice_role_loading"
          >
            Delete
          </ButtonDestructive>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete the voice role?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be un-done and you wont be able to restore this voice role!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go back</AlertDialogCancel>
            <AlertDialogAction
              :destructive="true"
              :loading="delete_voice_role_loading"
              @click="delete_voice_role({ guild_id: guild_id!, channel_id: voice_role_id! })"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>

    <div
      class="flex flex-col gap-12"
      v-if="m_voice_role_settings != undefined && guild_channels != undefined && guild_roles != undefined"
    >
      <div class="groups-wrapper">
        <span class="text-group-name">SETTINGS</span>
        <div class="groups-container">
          <GroupSetting
            heading="Channel"
          >
            <template #description>
              <span class="text-foreground-secondary">
                Channel that triggers this voice role.<br>If you select a category, all channels of that category will trigger this voice role.<br>If you select a generator, all temporary voice channels generated from it will trigger this voice role.
              </span>
            </template>
            <template #bottom-action>
              <Select
                v-model:model-value="m_voice_role_settings.id"
                @update:model-value="(id) => m_voice_role_settings!.id = id"
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{guild_channels?.find(c => c.id == m_voice_role_settings!.id)?.name ?? ''}}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="channel in guild_channels.filter(c => c.type == 2 || c.type == 4 || c.type == 13)"
                      :key="channel.id"
                      :value="channel.id"
                    >
                      {{ channel.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Role"
            description="This role will be applied when a user joins the channel selected above"
          >
            <template #bottom-action>
              <Select
                v-model:model-value="m_voice_role_settings.role_id"
                @update:model-value="(role_id) => m_voice_role_settings!.role_id = role_id"
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{guild_roles?.find(r => r.id == m_voice_role_settings!.role_id)?.name ?? ''}}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="role in guild_roles.filter(r => r.id !== guild_id).sort((a, b) => b.position - a.position)"
                      :key="role.id"
                      :value="role.id"
                    >
                      <div class="vertical-center gap-2">
                        <span :class="`size-3 rounded-full min-w-3 min-h-3`" :style="`background-color: #${role.color.toString(16)}`"></span>
                        {{ role.name }}
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Action"
            description="Assign means Astro will give the role to the user when he joins the channel and remove it when he leaves. Remove does the opposite. Toggle behaves like 'Assign' if the user doesn't have the role, 'Remove' otherwise"
          >
            <template #bottom-action>
              <Select
                required
                v-model:model-value="m_voice_role_settings.action"
                @update:modelValue="(v) => m_voice_role_settings!.action = GSVoiceRoleAction[v as keyof typeof GSVoiceRoleAction]"
              >
                <SelectTrigger>
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="v in Object.values(GSVoiceRoleAction)"
                      :value="v"
                    >
                      {{capitalize(v)}}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Permanent"
            description="If enabled, Astro will not revert the action when the user leaves the channel"
          >
            <Switch v-model:checked="m_voice_role_settings.permanent_dashboard" />
          </GroupSetting>
        </div>
      </div>
    </div>

    <div v-else-if="guild_settings_error" class="center text-foreground-destructive">
      Something went wrong, please try again later
    </div>
    <div v-else-if="guild_settings_pending" class="center">
      <IconLoading />
    </div>
  </div>
</template>

<script setup lang="ts">
import {IconNames} from "assets/config/IconNames";
import {deepEqual} from "fast-equals";
import {useToast} from "~/components/ui/toast";
import type {GSVoiceRole, GSVoiceRoleAction} from "~/types/guild-settings/voice_role";
import {Select, SelectItem} from "~/components/ui/select";
import type {DashboardSection} from "~/types/dashboard";

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

useHead({
  title: "Voice role settings - Astro - Temporary Voice Channels for your Discord!",
  meta: [
    { name: 'description', content: 'Configure this voice role settings' },
    { property: 'og:title', content: 'Voice role settings - Astro - Temporary Voice Channels for your Discord!' },
    { property: 'og:description', content: 'Configure this voice role settings' },
    { property: 'og:url', content: 'https://astro-bot.space/guilds/voice_role' }
  ]
})

const { toast } = useToast()
const route = useRoute()
const guild_id = useGuildId()
let voice_role_id = route.params.voice_role_id as string

watch(() => route.params, (params) => {
  voice_role_id = params.voice_role_id as string
})

const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_roles } = useGuildRoles(guild_id)
const { data: guild_settings, error: guild_settings_error, isPending: guild_settings_pending } = useGuildSettings(guild_id)

const voice_role_settings = computed(() => {
  return guild_settings.value ? [...guild_settings.value.connections].find(c => c.id == voice_role_id) : undefined
})
const m_voice_role_settings = ref<GSVoiceRole | undefined>(undefined)
const voice_role_settings_edited = ref(false)


watch(voice_role_settings, (new_voice_role_settings) => {
  if (new_voice_role_settings) {
    m_voice_role_settings.value = useClone(new_voice_role_settings)
  }
}, { deep: true, immediate: true })

watch(m_voice_role_settings, (new_m_voice_role_settings) => {
  if (!voice_role_settings.value || !new_m_voice_role_settings) {
    voice_role_settings_edited.value = false
  } else {
    voice_role_settings_edited.value = !deepEqual(new_m_voice_role_settings, voice_role_settings.value)
  }
}, { deep: true, immediate: true })



/// MUTATIONS ///
const { mutate: delete_voice_role, isPending: delete_voice_role_loading, error: delete_voice_role_error, isSuccess: delete_voice_role_success } = useDeleteVoiceRoleMutation()
const { mutate: update_voice_role, isPending: update_voice_role_pending, error: update_voice_role_error } = useUpdateVoiceRoleMutation()
const { mutate: upgrade_guild } = useGuildUpgradeMutation()

/// SUCCESS ACTIONS ///
watch(delete_voice_role_success, (s) => {
  if (s) {
    navigateTo(`/guilds/${guild_id.value}/voice_roles`)
  }
})

/// ERROR TOASTS ///
watch(guild_settings_error, (e) => {
  if (e instanceof AstroApiError && e.code == AstroApiErrorCode.ASTRO_NOT_IN_GUILD && guild_id.value) {
    useInvite().invite_to_guild(guild_id.value)
  }
})

watch(delete_voice_role_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})

watch(update_voice_role_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})
</script>
